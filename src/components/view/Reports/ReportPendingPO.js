import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import { getRoleId, getToken, getUser } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { getTime } from "../../../utilities/Common";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Searchbar from "../../Searchbar";
import Table from "../../Table.js";

const buttons = ["export-excel", "export-pdf"];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

// const filterData = {
//     from_date: "2022-01-06",
//     to_date: formattedPresentData,
//     done: false,
//   };

function ReportPendingPO() {
  const [roleId, setRoleId] = useState(getRoleId().replace(/^"(.*)"$/, "$1"));

  const filterData = {
    from_date: roleId === "12" ? formattedPresentData : "2022-01-06",
    to_date: formattedPresentData,
    status: "for approval",
  };
  document.body.style = "background: white;";
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [pendingPOs, setPendingPOs] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  //redirect
  const [redirect, setRedirect] = useState(false);

  //ALL PENDING POS
  React.useEffect(() => {
    pendingPOs.length = 0;
    axios({
      method: "post",
      url: window.$link + "pos/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        requester: userId,
      },
    })
      .then(function (response) {
        var pending = response.data.pos.filter(
          (info) => info.status == "pending"
        );
        pending.map((data, index) => {
          var info = {};
          axios({
            method: "post",
            url: window.$link + "suppliers/show/" + data.supplier_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ""),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          })
            .then(function (supplier) {
              var date = new Date(data.added_on);
              var formattedDate = date.toDateString().split(" ");
              info.id = data.id;
              info.po_date =
                formattedDate[1] +
                " " +
                formattedDate[2] +
                " " +
                formattedDate[3];
              info.supplier = supplier.data.name;
              info.total_amount = data.grand_total;
              setPendingPOs((oldArray) => [...oldArray, info]);
            })
            .then(function (error) {});

          if (pending.length - 1 == index) {
            setPrintReadyFinal(true);
            setIsReady(true);
          }
        });
      })
      .then(function (error) {
        console.log(error);
      });
  }, [render]);

  function approve(poId) {
    id = poId;
    setRedirect(true);
  }

  if (redirect == true) {
    var link = "/review-purchase-order/" + id;
    return <Navigate to={link} />;
  }

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="PENDING PURCHASE ORDERS" />
          <Header
            type="thick"
            title="QR DIAGNOSTICS REPORT"
            buttons={buttons}
            tableName={"Pending Purchase Order Report"}
            tableData={pendingPOs}
            tableHeaders={["PO NUMBER", "PO DATE", "SUPPLIER", "TOTAL AMOUNT"]}
            status={printReadyFinal}
          />
          <Table
            clickable={true}
            type={"purchase-order"}
            tableData={pendingPOs}
            rowsPerPage={100}
            headingColumns={[
              "PO NUMBER",
              "PO DATE",
              "TESTS",
              "TOTAL AMOUNT",
              "ACTION",
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={approve}
            useLoader={true}
            isReady={isReady}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportPendingPO;
