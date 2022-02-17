import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontAwesomeIcons';

/** view */
import Login from './components/view/Login/Login';
import Registration from './components/view/Registration/Registration';
import PrintBooking from './components/view/Registration/PrintBooking';
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
import ReviewReleasingItems from './components/view/Supply/ReviewReleasingItems';
import AddItems from './components/view/Supply/AddItems';
import PurchaseOrder from './components/view/Supply/PurchaseOrder';
import AddPurchaseOrder from './components/view/Supply/AddPurchaseOrder';
import ReviewPurchaseOrder from './components/view/Supply/ReviewPurchaseOrder';
import UpdatePurchaseOrder from './components/view/Supply/UpdatePurchaseOrder';
import PayPurchaseOrder from './components/view/Supply/PayPurchaseOrder';
import Items from './components/view/Supply/Items';
import MedTech from './components/view/MedTech/MedTech';
import MedTechStart from './components/view/MedTech/MedTechStart';
import AddSupplyItems from './components/view/Supply/AddSupplyItems';
import UpdateSupplyItems from './components/view/Supply/UpdateSuppyItems';
import Suppliers from './components/view/Supply/Suppliers';
import AddSupplier from './components/view/Supply/AddSupplier';
import ViewSupplier from './components/view/Supply/ViewSupplier';
import Reports from './components/view/Reports/Reports';
import ReportTransaction from './components/view/Reports/ReportTransaction';
import ReportServicesPackages from './components/view/Reports/ReportServicesPackages';
import ReportHomeServices from './components/view/Reports/ReportHomeServices';
import ReportClinicalServices from './components/view/Reports/ReportClinicalServices';
import ReportPendingPO from './components/view/Reports/ReportPendingPO';
import Users from './components/view/Users/Users';
import UserDetail from './components/view/Users/UserDetail';
import Companies from './components/view/Companies/Companies';
import CompanyInvoiceManager from './components/view/Companies/CompanyInvoiceManager';
import ReviewCompanyInvoices from './components/view/Companies/ReviewCompanyInvoices';
import AddInvoice from './components/view/Companies/AddInvoice';
import AddInvoicePayment from './components/view/Companies/AddInvoicePayment';
import AddCompany from './components/view/Companies/AddCompany';
import { PaymentToPrint } from './components/view/Cashier/PaymentToPrint';
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
        <Route path="/view-supplier/:id" element={token ? <viewSupplier /> : <Navigate to="/" />} />
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
