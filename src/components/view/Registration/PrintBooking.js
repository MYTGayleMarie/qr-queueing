import React, { useState, useRef  } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import { PaymentToPrint } from "../Cashier/PaymentToPrint.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

function PrintBooking() {
    document.body.style = 'background: white;';

       //booking details
       const [payment, setPayment] = useState("");
       const [total, setTotal] = useState(0);
       const [grandTotal, setGrandTotal] = useState(0);
       const [pay, setPay] = useState(0);
       const [remarks, setRemarks] = useState("");
       const [discount, setDiscount] = useState(0);
       const [encodedOn, setEncodedOn] = useState("");
       const [labTests, setLabTests] = useState([])
       const [packages, setPackages] = useState([])

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
       const [seniorPwdId, setID] = useState("");
       const [patientId, setPatientId] = useState("");
       const [discountCode, setDiscountCode] = useState("");
       const [companyCode, setCompanyCode] = useState("");

       //other states
       const [redirect, setRedirect] = useState(false);
       const [printReadyFinal, setPrintReadyFinal] = useState(false);
       const handleRedirect = () => setRedirect(true);


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
            // console.log(response.data.payment_type)
            setEncodedOn(response.data.added_on);
            setBookingDate(response.data.booking_time);
            setPayment(response.data.payment_type);
            setResult(response.data.result);
            setTotal(response.data.total_amount);
            setDiscount(response.data.discount);
            setGrandTotal(response.data.grand_total);
            if(response.data.discount_code!==""){
                setDiscountCode(response.data.discount_code);
            } else {
                setDiscountCode("None")
            }

            
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
                var age = presentDate.getFullYear() - birthDate.getFullYear();
                var m = presentDate.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) 
                {
                    age--;
                }
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

            //company code
            if (response.data.company_contract_id == true){
                axios({
                    method: 'post',
                    url: window.$link + 'company_contracts/show/'+response.data.company_contract_id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (contracts) {
                    //console.log(contracts)
                    setCompanyCode(contracts.data.company_code);
                }).catch(function (error) {
                    console.log(error);
                }) 
            } else {
                setCompanyCode("None");
            }          

        
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
        const [queueNumber, setQueueNumber] = useState("");
        const [print, setPrint] = useState(true);
        

        //Print Services
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
            }).catch(function (error) {
                console.log(error);
            });
        }, []);

        React.useEffect(() => {
            printServices.length = 0;
            labTests.length=0
            packages.length=0
            services.map((info, index1) => {
              
              // console.log(info)
                if(info.type=== "package") {
                  let packageInfo = {}
                  packageInfo.name= info.package
                  packageInfo.qty = "1"
                  packageInfo.price = info.price
                  packageInfo.details = ""
                    axios({
                        method: 'post',
                        url: window.$link + 'bookings/getBookingPackageDetails/' + info.id,
                        withCredentials: false, 
                        params: {
                            api_key: window.$api_key,
                            token: userToken.replace(/['"]+/g, ''),
                            requester: userId,
                        }
                    }).then(function (response) {
                        response.data.map((packageCat, index2) => {
                        // console.log(packageCat)
                        if(index2<response.data.length-1){
                          packageInfo.details+=packageCat.lab_test+", "
                        } else {
                          packageInfo.details+=packageCat.lab_test
                        }
                        
                            var serviceDetails = {};
                            axios({
                                method: 'post',
                                url: window.$link + 'categories/show/' + packageCat.category_id,
                                withCredentials: false, 
                                params: {
                                    api_key: window.$api_key,
                                    token: userToken.replace(/['"]+/g, ''),
                                    requester: userId,
                                }
                            }).then(function (category) {
                                if(category.data.name == "Electrolytes (NaKCl,iCA)") {
                                    serviceDetails.key = "Electrolytes";
                                }
                                else {
                                    serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
                                }
                                serviceDetails.category = category.data.name;
                                serviceDetails.name = packageCat.lab_test;
                                console.log(serviceDetails)
                                setPrintServices(oldArray => [...oldArray, serviceDetails]);

                            }).catch(function (error) {
                                console.log(error);
                            })
                        });
                    });
                  setPackages(prev=>[...prev, packageInfo])

                } else {
                    axios({
                        method: 'post',
                        url: window.$link + 'categories/show/' + info.category_id,
                        withCredentials: false, 
                        params: {
                            api_key: window.$api_key,
                            token: userToken.replace(/['"]+/g, ''),
                            requester: userId,
                        }
                    }).then(function (category) {
                        
                        var serviceDetails = {};
                        if(category.data.name == "Electrolytes (NaKCl,iCA)") {
                            serviceDetails.key = "Electrolytes";
                        }
                        else {
                            serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
                        }
                        serviceDetails.category = category.data.name;
                        serviceDetails.name = info.lab_test;
                        let labTest={name:info.lab_test, qty:"1", price:info.price}
                        setPrintServices(oldArray => [...oldArray, serviceDetails]);
                        setLabTests(prev=>[...prev, labTest])
                    }).catch(function (error) {
                        console.log(error);
                    })

                    if(services.length - 1 == index1) {
                        setPrintReadyFinal(true);
                    }
                }
            });
        },[services]);


        React.useEffect(() => {
            var presentDate = new Date();
            var formattedPresentData = presentDate.toISOString().split('T')[0];
            queue.length = 0;
              //Queue
              axios({
                method: 'post',
                url: window.$link + 'bookings/getAll',
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  requester: userId,
                  date_from: formattedPresentData,
                  date_to: formattedPresentData,
                },
              }).then(function (response) {
                //   console.log(response)
                  const arrangedObj = response.data.bookings.sort((a,b) => a.id - b.id);
             
                  arrangedObj.map((booking,index) => {
                    //   console.log(booking.id)
                    var bookingInfo = {};
                    bookingInfo.queue = index;
                    bookingInfo.id = booking.id;
                    setQueue(oldArray => [...oldArray, bookingInfo]);
                  });
    
              })
        },[]);

    
        React.useEffect(() => {
            queue.map((data, index) => {
                if(data.id == id) {
                    setQueueNumber(data.queue.toString());
                }
              });
    
              if(queueNumber == "") {
                  setQueueNumber("0");
              }
        },[queue]);

        const componentRef = useRef();
        const handlePrint = useReactToPrint({
          onAfterPrint: handleRedirect,
          content: () => componentRef.current,
          pageStyle: () => `
          @page { size: letter;}
          @media print {
            .print-break {
              margin-top: 1rem;
              display: block;
              page-break-before: always;
            }
          }
          `,
    
        });
    

    function printButton() {
        return (
            <button className="save-btn" onClick={handlePrint}>
            <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                PRINT
            </button>
        ) 
    }


    if(redirect == true) {
        return <Navigate to="/registration" />;
    }
    
    // console.log(printServices)
    // console.log(packages)
  return (
      <div>
 <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='BOOKING DETAILS' 
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

            <div
                style={{ display: "none" }}// This make ComponentToPrint show   only while printing
            > 
                    <PaymentToPrint 
                        bookingID={id}
                        ref={componentRef} 
                        patientId = {patientId}
                        name={lastName + ", " + firstName + " " + middleName}
                        birthdate={birthDate}
                        gender={gender}
                        age={age}
                        contact={contactNo}
                        address={address}
                        bookingDate={bookingDate}
                        payment={payment}
                        result={result}
                        services={printServices}
                        encodedOn={encodedOn}
                        queue={queueNumber}
                        isCompany={true}
                        discount = {discount}
                        discountCode={discountCode}
                        grandTotal={grandTotal}
                        labTests={labTests}
                        packages = {packages}
                        setPrintReadyFinal = {setPrintReadyFinal}
                    />
            </div>

             <div className="row d-flex justify-content-center booking-print">
                {queueNumber != "" && printReadyFinal == true && (
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-end">
                        {printButton()}
                    </div>
                </div>)}

                {printReadyFinal == false && (
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-end">
                        <button className="save-btn">Loading Data...</button>
                    </div>
                </div>)}
            </div>      
        </div>
      </div>
  );
}

export default PrintBooking;
