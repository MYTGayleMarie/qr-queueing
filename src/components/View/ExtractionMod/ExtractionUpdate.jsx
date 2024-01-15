import { Fragment, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getLabExtractionPatients,
  getSingleExtractionPatient,
  getSingleLabExtractionPatient,
  skipPatient,
  updateExtractionLabPatientBulk,
  updateExtractionPatient,
  updateExtractionPatientBulk,
} from "../../../Helpers/APIs/extractionAPI"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "../../Navbar"
import Header from "../../Header"
import { Button, ListGroup } from "react-bootstrap"
import { formatDate, refreshPage } from "../../../utilities/Common"
import { RingLoader } from "react-spinners"
import { changeStatus } from "../../../Helpers/APIs/queueAPI"

export default function ExtractionUpdate() {
  const { bookingId, queueId } = useParams()
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const [recordsDetails, setRecordsDetails] = useState([])
  const navigate = useNavigate()

  async function fetchExtraction() {
    const response = await getSingleLabExtractionPatient(bookingId, 8)
    console.log("response", response.data.bookings)
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
  useEffect(() => {
    fetchExtraction()
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
                    <div className="col-9">
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
                          background: "var(--blue-brand)",
                          borderColor: "var(--blue-brand)",
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
              <div className="col-8">
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
                      <Button
                        className="mt-2"
                        // size="sm"
                        style={{
                          width: "100%",
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
    </div>
  )
}
