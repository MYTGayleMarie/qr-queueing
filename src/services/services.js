import React from 'react';

/*****************************************
 * SERVICE KEY CONVENTION: 
 *  key : Name + _ + categoryId
 *****************************************/


/*********************************
 * SERVICES
 ********************************/

 const ClincalMicroscopy = [
    {   
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

const Hematology = [
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
        key: 'PapsSmear_15',
        name: 'Paps Smear',
        categoryId: '15',
        labTestId: '62', 
        price: '300',
    }, 
];

const CovidRapidTests = [
    {
        key: 'AntigenRapidSwab_16',
        name: 'Antigen Rapid Swab (Nasal)',
        categoryId: '16',
        labTestId: '63', 
        price: '750',
    }, 
    {
        key: 'AntibodyRapidTest_16',
        name: 'Antibody Rapid Test (Blood)',
        categoryId: '16',
        labTestId: '64', 
        price: '600',
    }, 
    {
        key: 'AntibodyTiter_16',
        name: 'Antibody Titer (Blood)',
        categoryId: '16',
        labTestId: '65', 
        price: '',
    }, 
];

const Microbiology = [
    {
        key: 'GramStain_17',
        name: 'Gram Stain',
        categoryId: '17',
        labTestId: '66', 
        price: '350',
    }, 
    {
        key: 'KOH_17',
        name: 'KOH',
        categoryId: '17',
        labTestId: '67', 
        price: '300',
    }, 
];

//Imaging
const Xray = [
    {
        key: 'AbdominalSupine_18',
        name: 'Abdominal Supine/Upright',
        categoryId: '18',
        labTestId: '68', 
        price: '750',
    }, 
    {
        key: 'AnkleAPL_18',
        name: 'Ankle APL',
        categoryId: '18',
        labTestId: '69', 
        price: '500',
    }, 
    {
        key: 'ChestPA_18',
        name: 'Chest PA',
        categoryId: '18',
        labTestId: '70', 
        price: '190',
    }, 
    {
        key: 'ChestPAL/APL_18',
        name: 'Chest PAL/APL',
        categoryId: '18',
        labTestId: '71', 
        price: '360',
    }, 
    {
        key: 'ChestBucky_18',
        name: 'Chest Bucky',
        categoryId: '18',
        labTestId: '72', 
        price: '190',
    }, 
    {
        key: 'CervicalAPL_18',
        name: 'Cervical APL',
        categoryId: '18',
        labTestId: '73', 
        price: '370',
    }, 
    {
        key: 'Elbow_18',
        name: 'Elbow',
        categoryId: '18',
        labTestId: '74', 
        price: '530',
    }, 
    {
        key: 'FemurAPL_18',
        name: 'Femur APL',
        categoryId: '18',
        labTestId: '75', 
        price: '650',
    }, 
    {
        key: 'FlatPlateUpright_18',
        name: 'Flat Plate Upright',
        categoryId: '18',
        labTestId: '76', 
        price: '450',
    }, 
    {
        key: 'ForearmAPL_18',
        name: 'Forearm APL',
        categoryId: '18',
        labTestId: '77', 
        price: '640',
    }, 
    {
        key: 'FootAPOL_18',
        name: 'Foot APOL',
        categoryId: '18',
        labTestId: '78', 
        price: '525',
    }, 
    {
        key: 'HandAPOL_18',
        name: 'Hand APOL',
        categoryId: '18',
        labTestId: '79', 
        price: '525',
    }, 
    {
        key: 'HumerusAPL_18',
        name: 'Chest PAL/APL',
        categoryId: '18',
        labTestId: '80', 
        price: '420',
    }, 
    {
        key: 'KUB_18',
        name: 'KUB',
        categoryId: '18',
        labTestId: '81', 
        price: '210',
    }, 
    {
        key: 'KneeAPL_18',
        name: 'Knee APL',
        categoryId: '18',
        labTestId: '82', 
        price: '530',
    }, 
    {
        key: 'Lumbo-SacralAPL_18',
        name: 'Lumbo-Sacral APL',
        categoryId: '18',
        labTestId: '83', 
        price: '850',
    }, 
    {
        key: 'LegAPL_18',
        name: 'Leg APL',
        categoryId: '18',
        labTestId: '84', 
        price: '650',
    },
    {
        key: 'MastoidSeries_18',
        name: 'Mastoid Series',
        categoryId: '18',
        labTestId: '85', 
        price: '1300',
    }, 
    {
        key: 'ParanasalSinusesComplete_18',
        name: 'ParanasalSinusesComplete',
        categoryId: '18',
        labTestId: '86', 
        price: '450',
    },  
    {
        key: 'PelvisAP_18',
        name: 'Pelvis AP',
        categoryId: '18',
        labTestId: '87', 
        price: '530',
    }, 
    {
        key: 'ScolioticSeries_18',
        name: 'Scoliotic Series',
        categoryId: '18',
        labTestId: '88', 
        price: '1320',
    }, 
    {
        key: 'ShoulderAP_18',
        name: 'Shoulder AP',
        categoryId: '18',
        labTestId: '89', 
        price: '370',
    }, 
    {
        key: 'SkullAPL_18',
        name: 'Skull APL',
        categoryId: '18',
        labTestId: '90', 
        price: '530',
    }, 
    {
        key: 'Thoraco-LumbarAPL_18',
        name: 'Thorace-Lumber APL',
        categoryId: '18',
        labTestId: '91', 
        price: '1320',
    }, 
    {
        key: 'WristAPOL_18',
        name: 'Wrist APOL',
        categoryId: '18',
        labTestId: '92', 
        price: '530',
    }, 
];

const Cardiology = [
    {
        key: 'Doppler_19',
        name: 'Doppler 2-Echo',
        categoryId: '19',
        labTestId: '93', 
        price: '3000',
    }, 
    {
        key: 'ECG_19',
        name: 'ECG',
        categoryId: '19',
        labTestId: '94', 
        price: '140',
    }, 
];

const MedicalCertificate = [
    {
        key: 'medicalCert_20',
        name: 'Fit to Work Clearance (Physical Exam)',
        categoryId: '20',
        labTestId: '95', 
        price: '300',
    }, 
];

const UltraSound = [
    {
        key: 'Abdominal_21',
        name: 'Abdominal',
        categoryId: '21',
        labTestId: '96', 
        price: '1650',
    },
    {
        key: 'AbdominalProstate_21',
        name: 'Abdominal Prostate',
        categoryId: '21',
        labTestId: '97', 
        price: '2100',
    },
    {
        key: 'AbdominalPelvic_21',
        name: 'Abdominal Pelvic',
        categoryId: '21',
        labTestId: '98', 
        price: '2100',
    },
    {
        key: 'Breast_21',
        name: 'Breast',
        categoryId: '21',
        labTestId: '99', 
        price: '1200',
    },
    {
        key: 'CongenitalScreening_21',
        name: 'Abdominal Prostate',
        categoryId: '21',
        labTestId: '100', 
        price: '',
    },
    {
        key: 'Cranial_21',
        name: 'Cranial',
        categoryId: '21',
        labTestId: '101', 
        price: '800',
    },
    {
        key: 'HepatobiliaryTree_21',
        name: 'Hepatobiliary Tree',
        categoryId: '21',
        labTestId: '102', 
        price: '800',
    },
    {
        key: 'InguinalArea_21',
        name: 'Inguinal Area',
        categoryId: '21',
        labTestId: '103', 
        price: '700',
    },
    {
        key: 'KUBRenal_21',
        name: 'KUB Renal',
        categoryId: '21',
        labTestId: '104', 
        price: '900',
    },
    {
        key: 'KUBProstate_21',
        name: 'KUB Prostate',
        categoryId: '21',
        labTestId: '105', 
        price: '1300',
    },
    {
        key: 'LowerAbdominal_21',
        name: 'Lower Abdominal',
        categoryId: '21',
        labTestId: '106', 
        price: '1300',
    },
    {
        key: 'Pelvic_21',
        name: 'Pelvic (Fetal Aging)',
        categoryId: '21',
        labTestId: '107', 
        price: '750',
    },
    {
        key: 'ProstateGland_21',
        name: 'Prostate Gland',
        categoryId: '21',
        labTestId: '108', 
        price: '500',
    },
    {
        key: 'Scrotal_21',
        name: 'Scrotal',
        categoryId: '21',
        labTestId: '109', 
        price: '1200',
    },
    {
        key: 'SmallPartsUtz_21',
        name: 'Small Pats Utz',
        categoryId: '21',
        labTestId: '110', 
        price: '650',
    },
    {
        key: 'Thyroid_21',
        name: 'Thyroid',
        categoryId: '21',
        labTestId: '111', 
        price: '750',
    },
    {
        key: 'Transvaginal_21',
        name: 'Transvaginal (TVS)',
        categoryId: '21',
        labTestId: '112', 
        price: '800',
    },
    {
        key: 'UpperAbdominal_21',
        name: 'Upper Abdominal',
        categoryId: '21',
        labTestId: '113', 
        price: '850',
    },
];



/*********************************
 * GET LABORATORY SERVICES
 ********************************/

//Clinical Microscopy
export const getClinicalMicroscopy = () => {
   return ClincalMicroscopy;
}

//Hematology
export const getHematology = () => {
    return Hematology;
}

//Electrolytes
export const getElectrolytes = () => {
    return Electrocytes;
}

//Glucose Tests
export const getGlucoseTests = () => {
    return GlucoseTests;
}

//Kidney Function Tests
export const getKidneyFunctionTests = () => {
    return KidneyFunctionTests;
}

//Lipid Profile
export const getLipidProfile = () => {
    return LipidProfile;
}

//Pancreatic Tests
export const getPacreaticTests = () => {
    return PancreaticTest;
}

//Liver Function Tests
export const getLiverFunctionTests = () => {
    return LiverFunctionTests;
}

//Immunology
export const getImmunology = () => {
    return Immunology;
}

//Hepatitis Profile Screening
export const getHepatitisProfileScreening = () => {
    return HepatitisProfileScreening;
}

//Thyroid Profile
export const getThyroidProfile = () => {
    return ThyroidProfile;
}

//Tumor Markers
export const getTumorMarkers = () => {
    return TumorMarkers;
}

//Histopathology
export const getHistopathology = () => {
    return Histophatology;
}

//COVID Rapid Tests
export const getCOVIDRapidTests = () => {
    return CovidRapidTests;
}

//Microbiology
export const getMicrobiology = () => {
    return Microbiology;
}

/*********************************
 * GET IMAGING SERVICES
 ********************************/

//Xray
export const getXray = () => {
    return Xray;
}

//Cardiology
export const getCardiology = () => {
    return Cardiology;
}

//Medical Certificate
export const getMedicalCertificate = () => {
    return MedicalCertificate;
}

//Ultrasound
export const getUltrasound = () => {
    return UltraSound;
}