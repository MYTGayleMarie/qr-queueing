import React, { useState } from "react";

//css
import './AddItems.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';


function AddItems() {

    const [items, setItems] = useState([{id: 0}])
    const [existingItems, setRemoveItems]  = useState(items)

    const addItems = () => {
        setItems([ ... items, {
            id: items.length,
        }])
    }

    const removeItems = () => {
        if (items.length > 0) {
            setRemoveItems(
                items.pop()
            )
        }
    }

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
        <Header 
            type="thin"
            title="ADD ITEMS"
        />

        <h1 className="item-header">ITEMS DETAILS</h1>
        <form>
        <div className="item-details-cont">
            <div className="row">
                <div className="col-sm-3">
                    <span className="date-label">DATE</span>
                </div>
                <div className="col-sm-9">
                    <input type="date" name="date" className="date-input"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <span className="requistioner-label">REQUISTIONER</span>
                </div>
                <div className="col-sm-9">
                    <input type="text" name="requistioner" className="requistioner-input"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <span className="remarks-label">REMARKS</span>
                </div>
                <div className="col-sm-9">
                    <textarea name="items" className="remarks-input" rows="4" cols="40"/>
                </div>
            </div>
        </div>

        <div className="add-items-cont">
            <div className="row">
                <div className="col-sm-3">
                    <h1 className="item-header left">QUANTITY</h1>
                </div>
                <div className="col-sm-9">
                    <h1 className="item-header left">ITEMS</h1>
                </div>
            </div>

            {items.map(item => (
                <div className="row">
                 <div className="col-sm-3">
                     <input key={item.id} type="number" name="quantity" className="quantity-item"/>
                 </div>
                 <div className="col-sm-9">
                     <input key={item.id} type="text" name="item" className="items-item"/>
                </div>
             </div>
            ))}
        </div>

        </form>
        <div className="row d-flex justify-content-center">
            <button className="add-items-btn" onClick={addItems}>ADD ITEM</button>
            <button className="delete-items-btn" onClick={removeItems}>REMOVE ITEM</button>
            <button className="save-items-btn">SAVE</button>
        </div>
        </div>
        </div>
    )
}

export default AddItems
