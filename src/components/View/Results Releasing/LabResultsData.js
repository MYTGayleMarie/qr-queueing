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
    "HIV Screening (Anti HIV)",
    "Anti HCV",
    "H. Pylori Ag",
    "H. Pylori Ab",
    "HBSag (Hepatitis B Antigen)",
    "Anti HBs/HBSab (Hepatitis B Antibody)",
    "TSH",
    "FT4",
    "FT3",
    "T3",
    "T4",
    "PSA",
    "Antigen Rapid Swab (Nasal)", 
    "CEA",
    "VITAMIN D",
    "Anti HAV",
    "Hbsag Test Promo Group (15 PAX OR MORE)",
    "Clotting & Bleeding Time"
  ],

  urinalysisColorOptions: [
    {
      value: "RED",
      label: "RED",
    },
    {
      value: "LIGHT YELLOW",
      label: "LIGHT YELLOW",
    },
    {
      value: "YELLOW",
      label: "YELLOW",
    },
    {
      value: "DARK YELLOW",
      label: "DARK YELLOW",
    },
    {
      value: "PINKISH YELLOW",
      label: "PINKISH YELLOW",
    },
    {
      value: "AMBER",
      label: "AMBER",
    },
    {
      value: "STRAW",
      label: "STRAW",
    },
  ],

  urinalysisPregnancyTestOptions: [
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  urinalysisSugarProteinOptions: [
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "TRACE",
      label: "TRACE",
    },
    {
      value: "1+",
      label: "1+",
    },
    {
      value: "++",
      label: "++",
    },
    {
      value: "+++",
      label: "+++",
    },
    {
      value: "++++",
      label: "++++",
    },
  ],

  urinalysisPregnancyTestOptions: [
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  posNegTestOptions: [
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    }
  ],

  urinalysisTransparencyOptions: [
    {
      value: "CLEAR",
      label: "CLEAR",
    },
    {
      value: "SLIGHTLY HAZY",
      label: "SLIGHTLY HAZY",
    },
    {
      value: "HAZY",
      label: "HAZY",
    },
    {
      value: "SLIGHTLY CLOUDY",
      label: "SLIGHTLY CLOUDY",
    },
    {
      value: "CLOUDY",
      label: "CLOUDY",
    },
    {
      value: "SLIGHTLY TURBID",
      label: "SLIGHTLY TURBID",
    },
    {
      value: "TURBID",
      label: "TURBID",
    },
  ],

  MicroscopicExamOptions: [
    {
      value: "RARE",
      label: "RARE",
    },
    {
      value: "FEW",
      label: "FEW",
    },
    {
      value: "MODERATE",
      label: "MODERATE",
    },
    {
      value: "MANY",
      label: "MANY",
    },
    {
      value: "OCCASIONAL",
      label: "OCCASIONAL",
    },
  ],

  fecalysisColorOptions: [
    {
      value: "BROWN",
      label: "BROWN",
    },
    {
      value: "DARK BROWN",
      label: "DARK BROWN",
    },
    {
      value: "LIGHT BROWN",
      label: "LIGHT BROWN",
    },
    {
      value: "YELLOWISH BROWN",
      label: "YELLOWISH BROWN",
    },
    {
      value: "GREENISH BROWN",
      label: "GREENISH BROWN",
    },
    {
      value: "TARRY",
      label: "TARRY",
    },
  ],

  fecalysisConsistencyOptions: [
    {
      value: "SOFT",
      label: "SOFT",
    },
    {
      value: "FORMED",
      label: "FORMED",
    },
    {
      value: "MUCOID",
      label: "MUCOID",
    },
    {
      value: "WATERY",
      label: "WATERY",
    },
    {
      value: "MUSHY",
      label: "MUSHY",
    },
    {
      value: "MUCO-MUSHY",
      label: "MUCO-MUSHY",
    },
    {
      value: "LOOSE",
      label: "LOOSE",
    }
  ],

  fecalysisOvaParasiteOptions: [
    {
      value: "NO INTESTINAL OVA/PARASITE SEEN",
      label: "NO INTESTINAL/PARASITE OVA SEEN",
    },
    {
      value: "INSTESTINAL OVA/PARASITES PRESENT",
      label: "INSTESTINAL OVA/PARASITES PRESENT",
    },
  ],

  fecalysisCystTrophozoiteOptions: [
    {
      value: "NO CYSTS/TROPHOZOITES SEEN",
      label: "NO CYSTS/TROPHOZOITES SEEN",
    },
    {
      value: "CYSTS/TROPHOZOITES PRESENT",
      label: "CYSTS/TROPHOZOITES PRESENT",
    },
  ],

  posNegOptions: [
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
  ],

  posNegOptions2: [
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
    {
      value: "WEAKLY POSITIVE",
      label: "WEAKLY POSITIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  reactiveNonReactiveOptions: [
    {
      value: "NONREACTIVE",
      label: "NONREACTIVE",
    },
    {
      value: "REACTIVE",
      label: "REACTIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  reactiveNonReactiveOptions2: [
    {
      value: "NONREACTIVE",
      label: "NONREACTIVE",
    },
    {
      value: "REACTIVE",
      label: "REACTIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  labTestClotting: [
    {
      lab_test: "Bleeding_Time",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 1,
      preferred_to: 3,
    },
    {
      lab_test: "Clotting_Time",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 3,
      preferred_to: 6,
    },
   
  ],
  labTestUrinalysis: [
    {
      lab_test: "Color",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Transparency",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Ph",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 5.0,
      preferred_to: 9.0,
    },
    {
      lab_test: "Specific Gravity",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Protein",
      test_type: "CHEMICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Sugar",
      test_type: "CHEMICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Pus Cells",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "RBC",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Epithelial Cells",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "/LPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Bacteria",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Amorphous Urates/Phosphate",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/LPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Mucus Threads",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/LPF",
      resultType: "dropdown",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Pregnancy Test",
      test_type: "MICROSCOPIC EXAMINATION",
      test_type_2: "OTHERS",
      result: "POSITIVE",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],
  labTestUrinalysisNoPreg: [
    {
      lab_test: "Color",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Transparency",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Ph",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 5.0,
      preferred_to: 9.0,
    },
    {
      lab_test: "Specific Gravity",
      test_type: "PHYSICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Protein",
      test_type: "CHEMICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Sugar",
      test_type: "CHEMICAL EXAMINATION",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Pus Cells",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "RBC",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Epithelial Cells",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "/LPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Bacteria",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      resultType: "dropdown",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Amorphous Urates/Phosphate",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/LPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Mucus Threads",
      test_type: "MICROSCOPIC EXAMINATION",
      result: "-",
      unit: "/LPF",
      resultType: "dropdown",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestFecalysis: [
    {
      lab_test: "Color",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Consistency",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "RBC",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 3.0,
      preferred_to: 5.0,
    },
    {
      lab_test: "Pus Cells",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Fat Globules",
      result: "-",
      unit: "/LPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Intestinal Ova/Parasite seen",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Cyst/Trophozoite",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestFecalOccultBlood: [
    {
      lab_test: "Fecal Occult Blood",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestPregnancyTest: [
    {
      lab_test: "Pregnancy Test",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestSerumPregnancyTest: [
    {
      lab_test: "Serum Pregnancy Test",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestCovidAntigenTest: [
    {
      lab_test: "COVID Antigen Rapid Test",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Time Collected",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Lot #",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Expiry Date",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    }
  ],

  labTestSpermAnalysis: [
    {
      lab_test: "PH Reaction",
      test_type: "MACROSCOPIC",
      test_type_2: "GROSS APPEARANCE",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 1.5,
      preferred_to: 999.99,
    },
    {
      lab_test: "Volume",
      test_type: "MACROSCOPIC",
      test_type_2: "GROSS APPEARANCE",
      result: "-",
      unit: "ml",
      preferred: " ",
      preferred_from: 7.2,
      preferred_to: 999.99,
    },
    {
      lab_test: "Liquefaction Time",
      test_type: "MACROSCOPIC",
      test_type_2: "GROSS APPEARANCE",
      result: "-",
      unit: "minutes",
      preferred: " ",
      preferred_from: 30.0,
      preferred_to: 60.0,
    },
    {
      lab_test: "Viscosity",
      test_type: "MACROSCOPIC",
      test_type_2: "GROSS APPEARANCE",
      result: "-",
      unit: "cm",
      preferred: " ",
      preferred_from: 2.0,
      preferred_to: 999.99,
    },
    {
      lab_test: "Total Sperm Count",
      test_type: "MICROSCOPIC",
      test_type_2: "",
      result: "-",
      unit: "x106/ ejaculate",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Progresive (PR)",
      test_type: "MICROSCOPIC",
      test_type_2: "MOTILITY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 40.0,
      preferred_to: 999.99,
    },
    {
      lab_test: "Non Progressive",
      test_type: "MICROSCOPIC",
      test_type_2: "MOTILITY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 32.0,
      preferred_to: 999.99,
    },
    {
      lab_test: "Immotile",
      test_type: "MICROSCOPIC",
      test_type_2: "MOTILITY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Total Motility (PR+NP)",
      test_type: "MICROSCOPIC",
      test_type_2: "MOTILITY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 32.0,
      preferred_to: 999.99,
    },
    {
      lab_test: "Total Normal Forms",
      test_type: "MICROSCOPIC",
      test_type_2: "MORPHOLOGY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Pin Head",
      test_type: "MICROSCOPIC",
      test_type_2: "MORPHOLOGY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Double Head",
      test_type: "MICROSCOPIC",
      test_type_2: "MORPHOLOGY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Gaint Head",
      test_type: "MICROSCOPIC",
      test_type_2: "MORPHOLOGY",
      result: "-",
      unit: "%",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "WBC",
      test_type: "MICROSCOPIC",
      test_type_2: "OTHERS",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "RBC",
      test_type: "MICROSCOPIC",
      test_type_2: "OTHERS",
      result: "-",
      unit: "/HPF",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestGramStain: [
    {
      lab_test: "Gram Staining",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Epithelial Cells",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Specimen: Conjunctival and Corneal Scraping",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestKOH: [
    {
      lab_test: "KOH, Nail Scraping, Conjunctival Scrapping",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestDengue: [
    {
      lab_test: "NS1 Ag",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "IgG",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "IgM",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestSyphilis: [
    {
      lab_test: "Syphilis/RPR/VDRL",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestHIVScreening: [
    {
      lab_test: "Anti-HIV",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestHAV: [
    {
      lab_test: "IgG",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "IgM",
      result: "-",
      unit: " ",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestHPylori: [
    {
      lab_test: "H. Pylori Ag",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "H. Pylori Ab",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
  ],

  labTestHepatitisB: [
    {
      lab_test: "Hepatitis B Surface Antigen (HbsAg)",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Hepatitis B Surface Antibody Test",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Anti HCV",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    // {
    //   lab_test: "Anti-HAV",
    //   result: "-",
    //   unit: "",
    //   preferred: " ",
    //   preferred_from: 0.0,
    //   preferred_to: 0.0,
    // },
    // {
    //   lab_test: "Hepatitis B Surface Antigen Test (HBSag)",
    //   result: "-",
    //   unit: "",
    //   preferred: " ",
    //   preferred_from: 0.0,
    //   preferred_to: 0.0,
    // },
  ],

  labTestHepatitisA: [
    {
      lab_test: "Hepatitis B Surface Antigen (HbsAg)",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Hepatitis B Surface Antibody Test",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    {
      lab_test: "Anti-HCV",
      result: "-",
      unit: "",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 0.0,
    },
    // {
    //   lab_test: "Anti-HAV",
    //   result: "-",
    //   unit: "",
    //   preferred: " ",
    //   preferred_from: 0.0,
    //   preferred_to: 0.0,
    // },
  ],

  labTestThyroid: [
    {
      lab_test: "TSH",
      result: "-",
      unit: "mIU / L",
      preferred: " ",
      preferred_from: 0.3,
      preferred_to: 4.2,
    },
    {
      lab_test: "FT3",
      result: "-",
      unit: "pmol / L",
      preferred: " ",
      preferred_from: 2.8,
      preferred_to: 7.1,
    },
    {
      lab_test: "FT4",
      result: "-",
      unit: "pmol / L",
      preferred: " ",
      preferred_from: 12,
      preferred_to: 22,
    },
    {
      lab_test: "T4",
      result: "-",
      unit: "nmol / L",
      preferred: " ",
      preferred_from: 66,
      preferred_to: 181,
    },
    {
      lab_test: "T3",
      result: "-",
      unit: "nmol / L",
      preferred: " ",
      preferred_from: 1.23,
      preferred_to: 3.07,
    },
    // {
    //   lab_test: "T2,T3",
    //   result: "-",
    //   unit: "nmol / L",
    //   preferred: " ",
    //   preferred_from: 1.23,
    //   preferred_to: 3.07,
    // },
  ],

  hepatitisTestOptions: [
    {
      value: "POSITIVE",
      label: "POSITIVE",
    },
    {
      value: "NEGATIVE",
      label: "NEGATIVE",
    },
    {
      value: "-",
      label: "-",
    },
  ],

  labTestTSH: [
    {
      lab_test: "TSH",
      result: "-",
      unit: "mIU / L",
      preferred: " ",
      preferred_from: 0.3,
      preferred_to: 4.2,
    },
  ],

  labTestFT4: [
    {
      lab_test: "FT4",
      result: "-",
      unit: "pmol / L",
      preferred: " ",
      preferred_from: 12,
      preferred_to: 22,
    },
  ],

  labTestFT3: [
    {
      lab_test: "FT3",
      result: "-",
      unit: "pmol / L",
      preferred: " ",
      preferred_from: 2.8,
      preferred_to: 7.1,
    },
  ],

  labTestT3: [
    {
      lab_test: "T3",
      result: "-",
      unit: "nmol / L",
      preferred: " ",
      preferred_from: 1.23,
      preferred_to: 3.07,
    },
  ],
  labTestT4: [
    {
      lab_test: "T4",
      result: "-",
      unit: "nmol / L",
      preferred: " ",
      preferred_from: 66,
      preferred_to: 181,
    },
  ],

  labTestPSA: [
    {
      lab_test: "PSA",
      result: "-",
      unit: "ng / mL",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 4.0,
    },
  ],

  labTestCEA: [
    {
      lab_test: "CEA",
      result: "-",
      unit: "ng / mL",
      preferred: " ",
      preferred_from: 0.0,
      preferred_to: 5.0,
    },
  ],

  labTestVitaminD: [
    {
      lab_test: "Vitamin D",
      result: "-",
      unit: "ng / mL",
      preferred: " ",
      preferred_from: 30.0,
      preferred_to: 100.0,
    },
  ],
};

export default labResultsData;
