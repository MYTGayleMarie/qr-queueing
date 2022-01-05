import React, { useState } from "react";
import { Navigate } from "react-router-dom";


//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';
import TestDetails2 from "../../TestDetails2.js";
import TestUpdates
 from "../../TestUpdates.js";
const patientData = 
    {
        bookingId: '0199201',
        barcodeNo: '000000000000',
        testName: 'Test 1',
        status: 'ON GOING',
        extractionCompleted: 'NOVEMBER 25 9:00 PM',
        examinationStarted: 'NOVEMBER 26, 7:30 PM',
        examinationCompleted: 'NOVEMBER 28, 8:00 AM',
        
    };

function testInput() {
    return (
        <input type="text" className="test-input" name="imaging_test_1"/>
    )
}
    
function ChiefTests2() {

    const [inputBox, setImaging] = useState(false);

    const toggleImaging= () => {
        setImaging(!inputBox);
    };

    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='CHIEF MEDICAL TECHNOLOGY' 
            />

            <div class="column" align = "right">

                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="avatar"></input>
                </form>

            </div>
            <div class="row2">
                <div class="column"><TestDetails2 data={patientData}/></div>
            
            </div>
            
            
            <TestUpdates data={patientData}/>

            <div className="row d-flex justify-content-center">        
                {inputBox === false && <button className="start-btn" onClick={toggleImaging}>UPLOAD RESULTS</button>}  
                {inputBox === true && <button className="save-details-btn" onClick={toggleImaging}>SAVE DETAILS</button>}     
            </div>

        </div>
            
        </div>
    )
}

export default ChiefTests2
