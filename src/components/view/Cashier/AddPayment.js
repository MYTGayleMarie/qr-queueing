import React from 'react';

//css
import './AddPayment.css'

//components
import Header from '../../Header.js';

function AddPayment() {
    return (
        <div>
            <Header
             type="thin"
             title="ADD PAYMENT"
            />
            <h3 class="form-categories-header italic">PERSONAL DETAILS</h3>
        </div>
    )
}

export default AddPayment
