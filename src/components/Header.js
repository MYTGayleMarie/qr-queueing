import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PdfTransaction from "./ReactToPDF";

//css
import "./Header.css";
import { CSVLink } from "react-csv";

function Header({
  type,
  title,
  buttons,
  editProfile,
  editPO,
  deletePO,
  payReceive,
  statusPaymentPO,
  statusPO,
  editPassword,
  editSupplier,
  deleteSupplier,
  deleteRelease,
  addInventory,
  addInvoice,
  downloadPDF,
  tableName,
  tableData,
  tableHeaders,
  status,
  completedOn,
  receiveItem,
  editLabTest,
  deleteLabTest,
  editPackage,
  deletePackage,
  typeData,
  total,
  totalExcel,
  withBack,
  setBack,
  breakdown,
  tableHeadersKey,
  isAnnual,
  handler,
}) {
  const navigate = useNavigate();
  var btn = [];

  if (buttons) {
    btn = buttons.map((button) => {
      if (button === "bulk-invoice") {
        return (
          <button
            className="edit-profile"
            onClick={() => navigate("/company-invoices/add-invoice-bulk")}
          >
            {" "}
            GENERATE BULK INVOICE
          </button>
        );
      }
      if (button === "bulk-invoice-hmo") {
        return (
          <button
            className="edit-profile"
            onClick={() => navigate("/hmo-invoices/add-invoice-bulk")}
          >
            {" "}
            GENERATE BULK HMO INVOICE
          </button>
        );
      }
      if (button === "export-excel") {
        if (status == true && typeData == "sales") {
          var salesData = [];
          tableData.map((data, index1) => {
            var sales = Object.values(data);
            var saleTotal = {};
            saleTotal.date = sales[0].date;
            saleTotal.method = "";
            saleTotal.account = "";
            saleTotal.amount = "";
            saleTotal.total = sales[0].amount;
            salesData.push(saleTotal);
            const cash = sales.filter((info) => info.method == "cash");
            const card = sales.filter((info) => info.method == "card");
            const check = sales.filter((info) => info.method == "check");
            const others = sales.filter((info) => info.method == "others");
            const credit = sales.filter((info) => info.method == "credit");
            if (cash.length < 1) {
              var details = {
                date: "",
                method: "cash",
                account: "",
                amount: "",
              };
              salesData.push(details);
            }
            cash.map((cash, index) => {
              var details = {
                date: "",
                method: "cash",
                account: cash.account,
                amount: parseFloat(cash.amount),
              };
              salesData.push(details);
            });
            if (card.length < 1) {
              var details = {
                date: "",
                method: "card",
                account: "",
                amount: "",
              };
              salesData.push(details);
            }
            card.map((card, index) => {
              var details = {
                date: "",
                method: "card",
                account: card.account,
                amount: parseFloat(card.amount),
              };
              salesData.push(details);
            });
            if (check.length < 1) {
              var details = {
                date: "",
                method: "check",
                account: "",
                amount: "",
              };
              salesData.push(details);
            }
            check.map((check, index) => {
              var details = {
                date: "",
                method: "check",
                account: check.account,
                amount: parseFloat(check.amount),
              };
              salesData.push(details);
            });
            if (others.length < 1) {
              var details = {
                date: "",
                method: "others",
                account: "",
                amount: "",
              };
              salesData.push(details);
            }
            others.map((others, index) => {
              var details = {
                date: "",
                method: "others",
                account: others.account,
                amount: parseFloat(others.amount),
              };
              salesData.push(details);
            });
            if (credit.length < 1) {
              var details = {
                date: "",
                method: "credits",
                account: "",
                amount: "",
              };
              salesData.push(details);
            }
            credit.map((credits, index) => {
              var details = {
                date: "",
                method: "credits",
                account: "",
                amount: parseFloat(credits.amount),
              };
              salesData.push(details);
            });
          });
          salesData.push({ date: "GRAND TOTAL", total: totalExcel });
          // console.log(salesData)
          return (
            <button className="download">
              <CSVLink
                data={salesData}
                filename={title}
                className="download-btn"
              >
                EXPORT EXCEL SALES
              </CSVLink>
            </button>
          );
        } else if (status == true && !isAnnual) {
          return (
            <button className="download">
              <CSVLink
                data={tableData}
                headers={tableHeadersKey}
                filename={title}
                className="download-btn"
              >
                EXPORT EXCEL
              </CSVLink>
            </button>
          );
        } else if (status == true && isAnnual) {
          return (
            <button className="download" onClick={handler}>
              EXPORT EXCEL
            </button>
          );
        } else {
          return <button className="download">Loading Data...</button>;
        }
      }
      if (button === "export-breakdown") {
        if (status == true) {
          return (
            <button className="download" onClick={breakdown}>
              EXPORT BREAKDOWN
            </button>
          );
        } else {
          return <button className="download">Loading Data...</button>;
        }
      }
      if (button === "export-pdf") {
        if (status == true) {
          return (
            <PdfTransaction
              type={typeData}
              total={total}
              name={tableName}
              header={tableHeaders}
              data={tableData}
            />
          );
        } else {
          return <button className="download">Loading Data...</button>;
        }
      }

      if (button.includes("add-")) {
        const addBtn = button.split("-");
        const linkTo = "/" + button;

        if (button === "add-release") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-items"> ADD ITEMS</button>
            </Link>
          );
        } else if (button === "add-purchase") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-items"> ADD ITEMS</button>
            </Link>
          );
        } else if (button === "add-supply-items") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-items"> ADD ITEMS</button>
            </Link>
          );
        } else if (button === "add-new-patient") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-patient"> NEW PATIENT</button>
            </Link>
          );
        } else if (button === "add-old-patient") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-patient"> OLD PATIENT</button>
            </Link>
          );
        }
        // else if (button === 'add-old-patientcm') {
        //     return <Link to={linkTo}><button className="header-btn add-patient"> OLD PATIENT</button></Link>
        // }
        else if (button === "add-company") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-company"> ADD COMPANY</button>
            </Link>
          );
        } else if (button === "add-inventory") {
          return (
            <button className="edit-profile" onClick={addInventory}>
              {" "}
              ADD INVENTORY
            </button>
          );
        } else if (button === "add-invoice") {
          return (
            <button className="edit-profile" onClick={addInvoice}>
              {" "}
              CREATE INVOICE
            </button>
          );
        } else if (button === "add-discount") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-company"> ADD DISCOUNT</button>
            </Link>
          );
        } else if (button === "add-lab-test") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-company"> ADD LAB TEST</button>
            </Link>
          );
        } else if (button === "add-package") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-company"> ADD PACKAGE</button>
            </Link>
          );
        }
        return (
          <Link to={linkTo}>
            <button className={button}> ADD {addBtn[1].toUpperCase()}</button>
          </Link>
        );
      } else {
        const linkTo = "/" + button;

        if (button === "change-password") {
          return (
            <button className="change-password" onClick={editPassword}>
              {" "}
              CHANGE PASSWORD
            </button>
          );
        } else if (
          button === "edit-po" &&
          (statusPO == "pending" || statusPO == "for approval")
        ) {
          return (
            <button className="edit-profile" onClick={editPO}>
              {" "}
              EDIT{" "}
            </button>
          );
        } else if (
          button === "pay-receive" &&
          statusPO != "for approval" &&
          statusPaymentPO != "paid"
        ) {
          return (
            <button className="edit-profile" onClick={payReceive}>
              ADD PAYMENT
            </button>
          );
        } else if (
          button === "receive-items" &&
          statusPO == "printed" &&
          completedOn == null
        ) {
          return (
            <button className="edit-profile" onClick={receiveItem}>
              RECEIVE ITEMS
            </button>
          );
        } else if (button === "receive-items-manager") {
          return (
            <Link to={linkTo}>
              <button className="header-btn add-company"> RECEIVE ITEMS</button>
            </Link>
          );
        } else if (
          button === "delete-po" &&
          (statusPO == "pending" || statusPO == "for approval")
        ) {
          return (
            <button className="edit-profile" onClick={deletePO}>
              DELETE
            </button>
          );
        } else if (button === "edit-profile") {
          return (
            <button className="edit-profile" onClick={editProfile}>
              {" "}
              EDIT PROFILE
            </button>
          );
        } else if (button === "edit-supplier") {
          return (
            <button className="edit-profile" onClick={editSupplier}>
              {" "}
              EDIT SUPPLIER
            </button>
          );
        } else if (button === "edit-lab-test") {
          return (
            <button className="edit-profile" onClick={editLabTest}>
              {" "}
              EDIT LAB TEST
            </button>
          );
        } else if (button === "delete-lab-test") {
          return (
            <button className="edit-profile" onClick={deleteLabTest}>
              {" "}
              DELETE LAB TEST
            </button>
          );
        } else if (button === "edit-package") {
          return (
            <button className="edit-profile" onClick={editPackage}>
              {" "}
              EDIT PACKAGE
            </button>
          );
        } else if (button === "delete-package") {
          return (
            <button className="edit-profile" onClick={deletePackage}>
              {" "}
              DELETE PACKAGE
            </button>
          );
        } else if (button === "delete-supplier") {
          return (
            <button className="edit-profile" onClick={deleteSupplier}>
              {" "}
              DELETE SUPPLIER
            </button>
          );
        } else if (button === "delete-release") {
          return (
            <button className="edit-profile" onClick={deleteRelease}>
              {" "}
              DELETE
            </button>
          );
        }
      }
    });
  }

  return (
    <div className={title + " header " + type}>
      <div className="row">
        <div className="header-title col">
          {title}
          {withBack && (
            <button className="back-btn-header" onClick={() => setBack(true)}>
              BACK
            </button>
          )}
          {btn}
        </div>
      </div>
    </div>
  );
}

export default Header;
