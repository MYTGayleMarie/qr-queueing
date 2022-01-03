import React from 'react';

//css
import './PersonalDetails.css';

function TestDetails({ data }) {
  const patient = data;

  return (
    <div>
      <h3 className="form-categories-header italic">TEST DETAILS</h3>

      <div className="personal-data-cont">
        <div className="row">
          <div className="col-sm-4">
            <span className="first-name label">BOOKING ID</span>
            <span className="first-name detail">{patient.bookingId}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <span className="age label">BARCODE NO.</span>
            <span className="age detail">{patient.barcodeNo}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <span className="contact-number label">TEST</span>
            <span className="contact-number detail">{patient.testName.toUpperCase()}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <span className="address label">STATUS</span>
            <span className="address detail">{patient.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestDetails;
