import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
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

function ReviewCompanyInvoices() {
  document.body.style = 'background: white;';

  //Invoice details
  const {id} = useParams();
  const [redirect, setRedirect] = useState(false);

  //Company details
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [discountCodes, setDiscountCodes] = useState("");

  //Redirection
  const [toAddPayment, setToAddPayment] = useState(false);
  const [toAddInvoice, setToAddInvoice] = useState(false);

  //Add Invoice Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      setName(company.data.name);
      setContactNo(company.data.contact_no);
      setEmail(company.data.company_email);
      setAddress(company.data.address);
      setContactPerson(company.data.contact_person);

    }).then(function(error) {
      console.log(error);
    });
  },[]);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'discounts/company/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      setDiscountCodes(response.data);
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
      <Navigate to ={"/add-invoice/" + id + "/" + selectedCode}/>
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
            <Header type="thick" title="COMPANY INVOICES" buttons={buttons} addInvoice={handleShow}/>
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
                </div>

                <h4 className="form-categories-header italic">INVOICES</h4>

                <Table
                    clickable={true}
                    type={'companies-review'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['INVOICE NO.', 'DISCOUNT CODE', 'PRICE', 'TOTAL']}
                    // filteredData={filteredData}
                    // setFilter={setFilter}
                    // filter={filter}
                    givenClass={'company-mobile'}
                />

                <div className="row d-flex justify-content-end">
                  <button className="add-payment-btn" onClick={() => addPayment()}>ADD PAYMENT</button>
                </div>

                <div className="row d-flex justify-content-end">
                  <button className="back-btn less-width" onClick={() => setRedirect(true)}>BACK</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>ADD INVOICE</Modal.Title>
              </Modal.Header>
              <form>
              <Modal.Body>
                
              <span>Choose discount code to add invoice:</span>
              <select name="discountCode" className="invoice-select" value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
                <option value="" disabled selected>Select</option>
                {discountCodes != "" && discountCodes.map((data,index) => {
                  return (
                    <option value={data.id}>{data.discount_code}</option>
                  )
                })}
              </select>


              </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={addInvoice}>
                    Go
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>

    </div>
  );
}

export default ReviewCompanyInvoices;
