import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';

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
              console.log(details)
              var bookingTime = new Date(booking.booking_time);
              var formattedBookingTime = bookingTime.toDateString().split(" ");

              axios({
                method: 'post',
                url: window.$link + 'customers/show/' + booking.customer_id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  requester: userId,
                },
              }).then(function (customer) {
                  var bookingDetails = {};
                  bookingDetails.id = booking.id;
                  bookingDetails.name = customer.data.first_name + " " + customer.data.middle_name + " " + customer.data.last_name;
                  bookingDetails.booking_time = formattedBookingTime[1] + " " + formattedBookingTime[2] + " " + formattedBookingTime[3]; 
                  bookingDetails.type = booking.type;
                  
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
                            tests += test.lab_test + ",";
                        }else {
                            tests += test.lab_test;
                        }
                    }
                  })
    
                  bookingDetails.tests = tests;
                  if(booking.result=="print with pickup"){
                    bookingDetails.results = booking.result;
                  } else {
                    bookingDetails.results = booking.result + "\n" + customer.data.email;
                  }
                  
                  // bookingDetails.total_amount = "P " + booking.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setPatientData(oldArray => [...oldArray, bookingDetails]);
                  

              });
            })
            .catch(function (error) {
              console.log(error);
            });

            if(response.data.bookings.length - 1 == index) {
              setPrintReadyFinal(true);
            }
        });
      })
      .catch(function (error) {
        console.log(error);
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
            tableHeaders={['BOOKING ID', 'NAME', 'BOOKING DATE', 'SERVICE TYPE', 'TESTS', 'MODE OF PICKUP']}
            status={printReadyFinal}
             />
          <Table
            clickable={false}
            type={'no-action'}
            tableData={patientData}
            rowsPerPage={10}
            headingColumns={['BOOKING ID', 'NAME', 'BOOKING DATE', 'SERVICE TYPE', 'TESTS','MODE OF PICKUP']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
          />


          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportTransaction;
