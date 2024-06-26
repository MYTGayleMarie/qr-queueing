import React, { useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../../utilities/Common";
import OldPatientForm1CModule from "./OldPatientForm1CModule";
import OldPatientForm2CModule from "./OldPatientForm2CModule";
import OldPatientForm3CModule from "./OldPatientForm3CModule";

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
}

const serviceData = {};
const mdData = {};

const steps = [
    {id: "customer"},
    {id: "packages"},
    {id: "services"},
]

function SwitchForm2CModule() {

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

    const personalProps = { customer, setPersonal, discount, setIsService, setIsPackage, setDiscount, setIsCompany, lastMeal, setLastMeal, navigation, mdCharge, setMdCharge, serviceFee, setServiceFee, location, setLocation, dateOfTesting, setDOT, discountDetails, setDiscountDetails };
    const serviceProps = { service, packagePrice, labPrice, setPackagePrice, setLabPrice, isService, isPackage, customer, isCompany, discount, setDiscount, setServices, lastMeal, navigation, mdCharge, serviceFee, location, dateOfTesting, discountDetails };

    switch (step.id) {
        case "customer":
            return <OldPatientForm1CModule { ...personalProps }/>   
        case "packages":
            return <OldPatientForm2CModule { ...serviceProps}/> 
        case "services":
            return <OldPatientForm3CModule { ...serviceProps }/>
    }

    return (
        <div>
        </div>
    )
}

export default SwitchForm2CModule
