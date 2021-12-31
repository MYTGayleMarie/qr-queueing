import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

//css
import './Form1.css';


//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';

function AddPatient({ customer, setPersonal, navigation  }) {

    if(window.$userToken == null) {
        return (
            <Navigate to="/"/>
        )
    }

    const { fname, lname, mname, sex, birthDate, email, contactNum, address, serviceLocation, result, dateOfTesting } = customer;

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
                            <input type="text" className="form-control" id="fname" name="fname" value={fname} onChange={setPersonal} required/><br />
                        </div>
                        <div className="col-sm-4">
                        <label for="lname" className="form-label">LAST NAME <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="lname" name="lname" value={lname} onChange={setPersonal} required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label for="fname" className="form-label">MIDDLE NAME</label><br />
                            <input type="text" className="form-control" id="mname" name="mname" value={mname} onChange={setPersonal}/><br />
                        </div>
                        <div className="col-sm-2">
                        <label for="sex" className="form-label">SEX<i>(required)</i></label><br />
                            <select name="sex" className="gender-select" value={sex} onChange={setPersonal} required>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label for="birthDate" className="form-label">DATE OF BIRTH<i>(required)</i></label><br />
                            <input type="date" id="date" name="birthDate" className="schedule" value={birthDate} onChange={setPersonal} required></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="email" className="form-label">EMAIL <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="email" name="email" value={email} onChange={setPersonal} required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="contactNum" className="form-label">CONTACT NUMBER <i>(required)</i></label><br />
                            <input type="text" className="form-control" id="contactNum" name="contactNum" value={contactNum} onChange={setPersonal} required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <label for="address" className="form-label">ADDRESS <i>(required)</i></label><br />
                        <input type="text" className="form-control full" id="address" name="address" value={address} onChange={setPersonal} required/><br />
                    </div>
                    <div className="row small-gap">
                        <div className="col-sm-6">
                            <div className="row">
                            <span className="radio-header">LOCATION OF SERVICE</span><br />
                                <div className="col">
                                    <input type="radio" id="serviceLocation" name="serviceLocation" value="clinic" checked={serviceLocation === 'clinic'} onChange={setPersonal}/><label for="clinic" className="radio-label" >CLINIC</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="serviceLocation" name="serviceLocation" value="home service" checked={serviceLocation === 'home service'} onChange={setPersonal}/><label for="home-service" className="radio-label">HOME SERVICE</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                            <label for="result" className="radio-header">RESULTS</label><br />
                                <div className="col">
                                    <input type="radio" id="result" name="result" value="email" checked={result === 'email'} onChange={setPersonal}/><label for="email" className="radio-label">EMAIL</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="result" name="result" value="print with pickup" checked={serviceLocation === 'print with pickup'} onChange={setPersonal}/><label for="print-with-pickup" className="radio-label">PRINT WITH PICKUP</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row date-of-testing-container large-gap">
                        <label for="date" className="form-label">DATE OF TESTING<i>(required)</i></label><br />
                        <input type="date" id="date" name="dateOfTesting" className="schedule" value={dateOfTesting} onChange={setPersonal} required></input>
                    </div>

                    <div className="d-flex justify-content-end">
                    <button 
                        className="proceed-btn" 
                        onClick={() => navigation.next()}
                    >
                    PROCEED
                    </button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    )
}

export default AddPatient
