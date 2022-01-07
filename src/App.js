import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontAwesomeIcons';

/** view */
import Login from './components/View/Login/Login';
import Registration from './components/View/Registration/Registration';
import SwitchForm from './components/View/Registration/Add New Patient/SwitchForm';
import SearchPatient from './components/View/Registration/Add Old Patient/SearchPatient';
import SwitchForm2 from './components/View/Registration/Add Old Patient/SwitchForm2';
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
import MedTech from './components/View/MedTech/MedTech';
import MedTechStart from './components/View/MedTech/MedTech';
import AddSupplyItems from './components/View/Supply/AddSupplyItems';
import Suppliers from './components/View/Supply/Suppliers';
import AddSupplier from './components/View/Supply/AddSupplier';
import Reports from './components/View/Reports/Reports';
import Chief from './components/View/ChiefMedTech/ChiefMedTech';
import ChiefTests from './components/View/ChiefMedTech/ChiefTests';
import ChiefTests2 from './components/View/ChiefMedTech/ChiefTests2';
import { Navigate } from 'react-router';

function App() {
  const [token, setAuthentication] = useState(window.$userToken);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={token ? <Registration /> : <Navigate to="/" />} />
        <Route path="/add-new-patient" element={token ? <SwitchForm /> : <Navigate to="/" />} />
        <Route path="/add-old-patient" element={token ? <SearchPatient /> : <Navigate to="/" />} />
        <Route path="/add-booking/:id" element={token ? <SwitchForm2 /> : <Navigate to="/" />} />
        <Route path="/cashier" element={token ? <Cashier /> : <Navigate to="/" />} />
        <Route path="/add-payment/:id" element={token ? <AddPayment /> : <Navigate to="/" />} />
        <Route path="/extraction" element={token ? <Extraction /> : <Navigate to="/" />} />
        <Route path="/laboratory-test" element={token ? <LaboratoryTests /> : <Navigate to="/" />} />
        <Route path="/imaging" element={token ? <Imaging /> : <Navigate to="/" />} />
        <Route path="/imaging-test" element={token ? <ImagingTests /> : <Navigate to="/" />} />
        <Route path="/release-item" element={token ? <ReleaseItems /> : <Navigate to="/" />} />
        <Route path="/add-release" element={token ? <AddItems /> : <Navigate to="/" />} />
        <Route path="/medtech" element={token ? <MedTech /> : <Navigate to="/" />} />
        <Route path="/medtech-start" element={token ? <MedTechStart /> : <Navigate to="/" />} />
        <Route path="/chief-medical-tech" element={<Chief />} />
        <Route path="/chief-tests" element={<ChiefTests />} />
        <Route path="/chief-tests-2" element={<ChiefTests2 />} />
        <Route path="/purchase-order" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/add-purchase" element={token ? <AddPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/items" element={token ? <Items /> : <Navigate to="/" />} />
        <Route path="/add-supply-items" element={token ? <AddSupplyItems /> : <Navigate to="/" />} />
        <Route path="/suppliers" element={token ? <Suppliers /> : <Navigate to="/" />} />
        <Route path="/add-supplier" element={token ? <AddSupplier /> : <Navigate to="/" />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
