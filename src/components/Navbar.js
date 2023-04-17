import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getRoleId, refreshPage, removeUserSession, getUser } from '../utilities/Common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//css
import './Navbar.css';

//icon images
import registrationIcon from '../images/icons/registration-icon.png';
import patientIcon from '../images/icons/patient-icon.png';
import cashierIcon from '../images/icons/cashier-icon.png';
import extractionIcon from '../images/icons/extraction-icon.png';
import imagingIcon from '../images/icons/imaging-icon.png';
import medTechIcon from '../images/icons/med-tech-icon.png';
import usersIcon from '../images/icons/users-icon.png';
import labIcon from '../images/icons/lab-icon.png';
import cmoduleIcon from '../images/icons/cmodule-icon.png';
import companiesIcon from '../images/icons/companies-icon.png';
import discountIcon from '../images/icons/discount-icon.png';
import supplyIcon from '../images/icons/supply-icon.png';
import reportIcon from '../images/icons/report-icon.png';
import logoutIcon from '../images/icons/logout.png';
import servicesIcon from '../images/icons/services-icon.png';
import queueIcon from '../images/icons/queue.png';

//logo image
import logo from '../images/logo.png';
import { Nav } from 'react-bootstrap';
let showNavbar;

function accountingNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <li href="#" class="nav-link supply-nav">
            <img src={companiesIcon} alt={'companies'} class="supply icon"></img>
            <span class="mx-2">Companies</span>
            <ul class="sub-menu">
              <Link to="/companies" className="sub-link">
                <li class="sub-list">COMPANY MANAGER</li>
              </Link>
              <Link to="/company-discounts" className="sub-link">
                <li class="sub-list">COMPANY DISCOUNT</li>
              </Link>
              <Link to="/company-invoices" className="sub-link">
                <li class="sub-list">COMPANY INVOICE</li>
              </Link>
            </ul>
          </li>
          <li href="#" class="nav-link supply-nav">
            <img src={supplyIcon} alt={'supply'} class="supply icon supply-icon"></img>
            <span class="mx-2">Supply</span>
            <ul class="sub-menu">
              <Link to="/purchase-order" className="sub-link">
                <li class="sub-list">PURCHASE ORDER</li>
              </Link>
            </ul>
          </li>
          <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
            <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function supplyNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <li href="#" class="nav-link supply-nav">
            <img src={supplyIcon} alt={'supply'} class="supply icon"></img>
            <span class="mx-2">Supply</span>
            <ul class="sub-menu">
              <Link to="/release-item" className="sub-link">
                <li class="sub-list">RELEASE ITEMS</li>
              </Link>
              <Link to="/items" className="sub-link">
                <li class="sub-list">ITEMS</li>
              </Link>
            </ul>
          </li>
          <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
            <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function resultsReleasingNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <NavLink to="/medtech" activeClassName="active" class="link">
            <li href="/medtech" class="nav-link imaging-nav">
              <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
              <span class="mx-2">Results Releasing</span>
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

function labReleasingNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <NavLink to="/lab" activeClassName="active" class="link">
            <li href="/lab" class="nav-link imaging-nav">
              <img src={labIcon} alt={'lab'} class="lab icon"></img>
              <span class="mx-2">Laboratory Releasing</span>
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

function laboratoryReleasingNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <NavLink to="/lab" activeClassName="active" class="link">
              <li href="/lab" class="nav-link imaging-nav">
                <img src={labIcon} alt={'lab'} class="lab icon"></img>
                <span class="mx-2">Laboratory Releasing</span>
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

function queueManagerNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
          <NavLink to="/queuemanager" activeClassName="active" class="link">
            <li href="/lab" class="nav-link imaging-nav">
              <img src={labIcon} alt={'lab'} class="lab icon"></img>
              <span class="mx-2">Laboratory Releasing</span>
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

// function cModuleNavbar(showNavbar,setShowNavbar) {
//   return (
//     <div class=" d-flex justify-content-between flex-wrap flex-column">
//       <ul class=" flex-column text-white w-100">
//         <div class="d-flex justify-content-center">
//           <img src={logo} alt={'logo'} class="navbar-logo"></img>
//         </div>
//           {/* <NavLink to="/cmodule" activeClassName="active" class="link">
//             <li href="/cmodule" class="nav-link imaging-nav">
//               <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
//               <span class="mx-2">Customer Module</span>
//             </li>
//           </NavLink>
//           <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
//             <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
//             <span class="mx-2">Log Out</span>
//         </li> */}
//       </ul>
//     </div>
//   );
// }

function purchasingNavbar(showNavbar,setShowNavbar) {
  return (
    <div class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav" id="sidebar">
      <ul class="nav flex-column text-white w-100">
        <div class="d-flex justify-content-center">
          <img src={logo} alt={'logo'} class="navbar-logo"></img>
        </div>
        <li href="#" class="nav-link supply-nav">
            <img src={supplyIcon} alt={'supply'} class="supply icon supply-icon"></img>
            <span class="mx-2">Supply</span>
            <ul class="sub-menu">
              <Link to="/release-item" className="sub-link">
                <li class="sub-list">RELEASE ITEMS</li>
              </Link>
              <Link to="/purchase-order" className="sub-link">
                <li class="sub-list">PURCHASE ORDER</li>
              </Link>
              <Link to="/receives" className="sub-link">
                <li class="sub-list">RECEIVES</li>
              </Link>
              <Link to="/items" className="sub-link">
                <li class="sub-list">ITEMS</li>
              </Link>
              <Link to="/inventory" className="sub-link">
                <li class="sub-list">INVENTORY</li>
              </Link>
              <Link to="/suppliers" className="sub-link">
                <li class="sub-list">SUPPLIERS</li>
              </Link>
            </ul>
          </li>
          <li href="#" class="nav-link logout-nav" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon"></img>
            <span class="mx-2">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

function cashierNavbar(showNavbar,setshowNavbar) {
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
        <NavLink to="/queuemanager" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={queueIcon} alt={'queue'} class="queue icon"></img>
            <span class="mx-2">Queue Manager</span>
          </li>
        </NavLink>
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon"></img>
            <span class="mx-2">Cashier</span>
          </li>
        </NavLink>
        <NavLink to="/reports" activeClassName="active" class="link">
          <li href="#" class="nav-link report-nav">
            <img src={reportIcon} alt={'report'} class="report icon"></img>
            <span class="mx-2">Reports</span>
          </li>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
            <li href="/medtech" class="nav-link imaging-nav">
              <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
              <span class="mx-2">Results Releasing</span>
            </li>
        </NavLink>

        <NavLink to="/lab" activeClassName="active" class="link">
            <li href="/lab" class="nav-link imaging-nav">
              <img src={labIcon} alt={'lab'} class="lab icon"></img>
              <span class="mx-2">Laboratory Releasing</span>
            </li>
        </NavLink>
        {/* <NavLink to="/cmodule" activeClassName="active" class="link">
            <li href="/cmodule" class="nav-link imaging-nav">
              <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
              <span class="mx-2">Customer Module</span>
            </li>
        </NavLink> */}

        <NavLink to="/registrationcmodule" activeClassName="active" class="link">
            <li href="/registrationcmodule" class="nav-link imaging-nav">
              <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
              <span class="mx-2">Customer Module</span>
            </li>
        </NavLink>

        <li href="#" class="nav-link supply-nav">
            <img src={companiesIcon} alt={'companies'} class="supply icon"></img>
            <span class="mx-2">Companies</span>
            <ul class="sub-menu">
              <Link to="/company-invoices" className="sub-link">
                <li class="sub-list">COMPANY INVOICE</li>
              </Link>
            </ul>
          </li>
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
        <NavLink to="/queuemanager" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={queueIcon} alt={'queue'} class="queue icon"></img>
            <span class="mx-2">Queue Manager</span>
          </li>
        </NavLink>
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink> */}
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon"></img>
            <span class="mx-2">Cashier</span>
          </li>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
            <li href="/medtech" class="nav-link imaging-nav">
              <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
              <span class="mx-2">Results Releasing</span>
            </li>
        </NavLink>

        <NavLink to="/lab" activeClassName="active" class="link">
            <li href="/lab" class="nav-link imaging-nav">
              <img src={labIcon} alt={'lab'} class="lab icon"></img>
              <span class="mx-2">Laboratory Releasing</span>
            </li>
        </NavLink>
        {/* <NavLink to="/cmodule" activeClassName="active" class="link">
            <li href="/cmodule" class="nav-link imaging-nav">
              <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
              <span class="mx-2">Customer Module</span>
            </li>
        </NavLink> */}

        <li href="#" class="nav-link supply-nav">
            <img src={companiesIcon} alt={'companies'} class="supply icon"></img>
            <span class="mx-2">Companies</span>
            <ul class="sub-menu">
              <Link to="/company-invoices" className="sub-link">
                <li class="sub-list">COMPANY INVOICE</li>
              </Link>
            </ul>
          </li>
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
        <NavLink to="/queuemanager" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={queueIcon} alt={'queue'} class="queue icon"></img>
            <span class="mx-2">Queue Manager</span>
          </li>
        </NavLink>
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon"></img>
            <span class="mx-2">Cashier</span>
          </li>
        </NavLink>
        {/* <NavLink to="/extraction" activeClassName="active" class="link">
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
        </NavLink> */}
        <NavLink to="/medtech" activeClassName="active" class="link">
          <li href="/medtech" class="nav-link imaging-nav">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
            <span class="mx-2">Results Releasing</span>
          </li>
        </NavLink>

        <NavLink to="/lab" activeClassName="active" class="link">
          <li href="/lab" class="nav-link imaging-nav">
            <img src={labIcon} alt={'lab'} class="lab icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
          </li>
        </NavLink>

        {/* <NavLink to="/cmodule" activeClassName="active" class="link">
          <li href="/cmodule" class="nav-link imaging-nav">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
            <span class="mx-2">Customer Module</span>
          </li>
        </NavLink> */}

        <NavLink to="/registrationcmodule" activeClassName="active" class="link">
          <li href="/registrationcmodule" class="nav-link imaging-nav">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
            <span class="mx-2">Customer Module</span>
          </li>
        </NavLink>

        <li href="#" class="nav-link supply-nav">
            <img src={companiesIcon} alt={'companies'} class="supply icon"></img>
            <span class="mx-2">Companies</span>
            <ul class="sub-menu">
              <Link to="/companies" className="sub-link">
                <li class="sub-list">COMPANY MANAGER</li>
              </Link>
              <Link to="/company-discounts" className="sub-link">
                <li class="sub-list">COMPANY DISCOUNT</li>
              </Link>
              <Link to="/company-invoices" className="sub-link">
                <li class="sub-list">COMPANY INVOICE</li>
              </Link>
            </ul>
          </li>
          <NavLink to="/discounts" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={discountIcon} alt={'discount'} class="discount icon"></img>
            <span class="mx-2">DISCOUNTS</span>
          </li>
        </NavLink> 
        <NavLink to="/reports" activeClassName="active" class="link">
          <li href="#" class="nav-link report-nav">
            <img src={reportIcon} alt={'report'} class="report icon"></img>
            <span class="mx-2">Reports</span>
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
              <Link to="/receives" className="sub-link">
                <li class="sub-list">RECEIVES</li>
              </Link>
              <Link to="/items" className="sub-link">
                <li class="sub-list">ITEMS</li>
              </Link>
              <Link to="/inventory" className="sub-link">
                <li class="sub-list">INVENTORY</li>
              </Link>
              <Link to="/suppliers" className="sub-link">
                <li class="sub-list">SUPPLIERS</li>
              </Link>
            </ul>
          </li>
          <NavLink to="/services" activeClassName="active" class="link">
          <li href="#" class="nav-link users-nav">
                <img src={servicesIcon} alt={'users'} class="users icon"></img>
                <span class="mx-2">Services</span>
          </li>
          </NavLink>
          <NavLink to="/Users" activeClassName="active" class="link">
          <li href="#" class="nav-link users-nav">
                <img src={usersIcon} alt={'users'} class="users icon"></img>
                <span class="mx-2">Users</span>
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

function supplySideNav() {
  return (
    <div className='reports-show-nav'>
          <Link to="/release-item">
            <span class="mx-2 nav-item">RELEASE ITEMS</span>
          </Link>
          <Link to="/purchase-order">
            <span class="mx-2 nav-item">PURCHASE ORDER</span>
          </Link>
          <Link to="/receives" className="sub-link">
            <span class="mx-2 nav-item">RECEIVES</span>
          </Link>
          <Link to="/items">
            <span class="mx-2 nav-item">ITEMS</span>
          </Link>
          <Link to="/suppliers">
            <span class="mx-2 nav-item">SUPPLIERS</span>
          </Link>
    </div>
  );
}

function supplyItemSideNav() {
  return (
    <div className='reports-show-nav'>
          <Link to="/release-item">
            <span class="mx-2 nav-item">RELEASE ITEMS</span>
          </Link>
          <Link to="/items">
            <span class="mx-2 nav-item">ITEMS</span>
          </Link>
    </div>
  );
}

function accountingSideNav() {
  return (
    <div className='reports-show-nav'>
          <Link to="/purchase-order">
            <span class="mx-2 nav-item">PURCHASE ORDER</span>
          </Link>
          <Link to="/receives" className="sub-link">
            <span class="mx-2 nav-item">RECEIVES</span>
          </Link>
    </div>
  );
}

function companySideNav() {
  return (
    <div className='reports-show-nav'>
        <Link to="/companies">
          <span class="mx-2 nav-item">COMPANY MANAGER</span>
        </Link>
        <Link to="/company-discounts">
          <span class="mx-2 nav-item">COMPANY DISCOUNT</span>
        </Link>
        <Link to="/company-invoices">
          <span class="mx-2 nav-item">COMPANY INVOICE</span>
        </Link>
    </div>
  );
}

function companyRegSideNav() {
  return (
    <div className='reports-show-nav'>
        <Link to="/company-invoices">
          <span class="mx-2 nav-item">COMPANY INVOICE</span>
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

function AccountingNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply, showCompany, setShowCompany) {

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
      <div class="side-nav-content">
            <div className='reports-show-nav' onClick={(e) => setShowCompany(!showCompany)}>
              <img src={companiesIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
              <span class="mx-2">Companies</span>
              <span>
                {showCompany == true && caretUp()}
                {showCompany == false && caretDown()}
              </span>
              {showCompany == true && companySideNav()}
            </div>         
          <div className='reports-show-nav' onClick={(e) => setShowSupply(!showSupply)}>
            <img src={supplyIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
            <span>
              {showSupply == true && caretUp()}
              {showSupply == false && caretDown()}
            </span>
            {showSupply == true && accountingSideNav()}
          </div>  
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

function SupplyNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
      <div class="side-nav-content">
          <div className='reports-show-nav' onClick={(e) => setShowSupply(!showSupply)}>
            <img src={supplyIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
            <span>
              {showSupply == true && caretUp()}
              {showSupply == false && caretDown()}
            </span>
            {showSupply == true && supplyItemSideNav()}
          </div>  
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

function ResultsReleasingNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
      <div class="side-nav-content">
        <NavLink to="/medtech" activeClassName="active" class="link">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-2">Results Releasing</span>
        </NavLink>
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

function LabReleasingNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
      <div class="side-nav-content">
        <NavLink to="/lab" activeClassName="active" class="link">
            <img src={labIcon} alt={'lab'} class="lab icon mobile-size-icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
        </NavLink>
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

function QueueManagerNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
      <div class="side-nav-content">
        <NavLink to="/lab" activeClassName="active" class="link">
            <img src={labIcon} alt={'lab'} class="lab icon mobile-size-icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
        </NavLink>
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

// function CModuleNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

//   return (
//   <div class="navbar">
//   <div class="logo-mobile">
//       <img src={logo} alt={'logo'} class="navbar-logo"></img>
//   </div>
//   <div id="nav-icon">
//      <a href="#" class="open-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
//   </div>
//   {/* <div id="side-nav">
//     <a href="#" class="close-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
//       <div class="side-nav-content">
//         <NavLink to="/cmodule" activeClassName="active" class="link">
//             <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon mobile-size-icon"></img>
//             <span class="mx-2">Customer Module</span>
//         </NavLink>
//           <a href="#" class="nav-link" onClick={removeUserSession}>
//             <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
//             <span class="mx-2 logout-text">Log Out</span>
//           </a>       
//       </div>
//   </div> */}
// </div>
//   )
// }
function PurchasingNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
      <div class="side-nav-content">
          <div className='reports-show-nav' onClick={(e) => setShowSupply(!showSupply)}>
            <img src={supplyIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
            <span>
              {showSupply == true && caretUp()}
              {showSupply == false && caretDown()}
            </span>
            {showSupply == true && supplySideNav()}
          </div>  
          <a href="#" class="nav-link" onClick={removeUserSession}>
            <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
            <span class="mx-2 logout-text">Log Out</span>
          </a>       
      </div>
  </div>
</div>
  )
}

function CashierNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
          <li href="#" class="nav-link cashier-nav">
            <img src={patientIcon} alt={'patient'} class="patient icon"></img>
            <span class="mx-2">Patient</span>
          </li>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        <NavLink to="/reports" activeClassName="active" class="link">
            <img src={reportIcon} alt={'report'} class="report icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
        </NavLink>
  </div>
</div>
  )
}


function RegisterNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply) {

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
        <NavLink to="/queuemanager" activeClassName="active" class="link">
            <img src={queueIcon} alt={'queue'} class="queue icon mobile-size-icon"></img>
            <span class="mx-2">Queue Manager</span>
        </NavLink>
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
            <img src={patientIcon} alt={'patient'} class="patient icon mobile-size-icon"></img>
            <span class="mx-2">Patient</span>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        <NavLink to="/medtech" activeClassName="active" class="link">
          <li href="/medtech" class="nav-link imaging-nav">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon"></img>
            <span class="mx-2">Results Releasing</span>
          </li>
        </NavLink>

        <NavLink to="/lab" activeClassName="active" class="link">
          <li href="/lab" class="nav-link imaging-nav">
            <img src={labIcon} alt={'lab'} class="lab icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
          </li>
        </NavLink>

        {/* <NavLink to="/cmodule" activeClassName="active" class="link">
          <li href="/cmodule" class="nav-link imaging-nav">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
            <span class="mx-2">Customer Module</span>
          </li>
        </NavLink> */}

        <NavLink to="/registrationcmodule" activeClassName="active" class="link">
          <li href="/registrationcmodule" class="nav-link imaging-nav">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon"></img>
            <span class="mx-2">Customer Module</span>
          </li>
        </NavLink>

        <a href="#" class="nav-link" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
          <span class="mx-2 logout-text">Log Out</span>
        </a>
  </div>
</div>
  )
}

function LaboratoryReleasingNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply, showCompany, setShowCompany) {

  return (
  <div class="navbar">
  <div class="logo-mobile">
      <img src={logo} alt={'logo'} class="navbar-logo"></img>
  </div>
  <div id="nav-icon">
     <a href="#" class="open-btn" onClick={(e) => showMobileNavBar()}>&#9776;</a>
  </div>
  <div id="side-nav">
      <NavLink to="/lab" activeClassName="active" class="link">
            <img src={labIcon} alt={'lab'} class="lab icon mobile-size-icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
      </NavLink>
      <a href="#" class="nav-link" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
          <span class="mx-2 logout-text">Log Out</span>
      </a>
  </div>
</div>
  )
}


function AdminNavbarTop(showNavbar, showMobileNavBar, showSupply, setShowSupply, showCompany, setShowCompany) {

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
        <NavLink to="/queuemanager" activeClassName="active" class="link">
            <img src={queueIcon} alt={'queue'} class="queue icon mobile-size-icon"></img>
            <span class="mx-2">Queue Manager</span>
        </NavLink>
        {/* <NavLink to="/add-old-patientcm" activeClassName="active" class="link">
            <img src={patientIcon} alt={'patient'} class="patient icon mobile-size-icon"></img>
            <span class="mx-2">Patient</span>
        </NavLink> */}
        <NavLink to="/cashier" activeClassName="active" class="link">
            <img src={cashierIcon} alt={'cashier'} class="cashier icon mobile-size-icon"></img>
            <span class="mx-2">Cashier</span>
        </NavLink>
        {/* <NavLink to="/extraction" activeClassName="active" class="link">
            <img src={extractionIcon} alt={'extraction'} class="extraction icon mobile-size-icon"></img>
            <span class="mx-2">Extraction</span>
        </NavLink>
        <NavLink to="/imaging" activeClassName="active" class="link">
            <img src={imagingIcon} alt={'imaging'} class="imaging icon mobile-size-icon"></img>
            <span class="mx-2">Imaging</span>
        </NavLink> */}
        <NavLink to="/medtech" activeClassName="active" class="link">
            <img src={medTechIcon} alt={'medTech'} class="medTech icon mobile-size-icon"></img>
            <span class="mx-2">Results Releasing</span>
        </NavLink>

        <NavLink to="/lab" activeClassName="active" class="link">
            <img src={labIcon} alt={'lab'} class="lab icon mobile-size-icon"></img>
            <span class="mx-2">Laboratory Releasing</span>
        </NavLink>
        {/* <NavLink to="/cmodule" activeClassName="active" class="link">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon mobile-size-icon"></img>
            <span class="mx-2">Customer Module</span>
        </NavLink> */}

        <NavLink to="/registrationcmodule" activeClassName="active" class="link">
            <img src={cmoduleIcon} alt={'cmodule'} class="cmodule icon mobile-size-icon"></img>
            <span class="mx-2">Customer Module</span>
        </NavLink>


        <div class="side-nav-content">
          <div className='reports-show-nav' onClick={(e) => setShowCompany(!showCompany)}>
            <img src={companiesIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Companies</span>
            <span>
              {showCompany == true && caretUp()}
              {showCompany == false && caretDown()}
            </span>
            {showCompany == true && companySideNav()}
          </div>         
        </div>
        <NavLink to="/discounts" activeClassName="active" class="link">
            <img src={discountIcon} alt={'discount'} class="discount icon mobile-size-icon"></img>
            <span class="mx-2">Discounts</span>
        </NavLink> 
        <NavLink to="/reports" activeClassName="active" class="link">
            <img src={reportIcon} alt={'report'} class="report icon mobile-size-icon"></img>
            <span class="mx-2">Reports</span>
        </NavLink>
        <div class="side-nav-content">
          <div className='reports-show-nav' onClick={(e) => setShowSupply(!showSupply)}>
            <img src={supplyIcon} alt={'supply'} class="supply icon mobile-size-icon"></img>
            <span class="mx-2">Supply</span>
            <span>
              {showSupply == true && caretUp()}
              {showSupply == false && caretDown()}
            </span>
            {showSupply == true && supplySideNav()}
          </div>         
        </div>
        <NavLink to="/users" activeClassName="active" class="link">
            <img src={usersIcon} alt={'users'} class="users icon mobile-size-icon"></img>
            <span class="mx-1">Users</span>
        </NavLink>

        <a href="#" class="nav-link" onClick={removeUserSession}>
          <img src={logoutIcon} alt={'logout'} class="logout icon mobile-size-icon"></img>
          <span class="mx-2 logout-text">Log Out</span>
        </a>
  </div>
</div>
  )
}


function Navbar() {
  const [role, setRole] = useState('');
  const [showNavbar, setshowNavbar] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [showSupply, setShowSupply] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

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
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
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

      {showNavbar == false && role == 3  && CashierNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)}
      {showNavbar == false && role == 2  && RegisterNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)}
      {showNavbar == false && (role == 4 || role == 1) && AdminNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply,showCompany, setShowCompany)}
      
      {showNavbar == false && role == 6  && PurchasingNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)}
      {showNavbar == false && (role == 5 || role == 10)  && ResultsReleasingNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)}
      {showNavbar == false && role == 7  && SupplyNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)}
      {showNavbar == false && role == 8 && AccountingNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply,showCompany, setShowCompany)}
      {/* {showNavbar == false && role == 10  && LaboratoryReleasingNavbarTop(showNavbar,showMobileNavBar,showSupply, setShowSupply)} */}

      {showNavbar == true && role == 3 && cashierNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && role == 2 && registrationNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && (role == 4 || role == 1) && adminNavbar(showNavbar,setshowNavbar)}

      {showNavbar == true && role == 6 && purchasingNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && (role == 5 || role == 10) && resultsReleasingNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && role == 7 && supplyNavbar(showNavbar,setshowNavbar)}
      {showNavbar == true && role == 8 && accountingNavbar(showNavbar,setshowNavbar)}
      {/* {showNavbar == true && role == 10 && laboratoryReleasingNavbar(showNavbar,setshowNavbar)} */}
    </div>
  );
}

export default Navbar;
