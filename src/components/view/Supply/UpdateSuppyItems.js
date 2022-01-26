import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
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

function UpdateSupplyItems() {
    const {id} = useParams();

    //current info
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [balance, setBalance] = useState("");
    const [remarks, setRemarks] = useState("");
    const [description, setDescription] = useState("");


    //get info
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'items/show/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token:  userToken.replace(/['"]+/g, ''),
              requester: userId,
            }
        }).then(function (response) {
            console.log(response.data);
            setName(response.data.name);
            setCost(response.data.cost);
            setBalance(response.data.beg_balance);
            setRemarks(response.data.remarks);
            setDescription(response.data.description);
        }).catch(function (error) {
            console.log(error)
        })
    },[]);

    //style
    document.body.style = 'background: white;';

    //redirection
    const [redirect, setRedirect] = useState(false); 

    //API submit call
    function submit(e) {
        e.preventDefault();

    axios({
        method: 'post',
        url: window.$link + 'items/update/' + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          name: name,
          description: description,
          cost: cost,
          beg_balance: balance,
          remarks: remarks,
          added_by: userId,
        }
    }).then(function (response) {
        console.log(response)
        toast.success("Succussfully updated item!")
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
                            <input type="text" name="item_name" className="item-name-input" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <span className="item-name-label">COST</span>
                        </div>
                        <div className="col-sm-3">
                            <input type="number" name="item_cost" className="beginning-balance-input" value={cost} onChange={(e) => setCost(e.target.value)}/>
                        </div>
                        <div className="col-sm-3">
                            <span className="beginning-balance-label">BEGINNING BALANCE </span>
                        </div>
                        <div className="col-sm-4">
                            <input type="number" name="item_balance" className="beginning-balance-input" value={balance} onChange={(e) => setBalance(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="remarks-label">REMARKS</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="remarks" name="remarks" class="remarks-items-input" rows="10" cols="50" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <span className="description-label">ITEM DESCRIPTION</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="description" name="description" class="description-input" rows="10" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                           <button class="add-item-btn" onClick={(e) => submit(e)}>ADD ITEMS</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default UpdateSupplyItems
