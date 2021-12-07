import React from 'react';

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
    

function AddPayment() {
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
                    <input type="radio" id="cash" name="cash" value="cash"/>
                    <span className="cash method">CASH</span>
                    <input type="radio" id="check" name="check" value="check"/>
                    <span className="check method">CHECK</span>

                    <div class="pay-cash-cont">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="row">
                                    <span class="amount-label">AMOUNT:</span>
                                </div>
                                <div className="row">
                                    <input type="number" id="payAmount" name="payAmount" class="cash-input pay" placeholder="P"/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="row">
                                    <span class="amount-label">CHANGE:</span>
                                </div>
                                <div className="row">
                                    <input type="number" id="changeAmount" name="changeAmount" class="cash-input pay" placeholder="P"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-end">
                        <button className="save-btn">SAVE BOOKING</button>
                    </div>
                    
                </div>



            </div>
        </div>
    )
}

export default AddPayment
