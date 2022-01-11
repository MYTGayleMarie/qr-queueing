import React, {Fragment, useState} from 'react';
import { getToken, getUser, refreshPage  } from '../../../../utilities/Common';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

//css
import './SearchPatient.css';

//components
import Header from '../../../Header';
import Navbar from '../../../Navbar';
import Table from '../../../Table.js';

const patientData = [];

const userToken = getToken();
const userId = getUser();
var id = "";

function SearchPatient() {

    const [patientName, setPatientName] = useState("");
    const [patients, setPatients] = useState([]);
    const [redirect, setRedirect] = useState(false);

    function search() {
        patients.length = 0;
        axios({
            method: 'post',
            url: window.$link + 'customers/search',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
                name: patientName
            }
        }).then(function (response) {
            console.log(response.data);
            response.data.map((detail, index) => {
                var patientinfo = {};
                var name = detail.first_name + " " + detail.middle_name + " " + detail.last_name;
                patientinfo.id = detail.id;
                patientinfo.name = name.toUpperCase();
                patientinfo.gender = detail.gender.toUpperCase();
                patientinfo.address = detail.address;
                patientinfo.email = detail.email;
                patientinfo.contactNumber = detail.contact_no;
                setPatients( arr => [...arr, patientinfo])
                console.log(patientinfo);
            });
        });
    }

    function addBooking(customerId) {
        id = customerId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/add-booking/" + id;
        console.log(link);
        return (
            <Navigate to ={link}/>
        )
    }

    return (
        <div>
             <Navbar/>
           <div className="active-cont">
            <Header 
            type="thin"
            title="SEARCH PATIENT"
            />

            <div className="row">
                <div className="col">
                <div class="wrap d-flex justify-content-center">
                    <div class="search-bar">
                        <input type="text" class="searchTerm" name="patientName" placeholder="Search Patient" onChange={(e) => setPatientName(e.target.value)}/>
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
                    type={'search-patient'}
                    tableData={patients}
                    headingColumns={['ID', 'PATIENT NAME', 'GENDER', 'ADDRESS', 'EMAIL', 'CONTACT NUMBER', 'ACTION']}
                    link={addBooking}
                />            
            </Fragment>
            </div>
        </div>
    )
}

export default SearchPatient
