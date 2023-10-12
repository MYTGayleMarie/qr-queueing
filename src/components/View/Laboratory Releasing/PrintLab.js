import React, { useState, useRef } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { getToken, getUser, refreshPage } from "../../../utilities/Common"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useReactToPrint } from "react-to-print"
import { PaymentToPrint } from "../Cashier/PaymentToPrint.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Navigate } from "react-router-dom"
// Import Signature Images
import Image1 from "../../../images/med_tech/ABIERAS_JENNIFER.png"
import Image2 from "../../../images/med_tech/AJEDO_GENIEVIEV.png"
import Image3 from "../../../images/med_tech/DEVIO_ANECA.png"
// import Image4 from "../../../images/med_tech/VIVERO_CHARLENE.png";
import Image5 from "../../../images/med_tech/CORTEZ_SAMANTHA.png"
import Image6 from "../../../images/med_tech/MATAGANAS_ARIZA.png"
// import Image7 from "../../../images/med_tech/BONJOC_JEREMY.png";
// import Image8 from "../../../images/med_tech/MAJESELA_ABALORIO.png";
import Image9 from "../../../images/med_tech/image9.png"
import Image10 from "../../../images/med_tech/Image10.png"
import Image11 from "../../../images/med_tech/OSMA.png"
import image11 from "../../../images/med_tech/image11.png"
import image12 from "../../../images/med_tech/image12.png"
import bonjoc from "../../../images/med_tech/BONJOC_JEREMY.png"
import DummyImg from "../../../images/med_tech/dummy.png"
import Watermark from "../../../images/Watermark.png"
import Teal from "../../../images/backgrounds/TealHeader.png"
import Logo from "../../../images/logo.png"
//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"
import Costing from "../../Costing"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

//variables
const presentDate = new Date()
const userToken = getToken()
const userId = getUser()

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

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
]

function PrintLab() {
  document.body.style = "background: white;"

  const navigateto = useNavigate()
  //booking details
  const [paymentBreakdown, setPaymentBreakdown] = useState({})
  const [payment, setPayment] = useState("")
  const [total, setTotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [pay, setPay] = useState(0)
  const [remarks, setRemarks] = useState("")
  const [discount, setDiscount] = useState(0)
  const [encodedOn, setEncodedOn] = useState("")
  const [labTests, setLabTests] = useState([])
  const [packages, setPackages] = useState([])

  //customer details
  const { bookingID, id, labBookId, type, dateFrom, dateTo } = useParams()
  const { state } = useLocation()

  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [seniorPwdId, setID] = useState("")
  const [patientId, setPatientId] = useState("")
  const [senior_id, setSeniorId] = useState("")
  const [pwd_id, setPWDId] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [paidAmount, setPaidAmount] = useState(0)
  const [selectedLab, setSelectedLab] = useState({ label: "" })
  const [labTestData, setLabTestData] = useState([])
  const [labResultsData, setLabResultsData] = useState([])
  const [hasImage, setHasImage] = useState(false)
  //other states
  const [redirect, setRedirect] = useState(false)
  const [printReadyFinal, setPrintReadyFinal] = useState(false)
  const handleRedirect = () => setRedirect(true)

  // Doctor Remarks
  const [medTech, setMedTech] = useState("")
  const [medTechPRC, setMedTechPRC] = useState("")
  const [clinicPatho, setClinicPatho] = useState("")
  const [clinicPathoPRC, setClinicPathoPRC] = useState("")
  const componentRef = useRef()

  const [readyDetails, setReadyDetails] = useState(false)
  const [readyBookingDetails, setReadyBookingDetails] = useState(false)
  const fileName = lastName + ", " + firstName + "-" + state.selectedLab.label
  const printHandle = useReactToPrint({
    documentTitle: fileName,
    content: () => componentRef.current,
    onAfterPrint: () => {
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        // html2canvas(componentRef.current).then(canvas => {
        //   const imgData = canvas.toDataURL('image/png');
        //   const a = document.createElement('a');
        //   a.href = imgData;
        //   a.download = 'image.png';
        //   a.click();
        const pageWidth = 215.9 // mm
        const pageHeight = 279.4 // mm

        const imgWidth = pageWidth
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (imgHeight > pageHeight) {
          imgHeight = pageHeight
          imgWidth = (canvas.width * imgHeight) / canvas.height
        }
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF()
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save(fileName + ".pdf")
        var link =
          "/laboratory-officer/" + bookingID + "/" + dateFrom + "/" + dateTo
        window.open(link, "_self")
        navigateto(link)
      })
    },
    // onAfterPrint: refreshPage,

    pageStyle: () => `
            @page { size: letter; margin: 0.5in;margin-bottom:0in}
            @media print {
              .print-break {
                margin: 0.5in;
                margin-top:0.5in;
                margin-left:0.5in;
                margin-right:0.5in;
                margin-bottom:0in;
                display: block;
                page-break-before: always;
              }
            }
            `,
  })

  //get customer details
  React.useEffect(() => {
    //for customer id
    axios({
      method: "post",
      url: window.$link + "bookings/getDetails/" + bookingID,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((response) => {
        setFirstName(response.data.data.booking.first_name)
        setMiddleName(response.data.data.booking.middle_name)
        setLastName(response.data.data.booking.last_name)

        var temp = new Date(response.data.data.booking.birthdate)

        var date_temp =
          monthNames[temp.getMonth()] +
          " " +
          temp.getDate() +
          ", " +
          temp.getFullYear()
        setBirthDate(date_temp)

        setGender(response.data.data.booking.gender)

        var presentDate = new Date()
        var age = presentDate.getFullYear() - temp.getFullYear()
        var m = presentDate.getMonth() - temp.getMonth()
        if (m < 0 || (m === 0 && presentDate.getDate() < temp.getDate())) {
          age--
        }
        setAge(age)

        setContactNo(response.data.data.booking.contact_no)
        setEmail(response.data.data.booking.customer_email)
        setAddress(response.data.data.booking.customer_address)
        setReadyDetails(true)
      })
      .catch((error) => {})
  }, [])
  React.useEffect(() => {
    setClinicPatho("JENNIFER D. ABIERAS")
    setClinicPathoPRC("PRC LIC. NO.: 0085469")
    if (medTech === "") {
      axios({
        method: "get",
        url: window.$link + "users/show/" + userId,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then((response) => {
          setMedTech(response.data.name)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  //services
  const [services, setServices] = useState([])
  const [bookingDate, setBookingDate] = useState("")
  const [result, setResult] = useState("")
  const [printServices, setPrintServices] = useState([])
  const [queue, setQueue] = useState([])
  const [queueNumber, setQueueNumber] = useState("")
  const [print, setPrint] = useState(true)

  function choosePRC(prc_id) {
    if (prc_id === "24") {
      return "PRC LIC. NO.: 0052932"
    } else if (prc_id === "25") {
      return "PRC LIC. NO.: 0085690"
    } else if (prc_id === "26") {
      return "PRC LIC. NO.: 0092410"
    } else if (prc_id === "23") {
      return "PRC LIC. NO.: 0112611"
    } else if (prc_id === "27") {
      return "PRC LIC. NO.: 0109359"
    } else if (prc_id === "28") {
      return "PRC LIC. NO.: 0094539"
    } else if (prc_id === "29") {
      return "PRC LIC. NO.: 0093629"
    } else if (prc_id === "30") {
      return "PRC LIC. NO.: 0094334"
    } else if (prc_id === "45") {
      return "PRC LIC. NO.: 0085308"
    } else if (prc_id === "48") {
      return "PRC LIC. NO.: 0109437"
    } else if (prc_id === "50") {
      return "PRC LIC. NO.: 0052556"
    } else {
      return "No PRC No."
    }
  }

  function chooseImage(prc_sig) {
    if (prc_sig === "23") {
      setHasImage(true)
      return (
        <img
          src={Image9}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "24") {
      setHasImage(true)
      return (
        <img
          src={Image2}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "25") {
      setHasImage(true)
      return (
        <img
          src={Image6}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "26") {
      setHasImage(true)
      return (
        <img
          src={Image5}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={50}
          height={50}
        />
      )
    } else if (prc_sig === "27") {
      setHasImage(true)
      return (
        <img
          src={Image10}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={50}
          height={50}
        />
      )
    } else if (prc_sig === "28") {
      setHasImage(true)
      return (
        <img
          src={Image3}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "29") {
      setHasImage(true)
      return (
        <img
          src={Image9}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "30") {
      setHasImage(true)
      return (
        <img
          src={Image11}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "45") {
      setHasImage(true)
      return (
        <img
          src={image11}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "48") {
      setHasImage(true)
      return (
        <img
          src={image12}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    } else if (prc_sig === "50") {
      setHasImage(true)
      return (
        <img
          src={bonjoc}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
          width={100}
          height={50}
        />
      )
    }
    // else{
    //   setHasImage(true);
    //   return (
    //     <img
    //       src={Image10}
    //       alt="MedTech"
    //       // className="mt-5"
    //       style={{ marginTop: "1.5rem" }}
    //       width={70}
    //       height={60}
    //     />
    //   );
    {
      // setHasImage(false);

      // return (
      //   <img
      //     src={Image10}
      //     alt="MedTech"
      //     // className="mt-5"
      //     style={{ marginTop: "1.5rem" }}
      //     width={100}
      //     height={90}
      //   />
      // );
      // {
      setHasImage(false)

      return (
        <div
          // className="mt-5"
          style={{ marginTop: "0.5rem" }}
        ></div>
      )
    }
    // if (prc_sig === "23") {
    //   return Image9;
    // } else if (prc_sig === "24") {
    //   return Image2;
    // } else if (prc_sig === "25") {
    //   return Image6;
    // } else if (prc_sig === "26") {
    //   return Image5;
    // } else if (prc_sig === "27") {
    //   return Image10;
    // } else if (prc_sig === "28") {
    //   return Image3;
    // } else if (prc_sig === "29") {
    //   return Image4;
    // } else if (prc_sig === "30") {
    //   return Image11;
    // } else {
    //   return Image9;
    // }
  }

  const Signature = () => {
    return (
      <div>
        <div className="wrapper">
          <div className="box">
            {state.selectedLab.result_approval === "approved"
              ? chooseImage(state.selectedLab.approved_id)
              : chooseImage(userId)}
            {/* <img
              src={
                state.selectedLab.result_approval === "approved"
                  ? chooseImage(state.selectedLab.approved_id)
                  : chooseImage(userId)
              }
              alt="MedTech"
              className="mt-5"
              width={100}
              height={100}
            /> */}
          </div>
          <div className="box pt-2">
            <img
              src={Image1}
              alt="MedTech"
              style={{ zIndex: "50", marginTop: "10px" }}
            />
          </div>
        </div>
        <div
          className="wrapper"
          style={{ marginTop: hasImage ? "-13px" : "-5px" }}
        >
          <div className="box">
            <span className="tspan">
              {state.selectedLab.result_approval === "approved"
                ? state.selectedLab.approver
                : medTech}{" "}
            </span>
          </div>
          <div className="box">
            <span className="tspan">{clinicPatho}</span>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <span className="tspan">
              {state.selectedLab.result_approval === "approved"
                ? choosePRC(state.selectedLab.approved_id)
                : choosePRC(userId)}
            </span>
          </div>
          <div className="box">
            <span className="tspan">{clinicPathoPRC}</span>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <span className="tspan">Medical Technologist</span>
          </div>
          <div className="box">
            <span className="tspan">Clinical Pathologist</span>
          </div>
        </div>
      </div>
    )
  }

  function printButton() {
    return (
      //   <button className="save-btn" onClick={handlePrint}>
      <button className="save-btn">
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT
      </button>
    )
  }

  React.useEffect(() => {
    // setIsDataFetched(false);
    // Lab Options
    axios({
      method: "post",
      url: window.$link + "bookings/getBookingDetails/" + bookingID,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then((booking) => {
      setServices(booking.data)
      var thyroid = booking.data.filter((data) => data.category_id === "13")
      var serology = booking.data.filter((data) => data.category_id === "12")
      var booking_wo_serology_thyroid = booking.data.filter(
        (data) => data.category_id !== "12" && data.category_id !== "13"
      )

      if (serology.length > 0) {
        booking_wo_serology_thyroid.push(serology[0])
      }
      if (thyroid.length > 0) {
        booking_wo_serology_thyroid.push(thyroid[0])
      }
      const labOptions = booking_wo_serology_thyroid
        .map((data) => {
          // Include only data in sheets
          if (labResultsData.testsToCheck.includes(data.lab_test)) {
            return {
              label: data.lab_test,
              id: data.id,
              type: data.type,
            }
          }
          return null
        })
        .filter((option) => option !== null)
    })

    if (id != null) {
      //   setIsDataFetched(false);
      //   setIsReady(false);
      axios({
        method: "get",
        url: window.$link + "Bookingdetails/getDetailsResult/" + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then((response) => {
          var data = response.data.data

          var packageDetailId = labBookId
          if (data.booking_detail_results !== null) {
            if (type == "lab") {
              setLabTestData(data.booking_detail_results)
            } else if (data.booking_package_details_results[packageDetailId]) {
              setLabTestData(
                data.booking_package_details_results[packageDetailId]
              )
            } else {
            }
          } else if (
            data.booking_package_details_results[packageDetailId] == null
          ) {
          } else if (data.booking_package_details_results !== {}) {
            setLabTestData(
              data.booking_package_details_results[packageDetailId]
            )
          } else {
          }

          const index = services.findIndex(
            (service) => service.lab_test === state.selectedLab.label
          )
          setReadyBookingDetails(true)
          //   setIsReady(true);
          //   setIsDataFetched(true);
        })
        .catch((error) => {
          //   setIsReady(true);
          console.log(error)
        })
    }
  }, [])

  React.useEffect(() => {
    // setIsReady(false);
    axios({
      method: "get",
      url: window.$link + "/Bookingdetails/getDetails/" + state.selectedLab.id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setRemarks(response.data.data.booking_detail[0].remarks)
        // setIsReady(true);
      })
      .catch(function (error) {
        // setIsReady(true);
        console.log(error)
      })
  }, [state.selectedLab])

  React.useEffect(() => {
    if (readyDetails && readyBookingDetails) {
      printHandle()
    }
  }, [readyDetails, readyBookingDetails])
  if (redirect == true) {
    return <Navigate to="/registration" />
  }

  return (
    <div style={{ backgroundColor: "white", width: "900px" }}>
      <div class="bg">
        <div>
          <div id="capture" ref={componentRef}>
            {/* Header */}
            <div style={{ position: "relative" }}>
              <img
                src={Teal}
                alt="QR DIAGNOSTICS"
                className="teal_header_laboff"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <img
                  src={Logo}
                  alt="QR DIAGNOSTICS"
                  className="img-small"
                  style={{ paddingRight: "50px" }}
                />
                <div style={{ display: "block" }}>
                  <span className="resultTitle">
                    DEPARTMENT OF CLINICAL LABORATORY
                  </span>
                  <span className="addressTitle">
                    Unit A, M Block, Marasbaras, Tacloban City | 0999-888-6694
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                border: "2px solid black",
                width: "100%",
                marginBottom: "0px",
              }}
            />
            <div>
              <div className="laboratory-title">
                <span>
                  {state.selectedLab.label && (
                    <>
                      {state.selectedLab.label.toUpperCase() === "SERUMPT" ||
                      state.selectedLab.label.toUpperCase() === "URINALYSIS" ||
                      state.selectedLab.label.toUpperCase() === "[P] URINALYSIS"
                        ? "CLINICAL MICROSCOPY - URINALYSIS"
                        : state.selectedLab.label.toUpperCase() ===
                            "FECALYSIS" ||
                          state.selectedLab.label.toUpperCase() ===
                            "[P] FECALYSIS"
                        ? "CLINICAL MICROSCOPY - FECALYSIS"
                        : state.selectedLab.label.toUpperCase() ===
                            "HBSAG (HEPATITIS B ANTIGEN)" ||
                          state.selectedLab.label.toUpperCase() ===
                            "[P] HBSAG (HEPATITIS B ANTIGEN)" ||
                          state.selectedLab.label.toUpperCase() === "ANTIHAV" ||
                          state.selectedLab.label.toUpperCase() === "ANTIHCV"
                        ? "SEROLOGY"
                        : state.selectedLab.label.toUpperCase() === "FT4" ||
                          state.selectedLab.label.toUpperCase() === "FT3" ||
                          state.selectedLab.label.toUpperCase() === "TSH" ||
                          state.selectedLab.label.toUpperCase() === "T4" ||
                          state.selectedLab.label.toUpperCase() === "T3"
                        ? "THYROID PROFILE"
                        : state.selectedLab.label.toUpperCase() ===
                          "SPERM ANALYSIS"
                        ? "CLINICAL MICROSCOPY - SPERM ANALYSIS"
                        : state.selectedLab.label === "Anti HAV"
                        ? "CLINICAL SEROLOGY"
                        : state.selectedLab.label.toUpperCase() ===
                          "CLOTTING & BLEEDING TIME"
                        ? "HEMATOLOGY"
                        : state.selectedLab.label.toUpperCase()}
                    </>
                  )}
                </span>
              </div>
              <div className="laboratory-space"></div>
              <div class="tb">
                <div class="row">
                  <div class="col details_title">
                    <span>NAME :</span>
                  </div>
                  <div class="col">
                    <span>
                      {lastName.toUpperCase()}, {firstName.toUpperCase()}{" "}
                      {middleName.toUpperCase()}
                    </span>
                  </div>
                  <div class="col details_title">
                    <span>REQUEST DATE :</span>
                  </div>
                  <div class="col">
                    <span>
                      {monthNames[presentDate.getMonth()]}{" "}
                      {presentDate.getDate()}, {presentDate.getFullYear()}
                    </span>
                  </div>
                </div>
                <div class="row" style={{ marginTop: "2px" }}>
                  <div class="col details_title">
                    <span>AGE :</span>
                  </div>
                  <div class="col">
                    <span>{age}</span>
                  </div>
                  <div class="col details_title">
                    <span>CONTACT NUMBER :</span>
                  </div>
                  <div class="col">
                    <span>{contactNo}</span>
                  </div>
                </div>
                <div class="row" style={{ marginTop: "2px" }}>
                  <div class="col details_title">
                    <span>GENDER :</span>
                  </div>
                  <div class="col">
                    <span>{gender.toUpperCase()}</span>
                  </div>
                  <div class="col details_title">
                    <span>BIRTHDATE :</span>
                  </div>
                  <div class="col">
                    <span>{birthDate}</span>
                  </div>
                </div>
                <div class="row" style={{ marginTop: "2px" }}>
                  <div class="col details_title">
                    <span>PATIENT ID :</span>
                  </div>
                  <div class="col">
                    <span>{id}</span>
                  </div>
                  <div class="col details_title">
                    <span>REQUESTING PHYSICIAN :</span>
                  </div>
                  <div class="col">
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="laboratory-space"></div>
              <img src={Watermark} alt="QR DIAGNOSTICS" className="watermark" />

              <div>
                <br />
                {state.selectedLab.label === "Antigen Rapid Swab (Nasal)" ? (
                  <>
                    <div className="tb mid">
                      <div className="row bd">
                        <div className="col">
                          <span>
                            <b>RESULT</b>
                          </span>
                        </div>
                      </div>

                      {/* {labTestData.map((result, resultIndex) => (
                      <> */}
                      <div
                        className="row"
                        style={{
                          marginTop: "1px",
                          width: "100%",
                          marginLeft: "1px",
                        }}
                        // key={resultIndex}
                      >
                        <div className="col align-center text-center mt-1">
                          <div className="row">
                            <div className="col-6">Test Performed:</div>
                            <div className="col-6">
                              SARS CoV-2 Antigen Rapid Test
                            </div>

                            <div className="col-6">
                              Brand of Antigen Kit Used:
                            </div>
                            <div className="col-6">STANDARD Q COVID-19 Ag</div>

                            <div className="col-6">Time Collected:</div>
                            <div className="col-6">
                              {labTestData[1]?.result}
                            </div>

                            <div className="col-6">Lot #:</div>
                            <div className="col-6">
                              {labTestData[2]?.result}
                            </div>

                            <div className="col-6">Expiry Date:</div>
                            <div className="col-6">
                              {labTestData[3]?.result}
                            </div>

                            <div className="col-6">Test Principle:</div>
                            <div className="col-6">
                              Rapid Chromatographic Immunoassay
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-6">
                          <h5>TEST RESULT</h5>
                        </div>
                        <div className="col-6">
                          <h5>{labTestData[0]?.result}</h5>
                        </div>
                      </div>
                      {/* </>
                    ))} */}
                    </div>
                  </>
                ) : state.selectedLab.label === "Anti HAV" ? (
                  <>
                    <div className="tb mid">
                      <div className="row bd">
                        <div className="col">
                          <span>
                            <b>TEST</b>
                          </span>
                        </div>
                        <div className="col">
                          <span>
                            <b>ANTIBODY</b>
                          </span>
                        </div>
                        <div className="col">
                          <span>
                            <b>RESULT</b>
                          </span>
                        </div>
                      </div>

                      {/* {labTestData.map((result, resultIndex) => (
                      <> */}
                      <div
                        className="row"
                        style={{
                          marginTop: "1px",
                          width: "100%",
                          marginLeft: "1px",
                        }}
                        // key={resultIndex}
                      >
                        <div className="col align-center text-center mt-1">
                          <div className="row">
                            <div className="col-4 pt-3">
                              <h5>ANTI-HAV</h5>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col-12">IgG</div>
                                <div className="col-12">IgM</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col-12">
                                  {labTestData[0]?.result}
                                </div>
                                <div className="col-12">
                                  {labTestData[1]?.result}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* </>
                    ))} */}
                    </div>
                  </>
                ) : state.selectedLab.label === "Clotting & Bleeding Time" ? (
                  <>
                    <div className="tb mid">
                      <div className="row bd">
                        <div className="col">
                          <span>
                            <b>TEST</b>
                          </span>
                        </div>
                        <div className="col">
                          <span>
                            <b>RESULT</b>
                          </span>
                        </div>
                        <div className="col">
                          <span>
                            <b>REFERENCE RANGE</b>
                          </span>
                        </div>
                      </div>
                      <div
                        className="row"
                        style={{
                          marginTop: "1px",
                          width: "100%",
                          marginLeft: "1px",
                        }}
                      >
                        <div className="col align-center text-center mt-1">
                          <div className="row">
                            <div className="col-4">BLEEDING TIME</div>
                            <div className="col-4">
                              {labTestData[0]?.result}
                            </div>
                            <div className="col-4">
                              1-3 MINUTES{" "}
                              <span style={{ color: "red" }}>
                                {parseInt(labTestData[0]?.result) < 1
                                  ? "(L)"
                                  : parseInt(labTestData[0]?.result) > 3
                                  ? "(H)"
                                  : ""}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">CLOTTING TIME</div>
                            <div className="col-4">
                              {labTestData[1]?.result}
                            </div>
                            <div className="col-4">
                              3-6 MINUTES{" "}
                              <span style={{ color: "red" }}>
                                {parseInt(labTestData[1]?.result) < 3
                                  ? "(L)"
                                  : parseInt(labTestData[1]?.result) > 6
                                  ? "(H)"
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="tb mid">
                    <div className="row bd">
                      <div className="col">
                        <span>
                          <b>TEST</b>
                        </span>
                      </div>
                      <div className="col">
                        <span>
                          <b>RESULT</b>
                        </span>
                      </div>
                      {state.selectedLab.label !== "Urinalysis" &&
                        state.selectedLab.label !== "[P] Urinalysis" &&
                        state.selectedLab.label !== "Fecalysis" &&
                        state.selectedLab.label !== "[P] Fecalysis" &&
                        state.selectedLab.label !== "Syphilis/RPR/VDRL" &&
                        state.selectedLab.label !== "KOH" &&
                        state.selectedLab.label !== "H. Pylori Ag" &&
                        state.selectedLab.label !==
                          "Anti HBs/HBSab (Hepatitis B Antibody)" &&
                        state.selectedLab.label !==
                          "HBSag (Hepatitis B Antigen)" &&
                        state.selectedLab.label !==
                          "[P] HBSag (Hepatitis B Antigen)" &&
                        state.selectedLab.label !==
                          "Hepatitis B Surface Antigen (HbsAg)" &&
                        state.selectedLab.label !== "Anti-HAV" &&
                        state.selectedLab.label !== "Anti HCV" &&
                        // state.selectedLab.label === "TSH" &&
                        // state.selectedLab.label === "FT3" &&
                        // state.selectedLab.label === "FT4" &&
                        // state.selectedLab.label === "T3" &&
                        // state.selectedLab.label === "T4" &&
                        state.selectedLab.label !== "Gram Stain" &&
                        state.selectedLab.label !==
                          "Clotting & Bleeding Time" &&
                        state.selectedLab.label !==
                          "Pregnancy Test (RPK Lateral Flow)" &&
                        state.selectedLab.label !== "Fecal Occult Blood" &&
                        state.selectedLab.label !==
                          "HIV Screening (Anti HIV)" &&
                        state.selectedLab.label !==
                          "Antigen Rapid Swab (Nasal)" &&
                        state.selectedLab.label !== "Serum Pregnancy Test" && (
                          <div className="col">
                            <span>
                              <b>UNIT</b>
                            </span>
                          </div>
                        )}
                      {state.selectedLab.label !== "Urinalysis" &&
                        state.selectedLab.label !== "[P] Urinalysis" &&
                        state.selectedLab.label !== "Fecalysis" &&
                        state.selectedLab.label !== "[P] Fecalysis" &&
                        state.selectedLab.label !==
                          "[P] HBSag (Hepatitis B Antigen)" &&
                        state.selectedLab.label !== "Syphilis/RPR/VDRL" &&
                        state.selectedLab.label !== "KOH" &&
                        state.selectedLab.label !==
                          "Anti HBs/HBSab (Hepatitis B Antibody)" &&
                        state.selectedLab.label !==
                          "HBSag (Hepatitis B Antigen)" &&
                        state.selectedLab.label !==
                          "Hepatitis B Surface Antigen (HbsAg)" &&
                        state.selectedLab.label !== "Anti-HAV" &&
                        state.selectedLab.label !==
                          "Pregnancy Test (RPK Lateral Flow)" &&
                        state.selectedLab.label !== "Anti HCV" &&
                        state.selectedLab.label !== "H. Pylori Ag" &&
                        state.selectedLab.label !== "Fecal Occult Blood" &&
                        state.selectedLab.label !==
                          "Antigen Rapid Swab (Nasal)" &&
                        state.selectedLab.label !== "Serum Pregnancy Test" &&
                        state.selectedLab.label !== "Gram Stain" &&
                        state.selectedLab.label !==
                          "HIV Screening (Anti HIV)" && (
                          <div className="col">
                            <span>
                              <b>REFERENCE RANGE</b>
                            </span>
                          </div>
                        )}
                    </div>

                    {labTestData.map((result, resultIndex) => (
                      <>
                        <div
                          className="row"
                          style={{
                            marginTop: "1px",
                            width: "100%",
                            marginLeft: "1px",
                          }}
                          key={resultIndex}
                        >
                          <div className="col">
                            {state.selectedLab.label !== "TSH" &&
                            state.selectedLab.label !== "FT3" &&
                            state.selectedLab.label !== "FT4" &&
                            state.selectedLab.label !== "T3" &&
                            state.selectedLab.label !== "T4" &&
                            (resultIndex === 0 ||
                              result["test_type"] !==
                                labTestData[resultIndex - 1]["test_type"]) ? (
                              <div className="space-between">
                                <h5
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                  }}
                                >
                                  <u>{result["test_type"]}</u>
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                            {state.selectedLab.label !== "TSH" &&
                            state.selectedLab.label !== "FT3" &&
                            state.selectedLab.label !== "FT4" &&
                            state.selectedLab.label !== "T3" &&
                            state.selectedLab.label !== "T4" &&
                            (resultIndex === 0 ||
                              result["test_type_2"] !==
                                labTestData[resultIndex - 1]["test_type_2"]) ? (
                              <div className="space-between">
                                <h6
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                  }}
                                >
                                  {result["test_type_2"]}
                                </h6>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="space-between">
                              <span>
                                {result["lab_test"].replace("_", " ")}
                              </span>
                            </div>
                          </div>
                          <div className="col">
                            {/* Add Blank space for headers */}
                            {state.selectedLab.label !== "TSH" &&
                            state.selectedLab.label !== "FT3" &&
                            state.selectedLab.label !== "FT4" &&
                            state.selectedLab.label !== "T3" &&
                            state.selectedLab.label !== "T4" &&
                            (resultIndex === 0 ||
                              result["test_type"] !==
                                labTestData[resultIndex - 1]["test_type"]) ? (
                              <div className="space-between">
                                <h5
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                    color: "rgba(0, 0, 0, 0)",
                                  }}
                                >
                                  {result["test_type"]}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                            {state.selectedLab.label !== "TSH" &&
                            state.selectedLab.label !== "FT3" &&
                            state.selectedLab.label !== "FT4" &&
                            state.selectedLab.label !== "T3" &&
                            state.selectedLab.label !== "T4" &&
                            (resultIndex === 0 ||
                              result["test_type_2"] !==
                                labTestData[resultIndex - 1]["test_type_2"]) ? (
                              <div className="space-between">
                                <h6
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                    color: "rgba(0, 0, 0, 0)",
                                    marginLeft: "0 px",
                                  }}
                                >
                                  {result["test_type_2"]}
                                </h6>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* RESULTS */}
                            {result["result"] !== "" ? (
                              <>
                                {result["preferred"] == " " ? (
                                  result["preferred"] == result["result"] ? (
                                    <span>{result["result"]}</span>
                                  ) : (
                                    <span>{result["result"]}</span>
                                  )
                                ) : result["preferred"] != " " ? (
                                  result["preferred"] == result["result"] ? (
                                    <span>{result["result"]}</span>
                                  ) : (
                                    <span>{result["result"]} </span>
                                  )
                                ) : result["preferred_from"] != 0.0 ||
                                  result["preferred_to"] != 0.0 ? (
                                  parseFloat(result["preferred_from"]) >
                                  parseFloat(result["result"]) ? (
                                    <span class="red">
                                      {result["result"] + " (L)"}
                                    </span>
                                  ) : result["result"] >
                                    result["preferred_to"] ? (
                                    <span class="red">
                                      {result["result"] + " (H)"}
                                    </span>
                                  ) : (
                                    <span>{result["result"]}</span>
                                  )
                                ) : (
                                  <span> {result["result"]}</span>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          {state.selectedLab.label.toUpperCase() !==
                            "URINALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "[P] URINALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "FECALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "[P] FECALYSIS" &&
                            state.selectedLab.label !==
                              "Antigen Rapid Swab (Nasal)" &&
                            state.selectedLab.label !==
                              "[P] HBSag (Hepatitis B Antigen)" &&
                            state.selectedLab.label !==
                              "Serum Pregnancy Test" &&
                            state.selectedLab.label !== "Syphilis/RPR/VDRL" &&
                            state.selectedLab.label !== "H. Pylori Ag" &&
                            state.selectedLab.label !== "KOH" &&
                            state.selectedLab.label !==
                              "Anti HBs/HBSab (Hepatitis B Antibody)" &&
                            state.selectedLab.label !==
                              "HBSag (Hepatitis B Antigen)" &&
                            state.selectedLab.label !==
                              "Hepatitis B Surface Antigen (HbsAg)" &&
                            state.selectedLab.label !== "Anti-HAV" &&
                            state.selectedLab.label !== "Anti HCV" &&
                            state.selectedLab.label !==
                              "Pregnancy Test (RPK Lateral Flow)" &&
                            state.selectedLab.label !== "Fecal Occult Blood" &&
                            state.selectedLab.label !== "Gram Stain" &&
                            state.selectedLab.label !==
                              "Clotting & Bleeding Time" &&
                            state.selectedLab.label !==
                              "HIV Screening (Anti HIV)" && (
                              <div className="col">
                                <div className="space-between">
                                  <h6
                                    style={{
                                      fontStyle: "italic",
                                      marginTop: "10px",
                                      color: "rgba(0, 0, 0, 0)",
                                      marginLeft: "0 px",
                                    }}
                                  ></h6>
                                </div>
                                {/* { result["preferred_from"] != 0.0 ||
                              result["preferred_to"] != 0.0 ? ( */}
                                {result["result"] === "-" ||
                                (parseFloat(result["result"]) >=
                                  parseFloat(result["preferred_from"]) &&
                                  parseFloat(result["result"]) <=
                                    parseFloat(result["preferred_to"])) ? (
                                  <span style={{ marginTop: "10px" }}>
                                    {result["unit"]}{" "}
                                  </span>
                                ) : (
                                  <span style={{ marginTop: "10px" }}>
                                    {result["unit"]}
                                  </span>
                                )}
                              </div>
                            )}

                          {state.selectedLab.label.toUpperCase() !==
                            "URINALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "[P] URINALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "FECALYSIS" &&
                            state.selectedLab.label.toUpperCase() !==
                              "[P] FECALYSIS" &&
                            state.selectedLab.label !==
                              "Antigen Rapid Swab (Nasal)" &&
                            state.selectedLab.label !==
                              "Serum Pregnancy Test" &&
                            state.selectedLab.label !== "H. Pylori Ag" &&
                            state.selectedLab.label !== "Syphilis/RPR/VDRL" &&
                            state.selectedLab.label !== "KOH" &&
                            state.selectedLab.label !==
                              "[P] HBSag (Hepatitis B Antigen)" &&
                            state.selectedLab.label !==
                              "Pregnancy Test (RPK Lateral Flow)" &&
                            state.selectedLab.label !== "Gram Stain" &&
                            state.selectedLab.label !==
                              "HBSag (Hepatitis B Antigen)" &&
                            state.selectedLab.label !== "Anti-HCV" &&
                            state.selectedLab.label !== "Anti HCV" &&
                            state.selectedLab.label !==
                              "Anti HBs/HBSab (Hepatitis B Antibody)" &&
                            state.selectedLab.label !== "Fecal Occult Blood" &&
                            state.selectedLab.label !==
                              "HIV Screening (Anti HIV)" && (
                              <div className="col">
                                <span>
                                  {state.selectedLab.label !== "TSH" &&
                                  state.selectedLab.label !== "FT3" &&
                                  state.selectedLab.label !== "FT4" &&
                                  state.selectedLab.label !== "T3" &&
                                  state.selectedLab.label !== "T4" &&
                                  (resultIndex === 0 ||
                                    result["test_type"] !==
                                      labTestData[resultIndex - 1][
                                        "test_type"
                                      ]) ? (
                                    <div className="space-between">
                                      <h5
                                        style={{
                                          fontStyle: "italic",
                                          marginTop: "10px",
                                          color: "rgba(0, 0, 0, 0)",
                                        }}
                                      >
                                        {result["test_type"]}
                                      </h5>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {state.selectedLab.label !== "TSH" &&
                                  state.selectedLab.label !== "FT3" &&
                                  state.selectedLab.label !== "FT4" &&
                                  state.selectedLab.label !== "T3" &&
                                  state.selectedLab.label !== "T4" &&
                                  (resultIndex === 0 ||
                                    result["test_type_2"] !==
                                      labTestData[resultIndex - 1][
                                        "test_type_2"
                                      ]) ? (
                                    <div className="space-between">
                                      <h6
                                        style={{
                                          fontStyle: "italic",
                                          marginTop: "10px",
                                          color: "rgba(0, 0, 0, 0)",
                                        }}
                                      >
                                        {result["test_type_2"]}
                                      </h6>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {result["preferred"] != " "
                                    ? result["preferred"]
                                    : result["preferred_from"] != 0.0 ||
                                      result["preferred_to"] != 0.0
                                    ? result["preferred_to"] == 999.99
                                      ? ">=" +
                                        parseFloat(
                                          result["preferred_from"]
                                        ).toFixed(2)
                                      : parseFloat(
                                          result["preferred_from"]
                                        ).toFixed(2) +
                                        "-" +
                                        parseFloat(
                                          result["preferred_to"]
                                        ).toFixed(2)
                                    : ""}
                                </span>
                              </div>
                            )}
                        </div>
                      </>
                    ))}
                  </div>
                )}
                <hr
                  style={{
                    border: "2px solid black",
                    width: "100%",
                    marginBottom: "0",
                  }}
                />
                <div
                  style={{
                    justifyContent: "left",
                    alignItems: "left",
                    textAlign: "left",
                    marginLeft: "10px",
                  }}
                >
                  <span>
                    <b>REMARKS: </b>
                  </span>
                  <br />
                  <span>
                    <div dangerouslySetInnerHTML={{ __html: remarks }}></div>
                  </span>
                  <Signature />
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintLab
