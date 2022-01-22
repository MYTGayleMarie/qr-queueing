import React, { useState } from 'react';

//css
import './AddPurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

function AddPurchaseOrder() {
  const [items, setItems] = useState([{ id: 0 }]);
  const [existingItems, setRemoveItems] = useState(items);

  const addItems = () => {
    setItems([
      ...items,
      {
        id: items.length,
      },
    ]);
  };

  const removeItems = (i) => {
    if (items.length > 0) {
      setRemoveItems(items.pop());
      
    
    }
  };

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PURCHASE ORDER" />

        <h1 className="item-header">PURCHASE ORDER INFO</h1>
        <form>
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

            <table striped bordered hover>
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
                <tr>
                  <td>
                    <input type="number" name="quantity" className="quantity-item" />
                  </td>
                </tr>
              </tbody>
            </table>


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
        </form>
        <div className="row d-flex justify-content-center">
          <button className="delete-items-btn" onClick={removeItems}>
            DELETE
          </button> 
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
