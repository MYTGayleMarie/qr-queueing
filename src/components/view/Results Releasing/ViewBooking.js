import React, { Fragment, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import uploadIcon from '../../../images/icons/upload-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfIcon from '../../../images/icons/pdf-icon.png'
import FileUpload from './FileUpload';

//css
import '../Imaging/Imaging.css';
import '../Results Releasing/MedTech.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
var servId = "";
var bookId = "";
var type = "";
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
};



export default function ViewBooking() {

  document.body.style = 'background: white;';

  const {id} = useParams();

  // search bar
  const [bookingId, setBookingId] = useState(id);
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState(false);

  // Patient details
  // const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Lab Tests
  const [services, setServices] = useState([]);
  const [labTests, setLabTests] = useState([]);

  // Get booking details by searched booking id
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'bookings/getDetails/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response)=>{
      // console.log(response)
      const customerId=response.data.data.booking.customer_id;
      axios({
        method: 'post',
        url: window.$link + 'customers/show/' + customerId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }})
      .then((response)=>{
        setFirstName(response.data.first_name);
        setMiddleName(response.data.middle_name);
        setLastName(response.data.last_name);

        var birthDate = new Date(response.data.birthdate);
        setBirthDate(birthDate.toDateString());

        setGender(response.data.gender);

        var presentDate = new Date();
        var age = presentDate.getFullYear() - birthDate.getFullYear();
        var m = presentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) 
          {age--;}
        setAge(age);

        setContactNo(response.data.contact_no);
        setEmail(response.data.email);
        setAddress(response.data.address);
      })
      .catch((error)=>{console.log(error)})
      })
    .catch((error)=>{console.log(error)})

    // Get booking details by booking id
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingDetails/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((booking)=>{
      // console.log(booking)
      setServices(booking.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  // Get customer details
  // React.useEffect(()=>{
  //   axios({
  //     method: 'post',
  //     url: window.$link + 'customers/show/' + customerId,
  //     withCredentials: false, 
  //     params: {
  //         api_key: window.$api_key,
  //         token: userToken.replace(/['"]+/g, ''),
  //         requester: userId,
  //     }})
  //   .then((response)=>{
  //     setFirstName(response.data.first_name);
  //     setMiddleName(response.data.middle_name);
  //     setLastName(response.data.last_name);

  //     var birthDate = new Date(response.data.birthdate);
  //     setBirthDate(birthDate.toDateString());

  //     setGender(response.data.gender);

  //     var presentDate = new Date();
  //     var age = presentDate.getFullYear() - birthDate.getFullYear();
  //     var m = presentDate.getMonth() - birthDate.getMonth();
  //     if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) 
  //       {age--;}
  //     setAge(age);

  //     setContactNo(response.data.contact_no);
  //     setEmail(response.data.email);
  //     setAddress(response.data.address);
  //   })
  //   .catch((error)=>{console.log(error)})
  // },[customerId])

  // Lab tests
  React.useEffect(()=>{
    labTests.length=0;
    services.map((info, index1)=>{
      // if service is package
      if(info.category_id == null){
        axios({
          method: 'post',
          url: window.$link + 'bookings/getBookingPackageDetails/' + info.id,
          withCredentials: false, 
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          }
        })
        .then((response)=>{
          // console.log(response)
          response.data.map((packageCat, index2)=>{
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
            })
            .then((category)=>{
               if(category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes";
                }
                else {
                  serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
                }
                
              serviceDetails.category = category.data.name;
              serviceDetails.name = packageCat.lab_test;
              serviceDetails.type = "package";
              serviceDetails.id = packageCat.id;
              serviceDetails.packageId = info.id
              // serviceDetails.md = 
              setLabTests(oldArray=>[...oldArray, serviceDetails]);
            })


          })


        })
        .catch((error)=>{console.log(error)})
      }
      // if service is lab test
     
      else {
        axios({
          method: 'post',
          url: window.$link + 'categories/show/' + info.category_id,
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
        })
        .then((category)=>{
          var serviceDetails = {};
          if(category.data.name == "Electrolytes (NaKCl,iCA)") {
              serviceDetails.key = "Electrolytes";
          }
          else {
              serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
          }
          console.log(info)
          serviceDetails.category = category.data.name;
          serviceDetails.name = info.lab_test;
          serviceDetails.type = "lab";
          serviceDetails.packageId = "0";
          serviceDetails.id = info.id;
          serviceDetails.md = info.md;
          setLabTests(oldArray=>[...oldArray, serviceDetails]);
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    })
    
  },[services])


  // Categorize lab test
  const xray = labTests.filter((info)=>info.key==="xray"||info.key==="cardiology"||info.key==="radiology")

  const hematology = labTests.filter((info)=>info.key==="hematology")

  const serology = labTests.filter((info)=>info.key==="serology"||info.key==="immunology"||info.key==="thyroid_profile"||info.key==="tumor_markers"||info.key==="hepatitis_profile_screening"||info.key==="chemistry"||info.key==="electrolytes"||info.key==="lipid_profile"||info.key==="glucose_tests"||info.key==="liver_function_tests"||info.key==="kidney_function_tests"||info.key==="pancreatic_test")

  const clinicalUrinalyis = labTests.filter((info)=>info.key==="clinical_microscopy_urinalysis")

  const clinicalFecalysis = labTests.filter((info)=>info.key==="clinical_microscopy_fecalysis")

  const others = labTests.filter((info)=>info.key==="other_tests"||info.key==="microbiology"||info.key==="histopathology"||info.key==="covid_rapid_tests"||info.key==="ultrasound")

 
  return(
    <div>
      <Navbar />
      <div className="active-cont">
      <Fragment>
        <Header 
            type="thin"
            title="RESULTS RELEASING MANAGER"
            />
     
 
          <div>
        {/* PATIENT INFO  */}
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
            <br/>
            <br/>
            

        {/* LABORATORY TEST UPLOADER */ }
        <h3 className="form-categories-header italic">LABORATORY TESTS</h3>
        <div className="personal-data-cont">

        {clinicalUrinalyis.length!=0 && 
          <FileUpload 
            servicesData={clinicalUrinalyis}
            title={"CLINICAL MICROSCOPY URINALYSIS"}
            bookingId = {bookingId}
          />}

        {clinicalFecalysis.length!=0 && 
          <FileUpload 
            servicesData={clinicalFecalysis}
            title={"CLINICAL MICROSCOPY FECALYSIS"}
            bookingId = {bookingId}
          />}

        {hematology.length!=0 && 
          <FileUpload 
            servicesData={hematology}
            title={"HEMATOLOGY"}
            bookingId = {bookingId}
          />}
        {serology.length!=0 && 
          <FileUpload 
            servicesData={serology}
            title={"SEROLOGY"}
            bookingId = {bookingId}
          />}

        {xray.length!=0 && 
          <FileUpload 
            servicesData={xray}
            title={"XRAY"}
            bookingId = {bookingId}
          />}

        {others.length!=0 && 
          <FileUpload 
            servicesData={others}
            title={"OTHER TESTS"}
            bookingId = {bookingId}
          />}
        </div>



        </div>



        
        
        <br />
        <br />
        <br />

      </Fragment>
      </div>
    </div>
  )}
