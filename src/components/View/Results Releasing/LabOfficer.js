import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser, getRoleId } from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { Navigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import "./LabOfficer.css";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import labResultsData from "./LabResultsData.js";
import { SkewLoader } from "react-spinners";

const buttons = ["add-new-patient", "add-old-patient"];
const userToken = getToken();
const userId = getUser();
var bookingId = "";
// var id = "";
// var result = "";
// var unit = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

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

export const refreshPage = () => {
  window.location.reload();
};

export default function LabOfficer() {
  document.body.style = "background: white;";
  const { id, dateFrom, dateTo } = useParams();
  const [filteredData, setFilter] = useForm({
    from_date: dateFrom ? dateFrom : formattedPresentData,
    to_date: dateTo ? dateTo : formattedPresentData,
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
  const allOptions = (labOptions || []).concat(labOptionsPackage || []);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  // Lab Test options
  const [labTestOptions, setLabTestOptions] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const [role, setRole] = useState("");

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

  // For Package details result
  const [packageDetailId, setPackageDetailId] = useState([]);

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);

  function getTime(date) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  function update(lab_test) {
    setIsDropdown(false);
    // For dropdowns in Edit modal
    if (
      selectedLab.label == "Urinalysis" ||
      selectedLab.label == "[P] Urinalysis"
    ) {
      if (lab_test == "Color") {
        setLabTestOptions(labResultsData.urinalysisColorOptions);
        setIsDropdown(true);
      } else if (lab_test == "Transparency") {
        setLabTestOptions(labResultsData.urinalysisTransparencyOptions);
        setIsDropdown(true);
      } else if (
        lab_test == "Epithelial Cells" ||
        lab_test == "Bacteria" ||
        lab_test == "Amorphous Urates/Phosphates" ||
        lab_test == "Mucus Threads"
      ) {
        setLabTestOptions(labResultsData.MicroscopicExamOptions);
        setIsDropdown(true);
      } else {
        setIsDropdown(false);
      }
    } else if (
      selectedLab.label == "Fecalysis" ||
      selectedLab.label == "[P] Fecalysis"
    ) {
      if (lab_test == "Color") {
        setLabTestOptions(labResultsData.fecalysisColorOptions);
        setIsDropdown(true);
      } else if (lab_test == "Consistency") {
        setLabTestOptions(labResultsData.fecalysisConsistencyOptions);
        setIsDropdown(true);
      } else if (lab_test == "Fat Globules") {
        setLabTestOptions(labResultsData.MicroscopicExamOptions);
        setIsDropdown(true);
      } else if (lab_test == "Ova/Parasite") {
        setLabTestOptions(labResultsData.fecalysisOvaParasiteOptions);
        setIsDropdown(true);
      } else if (lab_test == "Cyst/Trophozoite") {
        setLabTestOptions(labResultsData.fecalysisCystTrophozoiteOptions);
        setIsDropdown(true);
      } else {
        setIsDropdown(false);
      }
    } else if (
      lab_test == "Fecal Occult Blood" ||
      lab_test == "Pregnancy Test" ||
      lab_test == "Serum Pregnancy Test"
    ) {
      setLabTestOptions(labResultsData.posNegOptions);
      setIsDropdown(true);
    } else if (
      selectedLab.label == "Gram Staining" ||
      selectedLab.label == "[P] Gram Staining"
    ) {
      if (lab_test == "Epitheleal Cells") {
        setLabTestOptions(labResultsData.MicroscopicExamOptions);
        setIsDropdown(true);
      } else {
        setIsDropdown(false);
      }
    } else if (
      lab_test == "NS1 AG" ||
      lab_test == "IgG" ||
      lab_test == "IgM" ||
      lab_test == "HEPATITIS B SURFACE ANTIBODY TEST, ANTI-HCV, ANTI-HAV"
    ) {
      setLabTestOptions(labResultsData.posNegOptions2);
      setIsDropdown(true);
    } else if (lab_test == "Syphilis/RPR/VDRL" || lab_test == "H. Pylori") {
      setLabTestOptions(labResultsData.posNegOptions);
      setIsDropdown(true);
    } else if (
      lab_test == "Anti-HIV" ||
      lab_test == "Hepatitis B Surface Antigen Test (HBSag)"
    ) {
      setLabTestOptions(labResultsData.reactiveNonReactiveOptions);
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }

    // For default value in Edit modal
    labTestData.map((row) => {
      if (lab_test == row.lab_test) {
        setResult(row.result);
        setUnit(row.unit);
        return row;
      }
      return row;
    });
    setLabName(lab_test);

    setShow(true);
  }

  const submit = (e) => {
    e.preventDefault();

    const updatedData = labTestData.map((row) => {
      if (row.lab_test === labName) {
        console.log("success");
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
    //for customer id
    axios({
      method: "post",
      url: window.$link + "bookings/getDetails/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((response) => {
        setFirstName(response.data.data.booking.first_name);
        setMiddleName(response.data.data.booking.middle_name);
        setLastName(response.data.data.booking.last_name);

        var birthDate = new Date(response.data.data.booking.birthdate);
        setBirthDate(birthDate.toDateString());

        setGender(response.data.data.booking.gender);

        var presentDate = new Date();
        var age = presentDate.getFullYear() - birthDate.getFullYear();
        var m = presentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && presentDate.getDate() < birthDate.getDate())) {
          age--;
        }
        setAge(age);

        setContactNo(response.data.data.booking.contact_no);
        setEmail(response.data.data.booking.customer_email);
        setAddress(response.data.data.booking.customer_address);
      })
      .catch((error) => {});
  }, []);

  React.useEffect(() => {
    // Lab Options
    axios({
      method: "post",
      url: window.$link + "bookings/getBookingDetails/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    }).then((booking) => {
      setServices(booking.data);
      const labOptions = booking.data
        .map((data) => {
          // Include only data in sheets
          if (labResultsData.testsToCheck.includes(data.lab_test)) {
            return {
              label: data.lab_test,
              id: data.id,
              type: data.type,
            };
          }
          return null;
        })
        .filter((option) => option !== null);
      setLabOptions(labOptions);
    });

    if (selectedLab.id != null) {
      axios({
        method: "get",
        url: window.$link + "Bookingdetails/getDetailsResult/" + selectedLab.id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then((response) => {
          const data = response.data.data;
          const packageDetailId = selectedLab.booking_id;
          if (data.booking_detail_results) {
            if (selectedLab.type == "lab") {
              setLabTestData(data.booking_detail_results);
            } else if (data.booking_package_details_results[packageDetailId]) {
              setLabTestData(
                data.booking_package_details_results[packageDetailId]
              );
            } else {
              handleLab(selectedLab);
            }
          } else if (
            data.booking_package_details_results[packageDetailId] == null
          ) {
            handleLab(selectedLab);
          } else {
            handleLab(selectedLab);
          }
        })
        .catch((error) => {
          handleLab(selectedLab);
          //console.log(error);
        });
    }
  }, [selectedLab]);

  //for remarks
  React.useEffect(() => {
    axios({
      method: "get",
      url: window.$link + "/Bookingdetails/getDetails/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setRemarks(response.data.data.booking_detail[0].remarks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Modal Result and Unit edit
  React.useEffect(() => {
    const packageDetailId = selectedLab.booking_id;
    // Store in different arrays the units, results, and lab names
    const resultsArray = labTestData.map((row) => row.result);
    const unitArray = labTestData.map((row) => row.unit);
    const namesArray = labTestData.map((row) => row.lab_test);

    // axios parameter for editResults
    const params = {
      api_key: window.$api_key,
      token: userToken.replace(/['"]+/g, ""),
      booking: id,
      requester: userId,
    };

    if (selectedLab.type != "lab") {
      params.booking = packageDetailId;
    }

    // params for unit
    namesArray.forEach((lab, index) => {
      const unitParam = `unit_${lab}`;
      params[unitParam] = unitArray[index];
    });

    // params for labtests
    namesArray.forEach((lab, index) => {
      const labParam = `lab_tests[${index}]`;
      params[labParam] = namesArray[index].replace(" ", "_");
    });

    // params for results
    namesArray.forEach((lab, index) => {
      const resultParam = `result_${lab.replace(" ", "_")}`;
      params[resultParam] = resultsArray[index];
    });

    if (selectedLab.id != null) {
      if (selectedLab.type == "lab") {
        axios({
          method: "post",
          url: window.$link + "/Bookingdetails/editResult/" + selectedLab.id,
          withCredentials: false,
          params,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url:
            window.$link +
            "/Bookingpackage_details/editResult/" +
            packageDetailId,
          withCredentials: false,
          params,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [labTestData]);

  // React.useEffect(() => {
  //   labOptions.length = 0;

  //   axios({
  //     method: "post",
  //     url: window.$link + "/lab_tests/getAll",
  //     withCredentials: false,
  //     params: {
  //       api_key: window.$api_key,
  //       token: userToken.replace(/['"]+/g, ""),
  //       requester: userId,
  //     },
  //   })
  //     .then(function (response) {
  //       response.data.lab_tests.map((data) => {
  //         var info = {};

  //         info.label = data.name;
  //         info.value = data.id + "_service";

  //         //setLabOptions(oldArray => [...oldArray, info]);
  //       });
  //     })
  //     .then(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // Lab tests
  React.useEffect(() => {
    labTests.length = 0;
    services.map((info, index1) => {
      // if service is package
      if (info.category_id == null) {
        axios({
          method: "post",
          url: window.$link + "bookings/getBookingPackageDetails/" + info.id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then((response) => {
            const labPackageOptions = response.data.map((data) =>
              labResultsData.testsToCheck.includes(data.lab_test)
                ? {
                    label: "[P] " + data.lab_test,
                    id: data.booking_detail_id,
                    booking_id: data.id,
                    type: data.type,
                  }
                : null
            );

            setLabOptionsPackage(
              labPackageOptions.filter((option) => option !== null)
            );

            response.data.map((packageCat, index2) => {
              var serviceDetails = {};
              axios({
                method: "post",
                url: window.$link + "categories/show/" + packageCat.category_id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ""),
                  requester: userId,
                },
              }).then((category) => {
                if (category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes";
                } else {
                  serviceDetails.key = category.data.name
                    .replace(/\s+/g, "_")
                    .toLowerCase();
                }
                serviceDetails.category = category.data.name;
                serviceDetails.name = packageCat.lab_test;
                serviceDetails.type = "package";
                serviceDetails.id = packageCat.id;
                serviceDetails.test_id = packageCat.test_id;
                serviceDetails.packageId = info.id;
                // serviceDetails.md =
                //setLabTests(oldArray=>[...oldArray, serviceDetails]);
              });
            });
          })
          .catch((error) => {
            // console.log(error)
          });
      }
      // if service is lab test
      else {
        axios({
          method: "post",
          url: window.$link + "categories/show/" + info.category_id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then((category) => {
            var serviceDetails = {};
            if (category.data.name == "Electrolytes (NaKCl,iCA)") {
              serviceDetails.key = "Electrolytes";
            } else {
              serviceDetails.key = category.data.name
                .replace(/\s+/g, "_")
                .toLowerCase();
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
          .catch((error) => {
            // console.log(error)
          });
      }
    });
  }, [services]);

  // console.log(labTests)

  // Categorize lab test
  const xray = labTests.filter(
    (info) => info.key === "xray" || info.key === "radiology"
  );
  const ecg = labTests.filter((info) => info.key === "cardiology");

  /****************/
  const hematology = labTests.filter(
    (info) =>
      info.key === "hematology" &&
      info.test_id !== "8" &&
      info.test_id !== "13" &&
      info.test_id !== "15"
  );

  const cbc = labTests.filter((info) => info.test_id === "8");

  const esr = labTests.filter((info) => info.test_id === "13");

  const clotting = labTests.filter((info) => info.test_id === "15");

  /****************/

  // previously serology
  const chemistry = labTests.filter(
    (info) =>
      info.key === "chemistry" ||
      info.key === "Electrolytes" ||
      info.key === "lipid_profile" ||
      info.key === "glucose_tests" ||
      info.key === "liver_function_tests" ||
      info.key === "kidney_function_tests" ||
      info.key === "pancreatic_test"
  );
  const thyroid_profile = labTests.filter(
    (info) => info.key === "thyroid_profile"
  );
  const tumor_markers = labTests.filter((info) => info.key === "tumor_markers");

  const serology = labTests.filter(
    (info) =>
      info.key === "serology" ||
      info.key === "immunology" ||
      info.key === "hepatitis_profile_screening"
  );

  /****************/

  const clinicalUrinalyis = labTests.filter(
    (info) =>
      info.key === "clinical_microscopy_urinalysis" &&
      info.test_id !== "7" &&
      info.test_id !== "130"
  );

  const spermAnalysis = labTests.filter((info) => info.test_id === "7");

  const serumPT = labTests.filter((info) => info.test_id === "130");

  /****************/

  const clinicalFecalysis = labTests.filter(
    (info) => info.key === "clinical_microscopy_fecalysis"
  );

  // const fecalysis = labTests.filter((info)=>info.test_id==="4")

  /****************/

  const ultrasound = labTests.filter((info) => info.key === "ultrasound");

  /****************/

  // Previously others
  const histopathology = labTests.filter(
    (info) => info.key === "histopathology"
  );
  const microbiology = labTests.filter((info) => info.key === "microbiology");
  // const {id} = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");

  const others = labTests.filter(
    (info) => info.key === "other_tests" || info.key === "covid_rapid_tests"
  );
  const [uploadsData, setUploadsData] = useState([]);
  const [download, setDOwnload] = useState("");
  const [rows, setRows] = useState([]);
  const [showConfirm, setShowConfirm] = React.useState(false);

  //  console.log(labTests)

  // Get Multiple Uploads
  async function getUploads() {
    console.log("ID: ", id);
    if (id != null) {
      axios({
        method: "get",
        url: window.$link + "/booking_attachments/getByBooking/" + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then(function (response) {
          setData(response.data.message.booking_attachments);
          console.log(response);
        })
        .catch(function (error) {
          setData(error);
        });
    }
  }

  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, "$1"));
  }, []);

  // Save Remarks to database
  React.useEffect(() => {
    axios({
      method: "get",
      url: window.$link + "/Bookingdetails/editRemarks/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        remarks: saveRemarks,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [saveRemarks]);

  function filter() {}

  if (redirectBack === true) {
    if (dateFrom !== undefined && dateTo !== undefined) {
      var link = "/lab/" + dateFrom + "/" + dateTo;
      return <Navigate to={link} />;
    } else {
      var link = "/lab";
      return <Navigate to={link} />;
    }
  }

  function handleLab(e) {
    //setLabTests(e.target.value)

    if (e.label === "Urinalysis" || e.label === "[P] Urinalysis") {
      setLabTestData(labResultsData.labTestUrinalysis);
    } else if (e.label === "Fecalysis" || e.label === "[P] Fecalysis") {
      setLabTestData(labResultsData.labTestFecalysis);
    } else if (
      e.label === "Fecal Occult Blood" ||
      e.label === "[P] Fecal Occult Blood"
    ) {
      setLabTestData(labResultsData.labTestFecalOccultBlood);
    } else if (
      e.label === "Pregnancy Test (RPK Lateral Flow)" ||
      e.label === "[P] Pregnancy Test (RPK Lateral Flow)"
    ) {
      setLabTestData(labResultsData.labTestPregnancyTest);
    } else if (
      e.label === "Serum Pregnancy Test" ||
      e.label === "[P] Serum Pregnancy Test"
    ) {
      setLabTestData(labResultsData.labTestPregnancyTest);
    } else if (
      e.label === "Sperm Analysis" ||
      e.label === "[P] Sperm Analysis"
    ) {
      setLabTestData(labResultsData.labTestSpermAnalysis);
    } else if (e.label === "Gram Stain" || e.label === "[P] Gram Stain") {
      setLabTestData(labResultsData.labTestGramStain);
    } else if (e.label === "KOH" || e.label === "[P] KOH") {
      setLabTestData(labResultsData.labTestKOH);
    } else if (e.label === "Dengue" || e.label === "[P] Dengue") {
      setLabTestData(labResultsData.labTestDengue);
    } else if (
      e.label === "Syphilis/RPR/VDRL" ||
      e.label === "[P] Syphilis/RPR/VDRL"
    ) {
      setLabTestData(labResultsData.labTestSyphilis);
    } else if (
      e.label === "HIV SCreening (Anti HIV)" ||
      e.label === "[P] HIV SCreening (Anti HIV)"
    ) {
      setLabTestData(labResultsData.labTestHIVScreening);
    } else if (e.label === "H. Pylori" || e.label === "[P] H. Pylori") {
      setLabTestData(labResultsData.labTestHPylori);
    } else if (
      e.label === "HBSag (Hepatitis B Antigen)" ||
      e.label === "[P] HBSag (Hepatitis B Antigen)"
    ) {
      setLabTestData(labResultsData.labTestHepatitisB);
    } else if (
      e.label === "Anti HBs/HBSab (Hepatitis B Antibody)" ||
      e.label === "[P] Anti HBs/HBSab (Hepatitis B Antibody)"
    ) {
      setLabTestData(labResultsData.labTestHepatitisA);
    } else if (e.label === "TSH" || e.label === "[P] TSH") {
      setLabTestData(labResultsData.labTestTSH);
    } else if (e.label === "FT4" || e.label === "[P] FT4") {
      setLabTestData(labResultsData.labTestFT4);
    } else if (e.label === "FT3" || e.label === "[P] FT3") {
      setLabTestData(labResultsData.labTestFT3);
    } else if (e.label === "T3" || e.label === "[P] T3") {
      setLabTestData(labResultsData.labTestT3);
    } else if (e.label === "PSA" || e.label === "[P] PSA") {
      setLabTestData(labResultsData.labTestPSA);
    } else if (e.label === "CEA" || e.label === "[P] CEA") {
      setLabTestData(labResultsData.labTestCEA);
    } else if (e.label === "VITAMIN D" || e.label === "[P] VITAMIN D") {
      setLabTestData(labResultsData.labTestVitaminD);
    } else {
      setLabTestData([]);
    }
  }

  const { from_date, to_date, done } = filteredData;

  function edit(itemId, itemUnit) {
    // id = itemId;
    // unit = itemUnit;
    setRedirect(true);
  }

  if (redirect == true) {
    var link = "/medtech";
    //console.log(link);
    return <Navigate to={link} />;
  }

  let labTestDataWithResults = labTestData.map((result) => {
    return {
      lab_test: result.lab_test,
      result: result.result,
      unit: result.unit,
    };
  });

  // Remarks handle textbox
  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    setSaveRemarks(remarks);
  };

  const handleChange = (event) => {
    setRemarks(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thick"
            title="LABORATORY OFFICER MANAGER"
            withBack={true}
            setBack={setRedirectBack}
          />
          <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

          <div className="personal-data-cont">
            <div className="row">
              <div className="col-sm-4">
                <span className="first-name label">FIRST NAME</span>
                <span className="first-name detail">
                  {firstName.toUpperCase()}
                </span>
              </div>
              <div className="col-sm-4">
                <span className="last-name label">LAST NAME</span>
                <span className="last-name detail">
                  {lastName.toUpperCase()}
                </span>
              </div>
              <div className="col-sm-4">
                <span className="middle-name label">MIDDLE NAME</span>
                <span className="middle-name detail">
                  {middleName.toUpperCase()}
                </span>
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
          <br />

          <h3 className="form-categories-header italic">LABORATORY TESTS</h3>
          <div className="personal-data-cont">
            {/* <PersonalDetails data={patientDataa}/> */}
            <div className="row">
              <div className="col-sm-11">
                <label for="discount_code" className="form-label">
                  LABORATORY
                </label>
                <br />
                <Select
                  isSearchable
                  options={allOptions}
                  defaultValue={selectedLab}
                  onChange={setSelectedLab}
                  getOptionValue={(option) => option.label}
                  //onChange={e => { setSelectedLab; handleLab() }}
                  labelledBy="Select Laboratory"
                />
              </div>
            </div>
          </div>

          {/* Filter */}
          {/* <div className="col-sm-11 d-flex justify-content-end">
                <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter}/>
                <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
            </div> */}

          <Table
            type={"med-tech"}
            clickable={true}
            link={update}
            tableData={labTestDataWithResults.sort((a, b) =>
              a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            )}
            rowsPerPage={20}
            headingColumns={["LAB NAME", "RESULTS", "UNIT", "ACTION"]}
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
              <Modal.Title className="w-100 edit-header">
                Edit Results
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-sm-6">
                  <div className="result-input-wrapper">
                    <div className="edit-sub-header">RESULT</div>
                    {isDropdown ? (
                      <Select
                        isSearchable
                        options={labTestOptions}
                        value={labTestOptions.find(
                          (option) => option.value === result
                        )}
                        defaultValue={result}
                        onChange={(selectedOption) => {
                          setResult(selectedOption.value);
                        }}
                        // label={result}
                      />
                    ) : (
                      <input
                        type="text"
                        className="results-input"
                        defaultValue={result}
                        onChange={(e) => setResult(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="result-input-wrapper">
                    <div className="edit-sub-header">UNIT</div>
                    <input
                      type="text"
                      className="results-input"
                      defaultValue={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="save-btn"
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
              <label for="doctorRemarks" className="form-label">
                Doctor's Remarks
              </label>
              <textarea
                class="form-control"
                id="doctorRemarks"
                value={remarks}
                rows="3"
                style={{ width: "100%" }}
                onChange={handleChange}
                disabled={!editable}
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end mr-3">
            <button className="filter-btn" name="save" onClick={handleSave}>
              Save
            </button>
            <button className="filter-btn" name="edit" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
