import React from 'react';
import { Link } from 'react-router-dom';
import PdfTransaction from './ReactToPDF';

//css
import './Header.css';
import {CSVLink} from 'react-csv';


function Header({type, title, buttons, editProfile, editPO, deletePO, payReceive, statusPaymentPO, statusPO, editPassword, editSupplier, deleteSupplier, deleteRelease, addInventory, addInvoice, downloadPDF, tableName, tableData, tableHeaders, status, completedOn, receiveItem, editLabTest, deleteLabTest}) {

    var btn = [];

    if(buttons) {
        btn = buttons.map((button) => {

            if(button === 'export-excel') {
                if(status == true) {
                    return <button className="download"><CSVLink data={tableData} filename={title} className="download-btn">EXPORT EXCEL</CSVLink></button>
                } else {
                    return (
                        <button className="download">Loading Data...</button>
                    )
                }
            }
            if(button === 'export-pdf') {
                if(status == true) {
                    return (
                        <PdfTransaction
                            name={tableName}
                            header={tableHeaders}
                            data={tableData}
                        />
                    )
                } else {
                    return (
                        <button className="download">Loading Data...</button>
                    )
                }
            }
    
            if (button.includes("add-")) {
                const addBtn = button.split("-");
                const linkTo = "/" + button;

                if(button === "add-release") {
                    return <Link to={linkTo}><button className="header-btn add-items"> ADD ITEMS</button></Link>
                } 
                else if (button === "add-purchase") {
                    return <Link to={linkTo}><button className="header-btn add-items"> ADD ITEMS</button></Link>
                }
                else if (button === "add-supply-items") {
                    return <Link to={linkTo}><button className="header-btn add-items"> ADD ITEMS</button></Link>
                }
                else if (button === 'add-new-patient') {
                    return <Link to={linkTo}><button className="header-btn add-patient"> NEW PATIENT</button></Link>
                }
                else if (button === 'add-old-patient') {
                    return <Link to={linkTo}><button className="header-btn add-patient"> OLD PATIENT</button></Link>
                }
                else if (button === 'add-company') {
                    return <Link to={linkTo}><button className="header-btn add-company"> ADD COMPANY</button></Link>
                }
                else if(button === 'add-inventory') {
                    return <button className="edit-profile" onClick={addInventory}> ADD INVENTORY</button>
                }
                else if(button === 'add-invoice') {
                    return <button className="edit-profile" onClick={addInvoice}> CREATE INVOICE</button>
                }
                else if(button === 'add-discount') {
                    return <Link to={linkTo}><button className="header-btn add-company"> ADD DISCOUNT</button></Link>
                }
                else if(button === 'add-lab-test') {
                    return <Link to={linkTo}><button className="header-btn add-company"> ADD LAB TEST</button></Link>
                }
                else if(button === 'add-package') {
                    return <Link to={linkTo}><button className="header-btn add-company"> ADD PACKAGE</button></Link>
                }            
                return <Link to={linkTo}><button className={button}> ADD {addBtn[1].toUpperCase()}</button></Link>
            }
            else {
                const linkTo = "/" + button;

                if(button === 'change-password') {
                    return <button className="change-password" onClick={editPassword}> CHANGE PASSWORD</button>
                }
                else if(button === 'edit-po' && (statusPO == "pending" || statusPO == "for approval")) {
                    return <button className="edit-profile" onClick={editPO}> EDIT </button>
                }
                else if(button === 'pay-receive' && statusPO != "for approval" && statusPaymentPO != "paid" ) {
                    return <button className="edit-profile" onClick={payReceive}>ADD PAYMENT</button>
                }
                else if(button === 'receive-items' && statusPO == "printed" && completedOn == null) {
                    return <button className="edit-profile" onClick={receiveItem}>RECEIVE ITEMS</button>
                }
                else if(button === 'receive-items-manager') {
                    return <Link to={linkTo}><button className="header-btn add-company"> RECEIVE ITEMS</button></Link>
                }
                else if(button === 'delete-po' && (statusPO == "pending" || statusPO == "for approval")) {
                    return <button className="edit-profile" onClick={deletePO}>DELETE</button>
                }
                else if(button === 'edit-profile') {
                    return <button className="edit-profile" onClick={editProfile}> EDIT PROFILE</button>
                }
                else if(button === 'edit-supplier') {
                    return <button className="edit-profile" onClick={editSupplier}> EDIT SUPPLIER</button>
                }
                else if(button === 'edit-lab-test') {
                    return <button className="edit-profile" onClick={editLabTest}> EDIT LAB TEST</button>
                }
                else if(button === 'delete-lab-test') {
                    return <button className="edit-profile" onClick={deleteLabTest}> DELETE LAB TEST</button>
                }
                else if(button === 'delete-supplier') {
                    return <button className="edit-profile" onClick={deleteSupplier}> DELETE SUPPLIER</button>
                }
                else if(button === 'delete-release') {
                    return <button className="edit-profile" onClick={deleteRelease}> DELETE</button>
                }
            }
    
        });
    }

    return (
        <div className={title + ' header ' + type}>
            <div className="header-title">
                {title}{btn}
            </div>
        </div>
    )
}

export default Header
