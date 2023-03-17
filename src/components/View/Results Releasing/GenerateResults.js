import React, {useState,useRef} from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import "./FileUpload.css";
import "./GenerateResults.css";
import './MedTech.css';
import Logo from '../../../images/logo.png';

const userToken = getToken();
const userId = getUser();

export default function GenerateResults({servicesData, title, bookingId}){
  const {id, dateFrom, dateTo} = useParams();
  const [labIds, setLabIds] = useState([]);
  const [packageIds, setPackageIds] = useState([]);
  const [servicesLab, setServicesLab] = useState([]);
  const [servicesPackage, setServicesPackage] = useState([]);
  const componentRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const handleRedirect = () => setRedirect(true);
  const GenerateResultsComponentRef = useRef();
  const [remark, setRemark] = useState("");

  // Patient Details
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
  const [selectedLab, setSelectedLab] = useState([]);
  const [labTestData, setLabTestData] = useState([]);
  const [labTestResults, setLabTestResults] = useState([]);

  const [data, setData] = useState([])
  var presentDate = new Date();

  var monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  // get Patient Details
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
      setServices(booking.data)
    })
    .catch((error)=>{
    })

    // Get Detail Results
    axios({
      method: 'get',
      url: window.$link + 'Bookingdetails/getDetailsResult/' + selectedLab.id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response) => {
      const data = response.data.data;
      const packageDetailId = selectedLab.booking_id;
      if (data.booking_detail_results) {
        if(selectedLab.type == "lab"){
          setLabTestData(data.booking_detail_results);
        } else { 
          setLabTestData(data.booking_package_details_results[packageDetailId]);
        }
      }
    })
    .catch((error) => {
      //console.log(error);
    })
  },[])
  

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

  // Function to get Booking Detail Results
  function getResults(resultId) {
    axios({
      method: 'get',
      url: window.$link + 'Bookingdetails/getDetailsResult/' + resultId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then ((response) => {
      setLabTestResults(response.data.data.booking_detail_results);
    }).catch ((error) => {
      console.log(error);
    })
  }

  // Function to get Booking Details get Details
  function getDetails(resultId) {
    // Get booking details by booking id
    axios({
      method: 'get',
      url: window.$link + 'Bookingdetails/getDetails/' + resultId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((booking)=>{
      console.log(booking.data.data.booking_detail[0].booking_id);
      setRemark(booking.data.data.booking_detail[0].remarks);
    })
    .catch((error)=>{
    })
  }

  // Categorizing services into lab and packages
  React.useEffect(()=>{
    setServicesLab(servicesData.filter((info)=>info.type=='lab'))
    setServicesPackage(servicesData.filter((info)=>info.type=='package'))
  },[servicesData])

  // Making array of all package ids
  React.useEffect(()=>{
  packageIds.length=0;
  servicesPackage.map((data, index)=>{
    setPackageIds(oldArray => [...oldArray, data.id])
  })
  }, [servicesPackage])

  const headers = servicesData.length > 0 ? Object.keys(servicesData[0]) : [];
  const resultHeaders = ['lab_test', 'result', 'unit'];
  

  const DynamicTable = () => {
    return (
      <div style={{display: 'none'}}>
      <><div>
        <div ref={componentRef}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="QR DIAGNOSTICS" className="img-small"/>
            <div style={{ display: 'block'}}>
              <span className="resultTitle">Department of Clinical Laboratory</span>
              <span className="addressTitle">Unit A, m Block, Marasbaras, Tacloban City</span>
              <span className="addressTitle">0999 8888 6694</span>
            </div>
          </div>
          <br/>
          <table>
            <tr className="laboratory-title">
              <span>{servicesData[0].category.toUpperCase()}</span>
            </tr>
            <tr>
              <td>
                <span><b>Patient Name: </b></span>
                <span>{lastName.toUpperCase()}, {firstName.toUpperCase()} {middleName.toUpperCase}</span>
              </td>
              <td>
                <span><b>Registration Date: </b></span>
                <span>{monthNames[presentDate.getMonth()]} {presentDate.getDate()}, {presentDate.getFullYear()}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span><b>GENDER: </b></span>
                <span>{gender}</span>
              </td>
              <td>
                <span><b>BIRTHDATE: </b></span>
                <span>{birthDate}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span><b>AGE: </b></span>
                <span>{age}</span>
              </td>
              <td>
                <span><b>CONTACT NO: </b></span>
                <span>{contactNo}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span><b>PATIENT ID: </b></span>
                <span>{id}</span>
              </td>
              <td>
                <span><b>REQUESTING PHYSICIAN: </b></span>
              </td>
            </tr>
          </table>
        
        {/* Mapping of Detail Results */}
        {servicesData.map((service, serviceIndex) => (
          <div key={serviceIndex}>
            <br/>
            <h3 class="table-title">{service.name}</h3>
            <br/>
            <table class="table">
              <thead>
                <tr>
                  {getResults(service.id)}
                  {resultHeaders.map((resultHeader, index) => (
                    <th key={index}>{resultHeader.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labTestResults.map((result, resultIndex) => (
                  <tr key={resultIndex}>
                    {resultHeaders.map((header, index) => (
                      <td key={index}>{result[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <span><b>Remarks: </b></span>
              {console.log("Service")}
              {getDetails(service.id)}
              <span>{remark}</span>
            </div>
          </div>
        ))}
        </div>
      </div></>
      </div>
    );
  };
  

  return(
    <div>
      <div className="whole-cont">
      <ToastContainer />
      <div className="result-cont row p-1 mb-5">
          <div className="col-sm-4">
            {servicesData.map((info,index)=>
              <div className={"details"+info.id}>{info.name}</div>
            )}
          </div>
          <div className="upload-cont col-sm-8">
            <div>
            {/* Generate Result Button */}
            {(<button className="upload-res-btn" onClick={handlePrint}>
                GENERATE RESULTS</button>)}

            </div>
            
          </div>          
      </div>
      
      <DynamicTable />
      
      
    </div>
              

    </div>
  )
}