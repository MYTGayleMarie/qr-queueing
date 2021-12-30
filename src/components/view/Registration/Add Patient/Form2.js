import React from 'react';
import axios from 'axios';

//css
import './Form2.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';
import { getToken } from '../../../../utilities/Common';
import { getClinicalMicroscopy,
         getHematology, 
         getElectrolytes, 
         getGlucoseTests, 
         getKidneyFunctionTests,
         getLipidProfile,
         getPacreaticTests,
         getLiverFunctionTests,
         getImmunology,
         getHepatitisProfileScreening,
         getThyroidProfile,
         getTumorMarkers,
         getHistopathology,
         getCOVIDRapidTests,
         getMicrobiology,
         getXray,
         getCardiology,
         getMedicalCertificate,
         getUltrasound } from '../../../../services/services';

/*********************************
 * FUNCTIONS
 ********************************/

//VARIABLES
var itemDetails; 
const userToken = getToken();
const clincalMicroscopy = getClinicalMicroscopy();
const hematology = getHematology();
const electrolytes = getElectrolytes();
const glucoseTests = getGlucoseTests();
const kidneyFunctionTests = getKidneyFunctionTests();
const lipidProfile = getLipidProfile();
const pancreaticTests = getPacreaticTests();
const liverFunctionTests = getLiverFunctionTests();
const immunology = getImmunology();
const hepatitisProfileScreening = getHepatitisProfileScreening();
const thyroidProfile = getThyroidProfile();
const tumorMarkers = getTumorMarkers();
const histopathology = getHistopathology();
const COVIDRapidTests = getCOVIDRapidTests();
const microbiology = getMicrobiology();
const xray = getXray();
const cardiology = getCardiology();
const medicalCertificate = getMedicalCertificate();
const ultrasound = getUltrasound();


function getDetails(categoryItems, checkedItem) {

   categoryItems.map((data, index) => {
        if(data.key == checkedItem) {

            itemDetails = {
                name: data.name,
                categoryId: data.categoryId,
                labTestId: data.labTestId,
                price: data.price,
            }
            return itemDetails;
        }
    });
}

function submit(e, customer, services) {
    e.preventDefault();
    axios({
        method: 'post',
        url: window.$link + 'customers/create',
        withCredentials: false, 
        params: {
            token: userToken,
            api_key: window.$api_key, 
            first_name: customer.fname,
            last_name: customer.lname,
            middle_name: customer.mname, 
            suffix: '',
            birthdate: customer.birthDate,
            contact_no: customer.contactNum,
            email: customer.email,
            gender: customer.sex, 
            address: customer.address,
            emergency_contact: '',
            emergency_contact_no: '',
            relation_w_contact: '',
            remarks: '',
            added_by: '1',
        }
    }).then(function (response) {
        services.map((service, index) => {
            axios({
                method: 'post',
                url: window.$link + 'lab_tests/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: window.$api_key, 
                    name: service.name,
                    category: service.categoryId,
                    price: service.price,
                    remarks: '',
                    added_by: 1, 
                }
            }).then(function (response) {
                console.log(response.data);
            })
        });
    })
}


/*********************************
 * RENDER VIEW
 ********************************/

function Form2({ service, customer, setServices, navigation }) {

    const asArray = Object.entries(service)
    const checkedServices = asArray.filter(([key,value]) => value == true);
    var checkedServicesDetails = [];

    checkedServices.map((data, index) => {
        var categoryDetails = data[0].split("_");
        var categoryId = parseInt(categoryDetails[1]);
        
        switch(categoryId) {
            case 1:
                getDetails(clincalMicroscopy, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 2:
                getDetails(hematology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 4:
                getDetails(electrolytes, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 5:
                getDetails(glucoseTests, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 6:
                getDetails(kidneyFunctionTests, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 7:
                getDetails(lipidProfile, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 8:
                getDetails(pancreaticTests, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 9:
                getDetails(liverFunctionTests, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 11:
                getDetails(immunology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 12:
                getDetails(hepatitisProfileScreening, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 13:
                getDetails(thyroidProfile, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 14:
                getDetails(tumorMarkers, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 15:
                getDetails(histopathology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 16:
                getDetails(COVIDRapidTests, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 17:
                getDetails(microbiology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 18:
                getDetails(xray, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 19:
                getDetails(cardiology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 20:
                getDetails(medicalCertificate, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 21:
                getDetails(ultrasound, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
        }
    });

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
            <form className="needs-validation" onSubmit={(e) => submit(e, customer, checkedServicesDetails)}>
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

                <ServiceItems 
                category='ELECTROLYTES'
                items={electrolytes} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='GLUCOSE TESTS'
                items={glucoseTests} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='KIDNEY FUNCTION TESTS'
                items={kidneyFunctionTests} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='LIPID PROFILE'
                items={lipidProfile} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='PANCREATIC TEST'
                items={pancreaticTests} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='LIVER FUNCTION TESTS'
                items={liverFunctionTests} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='IMMUNOLOGY'
                items={immunology} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='HEPATITIS PROFILE SCREENING'
                items={hepatitisProfileScreening} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='THYROID PROFILE'
                items={thyroidProfile} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='TUMOR MARKERS'
                items={tumorMarkers} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='HISTOPATHOLOGY'
                items={histopathology} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='COVID Rapid Tests'
                items={COVIDRapidTests} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='MICROBIOLOGY'
                items={microbiology} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='XRAY'
                items={xray} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='CARDIOLOGY'
                items={cardiology} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='MEDICAL CERTIFICATE'
                items={medicalCertificate} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='ULTRASOUND'
                items={ultrasound} 
                formData={service}
                setForm={setServices}
                />


                </div>
                {/* <div className="row large-gap">
                    <h3 className="form-categories-header italic">PACKAGES</h3>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="checkbox" id="thyroid_package" name="thyroid_package" value="thyroid package"/><label for="thyroid_package" className="package-item">THYROID PACKAGE</label>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <span className="price">P 430</span>
                        </div>
                    </div>
                </div> */}

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
