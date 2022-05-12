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

export default function ReportIncompletePO(){

  const [filteredData, setFilter] = useForm(filterData);
  const [incompletePo, setIncompletePo] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [render, setRender] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [posTempData, setPoTempData] = useState([]);


  // table data


  React.useEffect(()=>{
    incompletePo.length=0;
    // Getting all incomplete POs
    axios({
      method: 'post',
      url: window.$link + 'reports/incompletePOs',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      }
    })
    .then((pos)=>{
      // console.log(pos)
      const incomplete = pos.data.pos;  
      setPoTempData(incomplete) 
      // Getting poItems in each pos
      incomplete.map(async(pos, index)=>{
        await axios({
          method: 'post',
          url: window.$link + 'pos/getPoItems/' + pos.id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          }
          })
          .then((poItems)=>{
            // console.log(poItems)
             poItems.data.map((itemDetails, index1)=>{
                const bal = itemDetails.qty-itemDetails.received
 
  

              //  if there is balance, we include it in table
               if(bal>0){
                //  console.log(itemDetails)
                axios({
                  method: 'post',
                  url: window.$link + 'suppliers/show/' + pos.supplier_id,
                  withCredentials: false,
                  params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    date_from: filteredData.from_date,
                    date_to: filteredData.to_date,
                    requester: userId,
                  }
                  })
                  .then((supplier)=>{
                    var info = {};
                    info.po_number = pos.id;
                    var date = new Date(pos.added_on);
                    var formattedDate = date.toDateString().split(" ");
                    info.po_date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
                    info.supplier = supplier.data.name;
                    info.total_amount = pos.grand_total;
                    setIncompletePo(oldArray=>[...oldArray, info])
                  })

               }
             })
            // Set status for printing
            if(incomplete.length - 1 == index) {
              setPrintReadyFinal(true);
            }
          })
          .catch((error)=>{
            console.log(error)
          })
      })   


    })
    .catch((error)=>{console.log(error)})
  },[render])



  function review(poId){
    id=poId;
    setRedirect(true);
  }

  if(redirect == true) {
    var link =  "/reports-incomplete-po/review/" + id;
    return (
        <Navigate to ={link}/>
    )
  }
  function filter() {}

  return(
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title='INCOMPLETE PURCHASE ORDER'/>
         <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Incomplete PO Report'}
            tableData={incompletePo}
            tableHeaders={['PO NUMBER', 'PO DATE', 'SUPPLIER', 'TOTAL AMOUNT', 'ACTION']}
            status={printReadyFinal}
             />
        <Table 
          type={'report-incomplete-po'}
          tableData={incompletePo}
          rowsPerPage={100}
          headingColumns={['PO NUMBER', 'PO DATE', 'SUPPLIER', 'TOTAL AMOUNT', 'ACTION']}
          filteredData={filteredData}
          setFilter={setFilter}
          filter={filter}
          setRender={setRender}
          givenClass={"register-mobile"}
          link={review}

        />
        </Fragment>
      </div>
    </div>
  )
}