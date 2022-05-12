import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import axios from 'axios';
import ReportClinicalServices from '../Reports/ReportClinicalServices';

const userToken = getToken();
const userId = getUser();

export default function ViewPdf(){
  const {type} = useParams();
  const {bookingId} = useParams();
  const {packageId} = useParams();
  const {serviceId} = useParams();
  const [base64, setBase64] = useState("")

 React.useEffect(()=>{
    // Type is lab
  if(type=="lab"){
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
      const labDetail = lab.data.filter((details)=>details.id==serviceId)
      // console.log(labDetail)
      setBase64(labDetail[0].file)
      
    })
    .catch((error)=>{console.log(error)})
  }
  // Type is package
  if(type=="package"){
    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingPackageDetails/' + packageId,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((packages)=>{
      // console.log(packages)
      const packageDetail = packages.data.filter((details)=>details.id==serviceId)
      // console.log(packageDetail)
      setBase64(packageDetail[0].file)
    })
    .catch((error)=>{console.log(error)})
  }

  },[])

// console.log(base64)
  return(
//    <div>
// {type}
// {bookingId}
// {packageId}
// {serviceId}
//    </div> 


    // <object 
    //   data={base64}  
    //   className="pdfObject"/>
    <embed src={base64} className="pdfObject" />
)
}