import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
import { getRoleId, getToken, getUser } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
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

export default function ReportIncompletePO() {
  const [roleId, setRoleId] = useState(getRoleId().replace(/^"(.*)"$/, "$1"));

  const filterData = {
    from_date: roleId === "12" ? formattedPresentData : "2022-01-06",
    to_date: formattedPresentData,
    status: "for approval",
  };

  const { dateFrom, dateTo } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : filterData.from_date,
    to_date: dateTo ? dateTo : formattedPresentData,
    done: false,
  });
  const [incompletePo, setIncompletePo] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [render, setRender] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [posTempData, setPoTempData] = useState([]);
  const [isReady, setIsReady] = useState(false);


  //async function
  async function fetchSuppliers(tempPos){
    await axios({
      method: "post",
      url: window.$link + "suppliers/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
      
        requester: userId,
      },
    }).then((supplier) => {
    
      let po_temp_data = [...tempPos]
      let suppliers_list = supplier.data.suppliers

      po_temp_data.map((data,index)=>{
 var info = {};
 let supplier_name = suppliers_list.filter(supplier=>
  supplier.id === data.supplier_id)[0]?.name
      info.po_number = data.id;
      var date = new Date(data.added_on);
      var formattedDate = date.toDateString().split(" ");
      info.po_date =
        formattedDate[1] +
        " " +
        formattedDate[2] +
        " " +
        formattedDate[3];
      info.supplier = supplier_name;
      info.total_amount = data.grand_total;
      setIncompletePo((oldArray) => [...oldArray, info]);
      })

     setPrintReadyFinal(true);
            setIsReady(true);
    });
  }


  // table data

  React.useEffect(() => {
    incompletePo.length = 0;
    // Getting all incomplete POs
    axios({
      method: "post",
      url: window.$link + "reports/incompletePOs",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then((pos) => {
      
        const incomplete = pos.data.pos;
   
        setPoTempData(incomplete);
        fetchSuppliers(incomplete)
        // Getting poItems in each pos
        // incomplete.map(async (pos, index) => {
        //   // await axios({
        //   //   method: "post",
        //   //   url: window.$link + "suppliers/show/" + pos.supplier_id,
        //   //   withCredentials: false,
        //   //   params: {
        //   //     api_key: window.$api_key,
        //   //     token: userToken.replace(/['"]+/g, ""),
        //   //     date_from: filteredData.from_date,
        //   //     date_to: filteredData.to_date,
        //   //     requester: userId,
        //   //   },
        //   // }).then((supplier) => {
        //   //   var info = {};
        //   //   info.po_number = pos.id;
        //   //   var date = new Date(pos.added_on);
        //   //   var formattedDate = date.toDateString().split(" ");
        //   //   info.po_date =
        //   //     formattedDate[1] +
        //   //     " " +
        //   //     formattedDate[2] +
        //   //     " " +
        //   //     formattedDate[3];
        //   //   info.supplier = supplier.data.name;
        //   //   info.total_amount = pos.grand_total;
        //   //   setIncompletePo((oldArray) => [...oldArray, info]);
        //   // });

        //   // Set status for printing
        //   if (incomplete.length - 1 == index) {
        //     setPrintReadyFinal(true);
        //     setIsReady(true);
        //   }
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

 



  function review(poId) {
    id = poId;
    setRedirect(true);
  }

  if (redirect == true) {
    var link =
      "/reports-incomplete-po/review/" +
      id +
      "/" +
      filteredData.from_date +
      "/" +
      filteredData.to_date;
    return <Navigate to={link} />;
  }
  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="INCOMPLETE PURCHASE ORDER" />
          <Header
            type="thick"
            title="QR DIAGNOSTICS REPORT"
            buttons={buttons}
            tableName={"Incomplete PO Report"}
            tableData={incompletePo.sort((a, b) =>
              a.po_number > b.po_number ? 1 : b.po_number > a.po_number ? -1 : 0
            )}
            tableHeaders={[
              "PO NUMBER",
              "PO DATE",
              "SUPPLIER",
              "TOTAL AMOUNT",
              "ACTION",
            ]}
            status={printReadyFinal}
          />
          <Table
            type={"report-incomplete-po"}
            tableData={incompletePo.sort((a, b) =>
              a.po_number > b.po_number ? 1 : b.po_number > a.po_ ? -1 : 0
            )}
            rowsPerPage={100}
            headingColumns={[
              "PO NUMBER",
              "PO DATE",
              "SUPPLIER",
              "TOTAL AMOUNT",
              "ACTION",
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            givenClass={"register-mobile"}
            link={review}
            useLoader={true}
            isReady={isReady}
          />
        </Fragment>
      </div>
    </div>
  );
}
