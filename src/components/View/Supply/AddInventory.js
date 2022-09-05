import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import { Navigate } from 'react-router-dom';

//css
import './AddInventory.css';

//components
import Navbar from '../../Navbar';
import Header from '../../Header';
import ServiceItems from '../../ServiceItems';


/*********************************
 * RENDER VIEW
 ********************************/

function AddInventory() {

  //variables
  const userToken = getToken();
  const userId = getUser();

  const [items, setItems] = useState([]);
  const [countDate, setCountDate] = useState(null);
  const [redirect, setRedirect] = useState(false);

  //Handle change
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;  
    setItems(list);
  }

  function reformatDate(date) {
    var splitDate = date.split("-");

    var finalDate = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0];
    return finalDate
  }

   React.useEffect(()=>{
      items.length=0
      axios({
        method: 'post',
        url: window.$link + 'items/getAll',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
        },
      })
      .then((res)=>{
        // console.log(res.data.items.sort((a, b) => a.id - b.id))
        let itemData = res.data.items.filter(info=>info.item_name!==null)
        let data = itemData.sort((a, b) => a.id - b.id)
        data.map((data, index)=>{
          var item = {}
            item.id = data.id;
            item.id_item = data.item_id;
            item.item_name = data.item_name;
            item.unit=data.default_unit;
            item.beginning_balance = data.beginning_inventory;
            item.current_balance = parseFloat(data.qty).toFixed(2);
            item.remarks = data.remarks;
            item.updatedQty = "";

            setItems(oldArray => [...oldArray, item]);
        })
      })
      .catch((err)=>{console.log(err)})
    },[])

  function Submit() {
      var inventory_ids = [];
      var param_obj = {};

      items.filter(info=>info.updatedQty!=="").map((data,index) => {
        inventory_ids.push(data.id);
        param_obj["physical_count_" + data.id] = data.updatedQty;
      })

      param_obj.api_key = window.$api_key;
      param_obj.token = userToken.replace(/['"]+/g, '');
      param_obj.requester = userId;
      param_obj.inventory_ids = inventory_ids;
      param_obj.count_date = reformatDate(countDate);
      console.log(items)
      console.log(param_obj);

      axios({
        method: 'post',
        url: window.$link + 'inventory_counts/create',
        withCredentials: false,
        params: param_obj,
      })
      .then((res)=>{
          // console.log(res)
          if(res.status === 201) {
            toast.success("Successfully submitted!");
            setInterval(setRedirect(true), 1000);
          } else {
            toast.error("An error has occurred!");
          }
      })
  }

  if(redirect) {
    return (
      <Navigate to = "/inventory"/>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD INVENTORY" />
        <ToastContainer hideProgressBar={true} />
        <div className="booking-form">
          <h2 className="inventory-header italic">COUNT DETAILS</h2>
           <div className="row">
              <div className="col-sm-6">
                  <label for="count_date" className="service-item">COUNT DATE:</label>
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                  <input type="date" name="count_date" onChange={(e) => setCountDate(e.target.value)}/>
              </div>
            </div>
          <h2 className="inventory-header italic">ITEMS</h2>
          {
            items.map((row, index) => {
            return(
                    <div className="row">
                        <div className="col-sm-6">
                          <label for={row.item_name} className="service-item">{row.item_name}</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="qty-label">QTY </span>
                            <input type="number" className='item-qty-input' name="updatedQty" onChange={(e) => handleItemChange(e, index)} min="0"/>
                        </div>
                    </div>
            )
          })
          }

          <div className='row d-flex justify-content-end mt-5'>
            <button type="button" className="proceed-btn" onClick={() => Submit()}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInventory;
