import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//css
import './Form2.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';


function Form2({ formData, setForm, navigation }) {

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Header 
            type="thin"
            title="ADD PATIENT"
            />
            <div className="booking-form">
            <form className="needs-validation">
            <div className="row clinical-services-container">
                <h3 className="form-categories-header italic">CLINICAL SERVICES</h3>

                <ServiceItems 
                category='CLINICAL MICROSCOPY' 
                formData={formData}
                setForm={setForm}
                navigation={navigation}/>

                </div>
                <div className="row large-gap">
                    <h3 className="form-categories-header italic">PACKAGES</h3>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="thyroid_package" name="thyroid_package" value="thyroid package"/><label for="thyroid_package" className="package-item">THYROID PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>
                </div>

                <div className="row summary-text">
                    <h3 className="form-categories-header italic medium-text ">TOTAL SUMMARY</h3>

                    <div className="row">
                        <div className="col-2">
                            1
                        </div>
                        <div className="col">
                            <p className="item">UNIRARY TEST</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <span className="price"><span className="currency">P</span> 430.00</span>
                        </div>
                    </div>
              
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-start">
                        <button className="back-btn" onClick={() => navigation.previous()}>BACK</button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                        <button className="proceed-btn">SAVE BOOKING</button>
                        </div>
                    </div>
                </div>

            </form>
            </div>
                
            </div>
        </div>
    )
}

export default Form2
