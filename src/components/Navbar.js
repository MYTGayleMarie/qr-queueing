import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getRoleId, refreshPage, removeUserSession, getUser } from '../utilities/Common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive'


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
import { Nav } from 'react-bootstrap';
let showNavbar;

function cashierNavbar(showNavbar,setshowNavbar) {
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
        {/* <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li> */}
      </ul>
    </div>
  );
}

function registrationNavbar(showNavbar,setshowNavbar) {
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
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function adminNavbar(showNavbar,setshowNavbar) {
  return (
    <div>

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

        <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
          <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
    </div>
  );
}

function reportsSideNav() {
  return (
    <div className='reports-show-nav'>
          <Link to="/release-item">
            <span class="mx-2">RELEASE ITEMS</span>
          </Link>
          <Link to="/purchase-order">
            <span class="mx-2">PURCHASE ORDER</span>
          </Link>
          <Link to="/items">
            <span class="mx-2">ITEMS</span>
          </Link>
          <Link to="/suppliers">
            <span class="mx-2">SUPPLIERS</span>
          </Link>
    </div>
  );
}

function caretDown() {
  return ( <FontAwesomeIcon icon={"caret-down"} alt={"caret-down"} aria-hidden="true" className="caret-icon"/>)
}

function caretUp() {
  return ( <FontAwesomeIcon icon={"caret-up"} alt={"caret-up"} aria-hidden="true" className="caret-icon"/>)
}

function CashierNavbarTop(showNavbar, showMobileNavBar, showReport, setShowReport) {

  return (
  <div class="navbar">
  <div class="logo-mobile">
      <img src={logo} alt={'logo'} class="navbar-logo"></img>
  </div>
  <div id="nav-icon">
     <a href="#" class="open-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
  </div>
  <div id="side-nav">
    <a href="#" class="close-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
  </div>
</div>
  )
}


function RegisterNavbarTop(showNavbar, showMobileNavBar, showReport, setShowReport) {

  return (
  <div class="navbar">
  <div class="logo-mobile">
      <img src={logo} alt={'logo'} class="navbar-logo"></img>
  </div>
  <div id="nav-icon">
     <a href="#" class="open-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
  </div>
  <div id="side-nav">
    <a href="#" class="close-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
        <NavLink to="/registration" activeClassName="active" class="link">
          <img src={registrationIcon} alt={'registration'} class="registration icon mobile-size-icon"></img>
          <span class="mx-2">Registration</span>
        </NavLink>
        <NavLink to="/add-old-patient" activeClassName="active" class="link">
            <img src={patientIcon} alt={'patient'} class="patient icon mobile-size-icon"></img>
            <span class="mx-2">Patient</span>
        </NavLink>
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        <a href="#" class="nav-link" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
          <span class="mx-2 logout-text">Log Out</span>
        </a>
  </div>
</div>
  )
}


function AdminNavbarTop(showNavbar, showMobileNavBar, showReport, setShowReport) {

  return (
  <div class="navbar">
  <div class="logo-mobile">
      <img src={logo} alt={'logo'} class="navbar-logo"></img>
  </div>
  <div id="nav-icon">
     <a href="#" class="open-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
  </div>
  <div id="side-nav">
    <a href="#" class="close-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
        <NavLink to="/registration" activeClassName="active" class="link">
          <img src={registrationIcon} alt={'registration'} class="registration icon mobile-size-icon"></img>
          <span class="mx-2">Registration</span>
        </NavLink>
        <NavLink to="/add-old-patient" activeClassName="active" class="link">
            <img src={patientIcon} alt={'patient'} class="patient icon mobile-size-icon"></img>
            <span class="mx-2">Patient</span>
        </NavLink>
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        <NavLink to="/extraction" activeClassName="active" class="link">
            <img src={extractionIcon} alt={'extraction'} class="extraction icon mobile-size-icon"></img>
            <span class="mx-2">Extraction</span>
        </NavLink>
        <NavLink to="/imaging" activeClassName="active" class="link">
            <img src={imagingIcon} alt={'imaging'} class="imaging icon mobile-size-icon"></img>
            <span class="mx-2">Imaging</span>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-2">Medical Technology</span>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
            <img src={chiefIcon} alt={'chief'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-1">Chief of Medical Technology</span>
        </NavLink>
        <NavLink to="/users" activeClassName="active" class="link">
            <img src={usersIcon} alt={'users'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-1">Users</span>
        </NavLink>
        <NavLink to="/companies" activeClassName="active" class="link">
            <img src={companiesIcon} alt={'companies'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-2">Companies</span>
        </NavLink>
        <NavLink to="/reports" activeClassName="active" class="link">
            <img src={reportIcon} alt={'report'} class="report icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
        </NavLink>
        <div class="side-nav-content">
          <div className='reports-show-nav' onClick={(e) => setShowReport(!showReport)}>
            <img src={supplyIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
            <span>
              {showReport == true && caretUp()}
              {showReport == false && caretDown()}
            </span>
            {showReport == true && reportsSideNav()}
          </div>         
        </div>

        <a href="#" class="nav-link" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
          <span class="mx-2 logout-text">Log Out</span>
        </a>
  </div>
</div>
  )
}


function Navbar() {
  const [user, setUser] = useState('');
  const [showNavbar, setshowNavbar] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [showReport, setShowReport] = useState(false);

  console.log(showReport)
  const handleWindowSizeChange = () => {
          setWidth(window.innerWidth);
  }

  function showMobileNavBar() {
    if(showMobileSideBar == true) {
      document.getElementById("side-nav").style.width = "100%";
      setShowMobileSideBar(!showMobileSideBar);
    } else {
      document.getElementById("side-nav").style.width = "0%";
      setShowMobileSideBar(!showMobileSideBar);
    }
  
  }

  React.useEffect(() => {
    setUser(getUser());
  }, []);

  React.useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  React.useEffect(() => {

    if(width > 1000) {
      setshowNavbar(true);
    } else {
      setshowNavbar(false);
      
    }

  },[width]);



  return (
    <div>

      {showNavbar == false && (user == 5 || user == 8)  && CashierNavbarTop(showNavbar,showMobileNavBar,showReport, setShowReport)}
      {showNavbar == false && (user == 4 || user == 9)  && RegisterNavbarTop(showNavbar,showMobileNavBar,showReport, setShowReport)}
      {showNavbar == false && user != 4 && user != 5 && user != 8 && user != 9 && AdminNavbarTop(showNavbar,showMobileNavBar,showReport, setShowReport)}
      
      {showNavbar == true && (user == 5 || user == 8) && cashierNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && (user == 4 || user == 9) && registrationNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && user != 4 && user != 5 && user != 8 && user != 9 && adminNavbar(showNavbar,setshowNavbar)}
    </div>
  );
}

export default Navbar;
