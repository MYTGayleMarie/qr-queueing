import React from 'react';

//css
import './Costing.css'

function Costing({data}) {

    var totalCost = 0;

    const summary = data.map((row, index) => {

        totalCost += parseFloat(row.totalPrice);

        return (
            <div class="row">
                <div className="col-sm-4 quantity">{row.quantity}</div>
                <div className="col-sm-4 service">{row.service.toUpperCase()}</div>
                <div className="col-sm-4 total-price">{row.totalPrice}</div>
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
