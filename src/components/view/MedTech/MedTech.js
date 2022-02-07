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
        console.log(response);
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
            type={'no-action'}
            tableData={pendingData}
            headingColumns={['BOOKING ID', 'BARCODE NO.', 'TEST', 'STATUS']}
            filteredData={filteredData}
            setFilter={setFilter}
          />
        </Fragment>
      </div>
    </div>
  );
}

export default MedTech;
