import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';
import { getAnnualWellnessPackageBasic,
         getPregnancyLabPackage,
         getPreEmploymentDiscount,
         getPreEmploymentBasic,
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
         getOtherTests
        } from '../../../../services/services';
import { ConsoleView } from 'react-device-detect';

/*********************************
 * FUNCTIONS
 ********************************/

//VARIABLES
var itemDetails; 
var newLabTotal = 0;
var newPackageTotal = 0;
var labDiscountedTotal = 0;
var packageDiscountedTotal = 0;
const userToken = getToken();
const userId = getUser();

//Packages
// const preEmploymentPackageBasic = getPreEmploymentBasic();
// const preEmploymentPackageDiscount = getPreEmploymentDiscount();
// const pregnancyLabPackage = getPregnancyLabPackage();
// const annualWellnessPackageBasic = getAnnualWellnessPackageBasic();

//Lab Services
// const clinicalMicroscopy = getClinicalMicroscopy();
// const hematology = getHematology();
// const electrolytes = getElectrolytes();
// const glucoseTests = getGlucoseTests();
// const kidneyFunctionTests = getKidneyFunctionTests();
// const lipidProfile = getLipidProfile();
// const pancreaticTests = getPacreaticTests();
// const liverFunctionTests = getLiverFunctionTests();
// const immunology = getImmunology();
// const hepatitisProfileScreening = getHepatitisProfileScreening();
// const thyroidProfile = getThyroidProfile();
// const tumorMarkers = getTumorMarkers();
// const histopathology = getHistopathology();
// const COVIDRapidTests = getCOVIDRapidTests();
// const microbiology = getMicrobiology();
// const xray = getXray();
// const cardiology = getCardiology();
// const medicalCertificate = getMedicalCertificate();
// const ultrasound = getUltrasound();
// const promo = getPromo();
// const otherTests = getOtherTests();
//
function OldPatientForm3CModule({ service, customer,packagePrice, labPrice,  setPackagePrice, setLabPrice, isService, isPackage, discount, setDiscount, isCompany, setServices, lastMeal, navigation, mdCharge, serviceFee, location, dateOfTesting, discountDetails }) {
      //get all lab tests
    const [allLabServices, setAllLabServices] = useState([])
    React.useEffect(()=>{
    axios({
        method: 'post',
        url: window.$link + 'lab_tests/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    })
    .then((response)=>{
        const tests = response.data.lab_tests.filter(test=>test.is_deleted != 1).sort((x, y)=>x.id-y.id)
        tests.map((test,index)=>{   
            var testDetails = {};
            // if (test.id == 129){ //otherTest
            //     testDetails.key = test.name.replace(/[2)}{(,&-\s/]/g, '')+"_"+23;
            // } else if (test.id == 119||test.id==120||test.id==121||test.id == 117){ //promo
            //     testDetails.key = test.name.replace(/[2)}{(,&-\s/]/g, '')+"_"+22;
            // } else {
            //     testDetails.key = test.name.replace(/[2)}{(,&-\s/]/g, '')+"_"+test.category_id;
            // } 
            testDetails.key = test.name.replace(/[2)}{(.,&-\s/]/g, '')+"_"+test.category_id;         
            testDetails.name = test.name;
            testDetails.categoryId = test.category_id;
            testDetails.labTestId = test.id;
            testDetails.price = test.price;
            testDetails.type = "lab";
            setAllLabServices(oldArray=>[...oldArray, testDetails]) // append each item to services   
        })
        
    })
    .catch((error)=>{
        console.log(error)
    })
    },[])


    // // Lab Tests Categories
    const clinicalMicroscopy = allLabServices.filter(item=>item.categoryId == 1)
    const clinicalUrinalysis = allLabServices.filter(item=>item.categoryId == 23)
    const clinicalFecalysis = allLabServices.filter(item=>item.categoryId == 24)
    const hematology = allLabServices.filter(item=>item.categoryId == 2)
    const electrolytes = allLabServices.filter(item=>item.categoryId == 3 || item.categoryId == 4)
    const glucoseTests = allLabServices.filter(item=>item.categoryId == 5)
    const kidneyFunctionTests = allLabServices.filter(item=>item.categoryId == 6)
    const lipidProfile = allLabServices.filter(item=>item.categoryId == 7)
    const pancreaticTests = allLabServices.filter(item=>item.categoryId == 8)
    const liverFunctionTests = allLabServices.filter(item=>item.categoryId == 9)   
    const immunology = allLabServices.filter(item=>item.categoryId == 11)
    const hepatitisProfileScreening = allLabServices.filter(item=>item.categoryId == 12) 
    const thyroidProfile = allLabServices.filter(item=>item.categoryId == 13)
    const tumorMarkers = allLabServices.filter(item=>item.categoryId == 14) 
    const histopathology = allLabServices.filter(item=>item.categoryId == 15) 
    const COVIDRapidTests = allLabServices.filter(item=>item.categoryId == 16) 
    const microbiology = allLabServices.filter(item=>item.categoryId == 17) 
    const xray = allLabServices.filter(item=>item.categoryId == 18) 
    const cardiology = allLabServices.filter(item=>item.categoryId == 19) 
    const medicalCertificate = allLabServices.filter(item=>item.categoryId == 20) 
    const ultrasound = allLabServices.filter(item=>item.categoryId == 21) 
    const promo = allLabServices.filter(item=>item.labTestId == 119 || item.labTestId == 120 ||item.labTestId == 121 ||item.labTestId == 117)
    const otherTests = allLabServices.filter(item=>item.categoryId == 22)

    //get all packages
    const [allPackages, setAllPackages] = useState([])
    React.useEffect(()=>{
    axios({
        method: 'post',
        url: window.$link + 'packages/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    })
    .then((response)=>{
        const packagesArray = response.data.packages.sort((x, y)=>x.id-y.id)
        console.log(packagesArray)
        packagesArray.map((item,index)=>{  
            // console.log(item) 
            var packageDetails = {};
            var packageCode = "";
            if( item.id==1 || item.id==2 || item.id==3 || item.id==44){                        
                packageCode="package1"
            } else if ( item.id==9 || item.id==10 || item.id==11 || item.id==45){
                packageCode="package2"
            } else if ( item.id==4){
                packageCode="package3"
            } else if ( item.id==12 || item.id==13 || item.id==14){
                packageCode="package4"
            } else {
                packageCode="package"+item.id
            }
            packageDetails.category = packageCode
            packageDetails.key = item.name.replace(/[1234567890)}{(,-\s/]/g, '')+item.id+"_"+"package";  
            packageDetails.name = item.name;

            packageDetails.labTestId = item.id;
            packageDetails.price = item.price;
            packageDetails.type = 'package';
            setAllPackages(oldArray=>[...oldArray, packageDetails]) // append each item to packages
            
        })

    })
    .catch((error)=>{
        console.log(error)
    })
    },[])

    //Packages category
    const preEmploymentPackageBasic = allPackages.filter(item=>item.category==="package1")   
    const preEmploymentPackageDiscount = allPackages.filter(item=>item.category==="package2")   
    const pregnancyLabPackage = allPackages.filter(item=>item.category==="package3") 
    const annualWellnessPackageBasic = allPackages.filter(item=>item.category==="package4") 
    const thyroidTestPackage = allPackages.filter(item=>item.category==="package5") 
    const annualWellnessPackagePremium = allPackages.filter(item=>item.category==="package6") 
    const liverFunctionTest = allPackages.filter(item=>item.category==="package7") 
    const diabetesAndCholesterolPackage = allPackages.filter(item=>item.category==="package8") 

    React.useEffect(() => {
        window.scrollTo(0, 0);
      },[]);
    document.body.style = 'background: white;';

    //states
    const [discountCode, setDiscountCode] = useState("");

    //customer details
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthDate] = useState("");
    const [senior, setSenior] = useState("");
    const [pwd, setPWD] = useState("")
    const [gender, setGender] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [emailadd, setEmail] = useState("");
    const [homeaddress, setAddress] = useState("");
    const [bookingId, setBookingId] = useState("");
    const {id} = useParams();

    //Redirection
    const [redirect, setRedirect] = useState(false);
    const [print, setPrint] = useState(false);

    //Single Clic
    const [isClicked, setClicked] = useState(false);

    var totalMDCharge = 0;

    if(mdCharge.physical_exam == true) {
    totalMDCharge += 50.00;
    }

    if(mdCharge.medical_certificate == true) {
    totalMDCharge += 50.00;
    }

    axios({
        method: 'post',
        url: window.$link + 'customers/show/' + id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (customer) {
        var presentDate = new Date();
        var birthDate = new Date(customer.data.birthdate);
        var age = presentDate.getFullYear() - birthDate.getFullYear();
        var m = presentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) 
        {
         age--;
        }
        setFirstName(customer.data.first_name);
        setMiddleName(customer.data.middle_name);
        setLastName(customer.data.last_name);
        setBirthDate(birthDate.toDateString());
        setGender(customer.data.gender);
        setContactNo(customer.data.contact_no);
        setEmail(customer.data.email);
        setAddress(customer.data.address);
        setSenior(customer.data.senior_id);
        setPWD(customer.data.pwd_id)

    }).catch(function (error) {
        console.log(error);
    });

     //functions
     function getDetails(categoryItems, checkedItem) {
        categoryItems.map((data, index) => {
            console.log(data)
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
    
    function submit(e, customer, location, services, totalPrice) {

        e.preventDefault();
        
        if(isClicked == false) {
            setClicked(true);
            axios({
            method: 'post',
            url: window.$link + 'customers/update/' + id,
            withCredentials: false, 
            params: {
                token: userToken.replace(/['"]+/g, ''),
                api_key: window.$api_key, 
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName, 
                suffix: '',
                birthdate: birthday,
                contact_no: contactNo,
                email: emailadd,
                gender: gender, 
                address: homeaddress,
                emergency_contact: '',
                emergency_contact_no: '',
                relation_w_contact: '',
                last_meal: lastMeal,
                senior_id: senior,
                pwd_id: pwd,
                remarks: '',
                updated_by: userId,
            }
        }).then(function (response) {
            toast.success(response.data.message.success);
            var packageId = [];
            var packagePrices = [];
            var testId = [];
            var labPrices = [];

            services.map((data, index) => {

                if(data.type === 'lab') {
                    testId.push(data.labTestId);
                    labPrices.push(data.price);
                }
                else if (data.type === 'package') {
                    packageId.push(data.labTestId);
                    packagePrices.push(data.price);
                }
            })

            var extractedDates = [];
            var testStarts = [];
            var testFinishes = [];
            var resultDates = []; 
            var fileResults = [];
            var finalMdCharge = [];
            var location_value = "";

            if(mdCharge.physical_exam == true){
                finalMdCharge.push("physical exam");
            }
            if(mdCharge.medical_certificate == true) {
                finalMdCharge.push("medical certificate");
            }
            
            if(location === "3"){
                location_value = "Company"
              }
              if(location === "0" || location === "1" || location === "2"){
                location_value = "Home Service"
              }
              if(location === "4"){
                location_value = "Mobile Charge"
              }

           console.log(location)

            axios({
                method: 'post',
                url: window.$link + 'bookings/create',
                withCredentials: false, 
                params: {
                    token: userToken,
                    api_key: window.$api_key, 
                    customer: id,
                    discount_id: customer.discountId,
                    booking_time: dateOfTesting,
                    service_location: location_value,
                    company_contract_id: '',
                    doctors_referal: customer.referral, 
                    type: customer.serviceLocation,

                    result: customer.result,
                    total_amount: totalPrice,
                    grand_total: "",
                    discount_reference_no: customer.discountDetail, 
                    home_service_fee: serviceFee,
                    md_charge: finalMdCharge,
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
                }
            }).then(function (response) {
                // console.log(response.data.data);
                setBookingId(response.data.data.booking_id);
                toast.success(response.data.message.success);

                if(isCompany == false) {
                    setTimeout(function() {
                        setRedirect(true);
                    }, 2000);
                }else {
                    setPrint(true);
                }
            }).catch(function (error) {
                console.log(error);
            });
            handleClose();
            })

        }
    }

    //Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Checked Services
    var totalPrice = 0;
    var discountedTotalPrice = 0;
    const asArray = Object.entries(service)
    const checkedServices = asArray.filter(([key,value]) => value == true);
    var checkedServicesDetails = [];
// console.log(checkedServices)

    checkedServices.map((data, index) => {
    console.log(data)
        var categoryDetails = data[0].split("_");
        var categoryId = parseInt(categoryDetails[1]);

    // packages
    switch (categoryDetails[1]) {
      case 'package':
        getDetails(allPackages, data[0]);
        checkedServicesDetails.push(itemDetails);
        break;
      // case 'package1':
      //   getDetails(preEmploymentPackageBasic, data[0]);
      //   checkedServicesDetails.push(itemDetails);
      //   break;
      // case 'package2':
      //   getDetails(preEmploymentPackageDiscount, data[0]);
      //   checkedServicesDetails.push(itemDetails);
      //   break;
      // case "package3":
      //     getDetails(pregnancyLabPackage, data[0])
      //     checkedServicesDetails.push(itemDetails);
      // break;
      // case 'package4':
      //   getDetails(annualWellnessPackageBasic, data[0]);
      //   checkedServicesDetails.push(itemDetails);
      //   break;
      // case "package5":
      //     getDetails(thyroidTestPackage, data[0])
      //     checkedServicesDetails.push(itemDetails);
      // break;
      // case "package6":
      //     getDetails(annualWellnessPackagePremium, data[0])
      //     checkedServicesDetails.push(itemDetails);
      // break;
      // case "package7":
      //     getDetails(liverFunctionTest, data[0])
      //     checkedServicesDetails.push(itemDetails);
      // break;
      // case "package8":
      //     getDetails(diabetesAndCholesterolPackage, data[0])
      //     checkedServicesDetails.push(itemDetails);
      // break;
    }

        // console.log(checkedServicesDetails)
       //lab
        switch(categoryId) {
            case 1:
                getDetails(clinicalMicroscopy, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 2:
                getDetails(hematology, data[0])
                checkedServicesDetails.push(itemDetails);
            break;
            case 3:
                getDetails(electrolytes, data[0])
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
            // case 22:
            //     getDetails(promo, data[0]);
            //     checkedServicesDetails.push(itemDetails);
            // break;
            case 22:
                getDetails(otherTests, data[0]);
                checkedServicesDetails.push(itemDetails);
            break;
            case 23:
                getDetails(clinicalUrinalysis, data[0]);
                checkedServicesDetails.push(itemDetails);
            break;
            case 24:
                getDetails(clinicalFecalysis, data[0]);
                checkedServicesDetails.push(itemDetails);
            break;
        }

    });

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'discounts/show/' + customer.discountId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setDiscountCode(response.data.data.discount.discount_code);
        });
    
    },[discountDetails])

    //Total discount labs/packages
if(typeof checkedServicesDetails[0] !== 'undefined') {
    checkedServicesDetails.map((data, index) => {
        // console.log(data);

        //To insert condition for discount for specific labs/packages
        if(index == 0) {
            labDiscountedTotal = 0;
            packageDiscountedTotal = 0;
        }
        if(discountDetails != null) {
        discountDetails.map((detail) => {
            if(data.type === 'lab' && detail.type == 'service') {
                if(data.labTestId == detail.source_id) {
                    discountedTotalPrice += parseFloat(data.price);
                }
            }
            else if (data.type === 'package' && detail.type == 'package') {
                if(data.packageId == detail.source_id) {
                   discountedTotalPrice += parseFloat(data.price);
                }
            }
        });
    }
    });
}
// console.log(checkedServicesDetails)

if(typeof checkedServicesDetails[0] !== 'undefined') {
    checkedServicesDetails.map((data, index) => {
        // console.log(data);
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
            if(discountDetails != null ) {
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
            if(discountDetails != null) {
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
}

  if (print == true) {
    return <Navigate to={"/print-booking/" + bookingId} />;
  }

  if (redirect == true) {
    return <Navigate to={"/add-payment/" + bookingId} />;
  }
    
    return (
        <div>
        {/* <Navbar/> */}
        <div className="active-cont">

            <Header 
            type="thin"
            title="ADD PATIENT"
            />

            <div className="booking-form">
            <form className="needs-validation" onSubmit={(e) => submit(e, customer, location, checkedServicesDetails, totalPrice)}>
            <div className="row clinical-services-container">
                <h3 className="form-categories-header italic">CLINICAL SERVICES</h3>

                {/* <ServiceItems 
                category='CLINICAL MICROSCOPY' 
                items={clinicalMicroscopy}
                formData={service}
                setForm={setServices}
                /> */}
                <ServiceItems 
                category='CLINICAL MICROSCOPY URINALYSIS' 
                items={clinicalUrinalysis}
                formData={service}
                setForm={setServices}
                />

                <ServiceItems 
                category='CLINICAL MICROSCOPY FECALYSIS' 
                items={clinicalFecalysis}
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

                <ServiceItems 
                category="TEST PROMOS" 
                items={promo} 
                formData={service} 
                setForm={setServices} 
                />

                <ServiceItems 
                category="OTHER TESTS" 
                items={otherTests} 
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

                    { typeof checkedServicesDetails[0] !== 'undefined' ?
                    checkedServicesDetails.map((data, index) => (
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
                    )):null}
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
                            }%</b> - {discountCode}</span>
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
                        <button type='button' className="proceed-btn" onClick={handleShow}>SAVE BOOKING</button>
                        <ToastContainer/>
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
                    <Button type="submit" variant="primary" onClick={(e) => submit(e, customer, location, checkedServicesDetails, totalPrice)}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>

            </form>
            </div>
                
            </div>
        </div>
    )
}

export default OldPatientForm3CModule
