import React, { Fragment } from 'react';

//css
import './Extraction.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download'];

const pendingData = [
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        birthDate: 'January 12, 2021',
        gender: 'MALE',
    },
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        birthDate: 'January 12, 2021',
        gender: 'MALE',
    },
    {
        bookId: '0199201',
        patientName: 'Juan Dela Cruz',
        birthDate: 'January 12, 2021',
        gender: 'MALE',
    },
];

function Extraction() {
    
    return (
        <div>
            <Navbar/>
            <div className="active-cont">
                <Fragment>
                <Searchbar title='PENDING FOR EXTRACTION'/>
                <Header 
                    type='thick'
                    title='BOOKING MANAGER' 
                    buttons={buttons} 
                    tableData={pendingData}
                />
                <Table
                    type={'no-action'}
                    tableData={pendingData}
                    headingColumns={['BOOKING ID', 'PATIENT NAME', 'BIRTHDATE', 'GENDER']}
                />
                </Fragment>
            </div>
        </div>
    )
}

export default Extraction
