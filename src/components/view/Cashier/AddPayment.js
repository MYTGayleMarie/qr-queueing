import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddPayment.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import PersonalDetails from '../../PersonalDetails';
import Costing from '../../Costing';

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

var serviceData = [];


function AddPayment() {

    const [payment, setPayment] = useState("");
    const [total, setTotal] = useState(0);
    const [pay, setPay] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [customer, setCustomer] = useState("");
    const [type, setType] = useState("");
    const {id} = useParams();

    //customer details
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    //services
    const [services, setServices] = useState([]);

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

    var amount = 0;

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
        setTotal(response.data.total_amount);
        setDiscount(response.data.discount);
        setCustomer(response.data.customer_id);
        setType(response.data.type);

        axios({
            method: 'post',
            url: window.$link + 'customers/show/' + userId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (customer) {
            var presentDate = new Date();
            var birthDate = new Date(customer.data.birthdate);
            const age = presentDate.getFullYear() - birthDate.getFullYear();
            setFirstName(customer.data.first_name);
            setMiddleName(customer.data.middle_name);
            setLastName(customer.data.last_name);
            setBirthDate(birthDate.toDateString());
            setGender(customer.data.gender);
            setAge(age);
            setContactNo(customer.data.contact_no);
            setEmail(customer.data.email);
            setAddress(customer.data.address);

        }).catch(function (error) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });

    function showCosting() {
        axios({
            method: 'post',
            url: window.$link + 'bookings/getBookingDetails/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            
        }).catch(function (error) {
            console.log(error);
        });

    }


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
                    amount: total,
                    remarks: 'testing',
                    added_by: 1,
                }
            }).then(function (response) {

                var date = new Date();

                // axios({
                //     method: 'post',
                //     url: window.$link + 'bookings/update',
                //     withCredentials: false,
                //     params: {
                //         token: userToken.replace(/['"]+/g, ''),
                //         api_key: window.$api_key, 
                //         customer_id: customer,
                //         payment_type: payment,
                //         type: type,
                //         remarks: 'testing',
                //         updated_by: date,
                //     }
                // }).then (function (message) {
                //     console.log(message);
                // })
                
                toast.success("Payment Successful!");
                setTimeout(function() {
                    refreshPage();
                }, 3000)
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
                    amount: pay,
                    check_no: checkNo,
                    check_bank: checkBank,
                    check_date: checkDate,
                    remarks: 'testing',
                    added_by: 1,
                }
            }).then(function (response) {
                console.log(response);
                toast.success("Payment Successful!");
                setTimeout(function() {
                    refreshPage();
                }, 3000)
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
                    amount: pay,
                    cardName: cardName,
                    card_no: cardNo,
                    card_type: cardType,
                    card_expiry: cardExpiry,
                    card_bank: cardBank,
                    remarks: 'testing',
                    added_by: 1,
                }
            }).then(function (response) {
                console.log(response);
                toast.success("Payment Successful!");
                setTimeout(function() {
                    refreshPage();
                }, 3000)
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
                                <input type="number" id="changeAmount" name="changeAmount" class="cash-input pay" value={(total-pay).toFixed(2)}  placeholder="P"/>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end">
                        <button className="save-btn">SAVE BOOKING</button>
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
            <div className="row d-flex justify-content-end">
                <button className="save-btn">SAVE BOOKING</button>
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
            <div className="row d-flex justify-content-end">
                <button className="save-btn">SAVE BOOKING</button>
            </div>
        </div>
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

        <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

        <div className="personal-data-cont">
        <div className="row">
            <div className="col-sm-4">
            <span className="first-name label">FIRST NAME</span>
            <span className="first-name detail">{firstName.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
            <span className="last-name label">LAST NAME</span>
            <span className="last-name detail">{lastName.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
            <span className="middle-name label">MIDDLE NAME</span>
            <span className="middle-name detail">{middleName.toUpperCase()}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
            <span className="date-of-birth label">DATE OF BIRTH</span>
            <span className="date-of-birth detail">{birthDate}</span>
            </div>
            <div className="col-sm-4">
            <span className="sex label">SEX</span>
            <span className="sex detail">{gender.toUpperCase()}</span>
            </div>
            <div className="col-sm-4">
            <span className="age label">AGE</span>
            <span className="age detail">{age}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
            <span className="contact-number label">CONTACT NUMBER</span>
            <span className="contact-number detail">{contactNo}</span>
            </div>
            <div className="col-sm-4">
            <span className="email label">EMAIL</span>
            <span className="email detail">{email}</span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
            <span className="address label">ADDRESS</span>
            <span className="address detail">{address.toUpperCase()}</span>
            </div>
        </div>
        </div>


                {/* <Costing
                    data={costingData}
                /> */}

            <div className="summary-total">
            <div className="row">
                    <div className="col-sm-4">
                        <span class="summary-total-label">BOOKING ID</span>
                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <span className="amount">{id}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span class="summary-total-label">DISCOUNT</span>
                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <span className="amount">P {discount}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <span class="summary-total-label">TOTAL AMOUNT </span>
                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <span className="amount">P {total}</span>
                    </div>
                </div>
            </div>

                <div className="payment-cont">
                    <h1 className="payment-label">PAYMENT</h1>

                    <span className="method-label">METHOD</span>
                    <input type="radio" id="cash" name="payment_method" value="cash" onClick={()=> setPayment('cash')}/>
                    <span className="cash method">CASH</span>
                    <input type="radio" id="check" name="payment_method" value="check" onClick={()=> setPayment('check')}/>
                    <span className="check method">CHECK</span>
                    <input type="radio" id="card" name="payment_method" value="card" onClick={()=> setPayment('card')}/>
                    <span className="check method">CARD</span>

                    <form onSubmit={(e) => submit(e)}>
                        <p>{payment === 'cash' && cashForm()}</p>
                        <p>{payment === 'check' && checkForm()}</p>
                        <p>{payment === 'card' && cardForm()}</p>
                    </form>

                    <ToastContainer hideProgressBar={true}/>
                    
                </div>



            </div>
        </div>
    )
}

export default AddPayment
