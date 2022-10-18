import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';
import { Navigate } from 'react-router-dom';

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
var id = "";
var unit = "";

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

function ReportItemHistory() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState(false);
  const [mds, setMds] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [items, setItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchItem, setSearchItem] = useState(true);
  const [inventoryItem, setInventoryItem] = useState("");
  const [inventoryQty, setInventoryQty] = useState("");

  //redirect
  const [redirect, setRedirect] = useState(false);

   // I use useeffect para no need to call api request everytime naa isearch na items
    React.useEffect(()=>{
      // if wala ray gi search, displayed items will be all the items na na call sa api
      if(searchName===""||searchName===" "){
        setDisplayItems([])
        let tempItems = items
        setDisplayItems(tempItems)
      } 
      // else, search item using regex
      else {
        setDisplayItems([])
        // store items to temporary variable para complete gihapon ang tanan items, but filter out null ang name
        let tempItems = items.filter(info=>info.item_name!==null)
        // console.log(tempItems)
        // Create regex using the searched word, lowercase para dili case sensitive ig search
        let searchWord = new RegExp(searchName.toLowerCase())

        // filter the temporary items to match the regex, replace double spaces if naa with single space, and transform to lowercase

        let filteredItems = tempItems.filter(info=>searchWord.test(info.item_name.toLowerCase()))

        // display filtered Items
        setDisplayItems(filteredItems)
      }

    }, [items, searchName])



    React.useEffect(()=>{
      items.length=0
      axios({
        method: 'post',
        url: window.$link + 'items/getAll',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
        },
      })
      .then((res)=>{
        // console.log(res.data.items.sort((a, b) => a.id - b.id))
        let itemData = res.data.items.filter(info=>info.item_name!==null)
        let dataList = itemData.sort((a, b) => a.id - b.id)
        dataList.map((data, index)=>{
          console.log(data)
          var item = {}
            item.id = data.item_id;
            item.id_item = data.item_id;
            item.item_name = data.item_name;
            item.unit=data.default_unit;
            item.beginning_balance = data.beginning_inventory;
            item.current_balance = parseFloat(data.qty).toFixed(2);
            item.remarks = data.remarks;

            setItems(oldArray => [...oldArray, item]);

            if(dataList.length - 1 === index) {
                setPrintReadyFinal(true)
            }
        })
      })
      .catch((err)=>{console.log(err)})
    },[])


    function view(itemId,itemUnit) {
        id = itemId;
        unit = itemUnit;
        setRedirect(true);
    }

    function addInventory() {

    }

    if(redirect == true) {
        var link =  "/reports-item-history/details/" + id  +'/'+ unit;
        console.log(link);
        return (
            <Navigate to ={link}/>
        )
    }



  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='ITEM HISTORY REPORT'/>
          <Header 
            type="thick" 
            title="QR DIAGNOSTICS REPORT" 
            buttons={buttons} 
            tableName={'ITEMS HISTORY REPORT'}
            tableData={displayItems}
            tableHeaders={['ITEM NAME', 'UNIT', 'BEGINNING BALANCE','CURRENT BALANCE', 'REMARKS']}
            status={printReadyFinal}
            />

            <div class="wrap d-flex justify-content-center">
                    <div class="search-bar">
                        <input type="text" class="searchTerm" name="itemName" placeholder="Search Item" onChange={e=>setSearchName(e.target.value)}/>
                        <button type="submit" class="searchButton" onClick={e=>setSearchItem(prev=>!prev)} >
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
 
            <Table 
              type={'items-history'}
              clickable={true}
              tableData={displayItems}
              headingColumns={['ITEM NAME','UNIT', 'BEGINNING BALANCE', 'CURRENT BALANCE', 'REMARKS', 'ACTION']}
              link={view}
            />
            
            <br />
            <br />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportItemHistory;
