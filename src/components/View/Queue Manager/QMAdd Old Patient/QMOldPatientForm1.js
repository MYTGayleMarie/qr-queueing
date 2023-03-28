import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import axios from 'axios';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';

//css
import './QMOldPatientForm1.css';

const userToken = getToken();
const userId = getUser();

function QMOldPatientForm1({ customer, setPersonal, setIsService, setIsPackage, discount, setDiscount, setIsCompany, lastMeal, setLastMeal, navigation, mdCharge, setMdCharge, serviceFee, setServiceFee, location, setLocation, dateOfTesting, setDOT, discountDetails, setDiscountDetails  }) {
    console.log("THIS IS A TEST ", customer)
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
    const [result, setResult] = useState("");
    const {id} = useParams();

    const [discountList, setDiscountList] = useState([]);
    const [companyId, setCompanyId] = useState("");
    const [companyRemarks, setCompanyRemarks] = useState("");

    const [people, setPeople] = useState(0);
    const [km, setKm] = useState(0);

    axios({
        method: 'post',
        url: window.$link + 'bookings/show/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        setResult(response.data.result);
    })

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
        // console.log("CUSTOMER: ", customer);
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
        //setResult(customer.data.result);

    }).catch(function (error) {
        console.log(error);
    });

    const { fname, lname, mname, sex, birthDate, email, contactNum, address, referral, discountId, discountDetail, serviceLocation, lastmeal, homeServiceFee } = customer;
    const [activation, setActive] = useState(false);

    function turnActive() {
        setActive(true);
    }

    function proceed() {
        if(serviceLocation != "" && result != "" && dateOfTesting != "" && lastMeal != "" && referral != "") {
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
        } 
    }

    function homeServiceFeeDisplay() {
        if (
          serviceLocation === "home service"
        ) {
          return (
            <div className="row date-of-testing-container small-gap">
            <div className="col">
              <label for="result" className="radio-header">
              SERVICE LOCATION
              </label>
              <br />
              <select name="homeServiceFee" className="home-service-fee-select" value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="" selected disabled>Select</option>
            <option value={0}>Within 2km or less</option>
            <option value={1}>More than 2km</option>
            <option value={2}>Outside Tacloban or Palo</option>
            <option value={3}>Company</option>
            <option value={4}>Mobile Charge</option>
          </select>
        </div>
        <div className="col">
        {location != "" && (
                <label for="result" className="radio-header">
                    SERVICE FEE
                </label>
                )}
                {location == 0 && location != "" && (
                    <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
                      <option value="" selected>Select</option>
                      <option value={250}>(1 - 2 PAX) - P 250</option>
                      <option value={150}>(3 or more) - P 150</option>
                    </select>
                )}
                 {location == 1 && (
                    <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
                      <option value="" selected>Select</option>
                      <option value={300}>(1 - 2 PAX) - P 300</option>
                      <option value={180}>(3 or more) - P 180</option>
                    </select>
                )}
                {location == 3 && (
                    <input type="number" name="serviceFee"  className="home-service-fee-select" value={serviceFee} min="1" onChange={(e) => setServiceFee(e.target.value) }/>
                )}
                {location == 4 && (
                    <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
                      <option value="" selected>Select</option>
                      <option value={65}>Male - P 65</option>
                      <option value={25} >Female - P 25 </option>
                    </select>
                )}
                {location == 2 && (
                    <input type="number" name="serviceFee"  className="home-service-fee-select" value={serviceFee} min="1" onChange={(e) => setServiceFee(e.target.value) }/>
                )}
         </div>
          </div>
          );
        } else {
          console.log('Error. No home service fee');
        }
      }

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'discounts/getAll',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setDiscountList(response.data.discounts);
        }).catch(function (error) {
            console.log(error);
        });
    },[]);

    React.useEffect(() => {
        if (discountId == "") {
            setDiscount(0);
            setDiscountDetails(null);
            setCompanyId("");
            setIsService("");
            setIsPackage("");
        }

        axios({
            method: 'post',
            url: window.$link + 'discounts/show/' + discountId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setCompanyId(response.data.data.discount.company_id);
            setDiscount(response.data.data.discount.percentage);
            setDiscountDetails(response.data.data.discount_details);
            if(response.data.is_package == "1") {
                setIsPackage("1");
            }
            if(response.data.is_service == "1") {
                setIsService("1");
            }
        }).catch(function (error) {
            console.log(error);
        });
    },[discountId]);

    React.useEffect(() => {
        setCompanyRemarks("");
        axios({
            method: 'post',
            url: window.$link + 'companies/show/' + companyId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setCompanyRemarks(response.data.remarks);
            setIsCompany(true);
        }).catch(function (error) {
            console.log(error);
        });

    },[companyId]);

    const listOfDiscount =  discountList.map((row, index) => {
            return(
                <option key={index} value={row.id}>{row.description + " (" + row.discount_code + ")" }</option>
            );
    });

    function sinceLastMeal() {
        var presentDate = new Date();
        let diffInMilliSeconds = Math.abs(presentDate - lastMeal) / 1000;
        
        //calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
    
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
    
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

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
                <label for="address" className="form-label">REFERRAL <i>(required)</i></label><br />
                <input type="text" className="form-control full" id="referral" name="referral" value={referral} onChange={setPersonal} required/><br />
            </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <label for="address" className="form-label">DISCOUNT CODE</label><br />
                            <select className="select-input full" id="discount_code" name="discountId" value={discountId} onChange={setPersonal}>
                                <option value="">None</option>
                                {listOfDiscount}
                            </select>
                            <br />
                        </div>
                        <div className="col-sm-6">
                            <label for="address" className="form-label">DISCOUNT REMARKS</label><br />
                            <span className="remarks ">{companyRemarks != "" && companyRemarks}</span>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-sm-12">
                            <label for="address" className="form-label">DISCOUNT DETAIL</label><br />
                            <input type="text" className="form-control full" id="discount_detail" name="discountDetail" value={discountDetail} onChange={setPersonal}/><br />
                        </div>
                    </div>

                    <div className="row small-gap">
                     <div className="col-sm-6">
                         <div className="row">
                         <span className="radio-header">LOCATION OF SERVICE</span><br />
                             <div className="col">
                                 <input type="radio" id="serviceLocation" name="serviceLocation" value="clinic" checked onChange={setPersonal}/><label for="clinic" className="radio-label" >CLINIC</label>
                             </div>
                             <div className="col">
                                 <input type="radio" id="serviceLocation" disabled name="serviceLocation" value="home service" checked={serviceLocation === 'home service'} onChange={setPersonal}/><label for="home-service" className="radio-label">HOME SERVICE</label>
                             </div>
                         </div>
                     </div>
                     <div className="col-sm-6">
                         <div className="row">
                         <label for="result" className="radio-header">RESULTS</label><br />
                             <div className="col">
                                 <input type="radio" id="result" name="result" value="email" checked={result === 'email'} onChange={() => setResult("email")}/><label for="email" className="radio-label">EMAIL</label>
                             </div>
                             <div className="col">
                                 <input type="radio" id="result" name="result" value="print with pickup" checked={result === 'print with pickup'} onChange={() => setResult("print with pickup")}/><label for="print-with-pickup" className="radio-label">PRINT</label>
                             </div>
                             <div className="col">
                                <input type="radio" id="result" name="result" value="both" checked={result === 'both'} onChange={() => setResult("result")}/><label for="print-with-pickup" className="radio-label">BOTH</label>
                            </div>
                         </div>
                     </div>
                 </div>
                <div className="row small-gap">
                        <div className="col-sm-6">
                            <div className="row">
                                <span className="radio-header">MD CHARGE</span><br />
                                <div className="col">
                                    <input type="checkbox" name="physical_exam" value="physical exam" checked={mdCharge.physical_exam == true} onChange={setMdCharge}/><label for="mdCharge" className="booking-label">Physical Exam</label>
                                </div>
                                <div className="col">
                                    <input type="checkbox" name="medical_certificate" value="medical certificate" checked={mdCharge.medical_certificate == true} onChange={setMdCharge}/><label for="mdCharge" className="booking-label">Medical Certificate</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {homeServiceFeeDisplay()}
                        </div>
                </div>

                 <div className="row date-of-testing-container large-gap">
                     <div className="col-sm-4">
                         <label for="date" className="form-label">DATE OF TESTING<i>(required)</i></label><br />
                         <DateTimePicker
                             onChange={setDOT}
                             value={dateOfTesting}
                         />
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

export default QMOldPatientForm1
