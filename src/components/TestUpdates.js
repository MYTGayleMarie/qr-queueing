import React from 'react';

//css
import './View/MedTech/MedTechStart.css';

function getTime(date) {
  return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

function TestUpdates({ extractedOn, testStart, testFinish, categoryId }) {
  var formattedExtractedDate = "";
  var formattedTestStart = "";
  var formattedTestFinish = "";
  var date = "";

  if(extractedOn != null) {
    date = new Date(extractedOn);
    formattedExtractedDate = date.toDateString() + "\n" + getTime(date);
  }
  if(testStart != null) {
    date = new Date(testStart);
    formattedTestStart = date.toDateString() + "\n" + getTime(date);
  }
  if(testFinish != null) {
    date = new Date(testFinish);
    formattedTestFinish = date.toDateString() + "\n" + getTime(date);
  }


  return (
    <div>
      <br></br>
      <br></br>
      <h4 className="form-categories-header italic">UPDATES</h4>

      <table className="personal-data-cont">
        {formattedExtractedDate != "" && (
          <tr>
            <td className="first-name label">
              {categoryId == 18 && <span>IMAGING </span>}
              {categoryId != 18 && <span>EXTRACTION </span>}
              COMPLETED</td>
            <td className="first-name detail">{formattedExtractedDate}</td>
          </tr>
        )}
        {formattedTestStart != "" && (
          <tr>
            <td className="age label col-sm-4">EXAMINATION STARTED</td>
            <td className="age detail col-sm-8">{formattedTestStart}</td>
          </tr>
        )}
        {formattedTestFinish != "" && (
        <tr>
          <td className="contact-number label col-sm-4">EXAMINATION COMPLETED</td>
          <td className="contact-number detail col-sm-8">{formattedTestFinish}</td>
        </tr>
        )}
      </table>
    </div>
  );
}

export default TestUpdates;
