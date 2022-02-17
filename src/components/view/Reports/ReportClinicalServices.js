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

function ReportClinicalServices() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  
  
  //ALL HOME SERVICES
   React.useEffect(() => {
    clinicServices.length = 0;
    axios({
        method: 'post',
        url: window.$link + 'bookings/getAllByType/clinic',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
        },
      }).then(function (booking) {
          var array = booking.data.bookings;
          const requests = array.map((data, index1) => {
            var info = {};
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
                var formattedDate = new Date(data.booking_time);
                info.booking_number = data.id;
                info.booking_date = formattedDate.toDateString() + getTime(formattedDate);
                var tests = '';

                response.data.map((data,index2) => {
                  if(data.type == 'package') {
                    if(response.data.length - 1 == index2) {
                      tests += data.package;
                    } else {
                      tests += data.package + ", \n";
                    }
                  } else {
                    if(response.data.length - 1 == index2) {
                      tests += data.lab_test;
                    } else {
                      tests += data.lab_test + ", \n";
                    }
                  }

                  if(array.length - 1 == index1 && response.data.length - 1 == index2) {
                    setPrintReadyFinal(true);
                  }
                });
                info.tests = tests;
                info.total_amount = data.grand_total;
                setClinicServices(oldArray => [...oldArray, info]);
              }).then(function (error) {
              });
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

        <Searchbar title='CLINIC SERVICE'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Clinic Service Report'}
            tableData={clinicServices}
            tableHeaders={['BOOKING NUMBER', 'BOOKING DATE', 'TESTS', 'TOTAL AMOUNT']}
            status={printReadyFinal}
             />
          <Table
            clickable={false}
            type={'services-packages'}
            tableData={clinicServices}
            rowsPerPage={100}
            headingColumns={['BOOKING NUMBER', 'BOOKING DATE', 'TESTS', 'TOTAL AMOUNT']}
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

export default ReportClinicalServices;
