import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddItems.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function AddItems() {

    //style
    document.body.style = 'background: white;';

    //states
    const ItemData = {
        date: "",
        requisitioner: "",
        remarks: ""
    };

    const [info, setInfo] = useForm(ItemData);
    const [itemInfo, setItemInfo] = useState([]);
    const [items, setItems] = useState([{
        quantity: "",
        unit: "",
        item: "",
    }]); 

    const [existingItems, setRemoveItems]  = useState(items);
    const [redirect, setRedirect] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleItemChange = (e,index) => {
        const {name, value} = e.target;
        const list = [...items];
        list[index][name] = value;

        if(name == "item") {
            itemInfo.map((data,i) => {
              if(data.id == value){
                  list[index]['cost'] = data.cost;
              }
            })
          }
    
        setItems(list);
        console.log(items);
    };

    const addItems = () => {
        setItems([
          ...items,
          {
            quantity: "",
            unit: "",
            item: "",
          },
        ]);
      };

    const removeItems = (index) => {
        const list = [...items];
        list.splice(index, 1);
        setItems(list);
        console.log(items)
   };

        //API get items
  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'items/getAll',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      },
    }).then(function (response) {
      console.log(response.data.items)
      response.data.items.map((data,index) => {
        var itemInfo = {};
        itemInfo.id = data.id;
        itemInfo.name = data.item_name;
        itemInfo.cost = data.cost;
        setItemInfo(oldArray => [...oldArray, itemInfo]);
      });
    }).catch(function(error) {
      console.log(error)
    });
  },[]);

    //API submit call
   function submit(e) {

    e.preventDefault();

    var item_ids = [];
    var costs = [];
    var qty = [];
    var units = [];

    items.map((data, index) => {
      item_ids.push(data.item);
      costs.push(data.cost);
      qty.push(data.quantity);
      units.push(data.unit);
    });

    if(isClicked == false) {
        setIsClicked(true);
        axios({
            method: 'post',
            url: window.$link + 'releases/create',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              release_date: info.date,
              requisitioner: info.requisitioner,
              remarks: info.remarks,
              items: item_ids,
              cost: costs,
              qty: qty,
              unit: units,
              added_by: userId,
            },
          }).then(function (response) {
              console.log(response);
              toast.success("Successfully added releasing items!");
              setTimeout(function () {
                setRedirect(true);
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }
   }

    //redirect
    if (redirect == true) {
        return <Navigate to="/release-item" />;
    }

    console.log(info);
    

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
        <Header 
            type="thin"
            title="ADD ITEMS"
        />
        <ToastContainer/>
        <h1 className="item-header">ITEMS DETAILS</h1>
        <form>
        <div className="item-details-cont">
            <div className="row">
                <div className="col-sm-3">
                    <span className="date-label">DATE</span>
                </div>
                <div className="col-sm-9">
                    <input type="date" name="date" className="date-input" onChange={setInfo}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <span className="requistioner-label">REQUISITIONER</span>
                </div>
                <div className="col-sm-9">
                    {/* <input type="text" name="requisitioner" className="requistioner-input" onChange={setInfo}/> */}
                    <select name="requisitioner" className="requistioner-input" onChange={setInfo}>
                        <option value="Admin">Admin</option>
                        <option value="Laboratory">Laboratory</option>
                        <option value="Reception">Reception</option>
                        <option value="XRAY">Xray</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <span className="remarks-label">REMARKS</span>
                </div>
                <div className="col-sm-9">
                    <textarea name="remarks" className="remarks-input" rows="4" cols="40" onChange={setInfo}/>
                </div>
            </div>
        </div>
        <div className="add-items-cont">
            <div className="row">
                <div className="col-sm-4">
                    <h1 className="item-header">QUANTITY</h1>
                </div>
                <div className="col-sm-4">
                    <h1 className="item-header left">UNIT</h1>
                </div>
                <div className="col-sm-4">
                    <h1 className="item-header left-2">ITEMS</h1>
                </div>
            </div>

            {items.map((item, index) => (
                <div className="row">
                 <div className="col-sm-2">
                     <input key={item.id} type="number" name="quantity" className="quantity-item" onChange={(e) => handleItemChange(e, index)}/>
                 </div>
                 <div className="col-sm-2">
                     <input key={item.id} type="text" name="unit" className="quantity-item" onChange={(e) => handleItemChange(e, index)}/>
                 </div>
                 <div className="col-sm-7">
                    <select className='items-item' name="item" id="item" onChange={(e) => handleItemChange(e, index)}>
                            <option  value="" selected disabled>Select Item</option>
                            {itemInfo.map((data,info) => {
                                return<option value={data.id}>{data.name}</option>
                            })}
                    </select>
                </div>
             </div>
            ))}
        </div>

        </form>
        <div className="row d-flex justify-content-center">
            <button className="add-items-btn" onClick={addItems}>ADD ITEM</button>
            {items.length !== 1 && (
                <button className="delete-items-btn" onClick={removeItems}>REMOVE ITEM</button>
            )}
            <button className="save-items-btn" onClick={(e) => submit(e)}>SAVE</button>
        </div>
        </div>
        </div>
    )
}

export default AddItems
