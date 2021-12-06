import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./components/FontAwesomeIcons";

/** View */
import Login from './components/View/Login/Login';
import Registration from './components/View/Registration/Registration';
import AddPatient1 from './components/View/Registration/Add Patient/Form1';
import AddPatient2 from './components/View/Registration/Add Patient/Form2';
import Cashier from './components/View/Cashier/Cashier';
import AddPayment from './components/View/Cashier/AddPayment';

/**Components*/
import Navbar from './components/Navbar.js';

function App() {
  return (
    <Router>
      <Navbar/>
      <div class="active-cont">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/cashier' element={<Cashier/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/add-patient' element={<AddPatient1/>}/>
          <Route path='/add-service' element={<AddPatient2/>}/>
          <Route path='cashier/add-payment' element={<AddPayment/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
