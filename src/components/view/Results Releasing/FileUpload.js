import React, {useState} from "react"
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import pdfIcon from '../../../images/icons/pdf-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const userToken = getToken();
const userId = getUser();

export default function FileUpload({servicesData, title}){
  const inputRef = React.useRef(null);
  const [labIds, setLabIds] = useState([]);
  const [packageIds, setPackageIds] = useState([]);
  const [servicesLab, setServicesLab] = useState([]);
  const [servicesPackage, setServicesPackage] = useState([]);

  // const services_package = servicesData.filter((info)=>info.type=='package')
  // const services_lab = servicesData.filter((info)=>info.type=='lab')

  React.useEffect(()=>{
    setServicesLab(servicesData.filter((info)=>info.type=='lab'))
    setServicesPackage(servicesData.filter((info)=>info.type=='package'))
  },[servicesData])

  React.useEffect(()=>{
    labIds.length=0;
    servicesLab.map((data, index)=>{
      setLabIds(oldArray => [...oldArray, data.id])
    })
  }, [servicesLab])

  React.useEffect(()=>{
  packageIds.length=0;
  servicesPackage.map((data, index)=>{
    setPackageIds(oldArray => [...oldArray, data.id])
  })
  }, [servicesPackage])
  

  // Function submit base 64
  function submitPdf(base64, labIdArray, packageIdArray){
    base64 = file;
    labIdArray = labIds;
    packageIdArray = packageIds;
    const formData = new FormData();
    formData.append("file_result", base64);
    // console.log(base64)
    // console.log(labIdArray)
    // console.log(packageIdArray)

    if(labIdArray.length!=0){
      labIdArray.map((idLab, index)=>{
        axios({
            method: 'post',
            url: window.$link + 'Bookingdetails/uploadResults/' + idLab,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              added_by:userId
            }
          })
        .then((response)=>{
          console.log(response)
        })
        .catch((error)=>{console.log(error)})

      })
    }
    if(packageIdArray.length!=0) {
      packageIdArray.map((idPackage, index)=>{
        axios({
        method: 'post',
        url: window.$link + 'Bookingpackage_details/uploadResults/' + idPackage,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          added_by:userId
        }
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{console.log(error)})
    })
    }     
      

  }

  // Base64 file
  const [file, setFile] = useState("")
  const [fileLength, setFileLength] = useState(0)
  const [fileName, setFileName] = useState("")
  const [data, setData] = useState("")

   // Reads file to base64
  function fileToBase64(file, cb){
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // If reader loads the full file
    reader.onload = function (){
      cb(null, reader.result);
    };

    // If there is error reading the file
    reader.onerror = function (error){
      cb(error, null)
    };
  }

  // Handles file upload
  function onUploadFileChange({ target }){
    // set number of files
    setFileLength(target.files['length'])

    // Set name of file input
    setFileName(target.files[0].name)

    //if there is no file uploaded or is not valid:
    if(target.files<1 || !target.validity.valid){
      return
    }
    fileToBase64(target.files[0], (err, result)=>{
      if (result){
        const base64 = result.split(',');
        setFile(base64[1]);
        // setFile(result);
        setData("data:application/pdf;base64,"+base64[1]);
      }
    })
  }
  function removeFile(){
    setFile("")
    setFileName("")
    setFileLength(0)
  }
  // handle drag events
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return(
    <div>
      <div className="result-cont row">
          <div className="col-sm-4">
            <div className="category label">{title}</div>
            {servicesData.map((info,index)=>
              <div className={"details"+info.id}>{info.type} {info.id} {info.name}</div>
            )}
          </div>
          {/* Upload button */}
          <div className="upload-cont col-sm-8">
            <input 
                ref={inputRef} 
                type="file"
                name="pdftobase64" 
                accept="application/pdf"
                className="input-file-upload"
                onChange={onUploadFileChange}
                />
            
            {/* File Upload Button */}
            {fileLength==0 &&(<button className="upload-res-btn" onClick={onButtonClick}>UPLOAD RESULTS</button>)}
            
            {/* File Name and Delete Button */}
            {fileLength!=0 && (<div className="file-upload-remove">
                <img src={pdfIcon} alt="pdf" className="pdf-icon"/>
                <p className="file-name">{fileName}</p>
                <button className="delete-btn" onClick={removeFile}><FontAwesomeIcon icon={"minus-square"} alt={"minus"} aria-hidden="true" className="delete-icon"/></button>
                <button className="submit-btn" onClick={submitPdf}>SAVE</button>
              </div>)}
              
          </div>          
      </div>
    </div>
  )

  
}