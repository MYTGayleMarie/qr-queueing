import React, { useState, useEffect, Fragment } from "react"
import Navbar from "../../Navbar"
import Header from "../../Header"
import Table from "../../Table.js"
import { ToastContainer, toast } from "react-toastify"
import {
  getRoleId,
  getToken,
  getUser,
  refreshPage,
} from "../../../utilities/Common"
import {
  getExtractionPatients,
  getXRAYExtractionPatients,
  updateExtractionPatient,
  updateExtractionPatientBulk,
  updateExtractionXRAYPatientBulk,
} from "../../../Helpers/APIs/extractionAPI"
import { Button, ListGroup } from "react-bootstrap"
const buttons = []
const patientData = ""
const userToken = getToken()
const userId = getUser()
var id = ""

function XrayManager() {
  const [filteredData, setFilter] = useState({
    from_date: "",
    to_date: "",
    done: false,
  })
  const [render, setRender] = useState([])
  const [renderDetails, setRenderDetails] = useState([])
  const [role, setRole] = useState("")
  const [records, setRecords] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [recordsDetails, setRecordsDetails] = useState([])
  const [labIds, setLabIds] = useState([])
  const [isReady, setIsReady] = useState(false)

  function handleExtractionClick(row) {
    var lab_tests = row.lab_test.split("|")
    // var lab_tests_id = row.booking_detail_id.split("|");

    setSelectedRow({ ...row, lab_tests: lab_tests })
    setRecordsDetails(lab_tests)
    // setLabIds(lab_tests_id);
  }

  async function handleUpdateBooking() {
    const response = await updateExtractionXRAYPatientBulk(selectedRow)
    if (response.data) {
      toast.success(response.data.message.success.toUpperCase())
      // refreshPage()
    }
  }
  async function fetchRecords() {
    const response = await getXRAYExtractionPatients()
    if (response.data) {
      setRecords(response.data.bookings)
      setIsReady(true)
    }
  }
  useEffect(() => {
    fetchRecords()
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"))
  }, [])
  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thick"
            title="XRAY MANAGER"
            buttons={buttons}
            tableData={patientData}
          />
          <div className="row">
            <div className="col-8">
              <Table
                type={"xray"}
                onExtractionClick={handleExtractionClick}
                tableData={records.sort((a, b) =>
                  a.id > b.id ? 1 : b.id > a.id ? -1 : 0
                )}
                rowsPerPage={20}
                selectedRowExtraction={selectedRow}
                headingColumns={["BOOKING ID", "NAME", "EXTRACTION DATE"]}
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
              />
            </div>
            <div className="col-4">
              <div className="extraction-details">
                <div className="extraction-header">TEST</div>
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
                      Extracted
                    </Button>
                  </div>
                ) : (
                  <p className="p-2 text-center align-center">
                    No Tests found.
                  </p>
                )}
              </div>
              {/* <Table
                type={"extraction-details"}
                tableData={recordsDetails.length > 0 ? recordsDetails : []}
                rowsPerPage={20}
                headingColumns={["TEST"]}
                filteredData={filteredData}
                setFilter={setFilter}
                setRender={setRenderDetails}
                render={renderDetails}
                givenClass={"register-mobile"}
                // link={viewBooking}
                link={""}
                role={role}
                userId={userId}
                useLoader={true}
                isReady={isReady}
              /> */}
            </div>
          </div>

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  )
}

export default XrayManager
