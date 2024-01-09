import React, { Fragment, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
import { getToken, getUser, removeUserSession } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Modal } from "react-bootstrap"

//css
import "./Companies.css"

//components
import Navbar from "../../Navbar"
import Header from "../../Header.js"
import Table from "../../Table.js"
import { ro } from "date-fns/locale"

const buttons = ["export-excel"]
const userToken = getToken()
const userId = getUser()
var id
var company_id
var discount_id
var presentDate = new Date()
var formattedPresentData = presentDate.toISOString().split("T")[0]

var companyData = []
var patientData = []

export default function HMOInvoices() {
  const { dateFrom, dateTo, status_filter } = useParams()
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : "2022-01-06",
    to_date: dateTo ? dateTo : formattedPresentData,
    status_filter: status_filter ? status_filter : "unpaid",
    done: false,
  })
  const [render, setRender] = useState([])
  const [finalCompanyData, setFinalCompanyData] = useState([])
  const [redirect, setRedirect] = useState("")
  const [toAddPayment, setToAddPayment] = useState(false)
  const [status, setStatus] = useState("unpaid")
  const [printReadyFinal, setPrintReadyFinal] = useState(false)
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    finalCompanyData.length = 0
    axios({
      method: "post",
      url: window.$link + "Company_invoices/getAllHmo",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
        status: filteredData.status_filter,
      },
    })
      .then(function (response) {
        console.log(response.data)
        response.data.hmo_invoices.map((row, index) => {
          var companyDetails = {}

          if (filteredData.status_filter == "unpaid" && row.is_paid === "0") {
            companyDetails.company_id = row.company_id
            companyDetails.id = row.id
            companyDetails.invoice_id = row.invoice_id.split("|")[0]
            companyDetails.date = new Date(row.added_on).toDateString()
            companyDetails.description = row.company_name
            companyDetails.discount_id = row.discount_id
            companyDetails.discountCode = row.discount_code
            companyDetails.remarks = row.remarks
            // companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            companyDetails.total = row.sum_total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            companyDetails.payment_status = row.is_paid == 1 ? "PAID" : "UNPAID"

            setFinalCompanyData((oldArray) => [...oldArray, companyDetails])
          } else if (
            filteredData.status_filter == "paid" &&
            row.is_paid === "1"
          ) {
            companyDetails.company_id = row.company_id
            companyDetails.id = row.id
            companyDetails.invoice_id = row?.invoice_id?.split("|")[0]
            companyDetails.date = new Date(row.added_on).toDateString()
            companyDetails.description = row.company_name
            companyDetails.discount_id = row.discount_id
            companyDetails.discountCode = row.discount_code
            companyDetails.remarks = row.remarks
            // companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            companyDetails.total = row.sum_total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            companyDetails.payment_status = "PAID"

            setFinalCompanyData((oldArray) => [...oldArray, companyDetails])
          } else if (filteredData.status_filter == "all") {
            companyDetails.company_id = row.company_id
            companyDetails.id = row.id
            companyDetails.invoice_id = row?.invoice_id?.split("|")[0]
            companyDetails.date = new Date(row.added_on).toDateString()
            // formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
            companyDetails.description = row.company_name
            companyDetails.discountCode = row.discount_code
            companyDetails.discount_id = row.discount_id
            companyDetails.remarks = row.remarks
            // companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            companyDetails.total = row.sum_total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            companyDetails.payment_status =
              row.is_paid === 1 ? "PAID" : "UNPAID"

            setFinalCompanyData((oldArray) => [...oldArray, companyDetails])
          }

          if (finalCompanyData) {
            setPrintReadyFinal(true)
          }
          setIsReady(true)
        })
      })
      .catch(function (error) {
        console.log(error)
        // setFinalCompanyData([])
        setIsReady(false)
      })
  }, [render])

  function addPayment(invoiceId, companyId, discountCode, discountId) {
    id = invoiceId
    company_id = companyId
    discount_id = discountId
    setToAddPayment(true)
  }

  if (toAddPayment == true) {
    return (
      <Navigate
        to={
          "/hmo/add-invoice-payment/" +
          id +
          "/" +
          company_id +
          "/" +
          filteredData.from_date +
          "/" +
          filteredData.to_date
        }
      />
    )
  }

  function filter() {}

  return (
    <div>
      <div>
        <Navbar />
        <div className="active-cont">
          <Fragment>
            <Header
              type="thick"
              title="HMO INVOICE MANAGER"
              tableData={finalCompanyData.sort((a, b) =>
                new Date(a.date) > new Date(b.date)
                  ? 1
                  : new Date(b.date) > new Date(a.date)
                  ? -1
                  : 0
              )}
              buttons={buttons}
              status={printReadyFinal}
            />
            <Table
              clickable={true}
              type={"company-invoices"}
              tableData={finalCompanyData?.sort((a, b) =>
                new Date(a.date) > new Date(b.date)
                  ? 1
                  : new Date(b.date) > new Date(a.date)
                  ? -1
                  : 0
              )}
              rowsPerPage={4}
              headingColumns={[
                // "COMPANY ID",
                // "ID",
                "INVOICE DATE",
                "COMPANY NAME",
                // "DISCOUNT ID",
                "DISCOUNT CODE",
                // "REMARKS",
                "TOTAL",
                "PAYMENT STATUS",
                "ACTION",
              ]}
              filteredData={filteredData}
              setFilter={setFilter}
              filter={filter}
              render={render}
              setRender={setRender}
              givenClass={"company-mobile"}
              link={addPayment}
              setStatus={setStatus}
              useLoader={true}
              isReady={isReady}
            />

            <ToastContainer hideProgressBar={true} />
          </Fragment>
        </div>
      </div>
    </div>
  )
}
