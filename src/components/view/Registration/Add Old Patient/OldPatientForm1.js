import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DateTimePicker from "react-datetime-picker"
import { getToken, getUser, refreshPage } from "../../../../utilities/Common"
import axios from "axios"
import Select from "react-select"
//components
import Header from "../../../Header.js"
import Navbar from "../../../Navbar"

//css
import "./OldPatientForm1.css"

const userToken = getToken()
const userId = getUser()

function OldPatientForm1({
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
  extractionDate,
  setExtractionDate,
  isSenior,
  isPWD,
  setIsSenior,
  setIsPWD,
  pwdId,
  setPwdId,
  seniorId,
  setSeniorId,
  hmoDetails,
  setHmoDetails,
}) {
  document.body.style = "background: white;"
  //customer details
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [emailadd, setEmail] = useState("")
  const [homeaddress, setAddress] = useState("")

  const { id } = useParams()

  const [discountList, setDiscountList] = useState([])
  const [companyId, setCompanyId] = useState("")
  const [companyRemarks, setCompanyRemarks] = useState("")

  const [people, setPeople] = useState(0)
  const [km, setKm] = useState(0)
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
    result,
    lastmeal,
    homeServiceFee,
  } = customer
  useEffect(() => {
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
      .then(function (customerData) {
        var presentDate = new Date()
        var birthDate = new Date(customerData.data.birthdate)
        const age = presentDate.getFullYear() - birthDate.getFullYear()
        setFirstName(customerData.data.first_name)
        setMiddleName(customerData.data.middle_name)
        setLastName(customerData.data.last_name)
        setBirthDate(birthDate.toDateString())
        setGender(customerData.data.gender)
        setAge(age)
        setContactNo(customerData.data.contact_no)
        setEmail(customerData.data.email)
        setAddress(customerData.data.address)
        setPwdId(customerData.data.pwd_id)
        setSeniorId(customerData.data.senior_id)
        if (customerData.data.pwd_id !== "") {
          setIsPWD(true)
        }
      })
      .catch(function (error) {
        console.log("error", error)
      })
  }, [])

  React.useEffect(() => {
    const birthDate2 = new Date(birthday)
    if (birthday && new Date().getFullYear() - birthDate2.getFullYear() >= 60) {
      setIsSenior(true)
    } else {
      setIsSenior(false)
    }
  })
  React.useEffect(() => {
    if (isPWD === false) {
      setPwdId("")
    }
  }, [isPWD])

  const [activation, setActive] = useState(false)

  function turnActive() {
    setActive(true)
  }

  function proceed() {
    if (
      serviceLocation != "" &&
      result != "" &&
      dateOfTesting != "" &&
      lastMeal != "" &&
      referral != ""
    ) {
      if (discountId !== "7") {
        return (
          <div className="row d-flex justify-content-end mb-3">
            <div className="col-6 align-right text-right">
              <button className="proceed-btn" onClick={() => navigation.next()}>
                PROCEED
              </button>
            </div>
            <div className="col-1"></div>
          </div>
        )
      } else if (
        discountId === "7" &&
        (!/^$|\s+/.test(seniorId) || !/^$|\s+/.test(pwdId))
      ) {
        return (
          <div className="row d-flex justify-content-end mb-3">
            <div className="col-6 align-right text-right">
              <button className="proceed-btn" onClick={() => navigation.next()}>
                PROCEED
              </button>
            </div>
            <div className="col-1"></div>
          </div>
        )
      } else {
        return <></>
      }
    }
  }

  //event handler for hmo radio buttons
  function handleRadioChange(e) {
    const { name, value } = e.target

    setHmoDetails({ ...hmoDetails, [name]: value })
  }
  //event handler for hmo select buttons
  function handleSelectChange(e, name) {
    setHmoDetails({ ...hmoDetails, [name]: e.value })
  }

  function homeServiceFeeDisplay() {
    if (serviceLocation === "home service") {
      return (
        <div className="row date-of-testing-container small-gap">
          <div className="col">
            <label for="result" className="radio-header">
              SERVICE LOCATION <span className="required">*</span>
            </label>
            <br />
            <select
              name="homeServiceFee"
              className="home-service-fee-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="" selected disabled>
                Select
              </option>
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
              <select
                name="serviceFee"
                className="home-service-fee-select"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                required
              >
                <option value="" selected>
                  Select
                </option>
                <option value={250}>(1 - 2 PAX) - P 250</option>
                <option value={150}>(3 or more) - P 150</option>
              </select>
            )}
            {location == 1 && (
              <select
                name="serviceFee"
                className="home-service-fee-select"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                required
              >
                <option value="" selected>
                  Select
                </option>
                <option value={300}>(1 - 2 PAX) - P 300</option>
                <option value={180}>(3 or more) - P 180</option>
              </select>
            )}
            {location == 3 && (
              <input
                type="number"
                name="serviceFee"
                className="home-service-fee-select"
                value={serviceFee}
                min="1"
                onChange={(e) => setServiceFee(e.target.value)}
              />
            )}
            {location == 4 && (
              <select
                name="serviceFee"
                className="home-service-fee-select"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                required
              >
                <option value="" selected>
                  Select
                </option>
                <option value={65}>Male - P 65</option>
                <option value={25}>Female - P 25 </option>
              </select>
            )}
            {location == 2 && (
              <input
                type="number"
                name="serviceFee"
                className="home-service-fee-select"
                value={serviceFee}
                min="1"
                onChange={(e) => setServiceFee(e.target.value)}
              />
            )}
          </div>
        </div>
      )
    } else {
      console.log("Error. No home service fee")
    }
  }

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
        let discount_list = []
        response.data.discounts.map((data) => {
          discount_list.push({
            ...data,
            label: `${data.description} (${data.discount_code})`,
            value: data.id,
          })
        })
        setDiscountList(discount_list)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    if (discountId == "") {
      setDiscount(0)
      setDiscountDetails(null)
      setCompanyId("")
      setIsService("")
      setIsPackage("")
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
        setCompanyId(response.data.data.discount.company_id)
        setDiscount(response.data.data.discount.percentage)
        setDiscountDetails(response.data.data.discount_details)
        if (response.data.is_package == "1") {
          setIsPackage("1")
        }
        if (response.data.is_service == "1") {
          setIsService("1")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [discountId])

  React.useEffect(() => {
    setCompanyRemarks("")
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
        setCompanyRemarks(response.data.remarks)
        setIsCompany(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [companyId])

  const listOfDiscount = discountList.map((row, index) => {
    return (
      <option key={index} value={row.id}>
        {row.description + " (" + row.discount_code + ")"}
      </option>
    )
  })

  function sinceLastMeal() {
    var presentDate = new Date()
    let diffInMilliSeconds = Math.abs(presentDate - lastMeal) / 1000

    //calculate days
    const days = Math.floor(diffInMilliSeconds / 86400)
    diffInMilliSeconds -= days * 86400

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60

    let difference = ""
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes ago`
        : `${minutes} minutes ago`
    return difference
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="PATIENT DETAILS" />

        <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

        <div className="personal-data-cont ">
          <div className="row">
            <div className="col-sm-4">
              <span className="first-name label">FIRST NAME</span>
              <span className="first-name detail">
                {firstName.toUpperCase()}
              </span>
            </div>
            <div className="col-sm-4">
              <span className="last-name label">LAST NAME</span>
              <span className="last-name detail">{lastName.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
              <span className="middle-name label">MIDDLE NAME</span>
              <span className="middle-name detail">
                {middleName.toUpperCase()}
              </span>
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
              <span className="address detail">
                {homeaddress.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="row">
            {pwdId?.length > 0 ? (
              <div className="col-sm-6">
                <span className="pwd-id label">PWD ID</span>
                <span className="pwd-id detail">{pwdId.toUpperCase()}</span>
              </div>
            ) : null}
          </div>
          <div className="row">
            {seniorId?.length > 0 ? (
              <div className="col-sm-6">
                <span className="pwd-id label">SENIOR ID</span>
                <span className="pwd-id detail">{seniorId}</span>
              </div>
            ) : null}
          </div>
        </div>
        <h3
          className="form-categories-header italic"
          style={{ marginTop: "0px" }}
        >
          BOOKING DETAILS
        </h3>
        <div
          className="personal-data-cont mb-5"
          style={{ marginBottom: "0px" }}
        >
          <form className="needs-validation">
            <div className="row">
              <div className="col-sm-12 input-group-sm">
                <span className="first-name label">
                  REFERRAL <span className="required">*</span>
                </span>
                <br />
                <input
                  type="text"
                  className="form-control full input-group"
                  id="referral"
                  name="referral"
                  value={referral}
                  onChange={setPersonal}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 input-group-sm">
                <span className="first-name label">
                  Is this an HMO Patient? <span className="required">*</span>
                </span>
                <br />

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="is_hmo"
                    id="hmoYes"
                    value="yes"
                    checked={hmoDetails.is_hmo === "yes"}
                    onChange={handleRadioChange}
                  />
                  <label class="form-check-label" for="hmoYes">
                    YES
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="is_hmo"
                    id="hmoNo"
                    value="no"
                    checked={hmoDetails.is_hmo === "no"}
                    onChange={handleRadioChange}
                  />
                  <label class="form-check-label" for="hmoNo">
                    NO
                  </label>
                </div>
              </div>
              {hmoDetails.is_hmo === "yes" && (
                <>
                  <div className="col-sm-5 input-group-sm mt-2">
                    <span className="first-name label">
                      HMO <span className="required">*</span>
                    </span>
                    <br />

                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                        onChange={(e)=>handleSelectChange(e, "hmo_id")}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="hmo"
                      options={[]}
                    />
                  </div>
                  <div className="col-sm-5 input-group-sm mt-2">
                    <span className="first-name label">
                      HMO Discount <span className="required">*</span>
                    </span>
                    <br />

                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                        onChange={(e)=>handleSelectChange(e, "hmo_code")}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="hmo"
                      options={[]}
                    />
                  </div>
                  <div className="col-sm-5 input-group-sm mt-3">
                    <span className="first-name label">
                      Price <span className="required">*</span>
                    </span>
                    <br />

                    <div class="form-check form-check-inline mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pricelist"
                        id="priceCash"
                        value="cash"
                        checked={hmoDetails.pricelist === "cash"}
                        onChange={handleRadioChange}
                      />
                      <label class="form-check-label" for="priceCash">
                        CASH
                      </label>
                    </div>
                    <div class="form-check form-check-inline mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="pricelist"
                        id="priceHMO"
                        value="hmo"
                        checked={hmoDetails.pricelist === "hmo"}
                        onChange={handleRadioChange}
                      />
                      <label class="form-check-label" for="priceHMO">
                        HMO
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-5 input-group-sm mt-3">
                    <span className="first-name label">
                      Discount Code <span className="required">*</span>
                    </span>
                    <br />

                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      id="discount_code"
                      onChange={(e) => handleSelectChange(e, "discount_id")}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      options={discountList.filter((data) => data.id === "7")}
                    />
                  </div>
                </>
              )}
            </div>
            {hmoDetails.is_hmo === "no" && (
              <div className="row">
                <div className="col-sm-12 input-group-sm">
                  <span className="first-name label">DISCOUNT CODE</span>
                  <br />

                  <select
                    className="select-input full form-select form-select-sm"
                    id="discount_code"
                    name="discountId"
                    value={discountId}
                    onChange={setPersonal}
                  >
                    <option value="">None</option>
                    {listOfDiscount}
                  </select>
                </div>
              </div>
            )}
            {discountId === "7" ||
              (hmoDetails.discount_id === "7" && (
                <div className="row">
                  <div className="col-sm-6 input-group-sm">
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
                    <br />
                    <span className="first-name label">
                      PWD ID <span className="required">*</span>
                    </span>
                    <input
                      type="text"
                      id="pwd_id"
                      name="pwdId"
                      placeholder="ID Should not contain any spaces..."
                      className="full-input"
                      value={!isPWD ? "" : pwdId}
                      disabled={!isPWD}
                      onChange={(e) => setPwdId(e.target.value)}
                      required
                      style={{ background: !isPWD ? "whitesmoke" : "" }}
                    />
                  </div>
                  <div className="col-sm-5 input-group-sm">
                    <br />
                    <span className="first-name label">
                      SENIOR CITIZEN ID <span className="required">*</span>
                    </span>

                    <input
                      type="text"
                      id="senior_id"
                      name="seniorId"
                      className="full-input"
                      placeholder="ID Should not contain any spaces..."
                      value={!isSenior ? "" : seniorId}
                      onChange={(e) => setSeniorId(e.target.value)}
                      disabled={!isSenior}
                      style={{ background: !isSenior ? "whitesmoke" : "" }}
                      required
                    />
                  </div>
                </div>
              ))}
            <div className="row">
              <div className="col-sm-12 input-group-sm">
                <span className="first-name label">DISCOUNT DETAIL</span>
                <br />

                <input
                  type="text"
                  className="form-control full"
                  id="discount_detail"
                  name="discountDetail"
                  value={discountDetail}
                  onChange={setPersonal}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 input-group-sm">
                <span className="radio-header">
                  LOCATION OF SERVICE <span className="required">*</span>
                </span>
                <br />

                <div className="row">
                  <div className="col">
                    <input
                      type="radio"
                      id="serviceLocation"
                      name="serviceLocation"
                      value="clinic"
                      checked={serviceLocation === "clinic"}
                      onChange={setPersonal}
                    />
                    <label
                      for="clinic"
                      className="radio-label"
                      style={{ fontSize: "medium" }}
                    >
                      CLINIC
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="serviceLocation"
                      name="serviceLocation"
                      value="home service"
                      checked={serviceLocation === "home service"}
                      onChange={setPersonal}
                    />
                    <label
                      for="home-service"
                      className="radio-label"
                      style={{ fontSize: "medium" }}
                    >
                      HOME SERVICE
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 input-group-sm">
                <span className="radio-header">
                  RESULTS <span className="required">*</span>{" "}
                </span>
                <br />

                <div className="row">
                  <div className="col-3">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="email"
                      checked={result === "email"}
                      onChange={setPersonal}
                    />
                    <label
                      for="email"
                      className="radio-label"
                      style={{ fontSize: "medium" }}
                    >
                      EMAIL
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="print with pickup"
                      checked={result === "print with pickup"}
                      onChange={setPersonal}
                    />
                    <label
                      for="print-with-pickup"
                      className="radio-label"
                      style={{ fontSize: "medium" }}
                    >
                      PRINT WITH PICKUP
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="radio"
                      id="result"
                      name="result"
                      value="both"
                      checked={result === "both"}
                      onChange={setPersonal}
                    />
                    <label
                      for="print-with-pickup"
                      className="radio-label"
                      style={{ fontSize: "medium" }}
                    >
                      BOTH
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 input-group-sm">
                <span className="radio-header">MD CHARGE</span>
                <br />

                <div className="row">
                  <div className="col">
                    <input
                      type="checkbox"
                      name="physical_exam"
                      value="physical exam"
                      checked={mdCharge.physical_exam == true}
                      onChange={setMdCharge}
                    />
                    <label
                      for="mdCharge"
                      className="booking-label"
                      style={{ fontSize: "medium" }}
                    >
                      Physical Exam
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="checkbox"
                      name="medical_certificate"
                      value="medical certificate"
                      checked={mdCharge.medical_certificate == true}
                      onChange={setMdCharge}
                    />
                    <label
                      for="mdCharge"
                      className="booking-label"
                      style={{ fontSize: "medium" }}
                    >
                      Medical Certificate
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">{homeServiceFeeDisplay()}</div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6 input-group-sm">
                <span className="first-name label">
                  DATE OF TESTING <span className="required">*</span>
                </span>
                <br />

                <DateTimePicker onChange={setDOT} value={dateOfTesting} />
              </div>
              <div className="col-sm-6 input-group-sm">
                <span className="first-name label">
                  DATE OF EXTRACTION <span className="required">*</span>
                </span>
                <br />

                <DateTimePicker
                  onChange={setExtractionDate}
                  value={extractionDate}
                />
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
