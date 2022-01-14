import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllLabServices, getAllPackages } from "../../../services/services";
import { Navigate } from 'react-router-dom';

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

function AddPayment() {

    document.body.style = 'background: white;';

    const [payment, setPayment] = useState("");
    const [total, setTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [pay, setPay] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [discount, setDiscount] = useState(0);
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
    const [seniorPwdId, setID] = useState("");

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

    //others states
    const [source, setSource] = useState("");
    const [reference, setReference] = useState("");
    const [redirect, setRedirect] = useState(false);

    //add Test states
    const [addTestType, setAddTestType] = useState("");
    const [test, setTest] = useState("");

    //Modal
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [serviceId, setServiceId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemoveClose = () => setShowRemove(false);
    const handleRemoveShow = () => setShowRemove(true);

    function handleRemove(service_id) {
        handleRemoveShow();
        setServiceId(service_id);
    }

    var amount = 0;

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
            setTotal(response.data.total_amount);
            setGrandTotal(response.data.total_amount);
            totalAmount = response.data.total_amount;
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
    }, []);
   
    React.useEffect(() => {
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
            console.log(booking.data)
            setServices(booking.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    function removeService() {
        axios({
            method: 'post',
            url: window.$link + 'Bookingdetails/delete/' + serviceId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                updated_by: userId,
                booking: id,
            }
        }).then(function (booking) {
            console.log(booking.data);
            setServices(services);
            setTotal(total);
            handleRemoveClose();
        }).catch(function (error) {
            console.log(error);
            handleRemoveClose();
        });

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
            console.log(booking.data)
            setServices(booking.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function showAvailableLab() {
        const labServices = getAllLabServices();
        const orderedServices = labServices.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        return (
            <div>
                <label for="input-label">TEST:</label>
                <select className="input-select" id="test" name="test" onChange={(e) => setTest(e.target.value)}>
                    <option value="" selected disabled hidden>CHOOSE CLINICAL SERVICE</option>
                    {orderedServices.map((option,index) => (
                        <option value={option.labTestId + "_" + option.price + "_" + option.type}>{option.name}</option>
                    ))}
                </select> 
            </div> 
        )
    }

    function showAvailablePackages() {
        const packages = getAllPackages();
        const orderedServices = packages.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        return (
                <div>
                <label for="input-label">TEST:</label>
                <select className="input-select" id="test" name="test" onChange={(e) => setTest(e.target.value)}>
                    <option value="" selected disabled hidden>CHOOSE PACKAGE</option>
                    {orderedServices.map((option,index) => (
                        <option value={option.labTestId + "_" + option.price + "_" + option.type}>{option.name}</option>
                    ))}
                </select>  
                </div>
        )
    }

    function addService() {
        const key = test.split("_");
        const testId = key[0];
        const price = key[1];
        const type = key[2];

        var extractedDates = [];
        var testStarts = [];
        var testFinishes = [];
        var resultDates = []; 
        var fileResults = [];

        if (type == "lab") {
            axios({
                method: 'post',
                url: window.$link + 'Bookingdetails/add/' + id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    type: type, 
                    lab_tests: [testId],
                    lab_prices: [price],
                    status: 'PENDING',
                    lab_extracted_dates: [],
                    lab_test_starts: [],
                    lab_test_finishes: [],
                    lab_result_dates: [],
                    lab_file_results: [],
                    added_by: userId,
                }
            }).then(function (booking) {
                console.log(booking);
            }).catch(function (error) {
                console.log(error);
            });
        }
        else if (type == "package") {
            axios({
                method: 'post',
                url: window.$link + 'Bookingdetails/add/' + id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    type: type, 
                    package_tests: [testId],
                    package_prices: [price],
                    status: 'PENDING',
                    package_extracted_dates: [],
                    package_test_starts: [],
                    package_test_finishes: [],
                    package_result_dates: [],
                    package_file_results: [],
                    added_by: userId,
                }
            }).then(function (booking) {
                console.log(booking);
            }).catch(function (error) {
                console.log(error);
            });
        }
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
                setTimeout(function() {
                    setRedirect(true);
                }, 2000)
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
                setTimeout(function() {
                    setRedirect(true);
                }, 2000)
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
                setTimeout(function() {
                    setRedirect(true);
                }, 3000)
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
                setTimeout(function() {
                    setRedirect(true);
                }, 2000)
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
                <button className="save-btn">SAVE BOOKING</button>
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
                        <button className="save-btn">SAVE BOOKING</button>
                    </div>
             </div>       
            )
        }

        if(redirect == true) {
            return (
                <Navigate to = "/cashier"/>
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


        <Costing
            data={services}
            deleteService={handleRemove}
            withDiscount={seniorPwdId}
            total={total}
            setTotal={setTotal}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
            setDiscount={setDiscount}
         />


        <div className="row">
            <div className="col-sm-9 d-flex justify-content-end">
                <button className="add-tests-btn" onClick={handleShow}>ADD TESTS</button>
            </div>
        </div>

                <div className="payment-cont">
                    <h1 className="payment-label">PAYMENT</h1>

                    <div className="row">
                        <div className="col-sm-3">
                            <span className="discount-header method-label">DISCOUNT</span>
                        </div>

                        <div className="col-sm-9">
                            <select name="discount_id" className="discount-option">
                                <option>None</option>
                                <option>SENIOR/PWD Discount</option>
                                <option>Friends and Family Discount</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <span className="discount-header method-label">DISCOUNT DETAILS</span>
                        </div>

                        <div className="col-sm-9">
                            <input type="text" id="discount_details" name="discount_details" className="discount-details-input" onChange={(e) => setID(e.target.value)} />
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

                    <form onSubmit={(e) => submit(e)}>
                        <p>{payment === 'cash' && cashForm()}</p>
                        <p>{payment === 'check' && checkForm()}</p>
                        <p>{payment === 'card' && cardForm()}</p>
                        <p>{payment === 'others' && othersForm()}</p>
                    </form>

                    <ToastContainer hideProgressBar={true}/>

                    

                <Modal show={showRemove} onHide={handleRemoveClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>SUBMIT</Modal.Title>
                    </Modal.Header>
                    <form>
                    <Modal.Body>Are you sure you want to remove service?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleRemoveClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={removeService}>
                        Submit
                    </Button>
                    </Modal.Footer>
                    </form>
                </Modal>

                <Modal show={show} onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 add-test-header'>ADD TESTS</Modal.Title>
                    </Modal.Header>
                    <form>
                    <Modal.Body>
                    <label for="input-label">SERVICE:</label>

                    <select className="input-select" id="service" name="service" onChange={(e) => setAddTestType(e.target.value)}>
                    <option value="" selected disabled hidden>CHOOSE TYPE</option>
                    <option value="CLINICAL SERVICES">CLINICAL SERVICES</option>
                    <option value="PACKAGES">PACKAGES</option>
                    </select>
                    
                    <br/>
                   
                    <p>{addTestType === 'CLINICAL SERVICES' && showAvailableLab()}</p>
                    <p>{addTestType === 'PACKAGES' && showAvailablePackages()}</p>
                  


                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="add-tests-btn" onClick={() => addService()}>
                        Submit
                    </button>
                    </Modal.Footer>
                    </form>
                </Modal>
                    
                </div>



            </div>
        </div>
    )
}

export default AddPayment
