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
  done: false,
};

function ReportServicesPackages() {

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
            url: window.$link + 'bookingdetails/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
            },
          }).then(function (details) {
                var output = [];
                 var array = details.data.booking_details;
                 setTotalCount(array.length);
                    array.forEach(function(item, index) {
                        var existing = output.filter(function(v, i) {
                            var vDate = v.booking_date.split(" ");
                            var iDate = item.booking_date.split(" ");
                            if(v.type == "package") {
                                return v.package == item.package && vDate[0] == iDate[0];
                            } else {
                                return v.lab_test == item.lab_test && vDate[0] == iDate[0];
                            }
                        });
        
                        if (existing.length) {
                            var existingIndex = output.indexOf(existing[0]);
                            output[existingIndex].booking_id = output[existingIndex].booking_id.concat("\n" + item.booking_id);
                        } else {
                        if (typeof item.booking_id == 'string')
                            item.booking_id = [item.booking_id];
                        output.push(item);
                        }
                    });

                    output.map((data,index) => {
                        var info = {};
        
                        if(data.type == "package") {
                            info.service_name = data.package;
                        } else {
                            info.service_name = data.lab_test;
                        }
                        
                        info.quantity = data.booking_id.toString().split("\n").length;
                        setServicesPackages(oldArray => [...oldArray, info]);

                        if(output.length - 1 == index) {
                          setPrintReadyFinal(true);
                        }
                    })
        
          }).then(function (error) {
            // console.log(error);
          });
    },[filteredData]);
    

  function filter() {}


  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        {/* <PdfTransaction/> */}

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
            type={'no-action'}
            tableData={servicesPackages}
            rowsPerPage={10}
            headingColumns={['SERVICE NAME', 'QUANTITY']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            render={setRender}
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
