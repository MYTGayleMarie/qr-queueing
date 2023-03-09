import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate, useParams } from 'react-router-dom';

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




export default function MedTech() {

  document.body.style = 'background: white;';
  const {dateFrom, dateTo} = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo? dateTo : formattedPresentData,
    done: false,
  });
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [redirectBooking, setRedirectBooking] = useState(false);
  const [role, setRole] = useState('');
  const [bookingId, setBookingId] = useState("");
  const [isReady, setIsReady] = useState(false)

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
        // response.data.bookings.map(data=>{
        //   console.log(data)
        // })
        var bookingArray = response.data.bookings
        bookingArray.map((booking, index) => {
          
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
            // patientData.push(bookingDetails)
          })
          setIsReady(true)
    })
    .catch(function (error) {
      console.log(error);
      setIsReady(false)
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
    var link =  "/results-view-booking/" + id + "/" + filteredData.from_date + "/" + filteredData.to_date;
    return (
        <Navigate to ={link}/>
    )
  }



   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="RESULTS RELEASING MANAGER" buttons={buttons} tableData={patientData}/>

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
            useLoader={true}
            isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}






