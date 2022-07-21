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
  const [redirect_discount, setRedirectDiscount] = useState(false);
  const [info, setInfo] = useState([]);
  const [particulars, setParticulars] = useState([]);
  const [dataset, setTempData] = useState([]);
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  

  //Company details
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [remarks, setRemarks] = useState("");
  const [discountInfo, setDiscountInfo] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState(false)

  //Discount Details
  const [discountDetails, setDiscountDetails] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [qty, setQty] = useState(0);

  //Redirection
  const [toAddPayment, setToAddPayment] = useState(false);
  const [toAddInvoice, setToAddInvoice] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  React.useEffect(() => {
    setInfo([])
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
      setCompanyId(company.data.id);
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
      setDiscountInfo(response.data.data.discount);
    }).then(function(error) {
      console.log(error);
    });
  },[]);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'bookings/getByDiscountCode',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          discount_code: discountInfo.discount_code,
          requester: userId,

      }
    }).then(function (response){
      // console.log(response)
      var output = [];
      setGrandTotal(response.data.data.total);
      setQty(response.data.data.quantity);
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
                 output[existingIndex].total_amount = output[existingIndex].total_amount.concat(" " + item.total_amount)
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

  React.useEffect(()=>{
    setInfo([])
    var temp_total = 0
    particulars.map((arr, index)=>{
      var amt = arr.grand_total.split(" ");
      amt.map((temp_amt, index) => {
        var info = {};
        var date = new Date(arr.booking_time)
        var formattedDate = date.toDateString().split(" ")
        const temp_date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
        info.date=temp_date
        info.price = temp_amt
        info.booking = arr.customer.length
        temp_total = (parseFloat(info.price)*parseFloat(info.booking)) + parseFloat(temp_total)
        info.total = temp_total
        setInfo(oldArray=>[...oldArray, info])
      })
    })
  }, [particulars])

  function addInvoice() {
    if(isClicked == false) {
      setIsClicked(true);
      // console.log(isClicked)
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
            price:total,
            qty: info.length,
            total: total,
            added_by: userId,
        }
      }).then(function (response) {
        toast.success("Successfully added invoice!");
          setTimeout(function() {
            setRedirect(true);
        }, 2000);
      }).then(function(error) {
        console.log(error);
      });
    }
  }


  if(redirect == true) {
      return (
        <Navigate to = {"/company-invoices"}/>
    )
  }
  function handleDelete(){
    axios({
              method: 'post',
              url: window.$link + 'discounts/deleteCompanyDiscount/' + discount,
              withCredentials: false, 
              params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  updated_by: userId,
              }
          }).then(function (booking) {      
              toast.success("Discount successfully deleted!");
              setTimeout(function () {
                  setRedirectDiscount(true);
              }, 2000);
          }).catch(function (error) {
              console.log(error);
          });
        }
     if(redirect_discount == true) {
      return <Navigate to="/company-discounts" />;
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

                {info.length>0 && (
                <Table
                    clickable={true}
                    type={'add-invoice'}
                    tableData={info}
                    rowsPerPage={4}
                    headingColumns={['DATE','PRICE', 'QTY','TOTAL']}
                    givenClass={'company-mobile'}
                />
                )}
                
                {grandTotal != null && grandTotal != 0 && (
                  <div className="row">
                      <div className="col d-flex justify-content-end grand-total">
                          <span className="label">GRAND TOTAL: <b className="invoice-total">P {parseFloat(grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                      </div>
                  </div>
                )}  
               

                {info.length<1 && (
                  <div className="row d-flex justify-content-center info">
                       NO COMPANY DISCOUNT BOOKINGS FOR THIS INVOICE
                  </div>
               )}
  

                <div className="po-details">
                    {particulars.length != 0 && (
                        <div className='label'>PARTICULARS<br/>Total: {qty}<br/> </div>
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
                
                {info.length>0 && (
                <div className="row d-flex justify-content-end">
                  <button className="back-btn less-width" onClick={() => addInvoice()}>GENERATE INVOICE</button>
                </div>
                )}

                {info.length == 0 && (
                <div className="row d-flex justify-content-end">
                  <button className="back-btn less-width" onClick={handleDelete}>DELETE DISCOUNT</button>
                </div>
                )}    
            </div>
    </div>
  );
}

export default AddInvoice;
