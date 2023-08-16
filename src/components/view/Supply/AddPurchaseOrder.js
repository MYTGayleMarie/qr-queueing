import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns'
import Select from 'react-select';
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
    payment_date:"",
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
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [generalDiscount, setGeneralDiscount] = useState(0);
  const [items, setItems] = useState([{ 
    order_quantity: 0, 
    with_conversion: null,
    inventory_quantity: 0,
    unit: " ", 
    item: " ",
    cost: " ",
    item_discount: 0,
    total: 0,
  }]);

  const [itemInfo, setItemInfo] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleItemChange = (e,index) => {
    const {name, value} = e.target;
    const list = [...items];
    list[index][name] = value;

    if(name == "item") {
      itemInfo.map((data,i) => {
        if(data.id == value){
            list[index]['cost'] = data.cost;
            list[index]['unit'] = data.unit;
            list[index]['with_conversion'] = data.with_conversion;
        }
      })
    }

    var item_discount = list[index]["item_discount"] == null ? 0 : list[index]["item_discount"];

    if(list[index]["order_quantity"] != " " && list[index]["cost"]) {
      list[index]["total"] = parseFloat((list[index]["order_quantity"] * list[index]["cost"]) - item_discount).toFixed(2);
    }

    setItems(list);


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


      grandTotal = subTotal
      setSubTotal(subTotal);
      setGrandTotal(grandTotal);
    }
  };

  React.useEffect(() => {
    var discount = isNaN(generalDiscount) == true ? 0 : generalDiscount;
    var grand_total = subTotal;
    setGrandTotal(grand_total - discount);
  },[generalDiscount, subTotal]);

  const removeItems = (index) => {
       const list = [...items];
       list.splice(index, 1);
       setItems(list);
  };

  const addItems = () => {
    setItems([
      ...items,
      {
        order_quantity: " ", 
        with_conversion: null,
        inventory_quantity: " ",
        unit: " ", 
        item: " ",
        cost: " ",
        item_discount: "0",
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
      response.data.items.map((data,index) => {
        if(data.item_id != 0 && data.is_deleted == 0 && data.cost != null){
          var itemInfo = {};
          itemInfo.id = data.item_id;
          itemInfo.name = data.item_name;
          itemInfo.cost = data.cost;
          itemInfo.unit = data.default_unit;
          itemInfo.with_conversion = data.with_conversion;
          setItemInfo(oldArray => [...oldArray, itemInfo]);
        }
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
    var inventory_qty = []; 
    var item_discounts = [];
    var qty = [];
    var units = [];
    var suppliers = [];

    items.map((data, index) => {
      item_ids.push(data.item);
      costs.push(data.cost);
      qty.push(data.order_quantity);
      inventory_qty.push(data.inventory_quantity);
      item_discounts.push(data.item_discount)
      units.push(data.unit);
    });

    suppliers.push(selectedSuppliers.value);

    // selectedSuppliers.map((data) => {
    //   suppliers.push(data.value)
    // });

    if(isClicked == false) {
      setIsClicked(true);
      axios({
        method: 'post',
        url: window.$link + 'pos/create',
        withCredentials: false,
        params: {
          token: userToken.replace(/['"]+/g, ''),
          api_key: window.$api_key,
          supplier: suppliers,
          purchase_date: format(new Date(info.purchase_date),'MM/dd/yyyy'),
          payment_date: format(new Date(info.payment_date),'MM/dd/yyyy'),
          delivery_date: format(new Date(info.delivery_date),'MM/dd/yyyy'),
          delivery_address: info.delivery_address,
          requisitioner: info.requisitioner,
          forwarder: info.forwarder,
          items: item_ids,
          inventory_qty: inventory_qty, 
          cost: costs,
          item_discount: item_discounts,
          general_discount: generalDiscount,
          qty: qty,
          unit: units,
          remarks: info.remarks,
          added_by: userId,
        },
      }).then(function (response) {
        toast.success("Successfully added PO!");
        setTimeout(function () {
          setRedirect(true);
        }, 2000);
      }).catch(function (error) {
        console.log(error);
      });
    }
  };


  var purchaseItems = items.map((row, index) => {   
    return (
                    <tr key={index}>
                        <td className='input-group input-group-sm'>
                          <input type="number" name="order_quantity" id="order_quantity" value={row.order_quantity} onChange={(e) => handleItemChange(e, index)} className="form-control qty" style={{width:"80%"}} />
                        </td>
                        {row.with_conversion === "0" ? 
                        <td>
                          <div className='input-group input-group-sm'>
                          <input type="number" name="inventory_quantity" id="inventory_quantity" value={row.inventory_quantity} className="form-control qty" style={{width:"80%"}} readonly/>
                          </div>
                        </td> : 
                        <td>
                            <div className='input-group input-group-sm'>
                          <input type="number" name="inventory_quantity" id="inventory_quantity" value={row.inventory_quantity} onChange={(e) => handleItemChange(e, index)} className="form-control" style={{width:"80%"}} />
                          </div>
                        </td>}
                        <td>
                        <div className='input-group input-group-sm'>
                          <input type="text" name="unit" id="unit" value={row.unit} className="form-control unit" readOnly/></div>
                        </td>
                        <td>
                          <select className='form-select form-select-sm' name="item" id="item" onChange={(e) => handleItemChange(e, index)}>
                            <option  value="" selected disabled>Select Item</option>
                            {itemInfo.map((data,info) => {
                                return <option value={data.id}>{data.name}</option>
                            })}
                          </select>
                        </td>
                        <td align='right'>
                        <div className='input-group input-group-sm'>
                          <input type="number" name="cost" id="cost" value={row.cost} onChange={(e) => handleItemChange(e, index)} className="form-control cost"/></div>
                        </td>
                        <td align='right'>
                        <div className='input-group input-group-sm'>
                          <input type="number" name="item_discount" id="item_discount" value={row.item_discount} onChange={(e) => handleItemChange(e, index)} className="form-control item-discount" /></div>
                        </td>
                        <td align='right'>
                        <div className='input-group input-group-sm'>
                          <input type="number" name="total" id="total" value={row.total} onChange={(e) => handleItemChange(e, index)} className="form-control total" /></div>
                        </td>
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
  if (redirect == true) {
    return <Navigate to="/purchase-order" />;
  }

  const customControlStyles = base => ({
    // height: 15,
    // minHeight: 20
});

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PURCHASE ORDER" />
        <ToastContainer/>

        <h4 className="po-header">PURCHASE ORDER INFO</h4>
          <div className="item-details-cont">
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">PURCHASE DATE</span>
              </div>
              <div className="col-sm-7">
                <div className='input-group input-group-sm'>
                <input type="date" name="purchase_date" className="form-control" onChange={setInfo}/>
                </div>
                
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">PAYMENT DATE</span>
              </div>
              <div className="col-sm-7">
              <div className='input-group input-group-sm'>
                <input type="date" name="payment_date" className="form-control" onChange={setInfo}/>
              </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 pt-2">
                <span className="item-id-label">SUPPLIER</span>
              </div>
              <div className="col-sm-7">
                <Select 
                // styles={{control: customControlStyles}}
                  isSearchable
                  defaultValue={selectedSuppliers}
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
                <input type="text" name="forwarder" className="item-name-input" onChange={setInfo}/>
              </div>
            </div> */}
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

          <h4 className="po-header">ADDITIONAL INFO</h4>
          <div className="item-details-cont">
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">DELIVERY DATE</span>
              </div>
              <div className="col-sm-7">
              <div className='input-group input-group-sm'>
                <input type="date" name="delivery_date" className="form-control" onChange={setInfo}/>
              </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REQUISITIONER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="requisitioner" className="item-name-input" onChange={setInfo}/>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">DELIVERY ADDRESS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="delivery_address" className="item-name-input" onChange={setInfo}/>
              </div>
            </div> */}
            <div className="row">
              <div className="col-sm-3 pt-1">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-7">
              <div className='input-group input-group-sm'>
                <input type="text" name="remarks" className="form-control" onChange={setInfo}/>
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
                        <th>Inventory Quantity</th>
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

                <div className='add-item-cont'>
                  <button className="add-items-btn" onClick={addItems}>
                    ADD ITEM
                  </button>
                </div>
            </div>
          </div>

        <div className="row d-flex justify-content-end m-5 mb-2">
          <div className="col-sm-3 text-right">
              <span className="item-name-label">SUBTOTAL</span>
          </div>
          <div className="col-sm-3 text-right" >
              <span style={{fontWeight:"bold"}}>P {subTotal != null ? parseFloat(subTotal).toFixed(2) : "0.00"}</span>
          </div>
        </div>     
        <div className="row d-flex justify-content-end m-5 mb-2 mt-2">
          <div className="col-sm-3 text-right">
              <span className="item-name-label">DISCOUNT TOTAL</span>
          </div>
          <div className="col-sm-3 text-right" >
            {/* <div  className='input-group input-group-sm'> */}
            <span style={{fontWeight:"bold"}}>

              P {" "}<input type="number" name="general_discount" className="discount-input" onChange={(e) => setGeneralDiscount(e.target.value)}/></span>
          </div>
          {/* </div> */}
        </div>     
        <div className="row d-flex justify-content-end m-5 mb-2 mt-2">
          <div className="col-sm-3 text-right">
              <span className="item-name-label">GRAND TOTAL</span>
          </div>
          <div className="col-sm-3 align-right text-right" >
              <span style={{fontWeight:"bold"}}>P {grandTotal != null ? parseFloat(grandTotal).toFixed(2) : "100,000.00"}</span>
          </div>
        </div>     
        <div className="row d-flex justify-content-end m-5">
          <div className='col-sm-3'>
          <button class="btn save-po-btn" type="submit" onClick={(e) => submit(e, info, items)}>SAVE</button>
          {/* <button className="save-items-btn" onClick={(e) => submit(e, info, items)}>SAVE</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseOrder;
