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

const buttons = ['export-excel', 'export-pdf', 'export-breakdown'];
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
  const [breakdown, setBreakdown] = useState([])
  const [isReady, setIsReady] = useState(false)

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
          
           axios({
            method: 'get',
            url: window.$link + 'reports/monthlyExpense',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
            console.log(response)
            if(response?.data?.data?.records) {
                let result = response?.data?.data?.records;
                result.forEach(object => {
                  delete object['item_id'];
                  delete object['name'];
                })
                setBreakdown(result)
                setIsReady(true)
            }
          }).catch(function (err) {
            setBreakdown([])
          })
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
            tableDataBreakdown={breakdown.sort((a, b) => a.item.localeCompare(b.item))}
            tableHeadersKey = {[
              {label: "NAME", key: "item"},
              {label: "UNIT", key: "unit"},
              {label: "PRICE", key: "price"},
              {label: "JAN", key: "Jan"},
              {label: "FEB", key: "Feb"},
              {label: "MAR", key: "Mar"},
              {label: "APR", key: "Apr"},
              {label: "MAY", key: "May"},
              {label: "JUN", key: "Jun"},
              {label: "JUL", key: "Jul"},
              {label: "AUG", key: "Aug"},
              {label: "SEP", key: "Sep"},
              {label: "OCT", key: "Oct"},
              {label: "NOV", key: "Nov"},
              {label: "DEC", key: "Dec"},
            ]}
            tableHeaders={['TOTAL QTY', 'ITEM ID', 'ITEM', 'UNIT']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'report-expense'}
            tableData={report}
            rowsPerPage={100}
            headingColumns={['TOTAL QTY', 'ITEM ID', 'NAME', 'UNIT']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={view}
            useLoader={true}
            isReady={isReady}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportExpense;
