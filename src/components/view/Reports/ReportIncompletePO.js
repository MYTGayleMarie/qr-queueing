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
            // tableData={patientData}
            tableHeaders={['PO NUMBER', 'PO DATE', 'SUPPLIER', 'TOTAL AMOUNT', 'ACTION']}
            // status={printReadyFinal}
             />
        </Fragment>
      </div>
    </div>
  )
}