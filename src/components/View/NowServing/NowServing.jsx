import React, { Fragment, useState } from "react"
import axios from "axios"
import { getToken, getUser, getRoleId } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useTable from "../../../utilities/Pagination"
import TableFooter from "../../TableFooter"
import { Navigate, useParams } from "react-router-dom"

//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"
import Table from "../../Table.js"
import { getAgingReports } from "../../../Helpers/APIs/agingAPI"
import "./NowServing.css"
import { fetchServing } from "../../../Helpers/APIs/queueAPI"
const buttons = []
const userToken = getToken()
const userId = getUser()
var id = ""
var presentDate = new Date()
var formattedPresentData = presentDate.toISOString().split("T")[0]

export default function NowServing() {
  const [ECGList, setECGList] = useState([])
  const [XRAYList, setXRAYList] = useState([])
  const [echoList, setEchoList] = useState([])
  const [labList, setLabList] = useState([])
  document.body.style = "background: white;"
  const [records, setRecords] = useState([])
  const { dateFrom, dateTo } = useParams()
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo ? dateTo : formattedPresentData,
    done: false,
  })
  const [render, setRender] = useState([])
  const [patientData, setPatientData] = useState([])
  const [redirectBooking, setRedirectBooking] = useState(false)
  const [role, setRole] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [isReady, setIsReady] = useState(false)

  function getTime(date) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  async function fetchNowServing() {
    // setIsReady(false);
    setEchoList([])
    setECGList([])
    setXRAYList([])
    setLabList([])
    const response = await fetchServing()
    console.log(response.data)
    if (response.data) {
      let data = response.data.now_serving
      setRecords(response.data.now_serving)
      setEchoList(data.filter((val) => val.serving_type === "2d-echo"))
      setECGList(data.filter((val) => val.serving_type === "ecg"))
      setXRAYList(data.filter((val) => val.serving_type === "xray"))
      setLabList(data.filter((val) => val.serving_type === "lab"))
    } else {
      setRecords([])
    }

    // setIsReady(true);
  }
  // React.useEffect(() => {
  //   setRole(getRoleId().replace(/^"(.*)"$/, "$1"))
  // }, [])

  React.useEffect(() => {
    fetchNowServing()
  }, [])

  React.useEffect(() => {
    setInterval(fetchNowServing, 10000)
  }, [])

  function searchBookingId() {
    id = bookingId
    setRedirectBooking(true)
  }

  function filter() {}

  function viewBooking(bookingId) {
    id = bookingId
    setRedirectBooking(true)
  }

  if (redirectBooking == true) {
    var link =
      "/results-view-booking/" +
      id +
      "/" +
      filteredData.from_date +
      "/" +
      filteredData.to_date
    return <Navigate to={link} />
  }

  return (
    <div>
      <div className="">
        <Fragment>
          <div className="row justify-content-center mt-3">
            <div className="col-12 text-center align-center now-serving">
              NOW SERVING
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-6">
              <div className="row justify-content-center">
                <div className="col-12 text-center align-center queue-attendee">
                  LAB
                </div>
                <div className="col-12 text-center align-center mt-2 p-5">
                  <div className="queue-div">
                    <span className="booking-no">{labList[0]?.booking_id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row justify-content-center">
                <div className="col-12 text-center align-center queue-attendee">
                  XRAY
                </div>
                <div className="col-12 text-center align-center mt-2 p-5">
                  <div className="queue-div">
                    <span className="booking-no">
                      {XRAYList[0]?.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row justify-content-center">
                <div className="col-12 text-center align-center queue-attendee">
                  ECG
                </div>
                <div className="col-12 text-center align-center mt-2 p-5">
                  <div className="queue-div">
                    {/* <span className="queue-no">{ECGList[0]?.id}</span> */}
                    {/* <br /> */}
                    <span className="booking-no">{ECGList[0]?.booking_id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row justify-content-center">
                <div className="col-12 text-center align-center queue-attendee">
                  2D ECHO/ULTRASOUND
                </div>
                <div className="col-12 text-center align-center mt-2 p-5">
                  <div className="queue-div">
                    <span className="booking-no">
                      {echoList[0]?.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  )
}
