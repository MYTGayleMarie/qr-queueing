import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import '../Login/Login.css'

//images
import clinic from '../../../images/clinic.png';
import logo  from '../../../images/logo.png';

function Login() {
    return (
        <>
        <div class="container">
        <div class="row">
            <div class="col-sm d-flex justify-content-center">
                <img src={clinic} alt={"clinic"} class="login-clinic"></img>
            </div>
            <div class="col-sm d-flex justify-content-center">
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
                    <label for="details" class="form-label">Enter Details</label><br />
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" /><br />
                        <div class="input-group" id="show_hide_password">
                            <input class="form-control" type="password" placeholder="Password"/>
                            <div class="input-group-addon">
                                <a href=""><FontAwesomeIcon icon="eye-slash" class="hide-icon"/></a>
                            </div>
                            {/* <FontAwesomeIcon icon='eye-slash' class="input-icon"/> */}
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

