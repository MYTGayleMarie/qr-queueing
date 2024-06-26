import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import { getToken, getUser } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { getTime } from "../../../utilities/Common";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Searchbar from "../../Searchbar";
import Table from "../../Table.js";
import { Navigate } from "react-router-dom";

const buttons = ["export-excel", "export-pdf"];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};
function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function ReportSales() {
  document.body.style = "background: white;";
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesTemp, setSalesTemp] = useState([]);
  const [credits, setCredits] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const [isReady, setIsReady] = useState(false);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [redirect, setRedirection] = useState(false);
  const [total, setTotal] = useState(0);

  const [accountDetails, setAccountDetails] = useState([]);
  const [byDate, setByDate] = useState([]);
  const [byMethod, setByMethod] = useState([]);
  const [generalSalesSummary, setGeneralSalesSummary] = useState([]);
  const [generalTotalSales, setGeneralTotalSales] = useState([]);

  React.useEffect(() => {
    sales.length = 0;
    salesTemp.length = 0;
    credits.length = 0;
    axios({
      method: "post",
      url: window.$link + "reports/salesSummary",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        requester: userId,
      },
    }).then((response) => {
      //  setIsReady(false)
      setGeneralSalesSummary(response.data.data.sales);
      setIsReady(true);
      var totals = [];
      response.data.data.sales.map((value) =>
        totals.push(
          value
            .map((data) =>
              data.grand_total !== "" ? parseFloat(data.grand_total) : 0
            )
            .reduce((a, b) => a + b, 0)
        )
      );

      setGeneralTotalSales(
        totals
          .map((data) => data)
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );

      axios({
        method: "post",
        url: window.$link + "reports/salesSummaryWithCompanyDiscount",
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          date_from: filteredData.from_date,
          date_to: filteredData.to_date,
          requester: userId,
        },
      })
        .then((credit_response) => {
          // setIsReady(false)
          const salesArray = credit_response.data.data.sales;
          salesArray.map((arr, index1) => {
            arr.map((method, index2) => {
              if (method.accounts != null) {
                var info = {};
                var date = new Date(method.booking_date);
                var formattedDate = date.toDateString().split(" ");
                info.date =
                  formattedDate[1] +
                  " " +
                  formattedDate[2] +
                  " " +
                  formattedDate[3];
                info.method = "credit";
                info.amount = method.grand_total;
                setCredits((oldArray) => [...oldArray, info]);
                setIsReady(true);
              }
            });
          });
          credits.map((credit, index) => {
            var info = {};
            info.date = credit.date;
            info.method = "credit";
            info.amount = credit.creditAmount;
            setSales((oldArray) => [...oldArray, info]);
            // setIsReady(true)
          });
          var temp_total = 0;
          const sales_Array = response.data.data.sales;
          sales_Array.map((arr, index1) => {
            arr.map((method, index2) => {
             
              if (method.accounts != null) {
                var date = new Date(method.payment_date);
                var formattedDate = date.toDateString().split(" ");
                method.accounts.map((account, index3) => {
                  
                  var info = {};
                  info.date =
                    formattedDate[1] +
                    " " +
                    formattedDate[2] +
                    " " +
                    formattedDate[3];
                  info.method = method.type;
                  info.account = account.name;
                  info.amount = account.amount;
                  info.tender_total = method.grand_total
                  if (method.type != "credit") {
                    temp_total += parseFloat(info.amount);
                  }
                  setSales((oldArray) => [...oldArray, info]);
                  // setIsReady(true)
                });
              }
            });
            if (arr.length - 1 == index1) {
              setPrintReadyFinal(true);
              // setIsReady(true)
            }
            setTotal(temp_total);
            // setIsReady(true)
          });
          setIsReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsReady(false);
    });
  }, [render]);

  React.useEffect(() => {
    const noCredit = sales.filter((info) => info.method !== "credit");
    const res = Array.from(
      noCredit.reduce(
        (m, { date, amount }) =>
          m.set(date, (m.get(date) || 0) + parseFloat(amount)),
        new Map()
      ),
      ([date, amount]) => ({ date, amount })
    );

    setSalesData(res);
    // setIsReady(true)
  }, [sales]);

  React.useEffect(() => {
    let tempData = salesData.concat(sales);

    setByDate(Object.values(groupArrayOfObjects(tempData, "date")));
 
    // setIsReady(true)
  }, [salesData]);

  function filter() {}

  function toTransaction() {
    // setRedirection(true);
  }

  if (redirect == true) {
    return <Navigate to={"/reports-transaction"} />;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="SALES" />
          <Header
            type="thick"
            title="QR DIAGNOSTICS REPORT"
            buttons={buttons}
            tableName={"Sales Report"}
            tableData={byDate}
            typeData={"sales"}
            total={
              generalTotalSales
              // "P " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            tableHeaders={["DATE", "METHOD", "ACCOUNT", "AMOUNT", "TOTAL"]}
            status={printReadyFinal}
            totalExcel={total}
          />

          <div style={{ marginLeft: "20px" }}>
            <div
              className="row p-2"
              style={{
                borderRadius: "10px",
                background: "#f6f0f2",
                width: "100%",
              }}
            >
              {generalSalesSummary.map((data) => {
                return (
                  <>
                    <div className="col-6">
                      <span style={{ color: "#04b4cc", fontWeight: "bolder" }}>
                        TOTAL {data[0]?.type?.toUpperCase()}
                      </span>
                      <span> : </span>
                      <span>
                        P{" "}
                        {data
                          .map((value) =>
                            value.grand_total !== ""
                              ? parseFloat(value.grand_total)
                              : 0
                          )
                          .reduce((a, b) => a + b, 0)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {/* {data[0].grand_total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div style={{ marginLeft: "20px" }} className="mt-3">
            <div
              className="row p-2"
              style={{
                borderRadius: "10px",
                background: "#f6f0f2",
                width: "100%",
              }}
            >
              <div className="col">
                <span style={{ color: "#04b4cc", fontWeight: "bolder" }}>
                  TOTAL SALES
                </span>
                <span> : </span>
                <span>P {generalTotalSales}</span>
              </div>
            </div>
          </div>
          <Table
            clickable={true}
            title="QR DIAGNOSTICS REPORT"
            type={"sales"}
            tableData={byDate}
            rowsPerPage={100}
            headingColumns={["DATE", "METHOD,  ACCOUNT,  AMOUNT", "TOTAL PER TENDER", "TOTAL"]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            link={toTransaction}
            totalCount={
              "P " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            givenClass={"register-mobile"}
            useLoader={true}
            isReady={isReady}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportSales;

//SALES REPORT
//  React.useEffect(() => {
//    sales.length = 0;
//     axios({
//         method: 'post',
//         url: window.$link + 'reports/sales',
//         withCredentials: false,
//         params: {
//           api_key: window.$api_key,
//           token: userToken.replace(/['"]+/g, ''),
//           date_from: filteredData.from_date,
//           date_to: filteredData.to_date,
//           requester: userId,
//         },
//       }).then(function (response) {
//           console.log(response.data.data.sales)
//           var totalAmount = 0;
//           response.data.data.sales.map((data,index) => {
//             var info = {};
//             var date = new Date(data.payment_date);
//             var formattedDate = date.toDateString().split(" ");
//             var selectedDate = new Date(filteredData.from_date);
//             var formattedSelectedDate = selectedDate.toDateString().split(" ");
//             info.method = data.type.toUpperCase();
//             info.amount = data.grand_total == null ? "P 0.00" : "P " + data.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//             totalAmount += data.grand_total == null ? parseFloat("0.00") : parseFloat(data.grand_total);
//             info.date = data.payment_date == null ? formattedSelectedDate[1] + " " + formattedSelectedDate[2] + " " + formattedSelectedDate[3]: formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];

//             setSales(oldArray => [...oldArray, info]);

//             if(response.data.data.sales.length - 1 == index) {
//               setTotal(totalAmount);
//               setPrintReadyFinal(true);
//             }
//           });

//       }).then(function (error) {
//         console.log(error);
//       });
// },[render]);
