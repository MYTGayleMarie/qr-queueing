import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//css
import './Form2.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';


function Form2() {

    const navigate = useNavigate();
    navigate('/add-patient');

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

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Complete Blood Count (CBC)"/><label for="CBC" className="service-item">Complete Blood Count (CBC)</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Xray Examination"/><label for="Xray" className="service-item">XRAY EXAMINATION</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Electriocardiogram Test"/><label for="Electrocardiogram" className="service-item">ELECTROCARDIOGRAM TEST</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Sugar"/><label for="Sugar test" className="service-item">SUGAR TEST</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Pediatric Test"/><label for="Pediatric test" className="service-item">PEDIATRIC TEST</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="clinical_services" name="clinical_services" value="Packages"/><label for="Packages" className="service-item">PACKAGES</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>
                    
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

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="pregnancy_package" name="pregnancy_package" value="pregnancy package"/><label for="pregnancy_package" className="package-item">PREGNANCY PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="pediatrician_package" name="pediatrician_package" value="pediatrician package"/><label for="pediatrician_package" className="package-item">PEDIATRICIAN PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="company_package" name="company_package" value="company package"/><label for="company_package" className="package-item">COMPANY PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="package-item" name="package-item" value="package item"/><label for="package-item" className="package-item">KIDNEY PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="checkup_package" name="checkup_package" value="checkup package"/><label for="checkup_package" className="package-item">CHECKUP PACKAGE</label>
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

                    <div className="row">
                        <div className="col-2">
                            2
                        </div>
                        <div className="col">
                            <p className="item">COMPLETE BLOOD COUNT</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <span className="price"><span className="currency">P</span> 430.00</span>
                        </div> 
                    </div>

                    <div className="row">
                        <div className="col-2">
                            3
                        </div>
                        <div className="col">
                            <p className="item">PACKAGE 1</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <span className="price"><span className="currency">P</span> 430.00</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="total-label">TOTAL</h4>
                        </div>
                        <div className="col">
                        </div>
                        <div className="col d-flex justify-content-end">
                            <span className="price bold"><span className="currency">P</span> 2580.00</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-start">
                        <button className="back-btn" onClick={navigate}>BACK</button>
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
