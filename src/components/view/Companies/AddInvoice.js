import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTime, getToken, getUser, refreshPage} from "../../../utilities/Common";
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

var invoice = {
  discount_code: "",
  quantity: "",
  price: "",
  total: ""
};

function AddInvoice() {
  document.body.style = 'background: white;';

  //Invoice details
  const {id, discount} = useParams();
  const [redirect, setRedirect] = useState(false);
  const [info, setInfo] = useState([invoice]);
  const [particulars, setParticulars] = useState([]);
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  

  //Company details
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [remarks, setRemarks] = useState("");
  const [discountInfo, setDiscountInfo] = useState("");

  //Discount Details
  const [discountDetails, setDiscountDetails] = useState("");

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

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'bookings/getByDiscountCode/' + discountInfo.discount_code,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
      console.log(response.data.data)
      var data = {};
      data.discount_code = discountInfo.discount_code;
      data.price = response.data.data.price;
      data.quantity = response.data.data.quantity;
      data.total = response.data.data.total;

      setInfo([data]);
      setPrice(response.data.data.price);
      setTotal(response.data.data.total);
   
      var output = [];
      var array = response.data.data.particulars;
         array.forEach(function(item, index) {
             var existing = output.filter(function(v, i) {
                 var vDate = v.booking_time.split(" ");
                 var iDate = item.booking_time.split(" ");
          
                 return vDate[0] == iDate[0];
             });
  
             if (existing.length) {
                 var existingIndex = output.indexOf(existing[0]);
                 output[existingIndex].customer = output[existingIndex].customer.concat(item.customer);
             } else {
             if (typeof item.customer == 'string')
                 item.customer = [item.customer];
             output.push(item);
             }
         });
  
         setParticulars(output)
    }).then(function(error) {
      console.log(error);
    });
  },[discountInfo]);

  function addInvoice() {
    axios({
      method: 'post',
      url: window.$link + 'Company_invoices/create',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          company_id: discountInfo.company_id,
          discount_id: discount, 
          discount_code: discountInfo.discount_code,
          price: price,
          qty: info[0].quantity,
          total: total,
          added_by: userId,
      }
    }).then(function (response) {
      console.log(response);
      toast.success("Successfully added invoice!");
        setTimeout(function() {
          setRedirect(true);
      }, 2000);
    }).then(function(error) {
      console.log(error);
    });
  }

  if(redirect == true) {
      return (
        <Navigate to = {"/review-invoice/" + id}/>
    )
  }

  console.log(info)

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

                {info[0].discount_code != '' && (
                <Table
                    clickable={true}
                    type={'add-invoice'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['DISCOUNT CODE', 'PRICE','QUANTITY', 'TOTAL']}
                    givenClass={'company-mobile'}
                />
                )}

                {info[0].discount_code == '' && (
                  <div className="row d-flex justify-content-center info">
                       NO COMPANY DISCOUNT BOOKINGS FOR THIS INVOICE
                  </div>
                )}

                <div className="po-details">
                    {particulars.length != 0 && (
                        <div className='label'>PARTICULARS</div>
                    )}
                    {particulars.map((data,index) => {

                      var date = new Date(data.booking_time);
                      var formattedDate = date.toDateString().split(" ");

                      return (
                      <div className="row">
                          <div className="col-sm-2">
                              <div className='particulars'>{formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}</div>
                          </div>
                          <div className="col-sm-8">
                              <div className='detail'>
                              {data.customer.map((customer, index) => {
                                if(data.customer.length - 1 != index) {
                                  return customer + ", "
                                } else {
                                  return customer 
                                }

                              })}</div>
                          </div>
                      </div>
                      )
                    })}
                </div>
                
                {info[0].discount_code != '' && (
                <div className="row d-flex justify-content-end">
                  <button className="back-btn less-width" onClick={() => addInvoice()}>SAVE</button>
                </div>
                )}
            </div>
    </div>
  );
}

export default AddInvoice;
