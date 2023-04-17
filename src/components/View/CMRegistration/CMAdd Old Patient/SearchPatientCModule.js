import React, {Fragment, useState} from 'react';
import { getToken, getUser, refreshPage  } from '../../../../utilities/Common';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

//css
import './SearchPatientCModule.css';

//components
import Header from '../../../Header';
import Navbar from '../../../Navbar';
import Table from '../../../Table.js';

const patientData = [];

const userToken = getToken();
const userId = getUser();
var id = "";
var queueNumber = "";

function SearchPatientCModule() {
    
    document.body.style = 'background: white;';
    const [patientFirstName, setPatienFirstName] = useState("");
    const [patientLastName, setPatientLastName] = useState("");
    const [patientBirthDate, setPatientBirthDate] = useState("");
    const [patients, setPatients] = useState([]);
    const [redirectBooking, setRedirectBooking] = useState(false);
    const [redirectQueue, setRedirectQueue] = useState(false);
    const [redirectViewHistory, setRedirectViewHistory] = useState(false);

    function search() {
        patients.length = 0;
        var variable = new Date(patientBirthDate);
        var variable = variable.toISOString().split('T')[0];
        console.log(variable)
        console.log(patientBirthDate)

        axios({
            method: 'post',
            url: window.$link + 'customers/searchByNameAndBirthdate',
            withCredentials: false,
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
                first_name: patientFirstName,
                last_name: patientLastName,
                birthdate: variable
            }
        }).then(function (response) {
            var detail = response.data;
                var patientinfo = {};
                var name = detail.first_name + " " + detail.middle_name + " " + detail.last_name;
                patientinfo.id = detail.id;
                patientinfo.name = name ? name.toUpperCase() : '';
                patientinfo.gender = detail.gender ? detail.gender.toUpperCase() : '';
                patientinfo.address = detail.address;
                patientinfo.email = detail.email;
                patientinfo.contactNumber = detail.contact_no;
                setPatients( arr => [...arr, patientinfo])
                console.log(patientinfo);
        });
    }

    function addToQueue(customerId) {
        id = customerId;
        axios({
            method: 'post',
            url: window.$link + 'customers/generateQueue',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              customer_id: customerId,
            },
          }).then(function (queue) {
            queueNumber =  queue.data.data.queue_no;
            toast.success("Queue " + queue.data.message);
            setRedirectQueue(true);
            //var queueNumber = queue.data.data.queue_no;
            });
    }

    if(redirectBooking == true) {
        var link =  "/add-booking/" + id;
        // console.log(link);
        return (
            <Navigate to ={link}/>
        )
    }
    function viewHistory(customerId){
        id=customerId;
        setRedirectViewHistory(true);
    }
    if(redirectQueue){
        return (
        <div>
            <div className="row" style={{marginTop:"6%", fontFamily:"Montserrat-Bold", display:"flex", flexDirection:"column", alignItems:"center", textAlign: "center"}}>
                <img src="/logo.png" style={{width:"160px", height:"80px", marginBottom:"3%"}}></img>
                <h1>Customer Module</h1>
                <div className="row" style={{marginTop:"3%"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 d-flex justify-content-center">
                    <div style={{padding:"10px", margin:"5px", width:"150%", height:"250%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                    fontFamily: "Montserrat-Bold", fontSize:"25px"}}>
                    Queue Created! <br />
                    Your Queue Number is {queueNumber}.
                    </div>
                </div>
                    <div type="button" disabled 
                    style={{padding:"10px", margin:"5px", width:"150%", height:"250%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                    fontFamily: "Montserrat-Bold", fontSize:"25px"}}>
                    Please wait for your name to be called.
                    </div>
                <div className="col-sm-4"></div>
                </div>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                <a href='/RegistrationCModule'>
                    <button variant="default" 
                    style={{padding:"7px", margin:"5px", width:"25%", height:"75%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                    fontFamily: "Montserrat-Bold", fontSize:"15px"}}>
                    Done
                    </button>
                </a>
                </div>
            </div>
        </div>
        );
    }
    if(redirectViewHistory==true){
      var link ="/View-history/"+id;
      return(
        <Navigate to={link} />
      )
    }

    return (
        <div>
             {/* <Navbar/> */}
           <div className="active-cont">
            <Header 
            type="thin"
            title="SEARCH PATIENT"
            />

<div className="row">
                <div className="col">
                <div class="wrap d-flex justify-content-center">
                    <div class="search-bar">
                        <input type="text" class="searchTerm" name="patientFirstName" placeholder="Patient First Name" onChange={(e) => setPatienFirstName(e.target.value)}/>
                        <input type="text" class="searchTerm" name="patientLastName" placeholder="Patient Last Name" onChange={(e) => setPatientLastName(e.target.value)}/>
                        <input type="date" class="searchTerm" name="birthDate" placeholder="Patient Birth Date" onChange={(e) => setPatientBirthDate(e.target.value)}/>
                        <button type="submit" class="searchButton" onClick={search}>
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                </div>
            </div>
            <Fragment>
                <Table
                    clickable={true}
                    type={'search-patient-queue'}
                    tableData={patients}
                    rowsPerPage={4}
                    headingColumns={['ID', 'PATIENT NAME', 'GENDER', 'ADDRESS', 'EMAIL', 'CONTACT NUMBER', 'ACTION']}
                    link={addToQueue}
                    givenClass={'search-mobile'}
                    View={viewHistory}
                />            
            </Fragment>
            </div>
        </div>
    )
}

export default SearchPatientCModule
