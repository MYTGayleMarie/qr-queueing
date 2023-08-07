import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";

import "./FileUpload.css";
import "./GenerateResults.css";
import "./MedTech.css";
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
import image12 from "../../../images/med_tech/image12.png";
import image11 from "../../../images/med_tech/image11.png";
import DummyImg from "../../../images/med_tech/dummy.png";
import Watermark from "../../../images/Watermark.png";
import Teal from "../../../images/backgrounds/TealHeader.png";

const userToken = getToken();
const userId = getUser();

export default function GenerateResults({ servicesData, title, bookingId }) {
  const approverId = servicesData[servicesData.length - 1].approver;

  const { id, dateFrom, dateTo } = useParams();

  const [loadData, setLoadData] = useState(false);
  const [hasImage, setHasImage] = useState(true);
  const [labIds, setLabIds] = useState([]);
  const [packageIds, setPackageIds] = useState([]);
  const [servicesLab, setServicesLab] = useState([]);
  const [servicesPackage, setServicesPackage] = useState([]);
  const componentRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const handleRedirect = () => setRedirect(true);
  const GenerateResultsComponentRef = useRef();
  const [remark, setRemark] = useState("");

  // Patient Details
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
  const [loading, setLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState([]);
  const [labTestData, setLabTestData] = useState([]);
  const [labTestResults, setLabTestResults] = useState([]);
  const [isApproved, setIsApproved] = useState("");

  // Doctor Remarks
  const [medTech, setMedTech] = useState("");
  const [medTechPRC, setMedTechPRC] = useState("");
  const [clinicPatho, setClinicPatho] = useState("");
  const [clinicPathoPRC, setClinicPathoPRC] = useState("");

  const [data, setData] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const [detailID, setDetailID] = useState(false);
  const [resultID, setResultID] = useState(false);

  const [readyCustomer, setReadyCustomer] = useState(false);
  const [readyBooking, setReadyBooking] = useState(false);
  const [readyResults, setReadyResults] = useState(false);
  const [labReady, setLabReady] = useState(false);

  var presentDate = new Date();

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

  if (window.$userToken != null) {
    var roleId = window.$roleId.replace(/^"(.*)"$/, "$1");
    //var roleId = "10";
  }

  // get Patient Details
  React.useEffect(() => {
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
        const customerId = response.data.data.booking.customer_id;

        axios({
          method: "post",
          url: window.$link + "customers/show/" + customerId,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then((response) => {
            setLoading(false);
            setFirstName(response.data.first_name);
            setMiddleName(response.data.middle_name);
            setLastName(response.data.last_name);

            var birthDate = new Date(response.data.birthdate);
            setBirthDate(birthDate.toDateString());

            setGender(response.data.gender);

            var age = presentDate.getFullYear() - birthDate.getFullYear();
            var m = presentDate.getMonth() - birthDate.getMonth();
            if (
              m < 0 ||
              (m === 0 && presentDate.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            setAge(age);

            setContactNo(response.data.contact_no);
            setEmail(response.data.email);
            setAddress(response.data.address);

            setReadyCustomer(true);
          })
          .catch((error) => {});
      })
      .catch((error) => {});

    // Get booking details by booking id
    axios({
      method: "get",
      url: window.$link + "bookings/getBookingDetails/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((booking) => {
        setServices(booking.data);

        setReadyBooking(true);
      })
      .catch((error) => {});

    // Get Detail Results
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
          setReadyResults(true);
          if (selectedLab.type == "lab") {
            setLabTestData(data.booking_detail_results);
          } else {
            setLabTestData(
              data.booking_package_details_results[packageDetailId]
            );
          }
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  // Generate PDF file for printing

  const printHandle = useReactToPrint({
    onAfterPrint: handleRedirect,
    content: () => componentRef.current,
    pageStyle: () => `
          @page { size: letter; margin: 0.5in;margin-bottom: 0in;}
          @media print {
            .print-break {
              margin: 0.5in;
              margin-top:0.5in;
              margin-left:0.5in;
              margin-right:0.5in;
              margin-bottom: 0in;
              display: block;
              page-break-before: always;
            }
          }
          `,
  });

  const handlePrint = () => {
    if (labReady === true) {
      setShowPDF(true);
      printHandle();
    }
  };

  // Function to get Booking Detail Results
  React.useEffect(() => {
    var lab_test_results = [];
    if (servicesData.length > 0) {
      servicesData.map(async (data, key) => {
        if (data.id !== "") {
          await axios({
            method: "get",
            url: window.$link + "Bookingdetails/getDetailsResult/" + data.id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ""),
              requester: userId,
            },
          })
            .then((response) => {
              if (response.data.data?.booking_detail_results !== null) {
                response.data.data.booking_detail_results.map((val) => {
                  lab_test_results.push({ ...val });
                });

                // data.lab_test_results.push(
                //   response.data.data.booking_detail_results[0]
                // );
              }
              setReadyResults(true);

              //old logic
              // lab_test_results.push(
              //   response.data.data?.booking_detail_results !== null
              //     ? response.data.data?.booking_detail_results
              //     : []
              // );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
    setLabTestResults(lab_test_results);

    setLabReady(true);
  }, []);

  // Function to get Booking Details get Details
  React.useEffect(() => {
    if (servicesData.length > 0 && loadData === true) {
      servicesData.map((data) => {
        if (data.id !== "") {
          axios({
            method: "get",
            url: window.$link + "Bookingdetails/getDetails/" + data.id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ""),
              requester: userId,
            },
          })
            .then((booking) => {
              setRemark(
                remark !== ""
                  ? remark + ", " + booking.data.data.booking_detail[0]?.remarks
                  : booking.data.data.booking_detail[0]?.remarks
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  }, [loadData]);

  // set Approval
  React.useEffect(() => {
    const index = services.findIndex(
      (service) => service.lab_test === servicesData[0].name
    );

    if (servicesData[0].key === "thyroid_profile") {
      var services_copy = [...services];
      setIsApproved(
        services_copy.filter((data) => data.result_approval === "approved")
          .length > 0
          ? "approved"
          : ""
      );
    } else {
      if (services[index]?.result_approval === "approved") {
        setIsApproved("approved");
      } else if (services[index]?.result_approval === "disapproved") {
        setIsApproved("disapproved");
      }
    }
  }, [readyBooking]);

  // Categorizing services into lab and packages
  React.useEffect(() => {
    setServicesLab(servicesData.filter((info) => info.type == "lab"));
    setServicesPackage(servicesData.filter((info) => info.type == "package"));
  }, [servicesData]);

  // Making array of all package ids
  React.useEffect(() => {
    packageIds.length = 0;
    servicesPackage.map((data, index) => {
      setPackageIds((oldArray) => [...oldArray, data.id]);
    });
  }, [servicesPackage]);

  //fetch Medtech
  React.useEffect(() => {
    setClinicPatho("JENNIFER D. ABIERAS");
    setClinicPathoPRC("PRC LIC. NO.: 0085469");

    if (medTech === "") {
      axios({
        method: "get",
        url: window.$link + "users/show/" + approverId,
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
    if (approverId !== null) {
      if (approverId === "24") {
        setMedTechPRC("PRC LIC. NO.: 0052932");
      } else if (approverId === "25") {
        setMedTechPRC("PRC LIC. NO.: 0085690");
      } else if (approverId === "26") {
        setMedTechPRC("PRC LIC. NO.: 0092410");
      } else if (approverId === "23") {
        setMedTechPRC("PRC LIC. NO.: 0112611");
      } else if (approverId === "27") {
        setMedTechPRC("PRC LIC. NO.: 0109359");
      } else if (approverId === "28") {
        setMedTechPRC("PRC LIC. NO.: 0094539");
      } else if (approverId === "29") {
        setMedTechPRC("PRC LIC. NO.: 0093629");
      } else if (approverId === "30") {
        setMedTechPRC("PRC LIC. NO.: 0094334");
      } else if (approverId === "45") {
        return "PRC LIC. NO.: 0085308";
      } else if (userId === "48") {
        return "PRC LIC. NO.: 0109437";
      } else {
        // setMedTechPRC("PRC LIC. NO.: 0112611");
        setMedTechPRC("No PRC LIC. NO.");
      }
    } else {
      if (userId === "24") {
        setMedTechPRC("PRC LIC. NO.: 0052932");
      } else if (userId === "25") {
        setMedTechPRC("PRC LIC. NO.: 0085690");
      } else if (userId === "26") {
        setMedTechPRC("PRC LIC. NO.: 0092410");
      } else if (userId === "23") {
        setMedTechPRC("PRC LIC. NO.: 0112611");
      } else if (userId === "27") {
        setMedTechPRC("PRC LIC. NO.: 0109359");
      } else if (userId === "28") {
        setMedTechPRC("PRC LIC. NO.: 0094539");
      } else if (userId === "29") {
        setMedTechPRC("PRC LIC. NO.: 0093629");
      } else if (userId === "30") {
        setMedTechPRC("PRC LIC. NO.: 0094334");
      } else if (userId === "45") {
        return "PRC LIC. NO.: 0085308";
      } else if (userId === "48") {
        return "PRC LIC. NO.: 0109437";
      }
       else {
        setMedTechPRC("No PRC LIC. NO.");
      }
    }
  }, []);

  function chooseImage() {
    if (approverId !== null) {
      if (approverId === "23") {
        setHasImage(true);
        return (
          <img
            src={Image9}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (approverId === "24") {
        setHasImage(true);
        return (
          <img
            src={Image2}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (approverId === "25") {
        setHasImage(true);
        return (
          <img
            src={Image6}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (approverId === "26") {
        setHasImage(true);
        return (
          <img
            src={Image5}
            alt="MedTech"
            className="mt-5"
            width={50}
            height={50}
          />
        );
      } else if (approverId === "27") {
        setHasImage(true);
        return (
          <img
            src={Image10}
            alt="MedTech"
            className="mt-5"
            width={50}
            height={50}
          />
        );
      } else if (approverId === "28") {
        setHasImage(true);
        return (
          <img
            src={Image8}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (approverId === "29") {
        setHasImage(true);
        return (
          <img
            src={Image9}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "45") {
        setHasImage(true);
        return (
          <img
            src={image11}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (approverId === "48") {
        setHasImage(true);
        return (
          <img
            src={image12}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      }else {
        setHasImage(false);

        return <div className="mt-5"></div>;
      }
    } else {
      if (userId === "23") {
        setHasImage(true);
        return (
          <img
            src={Image9}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "24") {
        setHasImage(true);
        return (
          <img
            src={Image2}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "25") {
        setHasImage(true);
        return (
          <img
            src={Image6}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "26") {
        setHasImage(true);
        return (
          <img
            src={Image5}
            alt="MedTech"
            className="mt-5"
            width={50}
            height={50}
          />
        );
      } else if (userId === "27") {
        setHasImage(true);
        return (
          <img
            src={Image10}
            alt="MedTech"
            className="mt-5"
            width={50}
            height={50}
          />
        );
      } else if (userId === "28") {
        setHasImage(true);
        return (
          <img
            src={Image8}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "29") {
        setHasImage(true);
        return (
          <img
            src={Image9}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "45") {
        setHasImage(true);
        return (
          <img
            src={image11}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else if (userId === "48") {
        setHasImage(true);
        return (
          <img
            src={image12}
            alt="MedTech"
            className="mt-5"
            width={100}
            height={50}
          />
        );
      } else {
        setHasImage(false);
        return <div className="mt-5"></div>;
      }
      // if (userId === "24") {
      //   return <img src={Image2} alt="MedTech" />;
      //   // return Image2;
      // } else if (userId === "25") {
      //   return <img src={Image6} alt="MedTech" />;
      //   // return Image3;
      // } else if (userId === "26") {
      //   return <img src={Image5} alt="MedTech" />;
      //   // return Image4;
      // } else if (userId === "23") {
      //   return <img src={Image9} alt="MedTech" />;
      //   // return Image5;
      // } else if (userId === "27") {
      //   return <img src={Image10} alt="MedTech" />;
      //   // return Image6;
      // } else if (userId === "28") {
      //   return <img src={Image3} alt="MedTech" />;
      //   // return Image7;
      // } else if (userId === "29") {
      //   return <img src={Image4} alt="MedTech" />;
      //   // return Image8;
      // } else if (userId === "30") {
      //   return <img src={Image11} alt="MedTech" />;
      //   // return Image8;
      // } else {
      //   setHasImage(false)
      //   return <img src={Image9} alt="MedTech" />;
      //   // return Image9;
      // }
    }
  }

  const Signature = () => {
    return (
      <div className="PDFFont">
        <div className="wrapper">
          <div className="box">
            {chooseImage()}
            {/* <img src={medtechImage} alt="MedTech" /> */}
          </div>
          <div className="box">
            <img
              src={Image1}
              alt="MedTech"
              style={{ zIndex: "50", marginTop: "60px" }}
            />
          </div>
        </div>
        <div
          className="wrapper"
          style={{ marginTop: hasImage ? "-13px" : "-5px" }}
        >
          <div className="box">
            <span className="tspan">{medTech}</span>
          </div>
          <div className="box">
            <span className="tspan">{clinicPatho}</span>
          </div>
        </div>
        <div className="wrapper">
          <div className="box">
            <span className="tspan">{medTechPRC}</span>
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
      <div style={{ display: "none" }} class="bg">
        <div>
          <div ref={componentRef}>
            {/* Header */}
            <img src={Teal} alt="QR DIAGNOSTICS" className="teal_header" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <img
                src={Logo}
                alt="QR DIAGNOSTICS"
                className="img-small"
                style={{ paddingRight: "50px" }}
              />
              <div className="PDFFont" style={{ display: "block" }}>
                <span className="resultTitle">
                  DEPARTMENT OF CLINICAL LABORATORY
                </span>
                <span className="addressTitle">
                  Unit A, M Block, Marasbaras, Tacloban City | 0999-888-6694
                </span>
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
                {servicesData[0].category.toUpperCase()}
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
                <div class="row">
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
                <div class="row">
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
                    <span>{birthDate.toUpperCase()}</span>
                  </div>
                </div>
                <div class="row">
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
              <img src={Watermark} alt="QR DIAGNOSTICS" className="watermark" />

              {/* Mapping of Detail Results */}
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
                  {servicesData[0].category.toUpperCase() !==
                    "CLINICAL MICROSCOPY FECALYSIS" &&
                    servicesData[0].category.toUpperCase() !==
                      "CLINICAL MICROSCOPY URINALYSIS" &&
                    servicesData[0].category.toUpperCase() !== "SEROLOGY" &&
                    servicesData[0].category.toUpperCase() !==
                      "MICROBIOLOGY" && (
                      <div className="col">
                        <span>
                          <b>REFERENCE RANGE</b>
                        </span>
                      </div>
                    )}
                </div>
              </div>
              {servicesData.map((service, serviceIndex) => (
                <div>
                  {/* {getResults(service.id)} */}
                  <div className="tb mid">
                    {/* {labTestResults.map((result, resultIndex) => ( */}
                    {labTestResults.map((result, resultIndex) => {
                      return (
                        <>
                          {result.booking_detail_id == service.id && (
                            <div className="row" key={resultIndex}>
                              <div className="col">
                                <span>{result["lab_test"].toUpperCase()}</span>
                              </div>
                              <div className="col">
                                {result["preferred"] !== " " ? (
                                  result["preferred"] === result["result"] ? (
                                    <span>
                                      {result["result"] + " " + result["unit"]}
                                    </span>
                                  ) : (
                                    <span class="red">
                                      {result["result"] + " " + result["unit"]}
                                    </span>
                                  )
                                ) : result["preferred_from"] !== "0.00" ||
                                  result["preferred_to"] !== "0.00" ? (
                                  parseFloat(result["preferred_from"]) >
                                  parseFloat(result["result"]) ? (
                                    <span class="red">
                                      {parseFloat(result["result"]) +
                                        " " +
                                        result["unit"] +
                                        " (L)"}
                                    </span>
                                  ) : parseFloat(result["result"]) >
                                    parseFloat(result["preferred_to"]) ? (
                                    <span class="red">
                                      {parseFloat(result["result"]) +
                                        " " +
                                        result["unit"] +
                                        " (H)"}
                                    </span>
                                  ) : result["result"] === "0.00" &&
                                    result["preferred_from"] === "0.00" &&
                                    result["preferred_to"] === "0.00" ? null : (
                                    <span>
                                      {parseFloat(result["result"]) +
                                        " " +
                                        result["unit"]}
                                    </span>
                                  )
                                ) : (
                                  <span>
                                    {result["result"] + " " + result["unit"]}
                                  </span>
                                )}
                              </div>
                              {servicesData[0].category.toUpperCase() !==
                                "CLINICAL MICROSCOPY FECALYSIS" &&
                                servicesData[0].category.toUpperCase() !==
                                  "CLINICAL MICROSCOPY URINALYSIS" &&
                                servicesData[0].category.toUpperCase() !==
                                  "SEROLOGY" &&
                                servicesData[0].category.toUpperCase() !==
                                  "MICROBIOLOGY" && (
                                  <div className="col">
                                    <span>
                                      {result["preferred"] !== " "
                                        ? result["preferred"]
                                        : result["preferred_from"] === "0.00" &&
                                          result["preferred_to"] === "0.00"
                                        ? " "
                                        : result["preferred_from"] !== "0.00" ||
                                          result["preferred_to"] !== "0.00"
                                        ? result["preferred_to"] === "999.99"
                                          ? ">=" +
                                            parseFloat(result["preferred_from"])
                                          : parseFloat(
                                              result["preferred_from"]
                                            ) +
                                            "-" +
                                            parseFloat(result["preferred_to"])
                                        : ""}
                                    </span>
                                  </div>
                                )}
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {/* {servicesData[0].category.toUpperCase() !==
                    "THYROID PROFILE" && (
                    <hr
                      style={{
                        border: "2px solid black",
                        width: "100%",
                        marginBottom: "0px",
                      }}
                    />
                  )} */}
                </div>
              ))}
              {servicesData[0].category.toUpperCase() === "THYROID PROFILE" && (
                <hr
                  style={{
                    border: "2px solid black",
                    width: "100%",
                    marginBottom: "0px",
                  }}
                />
              )}
              <div
                className="mt-2"
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
                  <div dangerouslySetInnerHTML={{ __html: remark }}></div>
                </span>
              </div>
              <br />
              <Signature />
            </div>
          </div>
        </div>
      </div>
      // </div>
    );
  };

  return (
    <div>
      <div className="whole-cont">
        <ToastContainer />
        <div className="result-cont row p-1 mb-5">
          <div className="col-sm-4">
            {servicesData.map((info, index) => (
              <div className={"details" + info.id}>{info.name}</div>
            ))}
          </div>
          <div className="upload-cont col-sm-8">
            <div>
              {/* Generate Result Button */}
              {
                <button
                  className="upload-res-btn"
                  onClick={() => {
                    setLoadData(true);
                    handlePrint();
                  }}
                  style={{
                    background:
                      (!readyCustomer && !readyBooking && !readyResults) ||
                      !(isApproved === "approved")
                        ? "gray"
                        : "#55073A",
                  }}
                  disabled={
                    (!readyCustomer && !readyBooking && !readyResults) ||
                    !(isApproved === "approved")
                  }
                >
                  GENERATE RESULTS
                </button>
              }
            </div>
          </div>
        </div>
        <div>
          <LaboratoryResultsTable />
        </div>
      </div>
    </div>
  );
}
