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
          
       },
       {
         "lab_test": "Transparency",
         "result": "",
         "resultType": "dropdown",
         "unit": "",
         
       },
       {
         "lab_test": "Ph",
         "result": "",
         "unit": "",
         
       },
       {
         "lab_test": "Specific Gravity",
         "result": "",
         "unit": "",
         
       },
       {
         "lab_test": "Protein",
         "result": "",
         "unit": "",
         
       },
       {
         "lab_test": "Sugar",
         "result": "",
         "unit": "",
         
       },
       {
         "lab_test": "Pus Cells",
         "result": "",
         "unit": "/HPF",
         
       },
       {
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
         
       },
       {
         "lab_test": "Epithelial Cells",
         "result": "",
         "resultType": "dropdown",
         "unit": "/LPF",
         
       },
       {
         "lab_test": "Bacteria",
         "result": "",
         "resultType": "dropdown",
         "unit": "/HPF",
         
       },
       {
         "lab_test": "Amorphous Urates/Phosphate",
         "result": "",
         "unit": "/LPF",
         
       },
       {
         "lab_test": "Mucus Threads",
         "result": "",
         "unit": "/LPF",
         "resultType": "dropdown",
          
       },
       {
         "lab_test": "OTHERS",
         "result": "",
         "unit": "",
       },
       {
         "lab_test": "Pregnancy Test",
         "result": "POSITIVE",
         "unit": "",
       }
     ],
     
       labTestFecalysis : [
       {
         "lab_test": "Color",
         "result": "",
         "unit": "",
          
       },
       {
         "lab_test": "Consistency",
         "result": "",
         "unit": " ",
          
       },
       {
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
          
       },
       {
         "lab_test": "Pus Cells",
         "result": "",
         "unit": "/HPF",
          
       },
       {
         "lab_test": "Fat Globules",
         "result": "",
         "unit": "/LPF",
          
       },
       {
         "lab_test": "Ova/Parasite",
         "result": "",
         "unit": "",
          
       },
       {
         "lab_test": "Cyst/Trophozoite",
         "result": "",
         "unit": "",
          
       },
       
     ],
     
       labTestFecalOccultBlood : [
       {
         "lab_test": "Fecal Occult Blood",
         "result": "",
         "unit": " ",
          
       },
     ],
     
       labTestPregnancyTest : [
       {
         "lab_test": "Pregnancy Test",
         "result": "",
         "unit": " ",
          
       },
     ],
     
       labTestSerumPregnancyTest : [
       {
         "lab_test": "Serum Pregnancy Test",
         "result": "",
         "unit": " ",
          
       },
     ],
     
       labTestSpermAnalysis : [
       {
         "lab_test": "PH Reaction",
         "result": "",
         "unit": "",
          
       },
       {
         "lab_test": "Volume",
         "result": "",
         "unit": "ml",
          
       },{
         "lab_test": "Liquefaction Time",
         "result": "",
         "unit": "minutes",
          
       },{
         "lab_test": "Viscosity",
         "result": "",
         "unit": "",
          
       },{
         "lab_test": "Total Sperm Count",
         "result": "",
         "unit": "x106/ ejaculate",
          
       },{
         "lab_test": "Progresive (PR)",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Non Progressive",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Immotile",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Total Motility (PR+NP)",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Total Normal Forms",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Pin Head",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Double Head",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "Gaint Head",
         "result": "",
         "unit": "%",
          
       },{
         "lab_test": "WBC",
         "result": "",
         "unit": "/HPF",
          
       },{
         "lab_test": "RBC",
         "result": "",
         "unit": "/HPF",
          
       },
     ],
     
       labTestGramStain : [
       {
         "lab_test": "Gram Staining",
         "result": "",
         "unit": "",
          
       },{
         "lab_test": "Epithelial Cells",
         "result": "",
         "unit": "",
          
       },{
         "lab_test": "Specimen: Conjunctival and Corneal Scraping",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestKOH : [
       {
         "lab_test": "KOH, Nail Scrapping, Conjunctival Scrapping",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestDengue : [
       {
         "lab_test": "NS1 AG",
         "result": "",
         "unit": "",
          
       },{
         "lab_test": "IgG",
         "result": "",
         "unit": "",
          
       },{
         "lab_test": "IgM",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestSyphilis : [
       {
         "lab_test": "Syphilis/RPR/VDRL",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestHIVScreening : [
       {
         "lab_test": "Anti-HIV",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestHPylori : [
       {
         "lab_test": "H. Pylori",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestHepatitisB : [
       {
         "lab_test": "Hepatitis B Surface Antigen Test (HBSag)",
         "result": "",
         "unit": "",
          
       },
       {
         "lab_test": "HEPATITIS B SURFACE ANTIBODY TEST, ANTI-HCV, ANTI-HAV",
         "result": "",
         "unit": "",
          
       },
     ],
     
         labTestHepatitisA : [
         {
         "lab_test": "Hepatitis A Surface Antibody Test, Anti-HCV, Anti-HAV",
         "result": "",
         "unit": "",
          
       },
     ],
     
       labTestTSH : [
       {
         "lab_test": "TSH",
         "result": "",
         "unit": "mIU / L",
          
       },
     ],
     
       labTestFT4 : [
       {
         "lab_test": "FT4",
         "result": "",
         "unit": "pmol / L",
          
       },
     ],
     
       labTestFT3 : [
       {
         "lab_test": "FT3",
         "result": "",
         "unit": "pmol / L",
          
       },
     ],
     
       labTestT3 : [
     {
         "lab_test": "T2-T3",
         "result": "",
         "unit": "nmol / L",
          
       },
     ],
     
       labTestPSA : [
       {
         "lab_test": "PSA",
         "result": "",
         "unit": "ng / mL",
          
       },
     ],
     
       labTestCEA : [
       {
         "lab_test": "CEA",
         "result": "",
         "unit": "ng / mL",
          
       },
     ],
     
       labTestVitaminD : [
       {
         "lab_test": "Vitamin D",
         "result": "",
         "unit": "ng / mL",
          
       },
     ],
 };

 export default labResultsData;