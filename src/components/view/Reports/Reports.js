import React, {Fragment} from 'react';

//css
import './Reports.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Card from '../../Card';

var amount = 100; 

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
                        title='Total number of Patients'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        title='Total number of Clinic Service'
                        color='maroon'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        title='Total number of Home Service'
                        color='maroon'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        title='Total number of Extraction'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        title='Total number of Imaging'
                        color='blue'
                    />
                </div>
                <div className="col-sm-4">
                    <Card 
                        data={amount}
                        title='Total number of Email Results'
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
