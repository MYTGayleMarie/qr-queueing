import React, { useState, useRef  } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import { PaymentToPrint } from "../Cashier/PaymentToPrint.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from 'react-router-dom';

//css
import './PrintBooking.css'

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Costing from '../../Costing';

//variables
const presentDate = new Date();
const userToken = getToken();
const userId = getUser();

function QMDeleteBooking() {
    document.body.style = 'background: white;';

       //booking details
       const [payment, setPayment] = useState("");
       const [total, setTotal] = useState(0);
       const [grandTotal, setGrandTotal] = useState(0);
       const [pay, setPay] = useState(0);
       const [remarks, setRemarks] = useState("");
       const [discount, setDiscount] = useState(0);
       const [encodedOn, setEncodedOn] = useState("");
       const [bookingDetailsId, setBookingDetailsId] = useState("");

       //customer details
       const {id} = useParams();
       const [firstName, setFirstName] = useState("");
       const [middleName, setMiddleName] = useState("");
       const [lastName, setLastName] = useState("");
       const [birthDate, setBirthDate] = useState("");
       const [gender, setGender] = useState("");
       const [age, setAge] = useState("");
       const [contactNo, setContactNo] = useState("");
       const [email, setEmail] = useState("");
       const [address, setAddress] = useState("");
       const [patientId, setPatientId] = useState("");


       //other states
       const [redirect, setRedirect] = useState(false);


       //get customer details
       React.useEffect(() => {
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
            console.log(response)
            // console.log(response.data)
            //setBookingDate(response.data.booking_time);
            //setPayment(response.data.payment_type);
            //setResult(response.data.result);
            setTotal(response.data.total_amount);
            setDiscount(response.data.discount);
            setGrandTotal(response.data.grand_total);
            
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
                // console.log(customer)
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
                setPatientId(response.data.customer_id);
    
            }).catch(function (error) {
                console.log(error);
            });          

        
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

        //services
        const [services, setServices] = useState([]);
        const [bookingDate, setBookingDate] = useState("");
        const [result, setResult] = useState("");
        const [printServices, setPrintServices] = useState([]);
        const [queue, setQueue] = useState([]);
        

        //Services List
        React.useEffect(() => {
            services.length = 0;
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
                // console.log(booking)      
                setServices(booking.data);
                setBookingDetailsId(booking.data[0].id)
            }).catch(function (error) {
                console.log(error);
            });
            // payment
            axios({
                method: 'post',
                url: window.$link + 'payments/getAll',
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (response) {      
                // console.log(response) 
            }).catch(function (error) {
                console.log(error);
            });

        }, []);
    

    function handleDelete(){
      // console.log("delete "+id)
      axios({
                method: 'post',
                url: window.$link + 'bookings/delete/' + id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    updated_by: userId,
                }
            }).then(function (booking) {      
                // console.log(booking) 
                toast.success("Booking successfully deleted!");
                setTimeout(function () {
                    setRedirect(true);
                }, 2000);
            }).catch(function (error) {
                console.log(error);
            });
    }
       if(redirect == true) {
        return <Navigate to="/registration" />;
    }

    function deleteButton(){
      return(
        <button className="save-btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} alt={"trash"} aria-hidden="true" className="print-icon"/>
          DELETE BOOKING
        </button>
      )
    }


    

  return (
      <div>
      <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='DELETE BOOKING' 
            />
            <ToastContainer/>
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

            <h1 className="test-header">LABORATORY TESTS</h1>

            <Costing
            data={services}
            total={total}
            setTotal={setTotal}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
            setDiscount={setDiscount}
            discount={discount}
            toPay={false}
            />
            
            <div className="row d-flex justify-content-center booking-print">
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-end">
                      {deleteButton()}
                  </div>
                </div>
            </div>      
        </div>
      </div>
  );
}

export default QMDeleteBooking;
