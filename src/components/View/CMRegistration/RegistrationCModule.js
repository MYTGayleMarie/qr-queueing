import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';

//css
import './RegistrationCModule.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];



const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};

function RegistrationCModule() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [redirectPay, setRedirectPay] = useState(false);
  const [redirectPrint, setRedirectPrint] = useState(false);
  const [redirectDelete, setRedirectDelete] = useState(false);
  const [role, setRole] = useState('');
  const [isReady, setIsReady] = useState(false)

  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  React.useEffect(() => {
    patientData.length = 0;
     axios({
      method: 'post',
      url: window.$link + 'bookings/getAll',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then( function (response) {
        // setIsReady(false)
        response.data.bookings.map( async (booking, index) => {
          // console.log(booking)
          // await axios({
          //   method: 'post',
          //   url: window.$link + 'customers/show/' + booking.customer_id,
          //   withCredentials: false,
          //   params: {
          //     api_key: window.$api_key,
          //     token: userToken.replace(/['"]+/g, ''),
          //     requester: userId,
          //   },
          // }).then(function (customer) {
            // setIsReady(false)
              var bookingTime = new Date(booking.booking_time);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var addedOn = new Date(booking.added_on);
              var formatAddedOn = addedOn.toDateString().split(" ");
              var bookingDetails = {};

              var booking_service = booking.type.toUpperCase();

              // console.log(booking);

              bookingDetails.withDiscount = booking.discount_detail;
              bookingDetails.id = booking.id;
              bookingDetails.name = booking.first_name + ' ' + booking.middle_name + ' ' + booking.last_name;
              bookingDetails.bookingTime = formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
              bookingDetails.serviceType = booking_service;
              bookingDetails.paymentStatus = booking.payment_status;
              bookingDetails.discount_code = booking.discount_code === null ? "NONE" : booking.discount_code;
              bookingDetails.addedOn = formatAddedOn[1] + " " + formatAddedOn[2] + ", " + getTime(addedOn);
              setPatientData(oldArray => [...oldArray, bookingDetails]);
              setIsReady(true)
            // })
            // .then (function (error) {
            //   console.log(error);
            //   setIsReady(true)
            // });
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false)
      });
  }, [render]);
  
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);



  function filter() {}

  function addPayment(bookingId) {
    id = bookingId;
    setRedirectPay(true);
  }

  function printPayment(bookingId) {
    id = bookingId;
    setRedirectPrint(true);
  }
  function deleteBooking(bookingId) {
    id = bookingId;
    setRedirectDelete(true);
  }

  if(redirectDelete == true) {
    var link =  "/delete-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

  if(redirectPay == true) {
    var link =  "/add-payment/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

  if(redirectPrint == true) {
    var link =  "/print-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

  
   return (
    <div>

<div className="row" style={{marginTop:"6%", fontFamily:"Montserrat-Bold"}} >
          <center>
          <img src="/logo.png" style={{width:"160px", height:"80px", marginBottom:"3%",}}></img>
          <h1>Customer Module</h1>
          </center>
            <div className="col-sm-6 d-flex justify-content-center" style={{marginTop:"3%"}}>
             <a href='/cmadd-old-patient'>
             <button variant="default" 
              style={{padding:"10px", margin:"5px", width:"150%", height:"250%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                    fontFamily: "Montserrat-Bold", fontSize:"25px",}}>
              Old Patient</button></a>
            </div>

            <div className="col-sm-6 d-flex justify-content-center" style={{marginTop:"3%"}}>
              <a href='/cmadd-new-patient'>
            <button variant="default" 
            style={{padding:"10px", margin:"5px", width:"150%", height:"250%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                  fontFamily: "Montserrat-Bold", fontSize:"25px",}}>
            New Patient</button></a>
            </div>


      </div>


      {/* <Navbar /> */}
      {/* <div className="active-cont">
        <Fragment>
          <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={patientData} />
          <Table
            type={'registration'}
            tableData={patientData}
            rowsPerPage={20}
            headingColumns={['WITH DISCOUNT', 'BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'PAYMENT STATUS','DISCOUNT', 'ADDED ON', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={addPayment}
            print={printPayment}
            role={role}
            userId={userId}
            deleteBooking={deleteBooking}
            useLoader={true}
            isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div> */}
    </div>
  );
}

export default RegistrationCModule;
