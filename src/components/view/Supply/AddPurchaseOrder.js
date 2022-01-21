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

  const removeItems = () => {
    if (items.length > 0) {
      setRemoveItems(items.pop());
    }
  };

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PURCHASE ORDER" />

        <h1 className="item-header">ITEMS DETAILS</h1>
        <form>
          <div className="item-details-cont">
            <div className="row">
              <div className="col-sm-3">
                <span className="item-id-label">ITEM ID.</span>
              </div>
              <div className="col-sm-9">
                <input type="text" name="item_id" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <span className="item-name-label">ITEM NAME</span>
              </div>
              <div className="col-sm-9">
                <input type="text" name="item_name" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <span className="item-name-label">SUPPLIER</span>
              </div>
              <div className="col-sm-9">
                <input type="text" name="item_name" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <span className="item-name-label">BRANCH</span>
              </div>
              <div className="col-sm-9">
                <input type="text" name="item_name" className="item-name-input" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <span className="item-name-label">FORWARDER</span>
              </div>
              <div className="col-sm-9">
                <input type="text" name="item_name" className="item-name-input" />
              </div>
            </div>
          </div>

          <div className="add-items-cont">
            <div className="row d-flex justify-content-left">
              <div className="col-sm-7">
                <h1 className="add-item-header">QUANTITY</h1>
              </div>
              <div className="col-sm-5">
                <h1 className="add-item-header items">ITEMS</h1>
              </div>
            </div>

            {items.map((item) => (
              <div className="row">
                <div className="col-sm-2">
                  <input key={item.id} type="number" name="quantity" className="quantity-item" />
                </div>
                <div className="col-sm-10">
                  <input key={item.id} type="text" name="item" className="items-item" />
                </div>
                {/* <div className="col-sm-3">
                  <input key={item.id} type="number" name="item" className="items-item" />
                </div>
                <div className="col-sm-3">
                  <input key={item.id} type="number" name="item" className="items-item" />
                </div> */}
              </div>
            ))}
          </div>
        </form>
        <div className="row d-flex justify-content-center">
          <button className="add-items-btn" onClick={addItems}>
            ADD ITEM
          </button>
          <button className="delete-items-btn" onClick={removeItems}>
            REMOVE ITEM
          </button>
          <button className="save-items-btn">SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseOrder;
