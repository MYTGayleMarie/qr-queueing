import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';
import { RingLoader } from "react-spinners";
import PageLoader from "../Loader/PageLoader";



//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';

const buttons = ['export-excel', 'export-pdf'];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};



function ReportTransaction() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    patientData.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'reports/transaction',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        console.log(response.data.data.bookings)
        setIsReady(false)
        var bookingDetailsResponse = response.data.data.booking_details
        console.log(bookingDetailsResponse)
        response.data.data.bookings.map((booking, index) => {
          
            
              
              var bookingTime = new Date(booking.booking_time);
              var formattedBookingTime = bookingTime.toDateString().split(" ");

             
                  var bookingDetails = {};
                  bookingDetails.id = booking.id;
                  bookingDetails.name = booking.customer
                  bookingDetails.booking_time = formattedBookingTime[1] + " " + formattedBookingTime[2] + " " + formattedBookingTime[3]; 
                  bookingDetails.type = booking.type.toUpperCase();
                  
                  //tests
                  // var mergedArray = [].concat.apply([], Object.entries(details.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
                
                  var tests = "";
                  if(bookingDetailsResponse[booking.id] != null){
                    var finalArray = bookingDetailsResponse[booking.id];
                  }
                  console.log(finalArray)


                  finalArray.map((test,index) => {
                    if(test.lab_test != null) {
                        if(finalArray.length - 1 != index){
                            tests += test.lab_test + ", ";
                        }else {
                            tests += test.lab_test;
                        }
                    }
                    if(test.package != null){
                      if(finalArray.length - 1 != index){
                        tests += test.package + ", ";
                    }else {
                        tests += test.package;
                    }
                    }
                  })


    
                  bookingDetails.tests = tests;
                  bookingDetails.payment_type = booking.payment_type === null ? "NONE": booking.payment_type.toUpperCase();
                  bookingDetails.discount_code = booking.discount_code === null ? "NONE" : booking.discount_code;
                  bookingDetails.paid_amount = booking.paid_amount === null || booking.paid_amount === 0 ? 0 : booking.paid_amount;
                  bookingDetails.results = (booking.result).toUpperCase();
                  
                  // bookingDetails.total_amount = "P " + booking.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setPatientData(oldArray => [...oldArray, bookingDetails]);
                  setIsReady(true)

        });
        setPrintReadyFinal(true);
        setIsReady(true)
       
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false)
      });
  }, [render]);

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
        <Searchbar title='TRANSACTION'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Transaction Report'}
            tableData={patientData}
            tableHeaders={['BOOKING ID', 'NAME', 'BOOKING DATE', 'SERVICE TYPE', 'TESTS', 'PAYMENT TYPE', 'DISCOUNT', 'PAID AMOUNT', 'MODE OF PICKUP']}
            status={printReadyFinal}
             />
             <div className='spinner d-flex justify-content-center'>
       </div>
          <Table
            clickable={false}
            type={'transaction'}
            tableData={patientData}
            rowsPerPage={10}
            headingColumns={['BOOKING ID', 'NAME', 'BOOKING DATE', 'SERVICE TYPE', 'TESTS', 'PAYMENT TYPE', 'DISCOUNT', 'PAID AMOUNT', 'MODE OF PICKUP']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            useLoader={true}
            isReady={isReady}
            // useLoader={true}

          />


          <ToastContainer hideProgressBar={true} />
          {/* </>} */}
        </Fragment>
      </div>
    </div>
  );
}

export default ReportTransaction;
