import React from 'react';
import { useForm, useStep } from "react-hooks-helper";
import Form1 from './Form1'
import Form2 from './Form2';

const defaultData = {
    fname: "",
    lname: "", 
    mname: "", 
    sex: "", 
    birthDate: "", 
    email: "", 
    contactNum: "", 
    address: "", 
    serviceLocation: "", 
    result: "", 
    dateOfTesting: "",
    clinicalServices: "",
}

const steps = [
    {id: "customer"},
    {id: "services"},
]

function SwitchForm() {

    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });
    console.log(step)

    const props = { formData, setForm, navigation };

    switch (step.id) {
        case "customer":
            return <Form1 { ...props }/>    
        case "services":
            return <Form2 { ...props }/>
    }


    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default SwitchForm
