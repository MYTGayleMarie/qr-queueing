import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import './Navbar.css';

//icon images
import registrationIcon from '../images/icons/registration-icon.png';
import cashierIcon from '../images/icons/cashier-icon.png';
import extractionIcon from '../images/icons/extraction-icon.png';
import imagingIcon from '../images/icons/imaging-icon.png';
import medTechIcon from '../images/icons/med-tech-icon.png';
import chiefIcon from '../images/icons/chief-icon.png';
import supplyIcon from '../images/icons/supply-icon.png';
import reportIcon from '../images/icons/report-icon.png';

//logo image
import logo  from '../images/logo.png';


function Navbar() {

    return (
        <>
        <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
            <ul class="nav flex-column text-white w-100">
                <div class="d-flex justify-content-center">
                    <img src={logo} alt={"logo"} class="navbar-logo"></img>
                </div>
                <NavLink to="/registration" activeClassName="active" class="link">
                <li href="#" class="nav-link registration-nav">
                        <img src={registrationIcon} alt={"registration"} class="registration icon"></img>
                        <span class="mx-2">Registration</span>
                </li>
                </NavLink>
                <li href="#" class="nav-link cashier-nav">
                    <Link to="/cashier" class="main-link">
                        <img src={cashierIcon} alt={"cashier"} class="cashier icon"></img>
                        <span class="mx-2">Cashier</span>
                    </Link>
                    {/* <ul class="sub-menu">
                        <Link to="/add-payment" class="sub-link"><li class="sub-list">Add Payment Cash</li></Link>
                        <li class="sub-list">Add Payment Check</li>
                    </ul> */}
                </li>
                <li href="#" class="nav-link extraction-nav">
                    <Link to="/extraction" class="main-link">
                        <img src={extractionIcon} alt={"extraction"} class="extraction icon"></img>
                        <span class="mx-2">Extraction</span>
                    </Link>
                </li>
                <li href="#" class="nav-link imaging-nav">
                    <img src={imagingIcon} alt={"imaging"} class="imaging icon"></img>
                    <span class="mx-2">Imaging</span>
                </li>
                <li href="#" class="nav-link medTech-nav">
                    <img src={medTechIcon} alt={"medTech"} class="medTech icon"></img>
                    <span class="mx-2">Medical Technology</span>
                </li>
                <li href="#" class="nav-link chief-nav">
                    <div class="row">
                        <div class="col-3">
                        <img src={chiefIcon} alt={"chief"} class="chief icon"></img>
                        </div>
                        <div class="col-9">
                        <span class="mx-2">Chief of Medical Technology</span>
                        </div>
                    </div>
                </li>
                <li href="#" class="nav-link supply-nav">
                    <img src={supplyIcon} alt={"supply"} class="supply icon"></img>
                    <span class="mx-2">Supply</span>
                </li>
                <li href="#" class="nav-link report-nav">
                <img src={reportIcon} alt={"report"} class="report icon"></img>
                    <span class="mx-2">Reports</span>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Navbar
