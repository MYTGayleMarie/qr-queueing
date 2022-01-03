import React from 'react';

//css
import './PersonalDetails.css';

function TestUpdates({ data }) {
  const patient = data;

  return (
    <div>
      <h3 className="form-categories-header italic">UPDATES</h3>

      <div className="personal-data-cont">
        <div className="row">
          <div className="col-sm-4">
            <span className="first-name label">EXTRACTION COMPLETED</span>
            <span className="first-name detail">{patient.extractionCompleted}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <span className="age label">EXAMINATION STARTED</span>
            <span className="age detail">{patient.examinationStarted}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <span className="contact-number label">EXAMINATION COMPLETED</span>
            <span className="contact-number detail">{patient.examinationCompleted.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestUpdates;
