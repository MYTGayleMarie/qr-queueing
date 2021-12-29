import React from 'react';
import axios from 'axios';
import { setUserSession } from '../../../../utilities/Common';

//css
import './Form2.css';

//components
import Navbar from '../../../Navbar';
import Header from '../../../Header.js';
import ServiceItems from '../../../ServiceItems';
import { getToken } from '../../../../utilities/Common';


/*********************************
 * SERVICES
 ********************************/

const clincalMicroscopy = [
    {   
        //key: name + _ + categoryId
        key: 'Urinalysis_1',
        name: 'Urinalysis',
        categoryId: '1',
        labTestId: '1', 
        price: '70'
    },    
    {
        key: 'UrineKetone_1',
        name: 'Urine Ketone',
        categoryId: '1',
        labTestId: '2', 
        price: '70'
    },  
    {
        key: 'UrineRBCMorphology_1',
        name: 'Urine RBC Morphology',
        categoryId: '1',
        labTestId: '3', 
        price: '150'
    },  
    {
        key: 'Fecalysis_1',
        name: 'Fecalysis',
        categoryId: '1',
        labTestId: '4', 
        price: '50'
    },  
    {
        key: 'FecalOccultBlood_1',
        name: 'Fecal Occult Blood',
        categoryId: '1',
        labTestId: '5', 
        price: '350'
    },  
    {
        key: 'PregnacyTest_1',
        name: 'Pregnancy Test (RPK-Lateral Flow)',
        categoryId: '1',
        labTestId: '6', 
        price: '140'
    },  
    {
        key: 'SpermAnalysis_1',
        name: 'Sperm Analysis',
        categoryId: '1',
        labTestId: '7', 
        price: '350'
    },  
];

const hematology = [
    {
        key: 'CBCwithPlatelet_2',
        name: 'CBC with Platelet',
        categoryId: '2',
        labTestId: '8', 
        price: '200'
    },   
    {
        key: 'WBCDifferential_2',
        name: 'WBC Differential',
        categoryId: '2',
        labTestId: '9', 
        price: '180'
    },   
    {
        key: 'Hematocrit,PLT_2',
        name: 'Hematocrit, PLT',
        categoryId: '2',
        labTestId: '10', 
        price: '180'
    }, 
    {
        key: 'Hemoglobin,Hematocrit_2',
        name: 'Hemoglobin, Hematocrit',
        categoryId: '2',
        labTestId: '11', 
        price: '180'
    }, 
    {
        key: 'BloodTyping_2',
        name: 'Forward and reverse ABO group (Blood Typing)',
        categoryId: '2',
        labTestId: '12', 
        price: '150'
    }, 
    {
        key: 'ESR_2',
        name: 'Erythrocyte Sedimentation Rate (ESR)',
        categoryId: '2',
        labTestId: '13', 
        price: '170'
    }, 
    {
        key: 'PeripheralBloodSmear_2',
        name: 'Peripheral Blood Smear/Special Hematology',
        categoryId: '2',
        labTestId: '14', 
        price: '420'
    }, 
    {
        key: 'Clotting&BleedingTime_2',
        name: 'Clotting & Bleeding Time',
        categoryId: '2',
        labTestId: '15', 
        price: '180'
    }, 
    {
        key: 'ReticulocyteCount_2',
        name: 'Reticulocyte Count/Retics',
        categoryId: '2',
        labTestId: '16', 
        price: '300'
    }, 
];

//CHEMISTRY

const Electrocytes = [
    {
        key: 'Sodium_4',
        name: 'Sodium',
        categoryId: '4',
        labTestId: '17', 
        price: '',
    },  
    {
        key: 'Potassium_4',
        name: 'Potassium',
        categoryId: '4',
        labTestId: '18', 
        price: '',
    },  
    {
        key: 'IonizedCalcium_4',
        name: 'Ionized Calcium',
        categoryId: '4',
        labTestId: '19', 
        price: '',
    },  
    {
        key: 'TotalCalcium_4',
        name: 'Total Calcium',
        categoryId: '4',
        labTestId: '20', 
        price: '',
    },  
    {
        key: 'Chloride_4',
        name: 'Chloride',
        categoryId: '4',
        labTestId: '21', 
        price: '',
    },  
    {
        key: 'Magnesium_4',
        name: 'Magnesium',
        categoryId: '4',
        labTestId: '22', 
        price: '600',
    },  
    {
        key: 'Phosphorus_4',
        name: 'Phosphorus',
        categoryId: '4',
        labTestId: '23', 
        price: '500',
    },  
];

const GlucoseTests = [
    {
        key: 'FastingBloodSugar_5',
        name: 'Fasting Blood Sugar',
        categoryId: '5',
        labTestId: '24', 
        price: '125',
    },  
    {
        key: 'RandomBloodSugar_5',
        name: 'Random Blood Sugar',
        categoryId: '5',
        labTestId: '25', 
        price: '125',
    }, 
    {
        key: 'OGTT2Extractions_5',
        name: 'OGTT 2 Extractions (Fasting, 1st hour) 75g',
        categoryId: '5',
        labTestId: '26', 
        price: '450',
    },   
    {
        key: 'OGTT3Extractions_5',
        name: 'OGTT 3 Extractions (75g)',
        categoryId: '5',
        labTestId: '27', 
        price: '720',
    },  
    {
        key: '2hrsPPBS_5',
        name: '2 hrs PPBS',
        categoryId: '5',
        labTestId: '28', 
        price: '200',
    }, 
    {
        key: 'HbA1c_5',
        name: 'HbA1c',
        categoryId: '5',
        labTestId: '29', 
        price: '880',
    },   
];

const KidneyFunctionTests = [
    {
        key: 'Creatinine_6',
        name: 'Creatinine',
        categoryId: '6',
        labTestId: '30', 
        price: '140',
    },   
    {
        key: 'BloodUreaNitrogen_6',
        name: 'Blood Urea Nitrogran',
        categoryId: '6',
        labTestId: '31', 
        price: '125',
    },   
    {
        key: 'BloodUricAcid_6',
        name: 'Blood Uric Acid',
        categoryId: '6',
        labTestId: '32', 
        price: '125',
    },   
    {
        key: 'TPAG_6',
        name: 'TPAG(Total Protein, Albumin, Globulin)',
        categoryId: '6',
        labTestId: '33', 
        price: '350',
    },   
    {
        key: 'TotalProteinOnly_6',
        name: 'Total Protein Only',
        categoryId: '6',
        labTestId: '34', 
        price: '200',
    },   
    {
        key: 'AlbuminOnly_6',
        name: 'Albumin Only',
        categoryId: '6',
        labTestId: '35', 
        price: '180',
    },   
];

const LipidProfile = [
    {
        key: 'CholesterolEtc_7',
        name: 'Cholesterol, Triglycerides, HDL, LDL, Vl, DL',
        categoryId: '7',
        labTestId: '36', 
        price: '600',
    },  
    {
        key: 'TotalCholesterolOnly_7',
        name: 'Total Cholesterol Only',
        categoryId: '7',
        labTestId: '37', 
        price: '190',
    },  
    {
        key: 'HDLOnly_7',
        name: 'HDL Only',
        categoryId: '7',
        labTestId: '38', 
        price: '280',
    }, 
    {
        key: 'Triglycerides_7',
        name: 'Triglycerides Only',
        categoryId: '7',
        labTestId: '39', 
        price: '200',
    },   
];

const PancreaticTest = [
    {
        key: 'Amylase_8',
        name: 'Amylase',
        categoryId: '8',
        labTestId: '40', 
        price: '350',
    },  
];

const LiverFunctionTests = [
    {
        key: 'ALT/SGPT_9',
        name: 'ALT/SGPT',
        categoryId: '9',
        labTestId: '41', 
        price: '180',
    }, 
    {
        key: 'AST/SGOT_9',
        name: 'AST/SGOT',
        categoryId: '9',
        labTestId: '42', 
        price: '180',
    },  
    {
        key: 'ALP_9',
        name: 'Alkaline Phosphatase (ALP)',
        categoryId: '9',
        labTestId: '43', 
        price: '200',
    }, 
    {
        key: 'BilirubinPanel_9',
        name: 'Bilirubin Panel',
        categoryId: '9',
        labTestId: '44', 
        price: '140',
    }, 
    {
        key: 'DirectBilirubin_9',
        name: 'Direct Bilirubin',
        categoryId: '9',
        labTestId: '45', 
        price: '90',
    }, 
    {
        key: 'IndirectBilirubin_9',
        name: 'Indirect Bilirubin',
        categoryId: '9',
        labTestId: '46', 
        price: '90',
    }, 
    {
        key: 'LDH_9',
        name: 'LDH',
        categoryId: '9',
        labTestId: '47', 
        price: '580',
    }, 
];

//SEROLOGY
const Immunology = [
    {
        key: 'Dengue_11',
        name: 'Dengue',
        categoryId: '11',
        labTestId: '48', 
        price: '1300',
    }, 
    {
        key: 'Syphilis/RPS/VDRL_11',
        name: 'Syphilis/RPS/VDRL',
        categoryId: '11',
        labTestId: '49', 
        price: '250',
    }, 
    {
        key: 'HIVScreening_11',
        name: 'HIV Screening (Anti HIV)',
        categoryId: '11',
        labTestId: '50', 
        price: '600',
    },   
];

const HepatitisProfileScreening = [
    {
        key: 'HBSag_12',
        name: 'HBSag (Hepatitis B Antigen)',
        categoryId: '12',
        labTestId: '51', 
        price: '290',
    },   
    {
        key: 'AntiHBs_12',
        name: 'Anti HBs/HBSab Hepatitis B Antibody',
        categoryId: '12',
        labTestId: '52', 
        price: '500',
    },   
    {
        key: 'AntiHCV_12',
        name: 'Anti HCV',
        categoryId: '12',
        labTestId: '53', 
        price: '530',
    }, 
    {
        key: 'AntiHAV_12',
        name: 'Anti HAV',
        categoryId: '12',
        labTestId: '54', 
        price: '750',
    },    
];

const ThyroidProfile = [
    {
        key: 'TSH_13',
        name: 'TSH',
        categoryId: '13',
        labTestId: '55', 
        price: '900',
    },  
    {
        key: 'FT4_13',
        name: 'FT4',
        categoryId: '13',
        labTestId: '56', 
        price: '750',
    },   
    {
        key: 'FT3_13',
        name: 'FT3',
        categoryId: '13',
        labTestId: '57', 
        price: '750',
    }, 
    {
        key: 'T4_13',
        name: 'T4',
        categoryId: '13',
        labTestId: '58', 
        price: '750',
    }, 
    {
        key: 'T3_13',
        name: 'T3',
        categoryId: '13',
        labTestId: '59', 
        price: '750',
    }, 
];

const TumorMarkers = [
    {
        key: 'PSA_14',
        name: 'PSA',
        categoryId: '14',
        labTestId: '60', 
        price: '1300',
    }, 
    {
        key: 'CA-125_14',
        name: 'CA-125 (Ovarian)',
        categoryId: '14',
        labTestId: '61', 
        price: '1500',
    }, 
];

const Histophatology = [
    {
        key: 'PapsSmear_14',
        name: 'Paps Smear',
        categoryId: '15',
        labTestId: '62', 
        price: '300',
    }, 
];

const CovidRapidTests = [
    {
        key: 'AntigenRapidSwab_14',
        name: 'Antigen Rapid Swab (Nasal)',
        categoryId: '16',
        labTestId: '63', 
        price: '750',
    }, 
    {
        key: 'AntibodyRapidTest_14',
        name: 'Antibody Rapid Test (Blood)',
        categoryId: '16',
        labTestId: '64', 
        price: '600',
    }, 
    {
        key: 'AntibodyTiter_14',
        name: 'Antibody Titer (Blood)',
        categoryId: '16',
        labTestId: '65', 
        price: '',
    }, 
];

const Microbiology = [
    {
        key: 'GramStain_14',
        name: 'Gram Stain',
        categoryId: '17',
        labTestId: '66', 
        price: '350',
    }, 
    {
        key: 'KOH_14',
        name: 'KOH',
        categoryId: '17',
        labTestId: '67', 
        price: '300',
    }, 
];

/*********************************
 * FUNCTIONS
 ********************************/

//VARIABLES
var itemDetails; 
const userToken = getToken();

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
        console.log(response.data);
        console.log(services);
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
    console.log(checkedServices);
    checkedServices.map((data, index) => {
        var categoryId = parseInt(data[0].charAt(data[0].length-1));
        
        switch(categoryId) {
            case 1:
                getDetails(clincalMicroscopy, data[0])
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
