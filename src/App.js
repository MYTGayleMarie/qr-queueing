import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontAwesomeIcons';

/** view */
import Login from './components/View/Login/Login';
import Registration from './components/View/Registration/Registration';
import PrintBooking from './components/View/Registration/PrintBooking';
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
import ReviewReleasingItems from './components/View/Supply/ReviewReleasingItems';
import AddItems from './components/View/Supply/AddItems';
import PurchaseOrder from './components/View/Supply/PurchaseOrder';
import AddPurchaseOrder from './components/View/Supply/AddPurchaseOrder';
import ReviewPurchaseOrder from './components/View/Supply/ReviewPurchaseOrder';
import UpdatePurchaseOrder from './components/View/Supply/UpdatePurchaseOrder';
import PayPurchaseOrder from './components/View/Supply/PayPurchaseOrder';
import Items from './components/View/Supply/Items';
import MedTech from './components/View/MedTech/MedTech';
import MedTechStart from './components/View/MedTech/MedTechStart';
import AddSupplyItems from './components/View/Supply/AddSupplyItems';
import UpdateSupplyItems from './components/View/Supply/UpdateSuppyItems';
import Suppliers from './components/View/Supply/Suppliers';
import AddSupplier from './components/View/Supply/AddSupplier';
import ViewSupplier from './components/View/Supply/ViewSupplier';
import Reports from './components/View/Reports/Reports';
import ReportTransaction from './components/View/Reports/ReportTransaction';
import ReportServicesPackages from './components/View/Reports/ReportServicesPackages';
import ReportHomeServices from './components/View/Reports/ReportHomeServices';
import ReportClinicalServices from './components/View/Reports/ReportClinicalServices';
import ReportPendingPO from './components/View/Reports/ReportPendingPO';
import Users from './components/View/Users/Users';
import UserDetail from './components/View/Users/UserDetail';
import Companies from './components/View/Companies/Companies';
import CompanyInvoiceManager from './components/View/Companies/CompanyInvoiceManager';
import ReviewCompanyInvoices from './components/View/Companies/ReviewCompanyInvoices';
import AddInvoice from './components/View/Companies/AddInvoice';
import AddInvoicePayment from './components/View/Companies/AddInvoicePayment';
import AddCompany from './components/View/Companies/AddCompany';
import { PaymentToPrint } from './components/View/Cashier/PaymentToPrint';
import PdfTransaction from './components/ReactToPDF';
import { Navigate } from 'react-router';

function App() {
  const [token, setAuthentication] = useState(window.$userToken);
  document.title = 'QR Diagnostics System';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={token ? <Registration /> : <Navigate to="/" />} />
        <Route path="/print-booking/:id" element={token ? <PrintBooking /> : <Navigate to="/" />} />
        <Route path="/add-new-patient" element={token ? <SwitchForm /> : <Navigate to="/" />} />
        <Route path="/add-old-patient" element={token ? <SearchPatient /> : <Navigate to="/" />} />
        <Route path="/add-booking/:id" element={token ? <SwitchForm2 /> : <Navigate to="/" />} />
        <Route path="/cashier" element={token ? <Cashier /> : <Navigate to="/" />} />
        <Route path="/add-payment/:id" element={token ? <AddPayment /> : <Navigate to="/" />} />
        <Route path="/extraction" element={token ? <Extraction /> : <Navigate to="/" />} />
        <Route path="/laboratory-test/:id" element={token ? <LaboratoryTests /> : <Navigate to="/" />} />
        <Route path="/imaging" element={token ? <Imaging /> : <Navigate to="/" />} />
        <Route path="/imaging-test/:id" element={token ? <ImagingTests /> : <Navigate to="/" />} />
        <Route path="/release-item" element={token ? <ReleaseItems /> : <Navigate to="/" />} />
        <Route path="/add-release" element={token ? <AddItems /> : <Navigate to="/" />} />
        <Route path="/review-release/:id" element={token ? <ReviewReleasingItems /> : <Navigate to="/" />} />
        <Route path="/medtech" element={token ? <MedTech /> : <Navigate to="/" />} />
        <Route path="/medtech-start/:bookId/:serviceId/:type" element={token ? <MedTechStart /> : <Navigate to="/" />} />
        <Route path="/Users" element={token ? <Users /> : <Navigate to="/" />} />
        <Route path="/User/:id" element={token ? <UserDetail /> : <Navigate to="/" />} />
        <Route path="/companies" element={token ? <Companies /> : <Navigate to="/" />} />
        <Route path="/add-company" element={token ? <AddCompany /> : <Navigate to="/" />} />
        <Route path="/company-invoices" element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />} />
        <Route path="/review-invoice/:id" element={token ? <ReviewCompanyInvoices /> : <Navigate to="/" />} />
        <Route path="/add-invoice/:id/:discount" element={token ? <AddInvoice /> : <Navigate to="/" />} />
        <Route path="/add-invoice-payment/:id" element={token ? <AddInvoicePayment /> : <Navigate to="/" />} />
        <Route path="/purchase-order" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/add-purchase" element={token ? <AddPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/review-purchase-order/:id" element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/update-purchase-order/:id" element={token ? <UpdatePurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/pay-purchase-order/:id" element={token ? <PayPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/items" element={token ? <Items /> : <Navigate to="/" />} />
        <Route path="/add-supply-items" element={token ? <AddSupplyItems /> : <Navigate to="/" />} />
        <Route path="/update-supply-item/:id" element={token ? <UpdateSupplyItems /> : <Navigate to="/" />} />
        <Route path="/suppliers" element={token ? <Suppliers /> : <Navigate to="/" />} />
        <Route path="/add-supplier" element={token ? <AddSupplier /> : <Navigate to="/" />} />
        <Route path="/view-supplier/:id" element={token ? <ViewSupplier /> : <Navigate to="/" />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/" />} />
        <Route path="/reports-transaction" element={token ? <ReportTransaction /> : <Navigate to="/" />} />
        <Route path="/reports-services-packages" element={token ? <ReportServicesPackages /> : <Navigate to="/" />} />
        <Route path="/reports-home-services" element={token ? <ReportHomeServices /> : <Navigate to="/" />} />
        <Route path="/reports-clinical-services" element={token ? <ReportClinicalServices/> : <Navigate to="/" />} />
        <Route path="/reports-pending-po" element={token ? <ReportPendingPO/> : <Navigate to="/" />} />
        <Route path="/print-payment/:id" element={token ? <PaymentToPrint /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
