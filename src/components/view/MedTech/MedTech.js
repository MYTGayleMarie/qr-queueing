import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import '../Imaging/Imaging.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const buttons = ['download'];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
};

function MedTech() {

  const [filteredData, setFilter] = useForm(filterData);
  const [pendingData, setPendingData] = useState([]);

  React.useEffect(() => {
    pendingData.length = 0;
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
    }).then(function (response) {
        console.log(response.data.bookings);

        response.data.bookings.map((data,index) => {
          axios({
            method: 'post',
            url: window.$link + 'bookings/getDetails/' + data.id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            var filterPackage = [].concat.apply([], Object.entries(booking.data.data.booking_package_details)).filter((value) => value != null && isNaN(value) == true);
            
            var labServices = booking.data.data.booking_details.filter((info) => info.type == "lab"); 
            var packageServices = filterPackage[0];
            var mergedServices = [];

            mergedServices = labServices.concat(packageServices);
            mergedServices.filter((info) => typeof info !== 'undefined').map((info, index) => {
              var servicesInfo = {};

              servicesInfo.booking_id = info.id;
              servicesInfo.barcode = info.barcode;
              servicesInfo.test = info.lab_test;
              servicesInfo.status = info.status; 

              setPendingData(oldArray => [...oldArray, servicesInfo]);
            });    
        }).then(function (error) {
          console.log(error);
        });
      });
    }).then(function (error) {
        console.log(error);
    })
  },[]);

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="MEDICAL TECHNOLOGY" />
          <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={pendingData} />
          <Table
            type={'med-tech'}
            clickable={true}
            tableData={pendingData}
            rowsPerPage={10}
            headingColumns={['BOOKING ID', 'BARCODE NO.', 'TEST', 'STATUS', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
          />
        </Fragment>
      </div>
    </div>
  );
}

export default MedTech;
