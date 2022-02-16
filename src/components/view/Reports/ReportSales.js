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

function ReportSales() {

  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [sales, setSales] = useState([]);
  
     //SALES REPORT
     React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'reports/sales',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: formattedPresentData,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data.data.sales)
              var total = 0; 
              var info = {};
              info.date = new Date(formattedPresentData).toDateString();

              info.total_cash = "P 0.00";
              info.total_card = "P 0.00";
              info.total_check = "P 0.00";
              info.total_others = "P 0.00";

              response.data.data.sales.map((data,index) => {
            
                if(data.type == "cash") {
                    info.total_cash = "P " + data.grand_total;
                }
                if(data.type == "card") {
                    info.total_card = "P " + data.grand_total;
                }
                if(data.type == "check") {
                    info.total_check = "P " + data.grand_total;
                }
                if(data.type == "others") {
                    info.total_others = "P " + data.grand_total;
                }

                total += parseFloat(data.grand_total);
                info.grand_total = "P" + total;

              });

              setSales([info]);
          
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

        <Searchbar title='SALES'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Home Service Report'}
            tableData={sales}
            tableHeaders={['SALES DATE', 'TOTAL CASH', 'TOTAL CARD', 'TOTAL CHECK', 'TOTAL OTHERS','GRAND TOTAL']}
             />
          <Table
            clickable={false}
            type={'services-packages'}
            tableData={sales}
            rowsPerPage={100}
            headingColumns={['SALES DATE', 'TOTAL CASH', 'TOTAL CARD', 'TOTAL CHECK', 'TOTAL OTHERS','GRAND TOTAL']}
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

export default ReportSales;
