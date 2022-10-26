import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

//css
import './Companies.css';

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['add-company'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];


const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };
  
var companyData = [];
var patientData = [];

function Companies() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [finalCompanyData, setFinalCompanyData] = useState([]);

  //Redirect
  const [redirect, setRedirect] = useState(false);
  const [isReady, setIsReady] = useState(false)
  
  React.useEffect(() => {
    finalCompanyData.length = 0;
    axios({
        method: 'post',
        url: window.$link + 'companies/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        // console.log(response.data.companys);
        response.data.companys.map((data,index) => {
            var info = {};
            var contact = data.contact_no.split("/");
            var contact_company = contact[0].split(":");
            var contact_person = contact[1].split(":");

            info.id = data.id;
            info.company_name = data.name;
            info.address = data.address;
            info.email = data.company_email == "" ? "Unspecified" : data.company_email;
            info.contact_number = contact_company[1] == "" ? "Unspecified" : contact_company[1] ;
            info.point_person = data.contact_person;
            info.point_contact_no = contact_person[1];

            setFinalCompanyData(oldArray => [...oldArray, info]);

        });
    }).then(function (error) {
        console.log(error);
        setIsReady(true)
    })
  }, []);

  function filter() {}

  function addDiscount(companyId) {
    id = companyId;
    setRedirect(true);
  }

    if(redirect == true) {
        var link =  "/add-discount/" + id;
        return (
            <Navigate to ={link}/>
        )
    }

    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="COMPANY MANAGER" buttons={buttons}/>
                <Table
                    type={'companies'}
                    tableData={finalCompanyData.sort((a,b) => (a.company_name > b.company_name) ? 1 : ((b.company_name > a.company_name) ? -1 : 0))}
                    rowsPerPage={10}
                    headingColumns={['', 'COMPANY NAME', 'ADDRESS', 'EMAIL', 'CONTACT NUMBER', 'POINT PERSON', 'POINT PERSON CONTACT NUMBER', 'ACTION']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                    render={setRender}
                    link={addDiscount}
                    givenClass={'company-mobile'}
                    useLoader={true}
                    isReady={isReady}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default Companies
