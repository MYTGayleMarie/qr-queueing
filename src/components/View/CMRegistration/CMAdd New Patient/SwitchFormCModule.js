import React, { useEffect, useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import Form1CModule from "./Form1CModule";
import Form2CModule from "./Form2CModule";
import Form3CModule from "./Form3CModule";

const personalData = {
  fname: "",
  lname: "",
  mname: "",
  sex: "female",
  birthDate: "",
  email: "",
  contactNum: "",
  address: "",
  referral: "",
  discountId: "",
  discountDetail: "",
  serviceLocation: "clinic",
  mdCharge: "",
  homeServiceFee: "",
  result: "",
  dateOfTesting: "",
  lastmeal: "",
  seniorId: "",
  pwdId: "",
  service_location: "",
};

const serviceData = {};
const mdData = {};

const steps = [
  { id: "customer" },
  // {id: "packages"},
  // {id: "services"},
];

function SwitchFormCModule() {
  const [customer, setPersonal] = useForm(personalData);
  const [lastMeal, setLastMeal] = useState(new Date());
  const [isCompany, setIsCompany] = useState(false);
  const [dateOfTesting, setDOT] = useState(new Date());

  const [packagePrice, setPackagePrice] = useState("");
  const [labPrice, setLabPrice] = useState("");

  const [discount, setDiscount] = useState("");

  const [isService, setIsService] = useState(false);
  const [isPackage, setIsPackage] = useState(false);
  const [mdCharge, setMdCharge] = useForm(mdData);
  const [serviceFee, setServiceFee] = useState(0);
  const [location, setLocation] = useState("");
  const [discountDetails, setDiscountDetails] = useState();

  const [service, setServices] = useForm(serviceData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const personalProps = {
    customer,
    setPersonal,
    discount,
    setIsService,
    setIsPackage,
    setDiscount,
    setIsCompany,
    lastMeal,
    setLastMeal,
    navigation,
    mdCharge,
    setMdCharge,
    serviceFee,
    setServiceFee,
    location,
    setLocation,
    dateOfTesting,
    setDOT,
    discountDetails,
    setDiscountDetails,
  };
  const serviceProps = {
    service,
    packagePrice,
    labPrice,
    setPackagePrice,
    setLabPrice,
    isService,
    isPackage,
    customer,
    isCompany,
    discount,
    setDiscount,
    setServices,
    lastMeal,
    navigation,
    mdCharge,
    serviceFee,
    location,
    dateOfTesting,
    discountDetails,
  };

  switch (step.id) {
    case "customer":
      return <Form1CModule {...personalProps} />;
    // case "packages":
    //      return <Form2CModule { ...serviceProps}/>
    // case "services":
    //      return <Form3CModule { ...serviceProps }/>
    default:
  }
}

export default SwitchFormCModule;
