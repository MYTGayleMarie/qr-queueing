import React, {useState} from 'react';
import axios from 'axios';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import ServiceItems from '../../../ServiceItems';
import { getAnnualWellnessPackageBasic,
    getPregnancyLabPackage,
    getPreEmploymentDiscount,
    getPreEmploymentBasic,
    getLiverFunctionTestPackage,
    getAnnualWellnessPackagePremium,
    getDiabetesandCholesterolPackage,
    getThyroidTestPackage,
    getClinicalMicroscopy,
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

//VARIABLES
var itemDetails; 
var newLabTotal = 0;
var newPackageTotal = 0;
var labDiscountedTotal = 0;
var packageDiscountedTotal = 0;
const userToken = getToken();
const userId = getUser();


//Package
const preEmploymentPackageBasic = getPreEmploymentBasic();
const preEmploymentPackageDiscount = getPreEmploymentDiscount();
const pregnancyLabPackage = getPregnancyLabPackage();
const annualWellnessPackageBasic = getAnnualWellnessPackageBasic();
const thyroidTestPackage = getThyroidTestPackage();
const annualWellnessPackagePremium = getAnnualWellnessPackagePremium();
const liverFunctionTest = getLiverFunctionTestPackage();
const diabetesAndCholesterolPackage = getDiabetesandCholesterolPackage();

//Lab Services
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


function OldPatientForm2({service, customer, packagePrice, labPrice,  setPackagePrice, setLabPrice, isService, isPackage, discount, setDiscount, isCompany, setServices, lastMeal, navigation, serviceFee, mdCharge, discountDetails }) {
    document.body.style = 'background: white;';
    window.scrollTo(0, 0);

    //states
    const [appliedTo, setAppliedTo] = useState([]);
     //functions
     function getDetails(categoryItems, checkedItem) {
        categoryItems.map((data, index) => {
             if(data.key == checkedItem) {
     
                 itemDetails = {
                     name: data.name,
                     categoryId: data.categoryId,
                     labTestId: data.labTestId,
                     price: data.price,
                     type: data.type,
                 }
                 return itemDetails;
             }
         });
     }

//Checked Services
var totalPrice = 0;
var discountedTotalPrice = 0;
const asArray = Object.entries(service)
const checkedServices = asArray.filter(([key,value]) => value == true);
var checkedServicesDetails = [];
var totalMDCharge = 0;

if(mdCharge.physical_exam == true) {
  totalMDCharge += 50.00;
}

if(mdCharge.medical_certificate == true) {
  totalMDCharge += 50.00;
}

checkedServices.map((data, index) => {
    var categoryDetails = data[0].split("_");
    var categoryId = parseInt(categoryDetails[1]);

    //servies
    switch(categoryDetails[1]) {
        case "package1":
            getDetails(preEmploymentPackageBasic, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package2":
            getDetails(preEmploymentPackageDiscount, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package3":
            getDetails(pregnancyLabPackage, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package4":
            getDetails(annualWellnessPackageBasic, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package5":
            getDetails(thyroidTestPackage, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package6":
            getDetails(annualWellnessPackagePremium, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package7":
            getDetails(liverFunctionTest, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
        case "package8":
            getDetails(diabetesAndCholesterolPackage, data[0])
            checkedServicesDetails.push(itemDetails);
        break;
    }


   //lab
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

React.useEffect(() => {
    if(discountDetails != null) {
        discountDetails.map((data, index) => {
            appliedTo.length = 0;
            if(data.type == "service") {
                axios({
                    method: 'post',
                    url: window.$link + 'lab_tests/show/' + data.source_id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (response) {
                    console.log(response.data.name);
                    setAppliedTo(oldArray => [...oldArray, response.data.name]);
                });
            } else {
                axios({
                    method: 'post',
                    url: window.$link + 'packages/show/' + data.source_id,
                    withCredentials: false, 
                    params: {
                        api_key: window.$api_key,
                        token: userToken.replace(/['"]+/g, ''),
                        requester: userId,
                    }
                }).then(function (response) {
                    console.log(response.data.name);
                    setAppliedTo(oldArray => [...oldArray, response.data.name]);
                });
            }
        });
    }

},[discountDetails]);


//Total discount labs/packages
    checkedServicesDetails.map((data, index) => {
        console.log(data);

        //To insert condition for discount for specific labs/packages
        if(index == 0) {
            labDiscountedTotal = 0;
            packageDiscountedTotal = 0;
        }

        discountDetails.map((detail) => {
            if(data.type == 'lab' && detail.type == 'service') {
                if(data.labTestId == detail.source_id) {
                    discountedTotalPrice += parseFloat(data.price);
                }
            }
            else if (data.type == 'package' && detail.type == 'package') {
                if(data.packageId == detail.source_id) {
                   discountedTotalPrice += parseFloat(data.price);
                }
            }
        });
    
    });


checkedServicesDetails.map((data, index) => {
    console.log(data);
    //To insert condition for discount for specific labs/packages
    if(index == 0) {
        newLabTotal = 0;
        labDiscountedTotal = 0;
        newPackageTotal = 0;
        packageDiscountedTotal = 0;
        setLabPrice(0);
        setPackagePrice(0);
    }

    if(data.type == 'lab') {
        if(discountDetails.length != 0 ) {
            discountDetails.map((detail) => {
                if(detail.source_id != data.labTestId && detail.type == "service") {
                    newLabTotal += parseFloat(data.price);
                    setLabPrice(newLabTotal);
                }
            });
        } else {
            newLabTotal += parseFloat(data.price);
            setLabPrice(newLabTotal);
        }
    }
    else if (data.type == 'package') {
        if(discountDetails.length != 0) {
            discountDetails.map((detail) => {
                if(detail.source_id != data.labTestId && detail.type == "package") {
                    newPackageTotal += parseFloat(data.price);
                    setPackagePrice(newPackageTotal);
                }
            });
        } else {
            newPackageTotal += parseFloat(data.price);
            setPackagePrice(newPackageTotal);
        }
    }
    totalPrice += parseFloat(data.price);
});

    return (
    <div>
        <Navbar/>
        <div className="active-cont">

            <Header 
            type="thin"
            title="ADD BOOKING"
            />

            <div className="booking-form">
            <form className="needs-validation">
            <div className="row clinical-services-container">
                <div className='col-sm-6'>
                    <h3 className="form-categories-header italic">PACKAGES</h3>
                </div>
                <div className='col-sm-6'>
                    <div className="d-flex justify-content-end">
                        <button 
                            className="skip-btn" 
                            onClick={() => navigation.next()}
                        >
                        SKIP
                        </button>
                    </div>
                </div>

                <ServiceItems 
                category='PRE EMPLOYMENT PACKAGE'
                items={preEmploymentPackageBasic} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='PRE EMPLOYMENT PACKAGE (Group Discounts 15 pax or more)'
                items={preEmploymentPackageDiscount} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='PREGNANCY LAB PACKAGE'
                items={pregnancyLabPackage} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='ANNUAL WELLNESS PACKAGE BASIC'
                items={annualWellnessPackageBasic} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='ANNUAL WELLNESS PACKAGE PREMIUM'
                items={annualWellnessPackagePremium} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='THYROID TEST PACKAGE'
                items={thyroidTestPackage} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='LIVER FUNCTION TEST'
                items={liverFunctionTest} 
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='DIABETES AND CHOLESTEROL PACKAGE'
                items={diabetesAndCholesterolPackage} 
                formData={service}
                setForm={setServices}
                />

                </div>

                <div className="row summary-text">
                    <h3 className="form-categories-header italic medium-text ">TOTAL SUMMARY</h3>

                    {checkedServicesDetails.map((data, index) => (
                        <div className="row">
                           <div className="col-2">
                               {index + 1}
                           </div>
                           <div className="col">
                               <p className="item">{data.name}</p>
                           </div>
                           <div className="col d-flex justify-content-end">
                               <span className="price"><span className="currency">P</span> {parseFloat(data.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                           </div>
                       </div>
                    ))}
                </div>

                    <div className="col d-flex justify-content-end">
                        {isCompany == false && discount != "" && discountDetails.length == 0 && (
                             <span className="total-price"><b>DISCOUNT {
                                discount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})
                            }%</b></span>
                        )}
                         {isCompany == false && discount != "" && discountDetails.length != 0 && (
                             <span className="total-price"><b>DISCOUNT {
                                discount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})
                            }%</b> for only {appliedTo.map((data, index) => {
                                if(appliedTo.length == 1 ) {
                                    return data 
                                } 
                                else if (appliedTo.length - 1 == index ) {
                                    return ", and " + data
                                }
                                else {
                                    return data + ", "
                                } 
                            })}</span>
                        )}
                         {isCompany != false && discount != "" && (
                             <span className="total-price"><b>DISCOUNT P{
                                discount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})
                            }</b></span>
                        )}
                    </div>

                {totalMDCharge != 0 && (
                 <div className="col d-flex justify-content-end">
                     <span className="total-price"><b>MEDICAL CHARGE P {parseFloat(totalMDCharge).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                 </div>
                )}
                    
                {serviceFee != "" && (
                 <div className="col d-flex justify-content-end">
                     <span className="total-price"><b>SERVICE FEE P {parseFloat(serviceFee).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                 </div>
                )}
                
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>SUBTOTAL P {totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                </div>

                <div className="row">
                    {isCompany == false && discountedTotalPrice != 0 && totalPrice != 0  && (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge)) - (discountedTotalPrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == false && isPackage == true && totalPrice != 0  && (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge)) - (packagePrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                      {isCompany == false && isService == true && totalPrice != 0  &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge))  - (labPrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == false && isService != true && totalPrice != 0 && isPackage != true && discountedTotalPrice == 0 && (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge))  - ((totalPrice) * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == true && discountedTotalPrice != 0 && totalPrice != 0 && (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge)) - (discountedTotalPrice - discount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == true && isPackage == true && totalPrice != 0  &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge)) +  (packagePrice - discount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                     {isCompany == true && isService == true && totalPrice != 0  &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge))  +  (labPrice - discount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                     {isCompany == true && isService != true && isPackage != true && totalPrice != 0 && discountedTotalPrice == 0 &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {((totalPrice + parseFloat(serviceFee) + parseFloat(totalMDCharge)) - discount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-start">
                        <button className="back-btn" onClick={() => navigation.previous()}>BACK</button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                            <button 
                                className="proceed-btn" 
                                onClick={() => navigation.next()}
                            >
                            PROCEED
                            </button>
                        </div>
                    </div>
                </div>

            </form>
            </div>
                
            </div>
        </div>
    )
}

export default OldPatientForm2
