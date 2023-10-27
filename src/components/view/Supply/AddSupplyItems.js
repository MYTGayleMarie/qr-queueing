import React, { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { getToken, getUser, removeUserSession } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//css
import "./AddSupplyItems.css"

//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"

//variables
const userToken = getToken()
const userId = getUser()

function AddSupplyItems() {
  //style
  document.body.style = "background: white;"

  //states
  const itemInfo = {
    item_name: "",
    item_lab_test_qty: "",
    item_cost: "",
    item_unit: "",
    item_balance: "",
    remarks: "",
    description: "",
  }

  const [item, setItem] = useForm(itemInfo)
  const [conversionDetails, setConversionDetails] = useState({
    with_conversion: false,
    conversion: 0,
  })
  //redirection
  const [redirect, setRedirect] = useState(false)
  console.log(item)
  //API submit call
  function submit(e, info) {
    e.preventDefault()

    axios({
      method: "post",
      url: window.$link + "items/create",
      withCredentials: false,
      params: {
        token: userToken.replace(/['"]+/g, ""),
        api_key: window.$api_key,
        name: info.item_name,
        description: info.description,
        unit: info.item_unit,
        cost: info.item_cost,
        beg_balance: info.item_balance,
        remarks: info.remarks,
        added_by: userId,
        with_conversion: conversionDetails.with_conversion ? "1" : "0",
        conversion: conversionDetails.conversion,
      },
    })
      .then(function (response) {
        console.log(response)
        toast.success("Succussfully added item!")
        setTimeout(function () {
          setRedirect(true)
        }, 2000)
      })
      .catch(function (error) {
        console.log(error)

        toast.error(error.response?.data.message[0].description)
      })
  }

  //redirect
  if (redirect == true) {
    return <Navigate to="/items" />
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Header type="thin" title="ITEMS" />
        <ToastContainer />
        <div className="p-2">
          <h4 className="po-header">ITEMS DETAILS</h4>
          <form>
            <div className="item-details-cont">
              <div className="row mb-3">
                <div
                  className={
                    conversionDetails.with_conversion
                      ? "col-sm-3 pt-2"
                      : "col-sm-12 pt-2"
                  }
                >
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={conversionDetails.with_conversion}
                      onChange={(e) =>
                        setConversionDetails({
                          ...conversionDetails,
                          with_conversion: e.target.checked,
                        })
                      }
                      id="defaultCheck1"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      WITH CONVERSION
                    </label>
                  </div>
                </div>
                {conversionDetails.with_conversion && (
                  <>
                    <div className="col-sm-2 pt-2">
                      <span className="item-name-label">CONVERSION</span>
                    </div>
                    <div className="col-sm-7">
                      <input
                        type="number"
                        name="conversion"
                        className="full-input"
                        onChange={(e) =>
                          setConversionDetails({
                            ...conversionDetails,
                            conversion: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-3">
                <div className="col-sm-2 pt-2">
                  <span className="item-name-label">ITEM NAME</span>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="item_name"
                    className="full-input"
                    onChange={setItem}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-1 pt-2">
                  <span className="item-name-label">UNIT</span>
                </div>
                <div className="col-sm-2">
                  <input
                    type="text"
                    name="item_unit"
                    className="full-input"
                    onChange={setItem}
                  />
                </div>
                {/* <div className="col-sm-2">
                            <span className="item-name-label">LAB TEST QTY</span>
                        </div> */}
                {/* <div className="col-sm-1">
                <input
                  type="number"
                  name="item_lab_test_qty"
                  className="beginning-balance-input"
                  onChange={setItem}
                />
              </div>{" "} */}
                <div className="col-sm-1 pt-2">
                  <span className="item-name-label">COST</span>
                </div>
                <div className="col-sm-2">
                  <input
                    type="number"
                    name="item_cost"
                    className="full-input"
                    onChange={setItem}
                  />
                </div>
                <div className="col-sm-3 pt-2">
                  <span className="beginning-balance-label">
                    BEGINNING BALANCE{" "}
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    type="number"
                    name="item_balance"
                    className="full-input"
                    onChange={setItem}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <span className="remarks-label">REMARKS</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <textarea
                    id="remarks"
                    name="remarks"
                    class="full-input"
                    rows="5"
                    cols="50"
                    style={{ width: "100%" }}
                    onChange={setItem}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <span className="description-label">ITEM DESCRIPTION</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <textarea
                    id="description"
                    name="description"
                    class="full-input"
                    rows="5"
                    cols="50"
                    onChange={setItem}
                  />
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-sm-12 text-right">
                  <button class="add-item-btn" onClick={(e) => submit(e, item)}>
                    <strong>Add Items</strong>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSupplyItems
