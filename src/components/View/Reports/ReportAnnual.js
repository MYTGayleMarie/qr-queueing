import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { formatDate, getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useHref } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { getTime } from '../../../utilities/Common';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Searchbar from '../../Searchbar';
import Table from '../../Table.js';
import { ifError } from 'assert';

const buttons = ['export-excel', 'export-pdf'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    year: new Date().getFullYear()
  };

function ReportAnnual() {
  
  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [pendingPOs, setPendingPOs] = useState([]);
  const [printReadyFinal, setPrintReadyFinal] = useState(false);
  const [report, setReport] = useState([]);

  //redirect
  const [redirect, setRedirect] = useState(false);

      //ALL PENDING POS
      React.useEffect(() => {
          pendingPOs.length = 0;
        axios({
            method: 'get',
            url: window.$link + 'reports/performanceImprovement',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              year: filteredData.year,
              requester: userId,
            },
          }).then(function (response) {
                console.log(response)
                let data = response?.data?.data?.records
                let result = [];
                let total_no_of_patients = {
                  strategy: "",
                  overall_census: "Total No. of Patients",
                  target_benchmark: "Info",
                  jan: data?.total_no_of_patients?.Jan,
                  feb: data?.total_no_of_patients?.Feb,
                  mar: data?.total_no_of_patients?.Mar,
                  apr: data?.total_no_of_patients?.Apr,
                  may: data?.total_no_of_patients?.May,
                  jun: data?.total_no_of_patients?.Jun,
                  jul: data?.total_no_of_patients?.Jul,
                  aug: data?.total_no_of_patients?.Aug,
                  sep: data?.total_no_of_patients?.Sep,
                  oct: data?.total_no_of_patients?.Oct,
                  nov: data?.total_no_of_patients?.Nov,
                  dec: data?.total_no_of_patients?.Dec,
                }
                result.push(total_no_of_patients)
                let total_no_of_rendered_services = {
                  strategy: "",
                  overall_census: "Total No. of Services Rendered",
                  target_benchmark: "Info",
                  jan: data?.total_no_of_rendered_services?.Jan,
                  feb: data?.total_no_of_rendered_services?.Feb,
                  mar: data?.total_no_of_rendered_services?.Mar,
                  apr: data?.total_no_of_rendered_services?.Apr,
                  may: data?.total_no_of_rendered_services?.May,
                  jun: data?.total_no_of_rendered_services?.Jun,
                  jul: data?.total_no_of_rendered_services?.Jul,
                  aug: data?.total_no_of_rendered_services?.Aug,
                  sep: data?.total_no_of_rendered_services?.Sep,
                  oct: data?.total_no_of_rendered_services?.Oct,
                  nov: data?.total_no_of_rendered_services?.Nov,
                  dec: data?.total_no_of_rendered_services?.Dec,
                }
                result.push(total_no_of_rendered_services)
                let echo = {
                  strategy: "Department of Statistics",
                  overall_census: "2D - Echo",
                  target_benchmark: "Info",
                  jan: data?.echo?.Jan,
                  feb: data?.echo?.Feb,
                  mar: data?.echo?.Mar,
                  apr: data?.echo?.Apr,
                  may: data?.echo?.May,
                  jun: data?.echo?.Jun,
                  jul: data?.echo?.Jul,
                  aug: data?.echo?.Aug,
                  sep: data?.echo?.Sep,
                  oct: data?.echo?.Oct,
                  nov: data?.echo?.Nov,
                  dec: data?.echo?.Dec,
                }
                result.push(echo)
                let covid = {
                  strategy: "Department of Statistics",
                  overall_census: "Covid Swab",
                  target_benchmark: "Info",
                  jan: data?.covid?.Jan,
                  feb: data?.covid?.Feb,
                  mar: data?.covid?.Mar,
                  apr: data?.covid?.Apr,
                  may: data?.covid?.May,
                  jun: data?.covid?.Jun,
                  jul: data?.covid?.Jul,
                  aug: data?.covid?.Aug,
                  sep: data?.covid?.Sep,
                  oct: data?.covid?.Oct,
                  nov: data?.covid?.Nov,
                  dec: data?.covid?.Dec,
                }
                result.push(covid)
                let drug_test = {
                  strategy: "Department of Statistics",
                  overall_census: "Drug Test",
                  target_benchmark: "Info",
                  jan: data?.drug_test?.Jan,
                  feb: data?.drug_test?.Feb,
                  mar: data?.drug_test?.Mar,
                  apr: data?.drug_test?.Apr,
                  may: data?.drug_test?.May,
                  jun: data?.drug_test?.Jun,
                  jul: data?.drug_test?.Jul,
                  aug: data?.drug_test?.Aug,
                  sep: data?.drug_test?.Sep,
                  oct: data?.drug_test?.Oct,
                  nov: data?.drug_test?.Nov,
                  dec: data?.drug_test?.Dec,
                }
                result.push(drug_test)
                let ecg = {
                  strategy: "Department of Statistics",
                  overall_census: "ECG",
                  target_benchmark: "Info",
                  jan: data?.ecg?.Jan,
                  feb: data?.ecg?.Feb,
                  mar: data?.ecg?.Mar,
                  apr: data?.ecg?.Apr,
                  may: data?.ecg?.May,
                  jun: data?.ecg?.Jun,
                  jul: data?.ecg?.Jul,
                  aug: data?.ecg?.Aug,
                  sep: data?.ecg?.Sep,
                  oct: data?.ecg?.Oct,
                  nov: data?.ecg?.Nov,
                  dec: data?.ecg?.Dec,
                }
                result.push(ecg)
                let lab = {
                  strategy: "Department of Statistics",
                  overall_census: "Laboratory",
                  target_benchmark: "Info",
                  jan: data?.lab?.Jan,
                  feb: data?.lab?.Feb,
                  mar: data?.lab?.Mar,
                  apr: data?.lab?.Apr,
                  may: data?.lab?.May,
                  jun: data?.lab?.Jun,
                  jul: data?.lab?.Jul,
                  aug: data?.lab?.Aug,
                  sep: data?.lab?.Sep,
                  oct: data?.lab?.Oct,
                  nov: data?.lab?.Nov,
                  dec: data?.lab?.Dec,
                }
                result.push(lab)
                let md_related = {
                  strategy: "Department of Statistics",
                  overall_census: "MD Related Services (PE, Med Cert)",
                  target_benchmark: "Info",
                  jan: data?.md_related?.Jan,
                  feb: data?.md_related?.Feb,
                  mar: data?.md_related?.Mar,
                  apr: data?.md_related?.Apr,
                  may: data?.md_related?.May,
                  jun: data?.md_related?.Jun,
                  jul: data?.md_related?.Jul,
                  aug: data?.md_related?.Aug,
                  sep: data?.md_related?.Sep,
                  oct: data?.md_related?.Oct,
                  nov: data?.md_related?.Nov,
                  dec: data?.md_related?.Dec,
                }
                result.push(md_related)
                let ultrasound = {
                  strategy: "Department of Statistics",
                  overall_census: "Ultrasound",
                  target_benchmark: "Info",
                  jan: data?.ultrasound?.Jan,
                  feb: data?.ultrasound?.Feb,
                  mar: data?.ultrasound?.Mar,
                  apr: data?.ultrasound?.Apr,
                  may: data?.ultrasound?.May,
                  jun: data?.ultrasound?.Jun,
                  jul: data?.ultrasound?.Jul,
                  aug: data?.ultrasound?.Aug,
                  sep: data?.ultrasound?.Sep,
                  oct: data?.ultrasound?.Oct,
                  nov: data?.ultrasound?.Nov,
                  dec: data?.ultrasound?.Dec,
                }
                result.push(ultrasound)
                let xray = {
                  strategy: "Department of Statistics",
                  overall_census: "X-ray",
                  target_benchmark: "Info",
                  jan: data?.xray?.Jan,
                  feb: data?.xray?.Feb,
                  mar: data?.xray?.Mar,
                  apr: data?.xray?.Apr,
                  may: data?.xray?.May,
                  jun: data?.xray?.Jun,
                  jul: data?.xray?.Jul,
                  aug: data?.xray?.Aug,
                  sep: data?.xray?.Sep,
                  oct: data?.xray?.Oct,
                  nov: data?.xray?.Nov,
                  dec: data?.xray?.Dec,
                }
                result.push(xray)
                let cash = {
                  strategy: "Mode of Payment",
                  overall_census: "Cash",
                  target_benchmark: "Info",
                  jan: data?.cash?.Jan,
                  feb: data?.cash?.Feb,
                  mar: data?.cash?.Mar,
                  apr: data?.cash?.Apr,
                  may: data?.cash?.May,
                  jun: data?.cash?.Jun,
                  jul: data?.cash?.Jul,
                  aug: data?.cash?.Aug,
                  sep: data?.cash?.Sep,
                  oct: data?.cash?.Oct,
                  nov: data?.cash?.Nov,
                  dec: data?.cash?.Dec,
                }
                result.push(cash)
                let credit = {
                  strategy: "Mode of Payment",
                  overall_census: "Credit",
                  target_benchmark: "Info",
                  jan: data?.credit?.Jan,
                  feb: data?.credit?.Feb,
                  mar: data?.credit?.Mar,
                  apr: data?.credit?.Apr,
                  may: data?.credit?.May,
                  jun: data?.credit?.Jun,
                  jul: data?.credit?.Jul,
                  aug: data?.credit?.Aug,
                  sep: data?.credit?.Sep,
                  oct: data?.credit?.Oct,
                  nov: data?.credit?.Nov,
                  dec: data?.credit?.Dec,
                }
                result.push(credit)
                let company = {
                  strategy: "Strategy",
                  overall_census: "Company",
                  target_benchmark: "Info",
                  jan: data?.company?.Jan,
                  feb: data?.company?.Feb,
                  mar: data?.company?.Mar,
                  apr: data?.company?.Apr,
                  may: data?.company?.May,
                  jun: data?.company?.Jun,
                  jul: data?.company?.Jul,
                  aug: data?.company?.Aug,
                  sep: data?.company?.Sep,
                  oct: data?.company?.Oct,
                  nov: data?.company?.Nov,
                  dec: data?.company?.Dec,
                }
                result.push(company)
                let md_referral = {
                  strategy: "Strategy",
                  overall_census: "MD Referral",
                  target_benchmark: "Info",
                  jan: data?.md_referral?.Jan,
                  feb: data?.md_referral?.Feb,
                  mar: data?.md_referral?.Mar,
                  apr: data?.md_referral?.Apr,
                  may: data?.md_referral?.May,
                  jun: data?.md_referral?.Jun,
                  jul: data?.md_referral?.Jul,
                  aug: data?.md_referral?.Aug,
                  sep: data?.md_referral?.Sep,
                  oct: data?.md_referral?.Oct,
                  nov: data?.md_referral?.Nov,
                  dec: data?.md_referral?.Dec,
                }
                result.push(md_referral)
                let walkin_in = {
                  strategy: "Strategy",
                  overall_census: "Walk-In",
                  target_benchmark: "Info",
                  jan: data?.walkin_in?.Jan,
                  feb: data?.walkin_in?.Feb,
                  mar: data?.walkin_in?.Mar,
                  apr: data?.walkin_in?.Apr,
                  may: data?.walkin_in?.May,
                  jun: data?.walkin_in?.Jun,
                  jul: data?.walkin_in?.Jul,
                  aug: data?.walkin_in?.Aug,
                  sep: data?.walkin_in?.Sep,
                  oct: data?.walkin_in?.Oct,
                  nov: data?.walkin_in?.Nov,
                  dec: data?.walkin_in?.Dec,
                }
                result.push(walkin_in)
                let clinical_micro = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Clinical Microscopy",
                  target_benchmark: "Info",
                  jan: data?.clinical_micro?.Jan,
                  feb: data?.clinical_micro?.Feb,
                  mar: data?.clinical_micro?.Mar,
                  apr: data?.clinical_micro?.Apr,
                  may: data?.clinical_micro?.May,
                  jun: data?.clinical_micro?.Jun,
                  jul: data?.clinical_micro?.Jul,
                  aug: data?.clinical_micro?.Aug,
                  sep: data?.clinical_micro?.Sep,
                  oct: data?.clinical_micro?.Oct,
                  nov: data?.clinical_micro?.Nov,
                  dec: data?.clinical_micro?.Dec,
                }
                result.push(clinical_micro)
                let hematology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Hematology",
                  target_benchmark: "Info",
                  jan: data?.hematology?.Jan,
                  feb: data?.hematology?.Feb,
                  mar: data?.hematology?.Mar,
                  apr: data?.hematology?.Apr,
                  may: data?.hematology?.May,
                  jun: data?.hematology?.Jun,
                  jul: data?.hematology?.Jul,
                  aug: data?.hematology?.Aug,
                  sep: data?.hematology?.Sep,
                  oct: data?.hematology?.Oct,
                  nov: data?.hematology?.Nov,
                  dec: data?.hematology?.Dec,
                }
                result.push(hematology)
                let chemistry = {
                  strategy: "Laboratory Statistics",
                  overall_census: "chemistry",
                  target_benchmark: "Info",
                  jan: data?.chemistry?.Jan,
                  feb: data?.chemistry?.Feb,
                  mar: data?.chemistry?.Mar,
                  apr: data?.chemistry?.Apr,
                  may: data?.chemistry?.May,
                  jun: data?.chemistry?.Jun,
                  jul: data?.chemistry?.Jul,
                  aug: data?.chemistry?.Aug,
                  sep: data?.chemistry?.Sep,
                  oct: data?.chemistry?.Oct,
                  nov: data?.chemistry?.Nov,
                  dec: data?.chemistry?.Dec,
                }
                result.push(chemistry)
                let serology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "serology",
                  target_benchmark: "Info",
                  jan: data?.serology?.Jan,
                  feb: data?.serology?.Feb,
                  mar: data?.serology?.Mar,
                  apr: data?.serology?.Apr,
                  may: data?.serology?.May,
                  jun: data?.serology?.Jun,
                  jul: data?.serology?.Jul,
                  aug: data?.serology?.Aug,
                  sep: data?.serology?.Sep,
                  oct: data?.serology?.Oct,
                  nov: data?.serology?.Nov,
                  dec: data?.serology?.Dec,
                }
                result.push(serology)
                let microbiology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Microbiology",
                  target_benchmark: "Info",
                  jan: data?.microbiology?.Jan,
                  feb: data?.microbiology?.Feb,
                  mar: data?.microbiology?.Mar,
                  apr: data?.microbiology?.Apr,
                  may: data?.microbiology?.May,
                  jun: data?.microbiology?.Jun,
                  jul: data?.microbiology?.Jul,
                  aug: data?.microbiology?.Aug,
                  sep: data?.microbiology?.Sep,
                  oct: data?.microbiology?.Oct,
                  nov: data?.microbiology?.Nov,
                  dec: data?.microbiology?.Dec,
                }
                result.push(microbiology)
                let histopathology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Histopathology",
                  target_benchmark: "Info",
                  jan: data?.histopathology?.Jan,
                  feb: data?.histopathology?.Feb,
                  mar: data?.histopathology?.Mar,
                  apr: data?.histopathology?.Apr,
                  may: data?.histopathology?.May,
                  jun: data?.histopathology?.Jun,
                  jul: data?.histopathology?.Jul,
                  aug: data?.histopathology?.Aug,
                  sep: data?.histopathology?.Sep,
                  oct: data?.histopathology?.Oct,
                  nov: data?.histopathology?.Nov,
                  dec: data?.histopathology?.Dec,
                }
                result.push(histopathology)

                setReport(result.map((data) => {
                  return {
                    strategy: data.strategy,
                    overall_census: data.overall_census,
                    target_benchmark: data.target_benchmark,
                    jan: data.jan == null ? 0 : data.jan,
                    feb: data.feb == null ? 0 : data.feb,
                    mar: data.mar == null ? 0 : data.mar, 
                    apr: data.apr == null ? 0 : data.apr,
                    may: data.may == null ? 0 : data.may,
                    jun: data.jun == null ? 0 : data.jun,
                    jul: data.jul == null ? 0 : data.jul,
                    aug: data.aug == null ? 0 : data.aug,
                    sep: data.sep == null ? 0 : data.sep,
                    oct: data.oct == null ? 0 : data.oct,
                    nov: data.nov == null ? 0 : data.nov,
                    dec: data.dec == null ? 0 : data.dec,

                  }
                })
)

                if(data) {
                  setPrintReadyFinal(true);
                }
                
          }).catch(function (err) {
            setReport([])
          })
          
    },[render]);

  

  function filter() {}

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>

        <Searchbar title='ANNUAL REPORT'/>
          <Header 
            type="thick" 
            title= {filterData.year + " QR DIAGNOSTICS ANNUAL REPORT"}
            buttons={buttons} 
            tableName={'Annual Report'}
            tableData={report}
            tableHeaders={[
              'STRATEGY',
              'OVERALL CONSENSUS',
              'TARGET BENCHMARK',
              'JAN',
              'FEB',
              'MAR',
              'APR',
              'MAY',
              'JUN',
              'JUL',
              'AUG',
              'SEP',
              'OCT',
              'NOV',
              'DEC'
            ]}
            status={printReadyFinal}
             />
          <Table
            clickable={true}
            type={'report-annual'}
            tableData={report}
            rowsPerPage={100}
            headingColumns={[
              'STRATEGY',
              'OVERALL CONSENSUS',
              'TARGET BENCHMARK',
              'JAN',
              'FEB',
              'MAR',
              'APR',
              'MAY',
              'JUN',
              'JUL',
              'AUG',
              'SEP',
              'OCT',
              'NOV',
              'DEC'
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            useLoader={true}
          />

          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default ReportAnnual;
