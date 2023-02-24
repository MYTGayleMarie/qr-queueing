import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId} from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate, useParams } from 'react-router-dom';

//import './LabOfficer.css'

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import PersonalDetails from '../../PersonalDetails.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const patientDataa = [
  {
    "lab": "ECG",
    "Results": "Php 500",
    "Value": "PHP 500",
    "Action": "Edit"
  }
]

export default function LabOfficer() {

  document.body.style = 'background: white;';
  const {id, dateFrom, dateTo} = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo? dateTo : formattedPresentData,
    done: false,
  });

  // Patient details
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
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState('');

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);

  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
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
        setLoading(false)
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
      .catch((error)=>{
      })
      })
    .catch((error)=>{
    })

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
      setServices(booking.data)
    })
    .catch((error)=>{
    })
  },[])

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
              serviceDetails.test_id = packageCat.test_id;
              serviceDetails.packageId = info.id
              // serviceDetails.md = 
              setLabTests(oldArray=>[...oldArray, serviceDetails]);
            })
          })
        })
        .catch((error)=>{
          // console.log(error)
        })
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
          // console.log(info)
          serviceDetails.category = category.data.name;
          serviceDetails.name = info.lab_test;
          serviceDetails.type = "lab";
          serviceDetails.packageId = "0";
          serviceDetails.id = info.id;
          serviceDetails.test_id = info.test_id;
          serviceDetails.md = info.md;
          setLabTests(oldArray=>[...oldArray, serviceDetails]);
        })
        .catch((error)=>{
          // console.log(error)
        })
      }
    })
    
  },[services])

  console.log(labTests)


  // Categorize lab test
  const xray = labTests.filter((info)=>info.key==="xray" ||info.key==="radiology")
  const ecg = labTests.filter((info)=>info.key==="cardiology")

  /****************/
  const hematology = labTests.filter((info)=>info.key==="hematology" && info.test_id!=="8" && info.test_id!=="13" && info.test_id!=="15")
  
  const cbc = labTests.filter((info)=>info.test_id==="8")

  const esr = labTests.filter((info)=>info.test_id==="13")

  const clotting = labTests.filter((info)=>info.test_id==="15")

  /****************/

  // previously serology
  const chemistry = labTests.filter((info)=>info.key==="chemistry"||info.key==="Electrolytes"||info.key==="lipid_profile"||info.key==="glucose_tests"||info.key==="liver_function_tests"||info.key==="kidney_function_tests"||info.key==="pancreatic_test")
  const thyroid_profile = labTests.filter((info)=>info.key==="thyroid_profile")
  const tumor_markers = labTests.filter((info)=>info.key==="tumor_markers")

  const serology = labTests.filter((info)=>info.key==="serology"||info.key==="immunology"||info.key==="hepatitis_profile_screening")

  /****************/

  const clinicalUrinalyis = labTests.filter((info)=>info.key==="clinical_microscopy_urinalysis"  &&info.test_id!=="7" && info.test_id!=="130")

  const spermAnalysis = labTests.filter((info)=>info.test_id==="7")
  
  const serumPT = labTests.filter((info)=>info.test_id==="130")

  /****************/

  const clinicalFecalysis = labTests.filter((info)=>info.key==="clinical_microscopy_fecalysis")
  
  // const fecalysis = labTests.filter((info)=>info.test_id==="4")

  /****************/

  const ultrasound = labTests.filter((info) => info.key === "ultrasound")

  /****************/

  // Previously others
  const histopathology = labTests.filter((info) => info.key === "histopathology")
  const microbiology = labTests.filter((info) => info.key === "microbiology")
  // const {id} = useParams();   
   const [data, setData] = useState([]);
   const [render, setRender] = useState("");

  const others = labTests.filter((info)=>info.key==="other_tests" ||info.key==="covid_rapid_tests")
  const [uploadsData, setUploadsData] = useState([]);
  const [download, setDOwnload] = useState("")
  const [rows, setRows] = useState([])
  const [showConfirm, setShowConfirm] = React.useState(false);

//  console.log(labTests)

// Get Multiple Uploads
    async function getUploads(){
      if(id != null)  {    
        axios({
        method: 'get',
        url: window.$link + '/booking_attachments/getByBooking/'+ id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
      setData(response.data.message.booking_attachments)
      console.log(response)
    }).catch(function (error) {
      setData(error)
    });
    }
  }

  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);

  function filter() {}

  if(redirectBack === true) {
    if(dateFrom !== undefined && dateTo !== undefined) {
        var link =  "/medtech/" + dateFrom + "/" + dateTo;
        return (
            <Navigate to ={link}/>
        )
    } else {
      var link =  "/medtech";
        return (
            <Navigate to ={link}/>
        )
    }
  }

  function handleLab(e){
    setLabTests(e.target.value)
  }  
  
   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="LABORATORY OFFICER MANAGER"
            withBack={true}
            setBack={setRedirectBack}
            tableData={patientDataa}/>
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
            <h3 className="form-categories-header italic">LABORATORY TESTS</h3>
            <div className="personal-data-cont">
              {/* <PersonalDetails data={patientDataa}/> */}
              <div className="col-sm-6"><h3 className='laboratory label'> LABORATORY</h3></div>
              <select name="lab-select" onChange={handleLab} className="dropdown">
              <option> Select laboratory </option>
              {labTests.map((data, key)=>
                            <option value={data.id}>{data.category}</option>
                        )}
                {/* <option>X-RAY</option> 
                <option>ECG</option> 
                <option>HEMATOLOGY</option> 
                <option>CBC</option> 
                <option>CLOTTING</option>  */}
              </select>
            </div>
          <Table
            type={'med-tech'}
            tableData={patientDataa.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={20}
            headingColumns={['LAB NAME', 'RESULTS', 'UNIT', 'ACTION']}
            filteredData={filteredData}
            //dropdownData={labTests}
            //setFilter={setFilter}
            //filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            //link={viewBooking}
            role={role}
            userId={userId}
            //useLoader={true}
            //isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}






