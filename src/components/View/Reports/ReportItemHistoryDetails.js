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
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
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
  const [mds, setMds] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [byDate, setByDate] = useState([]);
  const [md_res,setMdsData] = useState([]);

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);
  

     React.useEffect(() => {
       mds.length = 0;
       axios({
        method: 'post',
        url: window.$link + 'reports/referrals',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          date_from: filteredData.from_date,
          date_to: filteredData.to_date,
          requester: userId,
        },
      }).then(function (response) {
        setIsReady(true)
          var data = response.data.data.data;
          data.map((value, index) => {
            var info = {};
            var date = new Date(value.booking_date);
            var formattedDate = date.toDateString().split(" ");
            var booking_date = formattedDate[1]+" "+formattedDate[2]+" "+formattedDate[3]
  
            info.date = booking_date;
            info.md = value.doctors_referal;
            info.qty = value.referrals_count;
            info.amount = value.total_amount;
            setMds(oldArray => [...oldArray, info]);

            if(data.length - 1 == index) {
              setPrintReadyFinal(true);
              setIsReady(true)
            }
          });
      });
       
    },[render]);

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
            tableData={mds}
            tableHeaders={['ENCODED ON', 'DOC TYPE', 'IN','OUT', 'CURRENT']}
            status={printReadyFinal}
             />
          <Table
            clickable={false}
            type={'no-action'}
            tableData={mds}
            rowsPerPage={100}
            headingColumns={['ENCODED ON', 'DOC TYPE', 'IN','OUT', 'CURRENT']}
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

        <div className='d-flex justify-content-end back-btn-container'>
            <button className='back-btn' onClick={() => setRedirectBack(true)}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default ReportItemHistoryDetails;
