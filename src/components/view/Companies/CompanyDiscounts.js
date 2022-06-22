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
var discount_code;
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };

function CompanyDiscounts() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [redirect, setRedirect] = useState("");
  
  React.useEffect(() => {
    discount.length = 0;
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
        response.data.discounts.map((data,index) => {
            if(data.company_id != null) {
                axios({
                    method: 'post',
                    url: window.$link + 'companies/show/' + data.company_id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (company) {
                    // console.log(company.data);
                    var info = {};
                    info.company_id = company.data.id;
                    info.id = data.id;
                    info.company_name = company.data.name;
                    info.code = data.discount_code;
                    info.discount = data.percentage;
                    info.description = data.description;

                    setDiscount(oldArray => [...oldArray, info]);
                }).then (function (error) {
    
                });
            }
        });
    }).then(function (error) {
        console.log(error);
    })
  }, []);

  function filter() {}

  function createInvoice(companyId, discountCode) {
    id = companyId;
    discount_code = discountCode;
    setRedirect(true);
  }

  if (redirect == true) {
    var link = '/add-invoice/' + id + "/" + discount_code;
    return <Navigate to={link} />;
  } 
  
    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="DISCOUNT MANAGER"/>
                <Table
                    clickable={true}
                    type={'companies-discount'}
                    tableData={discount.sort((a,b) => (a.company_name > b.company_name) ? 1 : ((b.company_name > a.company_name) ? -1 : 0))}
                    rowsPerPage={10}
                    headingColumns={['COMPANY ID', 'DISCOUNT ID','COMPANY', 'DISCOUNT CODE', 'DISCOUNT', 'DESCRIPTION', 'ACTION']}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    filter={filter}
                    render={setRender}
                    givenClass={'company-mobile'}
                    link={createInvoice}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default CompanyDiscounts
