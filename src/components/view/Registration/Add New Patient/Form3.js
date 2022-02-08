import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUser, refreshPage } from '../../../../utilities/Common';
import { Navigate } from 'react-router-dom';

//css
import './Form3.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';
import {
  getAnnualWellnessPackageBasic,
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
  getUltrasound,
  getPromo,
} from '../../../../services/services';

/*********************************
 * FUNCTIONS
 ********************************/

//VARIABLES
var itemDetails;
const userToken = getToken();
const userId = getUser();

//Packages
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
const promo = getPromo();

/*********************************
 * RENDER VIEW
 ********************************/

function Form2({ service, customer, packagePrice, labPrice,  setPackagePrice, setLabPrice, isService, isPackage, discount, setDiscount, isCompany, setServices, lastMeal, navigation  }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  document.body.style = 'background: white;';

  const [bookingId, setBookingId] = useState("");

  //Redirection
  const [redirect, setRedirect] = useState(false);
  const [print, setPrint] = useState(false);

  //functions
  function getDetails(categoryItems, checkedItem) {
    categoryItems.map((data, index) => {
      if (data.key == checkedItem) {
        itemDetails = {
          name: data.name,
          categoryId: data.categoryId,
          labTestId: data.labTestId,
          price: data.price,
          type: data.type,
        };
        return itemDetails;
      }
    });
  }

  function submit(e, customer, services, totalPrice) {
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
        last_meal: lastMeal,
        remarks: '',
        added_by: userId,
      },
    }).then(function (response) {
      console.log(response);
      toast.success(response.data.message.success);
      var packageId = [];
      var packagePrices = [];
      var testId = [];
      var labPrices = [];

      services.map((data, index) => {
        if (data.type == 'lab') {
          testId.push(data.labTestId);
          labPrices.push(data.price);
        } else if (data.type == 'package') {
          packageId.push(data.labTestId);
          packagePrices.push(data.price);
        }
      });

      var prices = labPrices.concat(packagePrices);

      var extractedDates = [];
      var testStarts = [];
      var testFinishes = [];
      var resultDates = [];
      var fileResults = [];

      axios({
        method: 'post',
        url: window.$link + 'bookings/create',
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          customer: response.data.data.customer_id,
          discount_id: customer.discountId,
          booking_time: customer.dateOfTesting,
          company_contract_id: '',
          doctors_referral: customer.referral,
          type: customer.serviceLocation,
          result: customer.result,
          total_amount: totalPrice,
          discount_reference_no: customer.discountDetail,
          grand_total: totalPrice,
          status: 'pending',
          reference_code: '',
          payment_type: 'PENDING',
          lab_tests: testId,
          package_tests: packageId,
          lab_prices: labPrices,
          package_prices: packagePrices,
          status: 'pending',
          lab_extracted_dates: extractedDates,
          lab_test_starts: testStarts,
          lab_test_finishes: testFinishes,
          lab_result_dates: resultDates,
          lab_file_result: fileResults,
          package_extracted_dates: extractedDates,
          package_test_starts: testStarts,
          package_test_finishes: testFinishes,
          package_result_dates: resultDates,
          package_file_result: fileResults,
          remarks: '',
          added_by: userId,
        },
      }).then(function (response) {
        console.log(response.data);
        setBookingId(response.data.data.booking_id);
        toast.success(response.data.message.success);

        if(isCompany === false) {
          setTimeout(function () {
            setRedirect(true);
          }, 2000);
        }else {
          setPrint(true);
        }
      });
      handleClose();
    });
  }

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Checked Services
  var totalPrice = 0;
  const asArray = Object.entries(service);
  const checkedServices = asArray.filter(([key, value]) => value == true);
  var checkedServicesDetails = [];

  checkedServices.map((data, index) => {
    var categoryDetails = data[0].split('_');
    var categoryId = parseInt(categoryDetails[1]);

    //servies
    switch (categoryDetails[1]) {
      case 'package1':
        getDetails(preEmploymentPackageBasic, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package2':
        getDetails(preEmploymentPackageDiscount, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package3':
        getDetails(pregnancyLabPackage, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package4':
        getDetails(annualWellnessPackageBasic, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package5':
        getDetails(thyroidTestPackage, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package6':
        getDetails(annualWellnessPackagePremium, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package7':
        getDetails(liverFunctionTest, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 'package8':
        getDetails(diabetesAndCholesterolPackage, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
    }

    //lab
    switch (categoryId) {
      case 1:
        getDetails(clincalMicroscopy, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 2:
        getDetails(hematology, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 4:
        getDetails(electrolytes, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 5:
        getDetails(glucoseTests, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 6:
        getDetails(kidneyFunctionTests, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 7:
        getDetails(lipidProfile, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 8:
        getDetails(pancreaticTests, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 9:
        getDetails(liverFunctionTests, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 11:
        getDetails(immunology, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 12:
        getDetails(hepatitisProfileScreening, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 13:
        getDetails(thyroidProfile, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 14:
        getDetails(tumorMarkers, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 15:
        getDetails(histopathology, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 16:
        getDetails(COVIDRapidTests, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 17:
        getDetails(microbiology, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 18:
        getDetails(xray, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 19:
        getDetails(cardiology, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 20:
        getDetails(medicalCertificate, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 21:
        getDetails(ultrasound, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      case 22:
        getDetails(promo, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
    }
  });

  checkedServicesDetails.map((data, index) => {
    setLabPrice(0);
    setPackagePrice(0);
    if(data.type == 'lab') {
        var newTotal = 0;
        newTotal += parseFloat(data.price);
        setLabPrice(newTotal);
    }
    else if (data.type == 'package') {
        var newTotal = 0;
        newTotal += parseFloat(data.price);
        setPackagePrice(newTotal);
    }

    totalPrice += parseFloat(data.price);
});

  if (print == true) {
    return <Navigate to={"/print-booking/" + bookingId} />;
  } else if (redirect == true) {
    return <Navigate to={"/add-payment/" + bookingId} />;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ADD PATIENT" />

        <div className="booking-form">
          <form className="needs-validation" onSubmit={(e) => submit(e, customer, checkedServicesDetails, totalPrice)}>
            <div className="row clinical-services-container">
              <h3 className="form-categories-header italic">CLINICAL SERVICES</h3>

              <ServiceItems
                category="CLINICAL MICROSCOPY"
                items={clincalMicroscopy}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems category="HEMATOLOGY" items={hematology} formData={service} setForm={setServices} />

              <ServiceItems category="ELECTROLYTES" items={electrolytes} formData={service} setForm={setServices} />

              <ServiceItems category="GLUCOSE TESTS" items={glucoseTests} formData={service} setForm={setServices} />

              <ServiceItems
                category="KIDNEY FUNCTION TESTS"
                items={kidneyFunctionTests}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems category="LIPID PROFILE" items={lipidProfile} formData={service} setForm={setServices} />

              <ServiceItems
                category="PANCREATIC TEST"
                items={pancreaticTests}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems
                category="LIVER FUNCTION TESTS"
                items={liverFunctionTests}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems category="IMMUNOLOGY" items={immunology} formData={service} setForm={setServices} />

              <ServiceItems
                category="HEPATITIS PROFILE SCREENING"
                items={hepatitisProfileScreening}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems
                category="THYROID PROFILE"
                items={thyroidProfile}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems category="TUMOR MARKERS" items={tumorMarkers} formData={service} setForm={setServices} />

              <ServiceItems category="HISTOPATHOLOGY" items={histopathology} formData={service} setForm={setServices} />

              <ServiceItems
                category="COVID Rapid Tests"
                items={COVIDRapidTests}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems category="MICROBIOLOGY" items={microbiology} formData={service} setForm={setServices} />

              <ServiceItems category="XRAY" items={xray} formData={service} setForm={setServices} />

              <ServiceItems category="CARDIOLOGY" items={cardiology} formData={service} setForm={setServices} />

              <ServiceItems
                category="MEDICAL CERTIFICATE"
                items={medicalCertificate}
                formData={service}
                setForm={setServices}
              />

              <ServiceItems 
                category="ULTRASOUND" 
                items={ultrasound} 
                formData={service} 
                setForm={setServices} 
              />

              <ServiceItems 
                category="TEST PROMOS" 
                items={promo} 
                formData={service} 
                setForm={setServices} 
                />
                
              {/*
                <h3 className="form-categories-header italic">PACKAGES</h3>

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
                category='ANNUAL WELLNESS PACKAGE'
                items={annualWellnessPackageBasic}
                formData={service}
                setForm={setServices}
                /> */}
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

                <div className="row">
                    <div className="col d-flex justify-content-end">
                        {isCompany == false && (
                             <span className="total-price"><b>DISCOUNT {
                                discount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})
                            }%</b></span>
                        )}
                         {isCompany != false && (
                             <span className="total-price"><b>DISCOUNT P{
                                discount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})
                            }</b></span>
                        )}
                    </div>
                </div>
                
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>SUBTOTAL P {totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                </div>

                <div className="row">
                    {isCompany == false && isPackage == true && (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice - (packagePrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                      {isCompany == false && isService == true &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice - (labPrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == false && isService != true && isPackage != true &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice - (totalPrice * discount / 100 )).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                    {isCompany == true && isPackage == true &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice +  (packagePrice - discount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                     {isCompany == true && isService == true &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice +  (labPrice - discount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                     {isCompany == true && isService != true && isPackage != true &&  (
                    <div className="col d-flex justify-content-end">
                        <span className="total-price"><b>GRANDTOTAL P {(totalPrice - discount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</b></span>
                    </div>
                    )}
                </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="d-flex justify-content-start">
                  <button className="back-btn" onClick={() => navigation.previous()}>
                    BACK
                  </button>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex justify-content-end">
                  <button type="button" className="proceed-btn" onClick={handleShow}>
                    SAVE BOOKING
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SUBMIT</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to submit the form?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={(e) => submit(e, customer, checkedServicesDetails, totalPrice)}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form2;
