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
import {
  getAgingBreakdown,
  getAgingReports,
} from "../../../Helpers/APIs/agingAPI";

const buttons = [];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

export default function AgingByCompany() {
  document.body.style = "background: white;";
  const [records, setRecords] = useState([]);
  const { company_id, type } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: new Date(),
    to_date: new Date(),
    // from_date: dateFrom ? dateFrom : formattedPresentData,
    // to_date: dateTo ? dateTo : formattedPresentData,
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

  async function fetchReports() {
    setIsReady(false);
    const response = await getAgingBreakdown(company_id, type);
    if (response.data) {
      var arr = [];
      response.data.company_invoices.map((data) => {
        arr.push({ ...data, company_id: company_id });
      });

      setRecords(arr);
    }
    // setRecords(response.data.company_invoices);

    setIsReady(true);
  }
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"));
  }, []);

  React.useEffect(() => {
    fetchReports();
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
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thick"
            title="AGING REPORT"
            buttons={buttons}
            tableData={patientData}
          />

          <Table
            type={"aging-by-company"}
            tableData={records.sort((a, b) =>
              a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            )}
            rowsPerPage={20}
            headingColumns={[
              "DATE",
              "COMPANY INVOICE",
              "TOTAL",
              "PARTIAL PAID",
              "BALANCE",
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            // link={viewBooking}
            link={""}
            role={role}
            userId={userId}
            useLoader={true}
            isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}
