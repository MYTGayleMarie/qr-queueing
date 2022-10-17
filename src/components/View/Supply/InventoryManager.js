import React, {Fragment, useState} from 'react';
import { useForm } from "react-hooks-helper";
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import { useEffect } from 'react';

//variables
const userToken = getToken();
const userId = getUser();
var id = "";
const buttons = ['add-inventory'];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];


function InventoryManager() {

    document.body.style = 'background: white;';
    const {dateFrom, dateTo, status} = useParams();
    const [filteredData, setFilter] = useForm({
        from_date: dateFrom ? dateFrom : formattedPresentData,
        to_date: dateTo ? dateTo : formattedPresentData,
        status: status ? status : 'for approval',
    });
    const [inventoryData, setInventoryData] = useState([]);
    const [redirectAdd, setRedirectAdd] = useState(false);

    function AddInventory() {
    setRedirectAdd(true);
    }

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
        var link =  "/review-inventory/" + id + "/" + filteredData.from_date + "/" + filteredData.to_date + "/" + filteredData.status;
        return (
            <Navigate to ={link}/>
        )
    }

    if(redirectAdd) {
        return (
            <Navigate to = "/add-inventory"/>
        )
    }
        
    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='INVENTORY'/>
            <Header 
                type='thick'
                title='INVENTORY MANAGER' 
                buttons={buttons} 
                addInventory={AddInventory}
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
