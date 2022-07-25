import React, { useEffect, useState } from 'react';
import './MultipleUpload.css';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap'
import { useParams, useNavigate, useLocation } from "react-router-dom"

const userToken = getToken();
const userId = getUser();

const MultipleUpload = (bookingId, details) => {
    const [files, setFiles] = useState('');
    //state for checking file size
    const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "api/Bookingpackage_details/uploadResults/${$id}";

    const navigate = useNavigate();
    const [upload, setUpload] = useState(false);
    const [servicesFiles, setServicesFiles] = useState([]);
    const [attempCancel, setAttemptCancel] = useState(false)
    const [withResults, setWithResults] = useState(false);
    const [filenames, setFileNames] = useState([])

 

    const uploadFileHandler = (event) => {
        setFiles(event.target.files);
        var filelength = event.target.files.length
        for (let i = 0; i < event.target.files.length; i++) {
          filenames.push(event.target.files[i].name)
        }
        
       };

       const handleModalClose = () => {
        setAttemptCancel(false)
      }
      const fileSubmitHandler = (event) => {
       event.preventDefault();
       setFileSize(true);
       setFileUploadProgress(true);
       setFileUploadResponse(null);

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 1024){
                setFileSize(false);
                setFileUploadProgress(false);
                setFileUploadResponse(null);
                return;
            }

            formData.append(`files`, files[i])
        }

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch(FILE_UPLOAD_BASE_ENDPOINT+'api/Bookingpackage_details/uploadResults/${$id}', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message
                    const error = (data && data.message) || response.status;
                    setFileUploadResponse(data.message);
                    return Promise.reject(error);
                }

              //  console.log(data.message);
               setFileUploadResponse(data.message);
            })
            .catch(error => {
                console.error('Error while uploading file!', error);
            });
        setFileUploadProgress(false);
      };


    return(

      <form onSubmit={fileSubmitHandler}>
        <div className='personal-data-cont'>
         <input  className="addfile-res-btn" type="file" multiple onChange={uploadFileHandler}/>
         {/* <button className="multipleupload-res-btn" type='submit' onClick={()=>navigate('/dashboard')}>Upload</button> */}
         <button className="multipleupload-res-btn" type='submit' onClick={()=>setAttemptCancel(true)} >Upload</button>

         <input className="email-input" type='text' placeholder='Email'></input>
         <input className="pass-input" type='text' placeholder='Passcode'></input>
         <button className="send-btn" type='send'>Send Out</button>
         {!fileSize && <p style={{color:'red'}}>File size exceeded!!</p>}
         {fileUploadProgress && <p style={{color:'red'}}>Uploading File(s)</p>}
        {fileUploadResponse!=null && <p style={{color:'green'}}>{fileUploadResponse}</p>}
        <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={attempCancel}
      onHide={handleModalClose}
    >
      <Modal.Header closeButton className="cancel-modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className='fw-bold'>
            Are you sure you want to upload?       
        </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-cont'>
        <div className="row justify-content-center">
        <div className="col-3">
        {/* <button className="multipleupload-res-btn" type='submit'>Upload</button> */}
        <div >
          <section className="modal-main">
              {/* <p className='modal-content-admin'>Are you sure you want to upload this files/s?</p> */}
              <p><b>DETAILS</b></p>
              <p><b>File Name: </b> {filenames.map(data=>{return <><>{data}</><br/></>})}</p>
          </section>
        </div>
        <div className="col-4">
              <button type="submit" className="uploading-btn" onClick={()=>navigate('/medtech')} > Upload </button>
              </div>
          </div>
          <div className="col-3">
              <button className="upload-cancel" onClick={handleModalClose}> Cancel </button>
          </div>
       </div>
        </Modal.Body>
    </Modal> 
        </div>
      </form>

    );
}
export default MultipleUpload;