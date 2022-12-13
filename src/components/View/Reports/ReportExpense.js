import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { formatDate, getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';
import { ifError } from 'assert';

const buttons = ['export-excel', 'export-pdf'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: "2022-01-06",
    to_date: formattedPresentData,
    status: "for approval",
  };

function ReportExpense() {
  
  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [pendingPOs, setPendingPOs] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [report, setReport] = useState([]);

  //redirect
  const [redirect, setRedirect] = useState(false);

      //ALL PENDING POS
      React.useEffect(() => {
          pendingPOs.length = 0;
        axios({
            method: 'get',
            url: window.$link + 'reports/expense',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
                
              if(response?.data?.data?.records) {
                  response?.data?.data?.records?.map((data, index1) => { 
                        var info = {};
                        info.total_qty = data.total_qty
                        info.item_id = data.item_id;
                        info.item = data.item;
                        info.unit = data.unit;
                        setReport(oldArray=>[...oldArray, info]);

                        if(response?.data?.data?.records.length - 2 == index1) {
                            setPrintReadyFinal(true);
                        }
                })
              } else {
                setReport([])
              }
                  

          }).catch(function (err) {
            setReport([])
          })
          //sentprintreadyfinal
    },[render]);

    function view(inventoryId) {
        id = inventoryId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/review-inventory/" + id + "/" + filteredData.from_date + "/" + filteredData.to_date + "/" + filteredData.status;
        return (
            <Navigate to ={link}/>
        )
    }

  

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='EXPENSE REPORT'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Expense Report'}
            tableData={report}
            tableHeaders={['TOTAL QTY', 'ITEM ID', 'ITEM', 'UNIT']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'report-expense'}
            tableData={report}
            rowsPerPage={100}
            headingColumns={['TOTAL QTY', 'ITEM ID', 'ITEM', 'UNIT']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={view}
            useLoader={true}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportExpense;
