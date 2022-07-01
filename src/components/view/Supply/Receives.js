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
var po_id = "";
const buttons = ['add-purchase'];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  status: 'UNPAID',
};

function Receives() {

    document.body.style = 'background: white;';
    const [filteredData, setFilter] = useForm(filterData);
    const [poData, setPoData] = useState([]);

    //redirect
    const [redirect, setRedirect] = useState(false);

    React.useEffect(() => {
        poData.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'po_receives/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        }).then(function (receives) {
            console.log(receives);
            var receivesData = receives.data.receives;
            if(filteredData.status === "UNPAID") {
                var receivesData =  receives.data.receives.filter((data) => data.paid_amount<data.grand_total);
            }
            else if (filteredData.status === "PAID") {
                var receivesData =   receives.data.receives.filter((data) => data.paid_amount>=data.grand_total);
            }
            receivesData.map((data) => {
                axios({
                    method: 'post',
                    url: window.$link + 'pos/show/' + data.po_id,
                    withCredentials: false,
                    params: {
                      api_key: window.$api_key,
                      token: userToken.replace(/['"]+/g, ''),
                      requester: userId,
                      date_from: filteredData.from_date,
                      date_to: filteredData.to_date,
                    },
                  }).then(function (po) {
                      console.log(po);

                      axios({
                        method: 'post',
                        url: window.$link + 'users/show/' + data.added_by,
                        withCredentials: false,
                        params: {
                          api_key: window.$api_key,
                          token: userToken.replace(/['"]+/g, ''),
                          requester: userId,
                        },
                      }).then(function (user) {
                          var date = new Date(data.receive_date);
                          var formattedDate = date.toDateString().split(" ");

                          var info = {};
                          info.id = data.id;
                          info.po_no = data.po_id;
                          info.date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
                          info.amount = data.grand_total;
                          info.paid_amount = data.paid_amount;
                          info.balance = data.balance;
                          info.payment_status = data.paid_amount>=data.grand_total?"PAID":"UNPAID"
                          info.status = po.data.status;

                          setPoData(oldArray => [...oldArray, info]);

                      })
                      
                  })
            })
            
        }).catch(function (error) {
            console.log(error);
        });
    },[filteredData]);

    function view(receiveId, poId) {
        id = receiveId;
        po_id = poId;
        setRedirect(true);
    }

    if(redirect == true) {
        var link =  "/receives-print/" + id + "/" + po_id;
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
            <Searchbar title='DELIVERIES'/>
            <Header 
                type='thick'
                title='DELIVERIES MANAGER'
                buttons={['receive-items-manager']} 
            />
            <Table
                type={'receives'}
                clickable={true}
                tableData={poData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
                rowsPerPage={4}
                headingColumns={['RECEIVE ID','PO NO.', 'DATE', 'AMOUNT', 'PAID AMOUNT','BALANCE', 'PAYMENT STATUS', 'PO STATUS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter}
                link={view}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Receives
