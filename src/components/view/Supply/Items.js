import React, {Fragment, useState} from 'react';
import { useForm } from "react-hooks-helper";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';

//css
import './Items.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();
var id = "";

const buttons = ['add-supply-items'];

const filterData = {
    from_date: "",
    to_date: "",
};

const itemsData = [
    {
        itemID: '1',
        itemName: 'Hotplate Stirrer',
        itemDescription: 'none',
        beginningBalance: '1000',
        remarks: ' ',
        action: ' ',
    },
];


function Items() {

    const [filteredData, setFilter] = useForm(filterData);
    const [items, setItems] = useState([]);

    //redirect
    const [redirect, setRedirect] = useState(false);

    React.useEffect(() => {
        items.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'items/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          },
        }).then(function (response) {
            console.log(response.data.items);
            response.data.items.map((data,index) => {
                var item = {};
                item.id = data.id;
                item.item_name = data.name;
                item.item_description = data.description;
                item.beginning_balance = data.beg_balance;
                item.remarks = data.remarks;

                setItems(oldArray => [...oldArray, item]);
            });
            
        }).catch(function (error) {
            console.log(error);
        });
    },[]);


    function update(itemId) {
        id = itemId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/update-supply-item/" + id;
        console.log(link);
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
            <Searchbar title='ITEMS'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
                tableData={itemsData}
            />
            <Table
                type={'items'}
                clickable={true}
                tableData={items}
                rowsPerPage={4}
                headingColumns={['ITEM ID', 'ITEM NAME', 'ITEM DESCRIPTION', 'BEGINNING BALANCE', 'REMARKS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter} 
                link={update}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Items
