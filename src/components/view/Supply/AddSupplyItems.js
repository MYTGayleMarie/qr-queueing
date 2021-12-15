import React from 'react';

//css
import './AddSupplyItems.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

function AddSupplyItems() {
    return (
        <div>
        <Navbar/>
            <div className="active-cont">
            <Header 
                type="thin"
                title="ITEMS"
            />
            <h1 className="item-header">ITEMS DETAILS</h1>
            <form>
                <div className="item-details-cont">
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="item-name-label">ITEM NAME</span>
                        </div>
                        <div className="col-sm-3">
                            <input type="text" name="item_name" className="item-name-input"/>
                        </div>
                        <div className="col-sm-3">
                            <span className="beginning-balance-label">BEGINNING BALANCE</span>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="item_balance" className="beginning-balance-input"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="remarks-label">REMARKS</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="remarks" name="remarks" class="remarks-items-input" rows="10" cols="50"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <span className="description-label">ITEM DESCRIPTION</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="description" name="description" class="description-input" rows="10" cols="50"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                           <button class="add-item-btn">ADD ITEMS</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddSupplyItems
