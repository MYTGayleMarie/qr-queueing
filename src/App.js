import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./components/FontAwesomeIcons";

/** View */
import Login from './components/View/Login/Login';
import Registration from './components/View/Registration/Registration';
import SwitchForm from './components/View/Registration/Add Patient/SwitchForm';
import Cashier from './components/View/Cashier/Cashier';
import AddPayment from './components/View/Cashier/AddPayment';
import Extraction from './components/View/Extraction/Extraction';
import LaboratoryTests from './components/View/Extraction/LaboratoryTests';
import Imaging from './components/View/Imaging/Imaging';
import ImagingTests from './components/View/Imaging/ImagingTests';
import ReleaseItems from './components/View/Supply/ReleaseItems';
import AddItems from './components/View/Supply/AddItems';
import PurchaseOrder from './components/View/Supply/PurchaseOrder';
import AddPurchaseOrder from './components/View/Supply/AddPurchaseOrder';
import Items from './components/View/Supply/Items';
import AddSupplyItems from './components/View/Supply/AddSupplyItems';
import Suppliers from './components/View/Supply/Suppliers';
import AddSupplier from './components/View/Supply/AddSupplier';
import Reports from './components/View/Reports/Reports';
import Chief from './components/View/ChiefMedTech/ChiefMedTech';
import ChiefTests from './components/View/ChiefMedTech/ChiefTests';
import ChiefTests2 from './components/View/ChiefMedTech/ChiefTests2';


function App() { 
  
  const [authenticated, setAuthentication] = useState(false);


  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/add-patient' element={<SwitchForm/>}/>
          <Route path='/cashier' element={<Cashier/>}/>
          <Route path='/chief-medical-tech' element={<Chief/>}/>
          <Route path='/chief-tests' element={<ChiefTests/>}/>
          <Route path='/chief-tests-2' element={<ChiefTests2/>}/>
          <Route path='/add-payment' element={<AddPayment/>}/>
          <Route path='/extraction' element={<Extraction/>}/>
          <Route path='/laboratory-test' element={<LaboratoryTests/>}/>
          <Route path='/imaging' element={<Imaging/>}/>
          <Route path='/imaging-test' element={<ImagingTests/>}/>
          <Route path='/release-item' element={<ReleaseItems/>}/>
          <Route path='/add-release' element={<AddItems/>}/>
          <Route path='/purchase-order' element={<PurchaseOrder/>}/>
          <Route path='/add-purchase' element={<AddPurchaseOrder/>}/>
          <Route path='/items' element={<Items/>}/>
          <Route path='/add-supply-items' element={<AddSupplyItems/>}/>
          <Route path='/suppliers' element={<Suppliers/>}/>
          <Route path='/add-supplier' element={<AddSupplier/>}/>
          <Route path='/reports' element={<Reports/>}/>
        </Routes>
    </Router>
  );
}

export default App;
