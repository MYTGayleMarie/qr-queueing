import React, { Fragment, useState } from 'react';
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



function MedTech() {

  document.body.style = 'background: white;';

  // search bar
  const [bookingId, setBookingId] = useState("");
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState(false);

  // Patient details
  const [customerId, setCustomerId] = useState("");
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
  function searchBookingId(){
    setShow(true)
    axios({
      method: 'post',
      url: window.$link + 'bookings/getDetails/' + bookingId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response)=>{
      setCustomerId(response.data.data.booking.customer_id);
    })
    .catch((error)=>{console.log(error)})

    // Get booking details by booking id
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingDetails/' + bookingId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((booking)=>{
      console.log(booking)
      setServices(booking.data)
    })
    .catch((error)=>{console.log(error)})
  }
  // Get customer details
  React.useEffect(()=>{
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
  },[customerId])

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
          console.log(response)
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
          serviceDetails.category = category.data.name;
          serviceDetails.name = info.lab_test;
           serviceDetails.type = "lab";
          serviceDetails.id = info.id;
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

  const serology = labTests.filter((info)=>info.key==="serology"||info.key==="immunology"||info.key==="thyroid_profile"||info.key==="tumor_markers"||info.key==="hepatitis_profile_screening"||info.key==="chemistry"||info.key==="electrolytes"||info.key==="lipid_profile"||info.key==="glucose_tests"||info.key==="liver_function_tests"||info.key==="kidney_function_tests")

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
        {/* SEARCH BAR */}
        <div className="row">
          <div className="col">
            <div class="wrap d-flex justify-content-center">
              <div class="search-bar">
                <input type="text" class="searchTerm" name="patientName" placeholder="Search Booking ID" onChange={(e)=>setBookingId(e.target.value)}/>
                <button type="submit" class="searchButton" onClick={searchBookingId}>
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <br/>
        
        {show && (
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
          />}

        {clinicalFecalysis.length!=0 && 
          <FileUpload 
            servicesData={clinicalFecalysis}
            title={"CLINICAL MICROSCOPY FECALYSIS"}
          />}

        {hematology.length!=0 && 
          <FileUpload 
            servicesData={hematology}
            title={"HEMATOLOGY"}
          />}
        {serology.length!=0 && 
          <FileUpload 
            servicesData={serology}
            title={"SEROLOGY"}
          />}

        {xray.length!=0 && 
          <FileUpload 
            servicesData={xray}
            title={"XRAY"}
          />}

        {others.length!=0 && 
          <FileUpload 
            servicesData={others}
            title={"OTHER TESTS"}
          />}
        </div>



        </div>
        )}
        {/* <object 
        name={lastName}
        data={data}  
        className="pdfObject"/> */}

        
        
        <br />
        <br />
        <br />

      </Fragment>
      </div>
    </div>
  )















// Old Results releasing
  // const [filteredData, setFilter] = useForm(filterData);
  // const [pendingData, setPendingData] = useState([]);
  // const [redirect, setRedirect] = useState(false);

  // function startExam(bookingId, serviceId, typeService) {
  //     servId = serviceId;
  //     bookId = bookingId;
  //     type = typeService;
  //     setRedirect(true);
  // }

  // React.useEffect(() => {
  //   pendingData.length = 0;
  //   axios({
  //     method: 'post',
  //     url: window.$link + 'bookings/getAll',
  //     withCredentials: false,
  //     params: {
  //       api_key: window.$api_key,
  //       token: userToken.replace(/['"]+/g, ''),
  //       requester: userId,
  //       date_from: filteredData.from_date,
  //       date_to: filteredData.to_date,
  //     },
  //   }).then(function (response) {
  //       console.log(response.data.bookings);

  //       response.data.bookings.map((data,index) => {
  //         axios({
  //           method: 'post',
  //           url: window.$link + 'bookings/getDetails/' + data.id,
  //           withCredentials: false, 
  //           params: {
  //               api_key: window.$api_key,
  //               token: userToken.replace(/['"]+/g, ''),
  //               requester: userId,
  //           }
  //       }).then(function (booking) {
  //           var filterPackage = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            
  //           var labServices = booking.data.data.booking_details.filter((info) => info.type == "lab"); 
  //           var packageServices = filterPackage[0];
  //           var mergedServices = [];

  //           mergedServices = labServices.concat(packageServices);
  //           console.log(mergedServices)
  //           mergedServices.filter((info) => typeof info !== 'undefined').map((info, index) => {
  //             console.log(info);
  //             var servicesInfo = {};
  //             servicesInfo.booking_id = data.id;
  //             servicesInfo.id = info.id;
  //             servicesInfo.barcode = info.barcode;
  //             servicesInfo.test = info.lab_test;
  //             servicesInfo.type = info.type != undefined ? info.type : "package";
  //             servicesInfo.status = info.status; 

  //             setPendingData(oldArray => [...oldArray, servicesInfo]);
  //           });    
  //       }).then(function (error) {
  //         console.log(error);
  //       });
  //     });
  //   }).then(function (error) {
  //       console.log(error);
  //   })
  // },[]);

  // if (redirect == true) {
  //   var link = '/medtech-start/' + bookId + '/' + servId + "/" + type;
  //   return <Navigate to={link} />;
  // }

  // return (
  //   <div>
  //     <Navbar />
  //     <div className="active-cont">
  //       <Fragment>
  //         <Searchbar title="MEDICAL TECHNOLOGY" />
  //         <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={pendingData} />
  //         <Table
  //           type={'med-tech'}
  //           clickable={true}
  //           tableData={pendingData}
  //           rowsPerPage={10}
  //           headingColumns={['BOOKING ID', 'TEST ID', 'BARCODE NO.', 'TYPE', 'TEST', 'STATUS', 'ACTION']}
  //           filteredData={filteredData}
  //           setFilter={setFilter}
  //           link={startExam}
  //         />
  //       </Fragment>
  //     </div>
  //   </div>
  // );


}

export default MedTech;
