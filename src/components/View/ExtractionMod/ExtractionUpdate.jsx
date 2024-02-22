import { Fragment, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  fetchBookingDetails,
  getSingleLabExtractionPatient,
  skipPatient,
  updateExtractionPatientBulk,
} from "../../../Helpers/APIs/extractionAPI"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "../../Navbar"
import Header from "../../Header"
import { Button, ListGroup } from "react-bootstrap"
import {
  formatDate,
  getToken,
  getUser,
  refreshPage,
} from "../../../utilities/Common"
import { RingLoader } from "react-spinners"
import { changeStatus } from "../../../Helpers/APIs/queueAPI"
import { useReactToPrint } from "react-to-print"
import { PaymentToPrint } from "../Cashier/PaymentToPrint"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const userToken = getToken()
const userId = getUser()

export default function ExtractionUpdate() {
  const { bookingId, queueId } = useParams()
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const [recordsDetails, setRecordsDetails] = useState([])
  const [tests, setTests] = useState([])
  const [printServices, setPrintServices] = useState([])
  const [discount, setDiscount] = useState(0)
  const [discountCode, setDiscountCode] = useState("")
  const [grandTotal, setGrandTotal] = useState(0)
  const [result, setResult] = useState("")
  const [hmo, setHmo] = useState(0)
  const [bookingDate, setBookingDate] = useState("")
  const [encodedOn, setEncodedOn] = useState("")
  const [readyToPrint, setReadyToPrint] = useState(false)
  const navigate = useNavigate()

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => `
    @page {
  size: auto;
  margin: 20mm;
}
@media print {
  .page-break {
    margin-top: 1rem;
    display: block;
    page-break-before: avoid;
    page-break-inside:avoid !important;
  }

  
}
          `,
  })

  useEffect(() => {
    printServices.length = 0
    tests.map((info, index1) => {
      if (info.category_id == null) {
        axios({
          method: "post",
          url: window.$link + "bookings/getBookingPackageDetails/" + info.id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        }).then(function (response) {
          response.data.map((packageCat, index2) => {
            var serviceDetails = {}
            axios({
              method: "post",
              url: window.$link + "categories/show/" + packageCat.category_id,
              withCredentials: false,
              params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ""),
                requester: userId,
              },
            })
              .then(function (category) {
                if (category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes"
                } else {
                  serviceDetails.key = category.data.name
                    .replace(/\s+/g, "_")
                    .toLowerCase()
                }
                serviceDetails.category = category.data.name
                serviceDetails.name = packageCat.lab_test
                setPrintServices((oldArray) => [...oldArray, serviceDetails])
              })
              .catch(function (error) {
                console.log(error)
              })
          })
        })
      } else {
        axios({
          method: "post",
          url: window.$link + "categories/show/" + info.category_id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then(function (category) {
            var serviceDetails = {}
            if (category.data.name == "Electrolytes (NaKCl,iCA)") {
              serviceDetails.key = "Electrolytes"
            } else {
              serviceDetails.key = category.data.name
                .replace(/\s+/g, "_")
                .toLowerCase()
            }
            serviceDetails.category = category.data.name
            serviceDetails.name = info.lab_test
            setPrintServices((oldArray) => [...oldArray, serviceDetails])
            setReadyToPrint(true)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    })
  }, [tests])

  useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/show/" + bookingId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setGrandTotal(response.data.grand_total)
        setDiscountCode(response.data.discount_code)
        setDiscount(response.data.discount)
        setResult(response.data.result)
        setHmo(response.data.hmo_discount)
        setBookingDate(response.data.booking_time)
        setEncodedOn(response.data.added_on)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  async function fetchExtraction() {
    const response = await getSingleLabExtractionPatient(bookingId, "")

    if (response.data) {
      setDetails(response.data.bookings[0])
      var lab_tests = response.data.bookings[0].lab_test.split("|")
      // var lab_tests_id = row.booking_detail_id.split("|");

      setRecordsDetails(lab_tests)
      setLoading(false)
      // setLabIds(lab_tests_id);
    } else {
      setLoading(false)
    }
  }

  async function handleUpdateBooking() {
    const response = await updateExtractionPatientBulk(details)
    if (response.data) {
      const queueResponse = await changeStatus(queueId, "done")
      toast.success(response.data.message.success.toUpperCase())
      if (queueResponse.data) {
        navigate("/extraction")
      }
    } else {
      toast.error(response.error.data.messages.error)
      setTimeout(() => {
        refreshPage()
      }, 2000)
    }
  }

  async function handleSkipPatient() {
    const response = await skipPatient(queueId)
    if (response.data) {
      toast.success(response.data.message.toUpperCase())
      setTimeout(() => {
        navigate("/extraction")
      }, 2000)
    } else {
      toast.error(response.error.data.messages.error)
      setTimeout(() => {
        refreshPage()
      }, 2000)
    }
  }

  async function fetchDetails() {
    const response = await fetchBookingDetails(bookingId, "phlebo")
    if (response.data) {
      setTests(response.data)
    }
  }
  useEffect(() => {
    fetchExtraction()
    fetchDetails()
  }, [])
  return (
    <div>
      <Navbar />
      <div className="active-cont">
        {loading ? (
          <div className="active-cont">
            <div className="row justify-content-center mt-5 pt-5">
              <div
                className="col-12 mt-5 pt-5 align-center"
                style={{ textAlign: "-webkit-center" }}
              >
                <RingLoader color={"#3a023a"} showLoading={true} size={200} />
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <Header type="thick" title={`EXTRACTION - BOOKING ${bookingId}`} />
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="p-5">
                  <div className="row">
                    <div className="col-8">
                      <h5>
                        <strong>PATIENT DETAILS</strong>
                      </h5>
                    </div>

                    <div className="col-3">
                      <Button
                        className="mt-2"
                        // size="sm"
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          background: "var(--danger-color)",
                          borderColor: "var(--danger-color)",
                        }}
                        onClick={handleSkipPatient}
                      >
                        SKIP
                      </Button>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-6">
                      <span>
                        PATIENT ID: <strong>{details.customer_id}</strong>
                      </span>
                    </div>
                    <div className="col-6">
                      <span>
                        AGE: <strong>{`${details.age}`}</strong>
                      </span>
                    </div>
                    <div className="col-6">
                      <span>
                        NAME:{" "}
                        <strong>{`${details.first_name?.toUpperCase()} ${
                          details.middle_name
                        } ${details.last_name}`}</strong>
                      </span>
                    </div>

                    <div className="col-6">
                      <span>
                        BIRTHDATE:{" "}
                        <strong>{`${formatDate(details.birthdate)}`}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8 text-center">
                <div className="extraction-details">
                  <div className="extraction-header">LAB TESTS</div>
                  <ListGroup defaultActiveKey="#link1">
                    {recordsDetails.map((data, index) => {
                      return (
                        <ListGroup.Item className="extraction-test">
                          <div className="row justify-content-start">
                            <div className="col">{data}</div>
                          </div>
                        </ListGroup.Item>
                      )
                    })}
                  </ListGroup>
                  {recordsDetails.length > 0 ? (
                    <div className="p-2">
                      {/* <div className="col-3"> */}
                      <Button
                        className="mt-2 m-1 p-2"
                        // size="sm"
                        style={{
                          width: "45%",
                          cursor: "pointer",
                          background: "var(--blue-brand)",
                          borderColor: "var(--blue-brand)",
                        }}
                        onClick={handlePrint}
                        disabled={!readyToPrint}
                      >
                        <FontAwesomeIcon
                          icon={"print"}
                          alt={"print"}
                          aria-hidden="true"
                          className="print-icon"
                        />{" "}
                        {readyToPrint ? "PRINT" : "Loading Data..."}
                      </Button>
                      {/* </div> */}
                      <Button
                        className="mt-2 m-1 p-2"
                        // size="sm"
                        style={{
                          width: "45%",
                          background: "#bfbc4b",
                          // : "#419EA3",
                          borderColor: "#bfbc4b",
                          // : "#419EA3",
                        }}
                        onClick={handleUpdateBooking}
                      >
                        DONE
                      </Button>
                    </div>
                  ) : (
                    <p className="p-2 text-center align-center">
                      No Tests found.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <ToastContainer hideProgressBar={true} />
          </Fragment>
        )}
      </div>

      <div
        style={{ display: "none" }} // This make ComponentToPrint show   only while printing
      >
        <PaymentToPrint
          ref={componentRef}
          patientId={details.customer_id}
          bookingId={bookingId}
          name={
            details.last_name +
            ", " +
            details.first_name +
            " " +
            details.middle_name
          }
          birthdate={details.birthdate}
          gender={details.gender === "Male" ? "M" : "F"}
          age={details.age}
          contact={details?.contact_no}
          email={""}
          address={""}
          bookingDate={bookingDate}
          payment={""}
          result={result}
          paymentDataServices={tests}
          services={printServices}
          isCompany={true}
          packages={[]}
          labTests={[]}
          discount={discount}
          grandTotal={grandTotal}
          queue={""}
          encodedOn={encodedOn}
          referral={""}
          discountCode={discountCode}
          hmo={hmo}
          view={"phlebo"}
          setPrintReadyFinal={setReadyToPrint}
        />
      </div>
    </div>
  )
}
