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

function ReportHomeServices() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [homeServices, setHomeServices] = useState([]);
  
  //ALL HOME SERVICES
   React.useEffect(() => {
     homeServices.length = 0;
    axios({
        method: 'post',
        url: window.$link + 'bookings/getAllByType/home service',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
        },
      }).then(function (booking) {
          var array = booking.data.bookings;
          array.map((data, index) => {
            var info = {};
            axios({
              method: 'post',
              url: window.$link + 'customers/show/' + data.customer_id,
              withCredentials: false,
              params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
              },
            }).then(function (customer) {
              axios({
                method: 'post',
                url: window.$link + 'bookings/getBookingDetails/' + data.id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  requester: userId,
                },
              }).then(function (response) {
                console.log(response.data)
                var formattedDate = new Date(data.booking_time);
                info.booking_number = data.id;
                info.booking_date = formattedDate.toDateString() + getTime(formattedDate);
                info.address = customer.data.address;
                var tests = '';
                response.data.map((data,index) => {
                  if(data.type == 'package') {
                    if(response.data.length - 1 == index) {
                      tests += data.package;
                    } else {
                      tests += data.package + ", \n";
                    }
                  } else {
                    if(response.data.length - 1 == index) {
                      tests += data.lab_test;
                    } else {
                      tests += data.lab_test + ", \n";
                    }
                  }
                });
                info.tests = tests;
                info.total_amount = data.grand_total;
                setHomeServices(oldArray => [...oldArray, info]);
              }).then(function (error) {
                console.log(error);
              })
            }).then(function (error) {
              console.log(error);
            })
          });
      }).then(function (error) {
        console.log(error);
      });
},[]);

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        {/* <PdfTransaction/> */}

        <Searchbar title='HOME SERVICE'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Home Service Report'}
            tableData={homeServices}
            tableHeaders={['BOOKING NUMBER', 'BOOKING DATE', 'ADDRESS', 'TESTS', 'TOTAL AMOUNT']}
             />
          <Table
            clickable={false}
            type={'services-packages'}
            tableData={homeServices}
            rowsPerPage={100}
            headingColumns={['BOOKING NUMBER', 'BOOKING DATE', 'ADDRESS', 'TESTS', 'TOTAL AMOUNT']}
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

export default ReportHomeServices;
