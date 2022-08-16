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
import PrintReceipt from "./PrintReceipt";
import useDetectPrint from "react-detect-print";


import './PurchaseOrder.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//variables
const userToken = getToken();
const userId = getUser();

function ReceivesPrint() {
    document.body.style = 'background: white;';

      //PO details
      const {id, poId} = useParams();
      const [supplier, setSupplier] = useState("");
      const [purchaseDate, setPurchaseDate] = useState("");
      const [deliveryDate, setDeliveryDate] = useState("");
      const [deliveryAddress, setDeliveryAddress] = useState("");
      const [requisitioner, setRequisitioner] = useState("");
      const [forwarder, setForwarder] = useState("");
      const [remarks, setRemarks] = useState("");
      const [grandTotal, setGrandTotal] = useState("");
      const [subTotal, setSubTotal] = useState("");
      const [poItems, setPoItems] = useState([]);
      const [status, setStatus] = useState("");
      const [payDate, setPaymentDate] = useState("");
      const [paymentStatus, setPaymentStatus] = useState("");
      const [printedBy, setPrintedBy] = useState("");
      const [approvedBy, setApprovedBy] = useState("");
      const [completedOn, setCompletedOn] = useState("");
      const [paidAmount, setPaidAmount] = useState("");
      const [receivePo, setReceivePo] = useState([]);
      const [isPaid, setIsPaid] = useState([]);

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

      //Redirect Edit 
      const [editRedirect, setEditRedirect] = useState(false);
      const [payRedirect, setPayRedirect] = useState(false);
      const [deleteRedirect, setDeleteRedirect] = useState(false);
      const [closeRedirect, setCloseRedirect] = useState(false);
      const [receiveRedirect, setReceiveRedirect] = useState(false);

     //Disapprove Item Prompt Modal
     const [promptDisapprove, setPromptDisapprove] = useState(false);
     const handlePromptClose = () => setPromptDisapprove(false);
     const handlePromptShow = () => setPromptDisapprove(true);

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

    const componentRefReceipt = useRef();
    const handlePrintReceipt = useReactToPrint ({
        content:() => componentRefReceipt.current,
        pageStyle: () => "@page { size: letter; margin: 0mm; }",
    });

     //Fetch PO details
     React.useEffect(() => {
        poItems.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'pos/show/' + poId,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          },
        }).then(function (response) {
            console.log(response.data)

            //format date
            var pDate = new Date(response.data.purchase_date);
            var dDate = new Date(response.data.delivery_date);
            var payDate = new Date(response.data.payment_date);

            axios({
                method: 'post',
                url: window.$link + 'suppliers/show/' + response.data.supplier_id,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (response) {
                setSupplier(response.data.name);
            }).then(function (error) {
                console.log(error);
            })
            console.log(response.data)
            setPurchaseDate(pDate.toDateString());
            setDeliveryDate(dDate.toDateString());
            setDeliveryAddress(response.data.delivery_address);
            setRequisitioner(response.data.requisitioner);
            setForwarder(response.data.forwarder);
            setRemarks(response.data.remarks);
            setStatus(response.data.status);
            setPaymentDate(payDate.toDateString());
            setPaymentStatus(response.data.payment_status);
            setCompletedOn(response.data.completed_on);
            setPaidAmount(response.data.paid_amount)

            setEditSupplier(response.data.supplier_id);
            setEditPurchaseDate(response.data.purchase_date);
            setEditDeliveryDate(response.data.delivery_date);
            setEditDeliveryAddress(response.data.delivery_address);
            setEditRequisitioner(response.data.requisitioner);
            setEditForwarder(response.data.forwarder);
            setEditRemarks(response.data.remarks);

            //Printed By
            axios({
                method: 'post',
                url: window.$link + 'users/show/' + userId,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (response) {
                setPrintedBy(response.data.name);
            }).catch(function (error) {
                console.log(error);
            });

            //Approved By
            axios({
                method: 'post',
                url: window.$link + 'users/show/' + response.data.approved_by,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                }
            }).then(function (response) {
                setApprovedBy(response.data.name);
            }).catch(function (error) {
                console.log(error);
            });


        }).catch(function (error) {
            console.log(error);
        });

        axios({
            method: 'post',
            url: window.$link + 'po_receives/getPOReceiveItems/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              response.data.map((data,index) => {
                
                if(data.status != "disapprove") {
                    var itemData = {};
                    itemData.id = data.id;
                    itemData.item = data.item;
                    itemData.qty = data.qty;
                    itemData.inventory_qty = data.inventory_qty;
                    itemData.unit = data.unit;
                    itemData.amount = data.cost;
                    itemData.total = data.amount;
                    setPoItems(oldArray => [...oldArray, itemData]);
                }
              });
          }).catch(function (error) {
              console.log(error);
          });

          axios({
            method: 'post',
            url: window.$link + 'po_receives/show/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              setReceivePo(response.data);
              setIsPaid(response.data[0].paid_amount == response.data[0].grand_total ? "paid" : "unpaid")
              setGrandTotal(response.data[0].grand_total);
          }).catch(function (error) {
              console.log(error);
          });
    },[]);

    //Functions
    function edit(e) {

        e.preventDefault();

        axios({
            method: 'post',
            url: window.$link + 'pos/update/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              supplier: editSupplier,
              purchase_date: editPurchaseDate,
              delivery_date: editDeliveryDate,
              delivery_address: editDeliveryAddress,
              requisitioner: editRequisitioner,
              forwarder: editForwarder,
              remarks: editRemarks,
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response);
              toast.success("Successfully updated PO!");
            //   refreshPage();
          }).catch(function (error) {
              console.log(error);
              toast.warning("Oops something went wrong...");
          })
    }

    //components
    const listItems = poItems.map((data,index) => {
        return (
        <div className="row">
            {/* <div className="col-sm-4">
                { parseFloat(data.qty).toFixed(2) + " " + data.unit + " " + data.item}
            </div> */}
            <div className="col-sm-4">
                { parseFloat(data.qty).toFixed(2)}
            </div>
            <div className="col-sm-4 text-center">
                {parseFloat(data.amount).toFixed(2)}
            </div>
            <div className="col-sm-2 text-right">
                {parseFloat(data.total).toFixed(2)}
            </div>
            {status != "approved" && status != "disapproved" && status != "printed" && status != "completed" && (
              <div className="col-sm-2">
                 <button className="disapprove-btn" onClick={(e) => showDisapprovePrompt(data.id)}>DISAPPROVE</button>
              </div>
            )}
        </div>
        )
    });

    function showDisapprovePrompt(itemId) {
        handlePromptShow();
        setDisapproveItem(itemId);
    }

    function deletePO() {
        axios({
            method: 'post',
            url: window.$link + 'pos/delete/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Successfully deleted");
              setTimeout(function () {
                setDeleteRedirect(true);
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }

    function disapproveItemAction(itemId) {
        axios({
            method: 'post',
            url: window.$link + 'po_items/mark_disapproved/' + itemId,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              po: id,
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Disapproved PO item!");
              setTimeout(function () {
                refreshPage();
              }, 2000);
          }).then(function (error) {
              console.log(error);
              toast.error("Oops! Something went wrong...");
          });
    }

    function disapproveAll() {
        axios({
            method: 'post',
            url: window.$link + 'pos/mark_disapproved/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Disapproved PO!");
              setTimeout(function () {
                setDeleteRedirect(true);
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }

    function approveAll() {
        axios({
            method: 'post',
            url: window.$link + 'pos/mark_approved/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Approved PO!");
              setTimeout(function () {
              }, 2000);
          }).then(function (error) {
              console.log(error);
          });
    }

    function printSuccessful() {
        axios({
            method: 'post',
            url: window.$link + 'pos/mark_printed/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              updated_by: userId,
            },
          }).then(function (response) {
              console.log(response)
              toast.success("Print Successful!");
          }).then(function (error) {
              console.log(error);
          });
    }

    function payReceive() {
        setPayRedirect(true);
    }

    //Redirections
    if(payRedirect == true) {
        var link =  "/pay-purchase-order/" + id + "/" + poId;
        return (
            <Navigate to ={link}/>
        )
    }

    return (
        <div>
        <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='DELIVERIES' 
                    buttons= {['pay-receive']}
                    deletePO={deletePO}
                    payReceive={payReceive}
                    completedOn={completedOn}
                    statusPaymentPO={isPaid}
                />
                <ToastContainer/>

            <h4 className="form-categories-header italic">PURCHASE ORDER DETAILS</h4>
            
            <div className="po-details">
            <div className="row">
                <div className="col-sm-4">
                        <span className='label'>RECEIVE INVOICE ID</span>
                        <span className='detail'>{id}</span>
                </div>
                <div className="col-sm-2">
                        <span className='label'>PO ID</span>
                        <span className='detail'>{poId}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                        <span className='label'>SUPPLIER</span>
                        <span className='detail'>{supplier}</span>
                </div>
                <div className="col-sm-6">
                        <span className='label'>PURCHASE DATE</span>
                        <span className='detail'>{purchaseDate}</span>
                </div>
            </div>
            <div className="row ">
                <div className="col-sm-4">
                        <span className='label'>DELIVERY DATE</span>
                        <span className='detail'>{deliveryDate}</span>
                </div>
                <div className="col-sm-6">
                        <span className='label'>PAYMENT DATE</span>
                        <span className='detail'>{payDate}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                        <span className='label'>REMARKS</span>
                        <span className='detail'>{remarks}</span>
                </div>
            </div>

            <h5 className="form-categories-subheader italic">LIST OF RECEIVED ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        {/* <div className="col-sm-5 service">
                            PARTICULARS
                        </div> */}
                        <div className="col-sm-2 service">
                           QTY
                        </div>
                        <div className="col-sm-4 service">
                            COST
                        </div>
                        <div className="col-sm-3 service">
                            TOTAL
                        </div>
                    </div>

                    {listItems}

                    <div className="row less-gap d-flex justify-content-end">
                        <div className="col-sm-4">
                            <span className='label'>GRAND TOTAL</span>
                            <span className='detail'><b>{grandTotal}</b></span>
                        </div>
                    </div>

                </div>
            </div>

                <div className="row d-flex justify-content-center">
                {/* {print == true || poItems.length != 0 && status != "pending" && status != "for approval" && (
                    <div className="col-sm-3">
                        <button className="po-print-btn" onClick={handlePrint}><FontAwesomeIcon
                        icon={'print'}
                        alt={'eye'}
                        aria-hidden="true"
                        className="print-icon"
                      />PRINT DETAILS</button>
                    </div>
                )} */}
                 {print == true || poItems.length != 0 && status != "pending" && status != "for approval" && paidAmount != "0.00"&& (
                    <div className="col-sm-3">
                        <button className="po-print-btn" onClick={handlePrintInvoice}><FontAwesomeIcon
                        icon={'print'}
                        alt={'eye'}
                        aria-hidden="true"
                        className="print-icon"
                      />PRINT INVOICE</button>
                      {/* <button className="po-print-btn" onClick={handlePrintReceipt}><FontAwesomeIcon
                        icon={'print'}
                        alt={'eye'}
                        aria-hidden="true"
                        className="print-icon"
                      />PRINT RECEIPT</button> */}
                    </div>
                 )}
                </div>

            <div
                style={{ display: "none" }}// This make ComponentToPrint show   only while printing
            > 
            <PrintPurchaseOrderInvoice
                ref={componentRefInvoice}
                id={id}
                poId={poId}
                supplier={supplier}
                purchaseDate={purchaseDate}
                deliveryDate={deliveryDate}
                deliveryAddress={deliveryAddress}
                requisitioner={requisitioner}
                forwarder={forwarder}
                remarks={remarks}
                poItems={poItems} 
                status={status}
                subTotal={subTotal}
                grandTotal={grandTotal}
                printedBy={printedBy}
                approvedBy={approvedBy}
                receivePo={receivePo}
            />
            {/* <PrintReceipt ref={componentRefReceipt}></PrintReceipt> */}
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

            <Modal show={promptDisapprove} onHide={handlePromptClose} size="md">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>DISAPPROVE ITEM?</Modal.Title>
                </Modal.Header>
                  <form>
                  <Modal.Body>
                  <div className='row d-flex justify-content-center'>
                    Are you sure you want to disapprove this item?
                   </div>
                  </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className='po-disapprove-btn' onClick={(e) => disapproveItemAction(disapproveItem)}>
                          DISAPPROVE
                        </button>
                   </Modal.Footer>
                   </form>
            </Modal>
            </div>
        </div>
    )
}

export default ReceivesPrint
