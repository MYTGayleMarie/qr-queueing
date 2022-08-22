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
var id = '';



//View page
export default function Services(){
  const [allServices, setAllServices] = useState([]); //data for the table (i
	const [redirectView, setRedirectView] = useState(false) //redirect to edit service link

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
        const resLabTests = response.data.lab_tests.sort((x, y)=>x.id-y.id).filter(test=>test.is_deleted != 1); // array of all lab tests details
        console.log(resLabTests)

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

	/******** END Fetching Data from API ***********/
//sort services by service id
   React.useEffect(() => {
    allServices.sort((a,b) => (a.id - b.id));
  },[allServices]);


	//function for redirecting to review
	function linkView(serviceId, type) {
    id = type+"/"+serviceId;
    setRedirectView(true);
  }
  
	if(redirectView == true) {
    var link = "/View/"+id
    return (
        <Navigate to ={link}/>
    )
  }


	

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
						link = {linkView}
            setCategory = {setCategory}
            setRender = {setRender}
            render = {render}
					/>
    </Fragment>

   </div>
  </div>

 )
}