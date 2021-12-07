import React, {useState, Fragment} from 'react';

//css
import './Cashier.css';

//components
import Searchbar from '../../Searchbar.js';
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['download','add-payment'];

const patientData = [
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        bookingTime: 'November 11, 2021 4:00PM',
        serviceType: 'HOME SERVICE',
        payment: 'PAID',
        paymentMethod: 'CASH',
    },
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        bookingTime: 'November 11, 2021 4:00PM',
        serviceType: 'CLINIC SERVICE',
        payment: 'PENDING',
        paymentMethod: 'CREDIT',
    },
      
];

function Cashier() {

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
            headingColumns={['BOOKING ID', 'PATIENT NAME', 'BOOKING TIME', 'SERVICE TYPE', 'PAYMENT', 'PAYMENT METHOD']}
        />
        </Fragment>
        </div>
        </>
    )
}

export default Cashier
