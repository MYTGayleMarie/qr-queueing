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
import Extraction from './components/View/Extraction/Extraction';

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/add-patient' element={<AddPatient1/>}/>
          <Route path='/add-service' element={<AddPatient2/>}/>
          <Route path='/cashier' element={<Cashier/>}/>
          <Route path='/add-payment' element={<AddPayment/>}/>
          <Route path='/extraction' element={<Extraction/>}/>
        </Routes>
    </Router>
  );
}

export default App;
