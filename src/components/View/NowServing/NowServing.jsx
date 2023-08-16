import React, { Fragment, useState } from "react";
import axios from "axios";
import { getToken, getUser, getRoleId } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { Navigate, useParams } from "react-router-dom";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import { getAgingReports } from "../../../Helpers/APIs/agingAPI";
import "./NowServing.css";
import { fetchServing } from "../../../Helpers/APIs/queueAPI";
const buttons = [];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

export default function NowServing() {
  document.body.style = "background: white;";
  const [records, setRecords] = useState([]);
  const { dateFrom, dateTo } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo ? dateTo : formattedPresentData,
    done: false,
  });
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [redirectBooking, setRedirectBooking] = useState(false);
  const [role, setRole] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isReady, setIsReady] = useState(false);

  function getTime(date) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  async function fetchNowServing() {
    // setIsReady(false);
    const response = await fetchServing();

    if (response.data) {
      setRecords(response.data.now_serving);
    }

    // setIsReady(true);
  }
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"));
  }, []);

  React.useEffect(() => {
    fetchNowServing();
  }, []);

  React.useEffect(() => {
    setInterval(fetchNowServing, 10000);
  }, []);

  function searchBookingId() {
    id = bookingId;
    setRedirectBooking(true);
  }

  function filter() {}

  function viewBooking(bookingId) {
    id = bookingId;
    setRedirectBooking(true);
  }

  if (redirectBooking == true) {
    var link =
      "/results-view-booking/" +
      id +
      "/" +
      filteredData.from_date +
      "/" +
      filteredData.to_date;
    return <Navigate to={link} />;
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="">
        <Fragment>
          {/* <Header
            type="thick"
            title=""
            buttons={buttons}
            tableData={patientData}
          /> */}
          <div className="row justify-content-center mt-5">
            {records.length > 0 ? (
              records.map((data) => {
                return (
                  <div className="col-4">
                    <div className="row justify-content-center">
                      <div className="col-12 text-center align-center queue-attendee">
                        NOW SERVING
                      </div>
                      <div className="col-12 text-center align-center queue-no">
                        {data.id}
                      </div>
                      <div className="col-12 text-center align-center queue-patient">
                        {data.first_name.toUpperCase()}{" "}
                        {data.middle_name.toUpperCase()}{" "}
                        {data.last_name.toUpperCase()}
                      </div>
                      <div className="col-12 text-center align-center queue-attendee">
                        Attended By: {data.served_by.toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="row justify-content-center queue-attendee mt-5">
                NOTHING IN QUEUE.
              </div>
            )}
          </div>
        </Fragment>
      </div>
    </div>
  );
}
