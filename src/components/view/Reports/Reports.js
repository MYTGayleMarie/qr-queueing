import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';

//css
import './Reports.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table';
import Card from '../../Card';

//variables
var amount = 100; 
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filteredData = {
  from_date: "2022-01-06",
  to_date: formattedPresentData,
  done: false,
};

function Reports() {
    //STATES
    const [bookings, setBookings] = useState([]);
    const [servicesPackages, setServicesPackages] = useState([]);
    const [homeServices, setHomeServices] = useState([]);
    const [clinicServices, setClinicServices] = useState([]);
    const [pendingPOs, setPendingPOs] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    //ALL BOOKINGS
    React.useEffect(() => {
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
          }).then(function (response) {
              setBookings(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL PACKAGES AND SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookingdetails/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
            },
          }).then(function (response) {
              setServicesPackages(response.data.booking_details);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL HOME SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookings/getAllByType/home service',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              setHomeServices(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL CLINICAL SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookings/getAllByType/clinic',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              setClinicServices(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL PENDING POS
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'pos/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              var pending = response.data.pos.filter((info) => info.status == "pending");
              setPendingPOs(pending);
          }).then(function (error) {
            console.log(error);
          },[]);
    },[]);

     //SALES REPORT
     React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'reports/sales',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: formattedPresentData,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data.data.sales)
              var total = 0;
              response.data.data.sales.map((data,index) => {
                total += parseFloat(data.grand_total);
              })
              setTotalSales(total);
          }).then(function (error) {
            console.log(error);
          });
    },[]);


    return (
        <div>
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='REPORTS'/>
            <Header 
                type='thick'
                title='QR DIAGNOSTICS REPORTS' 
            />

            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        data={bookings.length}
                        link={"/reports-transaction"}
                        title='Total number of Transactions'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={servicesPackages.length}
                        link={"/reports-services-packages"}
                        title='Total number of Services and Packages'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={homeServices.length}
                        link={"/reports-home-services"}
                        title='Total number of Home Services'
                        color='maroon'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        data={clinicServices.length}
                        link={"/reports-clinical-services"}
                        title='Total number of Clinical Tests'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={pendingPOs.length}
                        link={"/reports-pending-po"}
                        title='Total number of POs pending for approval'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={"P " + totalSales}
                        link={"/reports-sales"}
                        title="Today's Total Sales"
                        color='blue'
                    />
                </div>
            </div>
            </Fragment>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Reports
