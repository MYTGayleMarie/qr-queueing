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
                    <div className="row">
                    <label for="details" className="form-label details-label">Enter Details</label><br />
                       <div className="username-wrapper">
                            <input type="text" className="login-input" id="username" name="username" placeholder="Username" /><br />
                       </div>
                       <div className="password-wrapper">
                            <input className="login-input" type={showPassword ? "text" : "password"} placeholder="Password"/>
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
                        <button type="button" className="login-btn">Login</button>
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

