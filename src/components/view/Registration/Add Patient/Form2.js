import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Form2.css'

//components
import Header from '../../../Header.js';

function Form2() {

    const navigate = useNavigate();
    navigate('/add-patient');

    return (
        <div>
        <Header 
           type="thin"
           title="ADD PATIENT"
        />
        <div class="booking-form">
        <form class="needs-validation">
        <div class="row clinical-services-container">
                <h3 class="form-categories-header italic">CLINICAL SERVICES</h3>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Complete Blood Count (CBC)"/><label for="CBC" class="service-item">Complete Blood Count (CBC)</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Xray Examination"/><label for="Xray" class="service-item">XRAY EXAMINATION</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Electriocardiogram Test"/><label for="Electrocardiogram" class="service-item">ELECTROCARDIOGRAM TEST</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Sugar"/><label for="Sugar test" class="service-item">SUGAR TEST</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Pediatric Test"/><label for="Pediatric test" class="service-item">PEDIATRIC TEST</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="clinical_services" name="clinical_services" value="Packages"/><label for="Packages" class="service-item">PACKAGES</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>
                
            </div>
            <div class="row large-gap">
                <h3 class="form-categories-header italic">PACKAGES</h3>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="thyroid_package" name="thyroid_package" value="thyroid package"/><label for="thyroid_package" class="package-item">THYROID PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="pregnancy_package" name="pregnancy_package" value="pregnancy package"/><label for="pregnancy_package" class="package-item">PREGNANCY PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="pediatrician_package" name="pediatrician_package" value="pediatrician package"/><label for="pediatrician_package" class="package-item">PEDIATRICIAN PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="company_package" name="company_package" value="company package"/><label for="company_package" class="package-item">COMPANY PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="package-item" name="package-item" value="package item"/><label for="package-item" class="package-item">KIDNEY PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <input type="checkbox" id="checkup_package" name="checkup_package" value="checkup package"/><label for="checkup_package" class="package-item">CHECKUP PACKAGE</label>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <span class="price">P 430</span>
                    </div>
                </div>
                
            </div>

            <div class="row summary-text">
                <h3 class="form-categories-header italic medium-text ">TOTAL SUMMARY</h3>

                <div class="row">
                    <div class="col-2">
                        1
                    </div>
                    <div class="col">
                        <p class="item">UNIRARY TEST</p>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class="price"><span class="currency">P</span> 430.00</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-2">
                        2
                    </div>
                    <div class="col">
                        <p class="item">COMPLETE BLOOD COUNT</p>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class="price"><span class="currency">P</span> 430.00</span>
                    </div> 
                </div>

                <div class="row">
                    <div class="col-2">
                        3
                    </div>
                    <div class="col">
                        <p class="item">PACKAGE 1</p>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class="price"><span class="currency">P</span> 430.00</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h4 class="total-label">TOTAL</h4>
                    </div>
                    <div class="col">
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class="price bold"><span class="currency">P</span> 2580.00</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="d-flex justify-content-start">
                    <button class="back-btn" onClick={navigate}>BACK</button>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="d-flex justify-content-end">
                    <button class="proceed-btn">SAVE BOOKING</button>
                    </div>
                </div>
            </div>

        </form>
        </div>
            
        </div>
    )
}

export default Form2
