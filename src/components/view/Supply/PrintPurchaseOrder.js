import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';
// import { adminSign } from "./Signatures";
//css
import './PrintPurchaseOrder.css';

//logo image
import logo from '../../../images/logo-black.png';
import { adminSign, poSign } from "./Signatures";

export class PrintPurchaseOrder extends React.PureComponent {
    render() {
      let signaturePrintedBy;
      if(this.props.printedBy==="Leanne Julio"){
        signaturePrintedBy = <img src={adminSign} alt="adminSign" className="signature-printedby" />
      }
      else if(this.props.printedBy==="Purchase Order Officer"){
        signaturePrintedBy = <img src={poSign} alt="adminSign" className="signature-printedby" />
      }  
      let signatureApprovedBy;
      if(this.props.approvedBy==="Leanne Julio"){
        signatureApprovedBy = <img src={adminSign} alt="adminSign" className="signature-approvedby" />
      } 

    //components
    const listItems = this.props.poItems.map((data,index) => {
        return (
        <tr className="po-items-list">
            <td>
                {data.item}
            </td>
            <td className="po-items-float">
                {parseFloat(data.qty).toFixed(2)}                
            </td>
            <td className="po-items-float">
                {parseFloat(data.inventory_qty).toFixed(2)}                
            </td>
            <td className="po-items-float">
                {parseFloat(data.received).toFixed(2)}                
            </td>
            <td>
                {data.unit}
            </td>
            <td className="po-items-float">
                {data.amount}
            </td>
            <td className="po-items-float">
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
                <div className="print-area-po">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="po-logo"></img>
                    </div>
                    <div className='row'>
                        <h1 className='table-header-po'>Purchase Order #{this.props.id} Details</h1>
                        <hr></hr>
                        <table>
                            <tr>
                                <td className="po-gap"><span className="header-po">Supplier: </span><span className="detail-po"> {this.props.supplier}</span></td>
                            </tr>
                        </table> 
                        <table>
                            <tr>
                                <td><span className="header-po">Purchase Date: </span><span className="detail-po"> {purchaseDateformat.toDateString()}</span> </td>
                                <td><span className="header-po">Delivery Date: </span><span className="detail-po"> {deliveryDateformat.toDateString()}</span> </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td><span className="header-po">Delivery Address: </span><span className="detail-po"> {this.props.deliveryAddress}</span> </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td><span className="header-po">Remarks: </span><span className="detail-po">{this.props.remarks}</span></td>
                            </tr>   
                        </table>
                    </div>
                    <hr></hr>
                    <div className='row print-po-row'>
                        <h1 className='table-header-po'>List of Purchased Items</h1>
                        <table className="table-header">
                            <tr>
                                <th>ITEM</th>
                                <th>QTY</th>
                                <th>INVENTORY QTY</th>
                                <th>RECEIVED QTY</th>
                                <th>UNIT</th>
                                <th>AMOUNT</th>
                                <th>DISCOUNT</th>
                            </tr>
                            {listItems}
                        </table>
                    </div>
         
                    <div className='po-print-breakdown-cont'>
                        <div className='print-label po-print-breakdown'><b>SUBTOTAL </b></div><div className="margin-right-2"> {this.props.subTotal}</div>
                    </div><br />
                    <div className='po-print-breakdown-cont'>
                        <div className='print-label po-print-breakdown'><b> GRANDTOTAL </b></div><div className="margin-right-2"> {this.props.grandTotal}</div>
                    </div>

                    <hr></hr>

                    <div className="po-print-approval-cont">
                      {signaturePrintedBy} {signatureApprovedBy} <br/>
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

export default PrintPurchaseOrder;
