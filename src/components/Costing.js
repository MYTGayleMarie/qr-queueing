import React, { useState } from "react";
import { getToken, getUser } from "../utilities/Common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

//css
import './Costing.css';

//icons
import cancelIcon from '../images/cancel.png';

const userToken = getToken();
const userId = getUser();

function Costing({data, deleteService, withDiscount, total, setTotal, grandTotal, serviceFee, mdCharge, setGrandTotal, setDiscount, discount, toPay, paymentStatus}) {

    var totalCost = 0;
    var labTotal = 0;


    const summary = data.map((row, index) => {

        if(row.price == null) {
            totalCost += parseFloat(0);  
        } else {
            totalCost += parseFloat(row.price); 
        } 
        
        if(row.type == "lab") {
            labTotal += parseFloat(row.price);
        }

        setTotal(total);

        return (
            
            <div class="row">
                {toPay != false && (
                    <div className="col-sm-1 "><button className="delete-btn" onClick={() => deleteService(row.id)}><FontAwesomeIcon icon={"minus-square"} alt={"minus"} aria-hidden="true" className="delete-icon"/></button></div>
                )}
                <div className="col-sm-7 service">{row.lab_test ? row.lab_test : row.package }</div>
                <div className="col-sm-4 total-price">P {row.price ? parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) : "0.00"}</div>
            </div>
        )
    });

  

    function discountedPrice() {

        if(withDiscount != '') {
            const discount = labTotal.toFixed(2) * 0.20;
        }
        const grandTotal = parseFloat(total).toFixed(2) - discount;
    
        console.log(discount)

        return (
            <div>
                <div className="row">
                        <div className="col-sm-4">
                            <span class="summary-total-label">DISCOUNT</span>
                        </div>
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <span className="amount">P {parseFloat(discount).toFixed(2)}</span>
                        </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="summary-label">TOTAL SUMMARY OF CLINICAL SERVICES AND COSTING</h1>
            <div className="summary-services">
                {summary}
            </div>
            <div className="summary-total">
                <div className="row">
                    <div className="col-sm-4">
                        <span class="summary-total-label">TOTAL</span>
                    </div>
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <span className="amount">P {parseFloat(total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                    </div>
                </div>

                {mdCharge != null && (
                  <div className="row">
                     <div className="col-sm-4">
                         <span class="summary-total-label">MEDICAL CHARGE</span>
                     </div>
                     <div className="col-sm-4">
                     </div>
                     <div className="col-sm-4">
                         <span className="amount">P {parseFloat(mdCharge).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                     </div>
                  </div>
                )}

                {serviceFee != null && (
                <div className="row">
                    <div className="col-sm-4">
                        <span class="summary-total-label">SERVICE FEE</span>
                    </div>
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        <span className="amount">P {parseFloat(serviceFee).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                    </div>
                 </div>
                )}

                <div>{discount != '' && discountedPrice()}</div>

                <div className="row">
                        <div className="col-sm-4">
                            <span class="summary-total-label">GRAND TOTAL</span>
                        </div>
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <span className="amount">P {parseFloat(grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default Costing
