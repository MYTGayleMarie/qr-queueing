import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';

//css
import './Registration.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};

function Registration() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);

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
      .then(function (response) {
        console.log(response);
        response.data.bookings.map((booking, index) => {
          axios({
            method: 'post',
            url: window.$link + 'customers/show/' + booking.customer_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          })
            .then(function (customer) {
              var formatBookingTime = new Date(booking.booking_time);
              var formatAddedOn = new Date(booking.added_on);
              var bookingDetails = {};
              bookingDetails.id = booking.id;
              bookingDetails.name =
                customer.data.first_name + ' ' + customer.data.middle_name + ' ' + customer.data.last_name;
              bookingDetails.bookingTime = formatBookingTime.toDateString() + "\n" + getTime(formatBookingTime);
              bookingDetails.serviceType = booking.type;
              bookingDetails.addedOn = formatAddedOn.toDateString();
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [render]);

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={patientData} />
          <Table
            clickable={false}
            type={'no-action'}
            tableData={patientData}
            rowsPerPage={20}
            headingColumns={['BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'ADDED ON']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default Registration;
