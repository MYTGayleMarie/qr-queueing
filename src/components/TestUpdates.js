import React from 'react';

//css
import './View/ChiefMedTech/ChiefTests.css';

function TestUpdates({ data }) {
  const patient = data;

  
  return (
    <div>
      <br></br><br></br>
      <h4 className="form-categories-header italic">UPDATES</h4>

      <table className="personal-data-cont">
        <tr>
          <td className="first-name label">EXTRACTION COMPLETED</td>
          <td className="first-name detail">{patient.extractionCompleted}</td>
        </tr>
        <tr>
          <td className="age label col-sm-4">EXAMINATION STARTED</td>
          <td className="age detail col-sm-8">{patient.examinationStarted}</td>
        </tr>
        <tr>
          <td className="contact-number label col-sm-4">EXAMINATION COMPLETED</td>
          <td className="contact-number detail col-sm-8">{patient.examinationCompleted.toUpperCase()}</td>
        </tr>
      </table>
    </div>
  );
}

export default TestUpdates;
