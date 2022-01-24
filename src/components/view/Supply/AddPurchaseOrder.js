import React, { useState } from 'react';

//css
import './AddPurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

function AddPurchaseOrder() {
  const [items, setItems] = useState([{ 
    order_quantity: " ", 
    available_quantity: " ",
    unit: " ", 
    item: " ",
    unit_cost: " ",
    unit_discount: " ",
    total_amount: " ",
  }]);

  const handleItemChange = (e,index) => {
    const {name, value} = e.target;
    const list = [...items];
    list[index][name] = value;
    console.log(list)
    setItems(list);
    console.log(items)
  };

  const removeItems = (index) => {
       const list = [...items];
       list.splice(index, 1);
       setItems(list);
       console.log(list)
       console.log(items)
  };


  const addItems = () => {
    setItems([
      ...items,
      {
        order_quantity: " ", 
        available_quantity: " ",
        unit: " ", 
        item: " ",
        unit_cost: " ",
        unit_discount: " ",
        total_amount: " ",
      },
    ]);
  };

  var purchaseItems = items.map((row, index) => {
    return (
                    <tr key={index}>
                        <td>
                          <input type="number" name="order_quantity" id="order_quantity" value={row.order_quantity} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="number" name="available_quantity" id="available_quantity"  value={row.available_quantity} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="text" name="unit" id="unit" value={row.unit} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="text" name="item" id="item" value={row.item} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="number" name="unit_cost" id="unit_cost" value={row.unit_cost} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="number" name="unit_discount" id="unit_discount" value={row.unit_discount} onChange={(e) => handleItemChange(e, index)} className="purchase-item" />
                        </td>
                        <td>
                          <input type="number" name="total_amount" className="purchase-item" id="total_amount" value={row.total_amount} onChange={(e) => handleItemChange(e, index)} />
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

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PURCHASE ORDER" />

        <h1 className="item-header">PURCHASE ORDER INFO</h1>
          <div className="item-details-cont">
            <div className="row">
              <div className="col-sm-4">
                <span className="item-id-label">PURCHASE DATE</span>
              </div>
              <div className="col-sm-8">
                <input type="date" name="purchase_date" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">SUPPLIER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="supplier" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">BRANCH</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="branch" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">FORWARDER</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="forwarder" className="item-name-input" />
              </div>
            </div> 
          </div>

          <h1 className="item-header">ADDITIONAL INFO</h1>

          <div className="item-details-cont">
            <div className="row">
              <div className="col-sm-4">
                <span className="item-id-label">DELIVERY DATE (Optional)</span>
              </div>
              <div className="col-sm-8">
                <input type="date" name="delivery_date" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REQUISITIONER (Optionl)</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="requisitioner" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">DELIVERY ADDRESS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="delivery_address" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-8">
                <input type="text" name="remarks" className="item-name-input" />
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
                        <th>Available Qty</th>
                        <th>Unit</th>
                        <th>Item</th>
                        <th>Unit Cost</th>
                        <th>Unit Discount -optional-</th>
                        <th>Total Amount</th>
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
          <button className="save-items-btn">SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseOrder;
