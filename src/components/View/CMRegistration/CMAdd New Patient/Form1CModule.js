import React, { useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import { Button, Modal } from "react-bootstrap";

//css
import "./Form1CModule.css";

//components
import Header from "../../../Header.js";
import Navbar from "../../../Navbar";

//VARIABLES
const userToken = getToken();
const userId = getUser();
var queueNumber = "";
var presentDate = new Date();
const timeString = presentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

var monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function Form1CModule({
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
}) {
  //Redirection
  const [redirect, setRedirect] = useState(false);

  //Single Click
  const [isClicked, setClicked] = useState(false);

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const handleShow = (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Display the confirmation modal
    setShow(true);
  };

  document.body.style = "background: white;";

  const {
    fname,
    lname,
    mname,
    sex,
    birthDate,
    email,
    contactNum,
    address,
    result,
    seniorId,
    pwdId,
    service_location,
  } = customer;
  const [activation, setActive] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [companyRemarks, setCompanyRemarks] = useState("");
  const [isSenior, setIsSenior] = useState(false);
  const [isPWD, setIsPWD] = useState(false);

  const [people, setPeople] = useState(0);
  const [km, setKm] = useState(0);

  function turnActive() {
    setActive(true);
  }

  function showSubmitButton() {
    if (
      fname != "" &&
      lname != "" &&
      mname != "" &&
      sex != "" &&
      birthDate != "" &&
      contactNum != "" &&
      address != "" &&
      result != ""
    ) {
      return (
        <div className="d-flex justify-content-end">
          <button className="submit-btn" onClick={handleShow}>
            SUBMIT
          </button>
        </div>
      );
    } else {
      // console.log('Incomplete');
    }
  }

  function submit(e, customer, dateOfTesting, lastMeal) {
    if (isClicked == false) {
      setClicked(true);
      axios({
        method: "post",
        url: window.$link + "customers/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          first_name: customer.fname,
          last_name: customer.lname,
          middle_name: customer.mname,
          suffix: "",
          birthdate: customer.birthDate,
          contact_no: customer.contactNum,
          email: customer.email,
          gender: customer.sex,
          address: customer.address,
          emergency_contact: "",
          emergency_contact_no: "",
          relation_w_contact: "",
          last_meal: lastMeal,
          remarks: "",
          type: "clinic",
          pwd_id: customer.pwdId,
          senior_id: customer.seniorId,
          result: customer.result,
          added_by: userId,
          service_location: customer.service_location,
        },
      }).then(function (response) {
        toast.success(response.data.message.success);
        //Generate Queue Number
        axios({
          method: "post",
          url: window.$link + "customers/generateQueue",
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            customer_id: response.data.data.customer_id,
          },
        }).then(function (queue) {
          queueNumber = queue.data.data.queue_no;
          toast.success("Queue " + queue.data.message);
          setRedirect(true);
        });
        handleClose();
      });
    }
  }

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

  // auto suggest address
  const [suggestions, setSuggestions] = useState([]);
  const [allAddress, setAllAddress] = useState([]);
  const [renderSuggest, setRenderSuggest] = useState(true);
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "customers/searchByAddress",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setAllAddress(response.data);
      })
      .catch(function (error) {
        setAllAddress([]);
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (address !== "" && allAddress.length > 0) {
      let searchWord = new RegExp(address.toLowerCase()); // create regex for input address
      let filteredAddress = allAddress.filter((info) =>
        searchWord.test(info.toLowerCase())
      ); // test if there is a match
      setSuggestions(filteredAddress); // set all matches to suggestions
    }
  }, [address]);

  // auto suggest address
  const [MDSuggestions, setMDSuggestions] = useState([]);
  const [allMD, setAllMD] = useState([]);
  const [renderMDSuggest, setRenderMDSuggest] = useState(true);
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/searchByDR",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setAllMD(response.data);
      })
      .catch(function (error) {
        setAllAddress([]);
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    const birthDate = new Date(customer.birthDate);
    if (
      customer.birthDate &&
      presentDate.getFullYear() - birthDate.getFullYear() >= 60
    ) {
      setIsSenior(true);
    } else {
      setIsSenior(false);
    }
  });

  if (redirect) {
    return (
      <div>
        <div
          className="row"
          style={{
            marginTop: "6%",
            fontFamily: "Montserrat-Bold",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.png"
            style={{ width: "160px", height: "80px", marginBottom: "3%" }}
          ></img>
          <h1 style={{fontFamily: "Inter-Bold"}}>Customer Module</h1>
          <div className="row" style={{ marginTop: "3%", alignItems: "center", justifyContent: "center"}}>
            <div className="col-sm d-flex justify-content-center">
              <div
                style={{
                  padding: "10px",
                  margin: "5px",
                  width: "900px",
                  height: "250%",
                  color: "#419ea3",
                  fontFamily: "Inter-Bold",
                  fontSize: "25px",
                }}
              >
                <p style={{fontSize: "35px"}}>Customer Created!</p> <br /> <br />
                {`${customer.fname.toUpperCase()} ${customer.mname.toUpperCase()} ${customer.lname.toUpperCase()}`} <br />
                {monthNames[presentDate.getMonth()] + " " + presentDate.getDate() + ", " + presentDate.getFullYear()} <br />
                {timeString} <br /> <br />
                Your Queue Number is {queueNumber}.
              </div>
            </div>
            <div
              type="button"
              disabled
              style={{
                padding: "10px",
                margin: "5px",
                width: "150%",
                height: "250%",
                borderRadius: "8px",
                border: "1px",
                color: "#419ea3",
                fontFamily: "Inter-Bold",
                fontSize: "25px",
              }}
            >
              Please wait for your name to be called.
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
        <div className="row"></div>
        <div className="row"></div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-3"></div>
          <div className="col-sm-3"></div>
          <div className="col-sm-3">
            <a href="/RegistrationCModule">
              <button
                variant="default"
                style={{
                  padding: "7px",
                  margin: "5px",
                  width: "25%",
                  height: "75%",
                  borderRadius: "8px",
                  border: "1px",
                  color: "#419ea3",
                  fontFamily: "Inter-Bold",
                  fontSize: "15px",
                }}
              >
                Done
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="active-cont center" style={{ marginRight: "15%" }}>
      <Header type="thin" title="ADD PATIENT" />

      <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

      <div className="booking-form">
        <form className="needs-validation">
          <div className="forms">
            <div className="row">
              <div className="col-sm">
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
              <div className="col-sm">
                <label for="fname" className="form-label">
                  MIDDLE NAME <i>(required)</i>
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
              <div className="col-sm">
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
              <div className="col-sm">
                <label for="sex" className="form-label">
                  SEX<i>(required)</i>
                </label>
                <br />
                <select
                  name="sex"
                  className="gender-select"
                  value={sex}
                  onChange={setPersonal}
                  required
                >
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="col-sm">
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
              <div className="col-sm">
                <input
                  type="checkbox"
                  name="is_pwd"
                  value="isPWD"
                  id="mdCharge"
                  checked={isPWD && !isSenior}
                  disabled={isSenior}
                  onChange={(e) => setIsPWD(e.target.checked)}
                />
                <label for="mdCharge" className="booking-label">
                  Person With Disabilities
                </label>
              </div>
              {isPWD && !isSenior && (
                <div className="col-sm-6">
                  <label for="pwd" className="form-label">
                    PWD ID
                  </label>
                  <br />
                  <input
                    type="text"
                    id="pwd_id"
                    name="pwdId"
                    className="schedule"
                    value={pwdId}
                    onChange={setPersonal}
                    required
                  ></input>
                </div>
              )}
              {isSenior && (
                <div className="col-sm-6">
                  <label for="senior" className="form-label">
                    SENIOR CITIZEN ID
                  </label>
                  <br />
                  <input
                    type="text"
                    id="senior_id"
                    name="seniorId"
                    className="schedule"
                    value={seniorId}
                    onChange={setPersonal}
                    required
                  ></input>
                </div>
              )}
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
                onFocus={() => {
                  setRenderSuggest(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setRenderSuggest(false);
                  }, 200);
                }}
                required
              />
              <br />
            </div>

            {suggestions.length !== 0 && renderSuggest && (
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

            <div className="row">
              <label for="location" className="radio-header">
                LOCATION SERVICE
              </label>
              <br />
              <div className="col">
                <input
                  type="radio"
                  id="clinicbtn"
                  name="service_location"
                  value="clinic"
                  checked={true}
                  onChange={setPersonal}
                />
                <label for="clinicbtn" className="radio-label">
                  CLINIC
                </label>
              </div>
            </div>
            <div className="row">
              <label for="result" className="radio-header">
                RESULTS
              </label>
              <br />
              <div className="col">
                <input
                  type="radio"
                  id="emailbtn"
                  name="result"
                  value="email"
                  checked={result === "email"}
                  onChange={setPersonal}
                />
                <label for="emailbtn" className="radio-label">
                  EMAIL
                </label>
              </div>
              <div className="col">
                <input
                  type="radio"
                  id="printbtn"
                  name="result"
                  value="print"
                  checked={result === "print"}
                  onChange={setPersonal}
                />
                <label for="printbtn" className="radio-label">
                  PRINT
                </label>
              </div>
              <div className="col">
                <input
                  type="radio"
                  id="bothbtn"
                  name="result"
                  value="both"
                  checked={result === "both"}
                  onChange={setPersonal}
                />
                <label for="bothbtn" className="radio-label">
                  BOTH
                </label>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>SUBMIT</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to submit the form?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={(e) => submit(e, customer, dateOfTesting, lastMeal)}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          <div>{showSubmitButton()}</div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Form1CModule;
