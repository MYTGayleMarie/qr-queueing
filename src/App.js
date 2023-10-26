import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/FontAwesomeIcons";

/** View */
import Login from "./components/View/Login/Login";
import Registration from "./components/View/Registration/Registration";
import PrintBooking from "./components/View/Registration/PrintBooking";
import DeleteBooking from "./components/View/Registration/DeleteBooking";
import SwitchFormCModule from "./components/View/CMRegistration/CMAdd New Patient/SwitchFormCModule";
import SwitchForm from "./components/View/Registration/Add New Patient/SwitchForm";
import SearchPatient from "./components/View/Registration/Add Old Patient/SearchPatient";
import SearchPatientCModule from "./components/View/CMRegistration/CMAdd Old Patient/SearchPatientCModule";
import SwitchForm2 from "./components/View/Registration/Add Old Patient/SwitchForm2";
// import SwitchForm2CModule from './components/View/CMRegistration/CMAdd Old Patient/SwitchForm2CModule.js';
import Cashier from "./components/View/Cashier/Cashier";
import AddPayment from "./components/View/Cashier/AddPayment";
import Extraction from "./components/View/Extraction/Extraction";
import LaboratoryTests from "./components/View/Extraction/LaboratoryTests";
import Imaging from "./components/View/Imaging/Imaging";
import ImagingTests from "./components/View/Imaging/ImagingTests";
import ReleaseItems from "./components/View/Supply/ReleaseItems";
import Inventory from "./components/View/Supply/InventoryManager";
import AddInventory from "./components/View/Supply/AddInventory";
import ReviewAddInventory from "./components/View/Supply/ReviewAddInventory";
import ReviewReleasingItems from "./components/View/Supply/ReviewReleasingItems";
import AddItems from "./components/View/Supply/AddItems";
import PurchaseOrder from "./components/View/Supply/PurchaseOrder";
import AddPurchaseOrder from "./components/View/Supply/AddPurchaseOrder";
import ReviewPurchaseOrder from "./components/View/Supply/ReviewPurchaseOrder";
import UpdatePurchaseOrder from "./components/View/Supply/UpdatePurchaseOrder";
import PayPurchaseOrder from "./components/View/Supply/PayPurchaseOrder";
import ReceivePurchaseOrder from "./components/View/Supply/ReceivePurchaseOrder";
import Receives from "./components/View/Supply/Receives";
import ReceivesPrint from "./components/View/Supply/ReceivesPrint";
import Items from "./components/View/Supply/Items";
import LabOfficer from "./components/View/Results Releasing/LabOfficer";
import MedTech from "./components/View/Results Releasing/MedTech";
import MedTechStart from "./components/View/Results Releasing/MedTechStart";
import Lab from "./components/View/Laboratory Releasing/Lab";
import RegistrationCModule from "./components/View/CMRegistration/RegistrationCModule";
import ViewPdf from "./components/View/Results Releasing/ViewPdf";
import AddSupplyItems from "./components/View/Supply/AddSupplyItems";
import UpdateSupplyItems from "./components/View/Supply/UpdateSuppyItems";
import Suppliers from "./components/View/Supply/Suppliers";
import AddSupplier from "./components/View/Supply/AddSupplier";
import ViewSupplier from "./components/View/Supply/ViewSupplier";
import Reports from "./components/View/Reports/Reports";
import ReportTransaction from "./components/View/Reports/ReportTransaction";
import ReportServicesPackages from "./components/View/Reports/ReportServicesPackages";
import ReportHomeServices from "./components/View/Reports/ReportHomeServices";
import ReportClinicalServices from "./components/View/Reports/ReportClinicalServices";
import ReportPendingPO from "./components/View/Reports/ReportPendingPO";
import ReportSales from "./components/View/Reports/ReportSales";
import ResultsReleasing from "./components/View/Reports/ReportResultsReleasing.js";
import ReportUnpaidInvoices from "./components/View/Reports/ReportUnpaidInvoices";
import MdReports from "./components/View/Reports/MdReports";
import MDReportDetail from "./components/View/Reports/ReportMDDetails";
import MdReferral from "./components/View/Reports/MdReferral";
import ReportCredits from "./components/View/Reports/ReportCredits";
import ReportCreditDetails from "./components/View/Reports/ReportCreditDetails";
import Users from "./components/View/Users/Users";
import UserDetail from "./components/View/Users/UserDetail";
import Companies from "./components/View/Companies/Companies";
import CompanyDiscounts from "./components/View/Companies/CompanyDiscounts";
import CompanyInvoiceManager from "./components/View/Companies/CompanyInvoiceManager";
import ReviewCompanyInvoices from "./components/View/Companies/ReviewCompanyInvoices";
import AddInvoice from "./components/View/Companies/AddInvoice";
import AddInvoicePayment from "./components/View/Companies/AddInvoicePayment";
import AddCompany from "./components/View/Companies/AddCompany";
import AddDiscount from "./components/View/Companies/AddDiscount";
import Discount from "./components/View/Discount/Discount";
import AddDiscountNoCompany from "./components/View/Discount/AddDiscountNoCompany";
import DiscountDetail from "./components/View/Discount/DiscountDetail";
import ReceiveItems from "./components/View/Supply/ReceiveItemsManager";
import { PaymentToPrint } from "./components/View/Cashier/PaymentToPrint";
import { InvoiceToPrint } from "./components/View/Companies/InvoiceToPrint";
import PdfTransaction from "./components/ReactToPDF";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { refreshPage, removeUserSession } from "./utilities/Common.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Services from "./components/View/Services/Services";
import AddLabTest from "./components/View/Services/AddLabTest";
import AddPackage from "./components/View/Services/AddPackage";
import ViewLabTest from "./components/View/Services/ViewLabTest";
import ViewPackage from "./components/View/Services/ViewPackage";
import ReportIncompletePO from "./components/View/Reports/ReportIncompletePO";
import ReportIncompletePOReview from "./components/View/Reports/ReportIncompletePOReview";
import ViewHistory from "./components/View/Registration/Add Old Patient/ViewHistory";
// import CMViewHistory from './components/View/Customer Module/Add Old PatientCM/CMViewHistory';
import ViewBooking from "./components/View/Results Releasing/ViewBooking";
import ReportServicesPackagesDetails from "./components/View/Reports/ReportServicesPackagesDetails";
import ReportInventory from "./components/View/Reports/ReportInventory";
import ReportItemHistory from "./components/View/Reports/ReportItemHistory";
import ReportItemHistoryDetails from "./components/View/Reports/ReportItemHistoryDetails";
import ReportExpense from "./components/View/Reports/ReportExpense";
import ReportAnnual from "./components/View/Reports/ReportAnnual";
import QueueManager from "./components/View/Queue Manager/QueueManager";
import QMOldPatientForm1 from "./components/View/Queue Manager/QMAdd Old Patient/QMOldPatientForm1";
import QMSwitchForm2 from "./components/View/Queue Manager/QMAdd Old Patient/QMSwitchForm2";
import AgingReport from "./components/View/AgingReport/AgingReport";
import AgingByCompany from "./components/View/AgingReport/AgingByCompany";
import ExtractionManager from "./components/View/ExtractionMod/ExtractionManager";
import AddInvoiceBulk from "./components/View/Companies/AddInvoiceBulk";
import NowServing from "./components/View/NowServing/NowServing";
import UpdatePatient from "./components/View/UpdatePatient/UpdatePatient";
import PrintLab from "./components/View/Laboratory Releasing/PrintLab";
import ReportsReleasingItem from "./components/View/Reports/ReportsReleasingItem";

import EditBookingSwitch from "./components/View/EditBooking/EditBooking/EditBookingSwitch";

function App() {
  document.title = "QR Diagnostics System";
  const [token, setAuthentication] = useState(window.$userToken);
  const [tokenExpiry, setTokenExpiry] = useState(window.$token_expiry);

  function promptExpiry() {
    toast.warning("TOKEN HAS EXPIRED. PLEASE LOG IN AGAIN...");
    setTimeout(() => {
      removeUserSession();
      refreshPage();
    }, 5000);
  }

  useEffect(() => {
    var startDate = new Date().getTime();
    var endDate;

    if (tokenExpiry != null) {
      endDate = new Date(tokenExpiry.replace(/['"]+/g, ""));

      var seconds = Math.floor((endDate - startDate) / 1000);
      setInterval(promptExpiry, parseFloat(seconds) * 1000);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/registration"
            element={token ? <Registration /> : <Navigate to="/" />}
          />
          <Route
            path="/print-booking/:id"
            element={token ? <PrintBooking /> : <Navigate to="/" />}
          />
          <Route
            path="/add-new-patient"
            element={token ? <SwitchForm /> : <Navigate to="/" />}
          />
          <Route
            path="/cmadd-new-patient"
            element={token ? <SwitchFormCModule /> : <Navigate to="/" />}
          />
          <Route
            path="/add-old-patient"
            element={token ? <SearchPatient /> : <Navigate to="/" />}
          />
          <Route
            path="/cmadd-old-patient"
            element={token ? <SearchPatientCModule /> : <Navigate to="/" />}
          />

          <Route
            path="/add-booking/:id"
            element={token ? <SwitchForm2 /> : <Navigate to="/" />}
          />

          <Route
            path="/delete-booking/:id"
            element={token ? <DeleteBooking /> : <Navigate to="/" />}
          />
          <Route
            path="/View-history/:id"
            element={token ? <ViewHistory /> : <Navigate to="/" />}
          />
          <Route
            path="/cashier"
            element={token ? <Cashier /> : <Navigate to="/" />}
          />
          <Route
            path="/add-payment/:id"
            element={token ? <AddPayment /> : <Navigate to="/" />}
          />
          {/* <Route
            path="/extraction"
            element={token ? <Extraction /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/laboratory-test/:id"
            element={token ? <LaboratoryTests /> : <Navigate to="/" />}
          />
          <Route
            path="/imaging"
            element={token ? <Imaging /> : <Navigate to="/" />}
          />
          <Route
            path="/imaging-test/:id"
            element={token ? <ImagingTests /> : <Navigate to="/" />}
          />
          <Route
            path="/release-item"
            element={token ? <ReleaseItems /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/release-item/:dateFrom/:dateTo"
            element={token ? <ReleaseItems /> : <Navigate to="/" />}
          />
          <Route
            path="/add-release"
            element={token ? <AddItems /> : <Navigate to="/" />}
          />
          <Route
            path="/review-release/:id"
            element={token ? <ReviewReleasingItems /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/review-release/:id/:dateFrom/:dateTo"
            element={token ? <ReviewReleasingItems /> : <Navigate to="/" />}
          />
          <Route
            path="/medtech"
            element={token ? <MedTech /> : <Navigate to="/" />}
          />
          <Route path="/lab" element={token ? <Lab /> : <Navigate to="/" />} />
          <Route
            path="/registrationcmodule"
            element={token ? <RegistrationCModule /> : <Navigate to="/" />}
          />
          <Route
            path="/queuemanager"
            element={token ? <QueueManager /> : <Navigate to="/" />}
          />
          <Route
            path="/queuemanager/add-booking/:id/:queueNumber"
            element={token ? <QMSwitchForm2 /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-booking/:id/:bookingID"
            element={token ? <EditBookingSwitch /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/medtech/:dateFrom/:dateTo"
            element={token ? <MedTech /> : <Navigate to="/" />}
          />

          <Route
            path="/lab/:dateFrom/:dateTo"
            element={token ? <Lab /> : <Navigate to="/" />}
          />

          <Route
            path="/registrationcmodule/:dateFrom/:dateTo"
            element={token ? <RegistrationCModule /> : <Navigate to="/" />}
          />
          <Route
            path="/queuemanager/:dateFrom/:dateTo"
            element={token ? <QueueManager /> : <Navigate to="/" />}
          />
          <Route
            path="/View-results/:type/:bookingId/:packageId/:serviceId"
            element={token ? <ViewPdf /> : <Navigate to="/" />}
          />
          <Route
            path="/laboratory-officer/:id/:dateFrom/:dateTo"
            element={token ? <LabOfficer /> : <Navigate to="/" />}
          />
          <Route
            path="/print-lab/:bookingID/:id/:labBookId/:type/:dateFrom/:dateTo"
            element={token ? <PrintLab /> : <Navigate to="/" />}
          />
          <Route
            path="/update-patient/:id"
            element={token ? <UpdatePatient /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/results-view-booking/:id/:dateFrom/:dateTo"
            element={token ? <ViewBooking /> : <Navigate to="/" />}
          />
          <Route
            path="/medtech-start/:bookId/:serviceId/:type"
            element={token ? <MedTechStart /> : <Navigate to="/" />}
          />
          <Route
            path="/Users"
            element={token ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path="/User/:id"
            element={token ? <UserDetail /> : <Navigate to="/" />}
          />
          <Route
            path="/companies"
            element={token ? <Companies /> : <Navigate to="/" />}
          />
          <Route
            path="/company-discounts"
            element={token ? <CompanyDiscounts /> : <Navigate to="/" />}
          />
          <Route
            path="/add-company"
            element={token ? <AddCompany /> : <Navigate to="/" />}
          />
          <Route
            path="/add-discount/:id"
            element={token ? <AddDiscount /> : <Navigate to="/" />}
          />
          <Route
            path="/company-invoices/add-invoice-bulk"
            element={token ? <AddInvoiceBulk /> : <Navigate to="/" />}
          />
          <Route
            path="/company-invoices"
            element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/company-invoices/:dateFrom/:dateTo"
            element={token ? <CompanyInvoiceManager /> : <Navigate to="/" />}
          />
          <Route
            path="/review-invoice/:id/:discountId"
            element={token ? <ReviewCompanyInvoices /> : <Navigate to="/" />}
          />
          <Route
            path="/add-invoice/:id/:discount"
            element={token ? <AddInvoice /> : <Navigate to="/" />}
          />
          {/* <Route
            path="/add-invoice-payment/:id/:companyId"
            element={token ? <AddInvoicePayment /> : <Navigate to="/" />}
          /> */}
          {/** With date filter */}
          <Route
            path="/add-invoice-payment/:id/:companyId/:dateFrom/:dateTo"
            element={token ? <AddInvoicePayment /> : <Navigate to="/" />}
          />
          <Route
            path="/discounts"
            element={token ? <Discount /> : <Navigate to="/" />}
          />
          <Route
            path="/add-discount"
            element={token ? <AddDiscountNoCompany /> : <Navigate to="/" />}
          />
          <Route
            path="/discount-detail/:id"
            element={token ? <DiscountDetail /> : <Navigate to="/" />}
          />
          <Route
            path="/purchase-order"
            element={token ? <PurchaseOrder /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/purchase-order/:dateFrom/:dateTo/:statusFilter"
            element={token ? <PurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/purchase-order/:dateFrom/:dateTo/"
            element={token ? <PurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/receives"
            element={token ? <Receives /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/:dateFrom/:dateTo"
            element={token ? <Receives /> : <Navigate to="/" />}
          />
          <Route
            path="/receives/:dateFrom/:dateTo/:statusFilter"
            element={token ? <Receives /> : <Navigate to="/" />}
          />
          <Route
            path="/receive-items-manager"
            element={token ? <ReceiveItems /> : <Navigate to="/" />}
          />
          <Route
            path="/receives-print/:id/:poId"
            element={token ? <ReceivesPrint /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/receives-print/:id/:poId/:dateFrom/:dateTo"
            element={token ? <ReceivesPrint /> : <Navigate to="/" />}
          />
          <Route
            path="/receives-print/:id/:poId/:dateFrom/:dateTo/:statusFilter"
            element={token ? <ReceivesPrint /> : <Navigate to="/" />}
          />
          <Route
            path="/add-purchase"
            element={token ? <AddPurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/review-purchase-order/:id"
            element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/review-purchase-order/:id/:dateFrom/:dateTo/:statusFilter"
            element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/review-purchase-order/:id/:dateFrom/:dateTo/"
            element={token ? <ReviewPurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/update-purchase-order/:id"
            element={token ? <UpdatePurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/pay-purchase-order/:id/:poId"
            element={token ? <PayPurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/receive-purchase-order/:id"
            element={token ? <ReceivePurchaseOrder /> : <Navigate to="/" />}
          />
          <Route
            path="/items"
            element={token ? <Items /> : <Navigate to="/" />}
          />
          <Route
            path="/add-supply-items"
            element={token ? <AddSupplyItems /> : <Navigate to="/" />}
          />
          <Route
            path="/update-supply-item/:id/:unit"
            element={token ? <UpdateSupplyItems /> : <Navigate to="/" />}
          />
          <Route
            path="/suppliers"
            element={token ? <Suppliers /> : <Navigate to="/" />}
          />
          <Route
            path="/inventory"
            element={token ? <Inventory /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/inventory/:dateFrom/:dateTo/:statusFilter"
            element={token ? <Inventory /> : <Navigate to="/" />}
          />
          <Route
            path="/inventory/:dateFrom/:dateTo/"
            element={token ? <Inventory /> : <Navigate to="/" />}
          />
          <Route
            path="/add-inventory"
            element={token ? <AddInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/review-inventory/:id"
            element={token ? <ReviewAddInventory /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/review-inventory/:id/:dateFrom/:dateTo/:statusFilter"
            element={token ? <ReviewAddInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/review-inventory/:id/:dateFrom/:dateTo/"
            element={token ? <ReviewAddInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/add-supplier"
            element={token ? <AddSupplier /> : <Navigate to="/" />}
          />
          <Route
            path="/View-supplier/:id"
            element={token ? <ViewSupplier /> : <Navigate to="/" />}
          />
          <Route
            path="/reports"
            element={token ? <Reports /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-transaction"
            element={token ? <ReportTransaction /> : <Navigate to="/" />}
          />
           <Route
            path="/reports-releasing-item"
            element={token ? <ReportsReleasingItem /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-services-packages"
            element={token ? <ReportServicesPackages /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-services-packages/:dateFrom/:dateTo"
            element={token ? <ReportServicesPackages /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-services-packages/details/:id/:dateFrom/:dateTo/:type"
            element={
              token ? <ReportServicesPackagesDetails /> : <Navigate to="/" />
            }
          />
          <Route
            path="/reports-home-services"
            element={token ? <ReportHomeServices /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-clinical-services"
            element={token ? <ReportClinicalServices /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-inventory"
            element={token ? <ReportInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-expense"
            element={token ? <ReportExpense /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-annual"
            element={token ? <ReportAnnual /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-pending-po"
            element={token ? <ReportPendingPO /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-pending-po/:dateFrom/:dateTo"
            element={token ? <ReportPendingPO /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-sales"
            element={token ? <ReportSales /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-md"
            element={token ? <MdReports /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-md/:dateFrom/:dateTo"
            element={token ? <MdReports /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-md-details/:name/:lab"
            element={token ? <MDReportDetail /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-md-details/:name/:lab/:dateFrom/:dateTo"
            element={token ? <MDReportDetail /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-referrals"
            element={token ? <MdReferral /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-item-history"
            element={token ? <ReportItemHistory /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-item-history/details/:id/:unit"
            element={token ? <ReportItemHistoryDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-credit"
            element={token ? <ReportCredits /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-credit/:dateFrom/:dateTo"
            element={token ? <ReportCredits /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-incomplete-po"
            element={token ? <ReportIncompletePO /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-incomplete-po/:dateFrom/:dateTo"
            element={token ? <ReportIncompletePO /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-incomplete-po/review/:id"
            element={token ? <ReportIncompletePOReview /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-incomplete-po/review/:id/:dateFrom/:dateTo"
            element={token ? <ReportIncompletePOReview /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-credit-details/:discount_code"
            element={token ? <ReportCreditDetails /> : <Navigate to="/" />}
          />
          {/** With date filter */}
          <Route
            path="/reports-credit-details/:discount_code/:dateFrom/:dateTo"
            element={token ? <ReportCreditDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/reports-results-releasing"
            element={token ? <ResultsReleasing /> : <Navigate to="/" />}
          />
          <Route
            path="/unpaid-invoices"
            element={token ? <ReportUnpaidInvoices /> : <Navigate to="/" />}
          />
          <Route
            path="/print-payment/:id"
            element={token ? <PaymentToPrint /> : <Navigate to="/" />}
          />
          <Route
            path="/services"
            element={token ? <Services /> : <Navigate to="/" />}
          />
          <Route
            path="/add-lab-test"
            element={token ? <AddLabTest /> : <Navigate to="/" />}
          />
          <Route
            path="/add-package"
            element={token ? <AddPackage /> : <Navigate to="/" />}
          />
          <Route
            path="/View/lab/:id"
            element={token ? <ViewLabTest /> : <Navigate to="/" />}
          />
          <Route
            path="/View/package/:id"
            element={token ? <ViewPackage /> : <Navigate to="/" />}
          />
          {/* Aging Report */}
          <Route
            path="/aging-report"
            element={token ? <AgingReport /> : <Navigate to="/" />}
          />
          <Route
            path="/aging-report/company/:company_id/:type"
            element={token ? <AgingByCompany /> : <Navigate to="/" />}
          />
          {/* Extraction Module */}
          <Route
            path="/extraction"
            element={token ? <ExtractionManager /> : <Navigate to="/" />}
          />
          {/* Now Serving */}
          <Route
            path="/now-serving"
            element={token ? <NowServing /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
