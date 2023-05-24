 const labResultsData = {
    testsToCheck: [
        "Urinalysis",
        "Fecalysis",
        "Fecal Occult Blood",
        "Pregnancy Test (RPK Lateral Flow)",
        "Serum Pregnancy Test",
        "Sperm Analysis",
        "Gram Stain",
        "KOH",
        "Dengue",
        "Syphilis/RPR/VDRL",
        "HIV SCreening (Anti HIV)",
        "H. Pylori",
        "HBSag (Hepatitis B Antigen)",
        "Anti HBs/HBSab (Hepatitis B Antibody)",
        "TSH",
        "FT4",
        "FT3",
        "T3",
        "PSA",
        "CEA",
        "VITAMIN D",
    ],
    
    urinalysisColorOptions: [
       {
       value: 'LIGHT YELLOW',
       label: 'LIGHT YELLOW'
       },
       {
       value: 'YELLOW',
       label: 'YELLOW'
       },
       {
       value: 'DARK YELLOW',
       label: 'DARK YELLOW'
       },
       {
       value: 'AMBER',
       label: 'AMBER'
       },
       {
       value: 'STRAW',
       label: 'STRAW'
       }
     ],

     urinalysisSugarProteinOptions: [
      {
        value: 'NEGATIVE',
        label: 'NEGATIVE'
      },
      {
        value: 'TRACE',
        label: 'TRACE'
      },
      {
        value: '1+',
        label: '1+'
      },
      {
        value: '++',
        label: '++'
      },
      {
        value: '+++',
        label: '+++'
      },
      {
        value: '++++',
        label: '++++'
      }
     ],

     urinalysisPregnancyTestOptions: [
      {
        value: 'POSITIVE',
        label: 'POSITIVE'
      },
      {
        value: 'NEGATIVE',
        label: 'NEGATIVE'
      }
     ],
   
     urinalysisTransparencyOptions : [
       {
       value: 'CLEAR',
       label: 'CLEAR'
       },
       {
       value: 'HAZY',
       label: 'HAZY'
       },
       {
       value: 'CLOUDY',
       label: 'CLOUDY'
       },
       {
       value: 'TURBID',
       label: 'TURBID'
       }
   ],
   
     MicroscopicExamOptions : [
       {
       value: 'RARE',
       label: 'RARE'
       },
       {
       value: 'FEW',
       label: 'FEW'
       },
       {
       value: 'MODERATE',
       label: 'MODERATE'
       },
       {
       value: 'MANY',
       label: 'MANY'
       }
   ],
   
     fecalysisColorOptions : [
       {
       value: 'BROWN',
       label: 'BROWN'
       },
       {
       value: 'DARK BROWN',
       label: 'DARK BROWN'
       },
       {
       value: 'LIGHT BROWN',
       label: 'LIGHT BROWN'
       },
       {
       value: 'YELLOWISH BROWN',
       label: 'YELLOWISH BROWN'
       },
       {
       value: 'GREENISH BROWN',
       label: 'GREENISH BROWN'
       },
       {
       value: 'TARRY',
       label: 'TARRY'
       }
   ],
   
     fecalysisConsistencyOptions : [
       {
       value: 'SOFT',
       label: 'SOFT'
       },
       {
       value: 'FORMED',
       label: 'FORMED'
       },
       {
       value: 'MUCOID',
       label: 'MUCOID'
       },
       {
       value: 'WATERY',
       label: 'WATERY'
       },
       {
       value: 'MUSHY',
       label: 'MUSHY'
       },
   ],
   
     fecalysisOvaParasiteOptions : [
       {
       value: 'NO INTESTINAL OVA/PARASITE SEEN',
       label: 'NO INTESTINAL/PARASITE OVA SEEN'
       },
       {
       value: 'INSTESTINAL OVA/PARASITES PRESENT',
       label: 'INSTESTINAL OVA/PARASITES PRESENT'
       },
   ],
   
     fecalysisCystTrophozoiteOptions : [
       {
       value: 'NO CYSTS/TROPHOZOITES SEEN',
       label: 'NO CYSTS/TROPHOZOITES SEEN'
       },
       {
       value: 'CYSTS/TROPHOZOITES PRESENT',
       label: 'CYSTS/TROPHOZOITES PRESENT'
       },
   ],
   
     posNegOptions : [
       {
       value: 'NEGATIVE',
       label: 'NEGATIVE'
       },
       {
       value: 'POSITIVE',
       label: 'POSITIVE'
       },
   ],
   
     posNegOptions2 : [
       {
       value: 'NEGATIVE',
       label: 'NEGATIVE'
       },
       {
       value: 'POSITIVE',
       label: 'POSITIVE'
       },
       {
       value: 'WEAKLY POSITIVE',
       label: 'WEAKLY POSITIVE'
       },
   ],
   
     reactiveNonReactiveOptions : [
       {
       value: 'NON REACTIVE',
       label: 'NON REACTIVE'
       },
       {
       value: 'REACTIVE',
       label: 'REACTIVE'
       },
   ],
     
       labTestUrinalysis : [
       {
         "lab_test": "Color",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       {
         "lab_test": "Transparency",
         "result": "",
         "resultType": "dropdown",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Ph",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 5.00,
         "preferred_to": 9.00,
         
       },
       {
         "lab_test": "Specific Gravity",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 1.005,
         "preferred_to": 1.03,
         
       },
       {
         "lab_test": "Protein",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Sugar",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Pus Cells",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 2.00,
         
       },
       {
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 2.00,
         
       },
       {
         "lab_test": "Epithelial Cells",
         "result": "",
         "resultType": "dropdown",
         "unit": "/LPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Bacteria",
         "result": "",
         "resultType": "dropdown",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Amorphous Urates/Phosphate",
         "result": "",
         "unit": "/LPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
         
       },
       {
         "lab_test": "Mucus Threads",
         "result": "",
         "unit": "/LPF",
         "resultType": "dropdown",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       {
         "lab_test": "OTHERS",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Pregnancy Test",
         "result": "POSITIVE",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       }
     ],
     
       labTestFecalysis : [
       {
         "lab_test": "Color",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,

       },
       {
         "lab_test": "Consistency",
         "result": "",
         "unit": " ",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       {
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 3.00,
         "preferred_to": 5.00,
          
       },
       {
         "lab_test": "Pus Cells",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 1.00,
          
       },
       {
         "lab_test": "Fat Globules",
         "result": "",
         "unit": "/LPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       {
         "lab_test": "Ova/Parasite",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       {
         "lab_test": "Cyst/Trophozoite",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },
       
     ],
     
       labTestFecalOccultBlood : [
       {
         "lab_test": "Fecal Occult Blood",
         "result": "",
         "unit": " ",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestPregnancyTest : [
       {
         "lab_test": "Pregnancy Test",
         "result": "",
         "unit": " ",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestSerumPregnancyTest : [
       {
         "lab_test": "Serum Pregnancy Test",
         "result": "",
         "unit": " ",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestSpermAnalysis : [
       {
         "lab_test": "PH Reaction",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 1.50,
         "preferred_to":999.99,
       },
       {
         "lab_test": "Volume",
         "result": "",
         "unit": "ml",
         "preferred": " ",
         "preferred_from": 7.20,
         "preferred_to": 999.99,
       },
       {
         "lab_test": "Liquefaction Time",
         "result": "",
         "unit": "minutes",
         "preferred": " ",
         "preferred_from": 30.00,
         "preferred_to": 60.00,
       },
       {
         "lab_test": "Viscosity",
         "result": "",
         "unit": "cm",
         "preferred": " ",
         "preferred_from": 2.00,
         "preferred_to": 999.99,
       },
       {
         "lab_test": "Total Sperm Count",
         "result": "",
         "unit": "x106/ ejaculate",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
          
       },{
         "lab_test": "Progresive (PR)",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 40.00,
         "preferred_to": 999.99,
       },
       {
         "lab_test": "Non Progressive",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 32.00,
         "preferred_to": 999.99,
       },
       {
         "lab_test": "Immotile",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Total Motility (PR+NP)",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 32.00,
         "preferred_to": 999.99,
       },
       {
         "lab_test": "Total Normal Forms",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Pin Head",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Double Head",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Gaint Head",
         "result": "",
         "unit": "%",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "WBC",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 5.00,
       },
       {
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 5.00,
       },
     ],
     
       labTestGramStain : [
       {
         "lab_test": "Gram Staining",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Epithelial Cells",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "Specimen: Conjunctival and Corneal Scraping",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestKOH : [
       {
         "lab_test": "KOH, Nail Scrapping, Conjunctival Scrapping",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestDengue : [
       {
         "lab_test": "NS1 AG",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "IgG",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
       {
         "lab_test": "IgM",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestSyphilis : [
       {
         "lab_test": "Syphilis/RPR/VDRL",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestHIVScreening : [
       {
         "lab_test": "Anti-HIV",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestHPylori : [
       {
         "lab_test": "H. Pylori",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestHepatitisB : [
       {
         "lab_test": "Hepatitis B Surface Antigen Test (HBSag)",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
         labTestHepatitisA : [
         {
         "lab_test": "Hepatitis A Surface Antibody Test, Anti-HCV, Anti-HAV",
         "result": "",
         "unit": "",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestTSH : [
       {
         "lab_test": "TSH",
         "result": "",
         "unit": "mIU / L",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestFT4 : [
       {
         "lab_test": "FT4",
         "result": "",
         "unit": "pmol / L",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestFT3 : [
       {
         "lab_test": "FT3",
         "result": "",
         "unit": "pmol / L",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestT3 : [
     {
         "lab_test": "T2-T3",
         "result": "",
         "unit": "nmol / L",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestPSA : [
       {
         "lab_test": "PSA",
         "result": "",
         "unit": "ng / mL",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestCEA : [
       {
         "lab_test": "CEA",
         "result": "",
         "unit": "ng / mL",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
     
       labTestVitaminD : [
       {
         "lab_test": "Vitamin D",
         "result": "",
         "unit": "ng / mL",
         "preferred": " ",
         "preferred_from": 0.00,
         "preferred_to": 0.00,
       },
     ],
 };

 export default labResultsData;