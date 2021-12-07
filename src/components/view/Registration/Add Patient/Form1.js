import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Form1.css'

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';

function AddPatient() {

    const navigate = useNavigate();
    navigate('/add-service');

    return (
        <div>
           <Navbar/>
           <div className="active-cont">
            <Header 
            type="thin"
            title="ADD PATIENT"
            />

                <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

                <div className="booking-form">
                <form className="needs-validation">
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="fname" className="form-label">FIRST NAME <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="fname" name="fname" /><br />
                        </div>
                        <div className="col-sm-4">
                        <label for="lname" className="form-label">LAST NAME <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="lname" name="lname" /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label for="fname" className="form-label">MIDDLE NAME</label><br />
                            <input type="text" className="form-control" id="mname" name="mname" /><br />
                        </div>
                        <div className="col-sm-2">
                        <label for="lname" className="form-label">SEX<i>(required)</i></label><br />
                            <select className="gender-select">
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label for="email" className="form-label">DATE OF BIRTH<i>(required)</i></label><br />
                            <input type="date" id="date" name="date" className="schedule"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="email" className="form-label">EMAIL <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="email" name="email" /><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="confirm-email" className="form-label">CONTACT NUMBER <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="confirm-email" name="confirm-email" /><br />
                        </div>
                    </div>
                    <div className="row">
                        <label for="address" className="form-label">ADDRESS <i>(required)</i></label><br />
                        <input type="text" className="form-control full" id="fname" name="fname" /><br />
                    </div>
                    <div className="row small-gap">
                        <div className="col-sm-6">
                            <div className="row">
                            <span className="radio-header">LOCATION OF SERVICE</span><br />
                                <div className="col">
                                    <input type="radio" id="service_location" name="service_location" value="clinic"/><label for="clinic" className="radio-label">CLINIC</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="service_location" name="service_location" value="home service"/><label for="home-service" className="radio-label">HOME SERVICE</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                            <label for="result" className="radio-header">RESULTS</label><br />
                                <div className="col">
                                    <input type="radio" id="result" name="result" value="email"/><label for="email" className="radio-label">EMAIL</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="result" name="result" value="print with pickup"/><label for="print-with-pickup" className="radio-label">PRINT WITH PICKUP</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row date-of-testing-container large-gap">
                        <label for="date" className="form-label">DATE OF TESTING<i>(required)</i></label><br />
                        <input type="date" id="date" name="date" className="schedule"></input>
                    </div>

                    <div className="d-flex justify-content-end">
                    <button className="proceed-btn" onClick={navigate}>PROCEED</button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    )
}

export default AddPatient
