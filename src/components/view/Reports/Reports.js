import React, { Fragment, useState } from "react"
import axios from "axios"
import { getToken, getUser, getRoleId } from "../../../utilities/Common"
import * as XLSX from "xlsx"

//css
import "./Reports.css"

//components
import Searchbar from "../../Searchbar.js"
import Header from "../../Header.js"
import Navbar from "../../Navbar"
import Table from "../../Table"
import Card from "../../Card"
import { Button, Col, Row } from "react-bootstrap"
import ButtonReport from "../../CustomComponents/ButtonComponent"
import OutlineButtonReport from "../../CustomComponents/OutlinedButtonReport"
import FilledButtonReport from "../../CustomComponents/FilledButtonReport"
import SmallOutlineButtonReport from "../../CustomComponents/SmallOutlinedButtonReport"
import { RingLoader } from "react-spinners"
//variables
var amount = 100
const userToken = getToken()
const userId = getUser()
var presentDate = new Date()
var formattedPresentData = presentDate.toISOString().split("T")[0]

const filteredData = {
  from_date: "2022-01-06",
  to_date: formattedPresentData,
  done: false,
  status: "all",
}

function Reports() {
  document.body.style = "background: white;"

  //STATES
  const [bookings, setBookings] = useState([])
  const [todayBookings, setTodayBookings] = useState([])

  const [servicesPackages, setServicesPackages] = useState([])
  const [services, setServices] = useState([])
  const [packages, setPackages] = useState([])
  const [poCount, setPoCount] = useState("")

  const [homeServices, setHomeServices] = useState([])
  const [todayHomeServices, setTodayHomeServices] = useState([])

  const [clinicServices, setClinicServices] = useState([])
  const [resultsData, setResultsData] = useState([])

  const [counts_results_releasing, setResultsCount] = useState(0)

  const [totalSales, setTotalSales] = useState(0)
  const [pendingPOs, setPendingPOs] = useState([])
  const [unpaidInvoices, setUnpaidInvoices] = useState([])
  const [credit, setCredit] = useState(0)
  const [incompletePo, setIncompletePo] = useState([])

  const [discounts, setDiscounts] = useState([])

  /* Loaders */
  const [loadingTxnAll, setLoadingTxnAll] = useState(true)
  const [loadingTxnToday, setLoadingTxnToday] = useState(true)
  const [loadingSales, setLoadingSales] = useState(true)
  const [loadingServicesAll, setLoadingServicesAll] = useState(true)
  const [loadingServicesToday, setLoadingServicesToday] = useState(true)
  const [loadingHomeServicesAll, setLoadingHomeServicesAll] = useState(true)
  const [loadingHomeServicesToday, setLoadingHomeServicesToday] = useState(true)
  const [loadingCredit, setLoadingCredit] = useState(true)
  const [loadingReceivables, setLoadingReceivables] = useState(true)
  const [loadingPayables, setLoadingPayables] = useState(true)
  const [loadingResults, setLoadingResults] = useState(true)
  const [loadingPOIncomplete, setLoadingPOIncomplete] = useState(true)
  const [loadingPOPending, setLoadingPOPending] = useState(true)

  //Role
  const [role, setRole] = useState("")
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"))
  }, [])

  //Transaction Report Overall
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/getAll",
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
        setBookings(response.data.bookings)
        setLoadingTxnAll(true)
      })
      .then(function (error) {
        console.log(error)
        setLoadingTxnAll(true)
      })
  }, [])

  //Transaction Report Today
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.to_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        setTodayBookings(response.data.bookings)
        setLoadingTxnToday(true)
      })
      .then(function (error) {
        console.log(error)
        setLoadingTxnToday(true)
      })
  }, [])

  //ALL PACKAGES AND SERVICES
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookingdetails/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.to_date,
        date_to: filteredData.to_date,
        type: filteredData.status,
      },
    })
      .then(function (response) {
        setServicesPackages(response.data.booking_details)
        response.data.booking_details.map((data) => {
          if (data.type === "lab") {
            setServices((oldArray) => [...oldArray, data])
          } else {
            setPackages((oldArray) => [...oldArray, data])
          }
        })
        setLoadingServicesAll(false)
        setLoadingServicesToday(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingServicesAll(false)
        setLoadingServicesToday(false)
      })
  }, [])

  //ALL HOME SERVICES
  React.useEffect(() => {
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
      },
    })
      .then(function (response) {
        setHomeServices(response.data.bookings)
        setLoadingHomeServicesAll(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingHomeServicesAll(false)
      })
  }, [])

  //TODAY HOME SERVICES
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/getAllByType/home service",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.to_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        setTodayHomeServices(response.data.bookings)
        setLoadingHomeServicesToday(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingHomeServicesToday(false)
      })
  }, [])

  //ALL CLINICAL SERVICES
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "bookings/getAllByType/clinic",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setClinicServices(response.data.bookings)
      })
      .then(function (error) {
        console.log(error)
      })
  }, [])

  //ALL PENDING POS
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "pos/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        requester: userId,
      },
    })
      .then(function (response) {
        var pending = response.data.pos.filter(
          (info) => info.status == "pending"
        )
        setPendingPOs(pending)
        setLoadingPOPending(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingPOPending(false)
      })
  }, [])

  // Results Releasing
  React.useEffect(() => {
    axios({
      method: "get",
      url: window.$link + "bookings/medtech",
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
        setResultsCount(response.data.complete_releasing_count)
        setLoadingResults(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingResults(false)
      })
  }, [])

  //SALES REPORT
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "reports/salesSummary",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        date_from: formattedPresentData,
        date_to: filteredData.to_date,
        requester: userId,
      },
    })
      .then(function (response) {
        var total = 0
        response.data.data.sales.map((data, index) => {
          if (data[0].type != "credit") {
            total +=
              data[0].grand_total == null ? 0 : parseFloat(data[0].grand_total)
          }
        })
        setTotalSales(total)
        setLoadingSales(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingSales(false)
      })
  }, [])

  //ALL UNPAID INVOICES
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "Company_invoices/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        requester: userId,
      },
    })
      .then(function (response) {
        var pending = response.data.company_invoices.filter(
          (info) => info.is_paid == "0"
        )
        setUnpaidInvoices(pending)
        setLoadingReceivables(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingReceivables(false)
      })
  }, [])

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "pos/getPoCountWithReceiveItems",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setPoCount(response.data.data.po_count)
        setLoadingPayables(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingPayables(false)
      })
  }, [])
  //ALL CREDITS
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "reports/credit",
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
        var count = 0
        response.data.data.data.map((data) => {
          setCredit((count += parseFloat(data.total_count)))
        })
        setLoadingCredit(false)
      })
      .then(function (error) {
        console.log(error)
        setLoadingCredit(false)
      })
  }, [])

  // ALL INCOMPLETE POS
  React.useEffect(() => {
    incompletePo.length = 0
    // Getting all incomplete POs
    axios({
      method: "post",
      url: window.$link + "reports/incompletePOs",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: new Date("01-01-2022"),
        date_to: new Date(),
        // date_from: filteredData.from_date,
        // date_to: filteredData.to_date,
      },
    })
      .then((pos) => {
        // const incomplete = pos.data.pos;
        setIncompletePo(pos.data.pos)
        setLoadingPOIncomplete(false)
      })
      .catch((error) => {
        console.log(error)
        setLoadingPOIncomplete(false)
      })
  }, [])

  function generateInventory() {
    axios({
      method: "post",
      url: window.$link + "reports/inventory",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        year: new Date().getFullYear(),
      },
    })
      .then((res) => {
        var monthly_inventory = res.data.data.inventory_per_month

        var monthly_inventory_price = res.data.data.inventory_price_per_month

        monthly_inventory.map((data) => {
          data.price = parseFloat(data.price).toFixed(2)
          data.Jan = parseInt(data.Jan)
          data.Feb = parseInt(data.Feb)
          data.Mar = parseInt(data.Mar)
          data.Apr = parseInt(data.Apr)
          data.May = parseInt(data.May)
          data.Jun = parseInt(data.Jun)
          data.Jul = parseInt(data.Jul)
          data.Aug = parseInt(data.Aug)
          data.Sept = parseInt(data.Sept)
          data.Oct = parseInt(data.Oct)
          data.Nov = parseInt(data.Nov)
          data.Dec = parseInt(data.Dec)
        })
        monthly_inventory_price.map((data) => {
          data.price = parseFloat(data.price).toFixed(2)
          data.Jan = parseFloat(data.Jan).toFixed(2)
          data.Feb = parseFloat(data.Feb).toFixed(2)
          data.Mar = parseFloat(data.Mar).toFixed(2)
          data.Apr = parseFloat(data.Apr).toFixed(2)
          data.May = parseFloat(data.May).toFixed(2)
          data.Jun = parseFloat(data.Jun).toFixed(2)
          data.Jul = parseFloat(data.Jul).toFixed(2)
          data.Aug = parseFloat(data.Aug).toFixed(2)
          data.Sept = parseFloat(data.Sept).toFixed(2)
          data.Oct = parseFloat(data.Oct).toFixed(2)
          data.Nov = parseFloat(data.Nov).toFixed(2)
          data.Dec = parseFloat(data.Dec).toFixed(2)
        })
        const XLSX = require("sheetjs-style")
        const worksheet = XLSX.utils.json_to_sheet([{}, ...monthly_inventory])
        const worksheet2 = XLSX.utils.json_to_sheet([
          {},
          ...monthly_inventory_price,
        ])

        XLSX.utils.sheet_add_aoa(
          worksheet,
          [
            [
              "QR DIAGNOSTICS",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
          ],
          { origin: "A1" }
        )
        XLSX.utils.sheet_add_aoa(
          worksheet,
          [
            [
              "Name",
              "Unit",
              "Price",
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
          ],
          { origin: "A2" }
        )

        XLSX.utils.sheet_add_aoa(
          worksheet2,
          [
            [
              "QR DIAGNOSTICS",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
          ],
          { origin: "A1" }
        )
        XLSX.utils.sheet_add_aoa(
          worksheet2,
          [
            [
              "Name",
              "Unit",
              "Price",
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
          ],
          { origin: "A2" }
        )

        const cells = [
          "A1",
          "A2",
          "B2",
          "C2",
          "D2",
          "E2",
          "F2",
          "G2",
          "H2",
          "I2",
          "J2",
          "K2",
          "L2",
          "M2",
          "N2",
          "O2",
        ]

        const workbook = XLSX.utils.book_new()
        for (var i = 0; i < cells.length; i++) {
          if (cells[i] === "A1") {
            worksheet[cells[i]].s = {
              font: {
                sz: 24,
                shadow: true,
                bold: true,
                color: {
                  rgb: "BFBC4B",
                },
              },
            }
            worksheet2[cells[i]].s = {
              font: {
                sz: 24,
                shadow: true,
                bold: true,
                color: {
                  rgb: "BFBC4B",
                },
              },
            }
          } else {
            worksheet[cells[i]].s = {
              font: {
                bold: true,
                color: {
                  rgb: "419EA3",
                },
              },
            }
            worksheet2[cells[i]].s = {
              font: {
                bold: true,
                color: {
                  rgb: "419EA3",
                },
              },
            }
          }
        }

        var wscols = [
          { width: 50 }, // first column
        ]
        worksheet["!cols"] = wscols
        worksheet2["!cols"] = wscols
        XLSX.utils.book_append_sheet(workbook, worksheet, "Item Inventory")
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet2,
          "Item Cost Inventory"
        )
        XLSX.writeFile(
          workbook,
          "QRDiagnosticsMonthlyItemInventoryReport-" +
            new Date().toLocaleDateString() +
            ".xlsx"
        )

        //
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div>
        <div>
          <Navbar />
          {loadingTxnAll &&
          loadingTxnToday &&
          loadingSales &&
          loadingServicesAll &&
          loadingServicesToday &&
          loadingHomeServicesAll &&
          loadingHomeServicesToday &&
          loadingCredit &&
          loadingReceivables &&
          loadingPayables &&
          loadingResults &&
          loadingPOIncomplete &&
          loadingPOPending ? (
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
            <div className="active-cont">
              <Fragment>
                {/* <Searchbar title='QR DIAGNOSTICS REPORTS'/> */}
                <Header type="thick" title="QR DIAGNOSTICS REPORTS" />
                <Row style={{ height: "auto", overflow: "hidden" }}>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <FilledButtonReport
                      link={["/reports-transaction", "/reports-sales"]}
                      totalData={[
                        todayBookings.length,
                        bookings.length,
                        parseFloat(totalSales)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      ]}
                      title={["Transactions", "Total Sales"]}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <FilledButtonReport
                      link={[
                        "/reports-services-packages",
                        "/reports-home-services",
                      ]}
                      totalData={[
                        packages.length,
                        services.length,
                        todayHomeServices.length,
                        homeServices.length,
                      ]}
                      title={["Services Today", "Home Services"]}
                    />
                    {/* {alert("total sales", totalSales)} */}
                  </Col>
                  <Col
                    style={{ justifyContent: "center" }}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                  >
                    <ButtonReport
                      title={"ANNUAL REPORT"}
                      link={"/reports-annual"}
                      className="mt-2"
                    />
                    <ButtonReport
                      title={"EXPENSE REPORT"}
                      link={"/reports-expense"}
                    />
                    <ButtonReport
                      title={"INVENTORY REPORT"}
                      link={"/reports-inventory"}
                    />
                    <ButtonReport
                      title={"RELEASING ITEMS REPORT"}
                      link={"/reports-releasing-item"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={credit}
                      title={"Credit Report"}
                      link={"/reports-credit"}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={unpaidInvoices.length}
                      title={"Receivables"}
                      link={"/unpaid-invoices"}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={poCount}
                      title={"Payables"}
                      link={"/receives"}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={pendingPOs.length}
                      title={"POs Pending for Approval"}
                      link={"/reports-pending-po"}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={incompletePo.length}
                      title={"Incomplete PO"}
                      link={"/reports-incomplete-po"}
                    />
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12}>
                    <OutlineButtonReport
                      todayData={counts_results_releasing}
                      title={"Results Releasing"}
                      link={"/reports-results-releasing"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"INVENTORY REQUEST"}
                      link={"/reports-inventory"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"ITEM HISTORY"}
                      link={"/reports-item-history"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"REFERRALS"}
                      link={"/reports-referrals"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"MD REPORTS"}
                      link={"/reports-md"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"LAB REPORT"}
                      link={"/reports/lab"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"XRAY REPORT"}
                      link={"/reports/xray"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"ECG REPORT"}
                      link={"/reports/ecg"}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <SmallOutlineButtonReport
                      title={"2D ECHO REPORT"}
                      link={"/reports/2d-echo"}
                    />
                  </Col>
                </Row>
              </Fragment>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports
