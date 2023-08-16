import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllLabServices, getAllPackages } from "../../../services/services";
import { Navigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { PaymentToPrint } from "./PaymentToPrint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//css
import "./AddPayment.css";

//components
import Navbar from "../../Navbar";
import Header from "../../Header.js";
import PersonalDetails from "../../PersonalDetails";
import Costing from "../../Costing";
import { RingLoader } from "react-spinners";

const userToken = getToken();
const userId = getUser();

const CashPaymentDetails = {
  type: "",
  amount: "",
};

const CardPaymentDetails = {
  type: "",
  amount: "",
  card_name: "",
  card_no: "",
  card_expiry: "",
  card_bank: "",
  check_no: "",
  check_bank: "",
  check_date: "",
};

const CheckPaymentDetails = {
  type: "",
  amount: "",
  check_no: "",
  check_bank: "",
  check_date: "",
};

function AddPayment() {
  document.body.style = "background: white;";

  const [payment, setPayment] = useState("");
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [pay, setPay] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [mdCharge, setMdCharge] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [discount, setDiscount] = useState(0);
  const { id } = useParams();
  const [labTests, setLabTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [click, setClick] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  //customer details
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [seniorPwdId, setseniorPwdId] = useState("");
  const [senior_id, setSeniorId] = useState("");
  const [pwd_id, setPWDId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [referral, setReferral] = useState("");

  //services
  const [services, setServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [result, setResult] = useState("");
  const [printServices, setPrintServices] = useState([]);
  const [queue, setQueue] = useState([]);
  const [queueNumber, setQueueNumber] = useState("");
  const [encodedOn, setEncodedOn] = useState("");

  //print
  const [printData, setPrintData] = useState(false);

  const [cashTax, setCashTax] = useState(0);
  //check states
  const [checkNo, setCheckNo] = useState("");
  const [checkBank, setCheckBank] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const [checkTax, setCheckTax] = useState(0);
  //card states
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardBank, setCardBank] = useState("");
  const [cardTax, setCardTax] = useState(0);

  //others states
  const [source, setSource] = useState("");
  const [reference, setReference] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [othersTax, setOthersTax] = useState(0);

  //add Test states
  const [addTestType, setAddTestType] = useState("");
  const [test, setTest] = useState("");

  //Modal
  const [show, setShow] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [serviceId, setServiceId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveClose = () => setShowRemove(false);
  const handleRemoveShow = () => setShowRemove(true);

  //Discount
  const [discountList, setDiscountList] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountDetail, setDiscountDetail] = useState("");

  //Loaders
  const [loadingCust, setLoadingCust] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => `
          @page { size: letter;}
          @media print {
            .print-break {
              margin-top: 1rem;
              display: block;
              page-break-before: always;
            }
          }
          `,
  });

  function handleRemove(service_id) {
    handleRemoveShow();
    setServiceId(service_id);
  }

  var amount = 0;

  React.useEffect(() => {
    var totalAmount;
    var discount;
    var customer;
    var type;

    axios({
      method: "post",
      url: window.$link + "bookings/show/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        setDiscountDetail(response.data.discount_detail);
        setPaidAmount(response.data.paid_amount);
        setPaymentStatus(response.data.payment_status);
        setPaymentType(response.data.payment_type);
        setTotal(response.data.total_amount);
        setGrandTotal(response.data.grand_total);
        setServiceFee(response.data.home_service_fee);
        setMdCharge(response.data.md_charge);
        setDiscountCode(response.data.discount_code);
        setDiscount(response.data.discount);
        setBookingDate(response.data.booking_time);
        setEncodedOn(response.data.added_on);
        setReferral(response.data.doctors_referal);
        setResult(response.data.result);
        totalAmount = response.data.total_amount;
        discount = response.data.discount;
        customer = response.data.customer_id;
        type = response.data.type;

        axios({
          method: "post",
          url: window.$link + "customers/show/" + response.data.customer_id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        })
          .then(function (customer) {
            //AGE
            var presentDate = new Date();
            var birthDate = new Date(customer.data.birthdate);
            var age = presentDate.getFullYear() - birthDate.getFullYear();
            var m = presentDate.getMonth() - birthDate.getMonth();
            if (
              m < 0 ||
              (m === 0 && presentDate.getDate() < birthDate.getDate())
            ) {
              age--;
            }

            setPatientId(response.data.customer_id);
            setFirstName(customer.data.first_name);
            setMiddleName(customer.data.middle_name);
            setLastName(customer.data.last_name);
            setBirthDate(birthDate.toDateString());
            setGender(customer.data.gender);
            setAge(age);
            setContactNo(customer.data.contact_no);
            setEmail(customer.data.email);
            setAddress(customer.data.address);
            setSeniorId(customer.data.senior_id);
            setPWDId(customer.data.pwd_id);
            setLoadingCust(true);
          })
          .catch(function (error) {
            setLoadingCust(true);
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    var presentDate = new Date();
    var formattedPresentData = presentDate.toISOString().split("T")[0];
    queue.length = 0;
    //Queue
    axios({
      method: "post",
      url: window.$link + "bookings/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
        date_from: formattedPresentData,
        date_to: formattedPresentData,
      },
    })
      .then(function (response) {
        const arrangedObj = response.data.bookings.sort((a, b) => a.id - b.id);

        arrangedObj.map((booking, index) => {
          var bookingInfo = {};
          bookingInfo.queue = index + 1;
          bookingInfo.id = booking.id;
          setQueue((oldArray) => [...oldArray, bookingInfo]);
        });
      })
      .then(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    queue.map((data, index) => {
      if (data.id == id) {
        setQueueNumber(data.queue.toString());
      }
    });

    if (queueNumber == "") {
      setQueueNumber("0");
    }
  }, [queue]);

  React.useEffect(() => {
    services.length = 0;
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
      .then(function (booking) {
        setLoadingBooking(true);
        setServices(booking.data);
      })
      .catch(function (error) {
        setLoadingBooking(true);
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    printServices.length = 0;
    services.map((info, index1) => {
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
        }).then(function (response) {
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
            })
              .then(function (category) {
                if (category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes";
                } else {
                  serviceDetails.key = category.data.name
                    .replace(/\s+/g, "_")
                    .toLowerCase();
                }
                serviceDetails.category = category.data.name;
                serviceDetails.name = packageCat.lab_test;
                setPrintServices((oldArray) => [...oldArray, serviceDetails]);

                if (
                  services.length - 1 == index1 &&
                  response.data.length - 1 == index2 &&
                  bookingDate != null &&
                  birthDate != null &&
                  encodedOn != null
                ) {
                  setPrintData(true);
                }
                setLoadingBooking(true);
              })
              .catch(function (error) {
                setLoadingBooking(true);
                console.log(error);
              });
          });
        });
      } else {
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
          .then(function (category) {
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
            setPrintServices((oldArray) => [...oldArray, serviceDetails]);

            if (
              services.length - 1 == index1 &&
              bookingDate != null &&
              birthDate != null &&
              encodedOn != null
            ) {
              setPrintData(true);
              setLoadingBooking(true);
            }
          })
          .catch(function (error) {
            setLoadingBooking(true);
            console.log(error);
          });
      }
    });
  }, [services]);

  React.useEffect(() => {
    printServices.length = 0;
    labTests.length = 0;
    packages.length = 0;
    services.map((info, index1) => {
      if (info.type === "package") {
        let packageInfo = {};
        packageInfo.name = info.package;
        packageInfo.qty = "1";
        packageInfo.price = info.price;
        packageInfo.details = "";
        axios({
          method: "post",
          url: window.$link + "bookings/getBookingPackageDetails/" + info.id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        }).then(function (response) {
          response.data.map((packageCat, index2) => {
            if (index2 < response.data.length - 1) {
              packageInfo.details += packageCat.lab_test + ", ";
            } else {
              packageInfo.details += packageCat.lab_test;
            }

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
            })
              .then(function (category) {
                if (category.data.name == "Electrolytes (NaKCl,iCA)") {
                  serviceDetails.key = "Electrolytes";
                } else {
                  serviceDetails.key = category.data.name
                    .replace(/\s+/g, "_")
                    .toLowerCase();
                }
                serviceDetails.category = category.data.name;
                serviceDetails.name = packageCat.lab_test;
                setLoadingBooking(true);
              })
              .catch(function (error) {
                setLoadingBooking(true);
                console.log(error);
              });
          });
        });
        setPackages((prev) => [...prev, packageInfo]);
      } else {
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
          .then(function (category) {
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
            let labTest = { name: info.lab_test, qty: "1", price: info.price };
            setLabTests((prev) => [...prev, labTest]);
            setLoadingBooking(true);
          })
          .catch(function (error) {
            setLoadingBooking(true);
            console.log(error);
          });
      }
    });
  }, [services]);

  function removeService() {
    axios({
      method: "post",
      url: window.$link + "Bookingdetails/delete/" + serviceId,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        updated_by: userId,
        booking: id,
      },
    })
      .then(function (booking) {
        setServices(services);
        setTotal(total);
        handleRemoveClose();
      })
      .catch(function (error) {
        console.log(error);
        handleRemoveClose();
      });

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
      .then(function (booking) {
        setServices(booking.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //GET OPTION DETAILS
  const [labOptions, setLabOptions] = useState([]);
  const [packageOptions, setPackageOptions] = useState([]);
  React.useEffect(() => {
    labOptions.length = 0;
    axios({
      method: "post",
      url: window.$link + "/lab_tests/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        response.data.lab_tests
          .filter((info) => info.is_deleted === "0")
          .map((data) => {
            var info = {};

            info.labTestId = data.id;
            info.price = data.price;
            info.name = data.name;
            info.type = "lab";

            setLabOptions((oldArray) => [...oldArray, info]);
          });
      })
      .then(function (error) {
        console.log(error);
      });

    axios({
      method: "post",
      url: window.$link + "/packages/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        response.data.packages.map((data) => {
          var info = {};
          info.labTestId = data.id;
          info.price = data.price;
          info.name = data.name;
          info.type = "package";

          setPackageOptions((oldArray) => [...oldArray, info]);
        });
      })
      .then(function (error) {
        console.log(error);
      });
  }, []);
  function showAvailableLab() {
    // const labServices = getAllLabServices();
    const orderedServices = labOptions.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return (
      <div>
        <label for="input-label">TEST:</label>
        <select
          className="input-select"
          id="test"
          name="test"
          onChange={(e) => setTest(e.target.value)}
        >
          <option value="" selected disabled hidden>
            CHOOSE CLINICAL SERVICE
          </option>
          {orderedServices.map((option, index) => (
            <option
              value={option.labTestId + "_" + option.price + "_" + option.type}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function showAvailablePackages() {
    // const packages = getAllPackages();
    const orderedServices = packageOptions.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return (
      <div>
        <label for="input-label">TEST:</label>
        <select
          className="input-select"
          id="test"
          name="test"
          onChange={(e) => setTest(e.target.value)}
        >
          <option value="" selected disabled hidden>
            CHOOSE PACKAGE
          </option>
          {orderedServices.map((option, index) => (
            <option
              value={option.labTestId + "_" + option.price + "_" + option.type}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function addService() {
    const key = test.split("_");
    const testId = key[0];
    const price = key[1];
    const type = key[2];

    var extractedDates = [];
    var testStarts = [];
    var testFinishes = [];
    var resultDates = [];
    var fileResults = [];

    if (type == "lab") {
      axios({
        method: "post",
        url: window.$link + "Bookingdetails/add/" + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          type: type,
          lab_tests: [testId],
          lab_prices: [price],
          status: "PENDING",
          lab_extracted_dates: [],
          lab_test_starts: [],
          lab_test_finishes: [],
          lab_result_dates: [],
          lab_file_results: [],
          added_by: userId,
        },
      })
        .then(function (booking) {})
        .catch(function (error) {
          console.log(error);
        });
    } else if (type == "package") {
      axios({
        method: "post",
        url: window.$link + "Bookingdetails/add/" + id,
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          type: type,
          package_tests: [testId],
          package_prices: [price],
          status: "PENDING",
          package_extracted_dates: [],
          package_test_starts: [],
          package_test_finishes: [],
          package_result_dates: [],
          package_file_results: [],
          added_by: userId,
        },
      })
        .then(function (booking) {
          // console.log(booking);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function submit(e) {
    e.preventDefault();
    if (click === false) {
      setClick(true);
      if (payment === "cash") {
        axios({
          method: "post",
          url: window.$link + "payments/create",
          withCredentials: false,
          params: {
            token: userToken,
            api_key: window.$api_key,
            booking: id,
            type: payment,
            amount: pay,
            senior_pwd_id: seniorPwdId,
            discount: discount,
            grand_total: grandTotal,
            remarks: remarks,
            added_by: userId,
            withholdingtax: cashTax,
          },
        })
          .then(function (response) {
            var date = new Date();
            // console.log(response)
            toast.success("Payment Successful!");
            refreshPage();
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
          });
      }
      if (payment === "check") {
        axios({
          method: "post",
          url: window.$link + "payments/create",
          withCredentials: false,
          params: {
            token: userToken,
            api_key: window.$api_key,
            booking: id,
            type: payment,
            amount: pay >= grandTotal ? grandTotal : pay,
            check_no: checkNo,
            check_bank: checkBank,
            check_date: checkDate,
            senior_pwd_id: seniorPwdId,
            discount: discount,
            grand_total: grandTotal,
            remarks: remarks,
            added_by: userId,
            withholdingtax: checkTax,
          },
        })
          .then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            refreshPage();
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
          });
      }
      if (payment === "card") {
        axios({
          method: "post",
          url: window.$link + "payments/create",
          withCredentials: false,
          params: {
            token: userToken,
            api_key: window.$api_key,
            booking: id,
            type: payment,
            amount: pay >= grandTotal ? grandTotal : pay,
            cardName: cardName,
            card_no: cardNo,
            card_type: cardType,
            card_expiry: cardExpiry,
            card_bank: cardBank,
            senior_pwd_id: seniorPwdId,
            discount: discount,
            grand_total: grandTotal,
            remarks: remarks,
            added_by: userId,
            withholdingtax: cardTax,
          },
        })
          .then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            refreshPage();
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
          });
      }
      if (payment === "others") {
        axios({
          method: "post",
          url: window.$link + "payments/create",
          withCredentials: false,
          params: {
            token: userToken,
            api_key: window.$api_key,
            booking: id,
            type: payment,
            amount: grandTotal,
            other_source: source,
            other_reference_no: reference,
            senior_pwd_id: seniorPwdId,
            discount: discount,
            grand_total: grandTotal,
            remarks: remarks,
            added_by: userId,
            withholdingtax: othersTax,
          },
        })
          .then(function (response) {
            // console.log(response);
            toast.success("Payment Successful!");
            refreshPage();
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Payment Unsuccessful!");
          });
      }
    }
  }

  function printButton() {
    return (
      <button className="save-btn" onClick={handlePrint}>
        <FontAwesomeIcon
          icon={"print"}
          alt={"print"}
          aria-hidden="true"
          className="print-icon"
        />
        PRINT
      </button>
    );
  }

  function cashForm() {
    return (
      <div className="pay-cash-cont mb-5 mt-4">
        <Row className="input-group">
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Amount
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="payAmount"
              name="payAmount"
              step="0.01"
              value={pay}
              className="form-control"
              placeholder="P"
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue !== null) {
                  setPay(inputValue);
                }
              }}
            />
          </Col>
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Change
            </label>
          </Col>
          <Col xs={2} className="input-group-sm">
            <input
              type="number"
              id="changeAmount"
              name="changeAmount"
              className="form-control"
              value={(pay - (grandTotal - paidAmount)).toFixed(2)}
              placeholder="P"
            />
          </Col>
          <Col xs={2}>
            <label for="inputPassword6" className="col-form-label">
              Withholding Tax
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="payAmount"
              name="payAmount"
              step="0.01"
              className="form-control"
              placeholder="P"
              onChange={(e) => {
                setCashTax(e.target.value);
              }}
            />
          </Col>

          <Col xs={1}>
            {" "}
            <label for="inputPassword6" className="col-form-label">
              Remarks
            </label>
          </Col>
          <Col xs={11} className="input-group-sm">
            <textarea
              id="remarks"
              name="remarks"
              className="full-input"
              style={{ width: "92%" }}
              cols="100"
              rows="3"
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </Col>
        </Row>
        <div className="row d-flex justify-content-end mt-4">
          {paymentStatus == "paid" &&
            queueNumber != "" &&
            printData == true &&
            printButton()}
          <button className="save-btn" onClick={(e) => submit(e)}>
            SAVE BOOKING
          </button>
        </div>
      </div>
    );
  }

  function checkForm() {
    return (
      <div className="pay-cash-cont mb-5 mt-4">
        <Row className="input-group">
          <Col xs={12}>
            <label for="inputPassword6" className="col-form-label">
              Check Details
            </label>
          </Col>
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Bank
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="text"
              id="check"
              name="check_bank"
              className="form-control"
              onChange={(e) => setCheckBank(e.target.value)}
            />
          </Col>
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Number
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="text"
              id="check"
              name="check_no"
              className="form-control"
              onChange={(e) => setCheckNo(e.target.value)}
            />
          </Col>
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Date
            </label>
          </Col>
          <Col xs={3} className="input-group-sm mb-4">
            <input
              type="date"
              id="check"
              name="check_date"
              className="form-control"
              onChange={(e) => setCheckDate(e.target.value)}
            />
          </Col>
          <Col xs={12}>
            <hr style={{ width: "92%" }} />
          </Col>
          <Col xs={1}>
            <label for="inputPassword6" className="col-form-label">
              Amount
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="payAmount"
              name="payAmount"
              step="0.01"
              value={pay}
              className="form-control"
              placeholder="P"
              onChange={(e) => setPay(e.target.value)}
            />
          </Col>
          <Col xs={1}></Col>
          <Col xs={2} className="input-group-sm"></Col>
          <Col xs={2}>
            <label for="inputPassword6" className="col-form-label">
              Withholding Tax
            </label>
          </Col>
          <Col xs={3} className="input-group-sm">
            <input
              type="number"
              id="payAmount"
              name="payAmount"
              step="0.01"
              className="form-control"
              placeholder="P"
              onChange={(e) => {
                setCheckTax(e.target.value);
              }}
            />
          </Col>

          <Col xs={1}>
            {" "}
            <label for="inputPassword6" className="col-form-label">
              Remarks
            </label>
          </Col>
          <Col xs={11} className="input-group-sm">
            <textarea
              className="full-input"
              style={{ width: "92%" }}
              id="remarks"
              name="remarks"
              rows="3"
              cols="100"
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </Col>
        </Row>
        <div className="row d-flex justify-content-end mt-4">
          {paymentStatus == "paid" &&
            queueNumber != "" &&
            printData == true &&
            printButton()}
          <button className="save-btn" onClick={(e) => submit(e)}>
            SAVE BOOKING
          </button>
        </div>
      </div>
    );
  }

  function cardForm() {
    return (
      <>
        <div className="pay-cash-cont mb-5 mt-4">
          <Row className="input-group">
            <Col xs={12}>
              <label for="inputPassword6" className="col-form-label">
                Card Details
              </label>
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Bank
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="card"
                name="card_bank"
                className="form-control"
                onChange={(e) => setCardBank(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={3} className="input-group-sm"></Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Type
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="card"
                name="card_type"
                className="form-control"
                onChange={(e) => setCardType(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Name
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="card"
                name="card_name"
                className="form-control"
                onChange={(e) => setCardName(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Number
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="card"
                name="card_no"
                className="form-control"
                onChange={(e) => setCardNo(e.target.value)}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Expiry
              </label>
            </Col>
            <Col xs={3} className="input-group-sm mb-4">
              <input
                type="date"
                id="card"
                name="card_expiry"
                className="form-control"
                onChange={(e) => setCardExpiry(e.target.value)}
              />
            </Col>
            <Col xs={12}>
              <hr style={{ width: "92%" }} />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Amount
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                value={pay}
                className="form-control"
                placeholder="P"
                onChange={(e) => setPay(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Withholding Tax
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                className="form-control"
                placeholder="P"
                onChange={(e) => {
                  setCardTax(e.target.value);
                }}
              />
            </Col>

            <Col xs={1}>
              {" "}
              <label for="inputPassword6" className="col-form-label">
                Remarks
              </label>
            </Col>
            <Col xs={11} className="input-group-sm">
              <textarea
                style={{ width: "92%" }}
                id="remarks"
                name="remarks"
                rows="3"
                className="full-input"
                cols="100"
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <div className="row d-flex justify-content-end mt-4">
            {paymentStatus == "paid" &&
              queueNumber != "" &&
              printData == true &&
              printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>
              SAVE BOOKING
            </button>
          </div>
        </div>
      </>
    );
  }

  function othersForm() {
    return (
      <>
        <div className="pay-cash-cont mb-5 mt-4">
          <Row className="input-group">
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Amount
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                value={pay}
                className="form-control"
                placeholder="P"
                onChange={(e) => setPay(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Withholding Tax
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="number"
                id="payAmount"
                name="payAmount"
                step="0.01"
                className="form-control"
                placeholder="P"
                onChange={(e) => {
                  setOthersTax(e.target.value);
                }}
              />
            </Col>
            <Col xs={1}>
              <label for="inputPassword6" className="col-form-label">
                Source
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="payAmount"
                name="source"
                className="form-control"
                onChange={(e) => setSource(e.target.value)}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="input-group-sm"></Col>
            <Col xs={2}>
              <label for="inputPassword6" className="col-form-label">
                Reference Number
              </label>
            </Col>
            <Col xs={3} className="input-group-sm">
              <input
                type="text"
                id="changeAmount"
                name="reference_number"
                className="form-control"
                onChange={(e) => setReference(e.target.value)}
              />
            </Col>

            <Col xs={1}>
              {" "}
              <label for="inputPassword6" className="col-form-label">
                Remarks
              </label>
            </Col>
            <Col xs={11} className="input-group-sm">
              <textarea
                className="full-input"
                style={{ width: "92%" }}
                id="remarks"
                name="remarks"
                rows="3"
                cols="100"
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <div className="row d-flex justify-content-end mt-4">
            {paymentStatus == "paid" &&
              queueNumber != "" &&
              printData == true &&
              printButton()}
            <button className="save-btn" onClick={(e) => submit(e)}>
              SAVE BOOKING
            </button>
          </div>
        </div>
      </>
    );
  }

  if (redirect == true) {
    return <Navigate to="/cashier" />;
  }

  return (
    <div>
      <Navbar />

      {loadingBooking && loadingCust ? (
        <div className="active-cont">
          <Header type="thin" title="ADD PAYMENT" />

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
              <div className="col-sm-4">
                <span className="address label">ADDRESS</span>
                <span className="address detail">{address.toUpperCase()}</span>
              </div>
              <div className="col-sm-4">
                <span className="address label">Senior ID</span>
                <span className="address detail">
                  {senior_id !== null ? senior_id.toUpperCase() : "N/A"}
                </span>
              </div>
              <div className="col-sm-4">
                <span className="address label">PWD ID</span>
                <span className="address detail">
                  {pwd_id !== null ? pwd_id.toUpperCase() : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <Costing
            data={services}
            deleteService={handleRemove}
            withDiscount={seniorPwdId}
            total={total}
            setTotal={setTotal}
            grandTotal={grandTotal}
            serviceFee={serviceFee}
            mdCharge={mdCharge}
            setGrandTotal={setGrandTotal}
            setDiscount={setDiscount}
            discount={discount}
            paidAmount={paidAmount}
            toPay={paymentStatus == "paid" ? false : true}
          />

          {paymentStatus != "paid" && (
            <div className="row">
              <div className="col-sm-9 d-flex justify-content-end">
                <button className="add-tests-btn" onClick={handleShow}>
                  ADD TESTS
                </button>
              </div>
            </div>
          )}

          {((paymentStatus == "paid" &&
            queueNumber != "" &&
            printData == true) ||
            discountDetail === "with_company_discount") && (
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-end">
                {printButton()}
              </div>
            </div>
          )}

          {paymentStatus != "paid" && printData == false && (
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-end">
                <button className="save-btn">Loading Data...</button>
              </div>
            </div>
          )}

          {paymentStatus != "paid" && (
            <div className="payment-cont">
              <h1 className="payment-label">ADD PAYMENT</h1>

              <div className="row">
                <div className="col-sm-3">
                  <span className="discount-header method-label">DISCOUNT</span>
                </div>

                <div className="col-sm-9">
                  <span className="amount">
                    {"P " +
                      parseFloat(discount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) +
                      ""}
                  </span>
                </div>
              </div>
              <br />

              <span className="method-label">METHOD</span>
              <input
                type="radio"
                id="cash"
                name="payment_method"
                value="cash"
                onClick={() => setPayment("cash")}
              />
              <span className="cash method">CASH</span>
              <input
                type="radio"
                id="check"
                name="payment_method"
                value="check"
                onClick={() => setPayment("check")}
              />
              <span className="check method">CHECK</span>
              <input
                type="radio"
                id="card"
                name="payment_method"
                value="card"
                onClick={() => setPayment("card")}
              />
              <span className="check method">CARD</span>
              <input
                type="radio"
                id="others"
                name="payment_method"
                value="others"
                onClick={() => setPayment("others")}
              />
              <span className="check method">OTHERS</span>

              {/* <form> */}
              <p>{payment === "cash" && cashForm()}</p>
              <p>{payment === "check" && checkForm()}</p>
              <p>{payment === "card" && cardForm()}</p>
              <p>{payment === "others" && othersForm()}</p>
              {/* </form> */}
              <ToastContainer hideProgressBar={true} />

              <Modal show={showRemove} onHide={handleRemoveClose}>
                <Modal.Header closeButton>
                  <Modal.Title>SUBMIT</Modal.Title>
                </Modal.Header>
                <form>
                  <Modal.Body>
                    Are you sure you want to remove service?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleRemoveClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={removeService}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>

              <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                  <Modal.Title className="w-100 add-test-header">
                    ADD TESTS
                  </Modal.Title>
                </Modal.Header>
                <form>
                  <Modal.Body>
                    <label for="input-label">SERVICE:</label>

                    <select
                      className="input-select"
                      id="service"
                      name="service"
                      onChange={(e) => setAddTestType(e.target.value)}
                    >
                      <option value="" selected disabled hidden>
                        CHOOSE TYPE
                      </option>
                      <option value="CLINICAL SERVICES">
                        CLINICAL SERVICES
                      </option>
                      <option value="PACKAGES">PACKAGES</option>
                    </select>

                    <br />

                    <p>
                      {addTestType === "CLINICAL SERVICES" &&
                        showAvailableLab()}
                    </p>
                    <p>
                      {addTestType === "PACKAGES" && showAvailablePackages()}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      type="submit"
                      className="add-tests-btn"
                      onClick={() => addService()}
                    >
                      Submit
                    </button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          )}

          <div
            style={{ display: "none" }} // This make ComponentToPrint show   only while printing
          >
            <PaymentToPrint
              ref={componentRef}
              patientId={patientId}
              bookingId={id}
              name={lastName + ", " + firstName + " " + middleName}
              birthdate={birthDate}
              gender={gender}
              age={age}
              contact={contactNo}
              email={email}
              address={address}
              bookingDate={bookingDate}
              payment={paymentType}
              result={result}
              services={printServices}
              isCompany={true}
              packages={packages}
              labTests={labTests}
              discount={discount}
              grandTotal={grandTotal}
              queue={queueNumber}
              encodedOn={encodedOn}
              referral={referral}
              discountCode={discountCode}
              setPrintReadyFinal={setPrintReadyFinal}
            />
          </div>
        </div>
      ) : (
        <div className="active-cont">
          <div className="row justify-content-center mt-5 pt-5">
            <div
              className="col-12 mt-5 pt-5 align-center"
              style={{ textAlign: "-webkit-center" }}
            >
              <RingLoader color={"#3a023a"} showLoading={true} size={200} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPayment;
