import React, {Fragment} from 'react';
import { Navigate } from 'react-router-dom';

//css
import './ChiefMedTech.css';

//components
import Searchbar from '../../Searchbar.js';
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['download'];

const patientData = [
    {
        bookId: '0199201',
        barcodeNo: '000000000000',
        test: 'Test 1',
        status: 'COMPLETED',
        action: 'PAID',
    },
    {
        bookId: '0199201',
        barcodeNo: '000000000000',
        test: 'Test 2',
        status: 'COMPLETED',
        action: 'PENDING',
    },
      
];

function Chief() {


    return (
        <>
        <Navbar/>
        <div className="active-cont">
        <Fragment>
        <Searchbar title='MEDICAL TECHNOLOGY'/>
        <Header 
            type='thick'
            title='BOOKING MANAGER' 
            buttons={buttons} 
            tableData={patientData}
        />
        <Table
            type={'no-action'}
            tableData={patientData}
            headingColumns={['BOOKING ID', 'BARCODE NO.', 'TESTS', 'STATUS', 'ACTION']}
        />
        </Fragment>
        </div>
        </>
    )
}

export default Chief
