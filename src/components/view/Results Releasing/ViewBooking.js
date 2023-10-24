import React, { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { getToken, getUser } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { RingLoader, BeatLoader } from "react-spinners"
import { Navigate } from "react-router-dom"
import uploadIcon from "../../../images/icons/upload-icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import pdfIcon from "../../../images/icons/pdf-icon.png"
import FileUpload from "./FileUpload"
import MultipleUpload from "./MultipleUpload"

// import Browser from 'browser';

//css
import "../Imaging/Imaging.css";
import "./MedTech.css";
//components
import Searchbar from "../../Searchbar.js";
import Header from "../../Header.js";
import Navbar from "../../Navbar";
import Table from "../../Table.js";
import { compileAsync } from "sass";
import { File } from "buffer";

//variables
var servId = "";
var bookId = "";
var type = "";
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split("T")[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
};

const sendOutResults = [
  {
    // id: '1',
    file_name: "Result 1",
    date: "July 18, 2022",
  },
  {
    //  id: '2',
    file_name: "Result 2",
    date: "July 18, 2022",
  },
];

export default function ViewBooking() {
  document.body.style = "background: white;";

  const { id, dateFrom, dateTo } = useParams();

  // search bar
  const [bookingId, setBookingId] = useState(id);
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState(false);

  // Patient details
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [sendOutDetails, setSendOutDetails] = useState({
    email: "",
    remarks: "",
  });
  const [sendEmail, setSendEmail] = useState("");
  const [address, setAddress] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  const handleSendoutChange = (e) => {
    const { name, value } = e.target;
    setSendOutDetails({ ...sendOutDetails, [name]: value });
  };

  // Lab Tests
  const [services, setServices] = useState([]);
  const [packageServices, setPackageServices] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(false);

  //Redirect
  const [redirectBack, setRedirectBack] = useState(false);

  //Ready for email/pickup
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);

  const [withResults, setWithResults] = useState("");

  // Get booking details by searched booking id
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

            var presentDate = new Date();
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
          })
          .catch((error) => {});
      })
      .catch((error) => {});

    // Get booking details by booking id
    axios({
      method: "post",
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
      })
      .catch((error) => {});

    // Get booking details by booking id from packages
    axios({
      method: "post",
      url: window.$link + "/bookings/getBookingPackageDetails/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((booking) => {
        setPackageServices(booking.data);
      })
      .catch((error) => {});
  }, []);

  React.useEffect(() => {
    getUploads(data);
  }, []);

  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "categories/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((category) => {
        setCategoriesList(category.data.categories);
      })
      .catch((error) => {
        // console.log(error)
      });
  }, []);

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
                if (category.data.name === "Electrolytes (NaKCl,iCA)") {
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
                serviceDetails.approver = info.approved_by;
                // serviceDetails.md =
                setLabTests((oldArray) => [...oldArray, serviceDetails]);
              });
            });
          })
          .catch((error) => {
            // console.log(error)
          });
      }
      // if service is lab test
      else {
        var serviceDetails = {};

        let category = categoriesList.filter(
          (data) => data.id === info.category_id
        )[0];
        if (category.name == "Electrolytes (NaKCl,iCA)") {
          serviceDetails.key = "Electrolytes";
        } else {
          serviceDetails.key = category.name.replace(/\s+/g, "_").toLowerCase();
        }

        serviceDetails.category = category.name;
        serviceDetails.name = info.lab_test;
        serviceDetails.type = "lab";
        serviceDetails.packageId = "0";
        serviceDetails.id = info.id;
        serviceDetails.test_id = info.test_id;
        serviceDetails.md = info.md;
        serviceDetails.approver = info.approved_by;
        setLabTests((oldArray) => [...oldArray, serviceDetails]);
      }
    });
  }, [services]);

  // Categorize lab test

  const selectedTests = new Set();

  const xray = labTests.filter(
    (info) => info.key === "xray" || info.key === "radiology"
  );
  xray.forEach((test) => selectedTests.add(test.test_id));

  const ecg = labTests.filter((info) => info.key === "cardiology");
  ecg.forEach((test) => selectedTests.add(test.test_id));

  function emailTo() {
    if (sendOutDetails.email && sendOutDetails.email.trim() !== "") {
      setLoading(true);

      axios({
        method: "post",
        url: `${window.$link}booking_attachments/sendOut/${bookingId}`,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          requester: userId,
          email: sendOutDetails.email,
          remarks: sendOutDetails.remarks,
        },
      })
        .then(function (response) {
          setLoading(false); // Hide loading indicator
          toast.success("Email Successfully sent!");
        })
        .catch(function (error) {
          setLoading(false); // Hide loading indicator
          toast.error("Oops! Something went wrong with the server");
        });
    } else {
      toast.error("Empty or invalid Email input!");
    }
  }

  /****************/
  //Clinical Microscopy Filter

  //clinical microscopy that has the same upload buttons
  const clinicalMicroscopyGroup = labTests.filter(
    (info) => info.test_id === "1"
  );
  //add to the set
  clinicalMicroscopyGroup.forEach((test) => selectedTests.add(test.test_id));

  //clinical microscopy indiv lab tests - urinalysis
  const clinicalMicroscopyIndividualsUrinalysis = labTests.filter(
    (info) =>
      info.key === "clinical_microscopy_urinalysis" && info.test_id !== "1"
  );
  //add to the set
  clinicalMicroscopyIndividualsUrinalysis.forEach((test) =>
    selectedTests.add(test.test_id)
  );

  //clinical microscopy indiv lab tests - fecalysis
  const clinicalMicroscopyIndividualsFecalysis = labTests.filter(
    (info) => info.key === "clinical_microscopy_fecalysis"
  );
  //add to the set
  clinicalMicroscopyIndividualsFecalysis.forEach((test) =>
    selectedTests.add(test.test_id)
  );
  /****************/

  /****************/
  //Hematology Filter

  //hematology that has the same upload buttons
  const hematologyGroup = labTests.filter(
    (info) => info.test_id === "8" || info.test_id === "9"
  );
  //add to the set
  hematologyGroup.forEach((test) => selectedTests.add(test.test_id));

  //hematology indiv lab tests
  const hematologyIndividuals = labTests.filter(
    (info) =>
      info.key === "hematology" &&
      info.test_id !== "8" &&
      info.test_id !== "9" &&
      info.test_id !== "158" &&
      info.test_id !== "159"
  );
  //add to the set
  hematologyIndividuals.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  /****************/
  //Chemistry Filter

  //liver function tests
  const liverGroup = labTests.filter(
    (info) => info.key === "liver_function_tests" || info.test_id === "156"
  );
  //add to the set
  liverGroup.forEach((test) => selectedTests.add(test.test_id));

  //pancreatic test
  const pancreaticGroup = labTests.filter(
    (info) => info.key === "pancreatic_test"
  );
  //add to the set
  pancreaticGroup.forEach((test) => selectedTests.add(test.test_id));

  //lipid profile tests
  const lipidGroup = labTests.filter((info) => info.key === "lipid_profile");
  //add to the set
  lipidGroup.forEach((test) => selectedTests.add(test.test_id));

  //kidney function tests
  const kidneyGroup = labTests.filter(
    (info) => info.key === "kidney_function_tests"
  );
  //add to the set
  kidneyGroup.forEach((test) => selectedTests.add(test.test_id));

  //glucose tests
  const glucoseGroup = labTests.filter(
    (info) => info.key === "glucose_tests" && info.test_id !== "27"
  );
  //add to the set
  glucoseGroup.forEach((test) => selectedTests.add(test.test_id));
  //glucose individual tests
  const glucoseIndividual = labTests.filter((info) => info.test_id === "27");
  //add to the set
  glucoseIndividual.forEach((test) => selectedTests.add(test.test_id));

  //electrolytes tests
  const electrolytesGroup = labTests.filter(
    (info) =>
      info.key === "Electrolytes" ||
      (info.key === "chemistry" && info.test_id !== "156")
  );
  //add to the set
  electrolytesGroup.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  /****************/
  //Serology Filter

  //coaguation studies
  const coaguationGroup = labTests.filter(
    (info) => info.test_id === "158" || info.test_id === "159"
  );
  //add to the set
  coaguationGroup.forEach((test) => selectedTests.add(test.test_id));

  //thyroid profile
  const thyroidGroup = labTests.filter(
    (info) => info.key === "thyroid_profile"
  );
  //add to the set
  thyroidGroup.forEach((test) => selectedTests.add(test.test_id));

  //tumor markers
  const tumorIndividuals = labTests.filter(
    (info) => info.key === "tumor_markers"
  );
  //add to the set
  tumorIndividuals.forEach((test) => selectedTests.add(test.test_id));

  //immunulogy
  const immunologyIndividuals = labTests.filter(
    (info) => info.key === "immunology"
  );
  //add to the set
  immunologyIndividuals.forEach((test) => selectedTests.add(test.test_id));

  //hepatitis
  const hepatitisGroup = labTests.filter(
    (info) => info.test_id === "51" || info.test_id === "52"
  );
  //add to the set
  hepatitisGroup.forEach((test) => selectedTests.add(test.test_id));
  //hepatitis individuals
  const hepatitisIndividuals = labTests.filter(
    (info) =>
      info.key === "hepatitis_profile_screening" &&
      info.test_id !== "51" &&
      info.test_id !== "52"
  );
  //add to the set
  hepatitisIndividuals.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  /****************/
  //Histopathology Filter

  //histopathology that has the same upload buttons
  const histopathologyGroup = labTests.filter(
    (info) => info.key === "histopathology"
  );
  //add to the set
  histopathologyGroup.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  /****************/
  //Microbiology Filter

  //histopathology that has the same upload buttons
  const microbiologyIndividual = labTests.filter(
    (info) => info.key === "microbiology"
  );
  //add to the set
  microbiologyIndividual.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  /****************/

  const ultrasound = labTests.filter((info) => info.key === "ultrasound");
  ultrasound.forEach((test) => selectedTests.add(test.test_id));
  /****************/

  const unselectedTestsIDs = labTests.filter(
    (test) => !selectedTests.has(test.test_id)
  );

  // const {id} = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");

  // const others = labTests.filter(
  //   (info) => info.key === "other_tests" || info.key === "covid_rapid_tests"
  // );

  const [uploadsData, setUploadsData] = useState([]);
  const [download, setDOwnload] = useState("");
  const [rows, setRows] = useState([]);
  const [showConfirm, setShowConfirm] = React.useState(false);

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

  //Delete Multiple Uploads
  const [items, setItems] = useState([{ file_name: "" }]);

  function handleRemoveItem(id) {
    const rowId = id;
    const newItemList = [...items];
    newItemList.splice(rowId, 1);
    setItems(newItemList);
  }

  if (redirectBack === true) {
    if (dateFrom !== undefined && dateTo !== undefined) {
      var link = "/medtech/" + dateFrom + "/" + dateTo;
      return <Navigate to={link} />;
    } else {
      var link = "/medtech";
      return <Navigate to={link} />;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thin"
            title="RESULTS RELEASING MANAGER"
            withBack={true}
            setBack={setRedirectBack}
          />
          <div>
            <div className="spinner d-flex justify-content-center">
              {loading && (
                <RingLoader color={"#3a023a"} loading={loading} size={200} />
              )}
            </div>
            {/* PATIENT INFO  */}
            {!loading && (
              <>
                <h3 className="form-categories-header italic">
                  PERSONAL DETAILS
                </h3>

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
                      <span className="contact-number label">
                        CONTACT NUMBER
                      </span>
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
                      <span className="address detail">
                        {address.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <br />
                <br />

                {/* LABORATORY TEST UPLOADER */}
                <h3 className="form-categories-header italic">
                  LABORATORY TESTS
                </h3>
                <div className="personal-data-cont">
                  <div className="row">
                    <div className="col-4 ">
                      <input
                        type="checkbox"
                        name="physical_exam"
                        value="Ready for email/pickup"
                        checked={ready == true}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setReady(true);
                            setChecked(true);
                            axios({
                              method: "post",
                              url:
                                window.$link +
                                "bookings/markReady/" +
                                bookingId,
                              withCredentials: false,
                              params: {
                                api_key: window.$api_key,
                                token: userToken.replace(/['"]+/g, ""),
                                updated_by: userId,
                                is_ready: "yes",
                              },
                            })
                              .then(function (response) {})
                              .catch((error) => {
                                console.log(error);
                              });
                          } else {
                            setReady(false);
                            setChecked(false);
                            axios({
                              method: "post",
                              url:
                                window.$link +
                                "bookings/markReady/" +
                                bookingId,
                              withCredentials: false,
                              params: {
                                api_key: window.$api_key,
                                token: userToken.replace(/['"]+/g, ""),
                                updated_by: userId,
                                is_ready: "no",
                              },
                            }).then(function (response) {
                              console.log(response);
                            });
                          }
                        }}
                      />
                      <label for="mdCharge" className="booking-label">
                        READY FOR EMAIL/PICKUP
                      </label>
                    </div>

                    {checked ? (
                      <>
                        <div
                          className="col-3"
                          style={{ textAlign: "-webkit-right" }}
                        >
                          <input
                            type="text"
                            name="email"
                            placeholder="Enter Email..."
                            className="result-email"
                            value={sendOutDetails.email}
                            onChange={handleSendoutChange}
                          />
                        </div>
                        <div
                          className="col-3"
                          style={{ textAlign: "-webkit-right" }}
                        >
                          <input
                            type="text"
                            name="remarks"
                            placeholder="Enter Remarks..."
                            className="result-email"
                            value={sendOutDetails.remarks}
                            onChange={handleSendoutChange}
                          />
                        </div>
                        <div className="col-2">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            className="send-btn-results"
                            onClick={emailTo}
                          >
                            {" "}
                            {loading ? (
                              <BeatLoader
                                color={"#3a023a"}
                                loading={loading}
                                size={10}
                              />
                            ) : (
                              "Send Out"
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="col-8"></div>
                    )}
                  </div>
                </div>
                <div className="personal-data-cont">
                  {/* CLINICAL MICROSCOPY */}
                  {(clinicalMicroscopyGroup.length > 0 ||
                    clinicalMicroscopyIndividualsFecalysis.length > 0 ||
                    clinicalMicroscopyIndividualsUrinalysis.length > 0) && (
                    <>
                      <div className="category label">CLINICAL MICROSCOPY</div>
                      {clinicalMicroscopyGroup.length > 0 && (
                        <FileUpload
                          servicesData={clinicalMicroscopyGroup}
                          title={"CLINICAL MICROSCOPY"}
                          bookingId={bookingId}
                        />
                      )}
                      {clinicalMicroscopyIndividualsUrinalysis.map((data) => (
                        <FileUpload
                          servicesData={[data]}
                          title={"CLINICAL MICROSCOPY"}
                          bookingId={bookingId}
                        />
                      ))}
                      {clinicalMicroscopyIndividualsFecalysis.map((data) => (
                        <FileUpload
                          servicesData={[data]}
                          title={"CLINICAL MICROSCOPY"}
                          bookingId={bookingId}
                        />
                      ))}
                      <hr className="labtest-line mb-5" />
                    </>
                  )}

                  {/* HEMATOLOGY */}
                  {(hematologyGroup.length > 0 ||
                    hematologyIndividuals.length > 0) && (
                    <>
                      <div className="category label">HEMATOLOGY</div>
                      {hematologyGroup.length > 0 && (
                        <FileUpload
                          servicesData={hematologyGroup}
                          title={"HEMATOLOGY"}
                          bookingId={bookingId}
                        />
                      )}
                      {hematologyIndividuals.map((data) => (
                        <FileUpload
                          servicesData={[data]}
                          title={"HEMATOLOGY"}
                          bookingId={bookingId}
                        />
                      ))}
                      <hr className="labtest-line mb-5" />
                    </>
                  )}

                  {/* CHEMISTRY */}
                  {(liverGroup.length > 0 ||
                    pancreaticGroup.length > 0 ||
                    lipidGroup.length > 0 ||
                    kidneyGroup.length > 0 ||
                    glucoseGroup.length > 0 ||
                    glucoseIndividual.length > 0 ||
                    electrolytesGroup.length > 0) && (
                    <>
                      <div className="category label">CHEMISTRY</div>
                      {electrolytesGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Electrolytes (NaKCl)
                          </div>
                          <FileUpload
                            servicesData={electrolytesGroup}
                            title={"Kidney Function Tests"}
                            bookingId={bookingId}
                          />
                        </>
                      )}

                      {liverGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Liver Function Tests
                          </div>
                          <FileUpload
                            servicesData={liverGroup}
                            title={"Liver Function Tests"}
                            bookingId={bookingId}
                          />
                        </>
                      )}

                      {pancreaticGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Pancreatic Test
                          </div>
                          <FileUpload
                            servicesData={pancreaticGroup}
                            title={"Liver Function Tests"}
                            bookingId={bookingId}
                          />
                        </>
                      )}

                      {lipidGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Lipid Profile
                          </div>
                          <FileUpload
                            servicesData={lipidGroup}
                            title={"Lipid Profile"}
                            bookingId={bookingId}
                          />
                        </>
                      )}

                      {kidneyGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Kidney Function Tests
                          </div>
                          <FileUpload
                            servicesData={kidneyGroup}
                            title={"Kidney Function Tests"}
                            bookingId={bookingId}
                          />
                        </>
                      )}

                      {glucoseGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Glucose Tests
                          </div>
                          <FileUpload
                            servicesData={glucoseGroup}
                            title={"Glucose Tests"}
                            bookingId={bookingId}
                          />
                        </>
                      )}
                      {glucoseIndividual.map((data) => (
                        <FileUpload
                          servicesData={[data]}
                          title={"Glucose Tests"}
                          bookingId={bookingId}
                        />
                      ))}
                    </>
                  )}

                  {/* SEROLOGY */}
                  {(coaguationGroup.length > 0 ||
                    thyroidGroup.length > 0 ||
                    tumorIndividuals.length > 0 ||
                    immunologyIndividuals.length > 0 ||
                    hepatitisGroup.length > 0 ||
                    hepatitisIndividuals.length > 0) && (
                    <>
                      <div className="category label">SEROLOGY</div>
                      {(hepatitisGroup.length > 0 ||
                        hepatitisIndividuals.length > 0) && (
                        <>
                          <div className="category label mt-3">
                            Hepatitis Profile Screening
                          </div>
                          <FileUpload
                            servicesData={hepatitisGroup}
                            title={"HEPATITIS"}
                            bookingId={bookingId}
                          />
                          {hepatitisIndividuals.map((data) => (
                            <FileUpload
                              servicesData={[data]}
                              title={"HEPATITIS"}
                              bookingId={bookingId}
                            />
                          ))}
                        </>
                      )}
                      {immunologyIndividuals.length > 0 && (
                        <>
                          <div className="category label mt-3">Immunology</div>
                          {immunologyIndividuals.map((data) => (
                            <FileUpload
                              servicesData={[data]}
                              title={"IMMUNOLOGY"}
                              bookingId={bookingId}
                            />
                          ))}
                        </>
                      )}
                      {coaguationGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Coaguation Studies
                          </div>
                          <FileUpload
                            servicesData={coaguationGroup}
                            title={"COAGUATION"}
                            bookingId={bookingId}
                          />
                        </>
                      )}
                      {thyroidGroup.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Thyroid Profile
                          </div>
                          <FileUpload
                            servicesData={thyroidGroup}
                            title={"COAGUATION"}
                            bookingId={bookingId}
                          />
                        </>
                      )}
                      {tumorIndividuals.length > 0 && (
                        <>
                          <div className="category label mt-3">
                            Tumor Markers
                          </div>
                          {tumorIndividuals.map((data) => (
                            <FileUpload
                              servicesData={[data]}
                              title={"TUMOR MARKERS"}
                              bookingId={bookingId}
                            />
                          ))}
                        </>
                      )}

                      <hr className="labtest-line mb-5" />
                    </>
                  )}

                  {/* HISTOPATHOLOGY */}
                  {histopathologyGroup.length > 0 && (
                    <>
                      <div className="category label">HISTOPATHOLOGY</div>

                      <FileUpload
                        servicesData={histopathologyGroup}
                        title={"HISTOPATHOLOGY"}
                        bookingId={bookingId}
                      />

                      <hr className="labtest-line mb-5" />
                    </>
                  )}

                  {/* MICROBIOLOGY */}
                  {microbiologyIndividual.length > 0 && (
                    <>
                      <div className="category label">MICROBIOLOGY</div>

                      {microbiologyIndividual.map((data) => (
                        <FileUpload
                          servicesData={[data]}
                          title={"MICROBIOLOGY"}
                          bookingId={bookingId}
                        />
                      ))}

                      <hr className="labtest-line mb-5" />
                    </>
                  )}

                  {/* XRAY RADIOLOGY */}
                  {xray.length > 0 && (
                    <div>
                      <div className="category label">XRAY</div>
                      {xray.map((data) => (
                        <FileUpload
                          servicesData={[data]} // passing individual data item
                          title={"XRAY"}
                          bookingId={bookingId}
                        />
                      ))}
                      <hr className="labtest-line mb-5" />
                    </div>
                  )}

                  {/* CARDIOLOGY */}
                  {ecg.length > 0 && (
                    <div>
                      <div className="category label">ECG</div>
                      {ecg.map((data) => (
                        <FileUpload
                          servicesData={[data]} // passing individual data item
                          title={"ECG"}
                          bookingId={bookingId}
                        />
                      ))}
                      <hr className="labtest-line mb-5" />
                    </div>
                  )}

                  {/* ULTRASOUND */}
                  {ultrasound.length > 0 && (
                    <div>
                      <div className="category label">ULTRASOUND</div>
                      {ultrasound.map((data) => (
                        <FileUpload
                          servicesData={[data]} // passing individual data item
                          title={"ULTRASOUND"}
                          bookingId={bookingId}
                        />
                      ))}
                      <hr className="labtest-line mb-5" />
                    </div>
                  )}

                  {/*OTHERS or UNGROUPED */}
                  {unselectedTestsIDs.length > 0 && (
                    <>
                      <div className="category label mt-3">OTHERS</div>
                      {unselectedTestsIDs.map((data) => (
                        <div>
                          <FileUpload
                            servicesData={[data]}
                            title={data.name}
                            bookingId={bookingId}
                          />
                        </div>
                      ))}
                    </>
                  )}

                  {/* OTHERS */}
                  {/* {others.length != 0 && (
                    <div>
                      <div className="category label">OTHER TESTS</div>
                      <FileUpload
                        servicesData={others}
                        title={"OTHER TESTS"}
                        bookingId={bookingId}
                      />
                      <hr className="labtest-line mb-5" />
                    </div>
                  )} */}
                </div>

                {/* SEND OUT RESULTS */}
                <h3 className="form-categories-header italic">
                  SEND OUT RESULTS
                </h3>
                <div className="personal-data-cont">
                  <MultipleUpload bookingId={bookingId} />
                </div>
                <div className="row">
                  {data == null && (
                    <Table
                      type={"send-out-results"}
                      withSubData={false}
                      tableData=""
                      rowsPerPage={5}
                      headingColumns={[
                        // 'ID',
                        "FILE NAME",
                        "ACTION",
                      ]}
                    />
                  )}

                  {data != null && (
                    <Table
                      type={"send-out-results"}
                      withSubData={false}
                      tableData={data}
                      rowsPerPage={5}
                      headingColumns={["FILE NAME", "ACTION"]}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Fragment>
      </div>
    </div>
  );
}
