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
const buttons = ['add-purchase'];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  status: 'for approval',
};

function PurchaseOrder() {

    document.body.style = 'background: white;';
    const [filteredData, setFilter] = useForm(filterData);
    const [poData, setPoData] = useState([]);

    //redirect
    const [redirect, setRedirect] = useState(false);

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
            var pos =  response.data.pos;
            if(filteredData.status != "") {
                pos =  response.data.pos.filter((info) => info.status == filteredData.status);
            }
            pos.map((data,index) => {

                axios({
                    method: 'post',
                    url: window.$link + 'suppliers/show/' + data.supplier_id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (response) {
                  console.log(response.data);
                  var date = new Date(data.purchase_date);
                  var posData = {};
                  posData.id = data.id;
                  posData.supplier = response.data.name;
                  posData.date = date.toDateString();
        
                  posData.total = "P " + data.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  posData.status = data.status;
                  posData.payment = data.paid_amount == data.grand_total ? "paid" : "unpaid";
  
                  setPoData(oldArray => [...oldArray, posData]);
                }).then(function (error) {
                    console.log(error);
                });
            });
            
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
                title='PURCHASE ORDER MANAGER' 
                buttons={buttons} 
            />
            <Table
                type={'purchase-order'}
                clickable={true}
                tableData={poData}
                rowsPerPage={4}
                headingColumns={['PO NO.', 'SUPPLIER', 'PURCHASE DATE', 'TOTAL','STATUS','PAYMENT', 'ACTION']}
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

export default PurchaseOrder
