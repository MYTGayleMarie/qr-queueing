import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddSupplier.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

const suppliesInfo = {
    company_name: "",
    tin: "",
    phone: "",
    email: "",
    company_address: "",
    remarks: "",
};


function AddSupplier() {

    //States
    const [supplies, setSupplies] = useForm(suppliesInfo);

    //Redirection
    const [redirect, setRedirect] = useState(false);
    
    //Functions
    function submit() {
        axios({
            method: 'post',
            url: window.$link + 'suppliers/create',
            withCredentials: false,
            params: {
              token: userToken,
              api_key: window.$api_key,
              name: supplies.name,
              address: supplies.company_address,
              contact_no: supplies.phone, 
              tin: supplies.tin,
              remarks: supplies.remarks,
              requester: userId,
            }
        }).then(function (response) {
            console.log(response);
            toast.success("Successfully created supplier!");
            setTimeout(function () {
                setRedirect(true);
              }, 2000);
        }).catch(function (error) {
            console.log(error);
            toast.error(error);
        })
    }

    //redirect
    if (redirect == true) {
        return <Navigate to="/suppliers" />;
    }

    return (
        <div>
        <Navbar/>
            <div className="active-cont">
            <Header 
                type="thin"
                title="SUPPLIERS"
            />
            <ToastContainer/>
            <h1 className="supplier-header">SUPPLIER DETAILS</h1>
                <div className="item-details-cont">
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="supplier-name-label">COMPANY NAME</span>
                        </div>
                        <div className="col-sm-5">
                            <input type="text" name="company_name" className="company-name-input" onChange={setSupplies}/>
                        </div>
                        <div className="col-sm-1 d-flex justify-content-end">
                            <span className="tin-label">TIN</span>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="tin" className="tin-input" onChange={setSupplies}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="phone-name-label">PHONE</span>
                        </div>
                        <div className="col-sm-5">
                            <input type="text" name="phone" className="phone-input" onChange={setSupplies}/>
                        </div>
                        <div className="col-sm-1 d-flex justify-content-end">
                            <span className="email-label">EMAIL</span>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="email" className="email-input" onChange={setSupplies}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <span className="company-address-label">COMPANY ADDRESS</span>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-12">
                            <input type="text" name="company_address" className="company-address-input" onChange={setSupplies}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="remarks-label">REMARKS</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="remarks" name="remarks" class="remarks-items-input" rows="10" cols="50" onChange={setSupplies}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                           <button class="add-item-btn" onClick={(e) => submit()}>ADD SUPPLIER</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSupplier
