import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from "react-spinners";
import { Navigate } from 'react-router-dom';
import uploadIcon from '../../../images/icons/upload-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfIcon from '../../../images/icons/pdf-icon.png'
import FileUpload from './FileUpload';
import MultipleUpload from './MultipleUpload';
// import Browser from 'browser';

//css
import '../Imaging/Imaging.css';
import './MedTech.css';
//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import { compileAsync } from 'sass';



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

const sendOutResults = [
  { 
    // id: '1', 
    file_name: 'Result 1',
    date: 'July 18, 2022',
    
  },
  { 
    //  id: '2', 
     file_name: 'Result 2',
     date: 'July 18, 2022',
  },
]


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
  const [loading, setLoading] = useState(true)
// React.useEffect(()=>
// {
//   // setLoading(true)
//   // setTimeout(()=>
//   // {
//   //   setLoading(false)
//   // }, 2000)
// },[])

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
        // console.log(error)
      })
      })
    .catch((error)=>{
      // console.log(error)
    })

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
    .catch((error)=>{
      // console.log(error)
    })
  },[])

  React.useEffect(()=>{
    getUploads(data);
    }, [])

    // React.useEffect(()=>{
    //   downloadFile(data);
    //   }, []) 

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
    
    //Delete Multiple Uploads
    const [items, setItems] = useState([{ file_name: '' }]);

    function handleRemoveItem(id) {
        const rowId = id;
        const newItemList = [...items];
        newItemList.splice(rowId, 1);
        setItems(newItemList);
    }
  

  return(
   
    <div>

      <Navbar />
      <div className="active-cont">
      <Fragment>
        <Header 
            type="thin"
            title="RESULTS RELEASING MANAGER"
            />
     
     <div >
     <div className='spinner d-flex justify-content-center'>
        
          {loading &&
            <RingLoader color={'#3a023a'} loading={loading} size={200} />
          }
         </div>
        {/* PATIENT INFO  */}
           {!loading && <>
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

        
        {/* CLINICAL MICROSCOPY URINALYSIS */}

        {(clinicalUrinalyis.length!=0||spermAnalysis.length!=0||serumPT.length!=0) &&  
        <div>
          <div className="category label">CLINICAL MICROSCOPY URINALYSIS</div>
{/*           
          {urinalysis.length!=0 &&<FileUpload 
            servicesData={urinalysis}
            title={"CLINICAL MICROSCOPY URINALYSIS"}
            bookingId = {bookingId}
          />} */}
          {serumPT.length!=0 &&<FileUpload 
            servicesData={serumPT}
            title={"CLINICAL MICROSCOPY URINALYSIS"}
            bookingId = {bookingId}
          />}
          {spermAnalysis.length!=0 &&<FileUpload 
            servicesData={spermAnalysis}
            title={"CLINICAL MICROSCOPY URINALYSIS"}
            bookingId = {bookingId}
          />}
          {clinicalUrinalyis.length!=0 &&<FileUpload 
            servicesData={clinicalUrinalyis}
            title={"CLINICAL MICROSCOPY URINALYSIS"}
            bookingId = {bookingId}
          />}

          <hr className="labtest-line mb-5" />
        </div>
        }

        {/* CLINICAL URINALYSIS FECALYSIS */}
        {clinicalFecalysis.length!=0 && 
        <div>
          <div className="category label">CLINICAL MICROSCOPY FECALYSIS</div>
          {/* {fecalysis.length!=0 &&
            <FileUpload 
              servicesData={fecalysis}
              title={"CLINICAL MICROSCOPY FECALYSIS"}
              bookingId = {bookingId}
            />
          } */}
          {clinicalFecalysis.length!=0 &&
            <FileUpload 
              servicesData={clinicalFecalysis}
              title={"CLINICAL MICROSCOPY FECALYSIS"}
              bookingId = {bookingId}
            />
          }

          <hr className="labtest-line mb-5" />
        </div>}

        {/* HEMATOLOGY */}
        {(hematology.length!=0 || cbc.length!=0 || esr.length!=0 || clotting.length!=0) && 
        <div>
          <div className="category label">HEMATOLOGY</div>
          {cbc.length!=0 &&
            <FileUpload 
              servicesData={cbc}
              title={"HEMATOLOGY"}
              bookingId = {bookingId}
            />
          }
          {esr.length!=0 &&
            <FileUpload 
              servicesData={esr}
              title={"HEMATOLOGY"}
              bookingId = {bookingId}
            />
          }
          {clotting.length!=0 &&
            <FileUpload 
              servicesData={clotting}
              title={"HEMATOLOGY"}
              bookingId = {bookingId}
            />
          }
          {hematology.length!=0 &&
            <FileUpload 
              servicesData={hematology}
              title={"HEMATOLOGY"}
              bookingId = {bookingId}
            />
          }
          <hr className="labtest-line mb-5" />

        </div>}

        {/* CHEMISTRY */}
        {chemistry.length!=0 && 
        <div>
          <div className="category label">CHEMISTRY</div>
          <FileUpload 
            servicesData={chemistry}
            title={"CHEMISTRY"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* SEROLOGY */}
        {serology.length!=0 && 
        <div>
          <div className="category label">SEROLOGY</div>
          <FileUpload 
            servicesData={serology}
            title={"SEROLOGY"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* THYROID PROFILE */}
        {thyroid_profile.length!=0 && 
        <div>
          <div className="category label">THYROID PROFILE</div>
          <FileUpload 
            servicesData={thyroid_profile}
            title={"THYROID PROFILE"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* TUMOR MARKERS */}
        {tumor_markers.length!=0 && 
        <div>
          <div className="category label">TUMOR MARKERS</div>
          <FileUpload 
            servicesData={tumor_markers}
            title={"TUMOR MARKERS"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* HISTOPATHOLOGY */}
        {histopathology.length!=0 && 
        <div>
          <div className="category label">HISTOPATHOLOGY</div>
          <FileUpload 
            servicesData={histopathology}
            title={"HISTOPATHOLOGY"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* MICROBIOLOGY */}
        {microbiology.length!=0 && 
        <div>
          <div className="category label">MICROBIOLOGY</div>
          <FileUpload 
            servicesData={microbiology}
            title={"MICROBIOLOGY"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* XRAY RADIOLOGY */}
        {xray.length!=0 && 
        <div>
          <div className="category label">XRAY</div>
          <FileUpload 
            servicesData={xray}
            title={"XRAY"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* CARDIOLOGY */}
        {ecg.length!=0 && 
        <div>
          <div className="category label">ECG</div>
          <FileUpload 
            servicesData={ecg}
            title={"ECG"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* ULTRASOUND */}
        {ultrasound.length!=0 && 
        <div>
          <div className="category label">ULTRASOUND</div>
          <FileUpload 
            servicesData={ultrasound}
            title={"ULTRASOUND"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        {/* OTHERS */}
        {others.length!=0 && 
        <div>
          <div className="category label">OTHER TESTS</div>
          <FileUpload 
            servicesData={others}
            title={"OTHER TESTS"}
            bookingId = {bookingId}
          />
           <hr className="labtest-line mb-5" />
        </div>}

        </div>
       
        {/* SEND OUT RESULTS */ }
        <h3 className="form-categories-header italic">SEND OUT RESULTS</h3> 
        <div className="personal-data-cont">
        <MultipleUpload bookingId={bookingId}/>
        
        </div >
        
         {/* <div className="labtest-line mb-5 justify-content-center"> */}
        <div className='row'>
          {data == null && (<Table
                type={'send-out-results'}
                withSubData={false}
                tableData=""
                rowsPerPage={5}
                headingColumns={[
                // 'ID',
                'FILE NAME',
                'ACTION',
                ]}
                />)
          }
          {data != null && (<Table
                type={'send-out-results'}
                withSubData={false}
                tableData={data}
                rowsPerPage={5}
                headingColumns={[
                // 'ID',
                'FILE NAME',
                'ACTION',
                ]}
                />)}
            
              </div>
              
               {/* </div>  */}
              </>}
        </div>
       
        <br />
        <br />
        <br />
        
      </Fragment>
  
      </div>
    
    </div>
  )
 } 
