import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import { Navigate } from "react-router"
import { refreshPage, getRoleId, getUser } from "../../../utilities/Common"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//css
import "./Login.css"

//images
import clinic from "../../../images/clinic.png"
import logo from "../../../images/logo.png"
import axios from "axios"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [click, setClick] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  let NavigationRedirection

  function submit(e) {
    e.preventDefault()
    if (click == false) {
      axios({
        method: "post",
        url: window.$link + "login",
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          email: data.email,
          password: data.password,
        },
      })
        .then(function (response) {
          localStorage.setItem("token", JSON.stringify(response.data.token))
          localStorage.setItem("user", JSON.stringify(response.data.id))
          localStorage.setItem("role_id", JSON.stringify(response.data.role_id))
          localStorage.setItem(
            "token_expiry",
            JSON.stringify(response.data.token_expiry)
          )
          refreshPage()
        })
        .catch(function (error) {
      
          toast.error("Invalid Login")
          setTimeout(() => {
            refreshPage()
          }, 2000)
        })
    }

    setClick(true)
  }

  function handle(e) {
    const newData = { ...data }
    setData(newData)
    newData[e.target.id] = e.target.value
  }

  if (window.$userToken != null) {
    var roleId = window.$roleId.replace(/^"(.*)"$/, "$1")
    if (getUser() === "57" || getUser() === "1") {
      NavigationRedirection = <Navigate to="/extraction" />
    } else if (getUser() === "55") {
      NavigationRedirection = <Navigate to="/xray" />
    } else if (getUser() === "56") {
      NavigationRedirection = <Navigate to="/ecg" />
    } else {
      if (roleId === "3") {
        NavigationRedirection = <Navigate to="/cashier" />
      } else if (roleId === "5") {
        NavigationRedirection = <Navigate to="/medtech" />
      } else if (roleId === "6") {
        NavigationRedirection = <Navigate to="/purchase-order" />
      } else if (roleId === "7") {
        NavigationRedirection = <Navigate to="/items" />
      } else if (roleId === "8") {
        NavigationRedirection = <Navigate to="/companies" />
      } else if (roleId === "9") {
        NavigationRedirection = <Navigate to="/registrationcmodule" />
      } else if (roleId === "10") {
        NavigationRedirection = <Navigate to="/lab" />
      } else if (roleId === "11") {
        NavigationRedirection = <Navigate to="/purchase-order" />
      } else if (roleId === "13") {
        NavigationRedirection = <Navigate to="/reports-inventory" />
      } else {
        NavigationRedirection = <Navigate to="/registration" />
      }
    }

    return NavigationRedirection
  }

  document.body.style = "background: white;"

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg d-flex justify-content-center">
            <img src={clinic} alt={"clinic"} className="login-clinic"></img>
          </div>
          <div className="col-lg d-flex justify-content-center">
            <div className="login-container">
              <div className="row">
                <div className="col-sm-12">
                  <img src={logo} alt={"logo"} className="logo"></img>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="welcome">Welcome</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="sign-in-sign">Sign In to Manager</h1>
                </div>
              </div>
              <form onSubmit={(e) => submit(e)}>
                <div className="row">
                  <label for="details" className="form-label details-label">
                    Enter Details
                  </label>
                  <br />
                  <div className="username-wrapper">
                    <input
                      onChange={(e) => handle(e)}
                      id="email"
                      value={data.email}
                      type="text"
                      className="login-input"
                      name="email"
                      placeholder="Email"
                    />
                    <br />
                  </div>
                  <div className="password-wrapper">
                    <input
                      onChange={(e) => handle(e)}
                      id="password"
                      value={data.password}
                      className="login-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <div className="eye-icon">
                      <FontAwesomeIcon
                        icon={showPassword ? "eye" : "eye-slash"}
                        alt={"eye"}
                        aria-hidden="true"
                        onClick={togglePassword}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-center">
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  </div>
                  <ToastContainer hideProgressBar={true} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
