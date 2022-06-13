import React, {useState} from "react"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import pdfIcon from '../../../images/icons/pdf-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";


const userToken = getToken();
const userId = getUser();

export default function FileUpload({servicesData, title, bookingId}){
  const inputRef = React.useRef(null);
  const [labIds, setLabIds] = useState([]);
  const [packageIds, setPackageIds] = useState([]);
  const [servicesLab, setServicesLab] = useState([]);
  const [servicesPackage, setServicesPackage] = useState([]);
  const [withResults, setWithResults] = useState(false);
  const [redirectPdf, setRedirectPdf] = useState(false);
  const [upload, setUpload] = useState(false);
  
  // Base64 file
  const [file, setFile] = useState("")
  const [fileLength, setFileLength] = useState(0)
  const [fileName, setFileName] = useState("")
  const [data, setData] = useState("")
  const [md, setMd] = useState("")

  // Categorizing services into lab and packages
  React.useEffect(()=>{
    setServicesLab(servicesData.filter((info)=>info.type=='lab'))
    setServicesPackage(servicesData.filter((info)=>info.type=='package'))
  },[servicesData])

  // Making array od all lab ids
  React.useEffect(()=>{
    labIds.length=0;
    servicesLab.map((data, index)=>{
      setLabIds(oldArray => [...oldArray, data.id])
    })
  }, [servicesLab])

  // Making array of all package ids
  React.useEffect(()=>{
  packageIds.length=0;
  servicesPackage.map((data, index)=>{
    setPackageIds(oldArray => [...oldArray, data.id])
  })
  }, [servicesPackage])

  // Checking if lab has results already
  React.useEffect(()=>{
    // Type is lab
  if(servicesData[0].type=="lab"){
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingDetails/' + bookingId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((lab)=>{
      // console.log(lab)
      const labDetail = lab.data.filter((details)=>details.id==servicesData[0].id)
      // console.log(labDetail)
      if (labDetail[0].result_id>0){
        setWithResults(true)
      }
    })
    .catch((error)=>{console.log(error)})
  }
  // Type is package
  if(servicesData[0].type=="package"){
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingPackageDetails/' + servicesData[0].packageId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((packages)=>{
      // console.log(packages)
      const packageDetail = packages.data.filter((details)=>details.id==servicesData[0].id)
      // console.log(packageDetail)
      if (packageDetail[0].result_id>0){
        setWithResults(true)
      }
    })
    .catch((error)=>{console.log(error)})
  }

  },[upload])

  // Convert file to base 64
  function convertToBase64(e){
    //read file
    // var selectedFile=document.getElementById("pdftobase64").files
    var selectedFile = e.target.files;
    // Check if file is empty
         
    if(selectedFile.length > 0){
      setFileLength(selectedFile.length)
      // select first file from list
      setFileName(selectedFile[0].name)
      var fileToLoad = selectedFile[0]
      var fileReader = new FileReader();
      var base64;
      fileReader.onload = function(fileLoadedEvent){
        base64 = fileLoadedEvent.target.result;
        setFile(base64)
        
      }
      fileReader.readAsDataURL(fileToLoad)
    }

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

  // Function submit base 64
  function submitPdf(base64, labIdArray, packageIdArray){
    base64 = file;
    labIdArray = labIds;
    packageIdArray = packageIds;
    // console.log(base64)

    if(labIdArray.length!=0){
      labIdArray.map((idLab, index)=>{
        // console.log("lab "+idLab)
        const formData = new FormData();
        formData.append("file", base64);
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
          // console.log(response)
          toast.success("Uploaded successfully!");
          setTimeout(() => {
            // refreshPage();
            setUpload(old=>!old)
          },2000);
        })
        .catch((error)=>{console.log(error)})

      })
    }
    if(packageIdArray.length!=0) {
      packageIdArray.map((idPackage, index)=>{
        // console.log(base64)
        const formData = new FormData();
        formData.append("file", base64);
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
        // console.log(response)
        toast.success("Uploaded successfully!");
        setTimeout(() => {
          // refreshPage();
          setUpload(old=>!old)

        },2000);
      })
      .catch((error)=>{console.log(error)})
    })
    }     
      

  }

  // Handle view results button click
  function handleViewResults(){
    setRedirectPdf(true)
  }

    // Redirect to view pdf results
  if(redirectPdf==true){
    let location = window.location.origin
    let type = servicesData[0].type;
    let bookId= bookingId;
    let packageId = servicesData[0].packageId;
    let serviceId = servicesData[0].id;
    var link = location+"/view-results/"+type+"/"+bookId+"/"+packageId+"/"+serviceId;
    window.open(link)
    // console.log(link)
  }

  return(
    <div>
      <div className="result-cont row">
          <div className="col-sm-4">
            <div className="category label">{title}</div>
            {servicesData.map((info,index)=>
              <div className={"details"+info.id}>{info.name}</div>
            )}
          </div>
          {/* Upload button */}
          <div className="upload-cont col-sm-8">
            <input 
                ref={inputRef} 
                type="file"                
                id="pdftobase64"
                name="pdftobase64" 
                accept="application/pdf"
                className="input-file-upload"
                onChange={(e)=>convertToBase64(e)}
                />
            
            {/* File Upload Button */}
            {(fileLength==0&&withResults==false) &&(<button className="upload-res-btn" onClick={onButtonClick}>UPLOAD RESULTS</button>)}
            
            {/* File Name and Delete Button */}
            {(fileLength!=0&&withResults==false) && (<div className="file-upload-remove">
                <img src={pdfIcon} alt="pdf" className="pdf-icon"/>
                <p className="file-name">{fileName}</p>
                <button className="delete-btn" onClick={removeFile}><FontAwesomeIcon icon={"minus-square"} alt={"minus"} aria-hidden="true" className="delete-icon"/></button>
                <button className="submit-btn" onClick={submitPdf}>SAVE</button>

                <div className='row more-gap'>
                
                <div className='col-sm-12 d-flex justify-content-end'>
                    <span className='md-label'>MD :</span>
                    <input name="md" className='md-input' onChange={(e) => setMd(e.target.value)}/>
                </div>
            </div>

              </div>)}
            
            {/* View File Button */}
            {withResults && (
              <button className="upload-res-btn blue" onClick={handleViewResults}>VIEW RESULTS</button>
            )}
              
          </div>          
      </div>
    </div>
  )

  
}