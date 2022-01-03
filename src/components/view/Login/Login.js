import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { refreshPage } from "../../../utilities/Common";

//css
import '../Login/Login.css'

//images
import clinic from '../../../images/clinic.png';
import logo  from '../../../images/logo.png';
import axios from "axios";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    function submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: window.$link + 'login',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                email: data.email,
                password: data.password
            }
        }).then(function (response) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            refreshPage();
        }).catch(function (error) {
            console.log("error");
        });
    }

    function handle(e) {
        const newData= {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    if(window.$userToken != null) {
        return (
            <Navigate to = "/registration"/>
        )
    }

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
                    <label for="details" className="form-label details-label">Enter Details</label><br />
                       <div className="username-wrapper">
                            <input onChange= {(e) => handle(e)} id="email" value= {data.email} type="text" className="login-input" id="email" name="email" placeholder="Email" /><br />
                       </div>
                       <div className="password-wrapper">
                            <input onChange= {(e) => handle(e)} id="password" value= {data.password} className="login-input" type={showPassword ? "text" : "password"} placeholder="Password"/>
                            <div className="eye-icon">
                                <FontAwesomeIcon icon={showPassword ? "eye" : "eye-slash"} alt={"eye"} aria-hidden="true" onClick={togglePassword}/>
                            </div>
                       </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <span className="forgot-pass">Forgot Password?</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                        <button type="submit" className="login-btn">Login</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login

