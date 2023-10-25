import React, { useState } from "react"
import { useForm, useStep } from "react-hooks-helper"
import EditBookingForm1 from "./EditBookingForm1"
import EditBookingForm2 from "./EditBookingForm2"
import EditBookingForm3 from "./EditBookingForm3"

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

const serviceData = {}
const mdData = {}

const steps = [{ id: "customer" }, { id: "packages" }, { id: "services" }]

function EditBookingSwitch() {
  const [pwdId, setPwdId] = useState("")
  const [seniorId, setSeniorId] = useState("")
  const [customer, setPersonal] = useForm(personalData)
  const [lastMeal, setLastMeal] = useState(new Date())
  const [isCompany, setIsCompany] = useState(false)
  const [dateOfTesting, setDOT] = useState(new Date())
  const [extractionDate, setExtractionDate] = useState(new Date())
  const [packagePrice, setPackagePrice] = useState("")
  const [labPrice, setLabPrice] = useState("")

  const [discount, setDiscount] = useState("")

  const [isService, setIsService] = useState(false)
  const [isPackage, setIsPackage] = useState(false)
  const [mdCharge, setMdCharge] = useForm(mdData)
  const [serviceFee, setServiceFee] = useState(0)
  const [location, setLocation] = useState("")
  const [serviceLocation, setServiceLocation] = useState("")
  const [result, setResult] = useState("")
  const [customerID, setCustomerID] = useState("")

  const [discountDetails, setDiscountDetails] = useState()
  const [isSenior, setIsSenior] = useState(false)
  const [isPWD, setIsPWD] = useState(false)
  const [service, setServices] = useForm(serviceData)
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })

  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [emailadd, setEmail] = useState("")
  const [homeaddress, setAddress] = useState("")

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
    result,
    setResult,
    customerID,
    setCustomerID,
    isSenior,
    setIsSenior,
    isPWD,
    setIsPWD,
    pwdId,
    setPwdId,
    seniorId,
    setSeniorId,
    extractionDate,
    setExtractionDate,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthday,
    setBirthDate,
    gender,
    setGender,
    age,
    setAge,
    contactNo,
    setContactNo,
    emailadd,
    setEmail,
    homeaddress,
    setAddress,
  }
  const serviceProps = {
    customer,
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
    result,
    setResult,
    customerID,
    setCustomerID,
    extractionDate,
    setExtractionDate,
    pwdId,
    setPwdId,
    seniorId,
    setSeniorId,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthday,
    setBirthDate,
    gender,
    setGender,
    age,
    setAge,
    contactNo,
    setContactNo,
    emailadd,
    setEmail,
    homeaddress,
    setAddress,
  }

  switch (step.id) {
    case "customer":
      return <EditBookingForm1 {...personalProps} />
    case "packages":
      return <EditBookingForm2 {...serviceProps} />
    case "services":
      return <EditBookingForm3 {...serviceProps} />
    default:
  }

  return <div></div>
}

export default EditBookingSwitch
