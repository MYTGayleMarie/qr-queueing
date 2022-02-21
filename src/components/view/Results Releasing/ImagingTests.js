import React, { useState } from "react";

//css
import './ImagingTests.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';

const patientData = 
    {
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        middleName: 'Dela Flores',
        dateOfBirth: 'March 23, 2020',
        sex: "female",
        age: '20',
        contactNumber: "0992910291",
        email: "jjdelacruz@gmail.com",
        address: "Mandaue City, Cebu Philippines"
    };

function testInput() {
    return (
        <input type="text" className="test-input" name="imaging_test_1"/>
    )
}
    
function ImagingTests() {

    const [inputBox, setImaging] = useState(false);

    const toggleImaging= () => {
        setImaging(!inputBox);
    };

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='IMAGING TESTS' 
            />
            <PersonalDetails
                data={patientData}
            />
            <h1 className="test-header">IMAGING TESTS</h1>

            <div class="test-list">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="test-label">Laboratory 1</span>
                    </div>
                    <div className="col-sm-6">
                        {inputBox === true && testInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="test-label">Laboratory 2</span>
                    </div>
                    <div className="col-sm-6">
                        {inputBox === true && testInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="test-label">Laboratory 3</span>
                    </div>
                    <div className="col-sm-6">
                        {inputBox === true && testInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="test-label">Laboratory 4</span>
                    </div>
                    <div className="col-sm-6">
                        {inputBox === true && testInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="test-label">Laboratory 5</span>
                    </div>
                    <div className="col-sm-6">
                        {inputBox === true && testInput()}
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center">        
                {inputBox === false && <button className="start-btn" onClick={toggleImaging}>START EXTRACTION</button>}  
                {inputBox === true && <button className="save-details-btn" onClick={toggleImaging}>SAVE DETAILS</button>}     
            </div>

        </div>
            
        </div>
    )
}

export default ImagingTests
