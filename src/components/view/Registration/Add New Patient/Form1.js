import React, { useState } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUser, refreshPage } from '../../../../utilities/Common';

//css
import './Form1.css';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';

//VARIABLES
const userToken = getToken();
const userId = getUser();

function AddPatient({ customer, setPersonal, setIsService, setIsPackage, discount, setDiscount, setIsCompany, lastMeal, setLastMeal, navigation, mdCharge, setMdCharge, serviceFee, setServiceFee, dateOfTesting, setDOT  }) {
  document.body.style = 'background: white;';

  const {
    fname,
    lname,
    mname,
    sex,
    birthDate,
    email,
    contactNum,
    address,
    referral,
    discountId,
    discountDetail,
    serviceLocation,
    homeServiceFee,
    result,
    lastmeal,
  } = customer;
  const [activation, setActive] = useState(false);
  const [discountList, setDiscountList] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [companyRemarks, setCompanyRemarks] = useState('');

  const [people, setPeople] = useState(0);
  const [location, setLocation] = useState("");
  const [km, setKm] = useState(0);

  function turnActive() {
    setActive(true);
  }

  function proceed() {
    if (
      fname != '' &&
      lname != '' &&
      mname != '' &&
      sex != '' &&
      birthDate != '' &&
      contactNum != '' &&
      address != '' &&
      serviceLocation != '' &&
      result != '' &&
      dateOfTesting != '' &&
      lastMeal != ''
    ) {
      return (
        <div className="d-flex justify-content-end">
          <button className="proceed-btn" onClick={() => navigation.next()}>
            PROCEED
          </button>
        </div>
      );
    } else {
      console.log('Incomplete');
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
            HOME SERVICE FEE
          </label>
          <br />
          <select name="homeServiceFee" className="home-service-fee-select" value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="" selected disabled>Select</option>
            <option value={0}>Within 2km or less</option>
            <option value={1}>More than 2km</option>
            <option value={2}>Outside Tacloban or Palo</option>
          </select>
        </div>
        <div className="col">
            <label for="result" className="radio-header">
                Number of People
            </label>
            <input type="number" name="people"  className="home-service-fee-select" value={people} onChange={(e) => setPeople(e.target.value) }/>
        </div>
      </div>
      );
    } else {
      console.log('Error. No home service fee');
    }
  }

  React.useEffect(() => {
    if(location != 2) {
        //within 2kms
        if(location == 0 && people <= 2) {
            setServiceFee(250 * people);
        }
        else if(location == 0 && people > 2) {
            setServiceFee(150 * people);
        }
        //above 2kms
        else if(location == 1 && people <= 2) {
            setServiceFee(300 * people);
        }
        else if(location == 1 && people > 2) {
            setServiceFee(180 * people);
        }
    }else {
        //outside
        setServiceFee(50 * km * people);
    }
  });


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
        setCompanyId(response.data.company_id);
        setDiscount(response.data.percentage);
        console.log(response);
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

  const listOfDiscount = discountList.map((row, index) => {
    return (
      <option key={index} value={row.id}>
        {row.description + ' (' + row.discount_code + ')'}
      </option>
    );
  });

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
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference += minutes === 0 || hours === 1 ? `${minutes} minutes ago` : `${minutes} minutes ago`;
    return difference;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PATIENT" />

        <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

        <div className="booking-form">
          <form className="needs-validation">
            <div className="row">
              <div className="col-sm-6">
                <label for="fname" className="form-label">
                  FIRST NAME <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="lname" className="form-label">
                  LAST NAME <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  value={lname}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label for="fname" className="form-label">
                  MIDDLE NAME
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="mname"
                  name="mname"
                  value={mname}
                  onChange={setPersonal}
                />
                <br />
              </div>
              <div className="col-sm-2">
                <label for="sex" className="form-label">
                  SEX<i>(required)</i>
                </label>
                <br />
                <select name="sex" className="gender-select" value={sex} onChange={setPersonal} required>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label for="birthDate" className="form-label">
                  DATE OF BIRTH<i>(required)</i>
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  name="birthDate"
                  className="schedule"
                  value={birthDate}
                  onChange={setPersonal}
                  required
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label for="email" className="form-label">
                  EMAIL 
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
              <div className="col-sm-6">
                <label for="contactNum" className="form-label">
                  CONTACT NUMBER <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="contactNum"
                  name="contactNum"
                  value={contactNum}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <label for="address" className="form-label">
                ADDRESS <i>(required)</i>
              </label>
              <br />
              <input
                type="text"
                className="form-control full"
                id="address"
                name="address"
                value={address}
                onChange={setPersonal}
                required
              />
              <br />
            </div>
            <div className="row">
              <label for="address" className="form-label">
                REFERRAL
              </label>
              <br />
              <input
                type="text"
                className="form-control full"
                id="referral"
                name="referral"
                value={referral}
                onChange={setPersonal}
              />
              <br />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label for="address" className="form-label">
                  DISCOUNT CODE
                </label>
                <br />
                <select
                  className="select-input full"
                  id="discount_code"
                  name="discountId"
                  value={discountId}
                  onChange={setPersonal}
                >
                  <option value="" selected>
                    None
                  </option>
                  {listOfDiscount}
                </select>
                <br />
              </div>
              <div className="col-sm-6">
                <label for="address" className="form-label">
                  DISCOUNT REMARKS
                </label>
                <br />
                <span className="remarks ">{companyRemarks != '' && companyRemarks}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label for="address" className="form-label">
                  DISCOUNT DETAIL
                </label>
                <br />
                <input
                  type="text"
                  className="form-control full"
                  id="discount_detail"
                  name="discountDetail"
                  value={discountDetail}
                  onChange={setPersonal}
                />
                <br />
              </div>
            </div>
            <div className="row small-gap">
              <div className="col-sm-6">
                <div className="row">
                  <span className="radio-header">LOCATION OF SERVICE</span>
                  <br />
                  <div className="col">
                    <input
                      type="radio"
                      id="serviceLocation"
                      name="serviceLocation"
                      value="clinic"
                      checked={serviceLocation === 'clinic'}
                      onChange={setPersonal}
                    />
                    <label for="clinic" className="radio-label">
                      CLINIC
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="serviceLocation"
                      name="serviceLocation"
                      value="home service"
                      checked={serviceLocation === 'home service'}
                      onChange={setPersonal}
                    />
                    <label for="home-service" className="radio-label">
                      HOME SERVICE
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <label for="result" className="radio-header">
                    RESULTS
                  </label>
                  <br />
                  <div className="col">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="email"
                      checked={result === 'email'}
                      onChange={setPersonal}
                    />
                    <label for="email" className="radio-label">
                      EMAIL
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="print with pickup"
                      checked={result === 'print with pickup'}
                      onChange={setPersonal}
                    />
                    <label for="print-with-pickup" className="radio-label">
                      PRINT WITH PICKUP
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="both"
                      checked={result === 'both'}
                      onChange={setPersonal}
                    />
                    <label for="print-with-pickup" className="radio-label">
                      BOTH
                    </label>
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
                    <div className="row">
                        {location == 2 && (
                            <div className="col-sm-4">
                                <label for="result" className="radio-header">Kilometers</label><br/>
                                <input type="number" name="km" value={km} onChange={(e) => setKm(e.target.value)}/>
                            </div>
                        )}
                        {serviceFee != "" && (
                        <div className="col-sm-8">
                            <label for="result" className="radio-header">Total Service Fee</label><br/>
                            <span>P {serviceFee}</span>
                        </div>
                        )}
                    </div>

            <div className="row date-of-testing-container large-gap">
              <div className="col-sm-4">
                <label for="date" className="form-label">
                  DATE OF TESTING<i>(required)</i>
                </label>
                <br />
                <DateTimePicker
                    onChange={setDOT}
                    value={dateOfTesting}
                />
              </div>
              <div className="col-sm-4">
                <label for="last_meal" className="form-label">
                  LAST MEAL<i>(required)</i>
                </label>
                <br />
                <DateTimePicker onChange={setLastMeal} value={lastMeal} />
              </div>
              <div className="col-sm-4">
                <label for="date" className="form-label">
                  SINCE LAST MEAL
                </label>
                <br />
                <span className="since-lastmeal">{sinceLastMeal()}</span>
              </div>
            </div>

            <div>{proceed()}</div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
