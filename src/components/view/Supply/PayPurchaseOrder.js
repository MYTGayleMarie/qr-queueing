import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllLabServices, getAllPackages } from "../../../services/services";
import { Navigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';

//variables
const userToken = getToken();
const userId = getUser();

function PayPurchaseOrder() {

    document.body.style = 'background: white;';

    //States
    const [supplier, setSupplier] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [requisitioner, setRequisitioner] = useState("");
    const [forwarder, setForwarder] = useState("");
    const [status, setStatus] = useState("");
    const [payment, setPayment] = useState("");
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [pay, setPay] = useState(0);
    const [poItems, setPoItems] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [discount, setDiscount] = useState(0);
    const [seniorPwdId, setID] = useState("");
    const {id} = useParams();

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
    const [redirect, setRedirect] = useState(false);
    const [print, setPrint] = useState(false);

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'pos/show/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data)
               //format date
               var pDate = new Date(response.data.purchase_date);
               var dDate = new Date(response.data.delivery_date);

              axios({
                method: 'post',
                url: window.$link + 'suppliers/show/' + response.data.supplier_id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (response) {
                setSupplier(response.data.name);
            }).then(function (error) {
                console.log(error);
            })
            setPurchaseDate(pDate.toDateString());
            setDeliveryDate(dDate.toDateString());
            setDeliveryAddress(response.data.delivery_address);
            setRequisitioner(response.data.requisitioner);
            setForwarder(response.data.forwarder);
            setGrandTotal(response.data.grand_total);
            setDiscount(response.data.discount);
            setSubTotal(response.data.subtotal)
            setRemarks(response.data.remarks);
            setStatus(response.data.status);
          });

        axios({
            method: 'post',
            url: window.$link + 'pos/getPoItems/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data);
            
              response.data.map((data,index) => {
                
                if(data.status != "disapprove") {
                    var itemData = {};
                    itemData.id = data.id;
                    itemData.item = data.item;
                    itemData.qty = data.qty;
                    itemData.unit = data.unit;
                    itemData.amount = data.cost;
                    itemData.discount = data.discount;
      
                    setPoItems(oldArray => [...oldArray, itemData]);
                }
              });
          }).catch(function (error) {
              console.log(error);
          })
    },[]);

    //components
    const listItems = poItems.map((data,index) => {
        return (
        <div className="row">
            <div className="col-sm-3">
                {data.item}
            </div>
            <div className="col-sm-1">
                {parseFloat(data.qty).toFixed(2)}                
            </div>
            <div className="col-sm-1">
                {data.unit}
            </div>
            <div className="col-sm-1">
                {data.amount}
            </div>
            <div className="col-sm-2">
                {data.discount}
            </div>      
            <div className="col-sm-2">
                {parseFloat(data.qty * data.amount - data.discount).toFixed(2)}
            </div>
        </div>
        )
    });

    //Functions
    function submit (e) {
        e.preventDefault();
        if(payment === 'cash') {
            axios({
                method: 'post',
                url: window.$link + 'po_payments/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: window.$api_key, 
                    po_id: id,
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
                console.log(response)            
                toast.success("Payment Successful!");
                setPrint(true);
                setTimeout(function () {
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
                url: window.$link + 'po_payments/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: userToken.replace(/['"]+/g, ''), 
                    po_id: id,
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
                setPrint(true);
                setTimeout(function () {
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
                url: window.$link + 'po_payments/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: userToken.replace(/['"]+/g, ''), 
                    po_id: id,
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
                setPrint(true);
                setTimeout(function () {
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
                url: window.$link + 'po_payments/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: userToken.replace(/['"]+/g, ''), 
                    po_id: id,
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
                setPrint(true);
                setTimeout(function () {
                    setRedirect(true);
                  }, 2000);
            }).catch(function (error) {
                console.log(error);
                toast.error("Payment Unsuccessful!");
            });
        }
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
                                <span class="remarks-payment-label">REMARKS</span>
                            </div>
                            <div className="row">
                                <textarea id="remarks" name="remarks"  className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end">
                        {/* {print == true && printButton()} */}
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
                        <span class="remarks-payment-label">REMARKS</span>
                    </div>
                    <div className="row">
                        <textarea id="remarks" name="remarks" className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-end">
                {/* {print == true && printButton()} */}
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
                        <span class="remarks-payment-label">REMARKS</span>
                    </div>
                    <div className="row">
                        <textarea id="remarks" name="remarks" rows="4" className="remarks-input" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-end">
                {/* {print == true && printButton()} */}
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
                                <span class="remarks-payment-label">REMARKS</span>
                            </div>
                            <div className="row">
                                <textarea id="remarks" name="remarks"  className="remarks-input" rows="4" cols="100" onChange={(e) => setRemarks(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end">
                        {/* {print == true && printButton()} */}
                        <button className="save-btn" onClick={(e) => submit(e)}>SAVE BOOKING</button>
                    </div>
             </div>       
            )
        }

        if(redirect == true) {
            var link = "/review-purchase-order/" + id;
            return (
                <Navigate to = {link}/>
            )
        }    

  return (
      <div> 
          <Navbar/>
          <div className="active-cont">
          <Header
                type="thin"
                title="ADD PAYMENT"
          />
          <ToastContainer/>

          <h4 className="form-categories-header italic">PURCHASE ORDER DETAILS</h4>
            
            <div className="po-details">
                <div className="row">
                <div className="col-sm-2">
                        <div className='label'>SUPPLIER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{supplier}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>PURCHASE DATE</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{purchaseDate}</div>
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                            <div className='label'>DELIVERY ADDRESS</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='detail'>{deliveryAddress}</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='label'>DELIVERY DATE</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='detail'>{deliveryDate}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                            <div className='label'>REQUISITIONER</div>
                    </div>
                    <div className="col">
                            <div className='detail'>{requisitioner}</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='label'>FORWARDER</div>
                    </div>
                    <div className="col">
                            <div className='detail'>{forwarder}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                            <div className='label'>REMARKS</div>
                    </div>
                    <div className="col-sm-10">
                            <div className='detail'>{remarks}</div>
                    </div>
                </div>
            </div>
                <h5 className="form-categories-subheader italic">LIST OF PURCHASED ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-3 service">
                            ITEM
                        </div>
                        <div className="col-sm-1 service">
                            QTY
                        </div>
                        <div className="col-sm-1 service">
                            UNIT
                        </div>
                        <div className="col-sm-1 service">
                            AMOUNT
                        </div>
                        <div className="col-sm-2 service">
                            ITEM DISCOUNT
                        </div>
                        <div className="col-sm-2 service">
                            TOTAL
                        </div>
                    </div>

                    {listItems}

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>SUB TOTAL</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{parseFloat(subTotal).toFixed(2)}</b></div>
                        </div>
                    </div>

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>DISCOUNT</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{parseFloat(discount).toFixed(2)}</b></div>
                        </div>
                    </div>

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>GRAND TOTAL</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{parseFloat(grandTotal).toFixed(2)}</b></div>
                        </div>
                    </div>

                </div>

                <div className="payment-cont">
                    <h1 className="payment-label add-space">PAYMENT</h1>
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
                </div>
          </div>
      </div>
  );
}

export default PayPurchaseOrder;
