import React from 'react';

/*****************************************
 * SERVICE KEY CONVENTION:
 *  key : Name + _ + categoryId
 *****************************************/

/*********************************
 * PACKAGES
 ********************************/

const PreEmploymentPackageBasic = [
  {
    key: 'EmploymentA_package1',
    name: 'Employment A (CBC, Urinalysis, Chest PA(Xray))',
    services: 'CBC, Urinalysis, Chest PA(Xray)',
    labTestId: '1',
    price: '390.00',
    type: 'package',
  },
  {
    key: 'EmploymentB_package1',
    name: 'Employment B (CBC, Urinalysis, Chest PA(Xray), HBsAg(Hep B Screening))',
    services: 'CBC, Urinalysis, Chest PA(Xray), HBsAg(Hep B Screening)',
    labTestId: '2',
    price: '690.00',
    type: 'package',
  },
  {
    key: 'EmploymentC_package1',
    name: 'Employment C (CBC, ECG, Lipid Panel, Crea, BUA, SGPT, FBS, U/A, CXR, HBsAg)',
    services: 'CBC, ECG, Lipid Panel, Crea, BUA, SGPT, FBS, U/A, CXR, HBsAg',
    labTestId: '3',
    price: '1600.00',
    type: 'package',
  },
];

const PreEmploymentPackageDiscount = [
  {
    key: 'EmploymentA_package2',
    name: 'Employment A (CBC, Urinalysis, Chest PA(Xray))',
    services: 'CBC, Urinalysis, Chest PA(Xray)',
    price: '320.00',
    labTestId: '9',
    type: 'package',
  },
  {
    key: 'EmploymentB_package2',
    name: 'Employment B (CBC, Urinalysis, Chest PA(Xray), HBsAg(Hep B Screening))',
    services: 'CBC, Urinalysis, Chest PA(Xray), HBsAg(Hep B Screening)',
    price: '525.00',
    labTestId: '10',
    type: 'package',
  },
  {
    key: 'EmploymentC_package2',
    name: 'Employment C (CBC, ECG, Lipid Panel, Crea, BUA, SGPT, FBS, U/A, CXR, HBsAg)',
    services: 'CBC, ECG, Lipid Panel, Crea, BUA, SGPT, FBS, U/A, CXR, HBsAg',
    price: '1450.00',
    labTestId: '11',
    type: 'package',
  },
];

const PregnancyLabPackage = [
  {
    key: 'Pregnancy_package3',
    name: 'Pregnancy Lab Package',
    services: 'CBC, Urinalysis, Blood Typing, OGTT(75g, 2hrs), HIV test, HBsAG, VDRL/RPR',
    labTestId: '4',
    price: '1500.00',
    type: 'package',
  },
];

const AnnualWellnessPackageBasic = [
  {
    key: 'AnnualA_package4',
    name: 'Annual A (FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT CBC, Urinalysis)',
    services: 'FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT CBC, Urinalysis',
    price: '1500.00',
    labTestId: '12',
    type: 'package',
  },
  {
    key: 'AnnualB_package4',
    name: 'Annual B (FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT, Electrolytes CBC, Urinalysis)',
    services: 'FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT, Electrolytes CBC, Urinalysis',
    price: '2450.00',
    labTestId: '13',
    type: 'package',
  },
  {
    key: 'AnnualC_package4',
    name: 'Annual C (FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT, HbAiC, Electrolytes CBC, Urinalysis)',
    services: 'FBS,BUN,Creatinine, Uric Acid, Lipid Panel, SGPT, SGOT, HbAiC, Electrolytes CBC, Urinalysis',
    price: '3300.00',
    labTestId: '14',
    type: 'package',
  },
];

const ThyroidTestPackage = [
  {
    key: 'ThyroidTest_package5',
    name: 'Thyroid Test Package',
    services: 'TSH, FT3, FT4',
    labTestId: '5',
    price: '0.00',
    type: 'package',
  },
];

const AnnualWellnessPackagePremium = [
  {
    key: 'AnnualWellnessPremium_package6',
    name: 'Annual Wellness Pakcage (Premium)',
    services: '',
    labTestId: '6',
    price: '0.00',
    type: 'package',
  },
];

const LiverFunctionTestPackage = [
  {
    key: 'LiverFunction_package7',
    name: 'Live Function Test',
    services: '',
    labTestId: '7',
    price: '0.00',
    type: 'package',
  },
];

const DiabetesandCholesterolPackage = [
  {
    key: 'DiabetesandCholesterol_package8',
    name: 'Diabetes and Cholesterol Package',
    services: '',
    labTestId: '8',
    price: '0.00',
    type: 'package',
  },
];

const allPackages = PreEmploymentPackageBasic.concat(
  PreEmploymentPackageDiscount,
  PregnancyLabPackage,
  AnnualWellnessPackageBasic,
  ThyroidTestPackage,
  AnnualWellnessPackagePremium,
  LiverFunctionTestPackage,
  DiabetesandCholesterolPackage
);

/*********************************
 * SERVICES
 ********************************/

const ClincalMicroscopy = [
  {
    key: 'Urinalysis_1',
    name: 'Urinalysis',
    categoryId: '1',
    labTestId: '1',
    price: '70.00',
    type: 'lab',
  },
  {
    key: 'UrineKetone_1',
    name: 'Urine Ketone',
    categoryId: '1',
    labTestId: '2',
    price: '70.00',
    type: 'lab',
  },
  {
    key: 'UrineRBCMorphology_1',
    name: 'Urine RBC Morphology',
    categoryId: '1',
    labTestId: '3',
    price: '150.00',
    type: 'lab',
  },
  {
    key: 'Fecalysis_1',
    name: 'Fecalysis',
    categoryId: '1',
    labTestId: '4',
    price: '50.00',
    type: 'lab',
  },
  {
    key: 'FecalOccultBlood_1',
    name: 'Fecal Occult Blood',
    categoryId: '1',
    labTestId: '5',
    price: '350.00',
    type: 'lab',
  },
  {
    key: 'PregnacyTest_1',
    name: 'Pregnancy Test (RPK-Lateral Flow)',
    categoryId: '1',
    labTestId: '6',
    price: '140.00',
    type: 'lab',
  },
  {
    key: 'SpermAnalysis_1',
    name: 'Sperm Analysis',
    categoryId: '1',
    labTestId: '7',
    price: '350.00',
    type: 'lab',
  },
];

const Hematology = [
  {
    key: 'CBCwithPlatelet_2',
    name: 'CBC with Platelet',
    categoryId: '2',
    labTestId: '8',
    price: '200.00',
    type: 'lab',
  },
  {
    key: 'WBCDifferential_2',
    name: 'WBC Differential',
    categoryId: '2',
    labTestId: '9',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'HematocritPLT_2',
    name: 'Hematocrit, PLT',
    categoryId: '2',
    labTestId: '10',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'HemoglobinHematocrit_2',
    name: 'Hemoglobin, Hematocrit',
    categoryId: '2',
    labTestId: '11',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'BloodTyping_2',
    name: 'Forward and reverse ABO group (Blood Typing)',
    categoryId: '2',
    labTestId: '12',
    price: '150.00',
    type: 'lab',
  },
  {
    key: 'ESR_2',
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    categoryId: '2',
    labTestId: '13',
    price: '170.00',
    type: 'lab',
  },
  {
    key: 'PeripheralBloodSmear_2',
    name: 'Peripheral Blood Smear/Special Hematology',
    categoryId: '2',
    labTestId: '14',
    price: '420.00',
    type: 'lab',
  },
  {
    key: 'ClottingBleedingTime_2',
    name: 'Clotting & Bleeding Time',
    categoryId: '2',
    labTestId: '15',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'ReticulocyteCount_2',
    name: 'Reticulocyte Count/Retics',
    categoryId: '2',
    labTestId: '16',
    price: '300.00',
    type: 'lab',
  },
];

//CHEMISTRY

const Electrocytes = [
  {
    key: 'SodiumPotassiumChloride_4',
    name: 'Electrolytes (NaKCl,iCA)',
    categoryId: '3',
    labTestId: '114',
    price: '900.00',
    type: 'lab',
  },
  {
    key: 'IonizedCalcium_4',
    name: 'Ionized Calcium',
    categoryId: '4',
    labTestId: '19',
    price: '450.00',
    type: 'lab',
  },
  {
    key: 'Magnesium_4',
    name: 'Magnesium',
    categoryId: '4',
    labTestId: '22',
    price: '600.00',
    type: 'lab',
  },
  {
    key: 'Phosphorus_4',
    name: 'Phosphorus',
    categoryId: '4',
    labTestId: '23',
    price: '500.00',
    type: 'lab',
  },
];

const GlucoseTests = [
  {
    key: 'FastingBloodSugar_5',
    name: 'Fasting Blood Sugar',
    categoryId: '5',
    labTestId: '24',
    price: '125.00',
    type: 'lab',
  },
  {
    key: 'RandomBloodSugar_5',
    name: 'Random Blood Sugar',
    categoryId: '5',
    labTestId: '25',
    price: '125.00',
    type: 'lab',
  },
  {
    key: 'OGTT2Extractions_5',
    name: 'OGTT 2 Extractions (Fasting, 1st hour) 75g',
    categoryId: '5',
    labTestId: '26',
    price: '450.00',
    type: 'lab',
  },
  {
    key: 'OGTT3Extractions_5',
    name: 'OGTT 3 Extractions (75g)',
    categoryId: '5',
    labTestId: '27',
    price: '720.00',
    type: 'lab',
  },
  {
    key: 'TwohrsPPBS_5',
    name: '2 hrs PPBS',
    categoryId: '5',
    labTestId: '28',
    price: '200.00',
    type: 'lab',
  },
  {
    key: 'HbA1c_5',
    name: 'HbA1c',
    categoryId: '5',
    labTestId: '29',
    price: '880.00',
    type: 'lab',
  },
];

const KidneyFunctionTests = [
  {
    key: 'Creatinine_6',
    name: 'Creatinine',
    categoryId: '6',
    labTestId: '30',
    price: '140.00',
    type: 'lab',
  },
  {
    key: 'BloodUreaNitrogen_6',
    name: 'Blood Urea Nitrogran',
    categoryId: '6',
    labTestId: '31',
    price: '125.00',
    type: 'lab',
  },
  {
    key: 'BloodUricAcid_6',
    name: 'Blood Uric Acid',
    categoryId: '6',
    labTestId: '32',
    price: '125.00',
    type: 'lab',
  },
  {
    key: 'TPAG_6',
    name: 'TPAG(Total Protein, Albumin, Globulin)',
    categoryId: '6',
    labTestId: '33',
    price: '350.00',
    type: 'lab',
  },
  {
    key: 'TotalProteinOnly_6',
    name: 'Total Protein Only',
    categoryId: '6',
    labTestId: '34',
    price: '200.00',
    type: 'lab',
  },
  {
    key: 'AlbuminOnly_6',
    name: 'Albumin Only',
    categoryId: '6',
    labTestId: '35',
    price: '180.00',
    type: 'lab',
  },
];

const LipidProfile = [
  {
    key: 'CholesterolEtc_7',
    name: 'Cholesterol, Triglycerides, HDL, LDL, Vl, DL',
    categoryId: '7',
    labTestId: '36',
    price: '600.00',
    type: 'lab',
  },
  {
    key: 'TotalCholesterolOnly_7',
    name: 'Total Cholesterol Only',
    categoryId: '7',
    labTestId: '37',
    price: '190.00',
    type: 'lab',
  },
  {
    key: 'HDLOnly_7',
    name: 'HDL Only',
    categoryId: '7',
    labTestId: '38',
    price: '280.00',
    type: 'lab',
  },
  {
    key: 'Triglycerides_7',
    name: 'Triglycerides Only',
    categoryId: '7',
    labTestId: '39',
    price: '200.00',
    type: 'lab',
  },
];

const PancreaticTest = [
  {
    key: 'Amylase_8',
    name: 'Amylase',
    categoryId: '8',
    labTestId: '40',
    price: '350.00',
    type: 'lab',
  },
];

const LiverFunctionTests = [
  {
    key: 'ALTSGPT_9',
    name: 'ALT/SGPT',
    categoryId: '9',
    labTestId: '41',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'ASTSGOT_9',
    name: 'AST/SGOT',
    categoryId: '9',
    labTestId: '42',
    price: '180.00',
    type: 'lab',
  },
  {
    key: 'ALP_9',
    name: 'Alkaline Phosphatase (ALP)',
    categoryId: '9',
    labTestId: '43',
    price: '200.00',
    type: 'lab',
  },
  {
    key: 'BilirubinPanel_9',
    name: 'Bilirubin Panel',
    categoryId: '9',
    labTestId: '44',
    price: '140.00',
    type: 'lab',
  },
  {
    key: 'DirectBilirubin_9',
    name: 'Direct Bilirubin',
    categoryId: '9',
    labTestId: '45',
    price: '90.00',
    type: 'lab',
  },
  {
    key: 'IndirectBilirubin_9',
    name: 'Indirect Bilirubin',
    categoryId: '9',
    labTestId: '46',
    price: '90.00',
    type: 'lab',
  },
  {
    key: 'LDH_9',
    name: 'LDH',
    categoryId: '9',
    labTestId: '47',
    price: '580.00',
    type: 'lab',
  },
];

//SEROLOGY
const Immunology = [
  {
    key: 'Dengue_11',
    name: 'Dengue',
    categoryId: '11',
    labTestId: '48',
    price: '1300.00',
    type: 'lab',
  },
  {
    key: 'SyphilisRPSVDRL_11',
    name: 'Syphilis/RPS/VDRL',
    categoryId: '11',
    labTestId: '49',
    price: '250.00',
    type: 'lab',
  },
  {
    key: 'HIVScreening_11',
    name: 'HIV Screening (Anti HIV)',
    categoryId: '11',
    labTestId: '50',
    price: '600.00',
    type: 'lab',
  },
];

const HepatitisProfileScreening = [
  {
    key: 'HBSag_12',
    name: 'HBSag (Hepatitis B Antigen)',
    categoryId: '12',
    labTestId: '51',
    price: '290.00',
    type: 'lab',
  },
  {
    key: 'AntiHBs_12',
    name: 'Anti HBs/HBSab Hepatitis B Antibody',
    categoryId: '12',
    labTestId: '52',
    price: '500.00',
    type: 'lab',
  },
  {
    key: 'AntiHCV_12',
    name: 'Anti HCV',
    categoryId: '12',
    labTestId: '53',
    price: '530.00',
    type: 'lab',
  },
  {
    key: 'AntiHAV_12',
    name: 'Anti HAV',
    categoryId: '12',
    labTestId: '54',
    price: '750.00',
    type: 'lab',
  },
];

const ThyroidProfile = [
  {
    key: 'TSH_13',
    name: 'TSH',
    categoryId: '13',
    labTestId: '55',
    price: '900.00',
    type: 'lab',
  },
  {
    key: 'FT4_13',
    name: 'FT4',
    categoryId: '13',
    labTestId: '56',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'FT3_13',
    name: 'FT3',
    categoryId: '13',
    labTestId: '57',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'T4_13',
    name: 'T4',
    categoryId: '13',
    labTestId: '58',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'T3_13',
    name: 'T3',
    categoryId: '13',
    labTestId: '59',
    price: '750.00',
    type: 'lab',
  },
];

const TumorMarkers = [
  {
    key: 'PSA_14',
    name: 'PSA',
    categoryId: '14',
    labTestId: '60',
    price: '1300.00',
    type: 'lab',
  },
  {
    key: 'CA125_14',
    name: 'CA-125 (Ovarian)',
    categoryId: '14',
    labTestId: '61',
    price: '1500.00',
    type: 'lab',
  },
];

const Histophatology = [
  {
    key: 'PapsSmear_15',
    name: 'Paps Smear',
    categoryId: '15',
    labTestId: '62',
    price: '300.00',
    type: 'lab',
  },
];

const CovidRapidTests = [
  {
    key: 'AntigenRapidSwab_16',
    name: 'Antigen Rapid Swab (Nasal)',
    categoryId: '16',
    labTestId: '63',
    price: '960.00',
    type: 'lab',
  },
  {
    key: 'AntigenRapidSwabGroup_16',
    name: 'Antigen Rapid Swab Group (Nasal)',
    categoryId: '16',
    labTestId: '118',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'AntibodyRapidTest_16',
    name: 'Antibody Rapid Test (Blood)',
    categoryId: '16',
    labTestId: '64',
    price: '600.00',
    type: 'lab',
  },
  {
    key: 'AntibodyTiter_16',
    name: 'Antibody Titer (Blood)',
    categoryId: '16',
    labTestId: '65',
    price: '1000.00',
    type: 'lab',
  },
];

const Microbiology = [
  {
    key: 'GramStain_17',
    name: 'Gram Stain',
    categoryId: '17',
    labTestId: '66',
    price: '350.00',
    type: 'lab',
  },
  {
    key: 'KOH_17',
    name: 'KOH',
    categoryId: '17',
    labTestId: '67',
    price: '300.00',
    type: 'lab',
  },
];

//Imaging
const Xray = [
  {
    key: 'AbdominalSupine_18',
    name: 'Abdominal Supine/Upright',
    categoryId: '18',
    labTestId: '68',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'AnkleAPL_18',
    name: 'Ankle APL',
    categoryId: '18',
    labTestId: '69',
    price: '500.00',
    type: 'lab',
  },
  {
    key: 'ChestPA_18',
    name: 'Chest PA',
    categoryId: '18',
    labTestId: '70',
    price: '190.00',
    type: 'lab',
  },
  {
    key: 'ChestPALAPL_18',
    name: 'Chest PAL/APL',
    categoryId: '18',
    labTestId: '71',
    price: '360.00',
    type: 'lab',
  },
  {
    key: 'ChestBucky_18',
    name: 'Chest Bucky',
    categoryId: '18',
    labTestId: '72',
    price: '250.00',
    type: 'lab',
  },
  {
    key: 'CervicalAPL_18',
    name: 'Cervical APL',
    categoryId: '18',
    labTestId: '73',
    price: '370.00',
    type: 'lab',
  },
  {
    key: 'Elbow_18',
    name: 'Elbow',
    categoryId: '18',
    labTestId: '74',
    price: '530.00',
    type: 'lab',
  },
  {
    key: 'FemurAPL_18',
    name: 'Femur APL',
    categoryId: '18',
    labTestId: '75',
    price: '650.00',
    type: 'lab',
  },
  {
    key: 'FlatPlateUpright_18',
    name: 'Flat Plate Upright',
    categoryId: '18',
    labTestId: '76',
    price: '450.00',
    type: 'lab',
  },
  {
    key: 'ForearmAPL_18',
    name: 'Forearm APL',
    categoryId: '18',
    labTestId: '77',
    price: '640.00',
    type: 'lab',
  },
  {
    key: 'FootAPOL_18',
    name: 'Foot APOL',
    categoryId: '18',
    labTestId: '78',
    price: '525.00',
    type: 'lab',
  },
  {
    key: 'HandAPOL_18',
    name: 'Hand APOL',
    categoryId: '18',
    labTestId: '79',
    price: '525.00',
    type: 'lab',
  },
  {
    key: 'HumerusAPL_18',
    name: 'Humerus APL',
    categoryId: '18',
    labTestId: '80',
    price: '420.00',
    type: 'lab',
  },
  {
    key: 'KUB_18',
    name: 'KUB',
    categoryId: '18',
    labTestId: '81',
    price: '210.00',
    type: 'lab',
  },
  {
    key: 'KneeAPL_18',
    name: 'Knee APL',
    categoryId: '18',
    labTestId: '82',
    price: '530.00',
    type: 'lab',
  },
  {
    key: 'LumboSacralAPL_18',
    name: 'Lumbo-Sacral APL',
    categoryId: '18',
    labTestId: '83',
    price: '850.00',
    type: 'lab',
  },
  {
    key: 'LegAPL_18',
    name: 'Leg APL',
    categoryId: '18',
    labTestId: '84',
    price: '650.00',
    type: 'lab',
  },
  {
    key: 'MastoidSeries_18',
    name: 'Mastoid Series',
    categoryId: '18',
    labTestId: '85',
    price: '1300.00',
    type: 'lab',
  },
  {
    key: 'ParanasalSinusesComplete_18',
    name: 'ParanasalSinusesComplete',
    categoryId: '18',
    labTestId: '86',
    price: '450.00',
    type: 'lab',
  },
  {
    key: 'PelvisAP_18',
    name: 'Pelvis AP',
    categoryId: '18',
    labTestId: '87',
    price: '530.00',
    type: 'lab',
  },
  {
    key: 'ScolioticSeries_18',
    name: 'Scoliotic Series',
    categoryId: '18',
    labTestId: '88',
    price: '1320.00',
    type: 'lab',
  },
  {
    key: 'ShoulderAP_18',
    name: 'Shoulder AP',
    categoryId: '18',
    labTestId: '89',
    price: '370.00',
    type: 'lab',
  },
  {
    key: 'SkullAPL_18',
    name: 'Skull APL',
    categoryId: '18',
    labTestId: '90',
    price: '530.00',
    type: 'lab',
  },
  {
    key: 'PhoraceLumbarAPL_18',
    name: 'Phorace-Lumber APL',
    categoryId: '18',
    labTestId: '91',
    price: '1320.00',
    type: 'lab',
  },
  {
    key: 'WristAPOL_18',
    name: 'Wrist APOL',
    categoryId: '18',
    labTestId: '92',
    price: '530.00',
    type: 'lab',
  },
];

const Cardiology = [
  {
    key: 'Doppler_19',
    name: 'Doppler 2-Echo',
    categoryId: '19',
    labTestId: '93',
    price: '3000.00',
    type: 'lab',
  },
  {
    key: 'ECG_19',
    name: 'ECG',
    categoryId: '19',
    labTestId: '94',
    price: '140.00',
    type: 'lab',
  },
];

const MedicalCertificate = [
  {
    key: 'medicalCert_20',
    name: 'Fit to Work Clearance (Physical Exam)',
    categoryId: '20',
    labTestId: '95',
    price: '300.00',
    type: 'lab',
  },
];

const UltraSound = [
  {
    key: 'Abdominal_21',
    name: 'Abdominal',
    categoryId: '21',
    labTestId: '96',
    price: '1650.00',
    type: 'lab',
  },
  {
    key: 'AbdominalProstate_21',
    name: 'Abdominal Prostate',
    categoryId: '21',
    labTestId: '97',
    price: '2100.00',
    type: 'lab',
  },
  {
    key: 'AbdominalPelvic_21',
    name: 'Abdominal Pelvic',
    categoryId: '21',
    labTestId: '98',
    price: '2100.00',
    type: 'lab',
  },
  {
    key: 'Breast_21',
    name: 'Breast',
    categoryId: '21',
    labTestId: '99',
    price: '1200',
    type: 'lab',
  },
  {
    key: 'CongenitalScreening_21',
    name: 'Congential Screening',
    categoryId: '21',
    labTestId: '100',
    price: '0.00',
    type: 'lab',
  },
  {
    key: 'Cranial_21',
    name: 'Cranial',
    categoryId: '21',
    labTestId: '101',
    price: '800.00',
    type: 'lab',
  },
  {
    key: 'HepatobiliaryTree_21',
    name: 'Hepatobiliary Tree',
    categoryId: '21',
    labTestId: '102',
    price: '800.00',
    type: 'lab',
  },
  {
    key: 'InguinalArea_21',
    name: 'Inguinal Area',
    categoryId: '21',
    labTestId: '103',
    price: '700.00',
    type: 'lab',
  },
  {
    key: 'KUBRenal_21',
    name: 'KUB Renal',
    categoryId: '21',
    labTestId: '104',
    price: '900.00',
    type: 'lab',
  },
  {
    key: 'KUBProstate_21',
    name: 'KUB Prostate',
    categoryId: '21',
    labTestId: '105',
    price: '1300.00',
    type: 'lab',
  },
  {
    key: 'LowerAbdominal_21',
    name: 'Lower Abdominal',
    categoryId: '21',
    labTestId: '106',
    price: '1300.00',
    type: 'lab',
  },
  {
    key: 'Pelvic_21',
    name: 'Pelvic (Fetal Aging)',
    categoryId: '21',
    labTestId: '107',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'ProstateGland_21',
    name: 'Prostate Gland',
    categoryId: '21',
    labTestId: '108',
    price: '500.00',
    type: 'lab',
  },
  {
    key: 'Scrotal_21',
    name: 'Scrotal',
    categoryId: '21',
    labTestId: '109',
    price: '1200.00',
    type: 'lab',
  },
  {
    key: 'SmallPartsUtz_21',
    name: 'Small Pats Utz',
    categoryId: '21',
    labTestId: '110',
    price: '650.00',
    type: 'lab',
  },
  {
    key: 'Thyroid_21',
    name: 'Thyroid',
    categoryId: '21',
    labTestId: '111',
    price: '750.00',
    type: 'lab',
  },
  {
    key: 'Transvaginal_21',
    name: 'Transvaginal (TVS)',
    categoryId: '21',
    labTestId: '112',
    price: '800.00',
    type: 'lab',
  },
  {
    key: 'UpperAbdominal_21',
    name: 'Upper Abdominal',
    categoryId: '21',
    labTestId: '113',
    price: '850.00',
    type: 'lab',
  },
];

const Promo = [
  {
    key: 'ChestIndividual_22',
    name: 'Chest XRAY Test Promo Individual',
    categoryId: '22',
    labTestId: '119',
    price: '170.00',
    type: 'lab',
  },
  {
    key: 'ChestGroup_22',
    name: 'Chest XRAY Test Promo Group (15 PAX OR MORE)',
    categoryId: '22',
    labTestId: '120',
    price: '150.00',
    type: 'lab',
  },
  {
    key: 'HbsagIndividual_22',
    name: 'Hbsag Test Promo Individual',
    categoryId: '22',
    labTestId: '121',
    price: '270.00',
    type: 'lab',
  },
  {
    key: 'HbsagGroup_22',
    name: 'Hbsag Test Promo Group (15 PAX OR MORE)',
    categoryId: '22',
    labTestId: '117',
    price: '240.00',
    type: 'lab',
  },
];

const allLabServices = ClincalMicroscopy.concat(
  Hematology,
  Electrocytes,
  GlucoseTests,
  KidneyFunctionTests,
  LipidProfile,
  PancreaticTest,
  LiverFunctionTests,
  Immunology,
  HepatitisProfileScreening,
  ThyroidProfile,
  TumorMarkers,
  Histophatology,
  CovidRapidTests,
  Microbiology,
  Xray,
  Cardiology,
  MedicalCertificate,
  UltraSound,
  Promo
);

/*********************************
 * GET PACKAGE SERVICES
 ********************************/
//All Packages
export const getAllPackages = () => {
  return allPackages;
};

//Pre Employment Basic
export const getPreEmploymentBasic = () => {
  return PreEmploymentPackageBasic;
};

//Pre Employment (Group Discounts 15 pax or more)
export const getPreEmploymentDiscount = () => {
  return PreEmploymentPackageDiscount;
};

//Pregnancy Lab Package
export const getPregnancyLabPackage = () => {
  return PregnancyLabPackage;
};

//Pregnancy Lab Package
export const getAnnualWellnessPackageBasic = () => {
  return AnnualWellnessPackageBasic;
};

export const getThyroidTestPackage = () => {
  return ThyroidTestPackage;
};

export const getAnnualWellnessPackagePremium = () => {
  return AnnualWellnessPackagePremium;
};

export const getLiverFunctionTestPackage = () => {
  return LiverFunctionTestPackage;
};

export const getDiabetesandCholesterolPackage = () => {
  return DiabetesandCholesterolPackage;
};

/*********************************
 * GET LABORATORY SERVICES
 ********************************/

//All
export const getAllLabServices = () => {
  return allLabServices;
};

//Clinical Microscopy
export const getClinicalMicroscopy = () => {
  return ClincalMicroscopy;
};

//Hematology
export const getHematology = () => {
  return Hematology;
};

//Electrolytes
export const getElectrolytes = () => {
  return Electrocytes;
};

//Glucose Tests
export const getGlucoseTests = () => {
  return GlucoseTests;
};

//Kidney Function Tests
export const getKidneyFunctionTests = () => {
  return KidneyFunctionTests;
};

//Lipid Profile
export const getLipidProfile = () => {
  return LipidProfile;
};

//Pancreatic Tests
export const getPacreaticTests = () => {
  return PancreaticTest;
};

//Liver Function Tests
export const getLiverFunctionTests = () => {
  return LiverFunctionTests;
};

//Immunology
export const getImmunology = () => {
  return Immunology;
};

//Hepatitis Profile Screening
export const getHepatitisProfileScreening = () => {
  return HepatitisProfileScreening;
};

//Thyroid Profile
export const getThyroidProfile = () => {
  return ThyroidProfile;
};

//Tumor Markers
export const getTumorMarkers = () => {
  return TumorMarkers;
};

//Histopathology
export const getHistopathology = () => {
  return Histophatology;
};

//COVID Rapid Tests
export const getCOVIDRapidTests = () => {
  return CovidRapidTests;
};

//Microbiology
export const getMicrobiology = () => {
  return Microbiology;
};

/*********************************
 * GET IMAGING SERVICES
 ********************************/

//Xray
export const getXray = () => {
  return Xray;
};

//Cardiology
export const getCardiology = () => {
  return Cardiology;
};

//Medical Certificate
export const getMedicalCertificate = () => {
  return MedicalCertificate;
};

//Ultrasound
export const getUltrasound = () => {
  return UltraSound;
};

//Promo
export const getPromo = () => {
  return Promo;
};
