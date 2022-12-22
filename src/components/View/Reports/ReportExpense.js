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
import { ifError } from 'assert';

const buttons = ['export-excel', 'export-pdf', 'export-breakdown'];
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

function ReportExpense() {
  
  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [pendingPOs, setPendingPOs] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [report, setReport] = useState([]);
  const [breakdown, setBreakdown] = useState([])
  const [isReady, setIsReady] = useState(false)

  //redirect
  const [redirect, setRedirect] = useState(false);

      //ALL PENDING POS
      React.useEffect(() => {
          pendingPOs.length = 0;
        axios({
            method: 'get',
            url: window.$link + 'reports/expense',
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
              if(response?.data?.data?.records) {
                  response?.data?.data?.records?.map((data, index1) => { 
                        var info = {};
                        info.total_qty = data.total_qty
                        info.item_id = data.item_id;
                        info.item = data.item;
                        info.unit = data.unit;
                        setReport(oldArray=>[...oldArray, info]);

                        if(response?.data?.data?.records.length - 2 == index1) {
                            setPrintReadyFinal(true);
                        }
                })
              } else {
                setReport([])
              }
                  

          }).catch(function (err) {
            setReport([])
          })
          
    },[render]);

    function generateInventory(){
    axios({
      method: 'post',
      url: window.$link + 'reports/monthlyExpense',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        year:new Date().getFullYear()
      },
    })
    .then((res)=>{
      console.log(res)
      var monthly_inventory = res.data.data.inventory_expense_per_month.sort((a, b) => a.item.localeCompare(b.item))
      console.log(res.data.data.inventory_per_month)
      var monthly_inventory_price = res.data.data.inventory_expense_price_per_month.sort((a, b) => a.item.localeCompare(b.item))

      var monthly_inventory_adj = monthly_inventory.map((data)=>{ return {
        name: data.name, 
        unit: data.unit,
        price: parseFloat(data.price).toFixed(2),
        Jan: parseInt(data.Jan),
        Feb: parseInt(data.Feb),
        Mar: parseInt(data.Mar),
        Apr: parseInt(data.Apr),
        May: parseInt(data.May),
        Jun: parseInt(data.Jun),
        Jul: parseInt(data.Jul),
        Aug: parseInt(data.Aug),
        Sept: parseInt(data.Sept),
        Oct: parseInt(data.Oct),
        Nov: parseInt(data.Nov),
        Dec: parseInt(data.Dec)
      }})
      var monthly_inventory_price_adj = monthly_inventory_price.map((data)=>{ return {
        name: data.name, 
        unit: data.unit,
        price: parseFloat(data.price).toFixed(2),
        Jan: parseFloat(data.Jan).toFixed(2),
        Feb: parseFloat(data.Feb).toFixed(2),
        Mar: parseFloat(data.Mar).toFixed(2),
        Apr: parseFloat(data.Apr).toFixed(2),
        May: parseFloat(data.May).toFixed(2),
        Jun: parseFloat(data.Jun).toFixed(2),
        Jul: parseFloat(data.Jul).toFixed(2),
        Aug: parseFloat(data.Aug).toFixed(2),
        Sept: parseFloat(data.Sept).toFixed(2),
        Oct: parseFloat(data.Oct).toFixed(2),
        Nov: parseFloat(data.Nov).toFixed(2),
        Dec: parseFloat(data.Dec).toFixed(2)
      }})

      const XLSX = require('sheetjs-style');
      const worksheet = XLSX.utils.json_to_sheet([{},...monthly_inventory_adj])
      const worksheet2 = XLSX.utils.json_to_sheet([{},...monthly_inventory_price_adj])
      
      XLSX.utils.sheet_add_aoa(worksheet, 
        [["QR DIAGNOSTICS","", "", 
        "", "", "", "", "", "",
        "", "", "", "", "", ""]], { origin: "A1" });
      XLSX.utils.sheet_add_aoa(worksheet, 
        [["Name", "Unit", "Price", 
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]], { origin: "A2" });
      
      XLSX.utils.sheet_add_aoa(worksheet2, 
        [["QR DIAGNOSTICS","", "", 
        "", "", "", "", "", "",
        "", "", "", "", "", ""]], { origin: "A1" });
      XLSX.utils.sheet_add_aoa(worksheet2, 
        [["Name", "Unit", "Price", 
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]], { origin: "A2" });

      const cells = ['A1','A2','B2','C2','D2','E2','F2','G2','H2','I2','J2','K2','L2','M2','N2','O2']
     
      const workbook = XLSX.utils.book_new();
      for(var i = 0; i<cells.length;i++){
       if(cells[i] === 'A1'){
        worksheet[cells[i]].s = {
          font: {
            sz:24,
            shadow:true,
            bold: true,
            color: {
              rgb: "BFBC4B"
            }
          },
        };
        worksheet2[cells[i]].s = {
          font: {
            sz:24,
            shadow:true,
            bold: true,
            color: {
              rgb: "BFBC4B"
            }
          },
        };
       }
       else{
        worksheet[cells[i]].s = {
          font: {
            bold: true,
            color: {
              rgb: "419EA3"
            }
          },
        };
        worksheet2[cells[i]].s = {
          font: {
            bold: true,
            color: {
              rgb: "419EA3"
            }
          },
        };
       }
      }

      var wscols = [
        { width: 50 },  // first column
      ];
      worksheet["!cols"] = wscols;
      worksheet2["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Item Inventory");
      XLSX.utils.book_append_sheet(workbook, worksheet2, "Expense Item Cost Inventory");
      XLSX.writeFile(workbook, "QRDiagnosticsMonthlyExpenseItemInventoryReport-"+new Date().toLocaleDateString()+".xlsx");

      // 
    })
    .catch((err)=>{console.log(err)})
  }

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

        <Searchbar title='EXPENSE REPORT'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'Expense Report'}
            tableData={report}
            breakdown={generateInventory}
            tableHeadersKey = {[
              {label: "NAME", key: "item"},
              {label: "UNIT", key: "unit"},
              {label: "PRICE", key: "price"},
              {label: "JAN", key: "Jan"},
              {label: "FEB", key: "Feb"},
              {label: "MAR", key: "Mar"},
              {label: "APR", key: "Apr"},
              {label: "MAY", key: "May"},
              {label: "JUN", key: "Jun"},
              {label: "JUL", key: "Jul"},
              {label: "AUG", key: "Aug"},
              {label: "SEP", key: "Sep"},
              {label: "OCT", key: "Oct"},
              {label: "NOV", key: "Nov"},
              {label: "DEC", key: "Dec"},
            ]}
            tableHeaders={['TOTAL QTY', 'ITEM ID', 'ITEM', 'UNIT']}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'report-expense'}
            tableData={report}
            rowsPerPage={100}
            headingColumns={['TOTAL QTY', 'ITEM ID', 'NAME', 'UNIT']}
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

export default ReportExpense;
