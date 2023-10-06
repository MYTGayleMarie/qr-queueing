import React, { Fragment, useState, useRef } from "react"
import axios from "axios"
import { getToken, getUser } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useTable from "../../../utilities/Pagination"
import TableFooter from "../../TableFooter"
import { getTime } from "../../../utilities/Common"
import { RingLoader } from "react-spinners"
import PageLoader from "../Loader/PageLoader"

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
  done: false,
}

function ReportsReleasingItem() {
  document.body.style = "background: white;"
  const [filteredData, setFilter] = useForm(filterData)
  const [render, setRender] = useState([])
  const [patientData, setPatientData] = useState([])
  const [printReadyFinal, setPrintReadyFinal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    patientData.length = 0
    axios({
      method: "post",
      url: window.$link + "reports/releasing",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        console.log("response", response.data.data)
        setIsReady(false)
        response.data.data.releasing_items.map((booking, index) => {
            console.log("release item indiv", booking)
          var releaseDate = new Date(booking.release_date)
          var formattedreleaseDate = releaseDate.toDateString().split(" ")

          var bookingDetails = {}
          bookingDetails.item = booking.item
          bookingDetails.quantity = parseInt(booking.qty)
          bookingDetails.released_on =
            formattedreleaseDate[1] +
            " " +
            formattedreleaseDate[2] +
            " " +
            formattedreleaseDate[3]
          bookingDetails.encoded = booking.released_by?.toUpperCase()
          setPatientData((oldArray) => [...oldArray, bookingDetails])
          setIsReady(true)
        })
        setPrintReadyFinal(true)
        setIsReady(true)
      })
      .catch(function (error) {
        console.log(error)
        setIsReady(false)
      })
  }, [render])

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="RELEASING" />
          <Header
            type="thick"
            title="RELEASING ITEMS REPORT"
            buttons={buttons}
            tableName={"releasing-items"}
            tableData={patientData}
            tableHeaders={[
              "ITEM NAME",
              "RELEASED QUANTITY",
              "RELEASED ON",
              "RELEASED BY",
            ]}
            status={printReadyFinal}
          />
          <div className="spinner d-flex justify-content-center"></div>
          <Table
            clickable={false}
            type={"releasing-items"}
            tableData={patientData}
            rowsPerPage={10}
            headingColumns={[
              "ITEM NAME",
              "RELEASED QUANTITY",
              "RELEASED ON",
              "RELEASED BY",
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            useLoader={true}
            isReady={isReady}
            // useLoader={true}
          />

          <ToastContainer hideProgressBar={true} />
          {/* </>} */}
        </Fragment>
      </div>
    </div>
  )
}

export default ReportsReleasingItem
