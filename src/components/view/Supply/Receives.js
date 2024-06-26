import React, { Fragment, useState } from "react";
import { useForm } from "react-hooks-helper";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import {
  getRoleId,
  getToken,
  getUser,
  removeUserSession,
} from "../../../utilities/Common";

//css
import "./ReleaseItems.css";

//components
import Searchbar from "../../Searchbar.js";
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";

//variables
const userToken = getToken();
const userId = getUser();
var id = "";
var po_id = "";
const buttons = ["add-purchase"];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

function Receives() {
  const [roleId, setRoleId] = useState(getRoleId().replace(/^"(.*)"$/, "$1"));

  const filterData = {
    from_date: roleId === "12" ? formattedPresentData : "2022-01-06",
    to_date: formattedPresentData,
    status: "for approval",
  };

  document.body.style = "background: white;";
  const { dateFrom, dateTo, statusFilter } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : filterData.from_date,
    to_date: dateTo ? dateTo : formattedPresentData,
    status: statusFilter ? statusFilter : "UNPAID",
  });
  const [poData, setPoData] = useState([]);
  const [render, setRender] = useState([]);

  //redirect
  const [redirect, setRedirect] = useState(false);
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    poData.length = 0;
    axios({
      method: "post",
      url: window.$link + "po_receives/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (receives) {
        var receivesData = receives.data.receives;
        if (filteredData.status === "UNPAID") {
          var receivesData = receives.data.receives.filter(
            (data) => data.paid_amount < data.grand_total
          );
        } else if (filteredData.status === "PAID") {
          var receivesData = receives.data.receives.filter(
            (data) => data.paid_amount >= data.grand_total
          );
        }
        receivesData.map((data) => {
          var date = new Date(data.receive_date);
          var formattedDate = date.toDateString().split(" ");
          var payment_date =
            data.payment_date === null ? "NONE" : new Date(data.payment_date);
          var formattedPaymentDate =
            payment_date === "NONE"
              ? "NONE"
              : payment_date.toDateString().split(" ");

          var info = {};
          info.id = data.id;
          info.po_no = data.po_id;
          info.date =
            formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
          info.paid_amount =
            formattedPaymentDate === "NONE"
              ? formattedPaymentDate
              : formattedPaymentDate[1] +
                " " +
                formattedPaymentDate[2] +
                " " +
                formattedPaymentDate[3];
          info.supplier = data.supplier;
          info.amount = data.grand_total;
          info.payment_status =
            data.paid_amount >= data.grand_total ? "PAID" : "UNPAID";
          info.status = data.po_status.toUpperCase();

          setPoData((oldArray) => [...oldArray, info]);
        });
        setIsReady(true);
      })
      .then(function (error) {
        console.log(error);
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false);
      });
  }, [render]);

  function View(receiveId, poId) {
    id = receiveId;
    po_id = poId;
    setRedirect(true);
  }

  if (redirect == true) {
    var link =
      "/receives-print/" +
      id +
      "/" +
      po_id +
      "/" +
      filteredData.from_date +
      "/" +
      filteredData.to_date +
      "/" +
      filteredData.status;
    return <Navigate to={link} />;
  }

  return (
    <div>
      <div>
        <Navbar />
        <div className="active-cont">
          <Fragment>
            <Searchbar title="DELIVERIES" />
            <Header
              type="thick"
              title="DELIVERIES MANAGER"
              buttons={["receive-items-manager"]}
            />
            <Table
              type={"receives"}
              clickable={true}
              tableData={poData}
              rowsPerPage={4}
              headingColumns={[
                "RECEIVE ID",
                "PO NO.",
                "DATE",
                "PAYMENT DATE",
                "SUPPLIER",
                "AMOUNT",
                "PAYMENT STATUS",
                "PO STATUS",
                "ACTION",
              ]}
              filteredData={filteredData}
              setFilter={setFilter}
              link={View}
              setRender={setRender}
              render={render}
              useLoader={true}
              isReady={isReady}
            />
          </Fragment>
        </div>
      </div>
    </div>
  );
}

export default Receives;
