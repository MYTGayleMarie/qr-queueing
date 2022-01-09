import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontAwesomeIcons';

/** view */
import Login from './components/view/Login/Login';
import Registration from './components/view/Registration/Registration';
import SwitchForm from './components/view/Registration/Add New Patient/SwitchForm';
import SearchPatient from './components/view/Registration/Add Old Patient/SearchPatient';
import SwitchForm2 from './components/view/Registration/Add Old Patient/SwitchForm2';
import Cashier from './components/view/Cashier/Cashier';
import AddPayment from './components/view/Cashier/AddPayment';
import Extraction from './components/view/Extraction/Extraction';
import LaboratoryTests from './components/view/Extraction/LaboratoryTests';
import Imaging from './components/view/Imaging/Imaging';
import ImagingTests from './components/view/Imaging/ImagingTests';
import ReleaseItems from './components/view/Supply/ReleaseItems';
import AddItems from './components/view/Supply/AddItems';
import PurchaseOrder from './components/view/Supply/PurchaseOrder';
import AddPurchaseOrder from './components/view/Supply/AddPurchaseOrder';
import Items from './components/view/Supply/Items';
import MedTech from './components/view/MedTech/MedTech';
import MedTechStart from './components/view/MedTech/MedTech';
import AddSupplyItems from './components/view/Supply/AddSupplyItems';
import Suppliers from './components/view/Supply/Suppliers';
import AddSupplier from './components/view/Supply/AddSupplier';
import Reports from './components/view/Reports/Reports';
import Chief from './components/view/ChiefMedTech/ChiefMedTech';
import ChiefTests from './components/view/ChiefMedTech/ChiefTests';
import ChiefTests2 from './components/view/ChiefMedTech/ChiefTests2';
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
