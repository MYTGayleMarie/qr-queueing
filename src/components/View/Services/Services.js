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

//constants
const buttons = ['add-lab-test', 'add-package'];
const userToken = getToken();
const userId = getUser();



//View page
export default function Services(){
  const [allServices, setAllServices] = useState([]); //data for the table (including lab tests and packages)

  const [category, setCategory] = useState('lab') // state for the category filter
  const [render, setRender] = useState([]) //changes state when filter button is clicked


	/******** START Fetching Data from API ***********/

  React.useEffect(()=>{
    allServices.length=0; //allServices should be empty (0 content) every render

    //fetch lab tests API if category is lab (default)
    if (category=='lab'){
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

        //mapping lab tests response to create object for services
        resLabTests.map(async (data, index)=>{
          await axios({
            method: 'post',
            url: window.$link + 'categories/show/' + data.category_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          })
          .then( (category) => {
            console.log(category)
            var labDetails = {}; //object for each lab tests
            labDetails.id = data.id;
            labDetails.name = data.name;
            labDetails.type = 'lab';
            labDetails.categoryId = category.data.name;
            labDetails.price = data.price;
            console.log(labDetails)
            setAllServices(oldArray=>[...oldArray, labDetails]) //append each lab test detail to all services
          }

          )
          .catch((error)=>{console.log(error)})
          
        })
      }).catch((error)=>{
        console.log(error)
      })
    } 
    
    //fetch packages API if package is selected in filter dropdown
    else if (category=='package'){
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
        const resPackages = response.data.packages.filter(test=>test.is_deleted != 1).sort((x, y)=>x.id-y.id); // array of all packages details
        
        //mapping packages response to create object for services
        resPackages.map((res, index)=>{
          var packageDetails = {};
          packageDetails.id = res.id;
          packageDetails.name = res.name;
          packageDetails.type = 'package';

          //conditionals for categoryId since category is not yet in API
          if( res.id==1 || res.id==2 || res.id==3){                        
            packageDetails.categoryId = 'Pre Employment Basic'; //1 preEmploymentPackageBasic
          } else if ( res.id==9 || res.id==10 || res.id==11){
            packageDetails.categoryId = 'Pre Employment Discounted'; //2 preEmploymentPackageDiscount
          } else if ( res.id==4){ 
            packageDetails.categoryId = 'Pregnancy Lab'; //3 pregnancyLabPackage
          } else if ( res.id==12 || res.id==13 || res.id==14){
            packageDetails.categoryId = 'Annual Wellness'; //4 annualWellnessPackageBasic
          } else {
              packageDetails.categoryId = res.name; //res.id.toString()others
          }    

          packageDetails.price = res.price;
          console.log(packageDetails)
          setAllServices(oldArray=>[...oldArray, packageDetails]) //append each package detail to all services
        })

      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },[render])
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
            setCategory = {setCategory}
            setRender = {setRender}
            render = {render}
					/>
    </Fragment>

   </div>
  </div>

 )
}