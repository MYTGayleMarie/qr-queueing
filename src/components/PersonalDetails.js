import React from 'react';

//css
import './PersonalDetails.css';

function PersonalDetails({data}) {

    const patient = data

    return (
        <div>
            <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

            <div className="personal-data-cont">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="first-name label">FIRST NAME</span>
                        <span className="first-name detail">{patient.firstName.toUpperCase()}</span>
                    </div>
                    <div className="col-sm-4">
                        <span className="last-name label">LAST NAME</span>
                        <span className="last-name detail">{patient.lastName.toUpperCase()}</span>
                    </div>
                    <div className="col-sm-4">
                        <span className="middle-name label">MIDDLE NAME</span>
                        <span className="middle-name detail">{patient.middleName.toUpperCase()}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="date-of-birth label">DATE OF BIRTH</span>
                        <span className="date-of-birth detail">{patient.dateOfBirth}</span>
                    </div>
                    <div className="col-sm-4">
                        <span className="sex label">SEX</span>
                        <span className="sex detail">{patient.sex.toUpperCase()}</span>
                    </div>
                    <div className="col-sm-4">
                        <span className="age label">AGE</span>
                        <span className="age detail">{patient.age}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span className="contact-number label">CONTACT NUMBER</span>
                        <span className="contact-number detail">{patient.contactNumber}</span>
                    </div>
                    <div className="col-sm-4">
                        <span className="email label">EMAIL</span>
                        <span className="email detail">{patient.email}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <span className="address label">ADDRESS</span>
                        <span className="address detail">{patient.address.toUpperCase()}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PersonalDetails
