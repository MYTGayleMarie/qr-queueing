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

function Costing({data, deleteService}) {

    var totalCost = 0;

    const summary = data.map((row, index) => {

        totalCost += parseFloat(row.price);        

        return (
            
            <div class="row">
                <div className="col-sm-1 "><button className="delete-btn" onClick={() => deleteService(row.id)}><FontAwesomeIcon icon={"minus-square"} alt={"minus"} aria-hidden="true" className="delete-icon"/></button></div>
                <div className="col-sm-7 service">{row.lab_test ? row.lab_test : row.package_test }</div>
                <div className="col-sm-4 total-price">{row.price}</div>
            </div>
        )
    });

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
                        <span className="amount">P {totalCost.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Costing
