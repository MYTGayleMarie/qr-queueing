import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser} from "../../../utilities/Common";
import axios from 'axios';

//css
import './ImagingTests.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';

//constants
const userToken = getToken();
const userId = getUser();
const xrayId = 18;
    
function ImagingTests() {

    document.body.style = 'background: white;';

    const [inputBox, setImaging] = useState(false);
    const [ImagingInfo, setStartImaging] = useState([]);

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

      const toggleImaging = () => {
        setImaging(!inputBox);

        if(inputBox == true) {
            ImagingInfo.length = 0;
        }
    };

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
            url: window.$link + 'bookings/getDetails/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            console.log(booking.data.data.booking_details);
            setPackages(booking.data.data.booking_package_details);
            setServices(booking.data.data.booking_details.filter((info) => info.type != "package" && info.category_id == xrayId && info.status != "done"));

            var mergedArray = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            const finalArray = mergedArray[0];
            setPackageServices(finalArray.filter((info) => info.category_id== xrayId ));

        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const laboratoryTests = services.map((row, index) => {
        return(
         <div className="row">
             <div className="col-sm-1">
                 <input type="checkbox" id="row.id" name="start_extraction" value={ImagingInfo} 
                 onChange={(e) => {
                     if (e.target.checked) {
                         setStartImaging([
                             ...ImagingInfo,
                             {
                                 id: row.id,
                                 name: row.lab_test,
                                 barcode: row.barcode
                             },
                         ]);
                     } else {
                         setStartImaging(
                             ImagingInfo.filter((info) => info.id !== row.id)
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


    const packageTests = packageServices.map((services, index) => {
        return(
            <div className="row">
                <div className="col-sm-1">
                    <input type="checkbox" id="row.id" name="start_extraction" value={ImagingInfo} 
                    onChange={(e) => {
                        if (e.target.checked) {
                            setStartImaging([
                                ...ImagingInfo,
                                {
                                    id: services.id,
                                    name: services.lab_test,
                                    barcode: services.barcode
                                },
                            ]);
                        } else {
                            setStartImaging(
                                ImagingInfo.filter((info) => info.id !== services.id)
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

    const startImaging = ImagingInfo.map((row, index) => {
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
                title='IMAGING TESTS' 
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
      
            <h1 className="test-header">IMAGING TESTS</h1>

            <div class="test-list">
            {inputBox === false && laboratoryTests}
              {inputBox === false && packageTests}
              {inputBox === true && startImaging}
            </div>

            <div className="row d-flex justify-content-center">        
                {inputBox === false && <button className="start-btn" onClick={toggleImaging}>START EXTRACTION</button>}  
                {inputBox === true && <button className="save-details-btn" onClick={toggleImaging}>SAVE DETAILS</button>}     
            </div>

        </div>
            
        </div>
    )
}

export default ImagingTests
