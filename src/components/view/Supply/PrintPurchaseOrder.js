import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';

//css
import '../Cashier/PaymentToPrint.css';

//logo image
import logo from '../../../images/logo-black.png';

export class PrintPurchaseOrder extends React.PureComponent {
    render() {
           //components
    const listItems = this.props.poItems.map((data,index) => {
        return (
        <tr>
            <td>
                {data.item}
            </td>
            <td>
                {parseFloat(data.qty).toFixed(2)}                
            </td>
            <td>
                {data.unit}
            </td>
            <td>
                {data.amount}
            </td>
            <td>
                {data.discount}
            </td>
        </tr>
        )
    });

        const marginTop="10px"
        const marginRight="10px"
        const marginBottom="10px"
        const marginLeft="20px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
        };

        const deliveryDateformat = new Date(this.props.deliveryDate);
        const purchaseDateformat = new Date(this.props.purchaseDate);

        return (
            <div>
                <style>{getPageMargins()}</style>
                <div className="print-area">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="po-logo"></img>
                    </div>
                    <div className='row add-space'>
                        <h1 className='table-header'>Purchase Order Details</h1>
                        <table>
                            <tr>
                                <td><span className="header">Supplier</span><span className="detail">{this.props.supplier}</span></td>
                                <td><span className="header">Purchase Date</span><span className="detail">{purchaseDateformat.toDateString()}</span> </td>
                                <td><span className="header">Delivery Date</span><span className="detail">{deliveryDateformat.toDateString()}</span> </td>
                                <td><span className="header">Delivery Address</span><span className="detail">{this.props.deliveryAddress}</span> </td>
                            </tr>
                            <tr>
                                <td><span className="header">Requisitioner</span><span className="detail">{this.props.requisitioner}</span></td>
                                <td><span className="header">Forwarder</span><span className="detail">{this.props.forwarder}</span></td>
                                <td><span className="header">Remarks</span><span className="detail">{this.props.remarks}</span></td>
                            </tr>
                        </table>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <h1 className='table-header'>List of Purchased Items</h1>
                        <table>
                            <tr>
                                <th>ITEM</th>
                                <th>QTY</th>
                                <th>UNIT</th>
                                <th>AMOUNT</th>
                                <th>DISCOUNT</th>
                            </tr>
                            {listItems}
                        </table>
                    </div>
         
                    <div className='row add-space'>
                        <div className='col-sm-4 d-flex justify-content-end'>
                            <span className='print-label'><b>SUBTOTAL</b></span>
                            <span> {this.props.subTotal}</span>
                        </div>
                        <div className='col-sm-4 d-flex justify-content-end'>
                            <span className='print-label'><b>GRANDTOTAL</b></span>
                            <span> {this.props.grandTotal}</span>
                        </div>
                    </div>

                    <hr></hr>

                    <div className="row">
                        <div className='col-sm-4'>
                            <span className='print-label'><b>PRINTED BY</b></span>
                            <span> {this.props.printedBy}</span>
                        </div>
                        <div className='col-sm-4'>
                            <span className='print-label'><b>APPROVED BY</b></span>
                            <span> {this.props.approvedBy}</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PrintPurchaseOrder;
