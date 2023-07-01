import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import {
  getToken,
  getUser,
  getRoleId,
  formatDate,
} from "../../../utilities/Common";
import { useForm } from "react-hooks-helper";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTable from "../../../utilities/Pagination";
import TableFooter from "../../TableFooter";
import { Navigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import GenerateResults from "./GenerateResults";

import "./FileUpload.css";
import "./MedTech.css";
import "./LabOfficer.css";

//components
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import labResultsData from "./LabResultsData.js";
import { SkewLoader } from "react-spinners";

import Logo from "../../../images/logo.png";

// Import Signature Images
import Image1 from "../../../images/med_tech/ABIERAS_JENNIFER.png";
import Image2 from "../../../images/med_tech/AJEDO_GENIEVIEV.png";
import Image3 from "../../../images/med_tech/DEVIO_ANECA.png";
import Image4 from "../../../images/med_tech/VIVERO_CHARLENE.png";
import Image5 from "../../../images/med_tech/CORTEZ_SAMANTHA.png";
import Image6 from "../../../images/med_tech/MATAGANAS_ARIZA.png";
import Image7 from "../../../images/med_tech/BONJOC_JEREMY.png";
import Image8 from "../../../images/med_tech/MAJESELA_ABALORIO.png";
import Image9 from "../../../images/med_tech/image9.png";
import Image10 from "../../../images/med_tech/Image10.png";
import Image11 from "../../../images/med_tech/OSMA.png";
import DummyImg from "../../../images/med_tech/dummy.png";
import Watermark from "../../../images/Watermark.png";
import Teal from "../../../images/backgrounds/TealHeader.png";
import { setISODay } from "date-fns";

const buttons = ["add-new-patient", "add-old-patient"];
const userToken = getToken();
const userId = getUser();
var bookingId = "";
// var id = "";
// var result = "";
// var unit = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

var monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

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
  const [editingLab, setEditingLab] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const componentRef = useRef();

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
  const [testIndex, setTestIndex] = useState();
  const [isApproved, setIsApproved] = useState("");
  const [withResults, setWithResults] = useState(false);

  const [isReady, setIsReady] = useState(false);
  // Lab Test options
  const [labTestOptions, setLabTestOptions] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const [role, setRole] = useState("");

  //Edit Modal
  const [show, setShow] = useState(false);
  const [labName, setLabName] = useState("");
  const [result, setResult] = useState("");
  const handleClose = () => setShow(false);

  // Remarks textbox
  const [editable, setEditable] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [saveRemarks, setSaveRemarks] = useState("");

  // For Package details result
  const [packageDetailId, setPackageDetailId] = useState([]);

  // For Show PDF Modal
  const [showPDF, setShowPDF] = useState(false);
  const [remark, setRemark] = useState("");
  const handleRedirect = () => setRedirect(true);

  // Doctor Remarks
  const [medTech, setMedTech] = useState("");
  const [medTechPRC, setMedTechPRC] = useState("");
  const [clinicPatho, setClinicPatho] = useState("");
  const [clinicPathoPRC, setClinicPathoPRC] = useState("");

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);

  const [hasImage, setHasImage] = useState(true);
  function getTime(date) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
  function update(lab_test) {
    setEditingLab(lab_test);
    setIsDropdown(false);
    // For dropdowns in Edit modal
    if (
      selectedLab.label == "Urinalysis" ||
      selectedLab.label == "[P] Urinalysis"){
      if (lab_test == "Color") {
        setLabTestOptions(labResultsData.urinalysisColorOptions);
        setIsDropdown(true);
      } else if (lab_test == "Transparency") {
        setLabTestOptions(labResultsData.urinalysisTransparencyOptions);
        setIsDropdown(true);
      } 
      else if (lab_test == "Pregnancy Test" || lab_test == "Pregnancy_Test" ||lab_test =="Serum Pregnancy Test"||lab_test =="Serum_Pregnancy_Test") {
        setLabTestOptions(labResultsData.urinalysisPregnancyTestOptions);
        setIsDropdown(true);
      } else if (lab_test == "Protein" || lab_test == "Sugar") {
        setLabTestOptions(labResultsData.urinalysisSugarProteinOptions);
        setIsDropdown(true);
      } else if (
        lab_test == "Epithelial Cells" ||
        lab_test == "Bacteria" ||
        lab_test == "Amorphous Urates/Phosphate" ||
        lab_test == "Mucus Threads"
      ) {
        setLabTestOptions(labResultsData.MicroscopicExamOptions);
        setIsDropdown(true);
      } else {
        setIsDropdown(false);
      }
    } else if (
      selectedLab.label == "Serum Pregnancy Test"){
        if(lab_test==="Serum Pregnancy Test" || lab_test==="Serum_Pregnancy_Test"){
          setLabTestOptions(labResultsData.urinalysisPregnancyTestOptions);
          setIsDropdown(true);
        }else {
          setIsDropdown(false);
        }
    }else if (
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
      } else if (lab_test == "Intestinal Ova/Parasite seen") {
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
      lab_test == "Serum "
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
        row.result = result;
        return row;
      }
      return row;
    });

    setLabTestData(updatedData);

    setShow(false);
  };

  //fetch Medtech
  //fetch Medtech
  React.useEffect(() => {
    setClinicPatho("JENNIFER D. ABIERAS");
    setClinicPathoPRC("PRC LIC. NO.: 0085469");
    if (medTech === "") {
      axios({
        method: "get",
        url: window.$link + "users/show/" + userId,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then((response) => {
          setMedTech(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function choosePRC(prc_id) {
    if (prc_id === "24") {
      return "PRC LIC. NO.: 0052932";
    } else if (prc_id === "25") {
      return "PRC LIC. NO.: 0085690";
    } else if (prc_id === "26") {
      return "PRC LIC. NO.: 0093629";
    } else if (prc_id === "23") {
      return "PRC LIC. NO.: 0112611";
    } else if (prc_id === "27") {
      return "PRC LIC. NO.: 0085690";
    } else if (prc_id === "28") {
      return "PRC LIC. NO.: 0094539";
    } else if (prc_id === "29") {
      return "PRC LIC. NO.: 0093629";
    } else if (prc_id === "30") {
      return "PRC LIC. NO.: 0094334";
    } else {
      return "No PRC No.";
    }
  }

  function chooseImage(prc_sig) {
    if (prc_sig === "23") {
      setHasImage(true);
      return (
        <img
          src={Image9}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    } else if (prc_sig === "24") {
      setHasImage(true);
      return (
        <img
          src={Image2}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    } else if (prc_sig === "25") {
      setHasImage(true);
      return (
        <img
          src={Image6}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    } else if (prc_sig === "26") {
      setHasImage(true);
      return (
        <img
          src={Image5}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={50}
          height={50}
        />
      );
    } else if (prc_sig === "27") {
      setHasImage(true);
      return (
        <img
          src={Image10}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "1rem" }}
          width={100}
          height={100}
        />
      );
    } else if (prc_sig === "28") {
      setHasImage(true);
      return (
        <img
          src={Image8}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    } else if (prc_sig === "29") {
      setHasImage(true);
      return (
        <img
          src={Image9}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    } 
    else if (prc_sig === "30") {
      setHasImage(true);
      return (
        <img
          src={Image11}
          alt="MedTech"
          // className="mt-5"
          style={{ marginTop: "3rem" }}
          width={100}
          height={50}
        />
      );
    }
    // else{
    //   setHasImage(true);
    //   return (
    //     <img
    //       src={Image10}
    //       alt="MedTech"
    //       // className="mt-5"
    //       style={{ marginTop: "3rem" }}
    //       width={70}
    //       height={60}
    //     />
    //   );
  {
      setHasImage(false);

      return (
        <div
          // className="mt-5"
          style={{ marginTop: "3rem" }}
        ></div>
      );
    }
    // if (prc_sig === "23") {
    //   return Image9;
    // } else if (prc_sig === "24") {
    //   return Image2;
    // } else if (prc_sig === "25") {
    //   return Image6;
    // } else if (prc_sig === "26") {
    //   return Image5;
    // } else if (prc_sig === "27") {
    //   return Image10;
    // } else if (prc_sig === "28") {
    //   return Image3;
    // } else if (prc_sig === "29") {
    //   return Image4;
    // } else if (prc_sig === "30") {
    //   return Image11;
    // } else {
    //   return Image9;
    // }
  }

  const printHandle = useReactToPrint({
    onAfterPrint: handleRedirect,
    content: () => componentRef.current,
    pageStyle: () => `
          @page { size: letter; margin: 0.5in;}
          @media print {
            .print-break {
              margin-top: 1rem;
              display: block;
              page-break-before: always;
            }
          }
          `,
  });

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
        setBirthDate(formatDate(birthDate));

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

  // Function to get Booking Details get Details
  React.useEffect(() => {
    if (labTestData.id !== "") {
      axios({
        method: "get",
        url: window.$link + "Bookingdetails/getDetails/" + labTestData.id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
        },
      })
        .then((booking) => {
          setRemark(booking.data.data.booking_detail[0]?.remarks ?? "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      setIsReady(false);
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
          var data = response.data.data;
          var packageDetailId = selectedLab.booking_id;
          if (data.booking_detail_results !== null) {
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
          } else if (data.booking_package_details_results !== {}) {
            setLabTestData(
              data.booking_package_details_results[packageDetailId]
            );
            if (selectedLab.result_approval === "approved") {
              setIsApproved("approved");
            } else if (selectedLab.result_approval === "disapproved") {
              setIsApproved("disapproved");
            } else {
              setIsApproved("");
            }
          } else {
            handleLab(selectedLab);
          }

          const index = services.findIndex(
            (service) => service.lab_test === selectedLab.label
          );
          if (services[index] !== undefined) {
            if (services[index].result_approval === "approved") {
              setIsApproved("approved");
            } else if (services[index].result_approval === "disapproved") {
              setIsApproved("disapproved");
            } else {
              setIsApproved("");
            }
          }
          setIsReady(true);
        })
        .catch((error) => {
          setIsReady(true);
          console.log(error);
          handleLab(selectedLab);
        });
    }
  }, [selectedLab]);

  React.useEffect(() => {
    setIsReady(false);
    axios({
      method: "get",
      url: window.$link + "/Bookingdetails/getDetails/" + selectedLab.id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setRemarks(response.data.data.booking_detail[0].remarks);
        setIsReady(true);
      })
      .catch(function (error) {
        setIsReady(true);
        console.log(error);
      });
  }, [selectedLab]);

  // Modal Result and Unit edit
  React.useEffect(() => {
    const packageDetailId = selectedLab.booking_id;
    // Store in different arrays the units, results, and lab names
    const resultsArray = labTestData.map((row) => row.result);
    const unitArray = labTestData.map((row) => row.unit);
    const namesArray = labTestData.map((row) => row.lab_test);
    const preferredArray = labTestData.map((row) => row.preferred);
    const preferredFromArray = labTestData.map((row) => row.preferred_from);
    const preferredToArray = labTestData.map((row) => row.preferred_to);

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
      params[labParam] = namesArray[index].replaceAll(" ", "_");
    });

    // params for results
    namesArray.forEach((lab, index) => {
      const resultParam = `result_${lab.replaceAll(" ", "_")}`;

      params[resultParam] = resultsArray[index];
    });

    // params for preferred
    namesArray.forEach((lab, index) => {
      const preferredParam = `preferred_${lab}`;
      params[preferredParam] = preferredArray[index];
    });

    // params for preferred_from
    namesArray.forEach((lab, index) => {
      const preferredFromParam = `preferred_from_${lab}`;
      params[preferredFromParam] = preferredFromArray[index];
    });

    // params for preferred_to
    namesArray.forEach((lab, index) => {
      const preferredToParam = `preferred_to_${lab}`;
      params[preferredToParam] = preferredToArray[index];
    });

    if (selectedLab.id != null) {
      if (selectedLab.type == "lab") {
        axios({
          method: "post",
          url: window.$link + "/Bookingdetails/editResult/" + selectedLab.id,
          withCredentials: false,
          params,
        })
          .then(function (response) {})
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
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [labTestData]);

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
                    type: data.type ? data.type : "package",
                    result_approval: data.result_approval,
                    approver: data.approver,
                    approved_id: data.approved_by,
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

  const labTestDataWithResults = useMemo(() => {
    if (!labTestData) return [];

    return labTestData.map((result) => {
      setWithResults(true);
      let reference_range = "";

      if (result.preferred_from != 0.0 || result.preferred_to != 0.0) {
        if (result.preferred_to == 999.99) {
          reference_range = ">=" + result.preferred_from;
        } else {
          reference_range = result.preferred_from + " - " + result.preferred_to;
        }
      } else if (result.preferred != " ") {
        reference_range = result.preferred;
      } else {
        reference_range = "";
      }

      if (
        selectedLab.label !== "Urinalysis" &&
        selectedLab.label !== "[P] Urinalysis" &&
        selectedLab.label !== "Fecalysis" &&
        selectedLab.label !== "[P] Fecalysis" &&
        selectedLab.label !== "Syphilis/RPR/VDRL" &&
        selectedLab.label !== "KOH" &&
        selectedLab.label !== "Gram Stain" &&
        selectedLab.label !== "HIV Screening (Anti HIV)"
      ) {
        return {
          lab_test: result.lab_test,
          result: result.result,
          unit: result.unit,
          reference_range: reference_range,
        };
      } else {
        return {
          lab_test: result.lab_test,
          result: result.result,
          unit: result.unit,
        };
      }
    });
  }, [labTestData]);

  // Get Multiple Uploads
  async function getUploads() {
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
      url: window.$link + "/Bookingdetails/editRemarks/" + selectedLab.id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        remarks: saveRemarks,
      },
    })
      .then(function (response) {
        setSelectedLab.remarks(remarks);
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

  const handleApproved = () => {
    var link = "";
    if (selectedLab.type === "lab") {
      link =
        window.$link + "/Bookingdetails/updateResultApproval/" + selectedLab.id;
    } else {
      link =
        window.$link +
        "Bookingpackage_details/updateResultApproval/" +
        selectedLab.booking_id;
    }
    axios({
      method: "post",
      url: link,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        updated_by: userId,
        result_approval: "approved",
      },
    })
      .then(function (response) {
        toast.success("Results are Approved");
        setShowPDF(false);
        refreshPage();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error Approval");
      });
  };

  const handleDisapproved = () => {
    var link = "";
    if (selectedLab.type === "lab") {
      link =
        window.$link + "/Bookingdetails/updateResultApproval/" + selectedLab.id;
    } else {
      link =
        window.$link +
        "Bookingpackage_details/updateResultApproval/" +
        selectedLab.booking_id;
    }
    axios({
      method: "post",
      url: link,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        updated_by: userId,
        result_approval: "disapproved",
      },
    })
      .then(function (response) {
        toast.success("Results are Disapproved");
        setShowPDF(false);
        refreshPage();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error Approval");
      });
  };

  console.log(gender)
  function handleLab(e) {
    //setLabTests(e.target.value)

    if (selectedLab.result_approval === "approved") {
      setIsApproved("approved");
    } else if (selectedLab.result_approval === "disapproved") {
      setIsApproved("disapproved");
    } else {
      setIsApproved("");
    }
    console.log(gender==="Male")
    if ((e.label === "Urinalysis" || e.label === "[P] Urinalysis") && gender==="female" ) {
      setLabTestData(labResultsData.labTestUrinalysis);
    } else if ((e.label === "Urinalysis" || e.label === "[P] Urinalysis") && gender==="Male" ) {
      setLabTestData(labResultsData.labTestUrinalysisNoPreg);
    }else if (e.label === "Fecalysis" || e.label === "[P] Fecalysis") {
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
      setLabTestData(labResultsData.labTestSerumPregnancyTest);
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
      e.label === "HIV Screening (Anti HIV)" ||
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

  // let labTestDataWithResults = labTestData.map((result) => {
  //   setWithResults(true);
  //   let reference_range = "";
  //   if (result.preferred_from !== 0.0 && result.preferred_to !== 0.0) {
  //     if (result.preferred_to === 999.99) {
  //       reference_range = ">=" + result.preferred_from;
  //     } else {
  //       reference_range = result.preferred_from + " - " + result.preferred_to;
  //     }
  //   } else if (result.preferred !== " ") {
  //     reference_range = result.preferred;
  //   } else {
  //     reference_range = "-";
  //   }

  //   return {
  //     lab_test: result.lab_test,
  //     result: result.result,
  //     unit: result.unit,
  //     reference_range: reference_range,
  //   };
  // });

  const Signature = () => {
    return (
      <div>
        <div className="wrapper">
          <div className="box">
            {selectedLab.result_approval === "approved"
              ? chooseImage(selectedLab.approved_id)
              : chooseImage(userId)}
            {/* <img
              src={
                selectedLab.result_approval === "approved"
                  ? chooseImage(selectedLab.approved_id)
                  : chooseImage(userId)
              }
              alt="MedTech"
              className="mt-5"
              width={100}
              height={100}
            /> */}
          </div>
          <div className="box pt-5">
            <img
              src={Image1}
              alt="MedTech"
              style={{ zIndex: "50", marginTop: "10px" }}
            />
          </div>
        </div>
        <div
          className="wrapper"
          style={{ marginTop: hasImage ? "-13px" : "-5px" }}
        >
          <div className="box">
            <span className="tspan">
              {selectedLab.result_approval === "approved"
                ? selectedLab.approver
                : medTech}{" "}
            </span>
          </div>
          <div className="box">
            <span className="tspan">{clinicPatho}</span>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <span className="tspan">
              {selectedLab.result_approval === "approved"
                ? choosePRC(selectedLab.approved_id)
                : choosePRC(userId)}
            </span>
          </div>
          <div className="box">
            <span className="tspan">{clinicPathoPRC}</span>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <span className="tspan">Medical Technologist</span>
          </div>
          <div className="box">
            <span className="tspan">Clinical Pathologist</span>
          </div>
        </div>
      </div>
    );
  };

  const LaboratoryResultsTable = () => {
    return (
      <div style={{ backgroundColor: "white", width: "900px" }}>
        <div class="bg">
          <div>
            <div ref={componentRef}>
              {/* Header */}
              <div style={{ position: "relative" }}>
                <img
                  src={Teal}
                  alt="QR DIAGNOSTICS"
                  className="teal_header_laboff"
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={Logo}
                    alt="QR DIAGNOSTICS"
                    className="img-small"
                    style={{ paddingRight: "50px" }}
                  />
                  <div style={{ display: "block" }}>
                    <span className="resultTitle">
                      DEPARTMENT OF CLINICAL LABORATORY
                    </span>
                    <span className="addressTitle">
                      Unit A, M Block, Marasbaras, Tacloban City | 0999 8888
                      6694
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  border: "2px solid black",
                  width: "100%",
                  marginBottom: "0px",
                }}
              />
              <div>
                <div className="laboratory-title">
                  <span>
                    {selectedLab.label && (
                      <>
                        {selectedLab.label.toUpperCase() === "SERUMPT" ||
                        selectedLab.label.toUpperCase() === "URINALYSIS" ||
                        selectedLab.label.toUpperCase() === "[P] URINALYSIS"
                          ? "CLINICAL MICROSCOPY - URINALYSIS"
                          : selectedLab.label.toUpperCase() === "FECALYSIS"
                          ? "CLINICAL MICROSCOPY - FECALYSIS"
                          : selectedLab.label.toUpperCase() ===
                              "HBSAG (HEPATITIS B ANTIGEN)" ||
                            selectedLab.label.toUpperCase() ===
                              "[P] HBSAG (HEPATITIS B ANTIGEN)"
                          ? "SEROLOGY"
                          : selectedLab.label.toUpperCase() === "SPERM ANALYSIS"
                          ? "CLINICAL MICROSCOPY - SPERM ANALYSIS"
                          : selectedLab.label.toUpperCase()}
                      </>
                    )}
                  </span>
                </div>
                <div class="tb">
                  <div class="row">
                    <div class="col details_title">
                      <span>NAME :</span>
                    </div>
                    <div class="col">
                      <span>
                        {lastName.toUpperCase()}, {firstName.toUpperCase()}{" "}
                        {middleName.toUpperCase()}
                      </span>
                    </div>
                    <div class="col details_title">
                      <span>REQUEST DATE :</span>
                    </div>
                    <div class="col">
                      <span>
                        {monthNames[presentDate.getMonth()]}{" "}
                        {presentDate.getDate()}, {presentDate.getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div class="row" style={{ marginTop: "2px" }}>
                    <div class="col details_title">
                      <span>AGE :</span>
                    </div>
                    <div class="col">
                      <span>{age}</span>
                    </div>
                    <div class="col details_title">
                      <span>CONTACT NUMBER :</span>
                    </div>
                    <div class="col">
                      <span>{contactNo}</span>
                    </div>
                  </div>
                  <div class="row" style={{ marginTop: "2px" }}>
                    <div class="col details_title">
                      <span>GENDER :</span>
                    </div>
                    <div class="col">
                      <span>{gender.toUpperCase()}</span>
                    </div>
                    <div class="col details_title">
                      <span>BIRTHDATE :</span>
                    </div>
                    <div class="col">
                      <span>{birthDate}</span>
                    </div>
                  </div>
                  <div class="row" style={{ marginTop: "2px" }}>
                    <div class="col details_title">
                      <span>PATIENT ID :</span>
                    </div>
                    <div class="col">
                      <span>{id}</span>
                    </div>
                    <div class="col details_title">
                      <span>REQUESTING PHYSICIAN :</span>
                    </div>
                    <div class="col">
                      <span></span>
                    </div>
                  </div>
                </div>
                <img
                  src={Watermark}
                  alt="QR DIAGNOSTICS"
                  className="watermark"
                />

                <div>
                  <br />
                  <div className="tb mid">
                    <div className="row bd">
                      <div className="col">
                        <span>
                          <b>TEST</b>
                        </span>
                      </div>
                      <div className="col">
                        <span>
                          <b>RESULT</b>
                        </span>
                      </div>

                      {selectedLab.label !== "Urinalysis" &&
                        selectedLab.label !== "[P] Urinalysis" &&
                        selectedLab.label !== "Fecalysis" &&
                        selectedLab.label !== "[P] Fecalysis" &&
                        selectedLab.label !== "Syphilis/RPR/VDRL" &&
                        selectedLab.label !== "KOH" &&
                        selectedLab.label !== "Gram Stain" &&
                        selectedLab.label !== "HIV Screening (Anti HIV)" && (
                          <div className="col">
                            <span>
                              <b>REFERENCE RANGE</b>
                            </span>
                          </div>
                        )}
                    </div>
                    {labTestData.map((result, resultIndex) => (
                      <>
                        <div
                          className="row"
                          style={{ marginTop: "1px", width: "100%" }}
                          key={resultIndex}
                        >
                          <div className="col">
                            {resultIndex === 0 ||
                            result["test_type"] !==
                              labTestData[resultIndex - 1]["test_type"] ? (
                              <div className="space-between">
                                <h5
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                  }}
                                >
                                  <u>{result["test_type"]}</u>
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                            {resultIndex === 0 ||
                            result["test_type_2"] !==
                              labTestData[resultIndex - 1]["test_type_2"] ? (
                              <div className="space-between">
                                <h6
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                  }}
                                >
                                  {result["test_type_2"]}
                                </h6>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="space-between">
                              <span>{result["lab_test"].toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="col">
                            {/* Add Blank space for headers */}
                            {resultIndex === 0 ||
                            result["test_type"] !==
                              labTestData[resultIndex - 1]["test_type"] ? (
                              <div className="space-between">
                                <h5
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                    color: "rgba(0, 0, 0, 0)",
                                  }}
                                >
                                  {result["test_type"]}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                            {resultIndex === 0 ||
                            result["test_type_2"] !==
                              labTestData[resultIndex - 1]["test_type_2"] ? (
                              <div className="space-between">
                                <h6
                                  style={{
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                    color: "rgba(0, 0, 0, 0)",
                                    marginLeft: "0 px",
                                  }}
                                >
                                  {result["test_type_2"]}
                                </h6>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* RESULTS */}
                            {result["result"] !== "" ? (
                              <>
                                {result["preferred"] == " " ? (
                                  result["preferred"] == result["result"] ? (
                                    <span>
                                      {result["result"] + " " + result["unit"]}
                                    </span>
                                  ) : (
                                    <span>
                                      {result["result"] + " " + result["unit"]}{" "}
                                    </span>
                                  )
                                ) : result["preferred"] != " " ? (
                                  result["preferred"] == result["result"] ? (
                                    <span>
                                      {result["result"] + " " + result["unit"]}
                                    </span>
                                  ) : (
                                    <span>
                                      {result["result"] + " " + result["unit"]}{" "}
                                    </span>
                                  )
                                ) : result["preferred_from"] != 0.0 ||
                                  result["preferred_to"] != 0.0 ? (
                                  parseFloat(result["preferred_from"]) >
                                  parseFloat(result["result"]) ? (
                                    <span class="red">
                                      {result["result"] +
                                        " " +
                                        result["unit"] +
                                        " (L)"}{" "}
                                    </span>
                                  ) : result["result"] >
                                    result["preferred_to"] ? (
                                    <span class="red">
                                      {result["result"] +
                                        " " +
                                        result["unit"] +
                                        " (H)"}{" "}
                                    </span>
                                  ) : (
                                    <span>
                                      {result["result"] + " " + result["unit"]}{" "}
                                    </span>
                                  )
                                ) : (
                                  <span>
                                    {" "}
                                    {result["result"] + " " + result["unit"]}
                                  </span>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          {selectedLab.label.toUpperCase() !== "URINALYSIS" &&
                            selectedLab.label.toUpperCase() !==
                              "[P] URINALYSIS" &&
                            selectedLab.label.toUpperCase() !== "FECALYSIS" &&
                            selectedLab.label.toUpperCase() !==
                              "[P] FECALYSIS" &&
                            selectedLab.label !== "Syphilis/RPR/VDRL" &&
                            selectedLab.label !== "KOH" &&
                            selectedLab.label !== "Gram Stain" &&
                            selectedLab.label !==
                              "HIV Screening (Anti HIV)" && (
                              <div className="col">
                                <span>
                                  {resultIndex === 0 ||
                                  result["test_type"] !==
                                    labTestData[resultIndex - 1][
                                      "test_type"
                                    ] ? (
                                    <div className="space-between">
                                      <h5
                                        style={{
                                          fontStyle: "italic",
                                          marginTop: "10px",
                                          color: "rgba(0, 0, 0, 0)",
                                        }}
                                      >
                                        {result["test_type"]}
                                      </h5>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {resultIndex === 0 ||
                                  result["test_type_2"] !==
                                    labTestData[resultIndex - 1][
                                      "test_type_2"
                                    ] ? (
                                    <div className="space-between">
                                      <h6
                                        style={{
                                          fontStyle: "italic",
                                          marginTop: "10px",
                                          color: "rgba(0, 0, 0, 0)",
                                        }}
                                      >
                                        {result["test_type_2"]}
                                      </h6>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {result["preferred"] != " "
                                    ? result["preferred"]
                                    : result["preferred_from"] != 0.0 ||
                                      result["preferred_to"] != 0.0
                                    ? result["preferred_to"] == 999.99
                                      ? ">=" +
                                        parseFloat(
                                          result["preferred_from"]
                                        ).toFixed(2)
                                      : parseFloat(
                                          result["preferred_from"]
                                        ).toFixed(2) +
                                        "-" +
                                        parseFloat(
                                          result["preferred_to"]
                                        ).toFixed(2)
                                    : ""}
                                </span>
                              </div>
                            )}
                        </div>
                      </>
                    ))}
                  </div>
                  <hr
                    style={{
                      border: "2px solid black",
                      width: "100%",
                      marginBottom: "0",
                    }}
                  />
                  <div
                    style={{
                      justifyContent: "left",
                      alignItems: "left",
                      textAlign: "left",
                    }}
                  >
                    <span>
                      <b>REMARKS: </b>
                    </span>
                    <br />
                    <span>
                      <div dangerouslySetInnerHTML={{ __html: remarks }}></div>
                    </span>
                    <Signature />
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePrint = () => {
    if (componentRef.current) {
      printHandle();
    } else {
      console.log("Component is not rendered yet!");
    }
  };

  // Remarks handle textbox
  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);

    setSaveRemarks(remarks);
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

                {/* <div className="row"> */}
                {allOptions.map((data) => {
                  return (
                    <Button
                      className="m-2"
                      style={{
                        background:
                          selectedLab.label === data.label
                            ? "#bfbc4b"
                            : "#419EA3",
                        borderColor:
                          selectedLab.label === data.label
                            ? "#bfbc4b"
                            : "#419EA3",
                      }}
                      size="sm"
                      // onChange={() => setSelectedLab(data)}
                      onClick={() => setSelectedLab(data)}
                    >
                      {data.label}
                    </Button>
                  );
                })}
                {/* </div> */}

                {/* <Select
                  isSearchable
                  options={allOptions}
                  defaultValue={selectedLab}
                  onChange={setSelectedLab}
                  getOptionValue={(option) => option.label}
                  //onChange={e => { setSelectedLab; handleLab() }}
                  labelledBy="Select Laboratory"
                /> */}
              </div>
            </div>
          </div>
          <Table
            type={"med-tech"}
            clickable={true}
            link={update}
            tableData={labTestDataWithResults.sort((a, b) =>
              a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            )}
            rowsPerPage={20}
            headingColumns={
              selectedLab.label !== "Urinalysis" &&
              selectedLab.label !== "[P] Urinalysis" &&
              selectedLab.label !== "Fecalysis" &&
              selectedLab.label !== "[P] Fecalysis" &&
              selectedLab.label !== "Syphilis/RPR/VDRL" &&
              selectedLab.label !== "KOH" &&
              selectedLab.label !== "Gram Stain" &&
              selectedLab.label !== "HIV Screening (Anti HIV)"
                ? ["LAB NAME", "RESULTS", "UNIT", "REFERENCE RANGE", "ACTION"]
                : ["LAB NAME", "RESULTS", "UNIT", "ACTION"]
            }
            filteredData={filteredData}
            //dropdownData={labTests}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            role={role}
            userId={userId}
            useLoader={true}
            isReady={isReady}
          />

          <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
              <Modal.Title className="w-100 edit-header">
                Edit Results
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {/* 1st Row */}
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
                      onChange={(e) => {
                        var value = e.target.value;
                        if (editingLab === "Ph") {
                          value = parseFloat(e.target.value)
                            .toFixed(1)
                            .toString();
                        } else if (editingLab === "Specific Gravity") {
                          value = parseFloat(e.target.value)
                            .toFixed(3)
                            .toString();
                        } else {
                          value = e.target.value;
                        }
                        setResult(value);
                      }}
                    />
                  )}
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

        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "5%" }}
        >
          <button
            className="filter-btn"
            name="show"
            onClick={() => setShowPDF(true)}
            disabled={!withResults}
            style={{
              background: !withResults
                ? "gray"
                : "linear-gradient(180deg, #04b4cc 0%, #04b4cc 100%)",
            }}
          >
            Show PDF
          </button>
          <button
            className="filter-btn"
            name="show"
            onClick={handlePrint}
            disabled={
              !withResults || (isApproved !== "approved" && withResults)
            }
            style={{
              background:
                !withResults || (isApproved !== "approved" && withResults)
                  ? "gray"
                  : "linear-gradient(180deg, #04b4cc 0%, #04b4cc 100%)",
            }}
          >
            Generate PDF
          </button>
        </div>

        <div style={{ display: "none" }}>
          <LaboratoryResultsTable />
        </div>

        <Modal
          show={showPDF}
          onHide={() => setShowPDF(false)}
          animation={false}
          contentClassName="custom-modal-content"
          centered
        >
          <div className="custom-modal">
            <LaboratoryResultsTable />
            <div
              style={{
                marginTop: "5%",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <button
                className="filter-btn"
                onClick={() => handleDisapproved()}
                disabled={isApproved === "disapproved"}
                style={{
                  background:
                    isApproved === "disapproved"
                      ? "gray"
                      : "linear-gradient(180deg, #04b4cc 0%, #04b4cc 100%)",
                }}
              >
                DISAPPROVE
              </button>

              <button
                className="filter-btn mb-3"
                onClick={() => handleApproved()}
                disabled={isApproved === "approved"}
                style={{
                  background:
                    isApproved === "approved"
                      ? "gray"
                      : "linear-gradient(180deg, #04b4cc 0%, #04b4cc 100%)",
                }}
              >
                APPROVE
              </button>
              <button className="filter-btn" onClick={() => setShowPDF(false)}>
                BACK
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer hideProgressBar={true} />
        <div className="personal-data-cont">
          <div className="row">
            <div class="form-group">
              <label for="doctorRemarks" className="form-label">
                Remarks
              </label>
              <ReactQuill
                value={remarks}
                onChange={(value) => setRemarks(value)}
                readOnly={!editable}
                style={{ width: "90%", height: "150px" }}
              />
              {/* <textarea
                class="form-control"
                id="doctorRemarks"
                value={remarks}
                rows="3"
                style={{ width: "100%" }}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={!editable}
              ></textarea> */}
            </div>
          </div>
          <br /> <br />
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
