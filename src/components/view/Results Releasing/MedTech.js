import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';



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

export default function MedTech() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [redirectBooking, setRedirectBooking] = useState(false);
  const [role, setRole] = useState('');
  const [bookingId, setBookingId] = useState("");

  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  React.useEffect(() => {
    patientData.length = 0;
     axios({
      method: 'get',
      url: window.$link + 'bookings/medtech',
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
        response.data.bookings.map((booking, index) => {
              var bookingTime = new Date(booking.added_on);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var bookingDetails = {};

              bookingDetails.withDiscount = booking.discount_detail;
              bookingDetails.id = booking.id;
              bookingDetails.name = booking.customer;
              bookingDetails.bookingTime = formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
              bookingDetails.paymentStatus = booking.payment_status;
              bookingDetails.uploadStatus = booking.upload_status === "1" ? "INCOMPLETE" : "COMPLETE";
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
        });
  }, [render]);


  
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);


  function searchBookingId(){
    id = bookingId
    setRedirectBooking(true)
  }


  function filter() {}

  function viewBooking(bookingId) {
    id = bookingId;
    setRedirectBooking(true);

  }



  if(redirectBooking == true) {
    var link =  "/view-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }



   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="RESULTS RELEASING MANAGER"/>

          {/* SEARCH BAR */}
          <div className="row">
            <div className="col">
              <div class="wrap d-flex justify-content-center">
                <div class="search-bar">
                  <input type="text" class="searchTerm" name="patientName" placeholder="Search Booking ID" onChange={(e)=>setBookingId(e.target.value)}/>
                  <button type="submit" class="searchButton" onClick={searchBookingId}>
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Table
            type={'medtech'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={20}
            headingColumns={['WITH DISCOUNT', 'BOOKING ID', 'PATIENT NAME', 'BOOKING DATE','PAYMENT STATUS', 'UPLOAD STATUS', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={viewBooking}
            role={role}
            userId={userId}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}






