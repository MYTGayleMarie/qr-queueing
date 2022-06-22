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
function groupArrayOfObjects(list, key) {
  return list.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function ReportSales() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesTemp, setSalesTemp] = useState([]);
  const [credits, setCredits] = useState([]);
  const [salesData, setSalesData] = useState([]);
  
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [redirect, setRedirection] = useState(false);
  const [total, setTotal] = useState(0);

  const [accountDetails, setAccountDetails] = useState([]);
  const [byDate, setByDate] = useState([]);
  const [byMethod, setByMethod] = useState([]);

    React.useEffect(()=>{
      sales.length=0; 
      salesTemp.length=0
      credits.length=0
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
        // console.log(response)
        // axios({
        //   method: 'post',
        //   url: window.$link + 'reports/salesSummaryWithCompanyDiscount',
        //   withCredentials: false,
        //   params: {
        //     api_key: window.$api_key,
        //     token: userToken.replace(/['"]+/g, ''),
        //     date_from: filteredData.from_date,
        //     date_to: filteredData.to_date,
        //     requester: userId,
        //   }
        // })
        // .then( (credit_response)=>{
        //   console.log(credit_response)
        //   const salesArray = credit_response.data.data.sales
          // salesArray.map((arr, index1)=>{
          //   arr.map((method, index2)=>{
          //     if(method.accounts!=null){
          //       var info = {};
          //       var date = new Date(method.booking_date);
          //       var formattedDate = date.toDateString().split(" ");
          //      info.date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
          //       info.method = "credit"
          //       info.amount = method.grand_total
          //       setCredits(oldArray=>[...oldArray, info]) 
          //     }
          //   })
          // })
        // credits.map((credit, index) => {
        //   var info = {};
        //   info.date = credit.date
        //   info.method = "credit"
        //   info.amount = credit.creditAmount
        //   setSales(oldArray=>[...oldArray, info])
        // })
        const sales_Array = response.data.data.sales
        sales_Array.map((arr, index1)=>{
          arr.map((method, index2)=>{
            if(method.accounts!=null){
              var date = new Date(method.payment_date);
              var formattedDate = date.toDateString().split(" ");
              const temp_date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
                method.accounts.map((account, index3)=>{
                  var info = {};
                  info.date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]
                  info.method = method.type
                  info.account = account.name 
                  info.amount = account.amount
                  setSales(oldArray=>[...oldArray, info])
                  // setSalesTemp(oldArray=>[...oldArray, info])
                })   
              }
            })
            if(arr.length - 1 == index1) {
              setPrintReadyFinal(true);
            }
          })
      // })
      .catch((error)=>{console.log(error)})
      })
    
    },[render])

 
    // React.useEffect(()=>{
    //   sales.length=0
    //   let tempData=credits.concat(salesTemp)
    //   setSales(tempData)
    // },[credits, salesTemp])


    React.useEffect(()=>{
      
      byMethod.length=0;
      const res = Array.from(salesTemp.reduce(
          (m, {date, amount}) => m.set(date, (m.get(date) || 0) + parseFloat(amount)), new Map),
          ([date, amount]) => ({date, amount}))

      setSalesData(res)
    },[sales])

    React.useEffect(()=>{
      let tempData = salesData.concat(sales)
      // console.log(tempData)
      setByDate(Object.values(groupArrayOfObjects(tempData,"date")));
      setTotal(0);
      var tempTotal = 0.00;
      salesData.map((details, index)=>{
        console.log(details)
        tempTotal+=parseFloat(details.amount)
        setTotal(tempTotal)       
      })

    },[salesData])
  //  console.log(byDate)

  //  const [withCredit, setWithCredit] = useState([])
  //  const [creditMethod, setCreditMethod] = useState([])

  
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
            tableName={'Sales Report'}
            tableData={byDate}
            typeData={'sales'}
            total={"P "+ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            tableHeaders={['DATE', 'METHOD', 'ACCOUNT', 'AMOUNT', 'TOTAL']}
            status={printReadyFinal}
            totalExcel={total}
             />
          <Table
            clickable={true}
            title="QR DIAGNOSTICS REPORT" 
            type={'sales'}
            tableData={byDate}
            rowsPerPage={100}
            headingColumns={['DATE', 'METHOD,  ACCOUNT,  AMOUNT', 'TOTAL']}
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