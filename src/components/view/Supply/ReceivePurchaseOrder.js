import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';

//variables
const userToken = getToken();
const userId = getUser();

function ReceivePurchaseOrder() {

    document.body.style = 'background: white;';

    //States
    const [supplier, setSupplier] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [requisitioner, setRequisitioner] = useState("");
    const [forwarder, setForwarder] = useState("");
    const [status, setStatus] = useState("");
    const [payment, setPayment] = useState("");
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [pay, setPay] = useState(0);
    const [poItems, setPoItems] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [discount, setDiscount] = useState(0);
    const [seniorPwdId, setID] = useState("");
    const {id} = useParams();

    //others states
    const [redirect, setRedirect] = useState(false);
    const [unfilteredPoItems, setUnfilteredPoItems] = useState([]);
    const [releaseItems, setReleaseItems] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const handleItemChange = (e,index) => {
        const {name, value} = e.target;
        const list = [...releaseItems];
        list[index][name] = value;
        setReleaseItems(list);

        releaseItems.map((data) => {
            var tempTotal = 0;

            setSubTotal(tempTotal += ((data.qty * data.cost) - data.discount));
        })
    };

    React.useEffect(() => {
        setGrandTotal(subTotal - discount);
    },[subTotal]);
    


    React.useEffect(() => {
        poItems.length = 0;
        axios({
            method: 'post',
            url: window.$link + 'pos/show/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data)
               //format date
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
            }).then(function (response) {
                setSupplier(response.data.name);
            }).then(function (error) {
                console.log(error);
            })
            setPurchaseDate(pDate.toDateString());
            setDeliveryDate(dDate.toDateString());
            setDeliveryAddress(response.data.delivery_address);
            setRequisitioner(response.data.requisitioner);
            setForwarder(response.data.forwarder);
            setGrandTotal(response.data.grand_total);
            setDiscount(response.data.discount);
            setSubTotal(response.data.subtotal)
            setRemarks(response.data.remarks);
            setStatus(response.data.status);
          });

        axios({
            method: 'post',
            url: window.$link + 'pos/getPoItems/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data);
              setUnfilteredPoItems(response.data);
              response.data.map((data,index) => {
                
                if(data.status != "disapprove") {
                    var itemData = {};
                    itemData.id = data.id;
                    itemData.item = data.item;
                    itemData.qty = data.qty;
                    itemData.unit = data.unit;
                    itemData.amount = data.cost;
                    itemData.discount = data.discount;
                    
                    setPoItems(oldArray => [...oldArray, itemData]);
                }
              });
          }).catch(function (error) {
              console.log(error);
          })
    },[]);

    React.useEffect(() => {
        unfilteredPoItems.map((data) => {
            setReleaseItems([
                ...releaseItems,
                {
                    item: data.id,
                    name: data.item,
                    cost: data.cost,
                    qty: data.qty,
                    unit: data.unit,
                    discount: data.discount,
                },
              ]);
        });
        console.log(unfilteredPoItems);

    },[unfilteredPoItems]);

    //components
    const listItems = poItems.map((data,index) => {
        return (
        <div className="row">
            <div className="col-sm-3">
                {data.item}
            </div>
            <div className="col-sm-1">
                {parseFloat(data.qty).toFixed(2)}                
            </div>
            <div className="col-sm-1">
                {data.unit}
            </div>
            <div className="col-sm-1">
                {data.amount}
            </div>
            <div className="col-sm-2">
                {data.discount}
            </div>      
            <div className="col-sm-2">
                {parseFloat(data.qty * data.amount - data.discount).toFixed(2)}
            </div>
            <div className="col-sm-2">
               <input type="number" className="received-qty-input" name="qty"  value={releaseItems[index].qty} onChange={(e) => handleItemChange(e, index)}/>
            </div>
        </div>
        )
    });

    //Functions
    function ReceiveItems() {
        var items = [];
        var cost = [];
        var qty = [];
        var unit = [];
        var names = [];

        releaseItems.map((data) => {
            items.push(data.item);
            cost.push(data.cost);
            qty.push(data.qty);
            unit.push(data.unit);
            names.push(data.name);
        });

        if(isClicked == false) {
            setIsClicked(true);
            axios({
                method: 'post',
                url: window.$link + 'po/receive/' + id,
                withCredentials: false, 
                params: {
                    token: userToken.replace(/['"]+/g, ''),
                    api_key: window.$api_key, 
                    po_item_ids: items,
                    items: names,
                    cost: cost,
                    qty: qty,
                    unit: unit,
                    received_by: userId,
                }
            }).then(function (response) {
                console.log(response);
                setTimeout(function () {
                    setRedirect(true);
                  }, 2000);
            });
        }
    }

        if(redirect == true) {
            var link = "/review-purchase-order/" + id;
            return (
                <Navigate to = {link}/>
            )
        }    

  return (
      <div> 
          <Navbar/>
          <div className="active-cont">
          <Header
                type="thin"
                title="ADD PAYMENT"
          />
          <ToastContainer/>

          <h4 className="form-categories-header italic">PURCHASE ORDER DETAILS</h4>
            
            <div className="po-details">
                <div className="row">
                <div className="col-sm-2">
                        <div className='label'>SUPPLIER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{supplier}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>PURCHASE DATE</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{purchaseDate}</div>
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                            <div className='label'>DELIVERY ADDRESS</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='detail'>{deliveryAddress}</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='label'>DELIVERY DATE</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='detail'>{deliveryDate}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                            <div className='label'>REQUISITIONER</div>
                    </div>
                    <div className="col">
                            <div className='detail'>{requisitioner}</div>
                    </div>
                    <div className="col-sm-2">
                            <div className='label'>FORWARDER</div>
                    </div>
                    <div className="col">
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
                <h5 className="form-categories-subheader italic">LIST OF PURCHASED ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-3 service">
                            ITEM
                        </div>
                        <div className="col-sm-1 service">
                            QTY
                        </div>
                        <div className="col-sm-1 service">
                            UNIT
                        </div>
                        <div className="col-sm-1 service">
                            AMOUNT
                        </div>
                        <div className="col-sm-2 service">
                            ITEM DISCOUNT
                        </div>
                        <div className="col-sm-2 service">
                            TOTAL
                        </div>
                        <div className="col-sm-2 service">
                            RECEIVED QUANTITY
                        </div>
                    </div>

                    {listItems}

                    <div className="row d-flex justify-content-center receive-cont">
                        <div className="col-sm-3">
                            <button className="po-print-btn" onClick={() => ReceiveItems()}>
                            Receive 
                            </button>
                        </div>
                    </div>

                </div>
          </div>
      </div>
  );
}

export default ReceivePurchaseOrder;
