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
const buttons = ['edit-lab-test', 'delete-lab-test'];
const userToken = getToken();
const userId = getUser();

export default function ViewLabTest(){
  //lab test info
  const {id} = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [remarks, setRemarks] = useState("");

  //Edit 
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editRemarks, setEditRemarks] = useState("");

  //Edit Lab test modal
  const [labTestShow, setLabTestShow] = useState(false);
  const handleLabTestClose = () => setLabTestShow(false);
  const handleLabTestShow = () => setLabTestShow(true);

  //Fetch single lab test details
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'lab_tests/show/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response)=>{
      console.log(response)
      setName(response.data.name)
      setPrice(response.data.price)
      setRemarks(response.data.remarks)
      
      setEditName(response.data.name)
      setEditPrice(response.data.price)
      setEditRemarks(response.data.remarks)

      axios({
        method: 'post',
        url: window.$link + 'categories/show/' + response.data.category_id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
        },
      }).then((response)=>{
        console.log(response)
        setCategory(response.data.name.toLowerCase())
        
        setEditCategory(response.data.name.toLowerCase())
      })
    })
    .catch((error)=>{console.log(error)})
  })

  // submit delete request
  function deleteLabTest(){
    console.log("delete "+id)
  }

  return(
    <div>
     <Navbar />
     <div className="active-cont">
       <Fragment>
          <Header 
            type='thin'
            title='SERVICES - LAB TESTS'
            buttons= {['delete-lab-test', 'edit-lab-test']}
            editLabTest={handleLabTestShow}
            deleteLabTest={deleteLabTest}
          />
          <ToastContainer/>
          <h4 className="form-categories-header italic">LAB TEST DETAILS</h4>
          <table className="personal-data-cont">
            <tr>
                <td className="first-name label">NAME</td>
                <td className="first-name detail">{name}</td>
            </tr>
            <tr>
                <td className="first-name label">CATEGORY</td>
                <td className="first-name detail category">{category}</td>
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
          <Modal show={labTestShow} onHide={handleLabTestClose} size="md">
            <Modal.Header closeButton className='text-center'>
              <Modal.Title className='w-100 cash-count-header'>EDIT LAB TEST</Modal.Title>
            </Modal.Header>
            <form>
              <Modal.Body>
                <div className="row">
                  <div className='col-sm-6'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <div className='label text-center'>NAME</div>
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <input type="text" name="name" className='cash-count-input' value={editName} onChange={(e) => setEditName(e.target.value)}/>
                  </div>
                  </div>
                </div>
              </Modal.Body>
            </form>
          </Modal>


       </Fragment>
     </div>
    </div>
  )
}