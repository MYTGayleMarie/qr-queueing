import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/FontAwesomeIcons';

/** view */
import Login from './components/view/Login/Login';
import Registration from './components/view/Registration/Registration';
import PrintBooking from './components/view/Registration/PrintBooking';
import DeleteBooking from './components/view/Registration/DeleteBooking';
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
import ReceivePurchaseOrder from './components/view/Supply/ReceivePurchaseOrder';
import Receives from './components/view/Supply/Receives';
import ReceivesPrint from './components/view/Supply/ReceivesPrint';
import Items from './components/view/Supply/Items';
import MedTech from './components/view/Results Releasing/MedTech';
import MedTechStart from './components/view/Results Releasing/MedTechStart';
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
import ReportSales from './components/view/Reports/ReportSales';
import ReportUnpaidInvoices from './components/view/Reports/ReportUnpaidInvoices';
import MdReports from './components/view/Reports/MdReports';
import ReportCredits from './components/view/Reports/ReportCredits';
import ReportCreditDetails from './components/view/Reports/ReportCreditDetails';
import Users from './components/view/Users/Users';
import UserDetail from './components/view/Users/UserDetail';
import Companies from './components/view/Companies/Companies';
import CompanyDiscounts from './components/view/Companies/CompanyDiscounts';
import CompanyInvoiceManager from './components/view/Companies/CompanyInvoiceManager';
import ReviewCompanyInvoices from './components/view/Companies/ReviewCompanyInvoices';
import AddInvoice from './components/view/Companies/AddInvoice';
import AddInvoicePayment from './components/view/Companies/AddInvoicePayment';
import AddCompany from './components/view/Companies/AddCompany';
import AddDiscount from './components/view/Companies/AddDiscount';
import Discount from './components/view/Discount/Discount';
import AddDiscountNoCompany from './components/view/Discount/AddDiscountNoCompany';
import DiscountDetail from './components/view/Discount/DiscountDetail';
import ReceiveItems from './components/view/Supply/ReceiveItemsManager';
import { PaymentToPrint } from './components/view/Cashier/PaymentToPrint';
import { InvoiceToPrint } from './components/view/Companies/InvoiceToPrint';
import PdfTransaction from './components/ReactToPDF';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { refreshPage, removeUserSession} from './utilities/Common.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from './components/view/Services/Services';
import AddLabTest from './components/view/Services/AddLabTest';
import AddPackage from './components/view/Services/AddPackage';
import ViewLabTest from './components/view/Services/ViewLabTest';
import ViewPackage from './components/view/Services/ViewPackage';
import ReportIncompletePO from './components/view/Reports/ReportIncompletePO';
import ReportIncompletePOReview from './components/view/Reports/ReportIncompletePOReview';
import ViewHistory from './components/view/Registration/Add Old Patient/ViewHistory';


function App() {
  document.title = 'QR Diagnostics System';
  const [token, setAuthentication] = useState(window.$userToken);
  const [tokenExpiry, setTokenExpiry] = useState(window.$token_expiry);

  function promptExpiry() {
    toast.warning("TOKEN HAS EXPIRED. PLEASE LOG IN AGAIN...");
    setTimeout(() => {
      removeUserSession();
      refreshPage();
    },5000);
  }

  useEffect(() => {
    var startDate = new Date().getTime();
    var endDate;

    if(tokenExpiry != null) {
      endDate = new Date(tokenExpiry.replace(/['"]+/g, ''));

      var seconds = Math.floor((endDate - startDate)/1000);
      setInterval(promptExpiry, parseFloat(seconds) * 1000);

    }
  },[]);

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={token ? <Registration /> : <Navigate to="/" />} />
        <Route path="/print-booking/:id" element={token ? <PrintBooking /> : <Navigate to="/" />} />
        <Route path="/add-new-patient" element={token ? <SwitchForm /> : <Navigate to="/" />} />
        <Route path="/add-old-patient" element={token ? <SearchPatient /> : <Navigate to="/" />} />
        <Route path="/add-booking/:id" element={token ? <SwitchForm2 /> : <Navigate to="/" />} />
        <Route path="/delete-booking/:id" element={token ? <DeleteBooking /> : <Navigate to="/" />} />
        <Route path="/view-history/:id" element={token ? <ViewHistory /> : <Navigate to="/" />} />
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
        <Route path="/company-discounts" element={token ? <CompanyDiscounts /> : <Navigate to="/" />} />
        <Route path="/add-company" element={token ? <AddCompany /> : <Navigate to="/" />} />
        <Route path="/add-discount/:id" element={token ? <AddDiscount /> : <Navigate to="/" />} />
        <Route path="/company-invoices" element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />} />
        <Route path="/review-invoice/:id/:discountId" element={token ? <ReviewCompanyInvoices /> : <Navigate to="/" />} />
        <Route path="/add-invoice/:id/:discount" element={token ? <AddInvoice /> : <Navigate to="/" />} />
        <Route path="/add-invoice-payment/:id/:companyId" element={token ? <AddInvoicePayment /> : <Navigate to="/" />} />
        <Route path="/discounts" element={token ? <Discount /> : <Navigate to="/" />} />
        <Route path="/add-discount" element={token ? <AddDiscountNoCompany /> : <Navigate to="/" />} />
        <Route path="/discount-detail/:id" element={token ? <DiscountDetail/> : <Navigate to="/" />} />
        <Route path="/purchase-order" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/receives" element={token ? <Receives/> : <Navigate to="/" />} />
        <Route path="/receive-items-manager" element={token ? <ReceiveItems/> : <Navigate to="/" />} />
        <Route path="/receives-print/:id/:poId" element={token ? <ReceivesPrint/> : <Navigate to="/" />} />
        <Route path="/add-purchase" element={token ? <AddPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/review-purchase-order/:id" element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/update-purchase-order/:id" element={token ? <UpdatePurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/pay-purchase-order/:id/:poId" element={token ? <PayPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/receive-purchase-order/:id" element={token ? <ReceivePurchaseOrder/> : <Navigate to="/" />} />
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
        <Route path="/reports-sales" element={token ? <ReportSales/> : <Navigate to="/" />} />
        <Route path="/reports-md" element={token ? <MdReports/> : <Navigate to="/" />} />
        <Route path="/reports-credit" element={token ? <ReportCredits/> : <Navigate to="/" />} />
        <Route path="/reports-incomplete-po" element={token ? <ReportIncompletePO/> : <Navigate to="/" />} />
        <Route path="/reports-incomplete-po/review/:id" element={token ? <ReportIncompletePOReview/> : <Navigate to="/" />} />
        <Route path="/reports-credit-details/:discount_code" element={token ? <ReportCreditDetails/> : <Navigate to="/" />} />
        <Route path="/unpaid-invoices" element={token ? <ReportUnpaidInvoices/> : <Navigate to="/" />} />
        <Route path="/print-payment/:id" element={token ? <PaymentToPrint /> : <Navigate to="/" />} />
        <Route path="/services" element={token ? <Services /> : <Navigate to="/" />} />
        <Route path="/add-lab-test" element={token ? <AddLabTest /> : <Navigate to="/" />} />
        <Route path="/add-package" element={token ? <AddPackage /> : <Navigate to="/" />} />
        <Route path="/view/lab/:id" element={token ? <ViewLabTest /> : <Navigate to="/" />} />
        <Route path="/view/package/:id" element={token ? <ViewPackage /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>

    <ToastContainer/>
    </div>
  );
}

export default App;
