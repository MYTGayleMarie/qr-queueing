import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './LaboratoryTests.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';

const presentDate = new Date();
const userToken = getToken();
const userId = getUser();
const xrayId = 18;


function LaboratoryTests() {
    document.body.style = 'background: white;';

    const [inputBox, setExtraction] = useState(false);
    const [ExtractionInfo, setStartExtraction] = useState([]);

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
  
      //services
      const [services, setServices] = useState([]);
      const [packages, setPackages] = useState([]);
      const [packageServices, setPackageServices] = useState([]);

      //message
      const [message, setMessage] = useState();
      const [pendingLab, setPendingLab] = useState([]);
      const [pendingPack, setPendingPack] = useState([]);
      const [pendingPackServices, setPendingPackServices] = useState([]);


    const toggleExtraction = () => {
        setExtraction(!inputBox);

        if(inputBox == true) {
            ExtractionInfo.length = 0;
        }
    };

    const showPending = (pendingLab, pendingPackServices) => {
        var message = "PENDING:" + "\n\n"; 

        if(pendingLab.length == 0 && pendingPackServices == 0) {
            return;
        }

        if(pendingLab.length != 0) {
            message += "\n\n (LAB SERVICES):\n";
            pendingLab.map((info,index) => {
                if(pendingLab.length == index) {
                    message += info.lab_test + "\n";
                } else {
                    message += info.lab_test + ",\n";
                }
            });
        }

        if(pendingPackServices.length != 0) {
            message += "\n\n (PACKAGE SERVICES):\n";
            pendingPackServices.map((info,index) => {
                if(pendingLab.length == index) {
                    message += info.lab_test + "\n";
                } else {
                    message += info.lab_test + ",\n";
                }
            });
        }

        toast.success(message);
    
    };


    const updateExtraction = () => {

        ExtractionInfo.map((row, index) => {

            if(row.type == "lab") {
                axios({
                    method: 'post',
                    url: window.$link + 'Bookingdetails/updateExtraction/' + row.id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        booking: id,
                        status: 'for examination',
                        extracted_on: presentDate, 
                        updated_by: userId,
                    }
                }).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                    toast.error("Oops! Something went wrong...");
                });
            } 
            else if (row.type == "package") {
                axios({
                    method: 'post',
                    url: window.$link + 'Bookingpackage_details/updateExtraction/' + row.id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        booking_detail_id: row.booking_detail_id,
                        status: 'for examination',
                        extracted_on: presentDate.toISOString().split('T')[0], 
                        updated_by: userId,
                    }
                }).then(function (response) {
                  //  console.log(response.data);
                
                }).catch(function (error) {
                    console.log(error);
                    toast.error("Oops! Something went wrong...");
                });
            }
        });

        axios({
            method: 'post',
            url: window.$link + 'bookings/getDetails/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            setPendingLab(booking.data.data.booking_details.filter((info) => info.type == "lab" && info.status != "for examination"));
            setPendingPack(booking.data.data.booking_package_details);
            var mergedArray = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            const finalArray = mergedArray[0];
            setPendingPackServices(finalArray.filter((info) => info.status != "for examination"));

        }).catch(function (error) {
            console.log(error)
        });
      
        toggleExtraction();
        setTimeout(function() {
            refreshPage();
        }, 3000);
    };

    React.useEffect(() => {
        showPending(pendingLab,pendingPackServices);
    },[pendingPackServices]);

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
            url: window.$link + 'bookings/getDetails/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            setPackages(booking.data.data.booking_package_details);
            setServices(booking.data.data.booking_details.filter((info) => info.type != "package" && info.category_id != xrayId && info.status != "for examination"));

            var mergedArray = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            const finalArray = mergedArray[0];
            setPackageServices(finalArray.filter((info) => info.category_id != xrayId && info.status != "for examination"));

        }).catch(function (error) {
            console.log(error);
        });
    }, []);


    const laboratoryTests = services.map((row, index) => {
       return(
        <div className="row">
            <div className="col-sm-1">
                <input type="checkbox" id="row.id" name="start_extraction" value={ExtractionInfo} 
                onChange={(e) => {
                    if (e.target.checked) {
                        setStartExtraction([
                            ...ExtractionInfo,
                            {
                                id: row.id,
                                name: row.lab_test,
                                barcode: row.barcode,
                                type: row.type,
                            },
                        ]);
                    } else {
                        setStartExtraction(
                            ExtractionInfo.filter((info) => info.id !== row.id)
                        );
                    }
                }}/>
            </div>
            <div className="col-sm-4">
                <span className="test-label">{row.lab_test}</span>
            </div>
        </div>
       );
    });

    // React.useEffect(() => {
    //     // console.log(Object.entries(packages));
    //     var mergedArray = [].concat.apply([], Object.entries(packages)).filter((value) => value != null && isNaN(value) == true);
    //     const finalArray = mergedArray[0];
    //     console.log("---")
    //     console.log(finalArray)
   
    // }, [packages]);


    const packageTests = packageServices.map((services, index) => {
        return(
            <div className="row">
                <div className="col-sm-1">
                    <input type="checkbox" id="row.id" name="start_extraction" value={ExtractionInfo} 
                    onChange={(e) => {
                        if (e.target.checked) {
                            setStartExtraction([
                                ...ExtractionInfo,
                                {
                                    id: services.id,
                                    name: services.lab_test,
                                    barcode: services.barcode,
                                    type: "package",
                                    booking_detail_id: services.booking_detail_id
                                },
                            ]);
                        } else {
                            setStartExtraction(
                                ExtractionInfo.filter((info) => info.id !== services.id)
                            );
                        }
                    }}/>
                </div>
                <div className="col-sm-4">
                    <span className="test-label">{services.lab_test}</span>
                </div>
            </div>
           );
    });

    const startExtraction = ExtractionInfo.map((row, index) => {
        return(
            <div className="row">
                <div className="col-sm-2">
                    <span className="test-label">{row.name}</span>
                </div>
                <div className="col-sm-4">
                    <input className="test-input" name={id + "_" + row.id + "_barcode"} value={row.barcode}  readonly disabled/>
                </div>
            </div>
        );
    });

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='LABORATORY TESTS' 
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

            <div class="test-list">
              {services.length == 0 && packageServices.length == 0 && (
              <div className="row d-flex justify-content-left">
                  <span className="info">NO EXTRACTION PENDING</span>
              </div>)}
              {inputBox === false && laboratoryTests}
              {inputBox === false && packageTests}
              {inputBox === true && startExtraction}
            </div>

            <div className="row d-flex justify-content-center">        
                {inputBox === false && (services.length !=0 || packageServices.length != 0) && <button className="start-btn" onClick={toggleExtraction}>START EXTRACTION</button>}  
                {inputBox === true && (services.length !=0 || packageServices.length != 0) && <button className="save-details-btn" onClick={updateExtraction}>END EXTRACTION</button>}     
            </div>

        </div>
            
        </div>
    )
}

export default LaboratoryTests
