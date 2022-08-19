import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'; 
import { useForm, useStep } from "react-hooks-helper";
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InvoiceToPrint } from './InvoiceToPrint';
import { ReceiptToPrint } from "./ReceiptToPrint";

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import { ChargeSlip } from "./ChargeSlip";
import ModalPopUp from "../../../components/Modal/UploadModal";

//variables
const userToken = getToken();
const userId = getUser();
const checkedData = {};

const CashPaymentDetails = {
    type: "",
    amount: "",
}

const CardPaymentDetails = {
    type: "",
    amount: "",
    card_name: "",
    card_no: "",
    card_expiry: "",
    card_bank: "",
    check_no: "",
    check_bank: "", 
    check_date: "",
}

const CheckPaymentDetails = {
    type: "",
    amount: "",
    check_no: "",
    check_bank: "",
    check_date: "",
}

function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
function AddInvoicePayment() {
  document.body.style = 'background: white;';

  //Invoice details
  const {id, companyId} = useParams();
  const [redirect, setRedirect] = useState(false);
  const [info, setInfo] = useState([]);
  const [infoId, setInfoId] = useState("");
  const [checked, setChecked] = useForm(checkedData);
  const [haslogs, setHasLogs] = useState(true);
  const [paidAmount, setPaidAmount] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [payments, setPayments] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [discountDescription, setDiscountDescription] = useState("");
  const [user, setUser] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState(false);
  const [isBilled, setIsBilled] = useState(false)

  //Payment details
  const [payment, setPayment] = useState("");
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [pay, setPay] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [mdCharge, setMdCharge] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [seniorPwdId, setID] = useState("");
  const [hasPay, setHasPay] = useState(false);

  //Company details
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [discountCodes, setDiscountCodes] = useState("");

  //Redirection
  const [toAddPayment, setToAddPayment] = useState(false);
  const [toAddInvoice, setToAddInvoice] = useState(false);

  //Add Invoice Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Check states
  const [checkNo, setCheckNo] = useState("");
  const [checkBank, setCheckBank] = useState("");
  const [checkDate, setCheckDate] = useState("");

  //Card states
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardBank, setCardBank] = useState("");

  //Others states
  const [source, setSource] = useState("");
  const [reference, setReference] = useState("");

  //Print state
  const [printData, setPrintData] = useState(false);

  //Print Invoice
  const [isprinted, setIsPrinted] = useState(false);
  const handlePrintClose = () => setIsPrinted(false);
  const handlePrintShow = () => setIsPrinted(true);

  //Print Receipt
  const [isprintedReceipt, setIsPrintedReceipt] = useState(false);
  const handlePrintReceiptClose = () => setIsPrintedReceipt(false);
  const handlePrintReceiptShow = () => setIsPrintedReceipt(true);

//check modal
const [isModalCheck, setIsModalCheck] = useState(false);
const handleCheckClose = () => setIsModalCheck(false);
const handleCheckShow = () => setIsModalCheck(true);

  // Charge SLip
  const [chargeSlip, setChargeSlip] = useState([]);
  const [chargeSlipReady, setChargeSlipReady] = useState(false);

  const [showModal, setShowModal] = useState(false);


  const handlePrintInvoice= () => {
    setShowModal(false)
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: handlePrintShow,
    pageStyle: () => "@page { size: letter;}"
  });

  const acknowledgementRef = useRef();
  const handleAcknowledgePrint = useReactToPrint({
    content: () => acknowledgementRef.current,
    onAfterPrint: handlePrintReceiptShow,
    pageStyle: () => "@page { size: letter;}"
  });
  const chargeSlipRef = useRef();
  const handleChargeSlipPrint = useReactToPrint({
    content: () => chargeSlipRef.current,
    // onAfterPrint: handlePrintReceiptShow,
    pageStyle: () => "@page { size: letter;}"
  });

  const twoGoRef = useRef();
  const handlge2GoPrint = useReactToPrint({
      content: () => twoGoRef.current, 
      pageStyle:()=>"@page{ size:letter;}"
  })
  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'companies/show/' + companyId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (company) {

      setName(company.data.name);
      setContactNo(company.data.contact_no);
      setEmail(company.data.company_email);
      setAddress(company.data.address);
      setContactPerson(company.data.contact_person);

    }).then(function(error) {
      console.log(error);
    });

    axios({
        method: 'post',
        url: window.$link + 'users/show/' + userId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then(function (response) {
          setUser(response.data.name);
      });

  },[]);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'discounts/company/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      setDiscountCodes(response.data);
    }).then(function(error) {
      console.log(error);
    });
  },[]);

  React.useEffect(() => {
    axios({
        method: 'post',
        url: window.$link + 'Company_invoices/check_company_invoice_log/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then(function (response) {
        // console.log(response)
            if(response.data.status == 404) {
                setHasLogs(false);
            } else {
                var array = response.data.data.logs.filter((info) => info.type == "print" || (info.type == "email" && info.response == "Email successfully sent"))

                if(array.length == 0) {
                    setHasLogs(false);
                }

                // console.log(array);
            }

      }).then(function(error) {
        console.log(error);
      });
  },[]);

  React.useEffect(() => {
    info.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'Company_invoices/show/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      var invoice = response.data.data.company_invoices;
      setInvoiceData(invoice)
      setInvoiceStatus(old=>!old)
      setDiscountId(invoice[0].discount_id)
      var payments = response.data.data.payments;
      var paymentTotal;
      if(payments.length<1){
        paymentTotal=parseFloat(0).toFixed(2);
      } else {
        var tempTotal=0.00;
        payments.map((data, index)=>{
          tempTotal += parseFloat(data.total)
        })
        paymentTotal = parseFloat(tempTotal).toFixed(2);
      }
      
      const promisePrint = new Promise((resolve,reject) => {
          resolve('Success');
          setGrandTotal(invoice.total);
          setDiscountCode(invoice[0].discount_code);
          setPaidAmount(paymentTotal);
          setPayments(payments);
          setInfoId(invoice[0].id);
          setHasPay(paymentTotal>0.00 || paymentTotal>=invoice.total ? true : false);
          // setInfo(oldArray => [...oldArray, info]);
      }); 

        promisePrint.then((value) => {
            // console.log(value);
            setPrintData(true);
        })

        setDiscountId(invoice[0].discount_id);
        
    //   });

    }).then(function(error) {
      console.log(error);
    });
  },[]);

  React.useEffect(()=>{
    info.length=0;
    const tempData = (groupArrayOfObjects(Object.values(invoiceData), "price"))
    delete tempData["undefined"]
    var keys = Object.keys(tempData)

    keys.map((data, index)=>{
      var info={};
      var date = new Date(tempData[data][0].added_on);
      var formattedDate = date.toDateString().split(" ");
      info.date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
      info.code = tempData[data][0].discount_code
      info.price = parseFloat(data)
      info.qty = tempData[data].length
      info.total = parseFloat(data)*tempData[data].length
      setInfo(oldArray=>[...oldArray, info])
    })
  }, [invoiceStatus])
  
  React.useEffect(() => {
    axios({
        method: 'post',
        url: window.$link + 'discounts/show/' + discountId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then(function (response) {
          setDiscountDescription(response.data.data.discount.description);
      });
  },[discountId]);
  
  // Get booking under this discount
  React.useEffect(()=>{
    chargeSlip.length=0;
    axios({
      method: 'post',
      url: window.$link + 'bookings/getAllByDiscountCode',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          discount_code: discountCode,
          requester: userId,

      }
    }).then((response)=>{
      var dataLength = response.data.data.particulars.length;
        response.data.data.particulars.map((data, index)=>{
          // Get Booking Details
          axios({
            method: 'post',
            url: window.$link + 'bookings/getDetails/'+data.id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
          }).then((response)=>{
            var booking = response.data.data.booking;
            var bookingDetails = response.data.data.booking_details;
            var info ={};
            var date = new Date(booking.booking_time);
            var formattedDate = date.toDateString().split(" ");
            info.patient_name = booking.customer;
            info.transaction_no = booking.id;
            info.patient_address = booking.customer_address;
            info.patient_contact = booking.contact_no;
            info.patient_email = booking.customer_email;
            info.discount_code = booking.discount_code;
            info.date =  formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
            info.doctors_referal = booking.doctors_referal;
            info.lab_tests = [];
            const lab_test = groupArrayOfObjects(bookingDetails, "lab_test")
            delete lab_test["null"]
            Object.keys(lab_test).map((data, index)=>{
              var test = {};
              test.service = data
              test.qty = lab_test[data].length
              test.total = lab_test[data].length*lab_test[data][0].price
              info.lab_tests.push(test)
            })
            info.packages = [];
            const packages = groupArrayOfObjects(bookingDetails, "package")
            // console.log(packages)
            delete packages["null"]
            Object.keys(packages).map((data, index)=>{
              var test = {};
              test.name=data;
              test.service = "";
              axios({
                method: 'post',
                url: window.$link + 'bookings/getBookingPackageDetails/' + packages[data][0].id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                  }
              }).then((response)=>{
                response.data.map((data, index)=>{
                  if(response.data.length-1==0){
                    test.service += data.lab_test;
                  } else {
                    test.service += data.lab_test +", ";
                  }
                })
              }).catch((err)=>{console.log(err)})
              test.qty = packages[data].length;
              test.total = packages[data].length * packages[data][0].price;
              info.packages.push(test)
            })
            
            info.total = booking.total_amount
            info.discount = booking.discount
            info.grand_total = booking.grand_total
            setChargeSlip(oldArray=>[...oldArray, info]);   
            if(dataLength-1 == index){
              setTimeout(
                setChargeSlipReady(true)
                ,5000
              )
            }   
          })
          .catch((err)=>{console.log(err)})

        })
    }).catch((error)=>{
      console.log(error)
    })
  },[discountCode])
  

  React.useEffect(() => {
    var totalAmount;
    var discount;
    var customer;
    var type;

     axios({
        method: 'post',
        url: window.$link + 'bookings/show/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        discount = response.data.discount;
        customer = response.data.customer_id;
        type = response.data.type;

        axios({
            method: 'post',
            url: window.$link + 'customers/show/' + response.data.customer_id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (customer) {

            //AGE
            var presentDate = new Date();
            var birthDate = new Date(customer.data.birthdate);
            var age = presentDate.getFullYear() - birthDate.getFullYear();
            var m = presentDate.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) {
                age--;
            }
            var info = [];
            
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

        }).catch(function (error) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });  
}, []);

  function submit (e) {
    e.preventDefault();

    var invoice_nos = 0;
    var prices = [];
    var totals = [];

    for (let [key, value] of Object.entries(checked)) {
        if(value != false) {
            invoice_nos.push(info[key].id);
            prices.push(info[key].price);
            totals.push(info[key].total); 
        }
    }

    if(payment === 'cash') {
        axios({
            method: 'post',
            url: window.$link + 'invoice_payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                invoice_no: infoId,
                // prices: [info[0].price],
                // totals: [info[0].total], 
                type: payment,
                amount: grandTotal,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grand_total: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            // console.log(response)            
            toast.success("Payment Successful!");
            setTimeout(function() {
                setRedirect(true);
            }, 2000);
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'check') {
        axios({
            method: 'post',
            url: window.$link + 'invoice_payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                invoice_no: infoId,
                // prices: [info[0].price],
                // totals: [info[0].total], 
                type: payment,
                amount: grandTotal,
                check_no: checkNo,
                check_bank: checkBank,
                check_date: checkDate,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grandTotal: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            setTimeout(function() {
                setRedirect(true);
            }, 2000);
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'card') {
        axios({
            method: 'post',
            url: window.$link + 'invoice_payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                invoice_no: infoId,
                // prices: [info[0].price],
                // totals: [info[0].total], 
                type: payment,
                amount: grandTotal,
                cardName: cardName,
                card_no: cardNo,
                card_type: cardType,
                card_expiry: cardExpiry,
                card_bank: cardBank,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grandTotal: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            setTimeout(function() {
                setRedirect(true);
            }, 2000);
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'others') {
        axios({
            method: 'post',
            url: window.$link + 'invoice_payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                invoice_no: infoId,
                type: payment,
                amount: grandTotal,
                other_source: source,
                other_reference_no: reference,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grandTotal: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            setTimeout(function() {
                setRedirect(true);
            }, 2000);
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
}  

  function ReceiptPrintLog() {
    axios({
        method: 'post',
        url: window.$link + 'invoice_payments/print/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then(function (response) {
        // console.log(response);
      });
  }

  function printLog() {
    axios({
        method: 'post',
        url: window.$link + 'company_invoices/print/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then(function (response) {
        // console.log(response);
      });
  }

  function emailInvoice() {
    axios({
        method: 'post',
        url: window.$link + 'company_invoices/email/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            emailed_to: email,
        }
      }).then(function (response) {
        // console.log(response);
      });
  }

  //Invoice Print
  function printInvoiceButton() {
    return (
            <button className="invoice-btn" onClick={handlePrint}>
            <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                PRINT INVOICE
            </button>
    )    }
  // Charge Slip
  function printChargeSlip(){
   if(chargeSlipReady) {return(
      <button className="invoice-btn" onClick={handleChargeSlipPrint}>
        <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
            PRINT CHARGE SLIP
      </button>
    )    
    }
    else {
      return(<button className="invoice-btn">
        Loading Charge Slip...
      </button>)
    }
  }
    //Acknowledgement Print
    function printButton() {
        return (
            <button className="invoice-btn" onClick={printData == false ? "" : handleAcknowledgePrint}>
            <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                {printData == false ? "Loading Data..." : "PRINT RECEIPT"}
            </button>
        ) 
    }

    function emailButton() {
        return (
            <button className="invoice-btn" onClick={handleShow}>
            <FontAwesomeIcon icon={"envelope"} alt={"email"} aria-hidden="true" className="print-icon"/>
                EMAIL
            </button>
        ) 
    }
 
    function paymentDetails() {
        var new_payments = payments[0];
        var date = new Date(payments[0].added_on);
        var formattedDate = date.toDateString().split(" ");

        return (
            <div className="paymentDetails">
                <h3 className="form-categories-header italic">PAYMENT DETAILS</h3>
                    <div>
                        <span className="label">PAYMENT DATE: <b className="invoice-total"> {formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]} </b></span>
                        <br/>
                        <span className="label">PAYMENT TYPE: <b className="invoice-total"> {new_payments.type} </b></span>
                        <br/>
                        <span className="label">PAID AMOUNT: <b className="invoice-total">P {parseFloat(new_payments.amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                        <br/>
                        <br/>
                    </div>
            </div>
        )
    }

function cashForm() {

    return (
        <div class="pay-cash-cont">
            <div className="row">
                    <div className="col-sm-6">
                         <div className="row">
                            <span class="amount-label">AMOUNT</span>
                        </div>
                        <div className="row">
                            <input type="number" id="payAmount" name="payAmount" step="0.01" value={pay} class="cash-input pay" placeholder="P" onChange={(e) => setPay(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <span class="amount-label">CHANGE</span>
                        </div>
                        <div className="row">
                            <input type="number" id="changeAmount" name="changeAmount" class="cash-input pay" value={(pay-grandTotal).toFixed(2)}  placeholder="P"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <span class="remarks-payment-label">REMARKS (optional)</span>
                        </div>
                        <div className="row">
                            <textarea id="remarks" name="remarks"  className="invoice-remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-end">
                    {paymentStatus == "paid" && printButton()}
                    <button className="save-btn" onClick={(e) => submit(e)}>SAVE PAYMENT </button>
                </div>                    
         </div>       
        )
    }

function checkForm () {
    return (
    <div class="pay-check-cont">
        <div className="row">
            <div className="col-sm-8">
                <span class="check-label">CHECK NO</span>
                <input type="text" id="check" name="check_no" class="check" onChange={(e) => setCheckNo(e.target.value)}/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-8">
                <span class="check-label">CHECK BANK</span>
                <input type="text" id="check" name="check_bank" class="check" onChange={(e) => setCheckBank(e.target.value)}/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-8">
                <span class="check-label">CHECK DATE</span>
                <input type="date" id="check" name="check_date" class="check" onChange={(e) => setCheckDate(e.target.value)}/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
                <div className="row">
                    <span class="remarks-payment-label">REMARKS (optional)</span>
                </div>
                <div className="row">
                    <textarea id="remarks" name="remarks" className="invoice-remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-end">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>SAVE PAYMENT </button>
        </div>
        
    </div>
    )
}

function cardForm () {
    return (
    <div class="pay-check-cont">
        <div className="row">
            <span class="check-label">CARD NAME</span>
            <input type="text" id="card" name="card_name" class="check" onChange={(e) => setCardName(e.target.value)}/>
        </div>
        <div className="row">
            <span class="check-label">CARD NO</span>
            <input type="text" id="card" name="card_no" class="check" onChange={(e) => setCardNo(e.target.value)}/>
        </div>
        <div className="row">
            <span class="check-label">CARD TYPE</span>
            <input type="text" id="card" name="card_type" class="check" onChange={(e) => setCardType(e.target.value)}/>
        </div>
        <div className="row">
            <span class="check-label">CARD EXPIRY</span>
            <input type="date" id="card" name="card_expiry" class="check" onChange={(e) => setCardExpiry(e.target.value)}/>
        </div>
        <div className="row">
            <span class="check-label">CARD BANK</span>
            <input type="text" id="card" name="card_bank" class="check" onChange={(e) => setCardBank(e.target.value)}/>
        </div>
        <div className="row">
            <div className="col-sm-6">
                <div className="row">
                    <span class="remarks-payment-label">REMARKS (optional)</span>
                </div>
                <div className="row">
                    <textarea id="remarks" name="remarks" rows="4" className="invoice-remarks-input" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-end">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>SAVE PAYMENT </button>
        </div>
    </div>
    )
}

function othersForm() {

    return (
        <div class="pay-cash-cont">
            <div className="row">
                    <div className="col-sm-6">
                         <div className="row">
                            <span class="amount-label">SOURCE</span>
                        </div>
                        <div className="row">
                            <input type="text" id="payAmount" name="source" class="cash-input pay" onChange={(e) => setSource(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <span class="amount-label">REFERENCE NUMBER</span>
                        </div>
                        <div className="row">
                            <input type="text" id="changeAmount" name="reference_number" class="cash-input pay" onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <span class="remarks-payment-label">REMARKS (optional)</span>
                        </div>
                        <div className="row">
                            <textarea id="remarks" name="remarks"  className="invoice-remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-end">
                    {paymentStatus == "paid" && printButton()}
                    <button className="save-btn" onClick={(e) => submit(e)}>SAVE PAYMENT </button>
                </div>
         </div>       
        )
    }

  function addInvoice() {
    setToAddInvoice(true);
  }

  if(redirect == true) {
      return (
        <Navigate to = {"/company-invoices"}/>
    )
  }

  return (
    <div>
      <Navbar/>
            <div className="active-cont">
            <Header type="thin" title="COMPANY INVOICES" addInvoice={handleShow}/>
                <ToastContainer/>
                {/* <h4 className="form-categories-header italic">COMPANY DETAILS</h4> */}

                <div className="po-details">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>COMPANY NAME</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>CONTACT NUMBER</div>
                        </div>
                        <div className="col-sm-4">
                            <div className='detail'>{contactNo}</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='label'>COMPANY EMAIL</div>
                        </div>
                        <div className="col-sm-3">
                            <div className='detail'>{email}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>COMPANY ADDRESS</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{address}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>CONTACT PERSON</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{contactPerson}</div>
                        </div>
                    </div>
                </div>

                {/* <h4 className="form-categories-header italic">INVOICE DETAILS</h4> */}

                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-start">
                        {hasPay == true && paymentDetails()}
                    </div>
                </div>

                <Table
                    type={'payment-invoices'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['INVOICE DATE','DISCOUNT CODE', 'PRICE', 'QTY', 'TOTAL']}
                    givenClass={'company-mobile'}
                    // setChecked={setChecked}
                />

                {grandTotal != null && grandTotal != 0 && (
                <div className="row">
                    <div className="col d-flex justify-content-end grand-total">
                        <span className="label">GRAND TOTAL: <b className="invoice-total">P {parseFloat(grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                </div>
                )}

               

                {haslogs == true && hasPay == false && (
                    <div className="payment-cont">
                    <h1 className="payment-label">ADD PAYMENT</h1>

                    <br/>

                    <span className="method-label">METHOD</span>
                    <input type="radio" id="cash" name="payment_method" value="cash" onClick={()=> setPayment('cash')}/>
                    <span className="cash method">CASH</span>
                    <input type="radio" id="check" name="payment_method" value="check" onClick={()=> setIsModalCheck(true)}/>
                    <span className="check method">CHECK</span>
                    <input type="radio" id="card" name="payment_method" value="card" onClick={()=> setPayment('card')}/>
                    <span className="check method">CARD</span>
                    <input type="radio" id="others" name="payment_method" value="others" onClick={()=> setPayment('others')}/>
                    <span className="check method">OTHERS</span>
                    
                  
                        <p>{payment === 'cash' && cashForm()}</p>
                        <p>{payment === 'check' && checkForm()}</p>
                        <p>{payment === 'card' && cardForm()}</p>
                        <p>{payment === 'others' && othersForm()}</p>
                 

                    <ToastContainer hideProgressBar={true}/>
                </div>
                
                )}
                
                 <div className="row pt-5">
                    <div className="col-sm-12 d-flex justify-content-center">
                        {hasPay == true && (printButton())}
                        {hasPay == false && (printInvoiceButton())}
                        {hasPay == false && (emailButton())}
                        {(printChargeSlip())}
                    </div>
                </div>
                
            </div>


            <Modal show={isprinted} onHide={handlePrintClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>PRINT SUCCESSFUL?</Modal.Title>
                </Modal.Header>
                  <form>
                  <Modal.Body>

                  <div className='row d-flex justify-content-center'>
                    Was printing successful?
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-yes-btn' onClick={() => printLog()}>
                          YES
                        </button>
                        <button type="submit" className='po-no-btn'>
                          NO
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>

            <Modal show={isModalCheck} onHide={handleCheckClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>PRINT INVOICE FIRST!</Modal.Title>
                </Modal.Header>
                  
                  <Modal.Body>

                  <div className='row d-flex justify-content-center'>
                  {hasPay == false && (printInvoiceButton())}
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-yes-btn' onClick={()=> setPayment('check')}>
                          YES
                        </button>
                        <button type="submit" className='po-no-btn'>
                          NO
                        </button>
                   </Modal.Footer>
                   
            </Modal>

            <Modal show={isprintedReceipt} onHide={handlePrintReceiptClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>PRINT SUCCESSFUL?</Modal.Title>
                </Modal.Header>
                  <form>
                  <Modal.Body>

                  <div className='row d-flex justify-content-center'>
                    Was printing successful?
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-yes-btn' onClick={() => ReceiptPrintLog()}>
                          YES
                        </button>
                        <button type="submit" className='po-no-btn'>
                          NO
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>EMAIL INVOICE TO:</Modal.Title>
              </Modal.Header>
              <form>
              <Modal.Body>
                
              <span className="label">EMAIL: </span>
              <input name="email" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)}/>


              </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={emailInvoice}>
                    EMAIL
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>

            <div
                style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                    > 
            
                        <InvoiceToPrint 
                            ref={componentRef} 
                            name={name}
                            contactNo={contactNo}
                            address={address}
                            contactPerson={contactPerson}
                            invoices={info}
                            grandTotal={grandTotal}
                            user={user}
                        />
                
                    </div>

            <div
                style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                    > 
            
                        <ReceiptToPrint 
                            ref={acknowledgementRef} 
                            name={name}
                            address={address}
                            paidAmount={paidAmount}
                            discountCode={discountCode}
                            discountDescription={discountDescription}
                            payments={payments}
                        />
                
            </div>

            <div style={{ display: "none" }}>
                  <ChargeSlip 
                    ref={chargeSlipRef}
                    data={chargeSlip}
                  />

            </div>
            {/* <ModalPopUp
                type="print-invoice"
                show={showModal}
                handleClose={() => setShowModal(false)}
            /> */}
    </div>
  );
}

export default AddInvoicePayment;
