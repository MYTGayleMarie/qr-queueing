import React, {useState} from "react";
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//css

// components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//VARIABLES
const userToken = getToken();
const userId = getUser();

export default function ReportIncompletePOReview(){
  const {id} = useParams();

  // Incomplete PO details
  const [supplier, setSupplier] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [requisitioner, setRequisitioner] = useState("");
  const [forwarder, setForwarder] = useState("");
  const [remarks, setRemarks] = useState("");
  const [poItems, setPoItems] = useState([]);

  // Get PO Details
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'pos/show/' + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      }
    })
    .then((response)=>{
      // console.log(response)
      // format date
      var pDate = new Date(response.data.purchase_date);
      var dDate = new Date(response.data.delivery_date);
      axios({
          method: 'post',
          url: window.$link + 'suppliers/show/' + response.data.supplier_id,
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
      }).then((response)=>{
          setSupplier(response.data.name);
      }).then((error)=>{
          console.log(error);
      })
      setPurchaseDate(pDate.toDateString());
      setDeliveryDate(dDate.toDateString());
      setDeliveryAddress(response.data.delivery_address);
      setRequisitioner(response.data.requisitioner);
      setForwarder(response.data.forwarder);
    })
    .catch((error)=>{console.log(error)})
  })


return(
  <div>
    <Navbar/>
    <div className="active-cont">
      <Header 
        type='thin'
        title='REVIEW PURCHASE ORDER' 
        buttons= {[]}
      />
      <ToastContainer/>
       <h4 className="form-categories-header italic">PURCHASE ORDER DETAILS</h4>
       <div className="po-details">
            <div className="row">
                <div className="col-sm-4">
                        <span className='label'>SUPPLIER</span>
                        <span className='detail'>{supplier}</span>
                </div>
                <div className="col-sm-6">
                        <span className='label'>PURCHASE DATE</span>
                        <span className='detail'>{purchaseDate}</span>
                </div>
            </div>
            <div className="row ">
                <div className="col-sm-2">
                        <div className='label'>DELIVERY ADDRESS</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{deliveryAddress}</div>
                </div>
                <div className="col-sm-5">
                        <span className='label'>DELIVERY DATE</span>
                        <span className='detail'>{deliveryDate}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                        <div className='label'>REQUISITIONER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{requisitioner}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>FORWARDER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{forwarder}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                        <div className='label'>REMARKS</div>
                </div>
                <div className="col-sm-10">
                        <div className='detail'>{remarks}</div>
                </div>
            </div>
        </div>
      <br/>
      <h4 className="form-categories-header italic">ITEM DETAILS</h4>
    </div>
  </div>
)}