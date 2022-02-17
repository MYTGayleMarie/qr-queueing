import React, { Fragment, useState } from 'react';
import { useForm } from "react-hooks-helper";
import { getToken, getUser } from '../../../utilities/Common';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

//css
import './Imaging.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};

var id = '';

function Imaging() {

    const [filteredData, setFilter] = useForm(filterData);
    const [render, setRender] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [patientData, setPatientData] = useState([]);

    function startImaging(bookingId) {
        id = bookingId;
        setRedirect(true);
    }

    React.useEffect(() => {
        patientData.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'bookings/getIncomplete',
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
                  console.log(customer)
                  var formatBookingTime = new Date(customer.data.birthdate);
                  var bookingDetails = {};
                  bookingDetails.id = booking.id;
                  bookingDetails.name = customer.data.first_name + ' ' + customer.data.middle_name + ' ' + customer.data.last_name;
                  bookingDetails.birthDate = formatBookingTime.toDateString();
                  bookingDetails.gender = customer.data.gender;
                  setPatientData(oldArray => [...oldArray, bookingDetails]);
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
      }, [render]);


      if (redirect == true) {
        var link = '/imaging-test/' + id;
        return <Navigate to={link} />;
      }

    return (
        <div>
            <Navbar/>
            <div className="active-cont">
                <Fragment>
                <div className="row">
                  <div className="col">
                      <h1 className="searchbar-header">PENDING FOR IMAGING</h1>
                  </div>
                  <div className="col d-flex justify-content-end"></div>
                </div>
                <Header 
                    type='thick'
                    title='BOOKING MANAGER' 
                />
                <Table
                    type={'no-action'}
                    tableData={patientData}
                    rowsPerPage={20}
                    headingColumns={['BOOKING ID', 'PATIENT NAME', 'BIRTHDATE', 'GENDER']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    setRender={setRender}
                    render={render}
                    link={startImaging}
                />
                </Fragment>
            </div>
        </div>
    )
}

export default Imaging
