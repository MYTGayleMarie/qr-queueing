import React, {Fragment, useState} from 'react';
import { useForm } from "react-hooks-helper";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { Button, Modal } from 'react-bootstrap';

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
var unit = "";

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
        itemUnit: 'unit',
        beginningBalance: '1000',
        remarks: ' ',
        action: ' ',
    },
];


function Items() {

    document.body.style = 'background: white;';
    const [filteredData, setFilter] = useForm(filterData);
    const [items, setItems] = useState([]);
    const [inventoryItem, setInventoryItem] = useState("");
    const [inventoryQty, setInventoryQty] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //Inventory Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                item.id = data.item_id;
                item.item_name = data.item_name;
                item.item_description = data.description;
                item.unit=data.default_unit;
                item.beginning_balance = data.beginning_inventory;
                item.current_balance = parseFloat(data.qty).toFixed(2);
                item.remarks = data.remarks;

                setItems(oldArray => [...oldArray, item]);
            });
            
        }).catch(function (error) {
            console.log(error);
        });
    },[]);

    console.log(id);
    function update(itemId,itemUnit) {
        id = itemId;
        unit = itemUnit;
        setRedirect(true);
    }

    function addInventory() {

    }

    if(redirect == true) {
        var link =  "/update-supply-item/" + id  +'/'+ unit;
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
                title='ITEM MANAGER' 
                buttons={buttons} 
                addInventory={handleShow}
            />
            {console.log(update)}
            <Table
                type={'items'}
                clickable={true}
                tableData={items.sort((a,b) => (a.item_name > b.item_name) ? 1 : ((b.item_name > a.item_name) ? -1 : 0))}
                rowsPerPage={10}
                headingColumns={['ITEM ID', 'ITEM NAME', 'ITEM DESCRIPTION','UNIT', 'BEGINNING BALANCE', 'CURRENT BALANCE', 'REMARKS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter} 
                link={update}
            />
            </Fragment>

            <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="text-center">
            <Modal.Title className="w-100 cash-count-header">ADD INVENTORY</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <div className="row">
               <div className="col-sm-3">
                    <span className="label">ITEM</span>
               </div>
               <select className="inventury-item-input" name="inventory_item" onChange={(e) => setInventoryItem(e.target.value)}>
                   <option value="" selected disabled>Select Item</option>
                   {
                       items.map((data,index) => {
                            return <option value={data.id}>{data.item_name}</option>
                       })
                   }
               </select>
           </div>
           <div className="row">
               <div className="col-sm-3">
                   <span className="label">QUANTITY</span>
               </div>
               <input type="number" name="quantity" className="inventory-qty-input" onChange={(e) => setInventoryQty(e.target.value)}/>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="save-btn">
              ADD
            </button>
          </Modal.Footer>
        </Modal>
        </div>
        </div>
        </div>
    )
}

export default Items
