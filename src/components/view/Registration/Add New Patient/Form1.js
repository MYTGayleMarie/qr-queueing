import React, { useState } from "react"
import axios from "axios"
import DateTimePicker from "react-datetime-picker"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getToken, getUser, refreshPage } from "../../../../utilities/Common"
import Select from "react-select"
//css
import "./Form1.css"

//components
import Header from "../../../Header.js"
import Navbar from "../../../Navbar"

//VARIABLES
const userToken = getToken()
const userId = getUser()

function AddPatient({
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
  isSenior,
  setIsSenior,
  isPWD,
  setIsPWD,
  extractionDate,
  setExtractionDate,
  hmoDetails,
  setHmoDetails,
  setHmoCompanies,
  hmoCompanies,
  hmoDiscounts,
  setHmoDiscounts,
}) {
  document.body.style = "background: white;"

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
    pwd_id,
    senior_id,
  } = customer
  const [activation, setActive] = useState(false)
  const [discountList, setDiscountList] = useState([])
  const [companyId, setCompanyId] = useState("")
  const [companyRemarks, setCompanyRemarks] = useState("")

  const [people, setPeople] = useState(0)
  const [km, setKm] = useState(0)

  function turnActive() {
    setActive(true)
  }

  function proceed() {
    if (
      fname != "" &&
      lname != "" &&
      sex != "" &&
      birthDate != "" &&
      contactNum != "" &&
      address != "" &&
      serviceLocation != "" &&
      result != "" &&
      dateOfTesting != "" &&
      lastMeal != "" &&
      ((isSenior && !/^$|\s+/.test(senior_id) && discountId!=="") || !isSenior) &&
      ((isPWD && !/^$|\s+/.test(pwd_id)  && discountId!=="") || !isPWD) &&
      ((serviceLocation === "home service" &&
        location !== "" &&
        serviceFee !== "" &&
        serviceFee !== 0) ||
        serviceLocation === "clinic")
    ) {
      return (
        <div className="d-flex justify-content-end mb-5">
          <button
            className="proceed-btn"
            onClick={() => {
               navigation.next()
              // if (hmoDetails.is_hmo === "no") {
              //   navigation.next()
              // } else {
              //   navigation.go("services")
              // }
            }}
          >
            PROCEED
          </button>
        </div>
      )
    } else {
      // console.log('Incomplete');
    }
  }

  function homeServiceFeeDisplay() {
    if (serviceLocation === "home service") {
      return (
        <div className="row date-of-testing-container small-gap">
          <div className="col-sm-6">
            <label for="result" className="radio-header font-large">
              SERVICE LOCATION <span className="required">*</span>
            </label>
            <br />
            <select
              name="homeServiceFee"
              className="form-select"
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
          <div className="col-sm-6">
            {location != "" && (
              <label for="result" className="radio-header font-large">
                SERVICE FEE <span className="required">*</span>
              </label>
            )}
            <br />
            {location == 0 && location != "" && (
              <select
                name="serviceFee"
                className="form-select"
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
                className="form-select"
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
                className="form-select"
                value={serviceFee}
                min="1"
                onChange={(e) => setServiceFee(e.target.value)}
              />
            )}
            {location == 4 && (
              <select
                name="serviceFee"
                className="form-select"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                required
              >
                <option value="" selected>
                  Select
                </option>
                <option value={65}>Male - P 65</option>
                <option value={25}>Female - P 25</option>
              </select>
            )}
            {location == 2 && (
              <input
                type="number"
                name="serviceFee"
                className="form-select"
                value={serviceFee}
                min="1"
                onChange={(e) => setServiceFee(e.target.value)}
              />
            )}
          </div>
        </div>
      )
    } else {
      // console.log('Error. No home service fee');
    }
  }

  //event handler for hmo radio buttons
  function handleRadioChange(e) {
    const { name, value } = e.target

    setHmoDetails({ ...hmoDetails, [name]: value })

    if (name === "is_hmo" && value === "yes") {
      fetchHMOCompanies()
    }
  }
  //event handler for hmo select buttons
  function handleSelectChange(e, name) {
    setHmoDetails({ ...hmoDetails, [name]: e.id })

    if (name === "hmo_id") {
      fetchHMODiscounts(e.id)
    }
  }

  //get all companies with HMO
  async function fetchHMOCompanies() {
    axios({
      method: "post",
      url: window.$link + "companies/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        let hmos_filter = response.data.companys.filter(
          (data) => data.is_hmo === "1"
        )
        let hmo_list = []
        hmos_filter.map((data) =>
          hmo_list.push({ ...data, label: data.name, value: data.id })
        )
        setHmoCompanies(hmo_list)
      })
      .catch(function (error) {
        console.log("error", error)
      })
  }

  //get all companies with HMO
  async function fetchHMODiscounts(id) {
    axios({
      method: "post",
      url: window.$link + "discounts/hmo",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        company_id: id,
      },
    })
      .then(function (response) {
        setHmoDiscounts([])
        let hmo_discounts = []
        response.data.map((data) =>
          hmo_discounts.push({
            ...data,
            label: data.discount_code,
            value: data.id,
          })
        )
        setHmoDiscounts(hmo_discounts)
      })
      .catch(function (error) {
        setHmoDiscounts([])
        console.log("error", error)
      })
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
        setDiscountList(response.data.discounts)
      })
      .catch(function (error) {
        // console.log(error);
      })
  }, [])

  React.useEffect(() => {
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

  // auto suggest address
  const [suggestions, setSuggestions] = useState([])
  const [allAddress, setAllAddress] = useState([])
  const [renderSuggest, setRenderSuggest] = useState(true)
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
        setAllAddress(response.data)
      })
      .catch(function (error) {
        setAllAddress([])
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    if (address !== "" && allAddress.length > 0) {
      let searchWord = new RegExp(address.toLowerCase()) // create regex for input address
      let filteredAddress = allAddress.filter((info) =>
        searchWord.test(info.toLowerCase())
      ) // test if there is a match
      setSuggestions(filteredAddress) // set all matches to suggestions
    }
  }, [address])

  // auto suggest address
  const [MDSuggestions, setMDSuggestions] = useState([])
  const [allMD, setAllMD] = useState([])
  const [renderMDSuggest, setRenderMDSuggest] = useState(true)
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
        setAllMD(response.data)
      })
      .catch(function (error) {
        setAllAddress([])
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    if (referral !== "" && setAllMD.length > 0) {
      let searchWord = new RegExp(referral.toLowerCase()) // create regex for input address
      let filteredMD = allMD.filter((info) =>
        searchWord.test(info.toLowerCase())
      ) // test if there is a match
      setMDSuggestions(filteredMD) // set all matches to suggestions
    }
  }, [referral])

  React.useEffect(() => {
    const birthDate = new Date(customer.birthDate)
    if (
      customer.birthDate &&
      new Date().getFullYear() - birthDate.getFullYear() >= 60
    ) {
      setIsSenior(true)
    } else {
      setIsSenior(false)
    }
  })

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
        <Header type="thin" title="ADD PATIENT" />

        <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

        <div style={{ width: "85%", marginLeft: "5%" }}>
          <form className="needs-validation">
            <div className="row">
              <div className="col-sm-4">
                <label for="fname" className="form-label font-large">
                  FIRST NAME <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="full-input"
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={setPersonal}
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
                  id="mname"
                  name="mname"
                  value={mname}
                  onChange={setPersonal}
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="lname" className="form-label font-large">
                  LAST NAME <span className="required">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
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
                <label for="sex" className="form-label font-large">
                  SEX <span className="required">*</span>
                </label>

                <select
                  name="sex"
                  className="form-select"
                  value={sex}
                  onChange={setPersonal}
                  required
                >
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="col-sm-4">
                <label for="birthDate" className="form-label font-large">
                  DATE OF BIRTH <span className="required">*</span>
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  name="birthDate"
                  className="full-input"
                  value={birthDate}
                  onChange={setPersonal}
                  required
                ></input>
              </div>
              <div className="col-sm-4">
                <label for="senior_id" className="form-label font-large">
                  SENIOR CITIZEN ID{" "}
                  {isSenior && <span className="required">*</span>}
                </label>

                <input
                  type="text"
                  id="senior_id"
                  name="senior_id"
                  className="full-input"
                  placeholder="ID Should not contain any spaces..."
                  value={!isSenior ? "" : senior_id}
                  onChange={setPersonal}
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
                    onChange={(e) => {
                      setIsPWD(e.target.checked)
                    }}
                  />
                  <label for="mdCharge" className="booking-label font-large">
                    Person With Disabilities
                  </label>
                </span>
              </div>
              <div className="col-sm-6">
                <label for="contactNum" className="form-label font-large">
                  PWD ID {isPWD && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  id="pwd_id"
                  name="pwd_id"
                  className="full-input"
                  placeholder="ID Should not contain any spaces..."
                  value={!isPWD ? "" : pwd_id}
                  disabled={!isPWD}
                  onChange={setPersonal}
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
                  id="email"
                  name="email"
                  value={email}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="contactNum" className="form-label font-large">
                  CONTACT NUMBER <span className="required">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="contactNum"
                  name="contactNum"
                  value={contactNum}
                  onChange={setPersonal}
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
                  onFocus={() => {
                    setRenderMDSuggest(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setRenderMDSuggest(false)
                    }, 200)
                  }}
                />
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label for="address" className="form-label font-large">
                  ADDRESS <span className="required">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="full-input"
                  id="address"
                  name="address"
                  value={address}
                  onChange={setPersonal}
                  onFocus={() => {
                    setRenderSuggest(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setRenderSuggest(false)
                    }, 200)
                  }}
                  required
                />
              </div>
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
                        setPersonal(e)
                        setRenderSuggest(false)
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
                        setPersonal(e)
                        setRenderMDSuggest(false)
                      }}
                    >
                      {data}
                    </button>
                    <br />
                  </>
                ))}
              </div>
            )}
            <div className="row mt-3">
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
                      onChange={(e) => handleSelectChange(e, "hmo_id")}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="hmo"
                      options={hmoCompanies}
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
                      onChange={(e) => handleSelectChange(e, "hmo_code")}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="hmo"
                      options={hmoDiscounts}
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
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      options={discountList.filter((data) => data.id === "7")}
                    />
                  </div>
                </>
              )}
            </div>
            {hmoDetails.is_hmo === "no" && (
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
            )}
            <div className="row small-gap">
              <div className="col-sm-6">
                <label className="radio-header font-large">
                  LOCATION OF SERVICE <span className="required">*</span>
                </label>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="radio"
                      id="serviceLocationClinic"
                      name="serviceLocation"
                      value="clinic"
                      checked={serviceLocation === "clinic"}
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
                    <input
                      type="radio"
                      id="serviceLocationHome"
                      name="serviceLocation"
                      value="home service"
                      checked={serviceLocation === "home service"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="serviceLocationHome"
                      className="location-radio-label font-large"
                    >
                      {" "}
                      HOME SERVICE
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <label for="result" className="radio-header font-large">
                    RESULTS <span className="required">*</span>
                  </label>
                  <br />
                  <div className="col">
                    <input
                      type="radio"
                      id="resultEmail"
                      name="result"
                      value="email"
                      checked={result === "email"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="resultEmail"
                      className="result-radio-label font-large"
                    >
                      EMAIL
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="resultPick"
                      name="result"
                      value="print with pickup"
                      checked={result === "print with pickup"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="resultPick"
                      className="result-radio-label font-large"
                    >
                      PICKUP
                    </label>
                  </div>
                  <div className="col">
                    <input
                      type="radio"
                      id="resultBoth"
                      name="result"
                      value="both"
                      checked={result === "both"}
                      onChange={setPersonal}
                    />{" "}
                    <label
                      htmlFor="resultBoth"
                      className="result-radio-label font-large"
                    >
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
              <div className="col-sm-6">{homeServiceFeeDisplay()}</div>
            </div>
            <div className="row date-of-testing-container large-gap">
              <div className="col-sm-4">
                <label for="date" className="form-label font-large">
                  DATE OF TESTING<span className="required">*</span>
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
                  DATE OF EXTRACTION<span className="required">*</span>
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
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default AddPatient
