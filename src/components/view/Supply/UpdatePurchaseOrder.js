import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
//css
import './AddPurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function UpdatePurchaseOrder() {

  //style
  document.body.style = 'background: white;';

  //Edit PO details
  const {id} = useParams();
  const [editSupplier, setEditSupplier] = useState("");
  const [editPurchaseDate, setEditPurchaseDate] = useState("");
  const [editDeliveryDate, setEditDeliveryDate] = useState("");
  const [editDeliveryAddress, setEditDeliveryAddress] = useState("");
  const [editRequisitioner, setEditRequisitioner] = useState("");
  const [editForwarder, setEditForwarder] = useState("");
  const [editRemarks, setEditRemarks] = useState("");
  const [poItems, setPoItems] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  //redirection
  const [redirect, setRedirect] = useState(false);
  
  
  //states
  const [showItem, setShowItem] = useState(false);
  
  const PoInfoData = {
    purchase_date: "",
    supplier: "",
    forwarder: "",
    delivery_date: "",
    requisitioner: "",
    delivery_address: "",
    remarks: "",
  };

 async function fetchSuppliers(supplierID){
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

    response.data.suppliers.map((data, index) => {
        var supplierInfo = {};

        supplierInfo.value = data.id;
        supplierInfo.label = data.name;
        // supplierInfo.address = data.address;
        // supplierInfo.phone = data.contact_no;
        // supplierInfo.email = ''; //to add email
        // supplierInfo.tin = data.tin;
        // supplierInfo.remarks = data.remarks;

        setSuppliers(oldArray => [...oldArray, supplierInfo]);
        
        if(data.id === supplierID){
          console.log("entered", data)
          var edit_supplier = {label:data.name, value:data.id}
          // setEditSupplier(edit_supplier)
          setSelectedSuppliers(edit_supplier)
        }
    });

}).catch(function(error) {
    console.log(error);
});
 }

 console.log("suppliers", suppliers)
    //Fetch PO details
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
            setEditSupplier(response.data.supplier_id);
            
            setEditPurchaseDate(response.data.purchase_date);
            setEditDeliveryDate(response.data.delivery_date);
            setEditDeliveryAddress(response.data.delivery_address);
            setEditRequisitioner(response.data.requisitioner);
            setEditForwarder(response.data.forwarder);
            setEditRemarks(response.data.remarks);
fetchSuppliers(response.data.supplier_id)
        }).catch(function (error) {
            console.log(error);
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
              response.data.map((data,index) => {
                var itemData = {};
                itemData.order_quantity = data.qty;
                itemData.unit = data.unit;
                itemData.item = data.item_id;
                itemData.cost = data.cost;
                
                itemData.item_discount = data.discount;
                setPoItems(oldArray => [...oldArray, itemData]);
              });
          }).catch(function (error) {
              console.log(error);
          })

    },[]);
console.log("selectedSupplier",selectedSuppliers)

  const [items, setItems] = useState(poItems);

  React.useEffect(() => {
    setItems(poItems);
  },[poItems]);

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
        itemInfo.id = data.item_id;
        itemInfo.name = data.item_name;
        itemInfo.cost = data.cost;
        setItemInfo(oldArray => [...oldArray, itemInfo]);
      });
    }).catch(function(error) {
      console.log(error)
    });

  },[]);

  //Update
  function edit(e) {

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
        url: window.$link + 'pos/update/' + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          supplier: selectedSuppliers.value,
          purchase_date: editPurchaseDate,
          delivery_date: editDeliveryDate,
          delivery_address: editDeliveryAddress,
          requisitioner: editRequisitioner,
          forwarder: editForwarder,
          items: item_ids,
          cost: costs,
          item_discount: item_discounts,
          qty: qty,
          unit: units,
          remarks: editRemarks,
          updated_by: userId,
        },
      }).then(function (response) {
          console.log(response);
          toast.success("Successfully updated PO!");
          setTimeout(function () {
            setRedirect(true);
          }, 2000);
      }).catch(function (error) {
          console.log(error);
          toast.warning("Oops something went wrong...");
      })
}
console.log("items", items)
  var purchaseItems = items.map((row, index) => {
    
    return ( 
                    <tr key={index}>
                        <td className='input-group input-group-sm'>
                          <input type="number" name="order_quantity" id="order_quantity" value={row.order_quantity} onChange={(e) => handleItemChange(e, index)} className="form-control qty" style={{width:"80%"}} />
                        </td>
                        <td>
                        <div className='input-group input-group-sm'>
                          <input type="text" name="unit" id="unit" value={row.unit} onChange={(e) => handleItemChange(e, index)} className="form-control unit" />
                          </div></td>
                       
                        <td>
                          <select className='form-select form-select-sm' name="item" id="item" onChange={(e) => handleItemChange(e, index)} value={row.item}>
                            <option  value="">Select Item</option>
                            {itemInfo.map((data,info) => {
                                return <option value={data.id}>{data.name}</option>
                            })}
                          </select>
                        </td>
                        <td >
                           <div className='input-group input-group-sm'>
                          <input type="number" name="cost" id="cost" value={row.cost} onChange={(e) => handleItemChange(e, index)} className="form-control cost"/>
                        </div></td>
                        <td >
                           <div className='input-group input-group-sm'>
                          <input type="number" name="item_discount" id="item_discount" value={row.item_discount} onChange={(e) => handleItemChange(e, index)} className="form-control total" />
                        </div></td>
                        <td>
                        {items.length !== 1 && (
                          <button className="btn btn-danger btn-sm" onClick={() => removeItems(index)}>
                            DELETE
                          </button> 
                        )}
                        </td>
                      </tr>
    )
  })

  //redirect
  if(redirect == true) {
    var link =  "/review-purchase-order/" + id;
    return (
        <Navigate to ={link}/>
    )
}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="EDIT PURCHASE ORDER" />
        <ToastContainer/>

        <h1 className="item-header">PURCHASE ORDER INFO</h1>
          <div className="item-details-cont">
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-id-label">PURCHASE DATE</span>
              </div>
              <div className="col-sm-8">
                <input type="date" name="purchase_date" className="item-name-input" value={editPurchaseDate} onChange={(e) => setEditPurchaseDate(e.target.value)}/>
              </div>
            </div> */}
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">PURCHASE DATE</span>
              </div>
              <div className="col-sm-7">
                <div className='input-group input-group-sm'>
                <input type="date" name="purchase_date" className="form-control" value={editPurchaseDate} onChange={(e) => setEditPurchaseDate(e.target.value)}/>
                </div>
                
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">SUPPLIER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="supplier" className="item-name-input" value={editSupplier} onChange={(e) => setEditSupplier(e.target.value)}/>
              </div>
            </div> */}
              <div className="row">
              <div className="col-sm-3 pt-2">
                <span className="item-id-label">SUPPLIER</span>
              </div>
              <div className="col-sm-7">
                {console.log("selectedSuppliers 357", selectedSuppliers)}
                <Select 
                // styles={{control: customControlStyles}}
                  isSearchable
                  value={selectedSuppliers}
                  onChange={setSelectedSuppliers}
                  options={suppliers}
                  
                  // className="supplier-input"
                />
                {/* <select name="supplier" className="item-supplier-input" onChange={setInfo}>
                <option value="" selected disabled>Choose here</option>
                  {suppliers.map((data,index) => {
                    return (
                      <option value={data.id}>{data.name}</option>
                    )
                  })}
                </select> */}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">FORWARDER</span>
              </div>
               <div className="col-sm-8">
                <input type="text" name="forwarder" className="item-name-input" value={editForwarder} onChange={(e) => setEditForwarder(e.target.value)}/>
              </div> 
            </div> */}
          </div>

          <h1 className="item-header">ADDITIONAL INFO</h1>

          <div className="item-details-cont">
            
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">DELIVERY DATE</span>
              </div>
              <div className="col-sm-7">
              <div className='input-group input-group-sm'>
                <input type="date" name="delivery_date" className="form-control" value={editDeliveryDate} onChange={(e) => setEditDeliveryDate(e.target.value)}/>
              </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REQUISITIONER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="requisitioner" className="item-name-input" value={editRequisitioner} onChange={(e) => setEditRequisitioner(e.target.value)}/>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">DELIVERY ADDRESS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="delivery_address" className="item-name-input" value={editDeliveryAddress} onChange={(e) => setEditDeliveryAddress(e.target.value)}/>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="remarks" className="item-name-input" value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)}/>
              </div>
            </div> */}
            <div className="row">
              <div className="col-sm-3 pt-1">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-7">
              <div className='input-group input-group-sm'>
                <input type="text" name="remarks" className="form-control" value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)}/>
              </div>
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
          </div>
        <div className="row d-flex justify-content-center mb-4">
          <button className="add-items-btn" onClick={addItems}>
            ADD ITEM
          </button>
          <button className="save-items-btn" onClick={(e) => edit(e)}>SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePurchaseOrder;
