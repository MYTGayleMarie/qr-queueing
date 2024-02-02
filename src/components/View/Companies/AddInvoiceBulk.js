import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser, getRoleId } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import { getAgingReports } from "../../../Helpers/APIs/agingAPI";
import AddInvoice from "./AddInvoice";
import {
  generateBulkInvoice,
  getAllCompanies,
  getCompanyDiscounts,
} from "../../../Helpers/APIs/invoiceAPI";
import { Button } from "react-bootstrap";

const buttons = [];

export default function AddInvoiceBulk() {
  document.body.style = "background: white;";
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [discountOptions, setDiscountOptions] = useState([]);
  const [details, setDetails] = useState({
    remarks: "",
    particulars: "",
  });
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"));
  }, []);

  async function fetchAllCompanies() {
    const response = await getAllCompanies();
    if (response.data) {
      var arr = [];
      response.data.companys.map((data) => {
        arr.push({ ...data, label: data.name, value: data.id });
      });
      setCompanies(arr);
    }
  }

  async function fetchAllDiscounts(id) {
    setSelectedDiscounts([]);
    setDiscountOptions([]);
    const response = await getCompanyDiscounts(id);
    if (response.data) {
      var arr = [];
      response.data.map((data) => {
        arr.push({ ...data, label: data.discount_code, value: data.id });
      });
      setDiscountOptions(arr);
    }
  }

  async function handleGenerate() {
    console.log(selectedCompany)
    const response = await generateBulkInvoice(
      selectedCompany.id,
      selectedDiscounts,
      details.remarks,
      details.particulars
    );
    if (response.data) {
      toast.success("Company Invoices Created Successfully");
      navigate("/company-discounts");
    }
    if (response.error) {
      toast.error(response.error.data.messages.error);
    }
  }

  useEffect(() => {
    fetchAllCompanies();
  }, []);
  useEffect(() => {
    if (Object.keys(selectedCompany).length > 0) {
      fetchAllDiscounts(selectedCompany.value);
    }
  }, [selectedCompany]);

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="ADD BULK INVOICE" buttons={buttons} />
          <div style={{ marginLeft: "30px", height: "100vh" }}>
            <div class="row g-3 align-items-center mt-2">
              <div class="col-sm-3">
                <label for="inputPassword6" class="col-form-label">
                  Company
                </label>
              </div>
              <div class="col-sm-3">
                <Select
                  placeholder={"Select Company"}
                  name="company"
                  defaultValue={selectedCompany}
                  onChange={setSelectedCompany}
                  options={companies}
                  isMulti={false}
                  isSearchable={true}
                />
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
                  onChange={(e) =>
                    setDetails({ ...details, particulars: e.target.value })
                  }
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
                  onChange={(e) =>
                    setDetails({ ...details, remarks: e.target.value })
                  }
                />
              </div>
            </div>

            {selectedDiscounts.length > 0 &&
              Object.keys(selectedCompany).length > 0 && (
                <div className="row d-flex justify-content-end">
                  <button
                    className="back-btn less-width"
                    onClick={handleGenerate}
                  >
                    GENERATE BULK INVOICE
                  </button>
                </div>
              )}
          </div>
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}
