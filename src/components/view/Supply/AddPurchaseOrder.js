import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddPurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function AddPurchaseOrder() {

  //style
  document.body.style = 'background: white;';

  //states
  const PoInfoData = {
    purchase_date: "",
    supplier: "",
    forwarder: "",
    delivery_date: "",
    requisitioner: "",
    delivery_address: "",
    remarks: "",
  };

  const [info, setInfo] = useForm(PoInfoData);
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([{ 
    order_quantity: " ", 
    unit: " ", 
    item: " ",
    cost: " ",
    item_discount: " ",
  }]);

  const [itemInfo, setItemInfo] = useState([]);

  const handleItemChange = (e,index) => {
    const {name, value} = e.target;
    const list = [...items];
    list[index][name] = value;

    if(name == "item") {
      itemInfo.map((data,index) => {
        if(data.id == value){
            list[index]['cost'] = data.cost;
        }
      })
    }

    setItems(list);
    console.log(items)
  };

  const removeItems = (index) => {
       const list = [...items];
       list.splice(index, 1);
       setItems(list);
       console.log(items)
  };

  const addItems = () => {
    setItems([
      ...items,
      {
        order_quantity: 0, 
        unit: "",
        item: " ",
        cost: " ",
        item_discount: " ",
      },
    ]);
  };

  //redirection
  const [redirect, setRedirect] = useState(false);

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
        itemInfo.name = data.name;
        itemInfo.cost = data.cost;
        setItemInfo(oldArray => [...oldArray, itemInfo]);
      });
    }).catch(function(error) {
      console.log(error)
    });

    axios({
      method: 'post',
      url: window.$link + 'suppliers/getAll',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
  }).then(function (response) {
      console.log(response.data.suppliers);

      response.data.suppliers.map((data, index) => {
          var supplierInfo = {};

          supplierInfo.id = data.id;
          supplierInfo.name = data.name;
          supplierInfo.address = data.address;
          supplierInfo.phone = data.contact_no;
          supplierInfo.email = ''; //to add email
          supplierInfo.tin = data.tin;
          supplierInfo.remarks = data.remarks;

          setSuppliers(oldArray => [...oldArray, supplierInfo]);
      });
  }).catch(function(error) {
      console.log(error);
  });

  },[]);

  //API submit call
  function submit(e, info, items) {
    e.preventDefault();

    var item_ids = [];
    var costs = [];
    var item_discounts = [];
    var qty = [];
    var units = [];

    items.map((data, index) => {
      item_ids.push(data.item);
      costs.push(data.cost);
      item_discounts.push(data.item_discount);
      qty.push(data.order_quantity);
      units.push(data.unit);
    });

    axios({
      method: 'post',
      url: window.$link + 'pos/create',
      withCredentials: false,
      params: {
        token: userToken,
        api_key: window.$api_key,
        supplier: info.supplier,
        purchase_date: info.purchase_date,
        delivery_date: info.delivery_date,
        delivery_address: info.delivery_address,
        requisitioner: info.requisitioner,
        forwarder: info.forwarder,
        items: item_ids,
        cost: costs,
        item_discount: item_discounts,
        qty: qty,
        unit: units,
        remarks: '',
        added_by: userId,
      },
    }).then(function (response) {
      console.log(response);
      console.log(info.supplier);
      toast.success("Successfully added PO!");
      setTimeout(function () {
        setRedirect(true);
      }, 2000);
    }).catch(function (error) {
      console.log(error);
      toast.error("Oops...something went wrong");
    });
  };

  var purchaseItems = items.map((row, index) => {
    console.log(itemInfo);
    return (
                    <tr key={index}>
                        <td>
                          <input type="number" name="order_quantity" id="order_quantity" value={row.order_quantity} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="text" name="unit" id="unit" value={row.unit} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <select className='purchase-select' name="item" id="item" onChange={(e) => handleItemChange(e, index)}>
                            <option  value="" selected disabled>Select Item</option>
                            {itemInfo.map((data,info) => {
                                return <option value={data.id}>{data.name}</option>
                            })}
                          </select>
                        </td>
                        <td>
                          <input type="number" name="cost" id="cost" value={row.cost} value={row.cost} onChange={(e) => handleItemChange(e, index)} className="purchase-item" disabled readOnly/>
                        </td>
                        <td>
                          <input type="number" name="item_discount" id="item_discount" value={row.item_discount} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                        {items.length !== 1 && (
                          <button className="delete-purchase-btn" onClick={() => removeItems(index)}>
                            DELETE
                          </button> 
                        )}
                        </td>
                      </tr>
    )
  })

  //redirect
  if (redirect == true) {
    return <Navigate to="/purchase-order" />;
  }

  console.log(suppliers)

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PURCHASE ORDER" />
        <ToastContainer/>

        <h1 className="item-header">PURCHASE ORDER INFO</h1>
          <div className="item-details-cont">
            <div className="row">
              <div className="col-sm-4">
                <span className="item-id-label">PURCHASE DATE</span>
              </div>
              <div className="col-sm-8">
                <input type="date" name="purchase_date" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">SUPPLIER</span>
              </div>
              <div className="col-sm-8">
                <select name="supplier" className="item-supplier-input" onChange={setInfo}>
                <option value="" selected disabled>Choose here</option>
                  {suppliers.map((data,index) => {
                    return (
                      <option value={data.id}>{data.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">FORWARDER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="forwarder" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">BRANCH</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="branch" className="item-name-input" />
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">FORWARDER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="forwarder" className="item-name-input" />
              </div>
            </div>  */}
          </div>

          <h1 className="item-header">ADDITIONAL INFO</h1>

          <div className="item-details-cont">
            <div className="row">
              <div className="col-sm-4">
                <span className="item-id-label">DELIVERY DATE</span>
              </div>
              <div className="col-sm-8">
                <input type="date" name="delivery_date" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REQUISITIONER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="requisitioner" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">DELIVERY ADDRESS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="delivery_address" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="remarks" className="item-name-input" onChange={setInfo}/>
              </div>
            </div>
          </div>

          <div className="add-items-cont">
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">  </div>
                <table className='table-container__table'>
                    <thead>
                        <tr>
                        <th>Order Qty</th>
                        <th>Unit</th>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>Item Discount -optional-</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {purchaseItems}
                    </tbody>
                </table>
        
            </div>


            {/* <div className="row d-flex justify-content-left">
              <div className="col-sm-7">
                <h1 className="add-item-header">QUANTITY</h1>
              </div>
              <div className="col-sm-5">
                <h1 className="add-item-header items">ITEMS</h1>
              </div>
            </div> */}

            {/* {items.map((item) => (
              <div className="row">
                <div className="col-sm-1">
                  <input key={item.id} type="number" name="quantity" className="quantity-item" />
                </div>
                <div className="col-sm-2">
                  <input key={item.id} type="text" name="item" className="items-item" />
                </div>
                </div>
                <div className="col-sm-5">
                  <button className="delete-items-btn" onClick={removeItems}>
                    DELETE
                  </button> 
                </div>
              </div>
            ))} */}
          </div>
        <div className="row d-flex justify-content-center">
          <button className="add-items-btn" onClick={addItems}>
            ADD ITEM
          </button>
          <button className="save-items-btn" onClick={(e) => submit(e, info, items)}>SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseOrder;
