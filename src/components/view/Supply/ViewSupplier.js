import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser } from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//css
import '../Users/UserDetail.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function ViewSupplier() {
  document.body.style = 'background: white;';

   //User details
   const {id} = useParams();
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [tin, setTin] = useState("");
   const [remarks, setRemarks] = useState("");

   //Edit User
   const [editName, setEditName] = useState("");
   const [editAddress, setEditAddress] = useState("");
   const [editPhone, setEditPhone] = useState("");
   const [editEmail, setEditEmail] = useState("");
   const [editTin, setEditTin] = useState("");
   const [editRemarks, setEditRemarks] = useState("");

    //Edit Supplier Modal
    const [supplierShow, setSupplierShow] = useState(false);
    const handleSupplierClose = () => setSupplierShow(false);
    const handleSupplierShow = () => setSupplierShow(true);

    //Other States
    const [redirect, setRedirect] = useState(false);

     //Fetch
     React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'suppliers/show/' + id,
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
      }).then(function (response) {
        console.log(response.data)

        setName(response.data.name);
        setAddress(response.data.address);
        setPhone(response.data.contact_no);
        setEmail(response.data.email);
        setTin(response.data.tin);
        setRemarks(response.data.remarks);

        setEditName(response.data.name);
        setEditAddress(response.data.address);
        setEditPhone(response.data.contact_no);
        setEditEmail(response.data.email);
        setEditTin(response.data.tin);
        setEditRemarks(response.data.remarks);

      }).then(function (error) {
        console.log(error)
      });
     },[]);

      //Edit Supplier Function
      function editSupplier(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: window.$link + 'suppliers/update/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                name: editName,
                address: editAddress,
                contact_no: editPhone,
                tin: editTin,
                remarks: editRemarks,
                // email: editEmail,
                updated_by: userId,
            }
        }).then(function (response) {
          console.log(response);
          toast.success("Successfully updated user profile!");
          handleSupplierClose();
          setTimeout(function () {
            setRedirect(true);
          }, 2000);
        }).then(function (error) {
          console.log(error);
        });
      }

      function deleteSupplier() {
        axios({
            method: 'post',
            url: window.$link + 'suppliers/delete/' + id,
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
          <Navigate to = "/suppliers"/>
      )
   }    

  return (
    <div>
    <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='USERS' 
                buttons= {['delete-supplier', 'edit-supplier']}
                editSupplier={handleSupplierShow}
                deleteSupplier={deleteSupplier}
            />
            <ToastContainer/>

        <h4 className="form-categories-header italic">USER DETAILS</h4>

        <table className="personal-data-cont">
        <tr>
            <td className="first-name label">NAME</td>
            <td className="first-name detail">{name}</td>
        </tr>
        <tr>
            <td className="first-name label">ADDRESS</td>
            <td className="first-name detail">{address}</td>
        </tr>
        <tr>
            <td className="first-name label">PHONE</td>
            <td className="first-name detail">{phone}</td>
        </tr>
        <tr>
            <td className="age label">EMAIL</td>
            <td className="age detail col-sm-8">{email}</td>
        </tr>
        <tr>
            <td className="first-name label">TIN</td>
            <td className="first-name detail">{tin}</td>
        </tr>
        <tr>
            <td className="age label">REMARKS</td>
            <td className="age detail col-sm-8">{remarks}</td>
        </tr>
        </table>

        <Modal show={supplierShow} onHide={handleSupplierClose} size="md">
        <Modal.Header closeButton className='text-center'>
           <Modal.Title className='w-100 cash-count-header'>EDIT SUPPLIER</Modal.Title>
            </Modal.Header>
              <form>
              <Modal.Body>

              <div className='row'>
                <div className='col-sm-6'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>NAME</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="name" className='cash-count-input' value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>ADDRESS</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="address" className='cash-count-input' value={editAddress} onChange={(e) => setEditAddress(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>PHONE</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="phone" className='cash-count-input' value={editPhone} onChange={(e) => setEditPhone(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>EMAIL</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="email" className='cash-count-input' value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>TIN</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="tin" className='cash-count-input' value={editTin} onChange={(e) => setEditTin(e.target.value)}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>REMARKS</div>
                    </div>
                    <div className='col-sm-6'>
                      <input type="text" name="remarks" className='cash-count-input' value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)}/>
                    </div>
                  </div>
                </div>
               </div>
              </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className='save-btn' onClick={(e) => editSupplier(e)}>
                      SAVE
                    </button>
               </Modal.Footer>
               </form>
        </Modal>
        </div>
    </div>
  );
}

export default ViewSupplier;
