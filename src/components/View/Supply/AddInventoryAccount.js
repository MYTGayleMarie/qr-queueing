import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactToPrint } from 'react-to-print';
import PrintPurchaseOrder from "./PrintPurchaseOrder";
import PrintPurchaseOrderInvoice from "./PrintPurchaseOrderInvoice";
import useDetectPrint from "react-detect-print";


import './PurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();

function AddInventoryAccount() {
    document.body.style = 'background: white;';

      //PO details
      const {id} = useParams();
      var poId;
      const [supplier, setSupplier] = useState("");
      const [purchaseDate, setPurchaseDate] = useState("");
      const [deliveryDate, setDeliveryDate] = useState("");
      const [deliveryAddress, setDeliveryAddress] = useState("");
      const [requisitioner, setRequisitioner] = useState("");
      const [forwarder, setForwarder] = useState("");
      const [remarks, setRemarks] = useState("");
      const [grandTotal, setGrandTotal] = useState("");
      const [subTotal, setSubTotal] = useState("");
      const [discount, setDiscount] = useState("");
      const [poItems, setPoItems] = useState([]);
      const [itemInfo, setItemInfo] = useState([]);
      const [status, setStatus] = useState("");
      const [paymentStatus, setPaymentStatus] = useState("");
      const [printedBy, setPrintedBy] = useState("");
      const [approvedBy, setApprovedBy] = useState("");
      const [completedOn, setCompletedOn] = useState("");
      const [paidAmount, setPaidAmount] = useState("");
      const [receive_qty, setReceiveQty] = useState("");

      //Edit PO details
      const [editSupplier, setEditSupplier] = useState("");
      const [editPurchaseDate, setEditPurchaseDate] = useState("");
      const [editDeliveryDate, setEditDeliveryDate] = useState("");
      const [editDeliveryAddress, setEditDeliveryAddress] = useState("");
      const [editRequisitioner, setEditRequisitioner] = useState("");
      const [editForwarder, setEditForwarder] = useState("");
      const [editRemarks, setEditRemarks] = useState("");

      //Disapproved PO Item
      const [disapproveItem, setDisapproveItem] = useState("");
      const [deleteItemReason, setDeleteItemReason] = useState("");
      const [deleteAllReason, setDeleteAllReason] = useState("");

      //Redirect Edit 
      const [editRedirect, setEditRedirect] = useState(false);
      const [payRedirect, setPayRedirect] = useState(false);
      const [deleteRedirect, setDeleteRedirect] = useState(false);
      const [closeRedirect, setCloseRedirect] = useState(false);
      const [receiveRedirect, setReceiveRedirect] = useState(false);

     //Disapprove Item Prompt Modal
     const [promptDisapproveItem, setPromptDisapproveItem] = useState(false);
     const handleItemDeleteClose = () => setPromptDisapproveItem(false);
     const handleItemDeleteShow = () => setPromptDisapproveItem(true);

     //Disapprove All Prompt Modal
     const [promptDisapproveAll, setPromptDisapproveAll] = useState(false);
     const handleAllDeleteClose = () => setPromptDisapproveAll(false);
     const handleAllDeleteShow = () => setPromptDisapproveAll(true);

     //Print PO
     const [isprinted, setIsPrinted] = useState(false);
     const handlePrintClose = () => setIsPrinted(false);
     const handlePrintShow = () => setIsPrinted(true);

     const [print, setPrint] = useState(false);
     const printing = useDetectPrint();

     const componentRef = useRef();
     const handlePrint = useReactToPrint({
       onAfterPrint: handlePrintShow,
       content: () => componentRef.current,
       pageStyle: () => "@page { size: letter; margin: 0mm; }",
     });

     const componentRefInvoice = useRef();
     const handlePrintInvoice = useReactToPrint({
       content: () => componentRefInvoice.current,
       pageStyle: () => "@page { size: letter; margin: 0mm; }",
     });

     //API get items
  React.useEffect(() => {
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
            response.data.items.map((data,index) => {
                if(data.item_id != 0 && data.is_deleted == 0 && data.cost != null){
                var itemInfo = {};
                itemInfo.id = data.item_id;
                itemInfo.name = data.item_name;
                itemInfo.cost = data.cost;
                itemInfo.unit = data.default_unit;
                itemInfo.with_conversion = data.with_conversion;
                setItemInfo(oldArray => [...oldArray, itemInfo]);
                }
            });
        })
    });

    console.log(itemInfo);


    return (
        <div>
        <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='INVENTORY COUNT' 
                    buttons= {['delete-po', 'edit-po', 'receive-items']}
                    editPO={redirectToEdit}
                    deletePO={deletePO}
                    payPO={payPO}
                    receiveItem={receiveItem}
                    completedOn={completedOn}
                    statusPaymentPO={paymentStatus}
                    statusPO={status}
                />
                <ToastContainer/>

            <h4 className="form-categories-header italic">PURCHASE ORDER DETAILS</h4>

            <h5 className="form-categories-subheader italic">LIST OF  ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-3 service">
                            PARTICULARS
                        </div>
                        <div className="col-sm-2 service">
                            INVENTORY QUANTITY
                        </div>
                        <div className="col-sm-2 service">
                            AMOUNT
                        </div>
                        <div className="col-sm-2 service">
                            DISCOUNT
                        </div>
                        <div className="col-sm-1 service">
                            TOTAL
                        </div>
                        {status != "approved" && status != "disapproved" && status != "printed" && status != "completed" && (
                            <div className="col-sm-1 service">
                            ACTION
                        </div>
                        )}
                    </div>

                    {listItems}

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>SUB TOTAL</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{subTotal}</b></div>
                        </div>
                    </div>

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>DISCOUNT</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{discount}</b></div>
                        </div>
                    </div>

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-2">
                            <div className='label'>GRAND TOTAL</div>
                        </div>
                        <div className="col-sm-2">
                            <div className='detail'><b>{grandTotal}</b></div>
                        </div>
                    </div>

                </div>
            </div>

            {poItems.length != 0 && status != "approved" && status != "disapproved" && status != "printed" &&  status !="completed" && showPOButtons()}

                <div className="row d-flex justify-content-center">
                {print == true || poItems.length != 0 && status != "pending" && status != "for approval" && (
                    <div className="col-sm-3">
                        <button className="po-print-btn" onClick={handlePrint}><FontAwesomeIcon
                        icon={'print'}
                        alt={'eye'}
                        aria-hidden="true"
                        className="print-icon"
                      />PRINT DETAILS</button>
                    </div>
                )}
                </div>

            <div
                style={{ display: "none" }}// This make ComponentToPrint show   only while printing
            > 
            <PrintPurchaseOrder
                ref={componentRef}
                id={id}
                supplier={supplier}
                purchaseDate={purchaseDate}
                deliveryDate={deliveryDate}
                deliveryAddress={deliveryAddress}
                requisitioner={requisitioner}
                forwarder={forwarder}
                remarks={remarks}
                poItems={poItems} 
                status={status}
                receive_qty={receive_qty}
                subTotal={subTotal}
                grandTotal={grandTotal}
                printedBy={printedBy}
                approvedBy={approvedBy}
            />


            </div>

            <Modal show={isprinted} onHide={handlePrintClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>PRINT SUCCESSFUL?</Modal.Title>
                </Modal.Header>
                  <form>
                  <Modal.Body>

                  <div className='row d-flex justify-content-center'>
                    Was printing successful?
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-yes-btn' onClick={() => printSuccessful()}>
                          YES
                        </button>
                        <button type="submit" className='po-no-btn'>
                          NO
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>

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

            <Modal show={promptDisapproveAll} onHide={handleAllDeleteClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>DISAPPROVE PURCHASE ORDER?</Modal.Title>
                </Modal.Header>
                  <div>
                  <Modal.Body>
                  <div className='row d-flex justify-content-center text-center'>
                    Are you sure you want to disapprove this purchase order? <br/> State reason for disapproving
                    <div className="reason-input-area">
                        <textarea cols="50" onChange={(e) => setDeleteAllReason(e.target.value)}></textarea>
                    </div>
                    
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-disapprove-btn' onClick={disapproveAll}>
                          DISAPPROVE
                        </button>
                   </Modal.Footer>
                   </div>
            </Modal>
            </div>
    )
}

export default AddInventoryAccount
