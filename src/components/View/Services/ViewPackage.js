import React, { Fragment, useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

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
  const [remarks, setRemarks] = useState("");

  // edit package details
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editRemarks, setEditRemarks] = useState("");

  //Edit Lab test modal
  const [packageShow, setPackageShow] = useState(false);
  const handlePackageClose = () => setPackageShow(false);
  const handlePackageShow = () => setPackageShow(true);

  //redirect
  const [redirect, setRedirect] = useState(false)

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
      setName(response.data.name)
      setPrice(response.data.price)
      setRemarks(response.data.remarks)

      setEditName(response.data.name)
      setEditPrice(response.data.price)
      setEditRemarks(response.data.remarks)
    })
    .catch((error)=>{console.log(error)})
  },[])

  //delete request
  function deletePackage(){
    console.log("delete "+id)
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
        console.log(response)
        toast.success("Successfully deleted");
        setTimeout(function () {
          setRedirect(true);
        }, 2000);
    }).then(function (error) {
        console.log(error);
    });
  }
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
              <td className="first-name label">REMARKS</td>
              <td className="first-name detail">{remarks}</td>
          </tr>

          </table>
        </Fragment>
        

      </div>
    </div>
  )
}