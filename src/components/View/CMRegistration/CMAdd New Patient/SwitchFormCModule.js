import React, { useEffect, useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import Form1CModule from './Form1CModule'
// import Form2CModule from "./Form2CModule";
// import Form3CModule from './Form3CModule';



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


    

    const personalProps = { customer, setPersonal, discount, setIsService, setIsPackage, setDiscount, setIsCompany, lastMeal, setLastMeal, navigation, mdCharge, setMdCharge, serviceFee, setServiceFee, location, setLocation, dateOfTesting, setDOT, discountDetails, setDiscountDetails };
    const serviceProps = { service, packagePrice, labPrice, setPackagePrice, setLabPrice, isService, isPackage, customer, isCompany, discount, setDiscount, setServices, lastMeal, navigation, mdCharge, serviceFee, location, dateOfTesting, discountDetails };
    
    console.log(serviceProps)
    switch (step.id) {
        case "customer":
            return <Form1CModule { ...personalProps }/>   
        // case "packages":
        //     return <Form2CModule { ...serviceProps}/> 
        // case "services":
        //     return <Form3CModule { ...serviceProps }/>
        }

    return (
        <div>
            <div className="row" style={{marginTop:"6%", fontFamily:"Montserrat-Bold"}} >
          <center>
          <img src="/logo.png" style={{width:"160px", height:"80px", marginBottom:"3%",}}></img>
          <h1>Customer Module</h1>
          </center>
            <div className="row" style={{marginTop:"3%"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 d-flex justify-content-center">
                    <center>
             <button type="button" disabled 
              style={{padding:"10px", margin:"5px", width:"150%", height:"250%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                    fontFamily: "Montserrat-Bold", fontSize:"25px",}}>
                        Customer Created</button>
                        </center>
                <div className="col-sm-4"></div>
              </div>
            </div>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                <a href='/RegistrationCModule'>
            <button variant="default" 
            style={{padding:"7px", margin:"5px", width:"25%", height:"75%", borderRadius:"8px", border:"1px", color:"#419ea3", 
                  fontFamily: "Montserrat-Bold", fontSize:"15px",}}>
            Done</button></a>
                </div>
            </div>

        </div>
    )
    
    }





export default SwitchFormCModule
