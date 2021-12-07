import React from 'react';

//css
import './AddPayment.css'

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';

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

            </div>
        </div>
    )
}

export default AddPayment
