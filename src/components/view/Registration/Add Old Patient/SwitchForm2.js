import React, { useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import OldPatientForm1 from "./OldPatientForm1";
import OldPatientForm2 from "./OldPatientForm2";
import OldPatientForm3 from "./OldPatientForm3";

const userToken = getToken();
const userId = getUser();

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
  serviceLocation: "",
  result: "",
  dateOfTesting: "",
  lastmeal: "",
};

const serviceData = {};
const mdData = {};

const steps = [{ id: "customer" }, { id: "packages" }, { id: "services" }];

function SwitchForm2() {
  const [customer, setPersonal] = useForm(personalData);
  const [lastMeal, setLastMeal] = useState(new Date());
  const [extractionDate, setExtractionDate] = useState(new Date());
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
    extractionDate,
    setExtractionDate,
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
    extractionDate,
    setExtractionDate,
  };

  switch (step.id) {
    case "customer":
      return <OldPatientForm1 {...personalProps} />;
    case "packages":
      return <OldPatientForm2 {...serviceProps} />;
    case "services":
      return <OldPatientForm3 {...serviceProps} />;
  }

  return <div></div>;
}

export default SwitchForm2;
