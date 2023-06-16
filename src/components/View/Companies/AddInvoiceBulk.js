import React, { Fragment, useState } from "react";
import axios from "axios";
import { getToken, getUser, getRoleId } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { Navigate, useParams } from "react-router-dom";
import Select from "react-select";
//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import { getAgingReports } from "../../../Helpers/APIs/agingAPI";
import AddInvoice from "./AddInvoice";

const buttons = [];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

export default function AddInvoiceBulk() {
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

  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [discountOptions, setDiscountOptions] = useState([
    { label: "Sample 1", value: "1" },
    { label: "Sample 2", value: "2" },
    { label: "Sample 3", value: "3" },
  ]);

  function getTime(date) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  async function fetchReports() {
    setIsReady(false);
    const response = await getAgingReports();
    if (response.data) {
      setRecords(response.data.records);
    }

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
            title="ADD BULK INVOICE"
            buttons={buttons}
            tableData={patientData}
          />
          <div style={{ marginLeft: "30px", height: "100vh" }}>
            <div class="row g-3 align-items-center mt-2">
              <div class="col-sm-3">
                <label for="inputPassword6" class="col-form-label">
                  Company
                </label>
              </div>
              <div class="col-sm-3">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  style={{ zIndex: "100" }}
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div class="row g-3 align-items-center mt-2">
              <div class="col-sm-3">
                <label for="inputPassword6" class="col-form-label">
                  Discounts
                </label>
              </div>
              <div class="col-sm-3">
                <Select
                  placeholder={"Select Discounts"}
                  name="discounts"
                  defaultValue={selectedDiscounts}
                  onChange={setSelectedDiscounts}
                  options={discountOptions}
                  isMulti={true}
                  isSearchable={true}
                />
              </div>
            </div>
            <div class="row g-3 align-items-center mt-2">
              <div class="col-sm-3">
                <label for="inputPassword6" class="col-form-label">
                  Particulars
                </label>
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
            <div class="row g-3 align-items-center mt-2">
              <div class="col-sm-3">
                <label for="inputPassword6" class="col-form-label">
                  Remarks
                </label>
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
          </div>
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}
