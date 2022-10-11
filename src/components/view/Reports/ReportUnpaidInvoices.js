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
  from_date: "2022-01-06",
  to_date: formattedPresentData,
  done: false,
};

function ReportUnpaidInvoices() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  
     //SALES REPORT
     React.useEffect(() => {
       unpaidInvoices.length = 0;
       axios({
        method: 'post',
        url: window.$link + 'Company_invoices/getAll',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          date_from: filteredData.from_date,
          date_to: filteredData.to_date,
          requester: userId,
        },
      }).then(function (response) {
          var pending = response.data.company_invoices.filter((info) => info.is_paid == "0");
          pending.map((data,index) => {
            axios({
                method: 'post',
                url: window.$link + 'companies/show/' + data.company_id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  requester: userId,
                },
              }).then(function (company) {
                  var info = {};
                  info.id = data.id;
                  info.company = company.data.name;
                  info.discount_code = data.discount_code;
                  // info.price = "P " + data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  info.total_amount = "P " + data.total.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  info.paid_amount = "P " + data.paid_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  setUnpaidInvoices(oldArray => [...oldArray, info]);

                  if(pending.length - 1 == index) {
                      setPrintReadyFinal(true);
                  }
              });
          });



        
      }).then(function (error) {
        console.log(error);
      });
    },[render]);

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='RECEIVABLES'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Unpaid Invoice Report'}
            tableData={unpaidInvoices}
            tableHeaders={['INVOICE ID', 'COMPANY', 'DISCOUNT CODE', 'TOTAL AMOUNT', 'PAID AMOUNT']}
            status={printReadyFinal}
             />
          <Table
            clickable={false}
            type={'no-action'}
            tableData={unpaidInvoices}
            rowsPerPage={100}
            headingColumns={['INVOICE ID', 'COMPANY', 'DISCOUNT CODE', 'TOTAL AMOUNT', 'PAID AMOUNT']}
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

export default ReportUnpaidInvoices;
