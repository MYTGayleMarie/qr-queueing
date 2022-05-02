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
import { Navigate } from 'react-router-dom';

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

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [sales, setSales] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [redirect, setRedirection] = useState(false);
  const [total, setTotal] = useState(0);

  
     //SALES REPORT
    //  React.useEffect(() => {
    //    sales.length = 0;
    //     axios({
    //         method: 'post',
    //         url: window.$link + 'reports/sales',
    //         withCredentials: false,
    //         params: {
    //           api_key: window.$api_key,
    //           token: userToken.replace(/['"]+/g, ''),
    //           date_from: filteredData.from_date,
    //           date_to: filteredData.to_date,
    //           requester: userId,
    //         },
    //       }).then(function (response) {
    //           console.log(response.data.data.sales)
    //           var totalAmount = 0;
    //           response.data.data.sales.map((data,index) => {
    //             var info = {};
    //             var date = new Date(data.payment_date);
    //             var formattedDate = date.toDateString().split(" ");
    //             var selectedDate = new Date(filteredData.from_date);
    //             var formattedSelectedDate = selectedDate.toDateString().split(" ");
    //             info.method = data.type.toUpperCase();
    //             info.amount = data.grand_total == null ? "P 0.00" : "P " + data.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //             totalAmount += data.grand_total == null ? parseFloat("0.00") : parseFloat(data.grand_total);
    //             info.date = data.payment_date == null ? formattedSelectedDate[1] + " " + formattedSelectedDate[2] + " " + formattedSelectedDate[3]: formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
                
    //             setSales(oldArray => [...oldArray, info]);

    //             if(response.data.data.sales.length - 1 == index) {
    //               setTotal(totalAmount);
    //               setPrintReadyFinal(true);
    //             }
    //           });
          
    //       }).then(function (error) {
    //         console.log(error);
    //       });
    // },[render]);

    React.useEffect(()=>{
      sales.length=0;
      axios({
        method: 'post',
        url: window.$link + 'reports/salesSummary',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          date_from: filteredData.from_date,
          date_to: filteredData.to_date,
          requester: userId,
        }
      })
      .then((response)=>{
        console.log(response)
        var totalAmount = 0;
        
        const salesArray = response.data.data.sales
        console.log(salesArray)
        salesArray.map((data,index)=>{
          var info = {}
          var date = new Date(data[0].payment_date);
          var formattedDate = date.toDateString().split(" ");
          var selectedDate = new Date(filteredData.from_date);
          var formattedSelectedDate = selectedDate.toDateString().split(" ");

          //data for the table
          info.method =  data[0].type
          info.account = data[0].accounts
          info.total = data[0].grand_total.toString()
          info.date = data[0].payment_date == null ? formattedSelectedDate[1] + " " + formattedSelectedDate[2] + " " + formattedSelectedDate[3]: formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
          setSales(oldArray=>[...oldArray, info])

          //total amount
          totalAmount += data[0].grand_total == null ? parseFloat("0.00") : parseFloat(data[0].grand_total);
          if(salesArray.length - 1 == index) {
              setTotal(totalAmount);
              setPrintReadyFinal(true);
            }
          })

      })
      .catch((error)=>{console.log(error)})
    
    
    
    },[render])



  function filter() {}

  function toTransaction() {
    // setRedirection(true);
  }

  if(redirect == true) {
    return <Navigate to={"/reports-transaction"} />;
  }

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
            // tableHeaders={['METHOD', 'TOTAL', 'DATE']}
            tableHeaders={['METHOD', 'ACCOUNT', 'AMOUNT', 'TOTAL', 'DATE']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            title="QR DIAGNOSTICS REPORT" 
            type={'sales'}
            tableData={sales}
            rowsPerPage={100}
            // headingColumns={['METHOD', 'TOTAL', 'DATE']}
            headingColumns={['METHOD', 'ACCOUNT', 'AMOUNT', 'TOTAL', 'DATE']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            link={toTransaction}
            totalCount={"P "+ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            givenClass={"register-mobile"}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportSales;
