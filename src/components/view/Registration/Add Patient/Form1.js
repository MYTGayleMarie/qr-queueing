import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Form1.css'

//components
import Header from '../../../Header.js';

function AddPatient() {

    const navigate = useNavigate();
    navigate('/add-service');

    return (
        <div>
           <Header 
           type="thin"
           title="ADD PATIENT"
           />

            <h3 class="form-categories-header italic">PERSONAL DETAILS</h3>

            <div class="booking-form">
            <form class="needs-validation">
                <div class="row">
                    <div class="col-sm-6">
                        <label for="fname" class="form-label">FIRST NAME <i>(required)</i></label><br />
                        <input type="text" class="form-control" id="fname" name="fname" /><br />
                    </div>
                    <div class="col-sm-4">
                    <label for="lname" class="form-label">LAST NAME <i>(required)</i></label><br />
                        <input type="text" class="form-control" id="lname" name="lname" /><br />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label for="fname" class="form-label">MIDDLE NAME</label><br />
                        <input type="text" class="form-control" id="mname" name="mname" /><br />
                    </div>
                    <div class="col-sm-2">
                    <label for="lname" class="form-label">SEX<i>(required)</i></label><br />
                        <select class="gender-select">
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <label for="email" class="form-label">DATE OF BIRTH<i>(required)</i></label><br />
                        <input type="date" id="date" name="date" class="schedule"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <label for="email" class="form-label">EMAIL <i>(required)</i></label><br />
                        <input type="text" class="form-control" id="email" name="email" /><br />
                    </div>
                    <div class="col-sm-6">
                        <label for="confirm-email" class="form-label">CONTACT NUMBER <i>(required)</i></label><br />
                        <input type="text" class="form-control" id="confirm-email" name="confirm-email" /><br />
                    </div>
                </div>
                <div class="row">
                    <label for="address" class="form-label">ADDRESS <i>(required)</i></label><br />
                    <input type="text" class="form-control full" id="fname" name="fname" /><br />
                </div>
                <div class="row small-gap">
                    <div class="col-sm-6">
                        <div class="row">
                        <span class="radio-header">LOCATION OF SERVICE</span><br />
                            <div class="col">
                                <input type="radio" id="service_location" name="service_location" value="clinic"/><label for="clinic" class="radio-label">CLINIC</label>
                            </div>
                            <div class="col">
                                <input type="radio" id="service_location" name="service_location" value="home service"/><label for="home-service" class="radio-label">HOME SERVICE</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                        <label for="result" class="radio-header">RESULTS</label><br />
                            <div class="col">
                                <input type="radio" id="result" name="result" value="email"/><label for="email" class="radio-label">EMAIL</label>
                            </div>
                            <div class="col">
                                <input type="radio" id="result" name="result" value="print with pickup"/><label for="print-with-pickup" class="radio-label">PRINT WITH PICKUP</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row date-of-testing-container large-gap">
                    <label for="date" class="form-label">DATE OF TESTING<i>(required)</i></label><br />
                    <input type="date" id="date" name="date" class="schedule"></input>
                </div>

                <div class="d-flex justify-content-end">
                <button class="proceed-btn" onClick={navigate}>PROCEED</button>
                </div>

            </form>
            </div>
        </div>
    )
}

export default AddPatient
