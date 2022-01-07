import React, {Fragment} from 'react';
import axios from 'axios';
import { getToken, getUser, refreshPage  } from '../../../utilities/Common';
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


const filterData = {
    from_date: presentDate,
    to_date: presentDate,
    done: false,
};

console.log(filterData);

var patientData = [];

function Registration() {

    const [filteredData, setFilter] = useForm(filterData);
    
    function filter() {
        patientData = [];
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
            }
        }).then(function (response) {
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
                    }
                }).then(function (customer) {
                    var formatBookingTime = new Date(booking.booking_time);
                    var formatAddedOn = new Date(booking.added_on);
                    var bookingDetails = {};
                    bookingDetails.id = booking.id;
                    bookingDetails.name = customer.data.first_name + " " + customer.data.middle_name + " " + customer.data.last_name;
                    bookingDetails.bookingTime = formatBookingTime.toDateString();
                    bookingDetails.serviceType = booking.type;
                    bookingDetails.addedOn = formatAddedOn.toDateString();
                    patientData.push(bookingDetails);
                }).catch(function (error) {
                    console.log(error);
                });
            });
            toast.success("Settings Saved!");
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="active-cont">
                <Fragment>
                <Header 
                    type='thick'
                    title='BOOKING MANAGER' 
                    buttons={buttons} 
                    tableData={patientData}
                />
                <Table
                    clickable={false}
                    type={'no-action'}
                    tableData={patientData}
                    headingColumns={['BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'ADDED ON']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                />
                <ToastContainer hideProgressBar={true}/>
            
                </Fragment>
            </div>
        </div>
    )
}

export default Registration
