import React, { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hooks-helper"
import { getToken, getUser } from "../../../utilities/Common"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//css
import "./AddLabTest.css"

//components
import Navbar from "../../Navbar"
import Header from "../../Header.js"
import Table from "../../Table.js"
import { MultiSelect } from "react-multi-select-component"
import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider"

//constants
const userToken = getToken()
const userId = getUser()
const labTestData = {
  name: "",
  category_id: "",
  price: "",
  hmo_price: "",
  remarks: "",
}

export default function AddLabTest() {
  document.body.style = "background: white;"

  //Form
  const [labTest, setLabTest] = useForm(labTestData)
  const [selectedCategory, setSelectedCategory] = useState([])

  //Options
  const [categoryOptions, setCategoryOptions] = useState([])

  //Redirect
  const [isClicked, setIsClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  //options for the category
  React.useEffect(() => {
    categoryOptions.length = 0
    axios({
      method: "post",
      url: window.$link + "categories/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((response) => {
        console.log(response)
        const resCategories = response.data.categories.filter(
          (test) => test.is_deleted != 1
        )
        console.log(resCategories)
        resCategories.map((data, index) => {
          var info = {}
          info.id = data.id
          info.name = data.name.toLowerCase()

          setCategoryOptions((oldArray) => [...oldArray, info])
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function submitBtn() {
    if (
      labTest.name !== "" &&
      labTest.category_id !== "" &&
      labTest.price !== "" &&
      labTest.hmo_price !== ""
    ) {
      return (
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <button className="save-btn" onClick={(e) => submit(e, labTest)}>
              SAVE
            </button>
          </div>
        </div>
      )
    }
  }

  //Sort categories by alphabetical
  useEffect(() => {
    categoryOptions.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    )
  }, [categoryOptions])

  //function to check if required fields are supplied
  useEffect(() => {
    submitBtn()
  }, [labTest])

  //function for create lab test
  function submit(e, labTest) {
    e.preventDefault()

    // // if(isClicked==false){
    if (
      labTest.category_id != "" &&
      labTest.name != "" &&
      labTest.price != ""
    ) {
      axios({
        method: "post",
        url: window.$link + "lab_tests/create",
        withCredentials: false,
        params: {
          token: userToken.replace(/['"]+/g, ""),
          api_key: window.$api_key,
          name: labTest.name,
          category: parseInt(labTest.category_id),
          price: labTest.price,
          hmo_price: labTest.hmo_price,
          remarks: labTest.remarks,
          added_by: userId,
        },
      })
        .then((response) => {
          console.log(response)
          toast.success("Successfully added lab test")
          setRedirect(true)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      toast.warning("Please fill up all required inputs!")
    }
    // }
  }

  //page will redirect to services after submitting api
  if (redirect == true) {
    return <Navigate to="/services" />
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thick" title="ADD LAB TEST" />
        <ToastContainer />
        <h3 className="form-categories-header italic">LAB TEST DETAILS</h3>
        <div className="form-wrapper">
          <form>
            <div className="row">
              <div className="col-sm-12">
                <label for="category_id" className="form-label">
                  CATEGORY <i> (required)</i>
                </label>
                <br />

                <select
                  className="form-select"
                  id="category_id"
                  name="category_id"
                  onChange={setLabTest}
                >
                  <option value="">CHOOSE CLINICAL SERVICE</option>
                  {categoryOptions.map((option, index) => (
                    <option className="category" value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label for="name" className="form-label">
                  NAME <i> (required)</i>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="name"
                  name="name"
                  onChange={setLabTest}
                  required
                />
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label for="price" className="form-label">
                  PRICE <i> (required)</i>
                </label>
                <input
                  type="number"
                  className="form-control w-100"
                  id="price"
                  name="price"
                  onChange={setLabTest}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label for="hmo_price" className="form-label">
                  HMO PRICE <i> (required)</i>
                </label>
                <input
                  type="number"
                  className="form-control w-100"
                  id="hmo_price"
                  name="hmo_price"
                  onChange={setLabTest}
                  required
                />
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label for="remarks" className="form-label">
                  LAB TEST DESCRIPTION
                </label>
                <br />
                <textarea
                  id="remarks"
                  className="form-control w-100"
                  name="remarks"
                  rows="4"
                  cols="50"
                  onChange={setLabTest}
                />
              </div>
            </div>
            {submitBtn()}
          </form>
        </div>
      </div>
    </div>
  )
}
