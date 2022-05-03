import React, {Fragment, useState} from 'react';
import { useForm } from "react-hooks-helper";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';



//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();
var id = '';
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

function ReceiveItemsManager(){
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [redirect, setRedirect]=useState(false);
  const[supplierId, setSupplierId] = useState();
  React.useEffect(() => {
    axios({
        method: 'post',
        url: window.$link + 'suppliers/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        // console.log(response); 
        setSuppliers(response.data.suppliers)    
    }).catch(function(error) {
        console.log(error);
    });  
  }, []);

  React.useEffect(()=>{
    purchaseOrders.length = 0;
    axios({
      method: 'post',
      url: window.$link + 'pos/getAll',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: "1970-01-01",
        date_to: formattedPresentData,
      }
    }).then(function (response) {
        console.log(response)
        var pos =  response.data.pos;
        pos =  response.data.pos.filter((info) => info.supplier_id == supplierId && info.status === "approved");
        pos.map((data, index)=>{
              var date = new Date(data.purchase_date);
              var posData = {};
              posData.id = data.id;
              posData.date = date.toDateString();        
              posData.total = data.grand_total;
              posData.payment = data.paid_amount == data.grand_total ? "paid" : "unpaid";
              setPurchaseOrders(oldArray=>[...oldArray, posData]);  
        })

    }).catch(function(error) {
      console.log(error);
    });
  },[supplierId]);
  
  function handleSupplier(e){
    setSupplierId(e.target.value)
  }  


  function PoDetails(poId) {
        id = poId;
        setRedirect(true);
    }
  if(redirect == true) {
        var link =  "/receive-purchase-order/" + id;
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
            />
            </Fragment>
            {/* {supplierDropdown} */}
            <Table 
              type={"receive-items-manager"}
              tableData={purchaseOrders}
              rowsPerPage={4}
              headingColumns={['PO NO.', 'PURCHASE DATE', 'TOTAL', 'PAYMENT', 'ACTION']}
              selectSupplier={handleSupplier}
              dropdownData={suppliers}
              clickable={true}
              link={PoDetails}
            />

          
            



            


      </div>      
    </div>
    </div>

  ) 
}

export default ReceiveItemsManager;