import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./components/FontAwesomeIcons";

/** View */
import Login from './components/View/Login/Login';
import Registration from './components/View/Registration/Registration';
import PrintBooking from './components/View/Registration/PrintBooking';
import DeleteBooking from './components/View/Registration/DeleteBooking';
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
import Inventory from './components/View/Supply/InventoryManager';
import AddInventory from './components/View/Supply/AddInventory';
import ReviewAddInventory from './components/View/Supply/ReviewAddInventory';
import ReviewReleasingItems from './components/View/Supply/ReviewReleasingItems';
import AddItems from './components/View/Supply/AddItems';
import PurchaseOrder from './components/View/Supply/PurchaseOrder';
import AddPurchaseOrder from './components/View/Supply/AddPurchaseOrder';
import ReviewPurchaseOrder from './components/View/Supply/ReviewPurchaseOrder';
import UpdatePurchaseOrder from './components/View/Supply/UpdatePurchaseOrder';
import PayPurchaseOrder from './components/View/Supply/PayPurchaseOrder';
import ReceivePurchaseOrder from './components/View/Supply/ReceivePurchaseOrder';
import Receives from './components/View/Supply/Receives';
import ReceivesPrint from './components/View/Supply/ReceivesPrint';
import Items from './components/View/Supply/Items';
import MedTech from './components/View/Results Releasing/MedTech';
import MedTechStart from './components/View/Results Releasing/MedTechStart';
import ViewPdf from './components/View/Results Releasing/ViewPdf'
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
import ReportSales from './components/View/Reports/ReportSales';
import ResultsReleasing from './components/View/Reports/ReportResultsReleasing.js';
import ReportUnpaidInvoices from './components/View/Reports/ReportUnpaidInvoices';
import MdReports from './components/View/Reports/MdReports';
import MDReportDetail from './components/View/Reports/ReportMDDetails';
import MdReferral from './components/View/Reports/MdReferral';
import ReportCredits from './components/View/Reports/ReportCredits';
import ReportCreditDetails from './components/View/Reports/ReportCreditDetails';
import Users from './components/View/Users/Users';
import UserDetail from './components/View/Users/UserDetail';
import Companies from './components/View/Companies/Companies';
import CompanyDiscounts from './components/View/Companies/CompanyDiscounts';
import CompanyInvoiceManager from './components/View/Companies/CompanyInvoiceManager';
import ReviewCompanyInvoices from './components/View/Companies/ReviewCompanyInvoices';
import AddInvoice from './components/View/Companies/AddInvoice';
import AddInvoicePayment from './components/View/Companies/AddInvoicePayment';
import AddCompany from './components/View/Companies/AddCompany';
import AddDiscount from './components/View/Companies/AddDiscount';
import Discount from './components/View/Discount/Discount';
import AddDiscountNoCompany from './components/View/Discount/AddDiscountNoCompany';
import DiscountDetail from './components/View/Discount/DiscountDetail';
import ReceiveItems from './components/View/Supply/ReceiveItemsManager';
import { PaymentToPrint } from './components/View/Cashier/PaymentToPrint';
import { InvoiceToPrint } from './components/View/Companies/InvoiceToPrint';
import PdfTransaction from './components/ReactToPDF';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { refreshPage, removeUserSession} from './utilities/Common.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from './components/View/Services/Services';
import AddLabTest from './components/View/Services/AddLabTest';
import AddPackage from './components/View/Services/AddPackage';
import ViewLabTest from './components/View/Services/ViewLabTest';
import ViewPackage from './components/View/Services/ViewPackage';
import ReportIncompletePO from './components/View/Reports/ReportIncompletePO';
import ReportIncompletePOReview from './components/View/Reports/ReportIncompletePOReview';
import ViewHistory from './components/View/Registration/Add Old Patient/ViewHistory';
import ViewBooking from './components/View/Results Releasing/ViewBooking';


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
        <Route path="/View-history/:id" element={token ? <ViewHistory /> : <Navigate to="/" />} />
        <Route path="/cashier" element={token ? <Cashier /> : <Navigate to="/" />} />
        <Route path="/add-payment/:id" element={token ? <AddPayment /> : <Navigate to="/" />} />
        <Route path="/extraction" element={token ? <Extraction /> : <Navigate to="/" />} />
        <Route path="/laboratory-test/:id" element={token ? <LaboratoryTests /> : <Navigate to="/" />} />
        <Route path="/imaging" element={token ? <Imaging /> : <Navigate to="/" />} />
        <Route path="/imaging-test/:id" element={token ? <ImagingTests /> : <Navigate to="/" />} />
        <Route path="/release-item" element={token ? <ReleaseItems /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/release-item/:dateFrom/:dateTo" element={token ? <ReleaseItems /> : <Navigate to="/" />} />
        <Route path="/add-release" element={token ? <AddItems /> : <Navigate to="/" />} />
        <Route path="/review-release/:id" element={token ? <ReviewReleasingItems /> : <Navigate to="/" />} />
         {/** With date filter */}
        <Route path="/review-release/:id/:dateFrom/:dateTo" element={token ? <ReviewReleasingItems /> : <Navigate to="/" />} />
        <Route path="/medtech" element={token ? <MedTech /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/medtech/:dateFrom/:dateTo" element={token ? <MedTech /> : <Navigate to="/" />} />
        <Route path="/View-results/:type/:bookingId/:packageId/:serviceId" element={token ? <ViewPdf /> : <Navigate to="/" />} />
        <Route path="/View-booking/:id" element={token ? <ViewBooking /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/View-booking/:id/:dateFrom/:dateTo" element={token ? <ViewBooking /> : <Navigate to="/" />} />
        <Route path="/medtech-start/:bookId/:serviceId/:type" element={token ? <MedTechStart /> : <Navigate to="/" />} />
        <Route path="/Users" element={token ? <Users /> : <Navigate to="/" />} />
        <Route path="/User/:id" element={token ? <UserDetail /> : <Navigate to="/" />} />
        <Route path="/companies" element={token ? <Companies /> : <Navigate to="/" />} />
        <Route path="/company-discounts" element={token ? <CompanyDiscounts /> : <Navigate to="/" />} />
        <Route path="/add-company" element={token ? <AddCompany /> : <Navigate to="/" />} />
        <Route path="/add-discount/:id" element={token ? <AddDiscount /> : <Navigate to="/" />} />
        <Route path="/company-invoices" element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/company-invoices/:dateFrom/:dateTo" element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />} />
        <Route path="/review-invoice/:id/:discountId" element={token ? <ReviewCompanyInvoices /> : <Navigate to="/" />} />
        <Route path="/add-invoice/:id/:discount" element={token ? <AddInvoice /> : <Navigate to="/" />} />
        <Route path="/add-invoice-payment/:id/:companyId" element={token ? <AddInvoicePayment /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/add-invoice-payment/:id/:companyId/:dateFrom/:dateTo" element={token ? <AddInvoicePayment /> : <Navigate to="/" />} />
        <Route path="/discounts" element={token ? <Discount /> : <Navigate to="/" />} />
        <Route path="/add-discount" element={token ? <AddDiscountNoCompany /> : <Navigate to="/" />} />
        <Route path="/discount-detail/:id" element={token ? <DiscountDetail/> : <Navigate to="/" />} />
        <Route path="/purchase-order" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/purchase-order/:dateFrom/:dateTo/:statusFilter" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/purchase-order/:dateFrom/:dateTo/" element={token ? <PurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/receives" element={token ? <Receives/> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/receives/:dateFrom/:dateTo" element={token ? <Receives/> : <Navigate to="/" />} />
        <Route path="/receive-items-manager" element={token ? <ReceiveItems/> : <Navigate to="/" />} />
        <Route path="/receives-print/:id/:poId" element={token ? <ReceivesPrint/> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/receives-print/:id/:poId/:dateFrom/:dateTo" element={token ? <ReceivesPrint/> : <Navigate to="/" />} />
        <Route path="/add-purchase" element={token ? <AddPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/review-purchase-order/:id" element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />} />
        {/** With date filter */}
        <Route path="/review-purchase-order/:id/:dateFrom/:dateTo/:statusFilter" element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/review-purchase-order/:id/:dateFrom/:dateTo/" element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/update-purchase-order/:id" element={token ? <UpdatePurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/pay-purchase-order/:id/:poId" element={token ? <PayPurchaseOrder /> : <Navigate to="/" />} />
        <Route path="/receive-purchase-order/:id" element={token ? <ReceivePurchaseOrder/> : <Navigate to="/" />} />
        <Route path="/items" element={token ? <Items /> : <Navigate to="/" />} />
        <Route path="/add-supply-items" element={token ? <AddSupplyItems /> : <Navigate to="/" />} />
        <Route path="/update-supply-item/:id/:unit" element={token ? <UpdateSupplyItems /> : <Navigate to="/" />} />
        <Route path="/suppliers" element={token ? <Suppliers /> : <Navigate to="/" />} />
        <Route path="/inventory" element={token ? <Inventory/> : <Navigate to="/"/>} />
        <Route path="/add-inventory" element={token ? <AddInventory/> : <Navigate to="/"/>} />
        <Route path="/review-inventory/:id" element={token ? <ReviewAddInventory/> : <Navigate to="/"/>} />
        <Route path="/add-supplier" element={token ? <AddSupplier /> : <Navigate to="/" />} />
        <Route path="/View-supplier/:id" element={token ? <ViewSupplier /> : <Navigate to="/" />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/" />} />
        <Route path="/reports-transaction" element={token ? <ReportTransaction /> : <Navigate to="/" />} />
        <Route path="/reports-services-packages" element={token ? <ReportServicesPackages /> : <Navigate to="/" />} />
        <Route path="/reports-home-services" element={token ? <ReportHomeServices /> : <Navigate to="/" />} />
        <Route path="/reports-clinical-services" element={token ? <ReportClinicalServices/> : <Navigate to="/" />} />
        <Route path="/reports-pending-po" element={token ? <ReportPendingPO/> : <Navigate to="/" />} />
        <Route path="/reports-sales" element={token ? <ReportSales/> : <Navigate to="/" />} />
        <Route path="/reports-md" element={token ? <MdReports/> : <Navigate to="/" />} />
        <Route path="/reports-md-details/:name/:lab" element={token ? <MDReportDetail/> : <Navigate to="/" />} />
        <Route path="/reports-referrals" element={token ? <MdReferral/> : <Navigate to="/" />} />
        <Route path="/reports-credit" element={token ? <ReportCredits/> : <Navigate to="/" />} />
        <Route path="/reports-incomplete-po" element={token ? <ReportIncompletePO/> : <Navigate to="/" />} />
        <Route path="/reports-incomplete-po/review/:id" element={token ? <ReportIncompletePOReview/> : <Navigate to="/" />} />
        <Route path="/reports-credit-details/:discount_code" element={token ? <ReportCreditDetails/> : <Navigate to="/" />} />
        <Route path="/reports-results-releasing" element={token ? <ResultsReleasing/> : <Navigate to="/" />} />
        <Route path="/unpaid-invoices" element={token ? <ReportUnpaidInvoices/> : <Navigate to="/" />} />
        <Route path="/print-payment/:id" element={token ? <PaymentToPrint /> : <Navigate to="/" />} />
        <Route path="/services" element={token ? <Services /> : <Navigate to="/" />} />
        <Route path="/add-lab-test" element={token ? <AddLabTest /> : <Navigate to="/" />} />
        <Route path="/add-package" element={token ? <AddPackage /> : <Navigate to="/" />} />
        <Route path="/View/lab/:id" element={token ? <ViewLabTest /> : <Navigate to="/" />} />
        <Route path="/View/package/:id" element={token ? <ViewPackage /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>

    <ToastContainer/>
    </div>
  );
}

export default App;
