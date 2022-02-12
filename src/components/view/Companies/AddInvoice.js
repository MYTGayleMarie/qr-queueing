import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const buttons = ['add-invoice'];
const userToken = getToken();
const userId = getUser();
var info = [
  {
    invoice_no: "INV-QR-01",
    discount_code: "MYT-WELCOME-NY!",
    price: "500.00",
    total: "5,000"
  },
];

function AddInvoice() {
  document.body.style = 'background: white;';

  //Invoice details
  const {id, discount} = useParams();
  const [redirect, setRedirect] = useState(false);

  //Company details
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [remarks, setRemarks] = useState("");
  const [discountInfo, setDiscountInfo] = useState("");

  //Redirection
  const [toAddPayment, setToAddPayment] = useState(false);
  const [toAddInvoice, setToAddInvoice] = useState(false);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'companies/show/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (company) {
      console.log(company);
      setRemarks(company.data.remarks);
      setName(company.data.name);
      setContactNo(company.data.contact_no);
      setEmail(company.data.company_email);
      setAddress(company.data.address);
      setContactPerson(company.data.contact_person);

    }).then(function(error) {
      console.log(error);
    });

    axios({
      method: 'post',
      url: window.$link + 'discounts/show/' + discount,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      console.log(response.data);
      setDiscountInfo(response.data);
    }).then(function(error) {
      console.log(error);
    });
  },[]);

  function addInvoice() {
    setToAddInvoice(true);
  }

  function addPayment() {
    setToAddPayment(true);
  }

  if(toAddInvoice == true) {
    return (
      <Navigate to ={"/add-invoice/" + id}/>
    )
  }else if(toAddPayment == true) {
    return (
      <Navigate to = {"/add-invoice-payment/" + id}/>
    )
  }

  if(redirect == true) {
      return (
        <Navigate to = "/company-invoices"/>
    )
  }

  return (
    <div>
      <Navbar/>
            <div className="active-cont">
            <Header type="thick" title="ADD INVOICE"/>
                <ToastContainer/>
                <h4 className="form-categories-header italic">COMPANY DETAILS</h4>

                <div className="po-details">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>COMPANY NAME</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className='label'>CONTACT NUMBER</div>
                        </div>
                        <div className="col-sm-4">
                            <div className='detail'>{contactNo}</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='label'>COMPANY EMAIL</div>
                        </div>
                        <div className="col-sm-3">
                            <div className='detail'>{email}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>COMPANY ADDRESS</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{address}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>CONTACT PERSON</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{contactPerson}</div>
                        </div>
                    </div>

                <h4 className="form-categories-header italic">DISCOUNT DETAILS</h4>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>DISCOUNT CODE</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{discountInfo.discount_code}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='label'>REMARKS</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{remarks}</div>
                        </div>
                    </div>
                </div>

                <Table
                    clickable={true}
                    type={'companies-review'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['DISCOUNT CODE', 'PRICE','QUANTITY', 'TOTAL']}
                    givenClass={'company-mobile'}
                />

                <div className="po-details">
                    <div className='label'>PARTICULARS</div>
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='particulars'>DISCOUNT CODE</div>
                        </div>
                        <div className="col-sm-8">
                            <div className='detail'>{address}</div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-end">
                  <button className="back-btn less-width">SAVE</button>
                </div>
            </div>
    </div>
  );
}

export default AddInvoice;
