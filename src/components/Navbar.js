import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getRoleId, refreshPage, removeUserSession, getUser } from '../utilities/Common';

//css
import './Navbar.css';

//icon images
import registrationIcon from '../images/icons/registration-icon.png';
import patientIcon from '../images/icons/patient-icon.png';
import cashierIcon from '../images/icons/cashier-icon.png';
import extractionIcon from '../images/icons/extraction-icon.png';
import imagingIcon from '../images/icons/imaging-icon.png';
import medTechIcon from '../images/icons/med-tech-icon.png';
import chiefIcon from '../images/icons/chief-icon.png';
import usersIcon from '../images/icons/users-icon.png';
import companiesIcon from '../images/icons/companies-icon.png';
import supplyIcon from '../images/icons/supply-icon.png';
import reportIcon from '../images/icons/report-icon.png';
import logoutIcon from '../images/icons/logout.png';

//logo image
import logo from '../images/logo.png';
let showNavbar;

function cashierNavbar() {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
        <NavLink to="/cashier" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon"></img>
            <span class="mx-2">Cashier</span>
          </li>
        </NavLink>
        <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function registrationNavbar() {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
        <NavLink to="/registration" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={registrationIcon} alt={'registration'} class="registration icon"></img>
            <span class="mx-2">Registration</span>
          </li>
        </NavLink>
        <NavLink to="/add-old-patient" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink>
        <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function adminNavbar() {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
        <NavLink to="/registration" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={registrationIcon} alt={'registration'} class="registration icon"></img>
            <span class="mx-2">Registration</span>
          </li>
        </NavLink>
        <NavLink to="/add-old-patient" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink>
        <NavLink to="/cashier" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon"></img>
            <span class="mx-2">Cashier</span>
          </li>
        </NavLink>
        <NavLink to="/extraction" activeClassName="active" class="link">
          <li href="#" class="nav-link extraction-nav">
            <img src={extractionIcon} alt={'extraction'} class="extraction icon"></img>
            <span class="mx-2">Extraction</span>
          </li>
        </NavLink>
        <NavLink to="/imaging" activeClassName="active" class="link">
          <li href="#" class="nav-link imaging-nav">
            <img src={imagingIcon} alt={'imaging'} class="imaging icon"></img>
            <span class="mx-2">Imaging</span>
          </li>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
          <li href="/medtech" class="nav-link imaging-nav">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
            <span class="mx-2">Medical Technology</span>
          </li>
        </NavLink>
        <li href="#" class="nav-link imaging-nav">
          <div class="row">
            <div class="col-3">
              <img src={chiefIcon} alt={'chief'} class="chief icon"></img>
            </div>
            <div class="col-9">
              <span class="mx-2">Chief of Medical Technology</span>
            </div>
          </div>
        </li>
        <NavLink to="/Users" activeClassName="active" class="link">
          <li href="#" class="nav-link users-nav">
            <div class="row">
              <div class="col-3">
                <img src={usersIcon} alt={'users'} class="users icon"></img>
              </div>
              <div class="col-9">
                <span class="mx-2">Users</span>
              </div>
            </div>
          </li>
        </NavLink>
        <NavLink to="/companies" activeClassName="active" class="link">
          <li href="#" class="nav-link companies-nav">
            <div class="row">
              <div class="col-3">
                <img src={companiesIcon} alt={'companies'} class="companies icon"></img>
              </div>
              <div class="col-9">
                <span class="mx-2">Companies</span>
              </div>
            </div>
          </li>
        </NavLink>
        <li href="#" class="nav-link supply-nav">
          <img src={supplyIcon} alt={'supply'} class="supply icon"></img>
          <span class="mx-2">Supply</span>
          <ul class="sub-menu">
            <Link to="/release-item" className="sub-link">
              <li class="sub-list">RELEASE ITEMS</li>
            </Link>
            <Link to="/purchase-order" className="sub-link">
              <li class="sub-list">PURCHASE ORDER</li>
            </Link>
            <Link to="/items" className="sub-link">
              <li class="sub-list">ITEMS</li>
            </Link>
            <Link to="/suppliers" className="sub-link">
              <li class="sub-list">SUPPLIERS</li>
            </Link>
          </ul>
        </li>
        <NavLink to="/reports" activeClassName="active" class="link">
          <li href="#" class="nav-link report-nav">
            <img src={reportIcon} alt={'report'} class="report icon"></img>
            <span class="mx-2">Reports</span>
          </li>
          <li href="#" class="nav-link supply-nav">
            <img src={supplyIcon} alt={'supply'} class="supply icon"></img>
            <span class="mx-2">Supply</span>
            <ul class="sub-menu">
              <Link to="/release-item" className="sub-link">
                <li class="sub-list">RELEASE ITEMS</li>
              </Link>
              <Link to="/purchase-order" className="sub-link">
                <li class="sub-list">PURCHASE ORDER</li>
              </Link>
              <Link to="/items" className="sub-link">
                <li class="sub-list">ITEMS</li>
              </Link>
              <Link to="/suppliers" className="sub-link">
                <li class="sub-list">SUPPLIERS</li>
              </Link>
            </ul>
          </li>
        </NavLink>
        <NavLink to="/reports" activeClassName="active" class="link">
          <li href="#" class="nav-link report-nav">
            <img src={reportIcon} alt={'report'} class="report icon"></img>
            <span class="mx-2">Reports</span>
          </li>
        </NavLink>

        <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function Navbar() {
  const [user, setUser] = useState('');

  React.useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div>
      {(user == 5 || user == 8) && cashierNavbar()}
      {(user == 4 || user == 9) && registrationNavbar()}
      {user != 4 && user != 5 && user != 8 && user != 9 && adminNavbar()}
    </div>
  );
}

export default Navbar;
