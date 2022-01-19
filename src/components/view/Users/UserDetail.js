import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useStep } from "react-hooks-helper";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


//css
import './UserDetail.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function UserDetail() {
    document.body.style = 'background: white;';

      //User details
      const {id} = useParams();
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [roleId, setRoleId] = useState("");
      const [role, setRole] = useState("");

      //Edit User
      const [editName, setEditName] = useState("");
      const [editEmail, setEditEmail] = useState("");
      const [editRoleId, setEditRoleId] = useState("");
      const [editPassword, setEditPassword] = useState("");

     //Edit Profile Modal
     const [profileShow, setProfileShow] = useState(false);
     const handleProfileClose = () => setProfileShow(false);
     const handleProfileShow = () => setProfileShow(true);

     //Change Password Modal
     const [passwordShow, setPasswordShow] = useState(false);
     const handlePasswordClose = () => setPasswordShow(false);
     const handlePasswordShow = () => setPasswordShow(true);

     //Other States
     const [redirect, setRedirect] = useState(false);

      //Fetch
      React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'users/show/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setName(response.data.name);
            setEmail(response.data.email);
            setRoleId(response.data.role_id);

            setEditName(response.data.name);
            setEditEmail(response.data.email);
            setEditRoleId(response.data.role_id);
           
            
            if(response.data.role_id == 1) {
                setRole("User");
            }
            else if(response.data.role_id == 2) {
                setRole("Registration Officer");
            }
            else if(response.data.role_id == 3) {
                setRole("Cashier");
            }
            else {
                setRole("Admin");
            }
        }).catch(function (error) {
            console.log(error);
        });

      }, []);

      //Edit Profile Function
      function editProfile(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: window.$link + 'users/update/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                name: editName,
                email: editEmail,
                role_id: editRoleId,
                updated_by: userId,
            }
        }).then(function (response) {
            console.log(response);
            toast.success("Successfully updated user profile!");
            handleProfileClose();
            setTimeout(function() {
              setRedirect(true);
          }, 2000);
        }).catch(function (error) {
            console.log(error);
        });
      }

      function changePassword(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: window.$link + 'users/reset_password/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                password: "",
                updated_by: userId,
            }
        }).then(function (response) {
            console.log(response);
            toast.success("Successfully changed password!");
            handleProfileClose();
          //   setTimeout(function() {
          //     setRedirect(true);
          // }, 2000);
        }).catch(function (error) {
            console.log(error);
        });
      }

      if(redirect == true) {
        return (
            <Navigate to = "/users"/>
        )
     }    


    return (
        <div>
        <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='USERS' 
                    buttons= {['change-password', 'edit-profile']}
                    editProfile={handleProfileShow}
                    editPassword={handlePasswordShow}
                />
                <ToastContainer/>

            <h4 className="form-categories-header italic">USER DETAILS</h4>

            <table className="personal-data-cont">
            <tr>
                <td className="first-name label">NAME</td>
                <td className="first-name detail">{name}</td>
            </tr>
            <tr>
                <td className="age label">EMAIL</td>
                <td className="age detail col-sm-8">{email}</td>
            </tr>
            <tr>
                <td className="contact-number label">ROLE</td>
                <td className="contact-number detail">{role}</td>
            </tr>
            </table>

            <Modal show={profileShow} onHide={handleProfileClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>EDIT PROFILE</Modal.Title>
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
                          <div className='label text-center'>EMAIL</div>
                        </div>
                        <div className='col-sm-6'>
                          <input type="text" name="email" className='cash-count-input' value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='label text-center'>ROLE</div>
                        </div>
                        <div className='col-sm-6'>
                         <select name="role_id" className="role-input" value={editRoleId} onChange={(e) => setEditRoleId(e.target.value)}>
                           <option value="1" selected>User</option>
                           <option value="2">Registration Officer</option>
                           <option value="3">Cashier Officer</option>
                           <option value="4">Admin</option>
                           <option value="0">Other</option>
                         </select>
                        </div>
                      </div>
                    </div>
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='save-btn' onClick={(e) => editProfile(e)}>
                          SAVE
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>

            <Modal show={passwordShow} onHide={handlePasswordClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>EDIT PASSWORD</Modal.Title>
                </Modal.Header>
                  <form>
                  <Modal.Body>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='row'>
                        <div className='col-sm-9'>
                          <div className='label text-center'>NEW PASSWORD</div>
                        </div>
                        <div className='col-sm-3'>
                          <input type="text" name="password" className='cash-count-input' onChange={(e) => setEditPassword(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='save-btn' onClick={(e) => changePassword(e)}>
                          SAVE
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>
            </div>
        </div>
    )
}

export default UserDetail
