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
    homeServiceFee:"",
    result: "", 
    dateOfTesting: "",
    lastmeal: "",
}

const serviceData = {}

const steps = [
    {id: "customer"},
    {id: "packages"},
    {id: "services"},
]

function SwitchForm() {

    const [customer, setPersonal] = useForm(personalData);
    const [lastMeal, setLastMeal] = useState(new Date());
    const [isCompany, setIsCompany] = useState(false);
    const [service, setServices] = useForm(serviceData);
    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });

    const personalProps = { customer, setPersonal, setIsCompany, lastMeal, setLastMeal, navigation };
    const serviceProps = { service, customer, isCompany, setServices, lastMeal, navigation };

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
