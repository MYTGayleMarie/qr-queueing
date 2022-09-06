import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage, formatDate, getRole} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import './PurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';


//variables
const userToken = getToken();
const userId = getUser();
const role = getRole();

function ReviewAddInventory() {
    document.body.style = 'background: white;';

      //Item details
      const {id} = useParams();
      const [items, setItems] = useState([]);
      const [inventoryDetails, setInventoryDetails] = useState({requester: "", count_date: ""});

      //Disapproved PO Item
      const [disapproveItem, setDisapproveItem] = useState("");
      const [deleteItemReason, setDeleteItemReason] = useState("");
      const [deleteAllReason, setDeleteAllReason] = useState("");
      const [closeRedirect, setCloseRedirect] = useState(false);

     //Disapprove Item Prompt Modal
     const [promptDisapproveItem, setPromptDisapproveItem] = useState(false);
     const handleItemDeleteClose = () => setPromptDisapproveItem(false);
     const handleItemDeleteShow = () => setPromptDisapproveItem(true);

     //Disapprove All Prompt Modal
     const [promptDisapproveAll, setPromptDisapproveAll] = useState(false);
     const handleAllDeleteClose = () => setPromptDisapproveAll(false);
     const handleAllDeleteShow = () => setPromptDisapproveAll(true);

     //Fetch PO details
     React.useEffect(() => {
        axios({
          method: 'post',
          url: window.$link + 'inventory_counts/show/' + id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          },
        }).then(function (response) {
         console.log(response)
         setInventoryDetails(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        axios({
          method: 'post',
          url: window.$link + 'inventory_counts/getInventoryCountDetails/' + id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          },
        }).then(function (response) {
         console.log(response)
         setItems(response.data);
        }).catch(function (error) {
            console.log(error);
        });

    },[]);

    //Functions
    function showInventoryButtons() {
        return (
            <div className="row d-flex justify-content-center po-btn">
                {inventoryDetails.status != "approved" && inventoryDetails.status != "disapproved" &&  inventoryDetails.status !="completed" && (role === "BU head" || role === "Admin") && (
                <>
                <div className="col-sm-2">
                    <button className="po-approve-btn" onClick={approveAll}>APPROVE </button>
                </div>
                <div className="col-sm-2">
                    <button className="po-disapprove-btn" onClick={showDisapproveAllPrompt}>DISAPPROVE </button>
                </div>
                </>
                )}
                <div className="col-sm-2">
                    <button className="po-close-btn" onClick={close}>CLOSE </button>
                </div>
            </div>
        )
    }

    //components
    const listItems = items.map((data,index) => {
        return (
        <div className="row">
            <div className="col-sm-5">
                {data.item_name}
            </div>
            <div className="col-sm-2">
                {data.physical_count}
            </div>
            <div className="col-sm-2">
                {data.computer_count}
            </div>
            {data.status != "approved" && data.status  != "disapproved" && data.status != "completed" && inventoryDetails.status != "approved"  && inventoryDetails.status != "disapproved" && (
              <div className="col-sm-2">
                 <button className="disapprove-btn" onClick={(e) => showDisapproveItemPrompt(data.id)}>DISAPPROVE</button>
              </div>
            )}
        </div>
        )
    });

    function showDisapproveItemPrompt(itemId) {
        handleItemDeleteShow();
        setDisapproveItem(itemId);
    }

    function disapproveItemAction(itemId) {
        axios({
            method: 'post',
            url: window.$link + 'inventory_count_details/mark_disapproved/' + itemId,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
              inventory_count_id: id,
              reason: deleteItemReason,
            },
          }).then(function (response) {
            console.log(response)
            toast.success("Disapproved Inventory Item!");
              setTimeout(function () {
                refreshPage();
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }

    function showDisapproveAllPrompt() {
        handleAllDeleteShow();
    }

    function disapproveAll() {
            console.log("heree")
            console.log(deleteAllReason)
            axios({
                method: 'post',
                url: window.$link + 'inventory_counts/mark_disapproved/' + id,
                withCredentials: false,
                params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                updated_by: userId,
                reason: deleteAllReason,
                },
            }).then(function (response) {
                console.log(response);
                toast.success("Disapproved Inventory!");
                setTimeout(function () {
                close();
              }, 2000);
            }).then(function (error) {
                console.log(error);
            });
    }

    function approveAll() {
        axios({
            method: 'post',
            url: window.$link + 'inventory_counts/mark_approved/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Approved Inventory!");
              setTimeout(function () {
                close();
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }

    function close() {
        setCloseRedirect(true);
    }

    if(closeRedirect) {
        return <Navigate to="/inventory"/>
    }

    return (
        <div>
        <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='INVENTORY' 
                />
                <ToastContainer/>

            <h4 className="form-categories-header italic">INVENTORY DETAILS</h4>
            
            <div className="po-details">
            <div className="row">
                <div className="col-sm-4">
                        <span className='label'>REQUESTER</span>
                        <span className='detail'>{inventoryDetails.requester}</span>
                </div>
                <div className="col-sm-6">
                        <span className='label'>REQUEST DATE</span>
                        <span className='detail'>{formatDate(inventoryDetails.count_date)}</span>
                </div>
            </div>

            <h5 className="form-categories-subheader italic">LIST OF INVENTORY ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-5 service">
                            ITEM
                        </div>
                         <div className="col-sm-2 service">
                            ITEM REQUEST VALUE
                        </div>
                        <div className="col-sm-2 service">
                            COMPUTER VALUE
                        </div>
                        {inventoryDetails.status != "approved" && inventoryDetails.status != "disapproved" && inventoryDetails.status != "printed" && inventoryDetails.status != "completed" && (
                            <div className="col-sm-1 service">
                            ACTION
                        </div>
                        )}
                    </div>

                    {listItems}

                </div>
            </div>

            {items.length != 0 && showInventoryButtons()}
            </div>

            {/* MODAL FOR DISAPPROVING ITEM */}

            <Modal show={promptDisapproveItem} onHide={handleItemDeleteClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>DISAPPROVE ITEM?</Modal.Title>
                </Modal.Header>
                  <div>
                  <Modal.Body>
                  <div className='row d-flex justify-content-center text-center'>
                    Are you sure you want to disapprove this item? <br/> State reason for disapproving
                    <div className="reason-input-area">
                        <textarea cols="50" onChange={(e) => setDeleteItemReason(e.target.value)}></textarea>
                    </div>
                    
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-disapprove-btn' onClick={(e) => disapproveItemAction(disapproveItem)}>
                          DISAPPROVE
                        </button>
                   </Modal.Footer>
                   </div>
            </Modal>

            {/* MODAL FOR DISAPPROVING INVENTORY */}

            <Modal show={promptDisapproveAll} onHide={handleAllDeleteClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>DISAPPROVE INVENTORY?</Modal.Title>
                </Modal.Header>
                  <div>
                  <Modal.Body>
                  <div className='row d-flex justify-content-center text-center'>
                    Are you sure you want to disapprove this inventory? <br/> State reason for disapproving
                    <div className="reason-input-area">
                        <textarea cols="50" onChange={(e) => setDeleteAllReason(e.target.value)}></textarea>
                    </div>
                    
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-disapprove-btn' onClick={() => disapproveAll()}>
                          DISAPPROVE
                        </button>
                   </Modal.Footer>
                   </div>
            </Modal>
            </div>
    )
}

export default ReviewAddInventory
