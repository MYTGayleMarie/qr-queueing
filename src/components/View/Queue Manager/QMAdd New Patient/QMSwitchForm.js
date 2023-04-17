import React, { useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import Form1 from './Form1'
import Form2 from "./Form2";
import Form3 from './Form3';


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
    mdCharge: "",
    homeServiceFee:"",
    result: "", 
    dateOfTesting: "",
    lastmeal: "",
}

const serviceData = {}
const mdData = {}

const steps = [
    {id: "customer"},
    {id: "packages"},
    {id: "services"},
]

function SwitchForm() {

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
    console.log(serviceProps)
    switch (step.id) {
        case "customer":
            return <Form1 { ...personalProps }/>   
        case "packages":
            return <Form2 { ...serviceProps}/> 
        case "services":
            return <Form3 { ...serviceProps }/>
    }


    return (
        <div>
        </div>
    )
}

export default SwitchForm
