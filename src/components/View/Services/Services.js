import React, { Fragment, useState } from "react"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';

//css
import './Services.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';
import { getAllPackages } from "../../../services/services";

//constants
const buttons = ['add-services'];
const userToken = getToken();
const userId = getUser();


//Table headers = Name, Type, Category Price, Action

//View page
export default function Services(){

	/******** START Fetching Data from API ***********/
	const [allServices, setAllServices] = useState([]) //for all services (including lab tests and packages)
	React.useEffect(()=>{
	// //get all labservices
    axios({
        method: 'post',
        url: window.$link + 'lab_tests/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    })
    .then((response)=>{
        const tests = response.data.lab_tests.filter(test=>test.is_deleted != 1).sort((x, y)=>x.id-y.id)
        tests.map((test,index)=>{   
            var testDetails = {};     
						testDetails.id = test.id
            testDetails.name = test.name;
						testDetails.type = "lab";
            testDetails.categoryId = test.category_id;
            testDetails.price = test.price;
            setAllServices(oldArray=>[...oldArray, testDetails]) // append each item to services   
        })       
    })
    .catch((error)=>{
        console.log(error)
    })

		//get all packages
    axios({
        method: 'post',
        url: window.$link + 'packages/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    })
    .then((response)=>{
        const packagesArray = response.data.packages.sort((x, y)=>x.id-y.id)
        packagesArray.map((item,index)=>{  
            var packageDetails = {};
						packageDetails.id = item.id;
						packageDetails.name = item.name;
						packageDetails.type = 'package';
            if( item.id==1 || item.id==2 || item.id==3){                        
							packageDetails.categoryId = 1; //preEmploymentPackageBasic
            } else if ( item.id==9 || item.id==10 || item.id==11){
							packageDetails.categoryId = 2; //preEmploymentPackageDiscount
            } else if ( item.id==4){ 
							packageDetails.categoryId = 3; //pregnancyLabPackage
            } else if ( item.id==12 || item.id==13 || item.id==14){
							packageDetails.categoryId = 4; //annualWellnessPackageBasic
            } else {
                packageDetails.categoryId = item.id //others
            }          
            packageDetails.price = item.price;
            
            //setAllServices(oldArray=>[...oldArray, packageDetails]) // append each item to packages					
        })
    })
    .catch((error)=>{
        console.log(error)
    })
		
	},[])
	

	// console.log(allLabServices)
	// console.log(allPackages)
	console.log(allServices)

	/******** END Fetching Data from API ***********/


	/******** START Redirecting to EDIT DELETE ***********/
	var id = '';
	const [redirectEdit, setRedirectEdit] = useState(false) //redirect to edit service link
	const [redirectDelete, setRedirectDelete] = useState(false) //redirect to delete service link

	//function for redirecting to edit-service/type/id
  function editService(serviceId, type) {
		id = type+"/"+serviceId;
    setRedirectEdit(true);
  }
	if(redirectEdit == true) {
    var link =  "/edit-service/" + id;
    return (
        // <Navigate to ={link}/>
				console.log("edit ", link)
    )
  }

	//function for redirecting to delete-service/type/id
	function deleteService(serviceId, type) {
    id = type+"/"+serviceId;
    setRedirectDelete(true);
  }
	if(redirectDelete == true) {
    var link =  "/delete-service/" + id;
    return (
        // <Navigate to ={link}/>
				console.log("delete ", link)
    )
  }

	/******** END Redirecting to EDIT DELETE ***********/


	

 	return (
  <div>
		<Navbar />
			<div className="active-cont">
				<Fragment>
					<Header type="thick" title="SERVICES MANAGER" buttons={buttons}/>
					<Table 
						type={'services'}
						tableData={allServices}
						rowsPerPage={10}
						headingColumns={['ID', 'NAME', 'TYPE', 'CATEGORY', 'PRICE', 'ACTION']}
						editAction = {editService}
						deleteAction = {deleteService} 
					/>
    </Fragment>

   </div>
  </div>

 )
}