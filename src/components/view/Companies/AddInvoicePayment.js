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


function AddInvoicePayment() {
  document.body.style = 'background: white;';

  //Invoice details
  const {id, companyId} = useParams();
  const [redirect, setRedirect] = useState(false);
  const [info, setInfo] = useState([]);
  const [checked, setChecked] = useForm(checkedData);
  const [haslogs, setHasLogs] = useState(true);
  const [paidAmount, setPaidAmount] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [payments, setPayments] = useState("");

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
      console.log(company);

      setName(company.data.name);
      setContactNo(company.data.contact_no);
      setEmail(company.data.company_email);
      setAddress(company.data.address);
      setContactPerson(company.data.contact_person);

    }).then(function(error) {
      console.log(error);
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
            console.log(response);

            if(response.data.status == 404) {
                setHasLogs(false);
            } else {
                var array = response.data.data.logs.filter((info) => info.type == "print" || (info.type == "email" && info.response == "Email successfully sent"))

                if(array.length == 0) {
                    setHasLogs(false);
                }

                console.log(array);
            }

      }).then(function(error) {
        console.log(error);
      });
  },[]);

  React.useEffect(() => {
    info.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'company_invoices/show/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      console.log(response);
      var invoice = response.data.data.company_invoice;
      var payments = response.data.data.payments;
    //   response.data.data.company_invoices.filter((info) => info.is_paid != 1).map((data,index) => {
        var info = {};
        info.id = invoice.id;
        info.code = invoice.discount_code;
        info.price = invoice.price;
        info.total = invoice.total;

        const promisePrint = new Promise((resolve,reject) => {
            resolve('Success');
            setGrandTotal(invoice.total);
            setDiscountCode(invoice.discount_code);
            setPaidAmount(invoice.paid_amount);
            setPayments(payments);
            setHasPay(invoice.paid_amount != "0.00" || invoice.paidAmount != null ? true : false);
            setInfo(oldArray => [...oldArray, info]);
        }); 

        promisePrint.then((value) => {
            console.log(value);
            setPrintData(true);
        })
        
    //   });

    }).then(function(error) {
      console.log(error);
    });
  },[]);

//   React.useEffect(() => {

//     for (let [key, value] of Object.entries(checked)) {
//         var grandTotal = 0;
//         if(value != false) {
//             var obj = info[key];
//             if(info[key].total != null) {
//                 grandTotal += parseFloat(obj.total);
//             }
//         }
//     }
//     setGrandTotal(grandTotal);

//   },[checked]);

  function submit (e) {
    e.preventDefault();

    var invoice_nos = [];
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
                invoice_nos: [info[0].id],
                prices: [info[0].price],
                totals: [info[0].total], 
                type: payment,
                amount: grandTotal,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grand_total: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            console.log(response)            
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
                invoice_nos: [info[0].id],
                prices: [info[0].price],
                totals: [info[0].total], 
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
            console.log(response);
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
                invoice_nos: [info[0].id],
                prices: [info[0].price],
                totals: [info[0].total], 
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
            console.log(response);
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
                invoice_nos: [info[0].id],
                prices: [info[0].price],
                totals: [info[0].total], 
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
            console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
      });
  }

  //Invoice Print
  function printInvoiceButton() {
        return (
            <button className="save-btn" onClick={handlePrint}>
            <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                PRINT INVOICE
            </button>
        ) 
    }

    //Acknowledgement Print
    function printButton() {
        return (
            <button className="save-btn" onClick={printData == false ? "" : handleAcknowledgePrint}>
            <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                {printData == false ? "Loading Data..." : "PRINT RECEIPT"}
            </button>
        ) 
    }

    function emailButton() {
        return (
            <button className="save-btn" onClick={handleShow}>
            <FontAwesomeIcon icon={"envelope"} alt={"email"} aria-hidden="true" className="print-icon"/>
                EMAIL
            </button>
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
                <h4 className="form-categories-header italic">COMPANY DETAILS</h4>

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
                        <div className="col-sm-3">
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

                <h4 className="form-categories-header italic">INVOICE DETAILS</h4>

                <Table
                    type={'payment-invoices'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['INVOICE NO.', 'DISCOUNT CODE', 'PRICE', 'TOTAL']}
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

                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-center">
                        {hasPay == true && (printButton())}
                        {hasPay == false && (printInvoiceButton())}
                        {hasPay == false && (emailButton())}
                    </div>
                </div>
                
                {haslogs == true && hasPay == false && (
                    <div className="payment-cont">
                    <h1 className="payment-label">PAYMENT</h1>

                    <br/>

                    <span className="method-label">METHOD</span>
                    <input type="radio" id="cash" name="payment_method" value="cash" onClick={()=> setPayment('cash')}/>
                    <span className="cash method">CASH</span>
                    <input type="radio" id="check" name="payment_method" value="check" onClick={()=> setPayment('check')}/>
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
                            payments={payments}
                        />
                
                    </div>

    </div>
  );
}

export default AddInvoicePayment;
