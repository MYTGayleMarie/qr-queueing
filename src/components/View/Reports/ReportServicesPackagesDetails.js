import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { formatDate, getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import { Navigate, useParams } from 'react-router-dom';
import Table from '../../Table';

const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];


function ReportServicesPackagesDetails() {
  
  document.body.style = 'background: white;';
  const {id, dateFrom, dateTo} = useParams();
  const [redirectBack, setRedirectBack] = useState(false);
  const [render, setRender] = useState([]);
  const [patients, setPatients] = useState([]);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'bookings/getAvailedServices',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          lab_test_id: id,
          date_from: dateFrom,
          date_to: dateTo,
          requester: userId,
      }
    }).then(function (response) {
      console.log(response)
      let result = response.data.data.data.map((data) => { return {
        booking_date: formatDate(data.booking_date),
        customer: data.customer,
        lab_test: data.lab_test,
      }})
      setPatients(result)
    }).then(function(error) {
      console.log(error);
    });
  },[]);

  

  function filter() {}

  if(redirectBack === true) {
      if(dateFrom !== undefined && dateTo !== undefined) {
          var link =  "/reports-services-packages/" + dateFrom + "/" + dateTo;
          return (
              <Navigate to ={link}/>
          )
      } else {
        var link =  "/reports-services-packages";
          return (
              <Navigate to ={link}/>
          )
      }
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header 
            type="thick" 
            title="SERVICES AND PACKAGES REPORT DETAILS" 
            tableName={'Pending Purchase Order Report'}
            withBack={true}
            setBack={setRedirectBack}
             />

          <div className='particulars-cont'>
            <Table
                clickable={false}
                type={'reports-services-packages'}
                tableData={patients}
                rowsPerPage={100}
                headingColumns={['BOOKING DATE', 'CUSTOMER', 'LAB TEST']}
                setRender={setRender}
                render={render}
                givenClass={"register-mobile"}
            />
          </div>
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportServicesPackagesDetails;
