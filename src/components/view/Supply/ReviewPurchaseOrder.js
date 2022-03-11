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

function ReviewPurchaseOrder() {
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
      const [status, setStatus] = useState("");
      const [paymentStatus, setPaymentStatus] = useState("");
      const [printedBy, setPrintedBy] = useState("");
      const [approvedBy, setApprovedBy] = useState("");
      const [completedOn, setCompletedOn] = useState("");
      const [paidAmount, setPaidAmount] = useState("");

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

     //Fetch PO details
     React.useEffect(() => {
        poItems.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'pos/show/' + id,
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
            setPurchaseDate(pDate.toDateString());
            setDeliveryDate(dDate.toDateString());
            setDeliveryAddress(response.data.delivery_address);
            setRequisitioner(response.data.requisitioner);
            setForwarder(response.data.forwarder);
            setGrandTotal(response.data.grand_total);
            setDiscount(response.data.discount);
            setSubTotal(response.data.subtotal)
            setRemarks(response.data.remarks);
            setStatus(response.data.status);
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
            url: window.$link + 'pos/getPoItems/' + id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              console.log(response.data);
            
              response.data.map((data,index) => {
                
                if(data.status != "disapprove") {
                    var itemData = {};
                    itemData.id = data.id;
                    itemData.item = data.item;
                    itemData.qty = data.qty;
                    itemData.unit = data.unit;
                    itemData.amount = data.cost;
                    itemData.discount = data.discount;
                    itemData.received = data.received;
                    setPoItems(oldArray => [...oldArray, itemData]);
                }
              });
          }).catch(function (error) {
              console.log(error);
          })

    },[]);

    //Functions
    function showPOButtons() {
        return (
            <div className="row d-flex justify-content-center po-btn">
                <div className="col-sm-2">
                    <button className="po-approve-btn" onClick={approveAll}>APPROVE </button>
                </div>
                <div className="col-sm-2">
                    <button className="po-disapprove-btn" onClick={disapproveAll}>DISAPPROVE </button>
                </div>
                <div className="col-sm-2">
                    <button className="po-close-btn" onClick={close}>CLOSE </button>
                </div>
            </div>
        )
    }
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
            <div className="col-sm-3">
                { parseFloat(data.qty).toFixed(2) + " " + data.unit + " " + data.item}
            </div>
            <div className="col-sm-2">
                {data.amount}
            </div>
            <div className="col-sm-2">
                {data.discount}
            </div>
            <div className="col-sm-1">
                {parseFloat(data.qty * data.amount - data.discount).toFixed(2)}
            </div>
            <div className="col-sm-2">
                {data.received}
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
                close();
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

    function receiveItem() {
        setReceiveRedirect(true);
    }

    function payPO() {
        setPayRedirect(true);
    }

    function close() {
        setCloseRedirect(true);
    }

    function redirectToEdit() {
        setEditRedirect(true);
    }

    console.log(status)

    //Redirections

    if(deleteRedirect == true || closeRedirect == true) {
        var link =  "/purchase-order";
        return (
            <Navigate to ={link}/>
        )
    }

    if(editRedirect == true) {
        var link =  "/update-purchase-order/" + id;
        return (
            <Navigate to ={link}/>
        )
    }

    if(payRedirect == true) {
        var link =  "/pay-purchase-order/" + id;
        return (
            <Navigate to ={link}/>
        )
    }

    if(receiveRedirect == true) {
        var link =  "/receive-purchase-order/" + id;
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
                    title='PURCHASE ORDER' 
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
            
            <div className="po-details">
            <div className="row">
                <div className="col-sm-2">
                        <div className='label'>SUPPLIER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{supplier}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>PURCHASE DATE</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{purchaseDate}</div>
                </div>
            </div>
            <div className="row ">
                <div className="col-sm-2">
                        <div className='label'>DELIVERY ADDRESS</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{deliveryAddress}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>DELIVERY DATE</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{deliveryDate}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                        <div className='label'>REQUISITIONER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{requisitioner}</div>
                </div>
                <div className="col-sm-2">
                        <div className='label'>FORWARDER</div>
                </div>
                <div className="col-sm-2">
                        <div className='detail'>{forwarder}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                        <div className='label'>REMARKS</div>
                </div>
                <div className="col-sm-10">
                        <div className='detail'>{remarks}</div>
                </div>
            </div>

            {/* <h5 className="form-categories-subheader italic">INVOICES</h5>
            <Table
                type={'purchase-order-invoice'}
                clickable={true}
                tableData={[]}
                rowsPerPage={4}
                headingColumns={['PO NO.', 'SUPPLIER', 'PURCHASE DATE', 'TOTAL','STATUS','PAYMENT', 'ACTION']}
                /> */}

            <h5 className="form-categories-subheader italic">LIST OF PURCHASED ITEMS</h5>

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-3 service">
                            PARTICULARS
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
                        <div className="col-sm-2 service">
                            RECEIVED
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
                 {/* {print == true || poItems.length != 0 && status != "pending" && status != "for approval" && paidAmount != "0.00"&& (
                    <div className="col-sm-3">
                        <button className="po-print-btn" onClick={handlePrintInvoice}><FontAwesomeIcon
                        icon={'print'}
                        alt={'eye'}
                        aria-hidden="true"
                        className="print-icon"
                      />PRINT INVOICE</button>
                    </div>
                 )} */}
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
                subTotal={subTotal}
                grandTotal={grandTotal}
                printedBy={printedBy}
                approvedBy={approvedBy}
            />

            {/* <PrintPurchaseOrderInvoice
                ref={componentRefInvoice}
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
                subTotal={subTotal}
                grandTotal={grandTotal}
                printedBy={printedBy}
                approvedBy={approvedBy}
            /> */}


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

export default ReviewPurchaseOrder
