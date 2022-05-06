import React, {useState} from "react";
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//css
import "../Reports/Reports.css"
// components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import { release } from "process";

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
  const [receivePoItems, setReceivePoItems] = useState([]);
  const [receiveItems, setReceiveItems] = useState([]);
  const [unfilteredPoItems, setUnfilteredPoItems] = useState([]);
  const [releaseItems, setReleaseItems] = useState([]);
  const [receiveTable, setReceiveTable] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Handle input
  const handleReceiveItem = (e,index) => {
      const {name, value} = e.target;
      const list = [...releaseItems];
      if(list[index]["qty"] >= value && value >= 0) {
          list[index][name] = value;
          setReleaseItems(list);
      }
  };

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
      setRemarks(response.data.remark);
    })
    .catch((error)=>{console.log(error)})

    axios({
      method: 'post',
      url: window.$link + 'pos/getPoItems/' + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      }
    })
    .then((response)=>{
      // console.log(response)
      setUnfilteredPoItems(response.data)
      response.data.map((data,index)=>{

        // item table (first table)
        var item={};
        item.name = data.item;
        item.unit = data.unit;
        item.ordered = parseFloat(data.qty);
        item.received = parseFloat(data.received);
        item.balance = item.ordered-item.received;
        setPoItems(oldArray=>[...oldArray, item]);

      })    
    })
    .catch((err)=>{
      console.log(err)
    })


  },[])

  React.useEffect(()=>{
    releaseItems.length = 0;
    unfilteredPoItems.map((data) => {
        var info={};
        info.po_item_id = data.id;
        info.item_id = data.item_id;
        info.cost = data.cost;
        info.name = data.item;
        info.qty = parseFloat(data.qty).toFixed(2);
        info.unit = data.unit; 
        info.prevReceived = parseFloat(data.received).toFixed(2);
        info.received = 0;
        setReleaseItems(oldArray => [...oldArray, info]);
    });
  }, [unfilteredPoItems])

  function submit(e){
    e.preventDefault();
    if(isClicked == false){
      setIsClicked(true);
      var po_item_id = [];
      var cost = [];
      var received = [];
      var unit = [];
      var names = [];
      var item_ids = [];
    }
    releaseItems.map((data) => {
        po_item_id.push(data.po_item_id);
        item_ids.push(data.item_id);
        cost.push(data.cost);
        received.push(data.received);
        unit.push(data.unit);
        names.push(data.name);
    });
    axios({
    method: 'post',
    url: window.$link + 'pos/receive/' + id,
    withCredentials: false, 
    params: {
        token: userToken.replace(/['"]+/g, ''),
        api_key: window.$api_key, 
        po_item_ids: po_item_id,
        items: item_ids,
        cost: cost,
        qty: received,
        unit: unit,
        received_by: userId,
      }
    })  
    .then((response)=>{
      // console.log(response);
      toast.success("Receive Successful!");
      setTimeout(function () {
          // setRedirect(true);
          refreshPage();
      }, 2000);
    }).catch((error)=>{console.log(error)})
  }

 if (redirect == true) {
    var link = '/reports-incomplete-po';
    // console.log(link);
    return <Navigate to={link} />;
  }
  

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
      <br/>
      {!receiveTable&&(<div>
      <Table
        type={'incomplete-po-items'}
        tableData={poItems}
        rowsPerPage={20}
        headingColumns={['ITEM NAME','UNI','ORDERED QTY','RECEIVED QTY','BALANCE']}
      />
      <div className="button-area">
        <button className="upload-res-btn blue" onClick={()=>{setReceiveTable(true)}}>RECEIVE ITEMS</button>
        <button className="upload-res-btn" onClick={()=>{setRedirect(true)}}>CANCEL</button>
      </div>
      </div>)}
      {receiveTable&&(<div>
      <Table
        type={'receive-incomplete-po-items'}
        tableData={releaseItems}
        rowsPerPage={20}
        headingColumns={['PARTICULARS','ORDERED QTY', 'PREVIOUSLY RECEIVED QTY','DELIVERED QTY']}
        receiveData={handleReceiveItem}
      />
      <div className="button-area">
        <button className="upload-res-btn blue" onClick={submit}>SAVE</button>
        <button className="upload-res-btn" onClick={()=>{setReceiveTable(false)}}>CANCEL</button>
      </div>
      </div>)}
      <br/>
      <br/>
      <br/>


    </div>
  </div>
)

}