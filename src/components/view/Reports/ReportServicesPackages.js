import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import { getToken, getUser } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { getTime } from "../../../utilities/Common";
import { Navigate, useParams } from "react-router-dom";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Searchbar from "../../Searchbar";
import Table from "../../Table.js";
import { parse } from "@fortawesome/fontawesome-svg-core";

const buttons = ["export-excel", "export-pdf"];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var id = "";
var type = "";
var formattedPresentData = presentDate.toISOString().split("T")[0];

function ReportServicesPackages() {
  document.body.style = "background: white;";
  const { dateFrom, dateTo } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo ? dateTo : formattedPresentData,
    status: "all",
    payment_type:"all"
  });
  const [render, setRender] = useState(false);
  const [redirectView, setRedirectView] = useState(false);
  const [servicesPackages, setServicesPackages] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  //ALL PACKAGES AND SERVICES
  React.useEffect(() => {
    servicesPackages.length = 0;
    axios({
      method: "post",
      url: window.$link + "reports/service_package",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        type: filteredData.status, //filteredData.status
        payment_type: filteredData.payment_type
      },
    }).then(function (response) {
      var servicesData = response.data.data.data;
      var count = 0;
      servicesData.map((data, index) => {
     
        var info = {};
        if (data.lab_test !== null || data.package !== null) {

          info.service = data.lab_test ? data.lab_test : data.package;
          info.total_count = data.total_count;
          info.price = data.price
          info.id = data.lab_test_id ? data.lab_test_id : data.package_id;
          info.type = data.lab_test_id ? "lab_test" : "package";
         
        }
        setServicesPackages((oldArray) => [...oldArray, info]);
        setTotalCount((count += parseFloat(info.total_count)));

        if (response.data.data.data.length - 1 == index) {
          setPrintReadyFinal(true);
          setIsReady(true);
        }
      });
    });
  }, [render]);

  function viewDetails(labTestId, dataType) {
    id = labTestId;
    type = dataType;
    setRedirectView(true);
  }

  function filter() {}

  if (redirectView == true) {
    var link =
      "/reports-services-packages/details/" +
      id +
      "/" +
      filteredData.from_date +
      "/" +
      filteredData.to_date +
      "/" +
      type;
    return <Navigate to={link} />;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="SERVICES AND PACKAGES" />
          <Header
            type="thick"
            title="QR DIAGNOSTICS REPORT"
            buttons={buttons}
            tableName={"Services and Packages Report"}
            tableData={servicesPackages}
            tableHeaders={["SERVICE NAME", "QUANTITY"]}
            status={printReadyFinal}
          />
          <Table
            clickable={true}
            type={"services-packages-2"}
            tableData={servicesPackages}
            rowsPerPage={5}
            headingColumns={["SERVICE NAME", "QUANTITY","PRICE", "ACTION"]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            link={viewDetails}
            totalCount={totalCount}
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

export default ReportServicesPackages;
