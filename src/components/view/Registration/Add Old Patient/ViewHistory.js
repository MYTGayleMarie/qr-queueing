import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import axios from 'axios';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';
import Table from '../../../Table.js';

const userToken = getToken();
const userId = getUser();

export default function ViewHistory(){

  const {id} = useParams();
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

  // Patient history
  const [patientHistory, setPatientHistory] = useState([]);


  
  React.useEffect(()=>{
    // Get customer details
    axios({
      method: 'post',
      url: window.$link + 'customers/show/' + id,
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

    // Get patient history
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingsByCustomer/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }      
    })
    .then((response)=>{console.log(response)})
    .catch((err)=>{console.log(err)})

  },[])  


  return(
    <div>
      <Navbar/>
      <div className="active-cont">
        <Fragment>
        <Header 
            type="thin"
            title="PATIENT"
            />
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
        

        {/* PATIENT HISTORY */}
        <h3 className="form-categories-header italic">PATIENT HISTORY</h3>
        <Table 
          type={'patient-history'}
          tableData = {patientHistory}
          rowsPerPage={20}
          headingColumns={['BOOKING ID', 'BOOKING DATE', 'CATEGORY', 'LABORATORY TEST', 'TOTAL AMOUNT']}
        />

      </Fragment>

      </div>
    </div>
  )
}