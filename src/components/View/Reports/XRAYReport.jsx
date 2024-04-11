import React, { useState, useEffect, Fragment } from "react"
import Navbar from "../../Navbar"
import Header from "../../Header"
import Table from "../../Table.js"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getRoleId, getUser, refreshPage } from "../../../utilities/Common.js"
import {
  getExtractionPatients,
  getExtractionReport,
} from "../../../Helpers/APIs/extractionAPI.js"
import { generateExtractionQueue } from "../../../Helpers/APIs/queueAPI.js"
import { useForm } from "react-hooks-helper"
const buttons = []
const patientData = ""

const userId = getUser()

function XRAYReport() {
  const navigate = useNavigate()
  const [filteredData, setFilter] = useForm({
    from_date: new Date().toLocaleDateString("en-CA"),
    to_date: new Date().toLocaleDateString("en-CA"),
    done: false,
  })
  const [render, setRender] = useState([])
  const [role, setRole] = useState("")
  const [records, setRecords] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [isReady, setIsReady] = useState(false)

  function handleExtractionClick(row) {
    const data = {
      booking_id: row.booking_id,
      serving_type: "lab",
      customer_id: row.customer_id,
    }
    generateQueue(data)
  }

  async function generateQueue(data) {
    const response = await generateExtractionQueue(data)
    if (response.data) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate(`${data.booking_id}/${response.data.data.queue_no}`)
      }, 2000)
    } else {
      toast.error(response.error.data.messages.error)
      setTimeout(() => {
        refreshPage()
      }, 2000)
    }
  }

  async function fetchRecords() {
    setRecords([])
    const response = await getExtractionReport(filteredData, "xray")
    if (response.data) {
      setRecords(response.data.data)
      setIsReady(true)
    }
  }
  useEffect(() => {
    fetchRecords()
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"))
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [render])
  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thick"
            title="XRAY REPORT"
            buttons={buttons}
            tableData={patientData}
          />
          <div className="row">
            <div className="col-12">
              <Table
                type={"lab-report"}
                onExtractionClick={handleExtractionClick}
                tableData={records.sort((a, b) =>
                  a.id > b.id ? 1 : b.id > a.id ? -1 : 0
                )}
                rowsPerPage={20}
                selectedRowExtraction={selectedRow}
                headingColumns={[
                  "BOOKING NO",
                  "NAME",
                  "AGE",
                  "BIRTHDATE",
                  "SERVICES",
                  "TIME",
                ]}
                filteredData={filteredData}
                setFilter={setFilter}
                setRender={setRender}
                render={render}
                givenClass={"register-mobile"}
                // link={viewBooking}
                link={""}
                role={role}
                userId={userId}
                useLoader={true}
                isReady={isReady}
                totalCount={records.length}
              />
            </div>
          </div>

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  )
}

export default XRAYReport
