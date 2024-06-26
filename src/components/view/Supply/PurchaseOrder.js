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
const buttons = ["add-purchase"];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

function PurchaseOrder() {
  const [roleId, setRoleId] = useState(getRoleId().replace(/^"(.*)"$/, "$1"));
  document.body.style = "background: white;";
  const { dateFrom, dateTo, statusFilter } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : new Date("01/02/21").toISOString().split("T")[0],
    to_date: dateTo ? dateTo : formattedPresentData,
    status: statusFilter
      ? statusFilter === "all"
        ? ""
        : statusFilter
      : roleId === "11"
      ? "approved"
      : "for approval",
  });
  const [poData, setPoData] = useState([]);
  const [render, setRender] = useState([]);
  const [isReady, setIsReady] = useState(false);

  //redirect
  const [redirect, setRedirect] = useState(false);

  React.useEffect(() => {
    poData.length = 0;
    axios({
      method: "post",
      url: window.$link + "pos/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        var pos = response.data.pos;

        if (filteredData.status != "") {
          pos = response.data.pos.filter(
            (info) => info.status == filteredData.status
          );
        }
        pos.map((data, index) => {
          axios({
            method: "post",
            url: window.$link + "suppliers/show/" + data.supplier_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ""),
              requester: userId,
            },
          })
            .then(function (response) {
              var date = new Date(data.purchase_date);
              var posData = {};
              posData.id = data.id;
              posData.supplier = response.data.name;
              posData.date = date.toDateString();

              posData.total =
                "P " +
                data.grand_total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              posData.status = data.status;
              posData.payment =
                data.paid_amount == data.grand_total ? "paid" : "unpaid";

              setPoData((oldArray) => [...oldArray, posData]);
            })
            .then(function (error) {
              console.log(error);
              setIsReady(true);
            });
        });
      })
      .then(function (error) {
        console.log(error);
        setIsReady(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false);
      });
  }, [render]);

  function approve(poId) {
    id = poId;
    setRedirect(true);
  }

  if (redirect == true) {
    var link =
      "/review-purchase-order/" +
      id +
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
            <Searchbar title="PURCHASE ORDER" />
            <Header
              type="thick"
              title="PURCHASE ORDER MANAGER"
              buttons={buttons}
            />
            <Table
              type={"purchase-order"}
              clickable={true}
              tableData={poData}
              rowsPerPage={4}
              headingColumns={[
                "PO NO.",
                "SUPPLIER",
                "PURCHASE DATE",
                "TOTAL",
                "STATUS",
                "PAYMENT",
                "ACTION",
              ]}
              filteredData={filteredData}
              setFilter={setFilter}
              link={approve}
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

export default PurchaseOrder;
