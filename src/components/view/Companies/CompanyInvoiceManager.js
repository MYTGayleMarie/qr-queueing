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
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];


const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };
  
var companyData = [];
var patientData = [];

function CompanyInvoiceManager() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [finalCompanyData, setFinalCompanyData] = useState([]);
  
  React.useEffect(() => {
    axios({
        method: 'post',
        url: window.$link + 'discounts/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        console.log(response);
        response.data.discounts.map((row, index) => {
            var companyDetails = {};
            axios({
                method: 'post',
                url: window.$link + 'companies/show/' + row.company_id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (company) {
                console.log(company);

                companyDetails.description = company.data.name;
                companyDetails.discountCode = row.discount_code;
                companyDetails.remarks = company.data.remarks;

                setFinalCompanyData(oldArray => [...oldArray, companyDetails]);

            }).catch(function (error) {
                console.log(error);
            });
        });
    }).catch(function (error) {
        console.log(error);
    });
  }, []);

  function filter() {}

    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="COMPANY INVOICE" tableData={patientData} />
                <Table
                    clickable={false}
                    type={'companies'}
                    tableData={finalCompanyData}
                    rowsPerPage={4}
                    headingColumns={['COMPANY NAME', 'DISCOUNT CODE', 'REMARKS', 'ACTION']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                    render={setRender}
                    givenClass={'company-mobile'}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default CompanyInvoiceManager;
