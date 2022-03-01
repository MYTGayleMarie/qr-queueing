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
var id;
var company_id;
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
  const [redirect, setRedirect] = useState("");
  const [toAddPayment, setToAddPayment] = useState(false);
  const [status, setStatus] = useState('UNPAID');
  
  React.useEffect(() => {
    finalCompanyData.length = 0;
    axios({
        method: 'post',
        url: window.$link + 'Company_invoices/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        console.log(response);
        response.data.company_invoices.map((row, index) => {
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
                var date = new Date(row.added_on);
                var formattedDate = date.toDateString().split(" ");
                if(status == 'UNPAID' && row.is_paid == 0) {
                    companyDetails.company_id = company.data.id;
                    companyDetails.id = row.id;
                    companyDetails.date = date.toDateString();
                    companyDetails.description = company.data.name;
                    companyDetails.discountCode = row.discount_code;
                    companyDetails.remarks = company.data.remarks;
                    companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    companyDetails.payment_status = row.is_paid == 1 ? "PAID" : "UNPAID";
    
                    setFinalCompanyData(oldArray => [...oldArray, companyDetails]);
    
                }
                else if(status == "PAID" && row.is_paid == 1) {
                    companyDetails.company_id = company.data.id;
                    companyDetails.id = row.id;
                    companyDetails.date = date.toDateString();
                    companyDetails.description = company.data.name;
                    companyDetails.discountCode = row.discount_code;
                    companyDetails.remarks = company.data.remarks;
                    companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    companyDetails.payment_status = row.is_paid == 1 ? "PAID" : "UNPAID";
    
                    setFinalCompanyData(oldArray => [...oldArray, companyDetails]);
                }
                else if(status == "ALL"){
                    companyDetails.company_id = company.data.id;
                    companyDetails.id = row.id;
                    companyDetails.date = date.toDateString();
                    // formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
                    companyDetails.description = company.data.name;
                    companyDetails.discountCode = row.discount_code;
                    companyDetails.remarks = company.data.remarks;
                    companyDetails.total = row.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    companyDetails.payment_status = row.is_paid == 1 ? "PAID" : "UNPAID";
    
                    setFinalCompanyData(oldArray => [...oldArray, companyDetails]);
                }
            }).catch(function (error) {
                console.log(error);
            });
        });
    }).catch(function (error) {
        console.log(error);
    });
  }, [render]);

  function addPayment(invoiceId, companyId) {
    id = invoiceId;
    company_id = companyId
    setToAddPayment(true);
  }

  if(toAddPayment == true) {
    return (
      <Navigate to ={"/add-invoice-payment/" + id + "/" + company_id}/>
    )
  }

  function filter() {}

    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="COMPANY INVOICE" tableData={patientData} />
                <Table
                    clickable={true}
                    type={'company-invoices'}
                    tableData={finalCompanyData.sort((a,b) => (new Date(a.date) > new Date(b.date) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0)))}
                    rowsPerPage={4}
                    headingColumns={['COMPANY ID','ID', 'INVOICE DATE', 'COMPANY NAME', 'DISCOUNT CODE', 'REMARKS', 'TOTAL', 'PAYMENT STATUS', 'ACTION']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                    render={render}
                    setRender={setRender}
                    givenClass={'company-mobile'}
                    link={addPayment}
                    setStatus={setStatus}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default CompanyInvoiceManager;
