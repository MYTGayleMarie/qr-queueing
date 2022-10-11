import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
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
    done: false,
  };

function ReportCredits() {
  
  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [credits, setCredits] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);

  //redirect
  const [redirect, setRedirect] = useState(false);

      //ALL CREDITS
      React.useEffect(() => {
          credits.length = 0;
        axios({
            method: 'post',
            url: window.$link + 'reports/credit',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              response.data.data.data.map((data, index) => {
                var info = {};
                info.company_discount = data.discount_code;
                info.total_count = data.total_count;
                setCredits(oldArray => [...oldArray, info]);

                if(response.data.data.data.length - 1 == index) {
                  setPrintReadyFinal(true);
                }
              })

          }).then(function (error) {
            console.log(error);
          });
    },[render]);

    function approve(poId) {
        id = poId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/reports-credit-details/" + id;
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

        <Searchbar title='COMPANY DISCOUNT CREDITS'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Credit Report'}
            tableData={credits}
            tableHeaders={['COMPANY DISCOUNT', 'AVAIL']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'credits'}
            tableData={credits}
            rowsPerPage={100}
            headingColumns={['COMPANY DISCOUNT', 'AVAIL', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={approve}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportCredits;
