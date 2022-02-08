import React from 'react';

//css
import './PersonalDetails.css';

function TestDetails({bookID, barcode, test, status}) {

  return (
    <div>
      <br></br><br></br>
      <h4 className="form-categories-header italic">TEST DETAILS</h4>
        <table className="test-details-cont">
          <tr>
            <td className="first-name label">BOOKING ID</td>
            <td className="first-name detail">{bookID}</td>
          </tr>
          <tr>
            <td className="age label">BARCODE NO.</td>
            <td className="age detail col-sm-8">{barcode}</td>
          </tr>
          <tr>
            <td className="contact-number label">TEST</td>
            <td className="contact-number detail">{test}</td>
          </tr>
          <tr>
            <td className="address label">STATUS</td>
            <td className="address detail">{status}</td>
          </tr>
        </table>

    </div>
  );
}

export default TestDetails;
