import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

//css
import '../Companies/Companies.css';

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['add-discount'];
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

function Discount() {

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
        console.log(response.data.discounts);

        response.data.discounts.filter((info) => info.company_id == null).map((data,index) => {
            var info = {};
                info.discount_id = data.id;
                info.code = data.discount_code;
                info.discount = data.percentage;
                info.description = data.description;

                setDiscount(oldArray => [...oldArray, info]);
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
                <Header type="thick" title="DISCOUNT MANAGER" buttons={buttons}/>
                <Table
                    clickable={true}
                    type={'discount'}
                    tableData={discount}
                    rowsPerPage={10}
                    headingColumns={['DISCOUNT ID', 'DISCOUNT CODE', 'DISCOUNT', 'DESCRIPTION']}
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

export default Discount
