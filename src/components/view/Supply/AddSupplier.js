import React from 'react';

//css
import './AddSupplier.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';


function AddSupplier() {
    return (
        <div>
        <Navbar/>
            <div className="active-cont">
            <Header 
                type="thin"
                title="SUPPLIERS"
            />
            <h1 className="supplier-header">SUPPLIER DETAILS</h1>
            <form>
                <div className="item-details-cont">
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="supplier-name-label">COMPANY NAME</span>
                        </div>
                        <div className="col-sm-5">
                            <input type="text" name="company_name" className="company-name-input"/>
                        </div>
                        <div className="col-sm-1 d-flex justify-content-end">
                            <span className="tin-label">TIN</span>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="tin" className="tin-input"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="phone-name-label">PHONE</span>
                        </div>
                        <div className="col-sm-5">
                            <input type="text" name="phone" className="phone-input"/>
                        </div>
                        <div className="col-sm-1 d-flex justify-content-end">
                            <span className="email-label">EMAIL</span>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="email" className="email-input"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <span className="company-address-label">COMPANY ADDRESS</span>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-12">
                            <input type="text" name="company_address" className="company-address-input"/>
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

export default AddSupplier
