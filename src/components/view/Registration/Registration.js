import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';

//css
import './Registration.css';

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
console.log(filterData.from_date)
function Registration() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [redirectPay, setRedirectPay] = useState(false);
  const [redirectPrint, setRedirectPrint] = useState(false);

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
        console.log(response);
        response.data.bookings.map( async (booking, index) => {
          await axios({
            method: 'post',
            url: window.$link + 'customers/show/' + booking.customer_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (customer) {
              var bookingTime = new Date(booking.booking_time);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var addedOn = new Date(booking.added_on);
              var formatAddedOn = addedOn.toDateString().split(" ");
              var bookingDetails = {};

              bookingDetails.withDiscount = booking.discount_detail;
              bookingDetails.id = booking.id;
              bookingDetails.name =
                customer.data.first_name + ' ' + customer.data.middle_name + ' ' + customer.data.last_name;
              bookingDetails.bookingTime = formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
              bookingDetails.serviceType = booking.type;
              bookingDetails.paymentStatus = booking.payment_status;
              bookingDetails.addedOn = formatAddedOn[1] + " " + formatAddedOn[2] + ", " + getTime(addedOn);
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
            .then (function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [render]);

  // React.useEffect(() => {
  //   patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)));
  // });

  function filter() {}

  function addPayment(bookingId) {
    id = bookingId;
    setRedirectPay(true);
  }

  function printPayment(bookingId) {
    id = bookingId;
    setRedirectPrint(true);
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

  console.log(patientData);

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={patientData} />
          <Table
            type={'registration'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={20}
            headingColumns={['WITH DISCOUNT', 'BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'PAYMENT STATUS', 'ADDED ON', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={addPayment}
            print={printPayment}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default Registration;
