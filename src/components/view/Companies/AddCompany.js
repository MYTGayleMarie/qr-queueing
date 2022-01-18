import React, { useState } from 'react';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { useForm, useStep } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//css
import './AddCompany.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//VARIABLES
const userToken = getToken();
const userId = getUser();

const companyData = {
    name: "",
    address: "",
    company_contact_no: "",
    company_email: "",
    contact_person: "",
    contact_no: "",
    remarks: "",
};

const discountData = {
    discount_code: "",
    discount_percentage: "",
};

function AddCompany() {

    document.body.style = 'background: white;';

    //Form
    const [company, setCompany] = useForm(companyData);
    const [discount, setDiscount] = useForm(discountData);

    //Redirect
    const [redirect, setRedirect] = useState(false);

    //FUNCTIONS
function submit(e, company, discount) {
    e.preventDefault();

    if(company.name != "" && company.address != "" && company.contact_person != "" + company.contact_no != "" && discount.discount_code != "" && discount.discount_percentage != "") {
        axios({
            method: 'post',
            url: window.$link + 'companies/create',
            withCredentials: false, 
            params: {
                token: userToken.replace(/['"]+/g, ''),
                api_key: window.$api_key, 
                name: company.name,
                address: company.address,
                contact_no: "Company:" + company.company_contact_no + "/ Person:" + company.contact_no,
                contact_person: company.contact_person,
                company_email: company.company_email,
                remarks: company.remarks,
                added_by: userId
            }
        }).then(function (response) {
            console.log(response);
            // console.log(discount.discount_percentage)
            console.log(response.data.message[0]);
            toast.success(response.data.message.success);
            axios({
                method: 'post',
                url: window.$link + 'discounts/create',
                withCredentials: false,
                params: {
                    token: userToken.replace(/['"]+/g, ''),
                    api_key: window.$api_key, 
                    description: company.name + "Discount",
                    discount_code: discount.discount_code,
                    discount_percentage: discount.discount_percentage,
                    company_id: response.data.data.company_id,
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
    
        }).catch(function (error) {
            toast.error(error);
        });
    
    } else {
        toast.warning("Please fill up all required inputs!");
    }

}

if(redirect == true) {
    return (
        <Navigate to = "/companies"/>
    )
}  

console.log(discount)

    return (
        <div>
            <Navbar/>
           <div className="active-cont">
                <Header 
                type="thin"
                title="ADD COMPANY"
                />

                <ToastContainer/>

                <h3 className="form-categories-header italic">COMPANY DETAILS</h3>
                
                <div className="form-wrapper">
                <form>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="company_name" className="form-label">COMPANY NAME <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="name" name="name" onChange={setCompany} required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="company_address" className="form-label">COMPANY ADDRESS <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="address" name="address" onChange={setCompany}  required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="company_contact_no" className="form-label">COMPANY CONTACT NUMBER</label><br />
                            <input type="text" className="form-control full" id="company_contact_no" name="company_contact_no" onChange={setCompany} /><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="company_email" className="form-label">COMPANY EMAIL</label><br />
                            <input type="text" className="form-control full" id="company_email" name="company_email" onChange={setCompany} /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="contact_person" className="form-label">CONTACT PERSON <i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="contact_person" name="contact_person" onChange={setCompany} required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="contact_no" className="form-label">CONTACT NUMBER<i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="contact_no" name="contact_no" onChange={setCompany}  required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label for="discount_code" className="form-label">DISCOUNT CODE<i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="discount_code" name="discount_code" onChange={setDiscount} required/><br />
                        </div>
                        <div className="col-sm-6">
                            <label for="discount_percentage" className="form-label">DISCOUNT PERCENTAGE<i>(required)</i></label><br />
                            <input type="text" className="form-control full" id="discount_percentage" name="discount_percentage" onChange={setDiscount}  required/><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label for="remarks" className="form-label">REMARKS</label><br />
                            <textarea id="remarks" className="remarks-input" name="remarks" rows="4" cols="50" onChange={setCompany} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <button className="save-btn" onClick={(e) => submit(e, company, discount)}>SAVE</button>
                        </div>
                    </div>

                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default AddCompany
