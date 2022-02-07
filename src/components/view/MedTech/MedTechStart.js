import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';
import TestDetails2 from "../../TestDetails2.js";
import TestUpdates from "../../TestUpdates.js";

//images
import uploadIcon from '../../../images/icons/upload-icon.png';


//variables
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
    
function MedTechStart() {
    
    const {id} = useParams();
    const [inputBox, setImaging] = useState(false);
    const [file, setFile] = useState("");

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
            <div className="row">
                <div className="col-sm-6">
                    <TestDetails2 data={patientData}/>
                </div>
                <div className="col-sm-6">
                    <div className="upload-area d-flex justify-content-center">
                        {file.length == 0 && (
                            <div class="upload-btn-wrapper">
                              <div className="upload">
                                  <img src={uploadIcon} alt={'upload-here'} className="upload-icon"></img><br/>
                                  <span className="upload-inst"><b>Upload Results</b> or drop it here</span>
                              </div>
                              <input type="file" name="file" onChange={(e) => setFile(e.target.files)}/>
                          </div>
                        )}
                        {file.length != 0 && (
                            <span className="uploaded-file">File: {file[0].name}</span>
                         )}
                    </div>
                </div>
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

export default MedTechStart
