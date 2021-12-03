import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import '../Login/Login.css'

//images
import clinic from '../../../images/clinic.png';
import logo  from '../../../images/logo.png';

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <div class="container">
        <div class="row">
            <div class="col-lg d-flex justify-content-center">
                <img src={clinic} alt={"clinic"} class="login-clinic"></img>
            </div>
            <div class="col-lg d-flex justify-content-center">
                <div class="login-container">
                    <div class="row">
                        <div class="col-sm-12">
                            <img src={logo} alt={"logo"} class="logo"></img>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h1 class="welcome">Welcome</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h1 class="sign-in-sign">Sign In to Manager</h1>
                        </div>
                    </div>
                    <div class="row">
                    <label for="details" class="form-label details-label">Enter Details</label><br />
                       <div class="username-wrapper">
                            <input type="text" class="login-input" id="username" name="username" placeholder="Username" /><br />
                       </div>
                       <div class="password-wrapper">
                            <input class="login-input" type={showPassword ? "text" : "password"} placeholder="Password"/>
                            <div class="eye-icon">
                                <FontAwesomeIcon icon={showPassword ? "eye" : "eye-slash"} alt={"eye"} aria-hidden="true" onClick={togglePassword}/>
                            </div>
                       </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 d-flex justify-content-end">
                            <span class="forgot-pass">Forgot Password?</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 d-flex justify-content-center">
                        <button type="button" class="login-btn">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
        </>
    )
}

export default Login

