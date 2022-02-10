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


const patientData = [
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        bookingTime: 'November 11, 2021 4:00PM',
    },
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        bookingTime: 'November 11, 2021 4:00PM',
    },
    
];

function Reports() {
    //STATES
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);

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

    //COUNT FUNCTIONS
    function countTransaction(data) {
        return data.length; 
    }

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
                        data={countTransaction(bookings)}
                        link={"/reports-transaction"}
                        title='Total number of Transactions'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        link={""}
                        title='Total number of Services and Packages'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        link={""}
                        title='Total number of Home Services'
                        color='maroon'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        link={""}
                        title='Total number of Clinical Tests'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        link={""}
                        title='Total number of POs pending for approval'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        link={""}
                        title='Item History'
                        color='blue'
                    />
                </div>
            </div>
            <div className="row">
                <Table
                    type={'report'}
                    tableData={patientData}
                    headingColumns={['NAME OF TEST', 'CLINIC SERVICE', 'HOME SERVICE']}
                />
            </div>


            </Fragment>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Reports
