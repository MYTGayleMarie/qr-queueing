import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useStep } from "react-hooks-helper";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

//css
import './UserDetail.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

const userData = {
    name: "",
    email: "",
};

function UserDetail() {
    document.body.style = 'background: white;';

      //User details
      const {id} = useParams();
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");

     //Edit Profile Modal
     const [profileShow, setProfileShow] = useState(false);
     const handleProfileClose = () => setProfileShow(false);
     const handleProfileShow = () => setProfileShow(true);

     //Update Profile
     const [user, setUser] = useForm(userData);

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
      function editProfile(e, user) {
        e.preventDefault();
        console.log("here")
        axios({
            method: 'post',
            url: window.$link + 'users/update/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                name: user.name,
                email: user.email,
                updated_by: userId,
            }
        }).then(function (response) {
            console.log(response);
            toast.success("Successfully updated user profile!");
            handleProfileClose();
        }).catch(function (error) {
            console.log(error);
        });
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
                          <input type="text" name="name" className='cash-count-input' onChange={setUser}/>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='label text-center'>EMAIL</div>
                        </div>
                        <div className='col-sm-6'>
                          <input type="text" name="email" className='cash-count-input' onChange={setUser}/>
                        </div>
                      </div>
                    </div>
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='save-btn' onClick={(e) => editProfile(e, user)}>
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
