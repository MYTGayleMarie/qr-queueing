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
    price:"",
    remarks: "",
};
var selectedIds = [];

//name, category, price, remarks
//array: package_id, lab_test_id, added_by

export default function AddPackage(){
  const [packageDetails, setPackageDetails] = useForm(packageData)
  const [applyToall, setApplyToAll] = useState("");
  const [selectedLab, setSelectedLab] = useState([]);
  const [labOptions, setLabOptions] = useState([]);
  const [selectedId, setSelectedId] = useState([])

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

  // React.useEffect(()=>{
  //   selectedLab.map((data,index)=>{
  //     setSelectedId(oldArray=>[...oldArray, data.value])
  //   })
  // },[selectedLab])


  //function for submitting create API
	function submit(e, packageDetail){
		e.preventDefault();
    selectedIds.length=0; 
		

		if(packageDetail.name != "" && packageDetail.price != ""){
      selectedLab.map((data)=>{
        console.log(data.value)
        var id = data.value;
        selectedIds.push(id)
      })
      console.log(packageDetail);
      console.log(selectedIds);
      axios({
        method:'post',
        url: window.$link + 'packages/create',
        withCredentials: false, 
        params:{
          token: userToken.replace(/['"]+/g, ''),
          api_key: window.$api_key,
          name: packageDetail.name,
          price: packageDetail.price,
          remarks: packageDetail.remarks,
          lab_tests: selectedIds,
          added_by: userId
        }
      })
      .then((response)=>{
        console.log(response)
        toast.success("Successfully added lab test");
        setRedirect(true)
      })
      .catch((error)=>{console.log(error)})

		} else {
			toast.warning("Please fill up all required inputs!");	
		}
     console.log(selectedIds)
	}
  console.log(packageData)
  console.log(selectedLab)
 

  if(redirect == true) {
    return (
        <Navigate to = "/services"/>
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
              <div className="col-sm-7">
              <label for="discount_code" className="form-label">ADD SERVICE/S TO PACKAGE: </label><br />
              <MultiSelect
                  options={labOptions}
                  value={selectedLab}
                  onChange={setSelectedLab}
                  labelledBy="Select"
              />
              <br />
              </div>
              <br />
          </div>
          
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