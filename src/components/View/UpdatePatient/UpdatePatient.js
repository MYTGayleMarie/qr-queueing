import React, { Fragment, useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { Button, Modal } from "react-bootstrap";

//css
import "./Form1CModule.css";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import { useNavigate, useParams } from "react-router-dom";

//VARIABLES
const userToken = getToken();
const userId = getUser();
var queueNumber = "";
var presentDate = new Date();
const timeString = presentDate.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

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

function UpdatePatient() {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState({
    fname: "",
    lname: "",
    mname: "",
    sex: "female",
    birthDate: "",
    email: "",
    contactNum: "",
    address: "",
    referral: "",
    discountId: "",
    discountDetail: "",
    serviceLocation: "",
    mdCharge: "",
    homeServiceFee: "",
    result: "",
    dateOfTesting: "",
    lastmeal: "",
    pwd_id: "",
    senior_id: "",
  });
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
  const navigate = useNavigate();
  const [activation, setActive] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [companyRemarks, setCompanyRemarks] = useState("");
  const [isSenior, setIsSenior] = useState(false);
  const [isPWD, setIsPWD] = useState(false);
  const [seniorId, setSeniorId] = useState("");
  const [pwdId, setPwdId] = useState("");

  const [people, setPeople] = useState(0);
  const [km, setKm] = useState(0);

  function turnActive() {
    setActive(true);
  }

  function showSubmitButton() {
    if (
      patientDetails.fname != "" &&
      patientDetails.lname != "" &&
      patientDetails.mname != "" &&
      patientDetails.sex != "" &&
      patientDetails.birthDate != "" &&
      patientDetails.contactNum != "" &&
      patientDetails.address != ""
    ) {
      return (
        <div className="d-flex justify-content-end">
          <button className="submit-btn" onClick={handleShow}>
            SUBMIT
          </button>
        </div>
      );
    } else {
    }
  }

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
        // customerId = customer.data.id;
        var presentDate = new Date();
        var birthDate = new Date(customer.data.birthdate);
        var age = presentDate.getFullYear() - birthDate.getFullYear();
        var m = presentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) {
          age--;
        }
        setPatientDetails({
          ...patientDetails,
          fname: customer.data.first_name,
          lname: customer.data.last_name,
          mname: customer.data.middle_name,
          sex: customer.data.gender,
          birthDate: customer.data.birthdate,
          email: customer.data.email,
          contactNum: customer.data.contact_no,
          address: customer.data.address,
        });

        setSeniorId(customer.senior_id);
        setPwdId(customer.pwd_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function submit(e, customer) {
    if (isClicked == false) {
      setClicked(true);
      axios({
        method: "post",
        url: window.$link + "customers/update/" + id,
        withCredentials: false,
        params: {
          updated_by: userId,
          token: userToken.replace(/['"]+/g, ""),
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
          senior_id: seniorId,
          pwd_id: pwdId,
        },
      }).then(function (response) {
        toast.success(response.data.message.success);
        navigate("/registration");
        // //Generate Queue Number
        // axios({
        //   method: "post",
        //   url: window.$link + "customers/generateQueue",
        //   withCredentials: false,
        //   params: {
        //     api_key: window.$api_key,
        //     customer_id: response.data.data.customer_id,
        //   },
        // }).then(function (queue) {
        //   queueNumber = queue.data.data.queue_no;
        //   toast.success("Queue " + queue.data.message);
        //   setRedirect(true);
        // });
        // handleClose();
      });
    }
  }

  function handleDetailChange(e) {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  }

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
    if (patientDetails.address !== "" && allAddress.length > 0) {
      let searchWord = new RegExp(patientDetails.address.toLowerCase()); // create regex for input address
      let filteredAddress = allAddress.filter((info) =>
        searchWord.test(info.toLowerCase())
      ); // test if there is a match
      setSuggestions(filteredAddress); // set all matches to suggestions
    }
  }, [patientDetails.address]);

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

  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("cust-printout").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  React.useEffect(() => {
    const birthDate = new Date(patientDetails.birthDate);
    if (
      patientDetails.birthDate &&
      presentDate.getFullYear() - birthDate.getFullYear() >= 60
    ) {
      setIsSenior(true);
    } else {
      setIsSenior(false);
    }
  });

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thin" title="EDIT PATIENT" />

          <h3 className="form-categories-header">
            <strong>PERSONAL DETAILS</strong>
          </h3>

          <div className="booking-form">
            <form className="needs-validation">
              <div className="forms">
                <div className="row mb-0 pb-0">
                  <div className="col-sm-4">
                    <label for="fname" className="form-label font-large">
                      FIRST NAME <span className="required">*</span>
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <label for="fname" className="form-label font-large">
                      MIDDLE NAME <span className="required">*</span>
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <label for="lname" className="form-label font-large">
                      LAST NAME <span className="required">*</span>
                    </label>
                  </div>
                </div>
                <div className="row mt-0 pt-0">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="full-input"
                      id="fname"
                      name="fname"
                      value={patientDetails.fname}
                      onChange={handleDetailChange}
                      required
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="full-input"
                      id="mname"
                      name="mname"
                      value={patientDetails.mname}
                      onChange={handleDetailChange}
                    />
                    <br />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="full-input"
                      id="lname"
                      name="lname"
                      value={patientDetails.lname}
                      onChange={handleDetailChange}
                      required
                    />
                    <br />
                  </div>
                </div>
                <div className="row mb-0 pb-0">
                  <div className="col-sm-4">
                    <label for="fname" className="form-label font-large">
                      SEX <span className="required">*</span>
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <label for="fname" className="form-label font-large">
                      DATE OF BIRTH <span className="required">*</span>
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <label for="lname" className="form-label font-large">
                      SENIOR CITIZEN ID {isSenior && <span className="required">*</span>}
                    </label>
                  </div>
                </div>
                <div className="row mt-0 pt-0">
                  <div className="col-sm-4">
                    <select
                      name="sex"
                      className="form-select"
                      value={patientDetails.sex}
                      onChange={handleDetailChange}
                      required
                    >
                      <option>Female</option>
                      <option>Male</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      id="date"
                      name="birthDate"
                      className="full-input"
                      value={patientDetails.birthDate}
                      onChange={handleDetailChange}
                      required
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      id="senior_id"
                      name="seniorId"
                      className="full-input"
                      value={!isSenior ? "" : seniorId}
                      onChange={handleDetailChange}
                      disabled={!isSenior}
                      style={{ background: !isSenior ? "whitesmoke" : "" }}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-0 pb-0">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-6">
                    <label for="fname" className="form-label font-large">
                      PWD ID {isPWD && <span className="required">*</span>}
                    </label>
                  </div>
                </div>
                <div className="row mt-0 pt-0">
                  <div className="col-sm-6">
                    <input
                      type="checkbox"
                      name="is_pwd"
                      value="isPWD"
                      id="mdCharge"
                      checked={isPWD}
                      onChange={(e) => setIsPWD(e.target.checked)}
                    />
                    <label for="mdCharge" className="booking-label">
                      Person With Disabilities
                    </label>
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="text"
                      id="pwd_id"
                      name="pwdId"
                      className="full-input"
                      value={!isPWD ? "" : pwdId}
                      disabled={!isPWD}
                      onChange={handleDetailChange}
                      required
                      style={{ background: !isPWD ? "whitesmoke" : "" }}
                    />
                  </div>
                </div>
                <div className="row mb-0 pb-0">
                  <div className="col-sm-6">
                    <label for="fname" className="form-label font-large">
                      EMAIL
                    </label>
                  </div>
                  <div className="col-sm-6">
                    <label for="fname" className="form-label font-large">
                      CONTACT NUMBER <span className="required">*</span>
                    </label>
                  </div>
                </div>
                <div className="row mt-0 pt-0">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="full-input"
                      id="email"
                      name="email"
                      value={patientDetails.email}
                      onChange={handleDetailChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      className="full-input"
                      id="contactNum"
                      name="contactNum"
                      value={patientDetails.contact_no}
                      onChange={handleDetailChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <label for="address" className="form-label font-large">
                      ADDRESS <span className="required">*</span>
                    </label>
                  </div>

                  <div className="col-sm-12 mb-4">
                    <input
                      type="text"
                      className="full-input"
                      id="address"
                      name="address"
                      value={patientDetails.address}
                      onChange={handleDetailChange}
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
                        // setPersonal(e);
                        setRenderSuggest(false);
                      }}
                    >
                      {data}
                    </button>
                    <br />
                  </>
                ))}
              </div>
            )} */}
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>SUBMIT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to submit the form?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => submit(e, patientDetails)}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
              <div>{showSubmitButton()}</div>
            </form>
            <ToastContainer />
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default UpdatePatient;
