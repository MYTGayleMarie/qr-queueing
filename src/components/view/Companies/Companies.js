import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

//css
import './Companies.css';

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['add-company'];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];


const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };
  
var patientData = [];

function Companies() {

    const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  
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
              bookingDetails.bookingTime = formatBookingTime.toDateString();
              bookingDetails.serviceType = booking.type;
              bookingDetails.addedOn = formatAddedOn.toDateString();
              patientData.push(bookingDetails);
            })
            .catch(function (error) {
              console.log(error);
            });
          setRender(patientData);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filteredData]);

  function filter() {}

    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="COMPANIES MANAGER" buttons={buttons} tableData={patientData} />
                <Table
                    clickable={false}
                    type={'no-action'}
                    tableData={patientData}
                    headingColumns={['BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'ADDED ON']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                    render={setRender}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default Companies
