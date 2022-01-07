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
    serviceLocation: "", 
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

function SwitchForm2() {

    const [customer, setPersonal] = useForm(personalData);
    const [lastMeal, setLastMeal] = useState(new Date());
    const [service, setServices] = useForm(serviceData);
    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });

    const personalProps = { customer, setPersonal, lastMeal, setLastMeal, navigation };
    const serviceProps = { service, customer, setServices, lastMeal, navigation };

    switch (step.id) {
        case "customer":
            return <OldPatientForm1 { ...personalProps }/>   
        case "packages":
            return <OldPatientForm2 { ...serviceProps}/> 
        case "services":
            return <OldPatientForm3 { ...serviceProps }/>
    }

    return (
        <div>
        </div>
    )
}

export default SwitchForm2
