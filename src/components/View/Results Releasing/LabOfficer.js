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
import { Modal } from 'react-bootstrap';



import './LabOfficer.css'

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';
import { SkewLoader } from 'react-spinners';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var bookingId = "";
// var id = "";
// var result = "";
// var unit = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

// const labTestMockData = [
//   {
//     "lab_test": "Lab Test Mock Data",
//     "result": "Mock Result",
//     "unit": "123 unit",
//   },
//   {
//     "lab_test": "Lab Test Mock Data2",
//     "result": "Mock Result2",
//     "unit": "123 unit2",
//   }
// ]

let labTestUrinalysis = [
  {
    "lab_test": "Color",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Transparency",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Ph",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Specific Gravity",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Protein",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Sugar",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Pus Cells",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "RBC",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Epithelial Cells",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Bacteria",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Amorphous Urates/Phosphate",
    "result": "-",
    "unit": "0",
    
  },
  {
    "lab_test": "Mucus Threads",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestFecalysis = [
  {
    "lab_test": "Color",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Consistency",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "RBC",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Pus Cells",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Fat Globules",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Ova/Parasite",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Cyst/Trophozoite",
    "result": "-",
    "unit": "0",
     
  },
  
]

const labTestFecalOccultBlood = [
  {
    "lab_test": "Fecal Occult Blood",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestPregnancyTest = [
  {
    "lab_test": "Pregnancy Test",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestSerumPregnancyTest = [
  {
    "lab_test": "Serum Pregnancy Test",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestSpermAnalysis = [
  {
    "lab_test": "PH Reaction",
    "result": "-",
    "unit": "0",
     
  },
  {
    "lab_test": "Volume",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Liquefaction Time",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Viscosity",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Total Sperm Count",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Progresive (PR)",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Non Progressive",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Immotile",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Total Motility (PR+NP)",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Total Normal Forms",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Pin Head",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Double Head",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Gaint Head",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "WBC",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "RBC",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestGramStain = [
  {
    "lab_test": "Gram Staining",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Epithelial Cells",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "Specimen: Conjunctival and Corneal Scraping",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestKOH = [
  {
    "lab_test": "KOH, Nail Scrapping, Conjunctival Scrapping",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestDengue = [
  {
    "lab_test": "Dengue Rapid Test",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "IgG",
    "result": "-",
    "unit": "0",
     
  },{
    "lab_test": "IgM",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestSyphilis = [
  {
    "lab_test": "Syphilis/RPR/VDRL",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestHIVScreening = [
  {
    "lab_test": "Anti-HIV",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestHPylori = [
  {
    "lab_test": "H. Pylori",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestHepatitisB = [
  {
    "lab_test": "Hepatitis B Surface Antigen Test (HBSag)",
    "result": "-",
    "unit": "0",
     
  },
]

  const labTestHepatitisA = [
    {
    "lab_test": "Hepatitis A Surface Antibody Test, Anti-HCV, Anti-HAV",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestTSH = [
  {
    "lab_test": "TSH",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestFT4 = [
  {
    "lab_test": "FT4",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestFT3 = [
  {
    "lab_test": "FT3",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestT3 = [
{
    "lab_test": "T2, T3",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestPSA = [
  {
    "lab_test": "PSA",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestCEA = [
  {
    "lab_test": "CEA",
    "result": "-",
    "unit": "0",
     
  },
]

const labTestVitaminD = [
  {
    "lab_test": "Vitamin D",
    "result": "-",
    "unit": "0",
     
  },
]

export const refreshPage = () => {
  window.location.reload();
}

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
  const [labOptionsPackage, setLabOptionsPackage] = useState([]);
  const allOptions = labOptions.concat(labOptionsPackage);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const [role, setRole] = useState('');

  //Edit Modal
  const [show, setShow] = useState(false);
  const [labName, setLabName] = useState("");
  const [result, setResult] = useState("");
  const [unit, setUnit] = useState("");
  const handleClose = () => setShow(false);

  // Remarks textbox
  const [editable, setEditable] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [saveRemarks, setSaveRemarks] = useState("");

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);
  
  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  function update(lab_test) {
    setLabName(lab_test);

    setShow(true);
    // handleShow();
  }
  
  const submit = (e) => {
    e.preventDefault();

    const updatedData = labTestData.map(row => {
      if (row.lab_test === labName) {
        console.log('success');
        row.result = result;
        row.unit = unit;

        return row;
      }
      return row;
    });

    setLabTestData(updatedData);

    setShow(false);
  };

  React.useEffect(() => {
    axios({
      method: 'get',
      url: window.$link + '/Bookingdetails/getDetails/' + id,
      withCredentials: false, 
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      }

      }).then(function (response) { 
          console.log(response.data.data.booking_detail[0].remarks);
          setRemarks(response.data.data.booking_detail[0].remarks);
      }).catch(function (error) {
          console.log(error);
      });
      },[]);

  // Modal Result and Unit edit
  React.useEffect(() => {
    // Store in different arrays the units, results, and lab names
    const resultsArray = labTestData.map(row => row.result);
    const unitArray = labTestData.map(row => row.unit);
    const namesArray = labTestData.map(row => row.lab_test);

    // axios parameter for editResults
    const params = {
      api_key: window.$api_key,
      token: userToken.replace(/['"]+/g, ''),
      booking: id,
      requester: userId,
    };

    // params for unit
    namesArray.forEach((lab, index) => {
      const unitParam = `unit_${lab}`;
      params[unitParam] = unitArray[index];
    });
    
    // params for labtests
    namesArray.forEach((lab, index) => {
      const labParam = `lab_tests[${index}]`;
      params[labParam] = namesArray[index];
    });

    // params for results
    namesArray.forEach((lab, index) => {
      const resultParam = `result_${lab}`;
      params[resultParam] = resultsArray[index];
    });

    axios({
      method: 'post',
      url: window.$link + '/Bookingdetails/editResult/' + selectedLab.id,
      withCredentials: false, 
      params

      }).then(function (response) { 
          console.log(response)          
      }).catch(function (error) {
          console.log(error);
      });
      },[labTestData]);

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

                //setLabOptions(oldArray => [...oldArray, info]);
                
            });
        }).then(function (error) {
            console.log( error);
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

    // Lab Options
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
      setServices(booking.data);
      const labOptions = booking.data.map((data) => {
        if (data.lab_test != null) {
          return {
            label: data.lab_test,
            id: data.id,
            type: data.type
          }
        }
        return null;
      }).filter((option) => option !== null);
      setLabOptions(labOptions);
    })

    if (selectedLab.id != null) {
      axios({
        method: 'get',
        url: window.$link + 'Bookingdetails/getDetailsResult/' + selectedLab.id,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
      })
      .then((response) => {
        const data = response.data.data;
        const packageDetailId = selectedLab.booking_id;
        if (data.booking_detail_results) {
          if(selectedLab.type == "lab"){
            setLabTestData(data.booking_detail_results);
          } else { 
            setLabTestData(data.booking_package_details_results[packageDetailId]);
          }
        }
      })



  
      .catch((error) => {
        handleLab(selectedLab);
        //console.log(error);
      })
    } 

  },[selectedLab.id])

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
          const labPackageOptions = response.data.map((data) => ({
            label: '[P] ' + data.lab_test,
            id: data.booking_detail_id,
            booking_id: data.id,
            type: data.type
          }));
          setLabOptionsPackage(labPackageOptions);

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
              //setLabTests(oldArray=>[...oldArray, serviceDetails]);
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
          //setLabTests(oldArray=>[...oldArray, serviceDetails]);
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
              console.log('ID: ', id);
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

  // Save Remarks to database
  React.useEffect(() => {
    axios({
      method: 'get',
      url: window.$link + '/Bookingdetails/editRemarks/' + id,
      withCredentials: false, 
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        remarks: saveRemarks,
      }

      }).then(function (response) { 
          console.log(response)          
      }).catch(function (error) {
          console.log(error);
      });
      },[saveRemarks]);

  function filter() {}

  if(redirectBack === true) {
    if(dateFrom !== undefined && dateTo !== undefined) {
        var link =  "/lab/" + dateFrom + "/" + dateTo;
        return (
            <Navigate to ={link}/>
        )
    } else {
      var link =  "/lab";
        return (
            <Navigate to ={link}/>
        )
    }
  }

  function handleLab(e){
    //setLabTests(e.target.value)

    if(e.label === "Urinalysis") {
      setLabTestData(labTestUrinalysis);
    } else if (e.label === "Fecalysis") {
      setLabTestData(labTestFecalysis);
    } else if (e.label === "Fecal Occult Blood") {
      setLabTestData(labTestFecalOccultBlood);
    } else if (e.label === "Pregnancy Test (RPK Lateral Flow)") {
      setLabTestData(labTestPregnancyTest);
    } else if (e.label === "Serum Pregnancy Test") {
      setLabTestData(labTestPregnancyTest);
    } else if (e.label === "Sperm Analysis") {
      setLabTestData(labTestSpermAnalysis);
    } else if (e.label === "Gram Stain") {
      setLabTestData(labTestGramStain);
    } else if (e.label === "KOH") {
      setLabTestData(labTestKOH);
    } else if (e.label === "Dengue") {
      setLabTestData(labTestDengue);
    } else if (e.label === "Syphilis/RPR/VDRL") {
      setLabTestData(labTestSyphilis);
    } else if (e.label === "HIV SCreening (Anti HIV)") {
      setLabTestData(labTestHIVScreening);
    } else if (e.label === "H. Pylori") {
      setLabTestData(labTestHPylori);
    } else if (e.label === "HBSag (Hepatitis B Antigen)") {
      setLabTestData(labTestHepatitisB);
    } else if (e.label === "Anti HBs/HBSab (Hepatitis B Antibody)") {
      setLabTestData(labTestHepatitisA); 
    } else if (e.label === "TSH") {
      setLabTestData(labTestTSH); 
    } else if (e.label === "FT4") {
      setLabTestData(labTestFT4); 
    } else if (e.label === "FT3") {
      setLabTestData(labTestFT3); 
    } else if (e.label === "T3") {
      setLabTestData(labTestT3); 
    } else if (e.label === "PSA") {
      setLabTestData(labTestPSA); 
    } else if (e.label === "CEA") {
      setLabTestData(labTestCEA); 
    } else if (e.label === "VITAMIN D") {
      setLabTestData(labTestVitaminD); 
    } else {
      setLabTestData([]);
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
    
    const labTestDataWithResults = labTestData.map(result => {
      return {
        lab_test: result.lab_test,
        result: result.result,
        unit: result.unit
      }
    })
  
    // Remarks handle textbox
    const handleEdit = () => {
      setEditable(true);
    }
  
    const handleSave = () => {
      setEditable(false);
      setSaveRemarks(remarks);
      console.log(remarks);
    }
  
    const handleChange = (event) => {
      setRemarks(event.target.value);
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
                            options={allOptions}
                            defaultValue={selectedLab}
                            onChange = {setSelectedLab}
                            getOptionValue={(option) => option.label}
                            //onChange={e => { setSelectedLab; handleLab() }}
                            labelledBy="Select"
                        />
                        </div>
                    </div>
            </div> 
            
            <div className="col-sm-11 d-flex justify-content-end">
                <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter}/>
                <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
            </div>

          <Table
            type={'med-tech'}
            clickable={true}
            link={(update)}
            tableData={labTestDataWithResults.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
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

        <div className="personal-data-cont">
          <div className="row">
              <div class="form-group">
                <label for="doctorRemarks">Doctor's Remarks</label>
                <textarea class="form-control" id="doctorRemarks" value={remarks} rows="3" onChange={handleChange} disabled={!editable}></textarea>
              </div>
          </div>
          <div classname="row">
              <button className="filter-btn" name="save" onClick={handleSave}>Save</button>
              <button className="filter-btn" name="edit" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}





