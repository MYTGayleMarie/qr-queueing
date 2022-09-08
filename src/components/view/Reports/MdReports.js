import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';
import { setUncaughtExceptionCaptureCallback } from 'process';

const buttons = ['export-excel', 'export-pdf'];
var name = ""; 
var category = 0;
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false
};

const labDetails = {
  md:"",
  lab_category:"",
};


function MdReports() {

  document.body.style = 'background: white;';
   
  const [filteredData, setFilter] = useForm(filterData);
  const [link_md_details, setLink] = useState("");
  const [lab_details, setLabDetails] = useState("");
  const [md_name, setMDName] = useState("");
  const [lab, selectLab] = useState("")
  const [render, setRender] = useState(false);
  const [mds, setMds] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [name, setName] = useState("");
  const [isReady, setIsReady] = useState(false)

  const [redirect, setRedirect] = useState(false);
  
     //SALES REPORT
     React.useEffect(() => {
       mds.length = 0;
       axios({
        method: 'post',
        url: window.$link + 'reports/md',
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
            info.md = value.md;
            info.referrals = value.referrals == null ? "0" : value.referrals;
            info.xray = value.xray == null ? "0" : value.xray;
            info.ecg = value.ecg == null ? "0" : value.ecg;
            info.ultrasound = value.ultrasound == null ? "0" : value.ultrasound;
            setMds(oldArray => [...oldArray, info]);

            if(data.length - 1 == index) {
              setPrintReadyFinal(true);
              setIsReady(true)
            }
          })
      });
       
    },[render]);

  function filter() {}


  function handleOnChange(e, md_name){
    setLink("/reports-md-details/" + md_name + "/" + e.target.value)
    setRedirect(true)
  }

  if(redirect == true) {
    return (
        <Navigate to ={link_md_details}/>
    )
}


  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='MD REPORTS'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Unpaid Invoice Report'}
            tableData={mds}
            tableHeaders={['MD NAME', 'REFERRAL', 'XRAY','ECG','ULTRASOUND']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'mds'}
            tableData={mds}
            rowsPerPage={100}
            headingColumns={['MD NAME', 'REFERRAL', 'XRAY','ECG','ULTRASOUND', 'ACTIONS']}
            filteredData={filteredData}
            setFilter={setFilter}
            handleOnChange={handleOnChange}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            useLoader={true}
            isReady={isReady}
s          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default MdReports;
