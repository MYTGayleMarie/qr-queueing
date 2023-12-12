import React, { useState } from "react"
import { useForm, useStep } from "react-hooks-helper"
import { useParams } from "react-router-dom"
import { getToken, getUser, refreshPage } from "../../../../utilities/Common"
import OldPatientForm1 from "./OldPatientForm1"
import OldPatientForm2 from "./OldPatientForm2"
import OldPatientForm3 from "./OldPatientForm3"

const userToken = getToken()
const userId = getUser()

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
  seniorId: "",
  pwdId: "",
}

const serviceData = {}
const mdData = {}

const steps = [{ id: "customer" }, { id: "packages" }, { id: "services" }]

function SwitchForm2() {
  const [customer, setPersonal] = useForm(personalData)
  const [pwdId, setPwdId] = useState("")
  const [seniorId, setSeniorId] = useState("")
  const [lastMeal, setLastMeal] = useState(new Date())
  const [extractionDate, setExtractionDate] = useState(new Date())
  const [isCompany, setIsCompany] = useState(false)
  const [dateOfTesting, setDOT] = useState(new Date())

  const [packagePrice, setPackagePrice] = useState("")
  const [labPrice, setLabPrice] = useState("")

  const [discount, setDiscount] = useState("")

  const [isService, setIsService] = useState(false)
  const [isPackage, setIsPackage] = useState(false)
  const [mdCharge, setMdCharge] = useForm(mdData)
  const [serviceFee, setServiceFee] = useState(0)
  const [location, setLocation] = useState("")
  const [discountDetails, setDiscountDetails] = useState()

  const [service, setServices] = useForm(serviceData)
  const [isSenior, setIsSenior] = useState(false)
  const [isPWD, setIsPWD] = useState(false)
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })

  const [hmoDetails, setHmoDetails] = useState({
    is_hmo: "no",
    hmo_id: "",
    hmo_code: "",
    pricelist: "",
    discount_id: "",
    discount_amount: "",
    discount_type: "monetary",
  })
  const [hmoCompanies, setHmoCompanies] = useState([])
  const [hmoDiscounts, setHmoDiscounts] = useState([])

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
    isSenior,
    isPWD,
    setIsSenior,
    setIsPWD,
    pwdId,
    setPwdId,
    seniorId,
    setSeniorId,
    hmoDetails,
    setHmoDetails,
    hmoCompanies,
    setHmoCompanies,
    hmoDiscounts,
    setHmoDiscounts,
  }
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
    isSenior,
    isPWD,
    pwdId,
    setPwdId,
    seniorId,
    setSeniorId,
    hmoDetails,
    setHmoDetails,
    hmoDiscounts,
    setHmoDiscounts,
    hmoCompanies,
    setHmoCompanies,
  }

  switch (step.id) {
    case "customer":
      return <OldPatientForm1 {...personalProps} />
    case "packages":
      return <OldPatientForm2 {...serviceProps} />
    case "services":
      return <OldPatientForm3 {...serviceProps} />
  }

  return <div></div>
}

export default SwitchForm2
