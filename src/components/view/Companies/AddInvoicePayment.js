import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();

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
  const {id} = useParams();
  const [redirect, setRedirect] = useState(false);
  const [info, setInfo] = useState([]);

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

  //check states
  const [checkNo, setCheckNo] = useState("");
  const [checkBank, setCheckBank] = useState("");
  const [checkDate, setCheckDate] = useState("");

  //card states
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardBank, setCardBank] = useState("");

  //others states
  const [source, setSource] = useState("");
  const [reference, setReference] = useState("");
  const [print, setPrint] = useState(false);


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => "@page { size: letter;}"

  });

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'companies/show/' + id,
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
    info.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'company_invoices/getAllByCompany/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      console.log(response.data.company_invoices);

      response.data.company_invoices.map((data,index) => {
        var info = {};
        info.id = data.id;
        info.code = data.discount_code;
        info.price = "P " + data.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        info.total = "P " + data.total.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        setInfo(oldArray => [...oldArray, info]);
        
      });

    }).then(function(error) {
      console.log(error);
    });
  },[]);

  function submit (e) {
    e.preventDefault();
    if(payment === 'cash') {
        axios({
            method: 'post',
            url: window.$link + 'payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                booking: id,
                type: payment,
                amount: grandTotal,
                senior_pwd_id: seniorPwdId,
                discount: discount,
                grand_total: grandTotal,
                remarks: remarks,
                added_by: userId,
            }
        }).then(function (response) {
            var date = new Date();                
            toast.success("Payment Successful!");
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'check') {
        axios({
            method: 'post',
            url: window.$link + 'payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                booking: id,
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
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'card') {
        axios({
            method: 'post',
            url: window.$link + 'payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                booking: id,
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
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
    if(payment === 'others') {
        axios({
            method: 'post',
            url: window.$link + 'payments/create',
            withCredentials: false, 
            params: {
                token: userToken,
                api_key: window.$api_key, 
                booking: id,
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
        }).catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
        });
    }
}

  function printButton() {
    return (
        <button className="save-btn" onClick={handlePrint}>
        <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
            PRINT
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
                            <textarea id="remarks" name="remarks"  className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-end">
                    {paymentStatus == "paid" && printButton()}
                    <button className="save-btn" onClick={(e) => submit(e)}>SAVE BOOKING</button>
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
                    <textarea id="remarks" name="remarks" className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-end">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>SAVE BOOKING</button>
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
                    <textarea id="remarks" name="remarks" rows="4" className="remarks-input" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-end">
            {paymentStatus == "paid" && printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>SAVE BOOKING</button>
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
                            <textarea id="remarks" name="remarks"  className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-end">
                    {paymentStatus == "paid" && printButton()}
                    <button className="save-btn" onClick={(e) => submit(e)}>SAVE BOOKING</button>
                </div>
         </div>       
        )
    }

  function addInvoice() {
    setToAddInvoice(true);
  }

  function addPayment() {
    setToAddPayment(true);
  }

  if(toAddInvoice == true) {
    return (
      <Navigate to ={"/add-invoice/" + id + "/" + selectedCode}/>
    )
  }else if(toAddPayment == true) {
    return (
      <Navigate to = {"/add-invoice-payment/" + id}/>
    )
  }

  if(redirect == true) {
      return (
        <Navigate to = "/company-invoices"/>
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

                <h4 className="form-categories-header italic">INVOICES</h4>

                <Table
                    clickable={true}
                    type={'companies-review'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['INVOICE NO.', 'DISCOUNT CODE', 'PRICE', 'TOTAL']}
                    // filteredData={filteredData}
                    // setFilter={setFilter}
                    // filter={filter}
                    givenClass={'company-mobile'}
                />

                <div className="row">
                    <div className="col d-flex justify-content-end grand-total">
                        <span className="label">GRAND TOTAL: <b className="invoice-total">P 5,000.00</b></span>
                    </div>
                </div>

                <div className="payment-cont">
                    <h1 className="payment-label">PAYMENT</h1>

                    <div className="row">
                        <div className="col-sm-3">
                            <span className="discount-header method-label">DISCOUNT</span>
                        </div>

                        <div className="col-sm-9">
                            <span className="amount">{"P " + parseFloat(discount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) + ""}</span>
                        </div>
                    </div>
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
                    
                    {/* <form> */}
                        <p>{payment === 'cash' && cashForm()}</p>
                        <p>{payment === 'check' && checkForm()}</p>
                        <p>{payment === 'card' && cardForm()}</p>
                        <p>{payment === 'others' && othersForm()}</p>
                    {/* </form> */}

                    <ToastContainer hideProgressBar={true}/>

                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>ADD INVOICE</Modal.Title>
              </Modal.Header>
              <form>
              <Modal.Body>
                
              <span>Choose discount code to add invoice:</span>
              <select name="discountCode" className="invoice-select" value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
                <option value="" disabled selected>Select</option>
                {discountCodes != "" && discountCodes.map((data,index) => {
                  return (
                    <option value={data.id}>{data.discount_code}</option>
                  )
                })}
              </select>


              </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={addInvoice}>
                    Go
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>

    </div>
  );
}

export default AddInvoicePayment;
