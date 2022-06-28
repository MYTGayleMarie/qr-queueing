import React, {useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './AddSupplyItems.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function AddSupplyItems() {

    //style
    document.body.style = 'background: white;';

    //states
    const itemInfo = {
        item_name: "",
        item_lab_test_qty: "",
        item_cost: "",
        item_unit: "",
        item_balance: "",
        remarks: "",
        description: "",
    };

    const [item, setItem] = useForm(itemInfo);

    //redirection
    const [redirect, setRedirect] = useState(false); 
console.log(item)
    //API submit call
    function submit(e, info) {
        e.preventDefault();

    axios({
        method: 'post',
        url: window.$link + 'items/create',
        withCredentials: false,
        params: {
          token: userToken.replace(/['"]+/g, ''),
          api_key: window.$api_key,
          name: info.item_name,
          description: info.description,
          unit: info.item_unit,
          cost: info.item_cost,
          beg_balance: info.item_balance,
          remarks: info.remarks,
          added_by: userId,
        }
    }).then(function (response) {
        console.log(response)
        toast.success("Succussfully added item!")
        setTimeout(function () {
            setRedirect(true);
        }, 2000);
    }).catch(function (error) {
        console.log(error)
        toast.error("Oops...something went wrong")
    });

    }

  //redirect
  if (redirect == true) {
    return <Navigate to="/items" />;
  }


    return (
        <div>
        <Navbar/>
            <div className="active-cont">
            <Header 
                type="thin"
                title="ITEMS"
            />
            <ToastContainer/>
            <h1 className="item-header">ITEMS DETAILS</h1>
            <form>
                <div className="item-details-cont">
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="item-name-label">ITEM NAME</span>
                        </div>
                        <div className="col-sm-10">
                            <input type="text" name="item_name" className="item-name-input" onChange={setItem}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <span className="item-name-label">UNIT</span>
                        </div>
                        <div className="col-sm-1">
                            <input type="text" name="item_unit" className="beginning-balance-input" onChange={setItem}/>
                        </div>
                        <div className="col-sm-2">
                            <span className="item-name-label">LAB TEST QTY</span>
                        </div>
                        <div className="col-sm-1">
                            <input type="number" name="item_lab_test_qty" className="beginning-balance-input" onChange={setItem}/>
                        </div> <div className="col-sm-1">
                            <span className="item-name-label">COST</span>
                        </div>
                        <div className="col-sm-1">
                            <input type="number" name="item_cost" className="beginning-balance-input" onChange={setItem}/>
                        </div>
                        <div className="col-sm-2">
                            <span className="beginning-balance-label">BEGINNING BALANCE </span>
                        </div>
                        <div className="col-sm-1">
                            <input type="number" name="item_balance" className="beginning-balance-input" onChange={setItem}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="remarks-label">REMARKS</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="remarks" name="remarks" class="remarks-items-input" rows="10" cols="50" onChange={setItem}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <span className="description-label">ITEM DESCRIPTION</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="description" name="description" class="description-input" rows="10" cols="50" onChange={setItem}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                           <button class="add-item-btn" onClick={(e) => submit(e, item)}>ADD ITEMS</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddSupplyItems
