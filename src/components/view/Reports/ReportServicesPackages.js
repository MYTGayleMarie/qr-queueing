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
import { parse } from '@fortawesome/fontawesome-svg-core';

const buttons = ['export-excel', 'export-pdf'];
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  status: 'all',
};


function ReportServicesPackages() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [servicesPackages, setServicesPackages] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  //ALL PACKAGES AND SERVICES
    React.useEffect(() => {
        servicesPackages.length = 0;
        axios({
            method: 'post',
            url: window.$link + 'reports/service_package',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              type: filteredData.status,
            },
          }).then(function (response) {
              var servicesData = response.data.data.data;
              console.log(servicesData);
              var count = 0;
              servicesData.map((data,index) => {
                var info = {};
                if(data.lab_test !== null || data.package !==null){
                  info.service = data.lab_test ? data.lab_test : data.package;
                  info.total_count = data.total_count;
                }
                setServicesPackages(oldArray => [...oldArray, info]);
                setTotalCount(count += parseFloat(info.total_count));

                if(response.data.data.data.length - 1 == index) {
                  setPrintReadyFinal(true);
                }
              })
          });
    },[render]);
    

  function filter() {}


  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
        <Searchbar title='SERVICES ANG PACKAGES'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Services and Packages Report'}
            tableData={servicesPackages}
            tableHeaders={['SERVICE NAME', 'QUANTITY']}
            status={printReadyFinal}
             />
          <Table
            clickable={false}
            type={'services-packages-2'}
            tableData={servicesPackages}
            rowsPerPage={5}
            headingColumns={['SERVICE NAME', 'QUANTITY']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            totalCount={totalCount}
            givenClass={"register-mobile"}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportServicesPackages;
