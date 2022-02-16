import React, { useState } from 'react';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { useForm, useStep } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from 'react-router-dom';

//css
import './AddCompany.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//VARIABLES
const userToken = getToken();
const userId = getUser();

const discountData = {
    discount_code: "",
    discount_percentage: "",
    remarks: "",
};

function AddDiscount() {

    document.body.style = 'background: white;';

    //Form
    const [company, setCompany] = useState("");
    const [discount, setDiscount] = useForm(discountData);
    const {id} = useParams();

    //Redirect
    const [redirect, setRedirect] = useState(false);

    //GET
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'companies/show/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            console.log(response.data);
            setCompany(response.data);
        }).then(function (error) {
            console.log(error);
        })
    },[]);

    //FUNCTIONS
function submit(e, discount) {
    e.preventDefault();

    if(discount.discount_code != "" && discount.discount_percentage != "") {
        axios({
            method: 'post',
            url: window.$link + 'discounts/create',
            withCredentials: false,
            params: {
                token: userToken.replace(/['"]+/g, ''),
                api_key: window.$api_key, 
                description: company.name + " Discount",
                discount_code: discount.discount_code,
                discount_percentage: discount.discount_percentage,
                company_id: id,
                remarks: discount.remarks,
                added_by: userId
            }
        }).then(function (discount_response) {
            console.log(discount_response)
            toast.success("Successfully added company discount details");
            setTimeout(function() {
                setRedirect(true);
            }, 2000);
        }).catch(function (error) {
            toast.error(error);
        })
    
    } else {
        toast.warning("Please fill up all required inputs!");
    }

}

if(redirect == true) {
    return (
        <Navigate to = "/companies"/>
    )
}  

    return (
        <div>
            <Navbar/>
           <div className="active-cont">
                <Header 
                type="thin"
                title="ADD DISCOUNT"
                />

                <ToastContainer/>

                <h3 className="form-categories-header italic">COMPANY DETAILS</h3>
                <div className="form-wrapper">   
                    <div className="row">
                        <div className="col-sm-2">
                            <label for="company_name" className="form-label">COMPANY NAME</label><br />
                        </div>
                        <div className="col-sm-6">
                            <span>{company.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <label for="company_address" className="form-label">COMPANY ADDRESS</label><br />
                        </div>
                        <div className="col-sm-6">
                            <span>{company.address}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <label for="company_contact_no" className="form-label">COMPANY EMAIL</label><br />
                        </div>
                        <div className="col-sm-6">
                            {company.company_email == "" ? "Unspecified" : company.company_email}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <label for="contact_person" className="form-label">CONTACT PERSON</label><br />
                        </div>
                        <div className="col-sm-6">
                          {company.contact_person}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <label for="contact_person" className="form-label">CONTACT NUMBER</label><br />
                        </div>
                        <div className="col-sm-6">
                            {company.contact_no}
                        </div>
                    </div>
                    </div>

                    <h3 className="form-categories-header italic">DISCOUNT DETAILS</h3>
                    <div className="form-wrapper">
                    <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="discount_code" className="form-label">DISCOUNT CODE<i> (required)</i></label><br />
                            <input type="text" className="form-control full" id="discount_code" name="discount_code" onChange={setDiscount} required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="discount_percentage" className="form-label">DISCOUNT<i> (required)</i></label><br />
                            <input type="text" className="form-control full" id="discount_percentage" name="discount_percentage" onChange={setDiscount}  required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="remarks" className="form-label">DISCOUNT DESCRIPTION</label><br />
                            <textarea id="remarks" className="remarks-input" name="remarks" rows="4" cols="50" onChange={setDiscount} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <button className="save-btn" onClick={(e) => submit(e, discount)}>SAVE</button>
                        </div>
                    </div>

                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default AddDiscount
