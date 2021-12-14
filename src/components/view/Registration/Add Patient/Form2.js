import React from 'react';
import Axios from 'axios';

//css
import './Form2.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';


/*********************************
 * SERVICES
 ********************************/

const clincalMicroscopy = [
    {   
        //key: name + categoryId
        key: 'Urinalysis1',
        name: 'Urinalysis',
        categoryId: '1',
        labTestId: '1', 
        price: '70'
    },    
    {
        key: 'UrineKetone1',
        name: 'Urine Ketone',
        categoryId: '1',
        labTestId: '2', 
        price: '70'
    },  
    {
        key: 'UrineRBCMorphology1',
        name: 'Urine RBC Morphology',
        categoryId: '1',
        labTestId: '3', 
        price: '150'
    },  
    {
        key: 'Fecalysis1',
        name: 'Fecalysis',
        categoryId: '1',
        labTestId: '4', 
        price: '50'
    },  
    {
        key: 'FecalOccultBlood1',
        name: 'Fecal Occult Blood',
        categoryId: '1',
        labTestId: '5', 
        price: '350'
    },  
    {
        key: 'PregnacyTest1',
        name: 'Pregnancy Test (RPK-Lateral Flow)',
        categoryId: '1',
        labTestId: '6', 
        price: '140'
    },  
    {
        key: 'SpermAnalysis1',
        name: 'Sperm Analysis',
        categoryId: '1',
        labTestId: '7', 
        price: '350'
    },  
];

const hematology = [
    {
        name: 'CBC with Platelet',
        categoryId: '2',
        labTestId: '8', 
        price: '200'
    },   
    {
        name: 'WBC Differential',
        categoryId: '2',
        labTestId: '9', 
        price: '180'
    },   
    {
        name: 'Hematocrit, PLT',
        categoryId: '2',
        labTestId: '10', 
        price: '180'
    }, 
    {
        name: 'Hemoglobin, Hematocrit',
        categoryId: '2',
        labTestId: '11', 
        price: '180'
    }, 
    {
        name: 'Forward and reverse ABO group (Blood Typing)',
        categoryId: '2',
        labTestId: '12', 
        price: '150'
    }, 
    {
        name: 'Erythrocyte Sedimentation Rate (ESR)',
        categoryId: '2',
        labTestId: '13', 
        price: '170'
    }, 
    {
        name: 'Peripheral Blood Smear/Special Hematology',
        categoryId: '2',
        labTestId: '14', 
        price: '420'
    }, 
    {
        name: 'Clotting & Bleeding Time',
        categoryId: '2',
        labTestId: '15', 
        price: '180'
    }, 
    {
        name: 'Reticulocyte Count/Retics',
        categoryId: '2',
        labTestId: '16', 
        price: '300'
    }, 
];


/*********************************
 * FUNCTIONS
 ********************************/

//VARIABLES
var itemDetails; 


function getDetails(categoryItems, checkedItem) {

   categoryItems.map((data, index) => {
        if(data.key == checkedItem) {

            itemDetails = {
                categoryId: data.categoryId,
                labTestId: data.labTestId,
                price: data.price,
            }
            return itemDetails;
        }
    });
}

// function submit() {
//     Axios.post(url,{
//         fname: customer.fname,
//         lname: customer.lname, 
//         mname: customer.mname, 
//         sex: customer.sex, 
//         birthDate: customer.birthDate, 
//         email: customer.email, 
//         contactNum: customer.contactNum, 
//         address: customer.address, 
//         serviceLocation: customer.serviceLocation, 
//         result: customer.result, 
//         dateOfTesting: customer.dateOfTesting,
//     })
// }


/*********************************
 * RENDER VIEW
 ********************************/

function Form2({ service, customer, setServices, navigation }) {

    const asArray = Object.entries(service)
    const checkedServices = asArray.filter(([key,value]) => value == true);
    var checkedServicesDetails = [];

    checkedServices.map((data, index) => {
        var categoryId = parseInt(data[0].charAt(data[0].length-1));
        
        switch(categoryId) {
            case 1:
                getDetails(clincalMicroscopy, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
        }
    });

    console.log(customer);
    console.log(checkedServicesDetails);


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
                items={clincalMicroscopy}
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='HEMATOLOGY'
                items={hematology} 
                formData={service}
                setForm={setServices}
                />


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
