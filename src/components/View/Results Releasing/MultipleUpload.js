import React, { useState } from 'react';
import './MultipleUpload.css';


const MultipleUpload = () => {
    const [files, setFiles] = useState('');
    //state for checking file size
    const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8282";

    const uploadFileHandler = (event) => {
        setFiles(event.target.files);
       };

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
        fetch(FILE_UPLOAD_BASE_ENDPOINT+'/upload', requestOptions)
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

               console.log(data.message);
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
         <input  className="addfile-res-btn" type="file"  multiple onChange={uploadFileHandler}/>
         <button className="multipleupload-res-btn" type='submit'>Upload</button>
         <input className="email-input" type='text' placeholder='Email'></input>
         <input className="pass-input" type='text' placeholder='Passcode'></input>
         <button className="send-btn" type='send'>Send Out</button>
         {!fileSize && <p style={{color:'red'}}>File size exceeded!!</p>}
         {fileUploadProgress && <p style={{color:'red'}}>Uploading File(s)</p>}
        {fileUploadResponse!=null && <p style={{color:'green'}}>{fileUploadResponse}</p>}
        </div>
      </form>

    );
}
export default MultipleUpload;