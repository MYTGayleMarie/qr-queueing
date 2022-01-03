import React from 'react';
import { useForm, useStep } from "react-hooks-helper";
import Form1 from './Form1'
import Form2 from './Form2';

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
}

const serviceData = {}

const steps = [
    {id: "customer"},
    {id: "services"},
]

function SwitchForm() {

    const [customer, setPersonal] = useForm(personalData);
    const [service, setServices] = useForm(serviceData);
    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });

    const personalProps = { customer, setPersonal, navigation };
    const serviceProps = { service, customer, setServices, navigation };

    switch (step.id) {
        case "customer":
            return <Form1 { ...personalProps }/>    
        case "services":
            return <Form2 { ...serviceProps }/>
    }


    return (
        <div>
        </div>
    )
}

export default SwitchForm
