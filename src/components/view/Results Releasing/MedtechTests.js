import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';
import TestDetails from '../../TestDetails.js';
import TestUpdates from '../../TestUpdates.js';
const patientData = {
  bookingId: '0199201',
  barcodeNo: '000000000000',
  testName: 'Test 1',
  status: 'FOR EXAMINATION',
  extractionCompleted: 'NOVEMBER 25 9:00 PM',
  examinationStarted: 'NOVEMBER 26, 7:30 PM',
  examinationCompleted: 'NOVEMBER 28, 8:00 AM',
};

function MedtechTests() {
  return <input type="text" className="test-input" name="imaging_test_1" />;
}

function ChiefTests() {
  const [inputBox, setImaging] = useState(false);

  const toggleImaging = () => {
    setImaging(!inputBox);
  };

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="MEDICAL TECHNOLOGY" />
        <TestDetails data={patientData} />
        <TestUpdates data={patientData} />

        <div className="row d-flex justify-content-center">
          {inputBox === false && (
            <button className="start-btn" onClick={toggleImaging}>
              UPLOAD RESULTS
            </button>
          )}
          {inputBox === true && (
            <button className="save-details-btn" onClick={toggleImaging}>
              SAVE DETAILS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedtechTests;
