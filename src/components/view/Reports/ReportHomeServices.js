import React, { Fragment, useState, useRef } from "react"
import axios from "axios"
import { formatDate, getToken, getUser } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"
import Searchbar from "../../Searchbar"
import Table from "../../Table.js"

const buttons = ["export-excel", "export-pdf"]
const userToken = getToken()
const userId = getUser()
var presentDate = new Date()
var formattedPresentData = presentDate.toISOString().split("T")[0]

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  service_location: "",
  done: false,
}

function ReportHomeServices() {
  document.body.style = "background: white;"
  const [filteredData, setFilter] = useForm(filterData)
  const [render, setRender] = useState([])
  const [homeServices, setHomeServices] = useState([])
  const [printReadyFinal, setPrintReadyFinal] = useState(false)
  const [isReady, setIsReady] = useState(false)
  //ALL HOME SERVICES
  React.useEffect(() => {
    homeServices.length = 0
    axios({
      method: "post",
      url: window.$link + "bookings/getAllByType/home service",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        service_location: filteredData.service_location,
      },
    })
      .then(function (booking) {
        var array = booking.data.bookings
        array.map((data, index1) => {
          var info = {}
          info.booking_number = data.booking_id
          info.booking_date = formatDate(data.booking_date)
          info.address = data.address
          info.tests = data.lab_tests?.replaceAll("|", ",")
          info.home_service_fee = data.home_service_fee
          info.total_amount = data.grand_total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          setHomeServices((oldArray) => [...oldArray, info])

          setIsReady(true)
        })
      })
      .then(function (error) {
        console.log(error)
      })
  }, [render])

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          {/* <PdfTransaction/> */}

          <Searchbar title="HOME SERVICE" />
          <Header
            type="thick"
            title="QR DIAGNOSTICS REPORT"
            buttons={homeServices.length != 0 ? buttons : ""}
            tableName={"Home Service Report"}
            tableData={homeServices}
            tableHeaders={[
              "BOOKING NUMBER",
              "BOOKING DATE",
              "ADDRESS",
              "TESTS",
              "TOTAL AMOUNT",
            ]}
            status={printReadyFinal}
          />
          <Table
            clickable={false}
            type={"home-service-booking"}
            tableData={homeServices.sort((a, b) =>
              a.booking_number > b.booking_number
                ? 1
                : b.booking_number > a.booking_number
                ? -1
                : 0
            )}
            rowsPerPage={100}
            headingColumns={[
              "BOOKING NUMBER",
              "BOOKING DATE",
              "ADDRESS",
              "TESTS",
              "HOME SERVICE FEE",
              "TOTAL AMOUNT",
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            useLoader={true}
            isReady={isReady}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  )
}

export default ReportHomeServices
