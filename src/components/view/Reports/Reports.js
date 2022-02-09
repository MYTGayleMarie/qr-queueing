import React, {Fragment} from 'react';

//css
import './Reports.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table';
import Card from '../../Card';

var amount = 100; 


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
                        data={amount}
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
