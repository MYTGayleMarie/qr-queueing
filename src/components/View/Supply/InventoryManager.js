import React, {Fragment, useState} from 'react';
import { useForm } from "react-hooks-helper";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();
var id = "";
const buttons = ['add-inventory'];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  status: 'for approval',
};

function InventoryManager() {

    document.body.style = 'background: white;';
    const [filteredData, setFilter] = useForm(filterData);
    const [inventoryData, setInventoryData] = useState([]);

    //redirect
    const [redirect, setRedirect] = useState(false);

    React.useEffect(() => {
        inventoryData.length = 0;
        axios({
          method: 'get',
          url: window.$link + 'inventory_counts/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            var inventory = response.data.inventory_counts
            inventory.map((data,index) => {
                axios({
                    method: 'get',
                    url: window.$link + 'users/show/' + data.added_by,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (response) {
                    var count_date = new Date(data.count_date);
                    var inventory_data = {};

                    inventory_data.id = data.id
                    inventory_data.name = response.data.name
                    inventory_data.status = data.status
                    setInventoryData(oldArray => [...oldArray, inventory_data])
               })
            })            
        }).catch(function (error) {
            console.log(error);
        });
    },[filteredData]);

    function approve(poId) {
        id = poId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/review-purchase-order/" + id;
        return (
            <Navigate to ={link}/>
        )
    }
        
    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='PURCHASE ORDER'/>
            <Header 
                type='thick'
                title='INVENTORY MANAGER' 
                buttons={buttons} 
            />
            <Table
                type={'purchase-order'}
                clickable={true}
                tableData={inventoryData}
                rowsPerPage={4}
                headingColumns={['ID', 'NAME OF REQUESTER', 'STATUS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter}
                link={approve}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default InventoryManager
