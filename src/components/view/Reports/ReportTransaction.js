import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';



//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';
import PdfTransaction from './Pdf/PdfTransaction';

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

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  
  React.useEffect(() => {
    patientData.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'bookings/getAll',
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
        response.data.bookings.map((booking, index) => {
          axios({
            method: 'post',
            url: window.$link + 'bookings/getDetails/' + booking.id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          })
            .then(function (details) {
              var formatBookingTime = new Date(booking.booking_time);
              var bookingDetails = {};
              bookingDetails.id = booking.id;
              bookingDetails.bookingTime = formatBookingTime.toDateString();
              bookingDetails.serviceType = booking.type;

              //tests
              var mergedArray = [].concat.apply([], Object.entries(details.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
              var finalArray = details.data.data.booking_details;
              var tests = "";
              const packageFinalArray = mergedArray[0];

              if(packageFinalArray != null) {
                  finalArray = finalArray.concat(packageFinalArray);
              }

              finalArray.map((test,index) => {
                if(test.lab_test != null) {
                    if(finalArray.length - 1 != index){
                        tests += test.lab_test + ", ";
                    }else {
                        tests += test.lab_test;
                    }
                }
              })
            
             
            //   testInfo.map((test, index) => {
            //     if(test.lab_test != null) {
            //         if(testInfo.length - 1 != index){
            //             tests += test.lab_test + ", ";
            //         }else {
            //             tests += test.lab_test;
            //         }
            //     }
            //   });

              bookingDetails.tests = tests;
              bookingDetails.total = "P" + booking.total_amount;
              bookingDetails.totalAmount = "P " + booking.grand_total;
              setPatientData(oldArray => [...oldArray, bookingDetails]);
            })
            .catch(function (error) {
              console.log(error);
            });
          setRender(patientData);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filteredData]);


  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        {/* <PdfTransaction/> */}



        <Searchbar title='TRANSACTION'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableData={patientData}
             />
          <Table
            clickable={false}
            type={'no-action'}
            tableData={patientData}
            rowsPerPage={10}
            headingColumns={['BOOKING ID', 'BOOKING DATE', 'SERVICE TYPE', 'TESTS', 'AMOUNT', 'TOTAL AMOUNT']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            render={setRender}
            givenClass={"register-mobile"}
          />


          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportTransaction;
