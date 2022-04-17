import React, { Fragment, useState } from "react"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hooks-helper";
import { MultiSelect } from 'react-multi-select-component';


//css
import './AddPackage.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';

//constants
const userToken = getToken();
const userId = getUser();
const packageData = {
    name: "",
    category_id: "",
    price:"",
    remarks: "",
};

//name, category, price, remarks
//array: package_id, lab_test_id, added_by

export default function AddPackage(){
  const [packageDetails, setPackageDetails] = useForm(packageData)
  const [applyToall, setApplyToAll] = useState("");
  const [selectedLab, setSelectedLab] = useState([]);
  const [labOptions, setLabOptions] = useState([]);

  //Redirect
  const [redirect, setRedirect] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  //getting all labtests options
  React.useEffect(()=>{
    axios({
        method: 'post',
        url: window.$link + 'lab_tests/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      }).then((response)=>{
        const resLabTests = response.data.lab_tests.filter(test=>test.is_deleted != 1).sort((x, y)=>x.id-y.id); // array of all lab tests details
        console.log(resLabTests)
        resLabTests.map((data, index)=>{
          var info = {};
          info.label = data.name;
          info.value = data.id;

          setLabOptions(oldArray=>[...oldArray, info])
        })
      }).catch((error)=>{console.log(error)})
  },[])


  //function for submitting create API
	function submit(e, packageDetail){
		e.preventDefault();
		console.log(packageDetail);
	if(isClicked==false){
		if(packageDetail.category_id !="" && packageDetail.name != "" && packageDetail.price != ""){

		} else {
			toast.warning("Please fill up all required inputs!");	
		}
	}
	}
  console.log(packageData)
  console.log(labOptions)

  if(redirect == true) {
    return (
        <Navigate to = "/discounts"/>
    )
  }  
 return(
  <div>
    <Navbar />
    <div className="active-cont">
      <Header 
        type="thin"
        title="ADD PACKAGE"
      />
      <ToastContainer/>
      <h3 className="form-categories-header italic">PACKAGE DETAILS</h3>
      <div className="form-wrapper">
        <form>
          <div className="row">
	          <div className="col-sm-9">
						  <label for="name" className="form-label">NAME <i> (required)</i></label>
              <input type="text" className="form-control" id="name" name="name" onChange={setPackageDetails} required/><br />
            </div>
          </div>
          <div className="row">
          <label for="discount_code" className="form-label">APPLY TO ALL:  </label>
            <div className="col-sm-1">
                <input type="radio" value="yes" name="applyToAll" onChange={(e) => setApplyToAll(e.target.value)}/>
                <label className="radio-label">Yes</label>
                <br />
            </div>
            <div className="col-sm-1">
                <input type="radio" value="no" name="applyToAll" onChange={(e) => setApplyToAll(e.target.value)}/>
                <label className="radio-label">No</label>
                <br />
            </div>
          </div>
          {applyToall == "no" && (
            <div className="row">
                <div className="col-sm-11">
                <label for="discount_code" className="form-label">ADD SERVICE/S TO PACKAGE: </label><br />
                <MultiSelect
                    options={labOptions}
                    value={selectedLab}
                    onChange={setSelectedLab}
                    labelledBy="Select"
                />
                </div>
            </div>
          )}
          <div className="row">
	          <div className="col-sm-5">
						  <label for="price" className="form-label">PRICE <i> (required)</i></label>
              <input type="number" className="form-control" id="price" name="price" onChange={setPackageDetails} required/>
              <br />
            </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                  <label for="remarks" className="form-label">PACKAGE DESCRIPTION</label><br />
                  <textarea id="remarks" className="remarks-input" name="remarks" rows="4" cols="50" onChange={setPackageDetails} />
              </div>
          </div>
					<div className="row">
						<div className="col-sm-12 d-flex justify-content-end">
								<button className="save-btn" onClick={(e) => submit(e, packageDetails)}>SAVE</button>
						</div>
					</div>	
        </form>
      </div>

    </div>
  </div>
 )
}