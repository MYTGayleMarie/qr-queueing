import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId} from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { MultiSelect } from 'react-multi-select-component';
import { Button, Modal } from 'react-bootstrap';



import './LabOfficer.css'

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import PersonalDetails from '../../PersonalDetails.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
// var id = "";
// var result = "";
// var unit = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];



const labTestMockData = [
  {
    "lab": "",
    "Results": "Php 0",
    "Value": "",
     
  }
]

let labTestUrinalysis = [
  {
    "lab": "Color",
    "Results": " LIGHT YELLOW",
    "Value": "",
     
  },
  {
    "lab": "Transparency",
    "Results": "CLEAR",
    "Value": "",
    
  },
  {
    "lab": "Ph",
    "Results": "5.0",
    "Value": "",
    
  },
  {
    "lab": "Specific Gravity",
    "Results": "1.005",
    "Value": "",
    
  },
  {
    "lab": "Protein",
    "Results": "1+",
    "Value": "",
    
  },
  {
    "lab": "Sugar",
    "Results": "1+",
    "Value": "",
    
  },
  {
    "lab": "Pus Cells",
    "Results": "1",
    "Value": "",
    
  },
  {
    "lab": "RBC",
    "Results": "1",
    "Value": "",
    
  },
  {
    "lab": "Epithelial Cells",
    "Results": "RARE",
    "Value": "",
    
  },
  {
    "lab": "Bacteria",
    "Results": "RARE",
    "Value": "",
    
  },
  {
    "lab": "Amorphous Urates/Phosphate",
    "Results": "RARE",
    "Value": "",
    
  },
  {
    "lab": "Mucus Threads",
    "Results": "RARE",
    "Value": "",
     
  },
]

const labTestFecalysis = [
  {
    "lab": "Color",
    "Results": "BROWN",
    "Value": "",
     
  },
  {
    "lab": "Consistency",
    "Results": "Soft",
    "Value": "",
     
  },
  {
    "RBC": "3",
    "Results": "BROWN",
    "Value": "",
     
  },
  {
    "lab": "Pus Cells",
    "Results": "1",
    "Value": "",
     
  },
  {
    "lab": "Fat Globules",
    "Results": "FEW",
    "Value": "",
     
  },
  
]

const labTestFecalOccultBlood = [
  {
    "lab": "Fecal Occult Blood",
    "Results": "Negative",
    "Value": "",
     
  },
]

const labTestPregnancyTest = [
  {
    "lab": "Pregnancy Test",
    "Results": "Negative",
    "Value": "",
     
  },
]

const labTestSerumPregnancyTest = [
  {
    "lab": "Serum Pregnancy Test",
    "Results": "Negative",
    "Value": "",
     
  },
]

const labTestSpermAnalysis = [
  {
    "lab": "PH Reaction",
    "Results": "9",
    "Value": "",
     
  },
  {
    "lab": "Volume",
    "Results": "2",
    "Value": "",
     
  },{
    "lab": "Liquefaction Time",
    "Results": "30",
    "Value": "",
     
  },{
    "lab": "Viscosity",
    "Results": "0",
    "Value": "",
     
  },{
    "lab": "Total Sperm Count",
    "Results": "75",
    "Value": "",
     
  },{
    "lab": "Progresive (PR)",
    "Results": "85",
    "Value": "",
     
  },{
    "lab": "Non Progressive",
    "Results": "10",
    "Value": "",
     
  },{
    "lab": "Immotile",
    "Results": "5",
    "Value": "",
     
  },{
    "lab": "Total Motility (PR+NP)",
    "Results": "95",
    "Value": "",
     
  },{
    "lab": "Total Normal Forms",
    "Results": "70",
    "Value": "",
     
  },{
    "lab": "Pin Head",
    "Results": "20",
    "Value": "",
     
  },{
    "lab": "Double Head",
    "Results": "5",
    "Value": "",
     
  },{
    "lab": "Gaint Head",
    "Results": "5",
    "Value": "",
     
  },{
    "lab": "WBC",
    "Results": "10",
    "Value": "",
     
  },{
    "lab": "RBC",
    "Results": "1",
    "Value": "",
     
  },
]

const labTestGramStain = [
  {
    "lab": "Gram Staining",
    "Results": "FREE TEXt",
    "Value": "",
     
  },{
    "lab": "",
    "Results": "Epithelial Cells = FEW",
    "Value": "",
     
  },{
    "lab": "Specimen: Conjunctival and Corneal Scraping",
    "Results": "FEW",
    "Value": "",
     
  },
]

const labTestKOH = [
  {
    "lab": "KOH, Nail Scrapping, Conjunctival Scrapping",
    "Results": "FREE TEXT",
    "Value": "",
     
  },
]

const labTestDengue = [
  {
    "lab": "Dengue Rapid Test",
    "Results": "NS1 AG: NEGATIVE",
    "Value": "",
     
  },{
    "lab": "",
    "Results": "IgG: NEGATIVE",
    "Value": "",
     
  },{
    "lab": "",
    "Results": "IgM: NEGATIVE",
    "Value": "",
     
  },
]

const labTestSyphilis = [
  {
    "lab": "Syphilis/RPR/VDRL",
    "Results": "POSITIVE",
    "Value": "",
     
  },
]

const labTestHIVScreening = [
  {
    "lab": "Anti-HIV",
    "Results": "REACTIVE",
    "Value": "",
     
  },
]

const labTestHPylori = [
  {
    "lab": "H. Pylori",
    "Results": "NEGATIVE",
    "Value": "",
     
  },
]

const labTestHepatitisB = [
  {
    "lab": "Hepatitis B Surface Antigen Test (HBSag)",
    "Results": "REACTIVE",
    "Value": "",
     
  },
]

  const labTestHepatitisA = [
    {
    "lab": "Hepatitis A Surface Antibody Test, Anti-HCV, Anti-HAV",
    "Results": "POSITIVE",
    "Value": "",
     
  },
]

const labTestTSH = [
  {
    "lab": "TSH",
    "Results": "1.8 H",
    "Value": "mIU / L",
     
  },
]

const labTestFT4 = [
  {
    "lab": "FT4",
    "Results": "17.3",
    "Value": "pmol / L",
     
  },
]

const labTestFT3 = [
  {
    "lab": "FT3",
    "Results": "6.69",
    "Value": "pmol / L",
     
  },
]

const labTestT3 = [
{
    "lab": "T2, T3",
    "Results": "4.59",
    "Value": "nmol / L",
     
  },
]

const labTestPSA = [
  {
    "lab": "PSA",
    "Results": "<2.0",
    "Value": "ng/mL",
     
  },
]

const labTestCEA = [
  {
    "lab": "CEA",
    "Results": "4.9",
    "Value": "ng/mL",
     
  },
]

const labTestVitaminD = [
  {
    "lab": "Vitamin D",
    "Results": "37.16",
    "Value": "ng/mL",
     
  },
]

const selectedLab = [
  {
    label: "HBA1C",
    value: "value"
  }
]

export default function LabOfficer() {

  document.body.style = 'background: white;';
  const {id, dateFrom, dateTo} = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo? dateTo : formattedPresentData,
    done: false,
  });

  // Patient details
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Lab Tests
  const [services, setServices] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [labTestData, setLabTestData] = useState([]);
  const [selectedLab, setSelectedLab] = useState([]);
  const [labOptions, setLabOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const [role, setRole] = useState('');

  //Edit Modal
  const [show, setShow] = useState(false);
  const [labName, setLabName] = useState("");
  const [result, setResult] = useState("");
  const [unit, setUnit] = useState("");
  const handleClose = () => setShow(false);
  
  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);
  
  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  function update(labName, labResult, labUnit) {
    setLabName(labName);
    setResult(labResult);
    setUnit(labUnit);
    setShow(true);
    // handleShow();
  }
  
  const submit = (e) => {
    e.preventDefault();
    const updatedData = labTestData.map(row => {
      if (row.lab === labName) {
        return { ...row, Results: result, Value: unit };
      }
      return row;
    });
    setLabTestData(updatedData);
    handleClose();
  };

  React.useEffect(() => {
    labOptions.length = 0;

    axios({
        method: 'post',
        url: window.$link + '/lab_tests/getAll',
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        response.data.lab_tests.map((data) => {
            var info = {};

            info.label = data.name;
            info.value = data.id + "_service";

            setLabOptions(oldArray => [...oldArray, info]);
            
        });
    }).then(function (error) {
        console.log(error);
    });
    },[]);
  
  React.useEffect(()=>{
    axios({
      method: 'post',
      url: window.$link + 'bookings/getDetails/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((response)=>{
      const customerId=response.data.data.booking.customer_id;
      axios({
        method: 'post',
        url: window.$link + 'customers/show/' + customerId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }})
      .then((response)=>{
        setLoading(false)
        setFirstName(response.data.first_name);
        setMiddleName(response.data.middle_name);
        setLastName(response.data.last_name);

        var birthDate = new Date(response.data.birthdate);
        setBirthDate(birthDate.toDateString());

        setGender(response.data.gender);

        var presentDate = new Date();
        var age = presentDate.getFullYear() - birthDate.getFullYear();
        var m = presentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) 
          {age--;}
        setAge(age);

        setContactNo(response.data.contact_no);
        setEmail(response.data.email);
        setAddress(response.data.address);
      })
      .catch((error)=>{
      })
      })
    .catch((error)=>{
    })

    axios({
      method: 'post',
      url: window.$link + 'bookings/getBookingDetails/' + id,
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    })
    .then((booking)=>{
      setServices(booking.data)
    })
    .catch((error)=>{
    })
  },[])

  // Lab tests
  React.useEffect(()=>{
    labTests.length=0;
    services.map((info, index1)=>{
      // if service is package
      if(info.category_id == null){
        axios({
          method: 'post',
          url: window.$link + 'bookings/getBookingPackageDetails/' + info.id,
          withCredentials: false, 
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          }
        })
        .then((response)=>{
          response.data.map((packageCat, index2)=>{
            var serviceDetails = {};
            axios({
              method: 'post',
              url: window.$link + 'categories/show/' + packageCat.category_id,
              withCredentials: false, 
              params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
              }
            })
            .then((category)=>{
               if(category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes";
                }
                else {
                  serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
                }
                
              serviceDetails.category = category.data.name;
              serviceDetails.name = packageCat.lab_test;
              serviceDetails.type = "package";
              serviceDetails.id = packageCat.id;
              serviceDetails.test_id = packageCat.test_id;
              serviceDetails.packageId = info.id
              // serviceDetails.md = 
              setLabTests(oldArray=>[...oldArray, serviceDetails]);
            })
          })
        })
        .catch((error)=>{
          // console.log(error)
        })
      }
      // if service is lab test
     
      else {
        axios({
          method: 'post',
          url: window.$link + 'categories/show/' + info.category_id,
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
        })
        .then((category)=>{
          var serviceDetails = {};
          if(category.data.name == "Electrolytes (NaKCl,iCA)") {
              serviceDetails.key = "Electrolytes";
          }
          else {
              serviceDetails.key = category.data.name.replace(/\s+/g, "_").toLowerCase();
          }
          // console.log(info)
          serviceDetails.category = category.data.name;
          serviceDetails.name = info.lab_test;
          serviceDetails.type = "lab";
          serviceDetails.packageId = "0";
          serviceDetails.id = info.id;
          serviceDetails.test_id = info.test_id;
          serviceDetails.md = info.md;
          setLabTests(oldArray=>[...oldArray, serviceDetails]);
        })
        .catch((error)=>{
          // console.log(error)
        })
      }
    })
    
  },[services])

  // console.log(labTests)


  // Categorize lab test
  const xray = labTests.filter((info)=>info.key==="xray" ||info.key==="radiology")
  const ecg = labTests.filter((info)=>info.key==="cardiology")

  /****************/
  const hematology = labTests.filter((info)=>info.key==="hematology" && info.test_id!=="8" && info.test_id!=="13" && info.test_id!=="15")
  
  const cbc = labTests.filter((info)=>info.test_id==="8")

  const esr = labTests.filter((info)=>info.test_id==="13")

  const clotting = labTests.filter((info)=>info.test_id==="15")

  /****************/

  // previously serology
  const chemistry = labTests.filter((info)=>info.key==="chemistry"||info.key==="Electrolytes"||info.key==="lipid_profile"||info.key==="glucose_tests"||info.key==="liver_function_tests"||info.key==="kidney_function_tests"||info.key==="pancreatic_test")
  const thyroid_profile = labTests.filter((info)=>info.key==="thyroid_profile")
  const tumor_markers = labTests.filter((info)=>info.key==="tumor_markers")

  const serology = labTests.filter((info)=>info.key==="serology"||info.key==="immunology"||info.key==="hepatitis_profile_screening")

  /****************/

  const clinicalUrinalyis = labTests.filter((info)=>info.key==="clinical_microscopy_urinalysis"  &&info.test_id!=="7" && info.test_id!=="130")

  const spermAnalysis = labTests.filter((info)=>info.test_id==="7")
  
  const serumPT = labTests.filter((info)=>info.test_id==="130")

  /****************/

  const clinicalFecalysis = labTests.filter((info)=>info.key==="clinical_microscopy_fecalysis")
  
  // const fecalysis = labTests.filter((info)=>info.test_id==="4")

  /****************/

  const ultrasound = labTests.filter((info) => info.key === "ultrasound")

  /****************/

  // Previously others
  const histopathology = labTests.filter((info) => info.key === "histopathology")
  const microbiology = labTests.filter((info) => info.key === "microbiology")
  // const {id} = useParams();   
   const [data, setData] = useState([]);
   const [render, setRender] = useState("");

  const others = labTests.filter((info)=>info.key==="other_tests" ||info.key==="covid_rapid_tests")
  const [uploadsData, setUploadsData] = useState([]);
  const [download, setDOwnload] = useState("")
  const [rows, setRows] = useState([])
  const [showConfirm, setShowConfirm] = React.useState(false);

//  console.log(labTests)

// Get Multiple Uploads
    async function getUploads(){
      if(id != null)  {    
        axios({
        method: 'get',
        url: window.$link + '/booking_attachments/getByBooking/'+ id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
      setData(response.data.message.booking_attachments)
      console.log(response)
    }).catch(function (error) {
      setData(error)
    });
    }
  }

  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);

  function filter() {}

  // use to output the lab test data in the table
  useEffect(() => {
    console.log(selectedLab.label);
    if(selectedLab.label === 'Urinalysis'){
      setLabTestData(labTestUrinalysis);
    } else if (selectedLab.label === "Fecalysis") {
      setLabTestData(labTestFecalysis);
    } else if (selectedLab.label === "Fecal Occult Blood") {
      setLabTestData(labTestFecalOccultBlood);
    } else if (selectedLab.label === "Pregnancy Test (RPK Lateral Flow)") {
      setLabTestData(labTestPregnancyTest);
    } else if (selectedLab.label === "Serum Pregnancy Test") {
      setLabTestData(labTestSerumPregnancyTest);
    } else if (selectedLab.label === "Sperm Analysis") {
      setLabTestData(labTestSpermAnalysis);
    } else if (selectedLab.label === "Gram Stain") {
      setLabTestData(labTestGramStain);
    } else if (selectedLab.label === "KOH") {
      setLabTestData(labTestKOH);
    } else if (selectedLab.label === "Dengue") {
      setLabTestData(labTestDengue);
    } else if (selectedLab.label === "Syphilis/RPR/VDRL") {
      setLabTestData(labTestSyphilis);
    } else if (selectedLab.label === "HIV SCreening (Anti HIV)") {
      setLabTestData(labTestHIVScreening);
    } else if (selectedLab.label === "H. Pylori") {
      setLabTestData(labTestHPylori);
    } else if (selectedLab.label === "HBSag (Hepatitis B Antigen)") {
      setLabTestData(labTestHepatitisB);
    } else if (selectedLab.label === "Anti HBs/HBSab (Hepatitis B Antibody)") {
      setLabTestData(labTestHepatitisA);
    } else if (selectedLab.label === "TSH") {
      setLabTestData(labTestTSH);
    } else if (selectedLab.label === "FT4") {
      setLabTestData(labTestFT4);
    } else if (selectedLab.label === "FT3") {
      setLabTestData(labTestFT3);
    } else if (selectedLab.label === "T3") {
      setLabTestData(labTestT3);
    } else if (selectedLab.label === "PSA") {
      setLabTestData(labTestPSA);
    } else if (selectedLab.label === "CEA") {
      setLabTestData(labTestCEA);
    } else if (selectedLab.label === "VITAMIN D") {
      setLabTestData(labTestVitaminD);
    }else {
      setLabTestData(labTestMockData);
    }
  }, [selectedLab]);

  if(redirectBack === true) {
    if(dateFrom !== undefined && dateTo !== undefined) {
        var link =  "/medtech/" + dateFrom + "/" + dateTo;
        return (
            <Navigate to ={link}/>
        )
    } else {
      var link =  "/medtech";
        return (
            <Navigate to ={link}/>
        )
    }
  }

  function handleLab(e){
    //setLabTests(e.target.value)

    if(e.target.value === "Urinalysis") {
      setLabTestData(labTestUrinalysis);
    } else if (e.target.value === "Fecalysis") {
      setLabTestData(labTestFecalysis);
    } else if (e.target.value === "Fecal Occult Blood") {
      setLabTestData(labTestFecalOccultBlood);
    } else if (e.target.value === "Pregnancy Test (RPK Lateral Flow)") {
      setLabTestData(labTestPregnancyTest);
    } else if (e.target.value === "Serum Pregnancy Test") {
      setLabTestData(labTestPregnancyTest);
    } else if (e.target.value === "Sperm Analysis") {
      setLabTestData(labTestSpermAnalysis);
    } else if (e.target.value === "Gram Stain") {
      setLabTestData(labTestGramStain);
    } else if (e.target.value === "KOH") {
      setLabTestData(labTestKOH);
    } else if (e.target.value === "Dengue") {
      setLabTestData(labTestDengue);
    } else if (e.target.value === "Syphilis/RPR/VDRL") {
      setLabTestData(labTestSyphilis);
    } else if (e.target.value === "HIV SCreening (Anti HIV)") {
      setLabTestData(labTestHIVScreening);
    } else if (e.target.value === "H. Pylori") {
      setLabTestData(labTestHPylori);
    } else if (e.target.value === "HBSag (Hepatitis B Antigen)") {
      setLabTestData(labTestHepatitisB);
    } else if (e.target.value === "Anti HBs/HBSab (Hepatitis B Antibody)") {
      setLabTestData(labTestHepatitisA); 
    } else if (e.target.value === "TSH") {
      setLabTestData(labTestTSH); 
    } else if (e.target.value === "FT4") {
      setLabTestData(labTestFT4); 
    } else if (e.target.value === "FT3") {
      setLabTestData(labTestFT3); 
    } else if (e.target.value === "T3") {
      setLabTestData(labTestT3); 
    } else if (e.target.value === "PSA") {
      setLabTestData(labTestPSA); 
    } else if (e.target.value === "CEA") {
      setLabTestData(labTestCEA); 
    } else if (e.target.value === "VITAMIN D") {
      setLabTestData(labTestVitaminD); 
    } else {
      setLabTestData(labTestMockData);
    }
  }  

  const {from_date, to_date, done} = filteredData;

  function edit(itemId,itemUnit) {
    
    // id = itemId;
    // unit = itemUnit;
    setRedirect(true);
  }

  if(redirect == true) {
    var link =  "/medtech";
    //console.log(link);
    return (
        <Navigate to ={link}/>
    )
  }
  

   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="LABORATORY OFFICER MANAGER"
            withBack={true}
            setBack={setRedirectBack}/>
          <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>
        
            <div className="personal-data-cont">
            <div className="row">
                <div className="col-sm-4">
                <span className="first-name label">FIRST NAME</span>
                <span className="first-name detail">{firstName.toUpperCase()}</span>
                </div>
                <div className="col-sm-4">
                <span className="last-name label">LAST NAME</span>
                <span className="last-name detail">{lastName.toUpperCase()}</span>
                </div>
                <div className="col-sm-4">
                <span className="middle-name label">MIDDLE NAME</span>
                <span className="middle-name detail">{middleName.toUpperCase()}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                <span className="date-of-birth label">DATE OF BIRTH</span>
                <span className="date-of-birth detail">{birthDate}</span>
                </div>
                <div className="col-sm-4">
                <span className="sex label">SEX</span>
                <span className="sex detail">{gender.toUpperCase()}</span>
                </div>
                <div className="col-sm-4">
                <span className="age label">AGE</span>
                <span className="age detail">{age}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                <span className="contact-number label">CONTACT NUMBER</span>
                <span className="contact-number detail">{contactNo}</span>
                </div>
                <div className="col-sm-4">
                <span className="email label">EMAIL</span>
                <span className="email detail">{email}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                <span className="address label">ADDRESS</span>
                <span className="address detail">{address.toUpperCase()}</span>
                </div>
            </div>
            </div>
            <br/>

            <h3 className="form-categories-header italic">LABORATORY TESTS</h3>
            <div className="personal-data-cont">
              {/* <PersonalDetails data={patientDataa}/> */}
              <div className="row">
                        <div className="col-sm-11">
                        <label for="discount_code" className="form-label">LABORATORY</label><br />
                        <Select
                            isSearchable
                            options={labOptions}
                            defaultValue={selectedLab}
                            onChange = {setSelectedLab}
                            //onChange={e => { setSelectedLab; handleLab() }}
                            labelledBy="Select"
                        />
                        </div>
                    </div>
              {/* <div className="col-sm-6"><h3 className='laboratory label'> LABORATORY</h3></div>
              <select name="lab-select" className="dropdown">
                <option>X-RAY</option> 
                <option>ECG</option> 
                <option>HEMATOLOGY</option> 
                <option>CBC</option> 
                <option>CLOTTING</option> 
              </select>*/}
            </div> 
            
            <div className="col-sm-11 d-flex justify-content-end">
                <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter}/>
                <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
            </div>

          <Table
            type={'med-tech'}
            clickable={true}
            link={update}
            tableData={labTestData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={20}
            headingColumns={['LAB NAME', 'RESULTS', 'UNIT', 'ACTION']}
            filteredData={filteredData}
            //dropdownData={labTests}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            role={role}
            userId={userId}
            //useLoader={true}
            //isReady={isReady} 
          />
          <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
              <Modal.Title className="w-100 edit-header">Edit Results</Modal.Title>
            </Modal.Header>
              <Modal.Body>
              <div className="row">
                <div className="col-sm-6">
                  <div className="result-input-wrapper">
                    <div className="edit-sub-header">RESULT</div>
                    <input type="text" className="results-input"
                    value={result} 
                    onChange={(e) => setResult(e.target.value)}
                    //onChange={setCashCount} 
                    />
                  </div>

                <div className="col-sm-6">
                  <div className="result-input-wrapper">
                    <div className="edit-sub-header">UNIT</div>
                    <input type="number" className="results-input" 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    //onChange={setCashCount} 
                    />
                  </div>
                </div>
              </div>
              </div>
              </Modal.Body>
            <Modal.Footer>
          <button type="submit" className="save-btn" 
          onClick={(e) => submit(e)}
          >
              SAVE
            </button>
        </Modal.Footer>
      </Modal>
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}





