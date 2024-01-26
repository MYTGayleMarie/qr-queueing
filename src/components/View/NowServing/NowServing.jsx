import React, { Fragment, useState, useEffect, useRef } from "react"
import { useForm } from "react-hooks-helper"
import "react-toastify/dist/ReactToastify.css"
import { useParams } from "react-router-dom"

//components
import "./NowServing.css"
import { fetchServing } from "../../../Helpers/APIs/queueAPI"
import bellRing from "../../../sounds/bell-sound.mp3"

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
  const [blinks, setBlinks] = useState({
    extraction: "",
    ecg: "",
    xray: "",
    echo: "",
  })

  const [blink, setBlink] = useState({
    extraction: false,
    ecg: false,
    xray: false,
    echo: false,
  })

  async function fetchNowServing() {
    const response = await fetchServing()

    if (response.data) {
      let data = response.data.now_serving
      setRecords(response.data.now_serving)

      setEchoList(data.filter((val) => val.serving_type === "2d-echo") || [])
      setECGList(data.filter((val) => val.serving_type === "ecg") || [])
      setXRAYList(data.filter((val) => val.serving_type === "xray") || [])
      setLabList(data.filter((val) => val.serving_type === "lab") || [])
      setBlinks({
        ...blinks,
        extraction: data.filter((val) => val.serving_type === "lab")[0]
          ?.booking_id,
        ecg: data.filter((val) => val.serving_type === "ecg")[0]?.booking_id,
        xray: data.filter((val) => val.serving_type === "xray")[0]?.booking_id,
        echo: data.filter((val) => val.serving_type === "2d-echo")[0]
          ?.booking_id,
      })
    } else {
      setRecords([])
      setEchoList([])
      setECGList([])
      setXRAYList([])
      setLabList([])
    }
  }

  useEffect(() => {
    fetchNowServing()
  }, [])
  useEffect(() => {
    setInterval(fetchNowServing, 10000)
  }, [])

  useEffect(() => {
    let audio = new Audio(bellRing)
    audio.muted = true

    if (
      labList.length > 0 &&
      blinks.extraction !== "" &&
      blinks.extraction !== labList[0]?.booking_id
    ) {
      setBlink({ ...blink, extraction: true })
      const timer = setTimeout(() => {
        setBlinks({ ...blinks, extraction: labList[0]?.booking_id })
      }, 5000)

      return () => {
        clearTimeout(timer)
        setBlink({ ...blink, extraction: false })
        audio.muted = false
        audio.play()
      }
    }

    //check if number is updated in xray
    if (
      XRAYList.length > 0 &&
      blinks.xray !== "" &&
      blinks.xray !== XRAYList[0]?.booking_id
    ) {
      setBlink({ ...blink, xray: true })
      const timer = setTimeout(() => {
        setBlinks({ ...blinks, xray: XRAYList[0]?.booking_id })
      }, 5000)

      return () => {
        clearTimeout(timer)
        setBlink({ ...blink, xray: false })
        audio.muted = false
        audio.play()
      }
    }

    //check if number is updated in ecg
    if (
      ECGList.length > 0 &&
      blinks.ecg !== "" &&
      blinks.ecg !== ECGList[0]?.booking_id
    ) {
      setBlink({ ...blink, ecg: true })
      const timer = setTimeout(() => {
        setBlinks({ ...blinks, ecg: ECGList[0]?.booking_id })
      }, 5000)

      return () => {
        clearTimeout(timer)
        setBlink({ ...blink, ecg: false })
        audio.muted = false
        audio.play()
      }
    }

    //check if number is updated in echo
    if (
      echoList.length > 0 &&
      blinks.echo !== "" &&
      blinks.echo !== echoList[0]?.booking_id
    ) {
      setBlink({ ...blink, echo: true })
      const timer = setTimeout(() => {
        setBlinks({ ...blinks, echo: echoList[0]?.booking_id })
      }, 5000)

      return () => {
        clearTimeout(timer)
        setBlink({ ...blink, echo: false })
        audio.muted = false
        audio.play()
      }
    }
  }, [labList, echoList, XRAYList, echoList])

  return (
    <div>
      <div className="">
        <Fragment>
          <div className="row justify-content-center mt-3">
            <div className="col-12 text-center align-center now-serving">
              NOW SERVING
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6 pl-5 pr-5 mt-4">
              <div className="row justify-content-center booking-border">
                <div className="col-12 text-center align-center queue-attendee">
                  EXTRACTION
                </div>
                <div className="col-12 text-center align-center p-1">
                  <div className="queue-div">
                    <span
                      className={
                        blink.extraction ? "blink booking-no" : "booking-no"
                      }
                    >
                      {labList[0]?.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 pl-5 pr-5 mt-4">
              <div className="row justify-content-center booking-border">
                <div className="col-12 text-center align-center queue-attendee">
                  XRAY
                </div>
                <div className="col-12 text-center align-center p-1">
                  <div className="queue-div">
                    <span
                      className={blink.xray ? "blink booking-no" : "booking-no"}
                    >
                      {XRAYList[0]?.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 pl-5 pr-5 mt-4">
              <div className="row justify-content-center booking-border">
                <div className="col-12 text-center align-center queue-attendee">
                  ECG
                </div>
                <div className="col-12 text-center align-center p-1">
                  <div className="queue-div">
                    <span
                      className={blink.ecg ? "blink booking-no" : "booking-no"}
                    >
                      {ECGList[0]?.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 pl-5 pr-5 mt-4">
              <div className="row justify-content-center booking-border">
                <div className="col-12 text-center align-center queue-attendee ultrasound">
                  2D ECHO/ULTRASOUND
                </div>
                <div className="col-12 text-center align-center p-1">
                  <div className="queue-div">
                    <span
                      className={blink.echo ? "blink booking-no" : "booking-no"}
                    >
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
