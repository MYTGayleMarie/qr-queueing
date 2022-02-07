import React from 'react';

//css
import './PersonalDetails.css';

function TestDetails({ data }) {
  const patient = data;

  return (
    <div>
      <br></br><br></br>
      <h4 className="form-categories-header italic">TEST DETAILS</h4>

      <table className="test-details-cont">
        <tr>
          <td className="first-name label">BOOKING ID</td>
          <td className="first-name detail">{patient.bookingId}</td>
        </tr>
        <tr>
          <td className="age label">BARCODE NO.</td>
          <td className="age detail col-sm-8">{patient.examinationStarted}</td>
        </tr>
        <tr>
          <td className="contact-number label">TEST</td>
          <td className="contact-number detail">{patient.testName.toUpperCase()}</td>
        </tr>
        <tr>
          <td className="address label">STATUS</td>
          <td className="address detail">{patient.status.toUpperCase()}</td>
        </tr>
      </table>
    </div>
  );
}

export default TestDetails;
