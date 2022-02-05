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
    discount: "",
  };

  //TOTAL
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  //ITEMS
  const [info, setInfo] = useForm(PoInfoData);
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([{ 
    order_quantity: " ", 
    unit: " ", 
    item: " ",
    cost: " ",
    item_discount: " ",
    total: " ",
  }]);

  const [itemInfo, setItemInfo] = useState([]);

  const handleItemChange = (e,index) => {
    const {name, value} = e.target;
    const list = [...items];
    list[index][name] = value;

    if(name == "item") {
      itemInfo.map((data,i) => {
        if(data.id == value){
            list[index]['cost'] = data.cost;
            list[index]['unit'] = data.unit;
        }
      })
    }

    if(list[index]["order_quantity"] != " " && list[index]["cost"] && list[index]["item_discount"]) {
      list[index]["total"] = parseFloat((list[index]["order_quantity"] * list[index]["cost"]) - list[index]["item_discount"]).toFixed(2);
    }

    setItems(list);
    console.log(items);

    var subTotal = 0;
    var discountTotal = 0;
    var grandTotal = 0;

    if(list[index]["total"] != " ") {
      items.map((data,index) => {
        if(data.total != " ") {
          subTotal += parseFloat(data.total);
        }
        if(data.item_discount != " ") {
          discountTotal += parseFloat(data.item_discount);
        }
      });

      if(subTotal != 0 && discountTotal != 0) {
        grandTotal = subTotal - discountTotal;
      } else {
        grandTotal = subTotal
      }
      setSubTotal(subTotal);
      setDiscount(discountTotal);
      setGrandTotal(grandTotal);
    }
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
        order_quantity: " ", 
        unit: " ", 
        item: " ",
        cost: " ",
        item_discount: " ",
        total: " ",
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
        itemInfo.name = data.item_name;
        itemInfo.cost = data.cost;
        itemInfo.unit = data.default_unit;
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
                          <input type="number" name="order_quantity" id="order_quantity" value={row.order_quantity} onChange={(e) => handleItemChange(e, index)} className="purchase-item qty" />
                        </td>
                        <td>
                          <input type="text" name="unit" id="unit" value={row.unit} className="purchase-item unit" readOnly/>
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
                          <input type="number" name="cost" id="cost" value={row.cost} onChange={(e) => handleItemChange(e, index)} className="purchase-item cost" readOnly/>
                        </td>
                        <td>
                          <input type="number" name="item_discount" id="item_discount" value={row.item_discount} onChange={(e) => handleItemChange(e, index)} className="purchase-item item-discount" />
                        </td>
                        <td>
                          <input type="number" name="total" id="total" value={row.total} onChange={(e) => handleItemChange(e, index)} className="purchase-item total" />
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
                        <th>Total</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {purchaseItems}
                    </tbody>
                </table>
        
            </div>
          </div>

        <div className="row d-flex justify-content-end mb-0">
          <div className="col-sm-2">
              <span className="item-name-label">SUBTOTAL</span>
          </div>
          <div className="col-sm-2">
              <span>P {subTotal != null ? parseFloat(subTotal).toFixed(2) : "0.00"}</span>
          </div>
        </div>     
        <div className="row d-flex justify-content-end mb-0">
          <div className="col-sm-2">
              <span className="item-name-label">DISCOUNT TOTAL</span>
          </div>
          <div className="col-sm-2">
              {/* <span>P {discount != null ? parseFloat(discount).toFixed(2) : "0.00"}</span> */}
              P <input type="number" name="discount" className="discount-input" value={discount != null ? parseFloat(discount).toFixed(2) : "P 0.00"} readOnly/>
          </div>
        </div>     
        <div className="row d-flex justify-content-end mb-0">
          <div className="col-sm-2">
              <span className="item-name-label">GRAND TOTAL</span>
          </div>
          <div className="col-sm-2">
              <span>P {grandTotal != null ? parseFloat(grandTotal).toFixed(2) : "0.00"}</span>
          </div>
        </div>     
        <div className="row d-flex justify-content-center m-5">
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
