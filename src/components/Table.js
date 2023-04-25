import React, { useState } from "react";
import PropTypes from "prop-types";
import useTable from "../utilities/Pagination";
import TableFooter from "./TableFooter";
import { Link, NavLink } from "react-router-dom";
import { RingLoader } from "react-spinners";
import TableLoader from "./TableLoader";
import TableLoader1 from "./TableLoader1";
import TableLoader2 from "./TableLoader2";
import TableLoader3 from "./TableLoader3";
import TableLoader4 from "./TableLoader4";
import TableLoader5 from "./TableLoader5";
import TableLoader6 from "./TableLoader6";
import TableLoader7 from "./TableLoader7";

//css
import "./Table.scss";
import { useNavigate } from "react-router-dom";
import TableLoader8 from "./TableLoader8";

function Table({
  clickable,
  type,
  tableData,
  headingColumns,
  breakOn = "medium",
  filteredData,
  setFilter,
  filter,
  link,
  givenClass,
  setName,
  setChecked,
  render,
  setRender,
  registerPay,
  registerPrint,
  totalCount,
  setStatus,
  endPromo,
  print,
  dropdownData,
  selectSupplier,
  handleOnChange,
  deleteBooking,
  deleteCustomer,
  userId,
  editAction,
  deleteAction,
  setCategory,
  receiveData,
  View,
  tableTotal,
  deleteFile,
  handleRemoveClick,
  handleRemoveItem,
  download,
  useLoader = false,
  isReady,
}) {
  //PAGINATION
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(tableData, page, rowsPerPage);
  const [loading, setLoading] = useState(true);

  let tableClass = "table-container__table";

  if (breakOn === "small") {
    tableClass += " table-container__table--break-sm";
  } else if (breakOn === "medium") {
    tableClass += " table-container_table--break-md";
  } else if (breakOn === "large") {
    tableClass += " table-container_table--break-lg";
  }

  const data = slice.map((row, index) => {
    let rowData = [];
    let i = 0;

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key],
      });
      i++;
    }
    if (type === "companies-review" && clickable == false) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val.replace(/\s/g, "")}
            >
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "transaction") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              style={{ fontSize: "0.8rem" }}
            >
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "discount-detail") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={index != 0 ? "text-left" : ""}
            >
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (clickable == false) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key}>
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "registration") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val.replace(/\s/g, "")}
            >
              {totalCount == null && index == 0 ? "" : data.val}
            </td>
          ))}
          {rowData[5].val == "unpaid" &&
            rowData[0].val == "no_company_discount" && (
              <td>
                <button
                  class="action-btn"
                  role="button"
                  onClick={() => link(row.id)}
                >
                  ADD PAYMENT
                </button>
                {(userId == 10 || userId == 18) && (
                  <>
                    <br />
                    <button
                      class="action-btn"
                      role="button"
                      onClick={() => deleteBooking(row.id)}
                    >
                      DELETE BOOKING
                    </button>
                  </>
                )}
              </td>
            )}
          {(rowData[5].val == "paid" ||
            rowData[0].val != "no_company_discount") && (
            <td>
              <button
                class="action-btn"
                role="button"
                onClick={() => print(row.id)}
              >
                PRINT BOOKING
              </button>
              {(userId == 10 || userId == 18) && (
                <>
                  <br />
                  <button
                    class="action-btn"
                    role="button"
                    onClick={() => deleteBooking(row.id)}
                  >
                    DELETE BOOKING
                  </button>
                </>
              )}
            </td>
          )}
        </tr>
      );
    } else if (type === "medtech") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {totalCount == null && index == 0 ? "" : data.val}
            </td>
          ))}
          <td>
            <button
              class="button-10"
              role="button"
              onClick={() => link(row.id)}
            >
              VIEW BOOKING
            </button>
          </td>
        </tr>
      );
    } else if (type === "report-inventory") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="button-10"
              role="button"
              onClick={() => link(row.id)}
            >
              VIEW
            </button>
          </td>
        </tr>
      );
    } else if (type === "report-expense") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "report-annual") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "services") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val.replace(/\s/g, "")}
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id, row.type)}
            >
              VIEW
            </button>
            <br />
          </td>
        </tr>
      );
    } else if (
      (type == "purchase-order" && clickable == true) ||
      (type == "release" && clickable == true) ||
      (type == "purchase-order-invoice" && clickable == true)
    ) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                data.val == "for approval"
                  ? "for-approval"
                  : data.val.replace(/\s/g, "")
              }
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id)}
            >
              REVIEW
            </button>
          </td>
        </tr>
      );
    } else if (type == "report-incomplete-po") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                data.val == "for approval"
                  ? "for-approval"
                  : data.val.replace(/\s/g, "")
              }
            >
              {data.val}
            </td>
          ))}
          <td key={row.id}>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.po_number)}
            >
              REVIEW
            </button>
          </td>
        </tr>
      );
    } else if (type == "receives" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={index == 5 ? "text-right" : data.val}
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id, row.po_no)}
            >
              REVIEW
            </button>
          </td>
        </tr>
      );
    } else if (type == "services-packages-2" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.slice(0, 2).map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={index == 5 ? "text-right" : data.val}
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id, row.type)}
            >
              VIEW DETAILS
            </button>
          </td>
        </tr>
      );
    } else if (type === "companies-discount" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                index == 2 ? "company_name" : data.val.replace(/\s/g, "")
              }
            >
              {index == 0 || index == 1 ? "" : data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.company_id, row.id)}
            >
              VIEW DETAILS
            </button>
          </td>
        </tr>
      );
    } else if (type === "credits" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val.replace(/\s/g, "")}
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.company_discount)}
            >
              VIEW DETAILS
            </button>
          </td>
        </tr>
      );
    } else if (type === "mds" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val.replace(/\s/g, "")}
            >
              {data.val}
            </td>
          ))}
          <td>
            <select
              name="lab_category"
              onChange={(e) => handleOnChange(e, row.md)}
              className="action-btn"
            >
              <option>VIEW DETAILS</option>
              <option value="18">XRAY</option>
              <option value="19">ECG</option>
              <option value="21">ULTRASOUND</option>
            </select>
          </td>
        </tr>
      );
    } else if (type === "med-tech" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val != null ? data.val.replace(/\s/g, "") : ""}
            >
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.lab_test, row.Results, row.Value)}
            >
              EDIT
            </button>
          </td>
        </tr>
      );
    } else if (type === "queue" && clickable == true) {
      return (
        <tr key={row.id}>
          <td key={row.id} data-heading={row.id} className={row.val}>
            {row.queueNumber}
          </td>
          <td key={row.id} data-heading={row.id} className={row.val}>
            {row.name}
          </td>
          <td>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                class="action-btn"
                role="button"
                onClick={() => link(row.customerId)}
                style={{ width: "100px" }}
              >
                ADD BOOKING
              </button>
              <button
                class="action-btn"
                role="button"
                onClick={() => deleteCustomer(row.queueNumber)}
                style={{ width: "100px" }}
              >
                {" "}
                DELETE BOOKING
              </button>
            </div>
          </td>
        </tr>
      );
    } else if (type === "items" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.splice(2).map((data, index) => (
            <td key={index} data-heading={data.key} className={"text-left"}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id, row.unit)}
            >
              UPDATE
            </button>
          </td>
        </tr>
      );
    } else if (type === "items-history" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.splice(2).map((data, index) => (
            <td key={index} data-heading={data.key} className={"text-left"}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id, row.unit)}
            >
              VIEW
            </button>
          </td>
        </tr>
      );
    } else if (type === "suppliers" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id)}
            >
              VIEW
            </button>
          </td>
        </tr>
      );
    } else if (type === "receive-items-manager" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id)}
            >
              Receive Items
            </button>
          </td>
        </tr>
      );
    } else if (type === "search-patient" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="button-10"
              role="button"
              onClick={() => link(row.id)}
            >
              ADD BOOKING
            </button>
            <button
              class="button-10"
              role="button"
              onClick={() => View(row.id)}
            >
              VIEW HISTORY
            </button>
          </td>
        </tr>
      );
    } else if (type === "search-patient-queue" && clickable == true) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {data.val}
            </td>
          ))}
          <td>
            <button
              class="button-10"
              role="button"
              onClick={() => link(row.id)}
            >
              ADD TO QUEUE
            </button>
            <button
              class="button-10"
              role="button"
              onClick={() => View(row.id)}
            >
              VIEW HISTORY
            </button>
          </td>
        </tr>
      );
    } else if (type === "payment-invoices") {
      return (
        <tr key={row.id} style={{ color: "black" }}>
          {/* <td><input type="checkbox" name={index} className="table-checkbox" value={index} onClick={setChecked}/></td> */}
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {isNaN(data.val) != true && index != 0 && index != 3
                ? "P " +
                  parseFloat(data.val).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "add-invoice") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {isNaN(data.val) != true && index != 0 && index != 2
                ? "P " +
                  parseFloat(data.val).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : data.val}
            </td>
          ))}
        </tr>
      );
    } else if (type === "companies") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={index == 1 ? "company_name" : data.val}
            >
              {index == 0 ? "" : data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => link(row.id)}
            >
              ADD DISCOUNT
            </button>
          </td>
        </tr>
      );
    } else if (type === "company-invoices") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={index == 3 ? "company_name" : data.val}
            >
              {index == 0 || index == 1 ? "" : data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() =>
                link(row.id, row.company_id, row.discountCode, row.discount_id)
              }
            >
              {row.payment_status == "PAID" ? "VIEW DETAILS" : "ADD PAYMENT"}
            </button>
          </td>
        </tr>
      );
    } else if (type === "discount") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val}
              onClick={() => link(row.id)}
            >
              {index == 0 ? "" : data.val}
            </td>
          ))}
          <td>
            <button
              class="action-btn"
              role="button"
              onClick={() => endPromo(row.id)}
            >
              END PROMO
            </button>
          </td>
        </tr>
      );
    } else if (type === "send-out-results") {
      return (
        <tr key={row.id}>
          <td td key={row.id} onClick={() => link(row.id)}>
            {row.file_name}
          </td>
          <td>
            <a href={row.file} download={row.file_name}>
              <button class="filter-btn" role="button">
                DOWNLOAD
              </button>
            </a>
          </td>
        </tr>
      );
    } else if (type === "sales") {
      var card = row.filter((info) => info.method == "card");
      var check = row.filter((info) => info.method == "check");
      var others = row.filter((info) => info.method == "others");
      var cash = row.filter((info) => info.method == "cash");
      var credit = row.filter((info) => info.method == "credit");

      var cashItems =
        cash.length > 0 ? (
          <>
            <td className="account-method">Cash</td>
            <td data-heading="ACCOUNT" className="account-name">
              {cash.map((data, index) => (
                <div className="account-details">{data.account}</div>
              ))}
            </td>
            <td data-heading="AMOUNT" className="account-name">
              {cash.map((data, index) => (
                <div className="account-details">
                  P{" "}
                  {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td className="account-method">Cash</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name"></td>
          </>
        );

      var cardItems =
        card.length > 0 ? (
          <>
            <td className="account-method">Card</td>
            <td data-heading="ACCOUNT" className="account-name">
              {card.map((data, index) => (
                <div className="account-details"> {data.account}</div>
              ))}
            </td>
            <td data-heading="AMOUNT" className="account-name">
              {card.map((data, index) => (
                <div className="account-details">
                  P{" "}
                  {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td className="account-method">Card</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name"></td>
          </>
        );

      var checkItems =
        check.length > 0 ? (
          <>
            <td className="account-method">Check</td>
            <td data-heading="ACCOUNT" className="account-name">
              {check.map((data, index) => (
                <div className="account-details">{data.account}</div>
              ))}
            </td>
            <td data-heading="AMOUNT" className="account-name">
              {check.map((data, index) => (
                <div className="account-details">
                  P{" "}
                  {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td className="account-method">Check</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name"></td>
          </>
        );

      var othersItems =
        others.length > 0 ? (
          <>
            <td className="account-method">Others</td>
            <td data-heading="ACCOUNT" className="account-name">
              {others.map((data, index) => (
                <div className="account-details">{data.account}</div>
              ))}
            </td>
            <td data-heading="AMOUNT" className="account-name">
              {others.map((data, index) => (
                <div className="account-details">
                  P{" "}
                  {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td className="account-method">Others</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name"></td>
          </>
        );

      var creditItems =
        credit.length > 0 ? (
          <>
            <td className="account-method">Credit</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name">
              {credit.map((data, index) => (
                <div className="account-details">
                  P{" "}
                  {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td className="account-method">Credit</td>
            <td data-heading="ACCOUNT" className="account-name"></td>
            <td data-heading="AMOUNT" className="account-name"></td>
          </>
        );

      const rowElements = (
        <tr key={row.id} className="sales-row">
          <td
            key={row[0].date.replace(/\s/g, "")}
            data-heading="DATE"
            className="DATE"
          >
            {row[0].date}
          </td>
          <table className="method-row">{cashItems}</table>
          <table className="method-row">{cardItems}</table>
          <table className="method-row">{checkItems}</table>
          <table className="method-row">{othersItems}</table>
          <table className="method-row">{creditItems}</table>
          <td key={row[0].amount} data-heading="TOTAL" className="TOTAL">
            P {row[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </td>
        </tr>
      );
      return rowElements;
      // return <tr></tr>
    } else if (type === "md-referrals") {
      var data =
        row.length > 0 ? (
          <>
            <td data-heading="MD NAME">
              {" "}
              {data.map((data, index) => (
                <div className="account-details">{data.md}</div>
              ))}
            </td>
            <td data-heading="REFERRALS QTY">
              {" "}
              {data.map((data, index) => (
                <div className="account-details">{data.qty}</div>
              ))}
            </td>
            <td data-heading="AMOUNT">
              {" "}
              {data.map((data, index) => (
                <div className="account-details">{data.amount}</div>
              ))}
            </td>
          </>
        ) : (
          <>
            <td data-heading="MD NAME">
              {" "}
              {data.map((data, index) => (
                <div className="account-details"> </div>
              ))}
            </td>
            <td data-heading="REFERRALS QTY">
              {" "}
              {data.map((data, index) => (
                <div className="account-details"> </div>
              ))}
            </td>
            <td data-heading="AMOUNT">
              {" "}
              {data.map((data, index) => (
                <div className="account-details"> </div>
              ))}
            </td>
          </>
        );

      const rowElements = (
        <tr key={row.id} className="sales-row">
          <td
            key={row[0].date.replace(/\s/g, "")}
            data-heading="DATE"
            className="DATE"
          >
            {row[0].date}
          </td>
          <table className="method-row">{data}</table>
          <td key={row[0].amount} data-heading="TOTAL" className="TOTAL">
            P {row[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </td>
        </tr>
      );
      return rowElements;
    } else if (type === "receive-incomplete-po-items") {
      return (
        <tr key={row.id}>
          <td
            key={"particulars" + row.po_item_id}
            data-heading={"PARTICULARS"}
            className={row.name}
          >
            {row.name}
          </td>
          <td
            key={"ordered" + row.po_item_id}
            data-heading={"ORDERED"}
            className={row.qty}
          >
            {row.qty}
          </td>
          <td
            key={"prevreceived" + row.po_item_id}
            data-heading={"PREVRECEIVED"}
            className={row.prevReceived}
          >
            {row.prevReceived}
          </td>
          <td key={"delivered" + row.po_item_id}>
            <input
              type="number"
              className="input-cell"
              name="received"
              value={row.received}
              onChange={(e) => {
                receiveData(e, index);
              }}
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={row.id} onClick={() => link(row.id)}>
          {rowData.map((data, index) => (
            <td key={index} data-heading={data.key} className={data.val}>
              {isNaN(data.val) != true && index != 0
                ? parseFloat(data.val).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : data.val}
            </td>
          ))}
        </tr>
      );
    }
  });

  //table structure
  if (type === "no-action") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {useLoader && !isReady ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-3"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        {/* </> }  */}
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }

  if (type === "release") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-13"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "mds") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-8"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "credits") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-7"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }
  if (type === "transaction") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-4"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "services-packages-2") {
    const { from_date, to_date, status } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <select name="status" onChange={setFilter}>
              <option value="all" selected>
                ALL
              </option>
              <option value="service">SERVICES</option>
              <option value="package">PACKAGES</option>
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-12"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "reports-services-packages") {
    return (
      <div className="table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "receives") {
    const { from_date, to_date, status } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <select name="status" onChange={setFilter}>
              <option value="UNPAID" selected>
                UNPAID
              </option>
              <option value="PAID">PAID</option>
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader5 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "receive-items-manager") {
    return (
      <div>
        <div className="table-container">
          <div className="search-table-container row">
            <div className="col-sm-12 d-flex justify-content-start">
              <select
                name="supplier"
                onChange={selectSupplier}
                className="dropdown"
              >
                <option>Select Supplier</option>
                {dropdownData.map((data, key) => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </select>
            </div>
          </div>
          <table className={tableClass}>
            <thead>
              <tr>
                {headingColumns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            footerClass={givenClass}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </div>
    );
  } else if (type === "report-inventory") {
    const { from_date, to_date, status } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <select name="status" value={status} onChange={setFilter}>
              <option value="for approval" selected>
                FOR APPROVAL
              </option>
              <option value="approved">APPROVED</option>
              <option value="completed">COMPLETED</option>
              <option value="disapproved">DISAPPROVED</option>
              <option value="printed">PRINTED</option>
              <option value="">ALL</option>
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-6"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "purchase-order") {
    const { from_date, to_date, status } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <select name="status" value={status} onChange={setFilter}>
              <option value="for approval" selected>
                FOR APPROVAL
              </option>
              <option value="approved">APPROVED</option>
              <option value="completed">COMPLETED</option>
              <option value="disapproved">DISAPPROVED</option>
              <option value="printed">PRINTED</option>
              <option value="">ALL</option>
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-14"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "report-expense") {
    const { from_date, to_date, status } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length == 0 ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-10"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "report-annual") {
    const { year } = filteredData;
    var min = 2022;
    var max = new Date().getFullYear();
    const yearRange = [...Array(max - min + 1).keys()].map((x) => x + min);
    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <select value={year} onChange={setFilter}>
              {yearRange.map((data) => {
                return <option value={data}>{data}</option>;
              })}
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length == 0 ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-11"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "home-service-booking") {
    const { from_date, to_date, service_location, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <select name="service_location" onChange={setFilter}>
              <option value="" selected>
                ALL
              </option>
              <option value="Company">COMPANY</option>
              <option value="Home Service">HOME SERVICE</option>
              <option value="Mobile Charge">MOBILE CHARGE</option>
            </select>
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-5"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "report-incomplete-po") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-12 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-5"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (
    type === "search-patient" ||
    type == "purchase-order-invoice" ||
    type == "search-patient-queue"
  ) {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          {" "}
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "patient-history") {
    return (
      <div className="table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "discount-detail") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          {/* <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button> */}
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "registration") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>
                  {totalCount == null && index == 0 ? "" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader3 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "medtech") {
    const { from_date, to_date, done } = filteredData;

    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={setRender != null ? (e) => setRender(!render) : ""}
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>
                  {totalCount == null && index == 0 ? "" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {!isReady && useLoader ? 
                    <TableLoader1 tableHeaders={headingColumns}/> : data} */}
            {data}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "services") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="lab">LAB</option>
            <option value="package">PACKAGE</option>
          </select>
          <button
            className="filter-btn"
            name="done"
            onClick={setRender != null ? (e) => setRender(!render) : ""}
          >
            FILTER
          </button>
        </div>

        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader7 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }

  if (type === "sales") {
    const { from_date, to_date, done } = filteredData;
    return (
      <div className="table-container">
        <div className="search-table-container row">
          <div className="col-sm-2">
            {totalCount != null && (
              <div className="total-count-container">
                <span className="total-count-header-table">TOTAL: </span>
                <span className="total-count-data">{totalCount}</span>
              </div>
            )}
          </div>
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={
                setRender != null ? (e) => setRender((render) => !render) : ""
              }
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {/* {headingColumns.map((col,index) => (
                                <th key={index}>{col}</th>
                            ))} */}

              <th>DATE</th>
              <th className="method-row">
                <td className="heading-details">METHOD</td>
                <td className="heading-details">ACCOUNT</td>
                <td className="heading-details">AMOUNT</td>
              </th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-6"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }
  if (type === "md-referrals") {
    const { from_date, to_date, done } = filteredData;
    return (
      <div className="table-container">
        <div className="search-table-container row">
          {/* <div className="col-sm-2">
                    {totalCount != null && (
                        <div className="total-count-container">
                            <span className="total-count-header-table">TOTAL: </span><span className="total-count-data">{totalCount}</span>
                        </div>
                    )}
                </div> */}
          <div className="col-sm-10 d-flex justify-content-end">
            <input
              type="date"
              className="from-date search"
              name="from_date"
              value={from_date}
              onChange={setFilter}
            />
            <input
              type="date"
              className="to-date search"
              name="to_date"
              value={to_date}
              onChange={setFilter}
            />
            <button
              className="filter-btn"
              name="done"
              onClick={
                setRender != null ? (e) => setRender((render) => !render) : ""
              }
            >
              FILTER
            </button>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              <th>DATE</th>
              <th className="method-row">
                <td className="heading-details">MD NAME</td>
                <td className="heading-details">REFERRAL QTY</td>
                <td className="heading-details">AMOUNT</td>
              </th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (
    type === "companies-review" ||
    type === "suppliers" ||
    type === "med-tech" ||
    type === "services-packages" ||
    type === "add-invoice" ||
    type === "queue"
  ) {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data}
            {/* {!isReady && useLoader ? 
                    <TableLoader tableHeaders={headingColumns} className={'spinners-15'}/> : data} */}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "cashier") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-17"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "users") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-3"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "items" || type === "items-history") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader6 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "discount") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
          </select>
          <button
            className="filter-btn"
            name="done"
            onClick={setRender != null ? (e) => setRender(!render) : ""}
          >
            FILTER
          </button>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{index == 0 ? "" : col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader
                tableHeaders={headingColumns}
                className={"spinners-16"}
              />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "companies") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index} className={index == 1 ? "company_name" : ""}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader3 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "send-out-results") {
    return (
      <div className="table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "company-invoices") {
    const { from_date, to_date, status_filter, done } = filteredData;
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          <input
            type="date"
            className="from-date search"
            name="from_date"
            value={from_date}
            onChange={setFilter}
          />
          <input
            type="date"
            className="to-date search"
            name="to_date"
            value={to_date}
            onChange={setFilter}
          />
          <select name="status_filter" onChange={setFilter}>
            <option value="unpaid">UNPAID</option>
            <option value="paid">PAID</option>
            <option value="all">ALL</option>
          </select>
          <button
            className="filter-btn"
            name="done"
            onClick={setRender != null ? (e) => setRender(!render) : ""}
          >
            FILTER
          </button>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index} className={index == 3 ? "company_name" : ""}>
                  {index == 0 || index == 1 ? "" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader3 tableHeaders={headingColumns} data={data} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "companies-discount") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index} className={index == 2 ? "company_name" : ""}>
                  {index == 0 || index == 1 ? "" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isReady && useLoader ? (
              <TableLoader1 tableHeaders={headingColumns} />
            ) : (
              data
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "payment-invoices") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {/* <th></th> */}
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    );
  } else if (type === "report") {
    return (
      <div className="report-table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index} className="report-table-th-top">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index} className="report-table-th">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "search-patient" || type === "search-patient-queue") {
    return (
      <div className="table-container">
        <div className="search-table-container d-flex justify-content-end">
          {" "}
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "incomplete-po-items") {
    return (
      <div className="table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === "receive-incomplete-po-items") {
    return (
      <div className="table-container">
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  }
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
