import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';

import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';

// const buttons = ['add-new-patient', 'add-old-patient'];
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

export default function ResultsReleasing() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [finalData, setFinalData] = useState([]);
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
        console.log(response)
        response.data.bookings.map((booking, index) => {
              var bookingTime = new Date(booking.added_on);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var bookingDetails = {};

              
              bookingDetails.date = formatBookingTime[1] + " " + formatBookingTime[2] + " " + formatBookingTime[3];
              bookingDetails.name = booking.customer;
              bookingDetails.service_type = booking.service_type;
              bookingDetails.bookingTime = getTime(bookingTime);
              bookingDetails.releasing_time = getTime(new Date(booking.releasing_time));
              bookingDetails.booking_details = booking.booking_interval
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
        });
  }, [render]);


  function filter() {}


   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
         <Searchbar title='RESULTS RELEASING REPORT'/>
         <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            tableName={'Results Releasing Report'}
            tableData={filteredData}
            tableHeaders={['BOOKING DATE', 'PATIENT NAME', 'TESTS','TIME REGISTERED', 'TIME UPLOADED', 'TIME DIFFERENCE']}
             />
          <Table
            type={'no-action'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={10}
            headingColumns={['BOOKING DATE', 'PATIENT NAME', 'TESTS','TIME REGISTERED', 'TIME UPLOADED', 'TIME DIFFERENCE']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            givenClass={"register-mobile"}
            setRender={setRender}
            render={render}
          />
        </Fragment>
      </div>
    </div>
  );
}












