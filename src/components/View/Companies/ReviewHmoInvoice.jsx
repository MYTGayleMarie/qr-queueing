import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  formatPrice,
  getToken,
  getUser,
  refreshPage,
} from "../../../utilities/Common"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { Button, Col, Row } from "react-bootstrap"
import "react-toastify/dist/ReactToastify.css"
import { Navigate } from "react-router-dom"
import { useForm, useStep } from "react-hooks-helper"
import { useReactToPrint } from "react-to-print"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"
import Table from "../../Table.js"
import { RingLoader } from "react-spinners"
import { InvoiceToPrintHmo } from "./InvoiceToPrintHmo.jsx"

//variables
const userToken = getToken()
const userId = getUser()
const checkedData = {}

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
function ReviewInvoiceHmo() {
  document.body.style = "background: white;"

  //Invoice details
  const { id, companyId, discountID, dateFrom, dateTo } = useParams()

  const [redirect, setRedirect] = useState(false)
  const [redirectBack, setRedirectBack] = useState(false)
  const [info, setInfo] = useState([])
  const [infoId, setInfoId] = useState("")
  const [checked, setChecked] = useForm(checkedData)
  const [haslogs, setHasLogs] = useState(false)
  const [paidAmount, setPaidAmount] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [payments, setPayments] = useState("")
  const [discountId, setDiscountId] = useState("")
  const [discountDescription, setDiscountDescription] = useState("")
  const [user, setUser] = useState("")
  const [invoiceData, setInvoiceData] = useState([])
  const [invoiceStatus, setInvoiceStatus] = useState(false)

  //Payment details
  const [payment, setPayment] = useState("")

  const [grandTotal, setGrandTotal] = useState(0)
  const [pay, setPay] = useState(0)
  const [tax, setTax] = useState(0)
  const [cardTax, setCardTax] = useState(0)
  const [checkTax, setCheckTax] = useState(0)
  const [othersTax, setOthersTax] = useState(0)

  const [remarks, setRemarks] = useState("")
  const [companyRemarks, setCompanyRemarks] = useState("")
  const [discount, setDiscount] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [seniorPwdId, setID] = useState("")
  const [hasPay, setHasPay] = useState(false)

  //Company details
  const [name, setName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [contactPerson, setContactPerson] = useState("")

  //Redirection

  const [toAddInvoice, setToAddInvoice] = useState(false)

  //Add Invoice Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //Check states
  const [checkNo, setCheckNo] = useState("")
  const [checkBank, setCheckBank] = useState("")
  const [checkDate, setCheckDate] = useState("")

  //Card states
  const [cardNo, setCardNo] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardType, setCardType] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardBank, setCardBank] = useState("")

  //Others states
  const [source, setSource] = useState("")
  const [reference, setReference] = useState("")

  //Print state
  const [printData, setPrintData] = useState(false)

  //Print Invoice
  const [isprinted, setIsPrinted] = useState(false)
  const handlePrintClose = () => setIsPrinted(false)
  const handlePrintShow = () => setIsPrinted(true)

  const [isprint, setIsPrint] = useState(false)
  const handlePrintedClose = () => setIsPrint(false)
  const handlePrintedShow = () => setIsPrint(true)

  const [isprintCheck, setIsPrintCheck] = useState(false)
  const handlePrintedCheckClose = () => setIsPrintCheck(false)
  const handlePrintedCheckShow = () => setIsPrintCheck(true)

  const [isprintCard, setIsPrintCard] = useState(false)
  const handlePrintedCardClose = () => setIsPrintCard(false)
  const handlePrintedCardShow = () => setIsPrintCard(true)

  //Print Receipt
  const [isprintedReceipt, setIsPrintedReceipt] = useState(false)
  const handlePrintReceiptClose = () => setIsPrintedReceipt(false)
  const handlePrintReceiptShow = () => setIsPrintedReceipt(true)

  //check modal
  const [isModalCheck, setIsModalCheck] = useState(false)
  const handleCheckClose = () => setIsModalCheck(false)
  const handleCheckShow = () => setIsModalCheck(true)

  const [isModalCard, setIsModalCard] = useState(false)
  const handleCardClose = () => setIsModalCard(false)
  const handleCardShow = () => setIsModalCard(true)

  const [isModalOthers, setIsModalOthers] = useState(false)
  const handleOthersClose = () => setIsModalOthers(false)
  const handleOthersShow = () => setIsModalOthers(true)

  // Charge SLip
  const [chargeSlip, setChargeSlip] = useState([])
  const [chargeSlipReady, setChargeSlipReady] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [ifYes, setIfYes] = useState(false)

  //For Loaders
  const [loadingCompany, setLoadingCompany] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingDiscounts, setLoadingDiscounts] = useState(false)
  const [loadingInvoices, setloadingInvoices] = useState(false)
  const [loadingBookingDiscounts, setLoadingBookingDiscounts] = useState(false)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [paidAmountInvoice, setPaidAmountInvoice] = useState(0)

  const handlePrintInvoice = () => {
    setShowModal(false)
  }

  //Bank Transfer Details
  const [bankTransferDetails, setBankTransferDetails] = useState({
    bank_name: "",
    transferee: "",
    reference_no: "",
    paid_amount: "",
    withholding_tax: 0,
    remarks: "",
  })

  function handleBankChange(e) {
    const { name, value } = e.target
    setBankTransferDetails({ ...bankTransferDetails, [name]: value })
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: handlePrintShow,
    pageStyle: () => "@page { size: letter;}",
  })

  const handlePrinted = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: setIsPrint,
    pageStyle: () => "@page { size: letter;}",
  })

  const handlePrintedCheck = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: setIsPrintCheck,
    pageStyle: () => "@page { size: letter;}",
  })

  const handlePrintedCard = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: setIsPrintCard,
    pageStyle: () => "@page { size: letter;}",
  })

  const acknowledgementRef = useRef()
  const handleAcknowledgePrint = useReactToPrint({
    content: () => acknowledgementRef.current,
    onAfterPrint: handlePrintReceiptShow,
    pageStyle: () => "@page { size: letter;}",
  })
  const chargeSlipRef = useRef()
  const handleChargeSlipPrint = useReactToPrint({
    content: () => chargeSlipRef.current,
    // onAfterPrint: handlePrintReceiptShow,
    pageStyle: () => "@page { size: letter;}",
  })

  const twoGoRef = useRef()
  const handlge2GoPrint = useReactToPrint({
    content: () => twoGoRef.current,
    pageStyle: () => "@page{ size:letter;}",
  })
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "companies/show/" + companyId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (company) {
        setName(company.data.name)
        setContactNo(company.data.contact_no)
        setEmail(company.data.company_email)
        setAddress(company.data.address)
        setContactPerson(company.data.contact_person)
        setCompanyRemarks(company.data.remarks)
        setLoadingCompany(true)
      })
      .then(function (error) {
        console.log(error)
        setLoadingCompany(true)
      })

    axios({
      method: "post",
      url: window.$link + "users/show/" + userId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then(function (response) {
      setUser(response.data.name)
      setLoadingUser(true)
    })
  }, [])

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "Company_invoices/check_company_invoice_log/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        if (response.data.status == 404) {
          // setHasLogs(false);
        } else {
          var array = response.data.data.logs.filter(
            (info) =>
              info.type == "print" ||
              (info.type == "email" &&
                info.response == "Email successfully sent")
          )

          if (array.length == 0) {
            // setHasLogs(false);
          }
        }
      })
      .then(function (error) {
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    info.length = 0

    axios({
      method: "post",
      url: window.$link + "Company_invoices/hmo_show/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setHasLogs(true)
        var invoice = response.data.data.soas

        setInvoiceData(invoice)
        // setInvoiceStatus((old) => !old);
        setInvoiceStatus(!invoiceStatus)
        setDiscountId(invoice[0].discount_id)
        var payments = response.data.data.payments

        var paymentTotal
        if (payments.length < 1) {
          paymentTotal = parseFloat(0).toFixed(2)
        } else {
          var tempTotal = 0.0
          payments.map((data, index) => {
            tempTotal += parseFloat(data.total)
          })
          paymentTotal = parseFloat(tempTotal).toFixed(2)
        }

        const promisePrint = new Promise((resolve, reject) => {
          resolve("Success")
          setGrandTotal(invoice.total)

          setPay(invoice.total)
          setDiscountCode(invoice[0].discount_code)
          setPaidAmount(invoice.paid_amount)
          setPayments(payments)

          setInfoId(invoice[0].id)
          setHasPay(
            paymentTotal > 0.0 || paymentTotal >= invoice.total ? true : false
          )
        })

        promisePrint.then((value) => {
          setPrintData(true)
        })

        setDiscountId(invoice[0].discount_id)
        setloadingInvoices(true)
        //   });
      })
      .then(function (error) {
        // setHasLogs(false);
        console.log(error)
        setloadingInvoices(true)
      })
  }, [])

  useEffect(() => {
    info.length = 0

    const tempData = groupArrayOfObjects(Object.values(invoiceData), "price")

    delete tempData["undefined"]
    var keys = Object.keys(tempData)

    keys.map((data, index) => {
      var info = {}

      var date = new Date(tempData[data][0].added_on)
      var formattedDate = date.toDateString().split(" ")
      info.key = index + 1
      info.name = tempData[data][0].customer
      info.date =
        formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
      info.lab_services = tempData[data][0].lab_services
      info.price = formatPrice(parseFloat(tempData[data][0].price))

      setInfo((oldArray) => [...oldArray, info])
    })
  }, [invoiceStatus])

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "discounts/hmo_show/" + discountId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then(function (response) {
      setDiscountDescription(response.data.data.discount.description)
    })
  }, [discountId])

  // Get booking under this discount
  React.useEffect(() => {
    chargeSlip.length = 0
    axios({
      method: "post",
      url: window.$link + "bookings/getByHmoCode",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        discount_code: discountCode,
        invoice_id: id,
        requester: userId,
      },
    })
      .then((response) => {
        var dataLength = response.data.data.particulars.length
        response.data.data.particulars.map((data, index) => {
          // Get Booking Details
          axios({
            method: "post",
            url: window.$link + "bookings/getDetails/" + data.id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ""),
              requester: userId,
            },
          })
            .then((response) => {
              var booking = response.data.data.booking
              var bookingDetails = response.data.data.booking_details
              var info = {}
              var date = new Date(booking.booking_time)
              var formattedDate = date.toDateString().split(" ")
              info.patient_name = booking.customer
              info.transaction_no = booking.id
              info.patient_address = booking.customer_address
              info.patient_contact = booking.contact_no
              info.patient_email = booking.customer_email
              info.discount_code = booking.discount_code
              info.date =
                formattedDate[1] +
                " " +
                formattedDate[2] +
                " " +
                formattedDate[3]
              info.doctors_referal = booking.doctors_referal
              info.lab_tests = []
              const lab_test = groupArrayOfObjects(bookingDetails, "lab_test")
              delete lab_test["null"]
              Object.keys(lab_test).map((data, index) => {
                var test = {}
                test.service = data
                test.qty = lab_test[data].length
                test.total = lab_test[data].length * lab_test[data][0].price
                info.lab_tests.push(test)
              })
              info.packages = []
              const packages = groupArrayOfObjects(bookingDetails, "package")

              delete packages["null"]
              Object.keys(packages).map((data, index) => {
                var test = {}
                test.name = data
                test.service = ""
                axios({
                  method: "post",
                  url:
                    window.$link +
                    "bookings/getBookingPackageDetails/" +
                    packages[data][0].id,
                  withCredentials: false,
                  params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ""),
                    requester: userId,
                  },
                })
                  .then((response) => {
                    response.data.map((data, index) => {
                      if (response.data.length - 1 == 0) {
                        test.service += data.lab_test
                      } else {
                        test.service += data.lab_test + ", "
                      }
                    })
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                test.qty = packages[data].length
                test.total = packages[data].length * packages[data][0].price
                info.packages.push(test)
              })

              info.total = booking.total_amount
              info.discount = booking.discount
              info.grand_total = booking.grand_total
              setChargeSlip((oldArray) => [...oldArray, info])
              if (dataLength - 1 == index) {
                setTimeout(setChargeSlipReady(true), 5000)
              }
              setLoadingBookingDiscounts(true)
            })
            .catch((err) => {
              setLoadingBookingDiscounts(true)
              console.log(err)
            })
        })
        setLoadingBookingDiscounts(true)
      })
      .catch((error) => {
        setLoadingBookingDiscounts(true)
        console.log(error)
      })
  }, [discountCode])

  React.useEffect(() => {
    var totalAmount
    var discount
    var customer
    var type

    axios({
      method: "post",
      url: window.$link + "bookings/show/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        discount = response.data.discount
        customer = response.data.customer_id
        type = response.data.type

        axios({
          method: "post",
          url: window.$link + "customers/show/" + response.data.customer_id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then(function (customer) {
            //AGE
            var presentDate = new Date()
            var birthDate = new Date(customer.data.birthdate)
            var age = presentDate.getFullYear() - birthDate.getFullYear()
            var m = presentDate.getMonth() - birthDate.getMonth()
            if (
              m < 0 ||
              (m === 0 && presentDate.getDate() < birthDate.getDate())
            ) {
              age--
            }
            var info = []

            // setPatientId(response.data.customer_id);
            // setFirstName(customer.data.first_name);
            // setMiddleName(customer.data.middle_name);
            // setLastName(customer.data.last_name);
            // setBirthDate(birthDate.toDateString());
            // setGender(customer.data.gender);
            // setAge(age);
            // setContactNo(customer.data.contact_no);
            // setEmail(customer.data.email);
            // setAddress(customer.data.address);
            setLoadingBookings(true)
          })
          .catch(function (error) {
            setLoadingBookings(true)
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  function submit(e) {
    e.preventDefault()

    var invoice_nos = 0
    var prices = []
    var totals = []

    for (let [key, value] of Object.entries(checked)) {
      if (value != false) {
        invoice_nos.push(info[key].id)
        prices.push(info[key].price)
        totals.push(info[key].total)
      }
    }

    if (payment === "cash") {
      axios({
        method: "post",
        url: window.$link + "invoice_payments/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          is_hmo: 1,
          invoice_no: id,
          // prices: [info[0].price],
          // totals: [info[0].total],
          type: payment,
          amount: pay,
          senior_pwd_id: seniorPwdId,
          discount: discount,
          grand_total: grandTotal,
          withholdingtax: tax,
          remarks: remarks,
          added_by: userId,
        },
      })
        .then(function (response) {
          toast.success("Payment Successful!")
          setTimeout(function () {
            setRedirect(true)
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("Payment Unsuccessful!")
        })
    }
    if (payment === "check") {
      axios({
        method: "post",
        url: window.$link + "invoice_payments/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          is_hmo: 1,
          invoice_no: id,
          // prices: [info[0].price],
          // totals: [info[0].total],
          type: payment,
          amount: pay,
          check_no: checkNo,
          check_bank: checkBank,
          check_date: checkDate,
          senior_pwd_id: seniorPwdId,
          discount: discount,
          grandTotal: grandTotal,
          withholdingtax: checkTax,
          remarks: remarks,
          added_by: userId,
        },
      })
        .then(function (response) {
          toast.success("Payment Successful!")
          setTimeout(function () {
            setRedirect(true)
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("Payment Unsuccessful!")
        })
    }
    if (payment === "card") {
      axios({
        method: "post",
        url: window.$link + "invoice_payments/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          is_hmo: 1,
          invoice_no: id,
          // prices: [info[0].price],
          // totals: [info[0].total],
          type: payment,
          amount: pay,
          cardName: cardName,
          card_no: cardNo,
          card_type: cardType,
          card_expiry: cardExpiry,
          card_bank: cardBank,
          senior_pwd_id: seniorPwdId,
          discount: discount,
          withholdingtax: cardTax,
          grandTotal: grandTotal,
          remarks: remarks,
          added_by: userId,
        },
      })
        .then(function (response) {
          toast.success("Payment Successful!")
          setTimeout(function () {
            setRedirect(true)
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("Payment Unsuccessful!")
        })
    }
    if (payment === "others") {
      axios({
        method: "post",
        url: window.$link + "invoice_payments/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          is_hmo: 1,
          invoice_no: id,
          type: payment,
          amount: pay,
          other_source: source,
          other_reference_no: reference,
          senior_pwd_id: seniorPwdId,
          discount: discount,
          grandTotal: grandTotal,
          withholdingtax: othersTax,
          remarks: remarks,
          added_by: userId,
        },
      })
        .then(function (response) {
          toast.success("Payment Successful!")
          setTimeout(function () {
            setRedirect(true)
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("Payment Unsuccessful!")
        })
    }
    if (payment === "bank transfer") {
      axios({
        method: "post",
        url: window.$link + "invoice_payments/create",
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          is_hmo: 1,
          invoice_no: id,
          // prices: [info[0].price],
          // totals: [info[0].total],
          type: "bank transfer",
          amount: pay,
          senior_pwd_id: seniorPwdId,
          discount: discount,
          grand_total: grandTotal,
          withholdingtax: bankTransferDetails.withholding_tax || "0",
          remarks: bankTransferDetails.remarks,
          added_by: userId,
          bank_name: bankTransferDetails.bank_name,
          bank_transferee: bankTransferDetails.transferee,
          bank_reference_no: bankTransferDetails.reference_no,
        },
      })
        .then(function (response) {
          toast.success("Payment Successful!")
          setTimeout(function () {
            setRedirect(true)
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
          toast.error("Payment Unsuccessful!")
        })
    }
  }

  function ReceiptPrintLog() {
    axios({
      method: "post",

      url: window.$link + "invoice_payments/print/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        tQoken: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then(function (response) {})
  }

  function printLog() {
    axios({
      method: "post",
      url: window.$link + "company_invoices/print/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then(function (response) {})
  }

  function emailInvoice() {
    axios({
      method: "post",
      url: window.$link + "company_invoices/email/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        emailed_to: email,
      },
    }).then(function (response) {})
  }

  function closeOthers() {
    setIsPrint(true)
    handleOthersClose(false)
  }

  function closeCheck() {
    setIsPrintCheck(true)
    handleCheckClose(false)
  }

  function closeCard() {
    setIsPrintCard(true)
    handleCardClose(false)
  }

  function checkAddPayment() {
    handleCheckClose(false)
    setPayment("check")
  }

  function cardAddPayment() {
    handleCardClose(false)
    setPayment("card")
  }

  function othersAddPayment() {
    handleOthersClose(false)
    setPayment("others")
  }

  //Invoice Print
  function printInvoiceButton() {
    return (
      <button className="print-invoice hmo-btn" onClick={handlePrint}>
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT INVOICE
      </button>
    )
  }

  function printInvoiceButtons() {
    return (
      <button
        className="invoice-btn"
        onClick={handlePrinted}
        onHide={handlePrintedClose}
      >
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT INVOICE
      </button>
    )
  }

  function printInvoiceButtonCheck() {
    return (
      <button
        className="invoice-btn"
        onClick={handlePrintedCheck}
        onHide={handlePrintedClose}
      >
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT INVOICE
      </button>
    )
  }

  function printInvoiceButtonCard() {
    return (
      <button
        className="invoice-btn"
        onClick={handlePrintedCard}
        onHide={handlePrintedClose}
      >
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT INVOICE
      </button>
    )
  }
  // Charge Slip
  function printChargeSlip() {
    if (chargeSlipReady) {
      return (
        <button className="invoice-btn" onClick={handleChargeSlipPrint}>
          <FontAwesomeIcon
            icon={"print"}
            alt={"print"}
            aria-hidden="true"
            className="print-icon"
          />
          PRINT CHARGE SLIP
        </button>
      )
    } else {
      return <button className="invoice-btn">Loading Charge Slip...</button>
    }
  }
  //Acknowledgement Print
  function printButton() {
    return (
      <button
        className="invoice-btn"
        onClick={printData == false ? "" : handleAcknowledgePrint}
      >
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        {printData == false ? "Loading Data..." : "PRINT RECEIPT"}
      </button>
    )
  }

  function emailButton() {
    return (
      <button className="invoice-btn" onClick={handleShow}>
        <FontAwesomeIcon
          icon={"envelope"}
          alt={"email"}
          aria-hidden="true"
          className="print-icon"
        />
        EMAIL
      </button>
    )
  }

  function paymentDetails() {
    var new_payments = payments[0]
    var date = new Date(payments[0]?.added_on)
    var formattedDate = date.toDateString().split(" ")

    return (
      <div className="paymentDetails mt-3">
        <h3 className="form-categories-header italic">PAYMENT DETAILS</h3>
        {payments.map((data) => {
          return (
            <div>
              <span className="label">
                PAYMENT DATE:{" "}
                <b className="invoice-total">
                  {" "}
                  {new Date(data.added_on).toDateString().split(" ")[1] +
                    " " +
                    new Date(data.added_on).toDateString().split(" ")[2] +
                    " " +
                    new Date(data.added_on).toDateString().split(" ")[3]}{" "}
                </b>
              </span>
              <br />
              <span className="label">
                PAYMENT TYPE: <b className="invoice-total"> {data.type} </b>
              </span>
              <br />
              <span className="label">
                CHECK NO./ REFERENCE NO.:{" "}
                <b className="invoice-total">
                  {" "}
                  {data.payment_type === "cash"
                    ? "N/A"
                    : data.reference_code}{" "}
                </b>
              </span>
              <br />
              <span className="label">
                PAID AMOUNT:{" "}
                <b className="invoice-total">
                  P{" "}
                  {parseFloat(data.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </b>
              </span>
              <br />
              <span className="label">
                REMARKS: <b className="invoice-total">{data.remarks}</b>
              </span>
              <br />
              <br />
            </div>
          )
        })}
      </div>
    )
  }

  function cashForm() {
    return (
      <div className="pay-cash-cont mb-5 mt-4">
        <Row className="input-group">
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Amount
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="payAmount"
              name="payAmount"
              step="0.01"
              value={pay}
              className="form-control"
              placeholder="P"
              onChange={(e) => {
                const inputValue = e.target.value
                if (inputValue !== null) {
                  setPay(inputValue)
                }
              }}
            />
          </Col>
          <Col xs={1}></Col>
          <Col xs={2} className="input-group-sm"></Col>
          <Col xs={2}>
            <label for="inputPassword6" className="col-form-label">
              Withholding Tax
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="taxAmount"
              name="taxAmount"
              step="0.01"
              value={tax}
              className="form-control"
              placeholder="% (in percentage)"
              onChange={(e) => setTax(e.target.value)}
            />
          </Col>

          <Col xs={1}>
            {" "}
            <label for="inputPassword6" className="col-form-label">
              Remarks
            </label>
          </Col>
          <Col xs={11} className="input-group-sm">
            <textarea
              id="remarks"
              name="remarks"
              className="full-input"
              style={{ width: "92%" }}
              cols="100"
              rows="3"
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </Col>
        </Row>
        <div className="row mt-2">
          <div className="col-11 d-flex justify-content-end grand-total">
            <span className="label">
              GRAND TOTAL:{" "}
              <b className="invoice-total">
                P{" "}
                {parseFloat(grandTotal).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-11 d-flex justify-content-end grand-total">
            <span className="label">
              GRAND TOTAL WITH TAX:{" "}
              <b className="invoice-total">
                P{" "}
                {isNaN(
                  parseFloat(grandTotal) -
                    parseFloat(grandTotal) * (parseFloat(tax) / 100)
                )
                  ? parseFloat(grandTotal).toFixed(2)
                  : (
                      parseFloat(grandTotal) -
                      parseFloat(grandTotal) * (parseFloat(tax) / 100)
                    ).toFixed(2)}
              </b>
            </span>
          </div>
        </div>
        <div className="row d-flex justify-content-end mt-4">
          {/* {paymentStatus == "paid" && printButton()} */}
          <button className="save-btn" onClick={(e) => submit(e)}>
            SAVE PAYMENT{" "}
          </button>
        </div>
      </div>
    )
  }

  function bankTransferForm() {
    return (
      <>
        <div className="pay-cash-cont mb-5 mt-4">
          <Row className="input-group">
            <Col xs={12}>
              <label for="inputPassword6" className="col-form-label">
                Bank Transfer Details
              </label>
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Bank
              </label>
            </Col>
            <Col xs={2} className="input-group-sm">
              <input
                type="text"
                id="check"
                className="form-control"
                name="bank_name"
                onChange={handleBankChange}
              />
            </Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Transferee Name
              </label>
            </Col>
            <Col xs={2} className="input-group-sm">
              <input
                type="text"
                id="check"
                className="form-control"
                name="transferee"
                onChange={handleBankChange}
              />
            </Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Reference No
              </label>
            </Col>
            <Col xs={3} className="input-group-sm mb-4">
              <input
                type="text"
                id="check"
                className="form-control"
                name="reference_no"
                onChange={handleBankChange}
              />
            </Col>
            <Col xs={12}>
              <hr style={{ width: "92%" }} />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Paid Amount
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                value={pay}
                // disabled
                className="form-control"
                placeholder="P"
                onChange={(e) => {
                  const inputValue = e.target.value
                  if (inputValue !== null) {
                    setPay(inputValue)
                  }
                }}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Withholding Tax
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="taxAmount"
                name="withholding_tax"
                step="0.01"
                className="form-control"
                placeholder="% (in percentage)"
                onChange={handleBankChange}
              />
            </Col>

            <Col xs={1}>
              {" "}
              <label for="inputPassword6" className="col-form-label">
                Remarks
              </label>
            </Col>
            <Col xs={11} className="input-group-sm">
              <textarea
                className="full-input"
                style={{ width: "92%" }}
                id="remarks"
                name="remarks"
                rows="3"
                cols="100"
                onChange={handleBankChange}
              ></textarea>
            </Col>
          </Row>
          <div className="row mt-2">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL:{" "}
                <b className="invoice-total">
                  P{" "}
                  {parseFloat(grandTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </b>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL WITH TAX:{" "}
                <b className="invoice-total">
                  P{" "}
                  {isNaN(
                    parseFloat(grandTotal) -
                      parseFloat(grandTotal) *
                        (parseFloat(bankTransferDetails.withholding_tax) / 100)
                  )
                    ? parseFloat(grandTotal).toFixed(2)
                    : (
                        parseFloat(grandTotal) -
                        parseFloat(grandTotal) *
                          (parseFloat(bankTransferDetails.withholding_tax) /
                            100)
                      ).toFixed(2)}
                </b>
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-4">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>
              SAVE PAYMENT{" "}
            </button>
          </div>
        </div>
      </>
    )
  }

  function checkForm() {
    return (
      <>
        <div className="pay-cash-cont mb-5 mt-4">
          <Row className="input-group">
            <Col xs={12}>
              <label for="inputPassword6" className="col-form-label">
                Check Details
              </label>
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Bank
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="check"
                name="check_bank"
                className="form-control"
                onChange={(e) => setCheckBank(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Number
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="check"
                name="check_no"
                className="form-control"
                onChange={(e) => setCheckNo(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Date
              </label>
            </Col>
            <Col xs={3} className="input-group-sm mb-4">
              <input
                type="date"
                id="check"
                name="check_date"
                className="form-control"
                onChange={(e) => setCheckDate(e.target.value)}
              />
            </Col>
            <Col xs={12}>
              <hr style={{ width: "92%" }} />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Amount
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                value={pay}
                // disabled
                className="form-control"
                placeholder="P"
                onChange={(e) => {
                  const inputValue = e.target.value
                  if (inputValue !== null) {
                    setPay(inputValue)
                  }
                }}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Withholding Tax
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                step="0.01"
                className="form-control"
                placeholder="% (in percentage)"
                onChange={(e) => {
                  setCheckTax(e.target.value)
                }}
              />
            </Col>

            <Col xs={1}>
              {" "}
              <label for="inputPassword6" className="col-form-label">
                Remarks
              </label>
            </Col>
            <Col xs={11} className="input-group-sm">
              <textarea
                className="full-input"
                style={{ width: "92%" }}
                id="remarks"
                name="remarks"
                rows="3"
                cols="100"
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <div className="row mt-2">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL:{" "}
                <b className="invoice-total">
                  P{" "}
                  {parseFloat(grandTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </b>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL WITH TAX:{" "}
                <b className="invoice-total">
                  P{" "}
                  {isNaN(
                    parseFloat(grandTotal) -
                      parseFloat(grandTotal) * (parseFloat(checkTax) / 100)
                  )
                    ? parseFloat(grandTotal).toFixed(2)
                    : (
                        parseFloat(grandTotal) -
                        parseFloat(grandTotal) * (parseFloat(checkTax) / 100)
                      ).toFixed(2)}
                </b>
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-4">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>
              SAVE PAYMENT{" "}
            </button>
          </div>
        </div>
      </>
    )
  }

  function cardForm() {
    return (
      <div class="pay-check-cont">
        <div className="row">
          <span class="check-label">CARD NAME</span>
          <input
            type="text"
            id="card"
            name="card_name"
            class="check"
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="row">
          <span class="check-label">CARD NO</span>
          <input
            type="text"
            id="card"
            name="card_no"
            class="check"
            onChange={(e) => setCardNo(e.target.value)}
          />
        </div>
        <div className="row">
          <span class="check-label">CARD TYPE</span>
          <input
            type="text"
            id="card"
            name="card_type"
            class="check"
            onChange={(e) => setCardType(e.target.value)}
          />
        </div>
        <div className="row">
          <span class="check-label">CARD EXPIRY</span>
          <input
            type="date"
            id="card"
            name="card_expiry"
            class="check"
            onChange={(e) => setCardExpiry(e.target.value)}
          />
        </div>
        <div className="row">
          <span class="check-label">CARD BANK</span>
          <input
            type="text"
            id="card"
            name="card_bank"
            class="check"
            onChange={(e) => setCardBank(e.target.value)}
          />
        </div>
        <div className="row">
          <span class="check-label">WITHHOLDING TAX</span>
          <input
            type="number"
            id="taxAmount"
            name="taxAmount"
            step="0.01"
            className="cash-input pay"
            placeholder="% (in percentage)"
            onChange={(e) => setCardTax(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="row">
              <span class="remarks-payment-label">REMARKS (optional)</span>
            </div>
            <div className="row">
              <textarea
                id="remarks"
                name="remarks"
                rows="4"
                className="invoice-remarks-input"
                cols="100"
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-11 d-flex justify-content-end grand-total">
            <span className="label">
              GRAND TOTAL:{" "}
              <b className="invoice-total">
                P{" "}
                {parseFloat(grandTotal).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-11 d-flex justify-content-end grand-total">
            <span className="label">
              GRAND TOTAL WITH TAX:{" "}
              <b className="invoice-total">
                P{" "}
                {isNaN(
                  parseFloat(grandTotal) -
                    parseFloat(grandTotal) * (parseFloat(cardTax) / 100)
                )
                  ? parseFloat(grandTotal).toFixed(2)
                  : (
                      parseFloat(grandTotal) -
                      parseFloat(grandTotal) * (parseFloat(cardTax) / 100)
                    ).toFixed(2)}
              </b>
            </span>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          {paymentStatus == "paid" && printButton()}
          <button className="save-btn" onClick={(e) => submit(e)}>
            SAVE PAYMENT{" "}
          </button>
        </div>
      </div>
    )
  }

  function othersForm() {
    return (
      <>
        <div className="pay-cash-cont mb-5 mt-4">
          <Row className="input-group">
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Amount
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                value={pay}
                // disabled
                className="form-control"
                placeholder="P"
                onChange={(e) => setPay(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Withholding Tax
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                step="0.01"
                className="form-control"
                placeholder="% (in percentage)"
                onChange={(e) => setOthersTax(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Source
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="payAmount"
                name="source"
                className="form-control"
                onChange={(e) => setSource(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Reference Number
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="changeAmount"
                name="reference_number"
                className="form-control"
                onChange={(e) => setReference(e.target.value)}
              />
            </Col>

            <Col xs={1}>
              {" "}
              <label for="inputPassword6" className="col-form-label">
                Remarks
              </label>
            </Col>
            <Col xs={11} className="input-group-sm">
              <textarea
                className="full-input"
                style={{ width: "92%" }}
                id="remarks"
                name="remarks"
                rows="3"
                cols="100"
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <div className="row mt-2">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL:{" "}
                <b className="invoice-total">
                  P{" "}
                  {parseFloat(grandTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </b>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-11 d-flex justify-content-end grand-total">
              <span className="label">
                GRAND TOTAL WITH TAX:{" "}
                <b className="invoice-total">
                  P{" "}
                  {isNaN(
                    parseFloat(grandTotal) -
                      parseFloat(grandTotal) * (parseFloat(othersTax) / 100)
                  )
                    ? parseFloat(grandTotal).toFixed(2)
                    : (
                        parseFloat(grandTotal) -
                        parseFloat(grandTotal) * (parseFloat(othersTax) / 100)
                      ).toFixed(2)}
                </b>
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-4">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>
              SAVE PAYMENT{" "}
            </button>
          </div>
        </div>
      </>
    )
  }

  function addInvoice() {
    setToAddInvoice(true)
  }

  if (redirect == true) {
    return <Navigate to={"/hmo-invoices"} />
  }

  if (redirectBack === true) {
    if (dateFrom !== undefined && dateTo !== undefined) {
      var link = "/hmo-invoices/" + dateFrom + "/" + dateTo
      return <Navigate to={link} />
    } else {
      var link = "/hmo-invoices"
      return <Navigate to={link} />
    }
  }

  return (
    <div>
      <Navbar />
      {loadingCompany && info.length > 0 ? (
        <div className="active-cont">
          <Header
            type="thin"
            title="REVIEW HMO INVOICE"
            addInvoice={handleShow}
          />
          <ToastContainer />
          <div>
            <div className="p-5">
              <div className="invoice-cont-hmo">
                <div className="row">
                  <div className="col-12">
                    <span className="label" style={{ fontSize: "15px" }}>
                      BILL TO:{" "}
                    </span>
                  </div>
                  <div className="col-12">
                    <span className="" style={{ fontSize: "15px" }}>
                      {" "}
                      COMPANY NAME: {name}
                    </span>
                  </div>
                  <div className="col-12">
                    <span className="" style={{ fontSize: "15px" }}>
                      {" "}
                      COMPANY ADDRESS: {address}
                    </span>
                  </div>

                  <div className="col-12">
                    <span className="" style={{ fontSize: "15px" }}>
                      {" "}
                      {companyRemarks}
                    </span>
                  </div>
                </div>

                <div className="invoice-line" />
              </div>
              <div>
                <Table
                  type={"payment-invoices-print-hmo"}
                  tableData={[
                    ...info,
                    {
                      key: "",
                      name: "",
                      date: "",
                      lab_services: <strong>TOTAL BILL</strong>,
                      price: (
                        <strong>
                          {parseFloat(grandTotal).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      ),
                    },
                  ]}
                  rowsPerPage={4}
                  headingColumns={[
                    "NO",
                    "NAME",
                    "DATE OF SERVICE",
                    "LAB SERVICES",
                    "TOTAL DUE",
                  ]}
                  givenClass={"company-mobile"}
                  // setChecked={setChecked}
                />
              </div>

              <div className="invoice-footer p-1">
                <div
                  className="row justify-content-center"
                  style={{
                    fontSize: "small",
                    border: "1px solid black",
                  }}
                >
                  <div className="col-12">
                    <span>NOTE:</span>
                    <br />
                    <span>FOR CHECK PAYMENT & BANK TRANSFER</span>
                    <br />
                    <span> PLEASE ISSUE TO:</span>
                    <br />
                    <span>
                      {" "}
                      BANK: <strong>BDO</strong>
                    </span>
                    <br />
                    <span>
                      {" "}
                      ACCOUNT NAME:{" "}
                      <strong>Quest & reliance Diagnostics</strong>
                    </span>
                    <br />
                    <span>
                      {" "}
                      ACCOUNT NUMBER: <strong>002803017190</strong>
                    </span>
                    <br />
                    <br />
                    <span>REMINDERS:</span>
                    <br />
                    <span>
                      FOR BANK TRANSFER PLEASE SCREENSHOT THE TRANSACTION AND
                      EMAIL TO THIS ACCOUNT
                    </span>
                    <br />
                    <span>
                      <a style={{ textDecoration: "underline", color: "blue" }}>
                        questdiagnostics.mgt@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
                <br />
                <br />

                <div className="row">
                  <div className="col-6">
                    <span className="received-from-label">
                      {" "}
                      PREPARED BY <br />
                      <span className="not-bold">{user}</span>
                    </span>
                    <br />
                    <br />
                    <span className="received-from-label">
                      {" "}
                      RECEIVED BY <br /> ________________________
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="received-from-label">
                      {" "}
                      APPROVED BY <br />
                      ________________________
                    </span>
                  </div>
                </div>
                <div className="row justify-content-end mt-5">
                  <div className="col-2">
                    <button className="hmo-btn disapprove">DISAPPROVE</button>
                  </div>
                  <div className="col-2">
                    <button className="hmo-btn approve">APPROVE</button>
                  </div>
                  <div className="col-2">{printInvoiceButton()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      <div
        style={{ display: "none" }} // This make ComponentToPrint show   only while printing
      >
        <InvoiceToPrintHmo
          ref={componentRef}
          name={name}
          contactNo={contactNo}
          address={address}
          contactPerson={contactPerson}
          invoices={[
            ...info,
            {
              key: "",
              name: "",
              date: "",
              lab_services: <strong>TOTAL BILL</strong>,
              price: (
                <strong>
                  {parseFloat(grandTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              ),
            },
          ]}
          grandTotal={grandTotal}
          remarks={companyRemarks}
          user={user}
        />
      </div>
    </div>
  )
}

export default ReviewInvoiceHmo
