import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import axios from "axios";

//components
import Header from "../../../Header.js";
import Navbar from "../../../Navbar";

//css
import "./QMOldPatientForm1.css";

const userToken = getToken();
const userId = getUser();

function QMOldPatientForm1({
  customer,
  setPersonal,
  setIsService,
  setIsPackage,
  discount,
  setDiscount,
  setIsCompany,
  lastMeal,
  setLastMeal,
  navigation,
  mdCharge,
  setMdCharge,
  serviceFee,
  setServiceFee,
  location,
  setLocation,
  dateOfTesting,
  setDOT,
  discountDetails,
  setDiscountDetails,
  result,
  setResult,
  customerID,
  setCustomerID,
  isSenior,
  setIsSenior,
  isPWD,
  setIsPWD,
  pwdId,
  setPwdId,
  seniorId,
  setSeniorId,
  extractionDate,
  setExtractionDate,
}) {
  setLocation("clinic");
  document.body.style = "background: white;";
  //customer details
  const [isEditing, setIsEditing] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailadd, setEmail] = useState("");
  const [homeaddress, setAddress] = useState("");

  const { id } = useParams();

  const [discountList, setDiscountList] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [companyRemarks, setCompanyRemarks] = useState("");

  const [people, setPeople] = useState(0);
  const [km, setKm] = useState(0);

  // axios({
  //     method: 'post',
  //     url: window.$link + 'bookings/show/' + id,
  //     withCredentials: false,
  //     params: {
  //         api_key: window.$api_key,
  //         token: userToken.replace(/['"]+/g, ''),
  //         requester: userId,
  //     }
  // }).then(function (response) {
  //     console.log("Data" + response.data.result);
  //     setResult(response.data.result);
  // })

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "customers/show/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (customer) {
        var presentDate = new Date();
        var birthDate = new Date(customer.data.birthdate);
        const age = presentDate.getFullYear() - birthDate.getFullYear();
        setFirstName(customer.data.first_name);
        setMiddleName(customer.data.middle_name);
        setLastName(customer.data.last_name);

        setBirthDate(new Date(birthDate).toLocaleDateString("en-CA"));
        setGender(customer.data.gender);
        setAge(age);
        setContactNo(customer.data.contact_no);
        setEmail(customer.data.email);
        setAddress(customer.data.address);
        setPwdId(customer.data.pwd_id);
        setSeniorId(customer.data.senior_id);
        setLocation(customer.data.service_location);
        setResult(customer.data.result);
        setCustomerID(customer.data.id);
        if (customer.data.pwd_id !== "") {
          setIsPWD(true);
        }
        if (customer.data.senior_id !== "") {
          setIsSenior(true);
        }
        //setResult(customer.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
    // serviceLocation,
    lastmeal,
    homeServiceFee,
  } = customer;
  const [activation, setActive] = useState(false);

  function turnActive() {
    setActive(true);
  }

  function proceed() {
    if (
      location != "" &&
      result != "" &&
      dateOfTesting != "" &&
      lastMeal != ""
    ) {
      return (
        <div className="d-flex justify-content-end">
          <button className="proceed-btn" onClick={() => navigation.next()}>
            PROCEED
          </button>
        </div>
      );
    }
  }

  // function homeServiceFeeDisplay() {
  //     if (
  //       serviceLocation === "home service"
  //     ) {
  //       return (
  //         <div className="row date-of-testing-container small-gap">
  //         <div className="col">
  //           <label for="result" className="radio-header">
  //           SERVICE LOCATION
  //           </label>
  //           <br />
  //           <select name="homeServiceFee" className="home-service-fee-select" value={location} onChange={(e) => setLocation(e.target.value)} required>
  //         <option value="" selected disabled>Select</option>
  //         <option value={0}>Within 2km or less</option>
  //         <option value={1}>More than 2km</option>
  //         <option value={2}>Outside Tacloban or Palo</option>
  //         <option value={3}>Company</option>
  //         <option value={4}>Mobile Charge</option>
  //       </select>
  //     </div>
  //     <div className="col">
  //     {location != "" && (
  //             <label for="result" className="radio-header">
  //                 SERVICE FEE
  //             </label>
  //             )}
  //             {location == 0 && location != "" && (
  //                 <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
  //                   <option value="" selected>Select</option>
  //                   <option value={250}>(1 - 2 PAX) - P 250</option>
  //                   <option value={150}>(3 or more) - P 150</option>
  //                 </select>
  //             )}
  //              {location == 1 && (
  //                 <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
  //                   <option value="" selected>Select</option>
  //                   <option value={300}>(1 - 2 PAX) - P 300</option>
  //                   <option value={180}>(3 or more) - P 180</option>
  //                 </select>
  //             )}
  //             {location == 3 && (
  //                 <input type="number" name="serviceFee"  className="home-service-fee-select" value={serviceFee} min="1" onChange={(e) => setServiceFee(e.target.value) }/>
  //             )}
  //             {location == 4 && (
  //                 <select name="serviceFee" className="home-service-fee-select" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} required>
  //                   <option value="" selected>Select</option>
  //                   <option value={65}>Male - P 65</option>
  //                   <option value={25} >Female - P 25 </option>
  //                 </select>
  //             )}
  //             {location == 2 && (
  //                 <input type="number" name="serviceFee"  className="home-service-fee-select" value={serviceFee} min="1" onChange={(e) => setServiceFee(e.target.value) }/>
  //             )}
  //      </div>
  //       </div>
  //       );
  //     } else {
  //       console.log('Error. No home service fee');
  //     }
  //   }

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "discounts/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setDiscountList(response.data.discounts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (discountId == "") {
      setDiscount(0);
      setDiscountDetails(null);
      setCompanyId("");
      setIsService("");
      setIsPackage("");
    }

    axios({
      method: "post",
      url: window.$link + "discounts/show/" + discountId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setCompanyId(response.data.data.discount.company_id);
        setDiscount(response.data.data.discount.percentage);
        setDiscountDetails(response.data.data.discount_details);
        if (response.data.is_package == "1") {
          setIsPackage("1");
        }
        if (response.data.is_service == "1") {
          setIsService("1");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [discountId]);

  React.useEffect(() => {
    setCompanyRemarks("");
    axios({
      method: "post",
      url: window.$link + "companies/show/" + companyId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setCompanyRemarks(response.data.remarks);
        setIsCompany(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [companyId]);

  const listOfDiscount = discountList.map((row, index) => {
    return (
      <option key={index} value={row.id}>
        {row.description + " (" + row.discount_code + ")"}
      </option>
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

    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes ago`
        : `${minutes} minutes ago`;
    return difference;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="PATIENT DETAILS" />

        <h3 className="form-categories-header italic">BOOKING DETAILS</h3>
        <div className="booking-form">
          <form className="needs-validation">
            <div className="row">
              <div className="col-sm-4">
                <label for="fname" className="form-label font-large">
                  FIRST NAME <i>(required)</i>
                </label>

                <input
                  type="text"
                  className="full-input"
                  id="firstName"
                  name="fname"
                  value={firstName}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setPersonal(e);
                  }}
                  required
                />
              </div>
              <div className="col-sm-4">
                <label for="fname" className="form-label font-large">
                  MIDDLE NAME
                </label>

                <input
                  type="text"
                  className="full-input"
                  id="middleName"
                  name="mname"
                  value={middleName}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                    setPersonal(e);
                  }}
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="lname" className="form-label font-large">
                  LAST NAME <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="lastName"
                  name="lname"
                  value={lastName}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setPersonal(e);
                  }}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label for="sex" className="form-label font-large">
                  SEX <i>(required)</i>
                </label>

                <select
                  name="sex"
                  className="form-select"
                  value={gender}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setPersonal(e);
                  }}
                  required
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div className="col-sm-4">
                <label for="birthDate" className="form-label font-large">
                  DATE OF BIRTH <i>(required)</i>
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  name="birthDate"
                  className="full-input"
                  value={birthday}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setPersonal(e);
                  }}
                  required
                ></input>
              </div>
              <div className="col-sm-4">
                <label for="senior_id" className="form-label font-large">
                  SENIOR CITIZEN ID {isSenior && <i>(required)</i>}
                </label>

                <input
                  type="text"
                  id="seniorId"
                  name="seniorId"
                  className="full-input"
                  value={!isSenior ? "" : seniorId}
                  onChange={(e) => setSeniorId(e.target.value)}
                  disabled={!isSenior}
                  style={{ background: !isSenior ? "whitesmoke" : "" }}
                  required
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6 mt-3">
                <label for="mdCharge" className="form-label">
                  {" "}
                </label>
                <br />
                <span>
                  <input
                    type="checkbox"
                    name="is_pwd"
                    value="isPWD"
                    id="mdCharge"
                    checked={isPWD}
                    onChange={(e) => setIsPWD(e.target.checked)}
                  />
                  <label for="mdCharge" className="booking-label font-large">
                    Person With Disabilities
                  </label>
                </span>
              </div>
              <div className="col-sm-6">
                <label for="contactNum" className="form-label font-large">
                  PWD ID {isPWD && <i>(required)</i>}
                </label>
                <input
                  type="text"
                  id="pwd_id"
                  name="pwd_id"
                  className="full-input"
                  value={!isPWD ? "" : pwdId}
                  disabled={!isPWD}
                  onChange={(e) => setPwdId(e.target.value)}
                  required
                  style={{ background: !isPWD ? "whitesmoke" : "" }}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-4">
                <label for="email" className="form-label font-large">
                  EMAIL
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="emailadd"
                  name="email"
                  value={emailadd}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setPersonal(e);
                  }}
                  required
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="contactNum" className="form-label font-large">
                  CONTACT NUMBER <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="contactNo"
                  name="contactNum"
                  value={contactNo}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                    setPersonal(e);
                  }}
                  required
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="address" className="form-label font-large">
                  REFERRAL
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="referral"
                  name="referral"
                  value={referral}
                  onChange={setPersonal}
                  // onFocus={() => {
                  //   setRenderMDSuggest(true);
                  // }}
                  // onBlur={() => {
                  //   setTimeout(() => {
                  //     setRenderMDSuggest(false);
                  //   }, 200);
                  // }}
                />
                <br />
              </div>

              {/* <div className="col-sm-4">
                <label for="address" className="form-label font-large">
                  REFERRAL
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="referral"
                  name="referral"
                  value={referral}
                  onChange={setPersonal}
                  // onFocus={() => {
                  //   setRenderMDSuggest(true);
                  // }}
                  // onBlur={() => {
                  //   setTimeout(() => {
                  //     setRenderMDSuggest(false);
                  //   }, 200);
                  // }}
                />
                <br />
              </div> */}
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label for="address" className="form-label font-large">
                  ADDRESS <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="homeaddress"
                  name="address"
                  value={homeaddress}
                  disabled={!isEditing}
                  style={{ background: !isEditing ? "whitesmoke" : "" }}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setPersonal(e);
                  }}
                  // onFocus={() => {
                  //   setRenderSuggest(true);
                  // }}
                  // onBlur={() => {
                  //   setTimeout(() => {
                  //     setRenderSuggest(false);
                  //   }, 200);
                  // }}
                  required
                />
              </div>
            </div>
            {/* {suggestions.length !== 0 && renderSuggest && (
              <div className="suggestions-list">
                {suggestions.map((data, index) => (
                  <>
                    <button
                      key={index}
                      className="suggestions-item"
                      name="address"
                      value={data}
                      onClick={(e) => {
                        setPersonal(e);
                        setRenderSuggest(false);
                      }}
                    >
                      {data}
                    </button>
                    <br />
                  </>
                ))}
              </div>
            )}

            {MDSuggestions.length !== 0 && renderMDSuggest && (
              <div className="suggestions-list">
                {MDSuggestions.map((data, index) => (
                  <>
                    <button
                      key={index}
                      className="suggestions-item"
                      name="referral"
                      value={data}
                      onClick={(e) => {
                        setPersonal(e);
                        setRenderMDSuggest(false);
                      }}
                    >
                      {data}
                    </button>
                    <br />
                  </>
                ))}
              </div>
            )} */}
            <div className="row mt-4">
              <div className="col-sm-6">
                <label for="address" className="form-label font-large">
                  DISCOUNT CODE
                </label>
                <br />
                <select
                  className="form-select"
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
                <label for="address" className="form-label font-large">
                  DISCOUNT DETAIL
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
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
                <label className="radio-header font-large">
                  LOCATION OF SERVICE
                </label>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="radio"
                      id="serviceLocationClinic"
                      name="serviceLocation"
                      value="clinic"
                      checked={location === "clinic"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="serviceLocationClinic"
                      className="location-radio-label font-large"
                    >
                      {" "}
                      CLINIC
                    </label>
                  </div>
                  <div className="col-sm-6">
                    {/* <input
                      type="radio"
                      id="serviceLocationHome"
                      name="serviceLocation"
                      value="home service"
                      // checked={serviceLocation === "home service"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="serviceLocationHome"
                      className="location-radio-label font-large"
                    >
                      {" "}
                      HOME SERVICE
                    </label> */}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <label for="result" className="radio-header font-large">
                    RESULTS
                  </label>
                  <br />
                  <div className="col">
                    <input
                      type="radio"
                      id="email"
                      name="result"
                      value="email"
                      checked={result === "email"}
                      defaultChecked={result === "email"}
                      onChange={() => setResult("email")}
                    />
                    <label for="email" className="radio-label">
                      EMAIL
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="print"
                      name="result"
                      value="print with pickup"
                      checked={result === "print"}
                      defaultChecked={result === "print"}
                      onChange={() => setResult("print")}
                    />
                    <label for="print" className="radio-label">
                      PRINT
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="both"
                      name="result"
                      value="both"
                      checked={result === "both"}
                      defaultChecked={result === "both"}
                      onChange={() => setResult("both")}
                    />
                    <label for="both" className="radio-label">
                      BOTH
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row small-gap">
              <div className="col-sm-6 mt-3">
                <span className="radio-header font-large">MD CHARGE</span>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <input
                      type="checkbox"
                      id="physical_exam"
                      name="physical_exam"
                      value="physical exam"
                      checked={mdCharge.physical_exam == true}
                      onChange={setMdCharge}
                    />{" "}
                    <label
                      for="physical_exam"
                      className="md-booking-label font-large"
                    >
                      Physical Exam
                    </label>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="checkbox"
                      id="medical_certificate"
                      name="medical_certificate"
                      value="medical certificate"
                      checked={mdCharge.medical_certificate == true}
                      onChange={setMdCharge}
                    />{" "}
                    <label
                      for="medical_certificate"
                      className="md-booking-label font-large"
                    >
                      Medical Certificate
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="col-sm-6">{homeServiceFeeDisplay()}</div> */}
            </div>
            <div className="row date-of-testing-container large-gap">
              <div className="col-sm-4">
                <label for="date" className="form-label font-large">
                  DATE OF TESTING<i>(required)</i>
                </label>
                <br />
                <DateTimePicker
                  className="full-input"
                  onChange={setDOT}
                  value={dateOfTesting}
                />
              </div>
              <div className="col-sm-4">
                <label for="last_meal" className="form-label font-large">
                  DATE OF EXTRACTION<i>(required)</i>
                </label>
                <br />
                <DateTimePicker
                  className="full-input"
                  onChange={setExtractionDate}
                  value={extractionDate}
                />
              </div>
              {/* <div className="col-sm-4">
                <label for="date" className="form-label font-large">
                  SINCE LAST MEAL
                </label>
                <br />
                <span className="since-lastmeal">{sinceLastMeal()}</span>
              </div> */}
            </div>

            <div>{proceed()}</div>
          </form>
          {/* <ToastContaine /> */}
        </div>
      </div>
    </div>
  );
}

export default QMOldPatientForm1;
