import React from 'react';

//css
import './View/MedTech/MedTechStart.css';

function TestUpdates({ extractedOn, testStart, testFinish, categoryId }) {
  var formattedExtractedDate = new Date(extractedOn);

  return (
    <div>
      <br></br>
      <br></br>
      <h4 className="form-categories-header italic">UPDATES</h4>

      <table className="personal-data-cont">
        {extractedOn != "" && (
          <tr>
            <td className="first-name label">
              {categoryId == 18 && <span>IMAGING </span>}
              {categoryId != 18 && <span>EXTRACTION </span>}
              COMPLETED</td>
            <td className="first-name detail">{formattedExtractedDate.toDateString()}</td>
          </tr>
        )}
        {testStart != "" && (
          <tr>
            <td className="age label col-sm-4">EXAMINATION STARTED</td>
            <td className="age detail col-sm-8">{testStart}</td>
          </tr>
        )}
        {testFinish != "" && (
        <tr>
          <td className="contact-number label col-sm-4">EXAMINATION COMPLETED</td>
          <td className="contact-number detail col-sm-8">{testFinish}</td>
        </tr>
        )}
      </table>
    </div>
  );
}

export default TestUpdates;
