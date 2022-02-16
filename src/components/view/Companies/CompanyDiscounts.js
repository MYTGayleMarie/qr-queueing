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

function CompanyDiscounts() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [discount, setDiscount] = useState([]);
  
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
        console.log(response.data.discounts);

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
                    console.log(company.data);
                    var info = {};
                    info.name = company.data.name;
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

    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="DISCOUNT MANAGER"/>
                <Table
                    type={'companies-discount'}
                    tableData={discount}
                    rowsPerPage={10}
                    headingColumns={['COMPANY', 'DISCOUNT CODE', 'DISCOUNT', 'DESCRIPTION']}
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

export default CompanyDiscounts
