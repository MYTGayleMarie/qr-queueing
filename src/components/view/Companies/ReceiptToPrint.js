import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';
import { getTime } from '../../../utilities/Common';

//logo image
import logo from '../../../images/logo-black.png';

//css 
import './InvoicePrint.css';

export class ReceiptToPrint extends React.PureComponent {
    render() {

        const marginTop="10px"
        const marginRight="10px"
        const marginBottom="10px"
        const marginLeft="20px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
        };

        var amount = this.props.paidAmount.split(".");
        var payment = this.props.payments.length == 1 ? this.props.payments[0] : this.props.payments[this.props.payments.length - 1];
        var addedOn = "";
        var updatedOn = "";

        if(payment != null) {
            var addedOndate = new Date(payment.added_on);
            var updatedOndate = new Date(payment.updated_on);
            var splitAddedOn = addedOndate.toDateString().split(" ");
            var splitUpdatedOn = updatedOndate.toDateString().split(" ");
            addedOn = splitAddedOn[1] + " " + splitAddedOn[2] + " " + splitAddedOn[3];
            updatedOn = splitUpdatedOn[1] + " " + splitUpdatedOn[2] + " " + splitUpdatedOn[3];
        }
        //conver amount to words
        function numToWords (number, isCentavos){
        
            let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
            'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
            let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        
          let num = ('0000000'+ number).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
            if(!num) return;
        
            let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
          
            outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
            outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
            outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
            outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 

            if(isCentavos && outputText != "") {
                return " and " + outputText + " centavos";
            }
        
            return outputText;
        }


      return (
        <div>
        <style>{getPageMargins()}</style>
        <div className="receipt-cont">
            <img src={logo} alt={'logo'} class="receipt-logo"></img>
            <h4 className="receipt-header">ACKNOWLEDGEMENT RECEIPT</h4>
            <h5 className="invoice-number-cont">N<span className="underline">o</span><span className="invoice-number-detail"> {payment != null ? payment.id : ""}</span></h5>
            <h5 className="date-cont"><span className="bold">DATE</span> {addedOn != null ? addedOn : updatedOn}</h5>
            
            <div className="receipt-details">
                <span className="received-from-cont">
                    <span className="received-from-label">Received From</span>
                    <span className="received-from-detail"> {this.props.name}</span>
                </span>
                <br/>
                <span className="received-from-cont">
                    <span className="received-from-label">Address: </span>
                    <span className="received-from-detail"> {this.props.address}</span>
                </span>
                <br/>
                <span className="received-from-cont">
                    <span className="received-from-label">the sum of pesos</span>
                    <span className="received-from-detail"> {numToWords(amount[0],false) + numToWords(amount[1], true)} <span className="decimal-amount-form">(Php {this.props.paidAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</span> </span>
                </span>
                <br/>
                <span className="received-from-cont">
                    <span className="received-from-label">in full/partial payment of </span>
                    <span className="received-from-detail"> {this.props.discountCode} </span>
                </span>
            </div>

            <div className="receipt-details-pre-footer">
                    {/* <div className="to-left">
                        <span className="received-from-label">PAYMENT TYPE: </span>
                        <span className="received-from-detail"> {payment.type}</span>
                    </div> */}
                    <div className="to-right">
                        <span className="received-from-label">BY _____________________</span>
                        <br/>
                        <span className="to-center signature-label">Authorized Signature</span>
                    </div>
            </div>

            <div className="receipt-details-footer">
                    <div className="to-left">
                        <span className="received-from-label"> PREPARED BY ________________________</span><br/>
                        <span className="received-from-label"> APPROVED BY ________________________</span><br/>
                        <span className="received-from-label"> RECEIVED BY ________________________</span><br/>
                        <br/>
                    </div>
            </div>
        </div>
        </div>
      );
    }
}
