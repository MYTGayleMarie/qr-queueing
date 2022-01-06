import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, refreshPage  } from '../../../utilities/Common';
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './Cashier.css';

//components
import Searchbar from '../../Searchbar.js';
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['download'];
const userToken = getToken();
const userId = getUser();

const filterData = {
    from_date: "",
    to_date: "",
};


var id = "";
var patientData = [];

function Cashier() {

    const [filteredData, setFilter] = useForm(filterData);
    const [redirect, setRedirect] = useState(false);

    function addPayment(customerId) {
        id = customerId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/add-payment/" + id;
        console.log(link);
        return (
            <Navigate to ={link}/>
        )
    }


    function filter() {
        console.log("here")
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

                    //fully paid or not
                    if(booking.paid_amount == booking.grand_total) {
                        bookingDetails.payment = "PAID";
                    }
                    else if (booking.paid_amount < booking.grand_total) {
                        bookingDetails.payment = "PENDING";
                    }

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
        <>
        <Navbar/>
        <div className="active-cont">
        <Fragment>
        <Searchbar title='CASHIER'/>
        <Header 
            type='thick'
            title='BOOKING MANAGER' 
            buttons={buttons} 
            tableData={patientData}
        />
        <Table
            type={'no-action'}
            tableData={patientData}
            headingColumns={['BOOKING ID', 'PATIENT NAME', 'BOOKING DATE', 'SERVICE TYPE', 'PAYMENT', 'ADDED ON']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            link={addPayment}
        />
        <ToastContainer hideProgressBar={true}/>
        </Fragment>
        </div>
        </>
    )
}

export default Cashier
