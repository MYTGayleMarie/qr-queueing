import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';

const buttons = ['export-excel', 'export-pdf'];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var fromDate = new Date()
var formattedFromData = fromDate?.toISOString()?.split('T')[0];
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: fromDate,
  to_date: formattedPresentData,
  done: false,
};

function groupArrayOfObjects(list, key) {
  return list.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function ReportItemHistoryDetails() {

  document.body.style = 'background: white;';
  const {id, unit} = useParams();
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [history, setHistory] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [byDate, setByDate] = useState([]);
  const [md_res,setMdsData] = useState([]);

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);
  

  React.useEffect(() => {
    history.length = 0;
    axios({
      method: 'get',
      url: window.$link + 'items/history',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        item_id: id,
        unit: unit,
        requester: userId,
      },
    })
      .then(function (response) {
        console.log(response);
        var data = response.data.data.records;
        data.map((value, index) => {
          var info = {};
          var unit = value.unit;
          var date = new Date(value.encoded_on);
          var formattedDate = date.toDateString().split(' ');
          var encoded_on = formattedDate[1] + ' ' + formattedDate[2] + ' ' + formattedDate[3];
  
          info.encoded_on = encoded_on;
          info.doc_type = value.doc_type;
          info.in = value.inventory_in;
          info.out = value.inventory_out;
          info.unit = unit.toUpperCase();
  
          setHistory(oldArray => [...oldArray, info]);
  
          if (data.length - 1 === index) {
            setPrintReadyFinal(true);
            setIsReady(true);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false);
      });
  }, [render]);

  function filter() {}

  if(redirectBack === true) {
     var link =  "/reports-item-history";
        return (
            <Navigate to ={link}/>
        )
   }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='ITEM HISTORY DETAILS REPORT'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'ITEM HISTORY DETAILS REPORT'}
            tableData={history}
            tableHeaders={['ENCODED ON', 'DOC TYPE', 'IN','OUT', 'UNIT']}
            status={printReadyFinal}
            withBack={true}
            setBack={setRedirectBack}
             />
          
          <Table
            clickable={false}
            type={'no-action'}
            tableData={history}
            rowsPerPage={100}
            headingColumns={['ENCODED ON', 'DOC TYPE', 'IN','OUT', 'UNIT']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
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

export default ReportItemHistoryDetails;
