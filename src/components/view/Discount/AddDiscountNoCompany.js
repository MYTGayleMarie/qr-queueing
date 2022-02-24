import React, { useState } from 'react';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { useForm, useStep } from "react-hooks-helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';

//css
import '../Companies/AddCompany.css';

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

function AddDiscountNoCompany() {

    document.body.style = 'background: white;';

    //Form
    const [company, setCompany] = useState("");
    const [discount, setDiscount] = useForm(discountData);
    const [selectedLab, setSelectedLab] = useState([]);
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [applyToall, setApplyToAll] = useState("");
    const {id} = useParams();

    //options
    const [labOptions, setLabOptions] = useState([]);
    const [packageOptions, setPackageOptions] = useState([]);

    //Redirect
    const [redirect, setRedirect] = useState(false);

    //GET OPTION DETAILS
    React.useEffect(() => {
        labOptions.length = 0;

        axios({
            method: 'post',
            url: window.$link + '/lab_tests/getAll',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            response.data.lab_tests.map((data) => {
                var info = {};

                info.label = data.name;
                info.value = data.id + "_service";

                setLabOptions(oldArray => [...oldArray, info]);
            });
        }).then(function (error) {
            console.log(error);
        });

        axios({
            method: 'post',
            url: window.$link + '/packages/getAll',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            response.data.packages.map((data) => {
                var info = {};

                info.label = data.name;
                info.value = data.id + "_package";

                setPackageOptions(oldArray => [...oldArray, info]);
            });
        }).then(function (error) {
            console.log(error);
        });
    },[]);


    //FUNCTIONS
function submit(e, discount) {
    e.preventDefault();

    if(discount.discount_code != "" && discount.discount_percentage != "") {

        var selectedIds = [];
        var selectedTypes = [];

        selectedLab.map((data) => {
            var value = data.value.split("_");

            selectedIds.push(value[0]);
            selectedTypes.push(value[1]);
        });

        selectedPackages.map((data) => {
            var value = data.value.split("_");

            selectedIds.push(value[0]);
            selectedTypes.push(value[1]);
        });

        axios({
            method: 'post',
            url: window.$link + 'discounts/create',
            withCredentials: false,
            params: {
                token: userToken.replace(/['"]+/g, ''),
                api_key: window.$api_key, 
                description: discount.remarks,
                discount_code: discount.discount_code,
                discount_percentage: discount.discount_percentage,
                // company_id: id,
                added_by: userId,
                ids: selectedIds,
                types: selectedTypes,
                discounts: "",
            }
        }).then(function (discount_response) {
            console.log(discount_response)
            toast.success("Successfully added company discount details");
            // setTimeout(function() {
            //     setRedirect(true);
            // }, 2000);
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
                <h3 className="form-categories-header italic">DISCOUNT DETAILS</h3>
                    <div className="form-wrapper">
                    <form>
                    <div className="row">
                        <label for="discount_code" className="form-label">APPLY TO ALL:  </label>
                        <div className="col-sm-1">
                            <input type="radio" value="yes" name="applyToAll" onChange={(e) => setApplyToAll(e.target.value)}/><label className="radio-label">Yes</label>
                        </div>
                        <div className="col-sm-1">
                            <input type="radio" value="no" name="applyToAll" onChange={(e) => setApplyToAll(e.target.value)}/><label className="radio-label">No</label>
                        </div>
                    </div>
                    {applyToall == "no" && (
                    <div className="row">
                        <div className="col-sm-11">
                        <label for="discount_code" className="form-label">APPLY DISCOUNT TO LAB SERVICE/S: </label><br />
                        <MultiSelect
                            options={labOptions}
                            value={selectedLab}
                            onChange={setSelectedLab}
                            labelledBy="Select"
                        />
                        </div>
                    </div>
                    )}
                    {applyToall == "no" && (
                    <div className="row">
                        <div className="col-sm-11">
                        <label for="discount_code" className="form-label">APPLY DISCOUNT TO PACKAGE/S: </label><br />
                        <MultiSelect
                            options={packageOptions}
                            value={selectedPackages}
                            onChange={setSelectedPackages}
                            labelledBy="Select"
                        />
                        </div>
                    </div>
                    )}
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

export default AddDiscountNoCompany
