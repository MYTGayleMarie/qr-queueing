import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';

//css
import './PrintPurchaseOrder.css';

//logo image
import logo from '../../../images/logo-black.png';

export class PrintPurchaseOrderInvoice extends React.PureComponent {
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
                {parseFloat(data.amount).toFixed(2)}
            </td>
            <td className="text-right">
                {parseFloat(data.total).toFixed(2)}
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
                <div className="print-area-receives">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="po-logo"></img>
                    </div>
                    <div className='row'>
                        <h1 className='table-header-po'>Receive Invoice #{this.props.id} for Purchase Order #{this.props.poId} Details</h1>
                        <table>
                            <tr>
                                <td className="po-gap"><span className="header-po">Supplier</span><span className="detail-po"> {this.props.supplier}</span></td>
                                <td><span className="header-po">Purchase Date</span><span className="detail-po"> {purchaseDateformat.toDateString()}</span> </td>
                                <td><span className="header-po">Delivery Date</span><span className="detail-po"> {deliveryDateformat.toDateString()}</span> </td>
                            </tr>
                            <tr>
                                <td><span className="header-po">Requisitioner</span><span className="detail-po"> {this.props.requisitioner}</span></td>
                                <td><span className="header-po">Forwarder</span><span className="detail-po"> {this.props.forwarder}</span></td>
                                <td><span className="header-po">Delivery Address</span><span className="detail-po"> {this.props.deliveryAddress}</span> </td>
                            </tr>
                            <tr>
                                <td><span className="header-po">Remarks</span><span className="detail-po">{this.props.remarks}</span></td>
                            </tr>
                        </table>
                    </div>
                    <hr></hr>
                    <div className='row print-po-row'>
                        <h1 className='table-header-po'>List of Received Purchased Items</h1>
                        <table>
                            <tr>
                                <th>ITEM</th>
                                <th>QTY</th>
                                <th>UNIT</th>
                                <th>COST</th>
                                <th>TOTAL</th>
                            </tr>
                            {listItems}
                        </table>
                    </div>
        
                    <div className='po-print-breakdown-cont'>
                        <span className='print-label po-print-breakdown'><b> GRANDTOTAL </b></span><span> {this.props.receivePo.grand_total}</span>
                    </div>

                    <br/>

                    <div className='po-print-payment-cont'>
                        <span className='print-label po-print-payment-type'><b> PAID AMOUNT </b></span><span> {this.props.receivePo.paid_amount}</span>
                    </div>

                    <br/>

                    <div className="po-print-approval-cont">
                        <div className='po-print-approval'>
                            <span className='print-label'><b>PRINTED BY</b></span>
                            <span> {this.props.printedBy}</span>
                        </div>
                        <div className='po-print-approval'>
                            <span className='print-label'><b>APPROVED BY</b></span>
                            <span> {this.props.approvedBy}</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PrintPurchaseOrderInvoice;
