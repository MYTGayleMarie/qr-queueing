import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const url= "https://blue.qrdiagnosticsph.com/login";
    const api_key = "Y5QubbhTOb";
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    }

    function submit(e) {
        e.preventDefault();
        axios.post(url, {
            api_key: api_key,
            email: data.email,
            password: data.password
        }, axiosConfig)
        .then(res=>{
            console.log(res.data)
        })
    }

    function handle(e) {
        const newData= {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
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

export default Login

