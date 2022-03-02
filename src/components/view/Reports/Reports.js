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

    document.body.style = 'background: white;';

    //STATES
    const [bookings, setBookings] = useState([]);
    const [todayBookings, setTodayBookings] = useState([]);

    const [servicesPackages, setServicesPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);

    const [homeServices, setHomeServices] = useState([]);
    const [todayHomeServices, setTodayHomeServices] = useState([]);

    const [clinicServices, setClinicServices] = useState([]);

    const [totalSales, setTotalSales] = useState(0);
    const [pendingPOs, setPendingPOs] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);

    const [discounts, setDiscounts] = useState([]);

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

    //TODAY BOOKINGS
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'bookings/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.to_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            setTodayBookings(response.data.bookings);
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
              date_from: filteredData.to_date,
              date_to: filteredData.to_date,
            },
          }).then(function (response) {
              setServicesPackages(response.data.booking_details);
              response.data.booking_details.map((data) => {
                if(data.type == "lab") {
                  setServices(oldArray => [...oldArray, data]);
                } else {
                  setPackages(oldArray => [...oldArray, data]);
                }
              });
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
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
            },
          }).then(function (response) {
              setHomeServices(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //TODAY HOME SERVICES
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'bookings/getAllByType/home service',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.to_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            setTodayHomeServices(response.data.bookings);
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
              console.log(response)
              console.log(response.data.data.sales)
              var total = 0;
              response.data.data.sales.map((data,index) => {
                total += data.grand_total == null ? 0 : parseFloat(data.grand_total);
              })
              setTotalSales(total);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

        //ALL UNPAID INVOICES
        React.useEffect(() => {
          axios({
              method: 'post',
              url: window.$link + 'Company_invoices/getAll',
              withCredentials: false,
              params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                date_from: filteredData.from_date,
                date_to: filteredData.to_date,
                requester: userId,
              },
            }).then(function (response) {
                console.log(response);

                var pending = response.data.company_invoices.filter((info) => info.is_paid == "0");
                setUnpaidInvoices(pending);
            }).then(function (error) {
              console.log(error);
            });
      },[]);

    //ALL BOOKINGS
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'discounts/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            console.log(response.data.discounts.filter((info) => info.company_id != null));
            response.data.discounts.filter((info) => info.company_id != null).map((data) => {

            });
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
                        totalData={bookings.length}
                        todayData={todayBookings.length}
                        link={"/reports-transaction"}
                        title='Transactions'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        services={services.length}
                        packages={packages.length}
                        link={"/reports-services-packages"}
                        title='Services Today'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        totalData={homeServices.length}
                        todayData={todayHomeServices.length}
                        link={"/reports-home-services"}
                        title='Home Services'
                        color='maroon'
                    />
                </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                    <Card 
                        totalData={"P " + totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        todayData={""}
                        link={"/reports-sales"}
                        title="Today's Total Sales"
                        color='blue'
                        disable={"today"}
                    />
                </div>
                {/* <div className="col-sm-4">
                    <Card 
                        totalData={clinicServices.length}
                        link={"/reports-clinical-services"}
                        title='Clinical Tests'
                        color='blue'
                    />
                </div> */}
                <div className="col-sm-4">
                    <Card 
                        totalData={pendingPOs.length}
                        todayData={""}
                        link={"/reports-pending-po"}
                        title='POs pending for approval'
                        color='blue'
                        disable={"today"}
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        totalData={unpaidInvoices.length}
                        todayData={""}
                        link={"/unpaid-invoices"}
                        title='Unpaid Invoices'
                        color='blue'
                        disable={"today"}
                    />
                </div>
            </div>
            <div className="row">    
                <div className="col-sm-4">
                    <Card 
                        totalData={"MD REPORTS"}
                        todayData={""}
                        link={"/reports-md"}
                        title=''
                        color='blue'
                        disable={"today"}
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        totalData={pendingPOs.length}
                        todayData={""}
                        link={"/reports-credit"}
                        title='Credit Report'
                        color='blue'
                        disable={"today"}
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
