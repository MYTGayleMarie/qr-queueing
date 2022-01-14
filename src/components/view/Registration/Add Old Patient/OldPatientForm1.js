import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import axios from 'axios';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';

const userToken = getToken();
const userId = getUser();

function OldPatientForm1({ customer, setPersonal, lastMeal, setLastMeal, navigation  }) {
    document.body.style = 'background: white;';
    //customer details
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [emailadd, setEmail] = useState("");
    const [homeaddress, setAddress] = useState("");
    const {id} = useParams();

    axios({
        method: 'post',
        url: window.$link + 'customers/show/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (customer) {
        var presentDate = new Date();
        var birthDate = new Date(customer.data.birthdate);
        const age = presentDate.getFullYear() - birthDate.getFullYear();
        setFirstName(customer.data.first_name);
        setMiddleName(customer.data.middle_name);
        setLastName(customer.data.last_name);
        setBirthDate(birthDate.toDateString());
        setGender(customer.data.gender);
        setAge(age);
        setContactNo(customer.data.contact_no);
        setEmail(customer.data.email);
        setAddress(customer.data.address);

    }).catch(function (error) {
        console.log(error);
    });

    const { fname, lname, mname, sex, birthDate, email, contactNum, address, referral, discountCode, discountDetail, serviceLocation, result, dateOfTesting, lastmeal } = customer;
    const [activation, setActive] = useState(false);

    function turnActive() {
        setActive(true);
    }

    function proceed() {
        if(serviceLocation != "" && result != "" && dateOfTesting != "" && lastMeal != "") {
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
         title="PATIENT DETAILS"
         />

             <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

             <div className="personal-data-cont">
        <div className="row">
            <div className="col-sm-4">
            <span className="first-name label">FIRST NAME</span>
            <span className="first-name detail">{firstName.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
            <span className="last-name label">LAST NAME</span>
            <span className="last-name detail">{lastName.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
            <span className="middle-name label">MIDDLE NAME</span>
            <span className="middle-name detail">{middleName.toUpperCase()}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
            <span className="date-of-birth label">DATE OF BIRTH</span>
            <span className="date-of-birth detail">{birthday}</span>
            </div>
            <div className="col-sm-4">
            <span className="sex label">SEX</span>
            <span className="sex detail">{gender.toUpperCase()}</span>
            </div>

        </div>
        <div className="row">
            <div className="col-sm-4">
            <span className="contact-number label">CONTACT NUMBER</span>
            <span className="contact-number detail">{contactNo}</span>
            </div>
            <div className="col-sm-4">
            <span className="email label">EMAIL</span>
            <span className="email detail">{emailadd}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
            <span className="address label">ADDRESS</span>
            <span className="address detail">{homeaddress.toUpperCase()}</span>
            </div>
        </div>
        </div>

             <div className="booking-form">
             <h3 className="form-categories-header italic">BOOKING DETAILS</h3>
             <form className="needs-validation">
             <div className="row">
                <label for="address" className="form-label">REFERRAL</label><br />
                <input type="text" className="form-control full" id="referral" name="referral" value={referral} onChange={setPersonal} required/><br />
            </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <label for="address" className="form-label">DISCOUNT CODE</label><br />
                            <input type="text" className="form-control full" id="discount_code" name="discountCode" value={discountCode} onChange={setPersonal}/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="address" className="form-label">DISCOUNT DETAIL</label><br />
                            <input type="text" className="form-control full" id="discount_detail" name="discountDetail" value={discountDetail} onChange={setPersonal}/><br />
                        </div>
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
             </div>
         </div>
     </div>
    )
}

export default OldPatientForm1
