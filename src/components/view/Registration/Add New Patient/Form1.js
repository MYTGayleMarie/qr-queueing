import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './Form1.css';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';


function AddPatient({ customer, setPersonal, lastMeal, setLastMeal, navigation  }) {
    document.body.style = 'background: white;';
    const { fname, lname, mname, sex, birthDate, email, contactNum, address, serviceLocation, result, dateOfTesting, lastmeal } = customer;
    const [activation, setActive] = useState(false);

    function turnActive() {
        setActive(true);
    }

    function proceed() {
        if(fname != "" && lname != "" && mname != "" && sex != "" && birthDate != "" && email != "" && contactNum != "" && address != "" && serviceLocation != "" && result != "" && dateOfTesting != "" && lastMeal != "") {
            return (
                <div className="d-flex justify-content-end">
                <button 
                    className="proceed-btn" 
                    onClick={() => navigation.next()}
                >
                PROCEED
                </button>
                </div>
            );
        } else {
            console.log("Incomplete");
        }
    }

    function sinceLastMeal() {
        var presentDate = new Date();
        let diffInMilliSeconds = Math.abs(presentDate - lastMeal) / 1000;
        
        //calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        console.log('calculated days', days);
    
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        console.log('calculated hours', hours);
    
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        console.log('minutes', minutes);

        let difference = '';
        if (days > 0) {
          difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }
    
        difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    
        difference += (minutes === 0 || hours === 1) ? `${minutes} minutes ago` : `${minutes} minutes ago`; 
        return difference;
    }

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
                                    <input type="radio" id="result" name="result" value="print with pickup" checked={result === 'print with pickup'} onChange={setPersonal}/><label for="print-with-pickup" className="radio-label">PRINT WITH PICKUP</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row date-of-testing-container large-gap">
                        <div className="col-sm-4">
                            <label for="date" className="form-label">DATE OF TESTING<i>(required)</i></label><br />
                            <input type="date" id="date" name="dateOfTesting" className="schedule" value={dateOfTesting} onChange={setPersonal} required></input>
                        </div>
                        <div className="col-sm-4">
                            <label for="last_meal" className="form-label">LAST MEAL<i>(required)</i></label><br />
                            <DateTimePicker
                                onChange={setLastMeal}
                                value={lastMeal}
                            />
                        </div>
                        <div className="col-sm-4">
                        <label for="date" className="form-label">SINCE LAST MEAL</label><br />
                            <span className="since-lastmeal">{sinceLastMeal()}</span>

                        </div>
                    </div>

                    <div>{proceed()}</div>

                </form>
                <ToastContainer/>
                </div>
            </div>
        </div>
    )
}

export default AddPatient
