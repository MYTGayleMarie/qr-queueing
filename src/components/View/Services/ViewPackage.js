import React, { Fragment, useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { MultiSelect } from 'react-multi-select-component';

//css
import './ViewLabTest.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

//constants
const buttons = ['edit-package', 'delete-package'];
const userToken = getToken();
const userId = getUser();

export default function ViewPackage(){

  // package details
  const {id} = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState([]);
  const [remarks, setRemarks] = useState("");

  // edit package details
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editServices, setEditServices] = useState([])
  const [editRemarks, setEditRemarks] = useState("");

  //lab tests options
  const [labOptions, setLabOptions] = useState([]);

  //Edit Lab test modal
  const [packageShow, setPackageShow] = useState(false);
  const handlePackageClose = () => setPackageShow(false);
  const handlePackageShow = () => setPackageShow(true);

  //redirect
  const [redirect, setRedirect] = useState(false)

  //lab test id array
  // const [labTestsId, setLabTestsId] = useState([])
  const labTestsId = [];

  //fetching package details
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'packages/show/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response)=>{
      // console.log(response)
      setName(response.data.name)
      setPrice(response.data.price)
      setRemarks(response.data.remarks)

      setEditName(response.data.name)
      setEditPrice(response.data.price)
      setEditRemarks(response.data.remarks)
    })
    .catch((error)=>{console.log(error)})
  },[])

  //Get all lab tests under package
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'Package_detail/show_by_package/' + id,
      withCredentials: false, 
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId
      }
    })
    .then((response)=>{
      // console.log(response)
      response.data.map(async (data,index)=>{
        // console.log(data)
        await axios({
          method: 'post',
          url: window.$link + 'lab_tests/show/' + data.lab_test_id,
          withCredentials: false, 
          params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
        })
        .then((service)=>{
          // console.log(service)
          var info = {};
          info.label = service.data.name;
          info.value = data.lab_test_id;
          setServices(oldArray=>[...oldArray, info])
          setEditServices(oldArray=>[...oldArray, info])
          

        })
        .catch((error)=>{console.log(error)})

      })
      
    })
    .catch((error)=>{console.log(error)})
  },[])

  //Get all lab tests
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
        // console.log(resLabTests)
        resLabTests.map((data, index)=>{
          var info = {};
          info.label = data.name;
          info.value = data.id;
          setLabOptions(oldArray=>[...oldArray, info])
        })
      }).catch((error)=>{console.log(error)})
  },[])

  //function edit request
  function editPackage(e){
    e.preventDefault();
    
    editServices.map((data,index)=>{
      // console.log(data)
      labTestsId.push(data.value)
    })
  
    axios({
      method: 'post',
      url: window.$link + 'packages/update/' + id,
      withCredentials: false, 
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        name: editName,
        price: editPrice,
        remarks: editRemarks,
        lab_tests: labTestsId,
        updated_by: userId

    }})
    .then((response)=>{
      // console.log(response)
      toast.success("Successfully updated package!");
      handlePackageClose();
      setTimeout(function() {
        setRedirect(true);
        }, 2000);
    })
    .catch((error)=>{console.log(error)})
  }


  //function delete request
  function deletePackage(){
    // console.log("delete "+id)
    axios({
      method: 'post',
      url: window.$link + 'packages/delete/' + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        updated_by: userId,
      },
    }).then(function (response) {
        // console.log(response)
        toast.success("Successfully deleted");
        setTimeout(function () {
          setRedirect(true);
        }, 2000);
    }).then(function (error) {
        console.log(error);
    });
  }
 
  //redirect to services manager after edit/delete
  if(redirect == true) {
  return (
      <Navigate to = "/services"/>
  )
  }    

  return(
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header 
          type="thin"
          title="SERVICES - PACKAGES"
          buttons= {['delete-package', 'edit-package']}
          editPackage={handlePackageShow}
          deletePackage={deletePackage}
        />
        <ToastContainer/>
        <h4 className="form-categories-header italic">PACKAGE DETAILS</h4>
        
          <table className="personal-data-cont">
          <tr>
              <td className="first-name label">NAME</td>
              <td className="first-name detail">{name}</td>
          </tr>
          <tr>
              <td className="first-name label">PRICE</td>
              <td className="first-name detail">P {price}</td>
          </tr>
          <tr>
              <td className="first-name label">SERVICES</td>
              <td className="first-name detail"style={{padding: "20px 0px"}}>
              
                {services.map((service)=>
                  <div>{service.label}</div>
                )}
              
            </td>
          </tr>
          <tr>
              <td className="first-name label">REMARKS</td>
              <td className="first-name detail">{remarks}</td>
          </tr>

          </table>
          <Modal show={packageShow} onHide={handlePackageClose} size="lg">
            <Modal.Header>
              <Modal.Title className='w-100 cash-count-header'>EDIT PACKAGE</Modal.Title>
            </Modal.Header>
            <form>
            <Modal.Body>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-left'>NAME</div>
                    </div>
                    <div className='col-sm-8'>
                      <input type="text" name="name" className='cash-count-input' value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-left'>PRICE</div>
                    </div>
                    <div className='col-sm-8'>
                      <input type="text" name="price" className='cash-count-input' value={editPrice} onChange={(e) => setEditPrice(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-left'>SERVICES</div>
                    </div>
                    <div className='col-sm-8'>
                      {/* <input type="text" name="price" className='cash-count-input' value={editServices} onChange={(e) => setEditServices(e.target.value)}/> */}
                      <MultiSelect
                        options={labOptions}
                        value={editServices}
                        onChange={setEditServices}
                        labelledBy="Select"
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-left'>REMARKS</div>
                    </div>
                    <div className='col-sm-8'>
                      <input type="text" name="remarks" className='cash-count-input' value={editRemarks} onChange={(e) =>setEditRemarks(e.target.value)}/>
                    </div>
                  </div>
                  
                </div>
              </div>


            </Modal.Body>
            </form>
            
            <Modal.Footer>
              <button type="submit" className='save-btn' onClick={(e) => editPackage(e)}>
                SAVE
              </button>

            </Modal.Footer>
          </Modal>
        </Fragment>
        

      </div>
    </div>
  )
}