import React, { Fragment } from 'react';
import { useForm } from "react-hooks-helper";

//css
import './Imaging.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download'];

const filterData = {
    from_date: "",
    to_date: "",
};

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

function Imaging() {

    const [filteredData, setFilter] = useForm(filterData);

    return (
        <div>
            <Navbar/>
            <div className="active-cont">
                <Fragment>
                <Searchbar title='PENDING FOR IMAGING'/>
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
                    filteredData={filteredData}
                    setFilter={setFilter}
                />
                </Fragment>
            </div>
        </div>
    )
}

export default Imaging
