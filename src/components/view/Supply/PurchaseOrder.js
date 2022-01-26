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
const buttons = ['add-purchase'];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
};

function PurchaseOrder() {

    const [filteredData, setFilter] = useForm(filterData);
    const [poData, setPoData] = useState([]);

    React.useEffect(() => {
        poData.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'pos/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            console.log(response.data.pos);

            response.data.pos.map((data,index) => {
                var date = new Date(data.purchase_date)
                var posData = {};
                posData.id = data.id;
                posData.supplier = "";
                posData.date = date.toDateString();
      
                posData.total = data.grand_total;

                setPoData(oldArray => [...oldArray, posData]);
            });
            
        }).catch(function (error) {
            console.log(error);
        });
    },[filteredData]);

    console.log(poData)
        
    
    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='PURCHASE ORDER'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
            />
            <Table
                type={'no-action'}
                tableData={poData}
                rowsPerPage={4}
                headingColumns={['DATE', 'SUPPLIER', 'PO NO.', 'TOTAL']}
                filteredData={filteredData}
                setFilter={setFilter}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default PurchaseOrder
