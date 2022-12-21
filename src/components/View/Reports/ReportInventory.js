import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { formatDate, getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
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
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: "2022-01-06",
    to_date: formattedPresentData,
    status: "for approval",
  };

function ReportInventory() {
  
  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [pendingPOs, setPendingPOs] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [isReady, setIsReady] = useState(false)

  //redirect
  const [redirect, setRedirect] = useState(false);

      //ALL PENDING POS
      React.useEffect(() => {
          pendingPOs.length = 0;
        axios({
            method: 'post',
            url: window.$link + 'inventory_counts/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
            console.log(response)

            if(filteredData.status === "for approval") {
                response.data.inventory_counts.filter((data) => data.status === "pending").map((data, index1) => { 
                    axios({
                        method: 'post',
                        url: window.$link + 'users/show/' + data.added_by,
                        withCredentials: false,
                        params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                        },
                    }).then(function (user) {
                        var info = {};
                        info.date = formatDate(data.count_date);
                        info.id = data.id;
                        info.requester = user.data.name;
                        console.log(info)
                        setInventories(oldArray=>[...oldArray, info]);

                        if(response.data.inventory_counts.length - 2 == index1) {
                            setPrintReadyFinal(true);
                        }
                    })
                })

            } else {
               response.data.inventory_counts.filter((data) => data.status === filteredData.status).map((data, index1) => { 
                    axios({
                        method: 'post',
                        url: window.$link + 'users/show/' + data.added_by,
                        withCredentials: false,
                        params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                        },
                    }).then(function (user) {
                        var info = {};
                        info.date = formatDate(data.count_date);
                        info.id = data.id;
                        info.requester = user.data.name;
                        console.log(info)
                        setInventories(oldArray=>[...oldArray, info]);

                        if(response.data.inventory_counts.length - 2 == index1) {
                            setPrintReadyFinal(true);
                            setIsReady(true)
                        }
                    })
                })
            }
          })
          //sentprintreadyfinal
    },[render]);

    function view(inventoryId) {
        id = inventoryId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/review-inventory/" + id + "/" + filteredData.from_date + "/" + filteredData.to_date + "/" + filteredData.status;
        return (
            <Navigate to ={link}/>
        )
    }

  

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='INVENTORIES REPORT'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Inventories Report'}
            tableData={inventories}
            tableHeaders={['DATE', 'INVENTORY REQUEST ID', 'REQUESTER']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'report-inventory'}
            tableData={inventories}
            rowsPerPage={100}
            headingColumns={['DATE', 'INVENTORY REQUEST ID', 'REQUESTER', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={view}
            useLoader={true}
            isReady={isReady}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportInventory;
