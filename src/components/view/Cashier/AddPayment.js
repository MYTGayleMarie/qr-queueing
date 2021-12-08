import React, { useState } from "react";
//css
import './AddPayment.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import PersonalDetails from '../../PersonalDetails';
import Costing from '../../Costing';

const patientData = 
    {
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        middleName: 'Dela Flores',
        dateOfBirth: 'March 23, 2020',
        sex: "female",
        age: '20',
        contactNumber: "0992910291",
        email: "jjdelacruz@gmail.com",
        address: "Mandaue City, Cebu Philippines"
    };

const costingData = [
    {
        quantity: '1',
        service: 'Unirary Test',
        totalPrice: '430.10'
    },
    {
        quantity: '1',
        service: 'Complete Blood Count',
        totalPrice: '430.00'
    },
];

function cashForm() {
    return (
        <div class="pay-cash-cont">
                <div className="row">
                    <div className="col-sm-6">
                         <div className="row">
                            <span class="amount-label">AMOUNT</span>
                        </div>
                        <div className="row">
                            <input type="number" id="payAmount" name="payAmount" class="cash-input pay" placeholder="P"/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <span class="amount-label">CHANGE</span>
                        </div>
                        <div className="row">
                            <input type="number" id="changeAmount" name="changeAmount" class="cash-input pay"  placeholder="P"/>
                        </div>
                    </div>
                </div>
         </div>       
        )
    }

function checkForm () {
    return (
    <div class="pay-check-cont">
        <span class="check-label">CARD NUMBER</span>
        <input type="number" id="check" name="check" class="check"/>
    </div>
    )
}
    

function AddPayment() {

    const [payment, setPayment] = useState("");

    return (
        <div>
            <Navbar/>
            <div className="active-cont">
                <Header
                type="thin"
                title="ADD PAYMENT"
                />
                <PersonalDetails
                    data={patientData}
                />
                <Costing
                    data={costingData}
                />

                <div className="payment-cont">
                    <h1 className="payment-label">PAYMENT</h1>

                    <span className="method-label">METHOD</span>
                    <input type="radio" id="cash" name="payment_method" value="cash" onClick={()=> setPayment('cash')}/>
                    <span className="cash method">CASH</span>
                    <input type="radio" id="check" name="payment_method" value="check" onClick={()=> setPayment('check')}/>
                    <span className="check method">CHECK</span>

                    <form>
                        <p>{payment === 'cash' && cashForm()}</p>
                        <p>{payment === 'check' && checkForm()}</p>

                        <div className="row d-flex justify-content-end">
                            <button className="save-btn">SAVE BOOKING</button>
                        </div>
                    </form>
                    
                </div>



            </div>
        </div>
    )
}

export default AddPayment
