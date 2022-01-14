import React from 'react';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddCompany.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//VARIABLES
const userToken = getToken();
const userId = getUser();

function AddCompany() {
    return (
        <div>
            <Navbar/>
           <div className="active-cont">
                <Header 
                type="thin"
                title="ADD COMPANY"
                />

                <h3 className="form-categories-header italic">COMPANY DETAILS</h3>
                
                <div className="form-wrapper">
                <form>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="company_name" className="form-label">COMPANY NAME <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="companyName" name="companyName" required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="company_address" className="form-label">COMPANY ADDRESS <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="companyAddress" name="companyAddress" required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="company_contact_no" className="form-label">COMPANY CONTACT NUMBER <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="companyContactNo" name="companyContactNo" required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="company_email" className="form-label">COMPANY EMAIL<i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="companyEmail" name="companyContactNo" required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="contact_person" className="form-label">CONTACT PERSON <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="contactPerson" name="contactPerson" required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="contact_no" className="form-label">CONTACT NUMBER<i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="contactNo" name="contactNo" required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="remarks" className="form-label">REMARKS</label><br />
                            <textarea id="remarks" className="remarks-input" name="remarks" rows="4" cols="50"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <button className="save-btn">SAVE</button>
                        </div>
                    </div>

                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default AddCompany
