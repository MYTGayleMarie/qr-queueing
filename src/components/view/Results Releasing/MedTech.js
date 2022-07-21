import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';



//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};

export default function MedTech() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [redirectBooking, setRedirectBooking] = useState(false);
  const [role, setRole] = useState('');
  const [bookingId, setBookingId] = useState("");

  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  React.useEffect(() => {
    patientData.length = 0;
     axios({
      method: 'get',
      url: window.$link + 'bookings/medtech',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then( function (response) {
        console.log(response);
        response.data.bookings.map((booking, index) => {
              var bookingTime = new Date(booking.added_on);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var bookingDetails = {};
              var upload_stat = ""

              bookingDetails.withDiscount = booking.discount_detail;
              bookingDetails.id = booking.id;
              bookingDetails.name = booking.customer;
              bookingDetails.bookingTime = formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
              bookingDetails.paymentStatus = booking.payment_status;
              bookingDetails.uploadStatus = booking.upload_status;
              // bookingDetails.addedOn = formatAddedOn[1] + " " + formatAddedOn[2] + ", " + getTime(addedOn);
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
        });
  }, [render]);

  
  // React.useEffect(() => {
  //   patientData.length = 0;
  //    axios({
  //     method: 'get',
  //     url: window.$link + 'bookings/medtech',
  //     withCredentials: false,
  //     params: {
  //       api_key: window.$api_key,
  //       token: userToken.replace(/['"]+/g, ''),
  //       requester: userId,
  //       date_from: filteredData.from_date,
  //       date_to: filteredData.to_date,
  //     },
  //   })
  //     .then( function (response) {
  //       console.log(response);
  //       })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [render]);
  
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);


  function searchBookingId(){
    id = bookingId
    setRedirectBooking(true)
  }


  function filter() {}

  function viewBooking(bookingId) {
    id = bookingId;
    setRedirectBooking(true);

  }



  if(redirectBooking == true) {
    var link =  "/view-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }



   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="RESULTS RELEASING MANAGER"/>

          {/* SEARCH BAR */}
          <div className="row">
            <div className="col">
              <div class="wrap d-flex justify-content-center">
                <div class="search-bar">
                  <input type="text" class="searchTerm" name="patientName" placeholder="Search Booking ID" onChange={(e)=>setBookingId(e.target.value)}/>
                  <button type="submit" class="searchButton" onClick={searchBookingId}>
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Table
            type={'medtech'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={20}
            headingColumns={['WITH DISCOUNT', 'BOOKING ID', 'PATIENT NAME', 'BOOKING DATE','PAYMENT STATUS', 'UPLOAD STATUS', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={viewBooking}
            role={role}
            userId={userId}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

















// Old Results releasing
  // const [filteredData, setFilter] = useForm(filterData);
  // const [pendingData, setPendingData] = useState([]);
  // const [redirect, setRedirect] = useState(false);

  // function startExam(bookingId, serviceId, typeService) {
  //     servId = serviceId;
  //     bookId = bookingId;
  //     type = typeService;
  //     setRedirect(true);
  // }

  // React.useEffect(() => {
  //   pendingData.length = 0;
  //   axios({
  //     method: 'post',
  //     url: window.$link + 'bookings/getAll',
  //     withCredentials: false,
  //     params: {
  //       api_key: window.$api_key,
  //       token: userToken.replace(/['"]+/g, ''),
  //       requester: userId,
  //       date_from: filteredData.from_date,
  //       date_to: filteredData.to_date,
  //     },
  //   }).then(function (response) {
  //       console.log(response.data.bookings);

  //       response.data.bookings.map((data,index) => {
  //         axios({
  //           method: 'post',
  //           url: window.$link + 'bookings/getDetails/' + data.id,
  //           withCredentials: false, 
  //           params: {
  //               api_key: window.$api_key,
  //               token: userToken.replace(/['"]+/g, ''),
  //               requester: userId,
  //           }
  //       }).then(function (booking) {
  //           var filterPackage = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            
  //           var labServices = booking.data.data.booking_details.filter((info) => info.type == "lab"); 
  //           var packageServices = filterPackage[0];
  //           var mergedServices = [];

  //           mergedServices = labServices.concat(packageServices);
  //           console.log(mergedServices)
  //           mergedServices.filter((info) => typeof info !== 'undefined').map((info, index) => {
  //             console.log(info);
  //             var servicesInfo = {};
  //             servicesInfo.booking_id = data.id;
  //             servicesInfo.id = info.id;
  //             servicesInfo.barcode = info.barcode;
  //             servicesInfo.test = info.lab_test;
  //             servicesInfo.type = info.type != undefined ? info.type : "package";
  //             servicesInfo.status = info.status; 

  //             setPendingData(oldArray => [...oldArray, servicesInfo]);
  //           });    
  //       }).then(function (error) {
  //         console.log(error);
  //       });
  //     });
  //   }).then(function (error) {
  //       console.log(error);
  //   })
  // },[]);

  // if (redirect == true) {
  //   var link = '/medtech-start/' + bookId + '/' + servId + "/" + type;
  //   return <Navigate to={link} />;
  // }

  // return (
  //   <div>
  //     <Navbar />
  //     <div className="active-cont">
  //       <Fragment>
  //         <Searchbar title="MEDICAL TECHNOLOGY" />
  //         <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={pendingData} />
  //         <Table
  //           type={'med-tech'}
  //           clickable={true}
  //           tableData={pendingData}
  //           rowsPerPage={10}
  //           headingColumns={['BOOKING ID', 'TEST ID', 'BARCODE NO.', 'TYPE', 'TEST', 'STATUS', 'ACTION']}
  //           filteredData={filteredData}
  //           setFilter={setFilter}
  //           link={startExam}
  //         />
  //       </Fragment>
  //     </div>
  //   </div>
  // );



