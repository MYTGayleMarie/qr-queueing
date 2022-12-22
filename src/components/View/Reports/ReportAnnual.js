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
                  q1: (parseFloat(data?.total_no_of_patients?.Jan ?? 0) + parseFloat(data?.total_no_of_patients?.Feb ?? 0) + parseFloat(data?.total_no_of_patients?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.total_no_of_patients?.Apr ?? 0) + parseFloat(data?.total_no_of_patients?.May ?? 0) + parseFloat(data?.total_no_of_patients?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.total_no_of_patients?.Jul ?? 0) + parseFloat(data?.total_no_of_patients?.Aug ?? 0) + parseFloat(data?.total_no_of_patients?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.total_no_of_patients?.Oct ?? 0) + parseFloat(data?.total_no_of_patients?.Nov ?? 0) + parseFloat(data?.total_no_of_patients?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.total_no_of_patients?.Jan ?? 0) + parseFloat(data?.total_no_of_patients?.Feb ?? 0) + parseFloat(data?.total_no_of_patients?.Mar ?? 0) +
                         parseFloat(data?.total_no_of_patients?.Apr ?? 0) + parseFloat(data?.total_no_of_patients?.May ?? 0) + parseFloat(data?.total_no_of_patients?.Jun ?? 0) + 
                         parseFloat(data?.total_no_of_patients?.Jul ?? 0) + parseFloat(data?.total_no_of_patients?.Aug ?? 0) + parseFloat(data?.total_no_of_patients?.Sep ?? 0) + 
                         parseFloat(data?.total_no_of_patients?.Oct ?? 0) + parseFloat(data?.total_no_of_patients?.Nov ?? 0) + parseFloat(data?.total_no_of_patients?.Dec ?? 0)).toFixed(2),
                }
                result.push(total_no_of_patients)
                let total_no_of_rendered_services = {
                  strategy: "",
                  overall_census: "Total No. of Services Rendered",
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
                  q1: (parseFloat(data?.total_no_of_rendered_services?.Jan ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Feb ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.total_no_of_rendered_services?.Apr ?? 0) + parseFloat(data?.total_no_of_rendered_services?.May ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.total_no_of_rendered_services?.Jul ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Aug ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.total_no_of_rendered_services?.Oct ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Nov ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.total_no_of_rendered_services?.Jan ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Feb ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Mar ?? 0) +
                         parseFloat(data?.total_no_of_rendered_services?.Apr ?? 0) + parseFloat(data?.total_no_of_rendered_services?.May ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Jun ?? 0) + 
                         parseFloat(data?.total_no_of_rendered_services?.Jul ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Aug ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Sep ?? 0) + 
                         parseFloat(data?.total_no_of_rendered_services?.Oct ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Nov ?? 0) + parseFloat(data?.total_no_of_rendered_services?.Dec ?? 0)).toFixed(2),
                }
                result.push(total_no_of_rendered_services)
                let echo = {
                  strategy: "Department of Statistics",
                  overall_census: "2D - Echo",
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
                  q1: (parseFloat(data?.echo?.Jan ?? 0 ) + parseFloat(data?.echo?.Feb ?? 0) + parseFloat(data?.echo?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.echo?.Apr ?? 0) + parseFloat(data?.echo?.May ?? 0) + parseFloat(data?.echo?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.echo?.Jul ?? 0) + parseFloat(data?.echo?.Aug ?? 0) + parseFloat(data?.echo?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.echo?.Oct ?? 0) + parseFloat(data?.echo?.Nov ?? 0) + parseFloat(data?.echo?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.echo?.Jan ?? 0) + parseFloat(data?.echo?.Feb ?? 0) + parseFloat(data?.echo?.Mar ?? 0) +
                         parseFloat(data?.echo?.Apr ?? 0) + parseFloat(data?.echo?.May ?? 0) + parseFloat(data?.echo?.Jun ?? 0) + 
                         parseFloat(data?.echo?.Jul ?? 0) + parseFloat(data?.echo?.Aug ?? 0) + parseFloat(data?.echo?.Sep ?? 0) + 
                         parseFloat(data?.echo?.Oct ?? 0) + parseFloat(data?.echo?.Nov ?? 0) + parseFloat(data?.echo?.Dec ?? 0)).toFixed(2),
                }
                result.push(echo)
                let covid = {
                  strategy: "Department of Statistics",
                  overall_census: "Covid Swab",
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
                  q1: (parseFloat(data?.covid?.Jan ?? 0) + parseFloat(data?.covid?.Feb ?? 0) + parseFloat(data?.covid?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.covid?.Apr ?? 0) + parseFloat(data?.covid?.May ?? 0) + parseFloat(data?.covid?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.covid?.Jul) ?? 0 + parseFloat(data?.covid?.Aug ?? 0) + parseFloat(data?.covid?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.covid?.Oct ?? 0) + parseFloat(data?.covid?.Nov ?? 0) + parseFloat(data?.covid?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.covid?.Jan ?? 0) + parseFloat(data?.covid?.Feb ?? 0) + parseFloat(data?.covid?.Mar ?? 0) +
                         parseFloat(data?.covid?.Apr ?? 0) + parseFloat(data?.covid?.May ?? 0) + parseFloat(data?.covid?.Jun ?? 0) + 
                         parseFloat(data?.covid?.Jul ?? 0) + parseFloat(data?.covid?.Aug ?? 0) + parseFloat(data?.covid?.Sep ?? 0) + 
                         parseFloat(data?.covid?.Oct ?? 0) + parseFloat(data?.covid?.Nov ?? 0) + parseFloat(data?.covid?.Dec ?? 0)).toFixed(2),
                }
                result.push(covid)
                let drug_test = {
                  strategy: "Department of Statistics",
                  overall_census: "Drug Test",
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
                  q1: (parseFloat(data?.drug_test?.Jan ?? 0) + parseFloat(data?.drug_test?.Feb ?? 0) + parseFloat(data?.drug_test?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.drug_test?.Apr ?? 0) + parseFloat(data?.drug_test?.May ?? 0) + parseFloat(data?.drug_test?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.drug_test?.Jul ?? 0) + parseFloat(data?.drug_test?.Aug ?? 0) + parseFloat(data?.drug_test?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.drug_test?.Oct ?? 0) + parseFloat(data?.drug_test?.Nov?? 0) + parseFloat(data?.drug_test?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.drug_test?.Jan ?? 0) + parseFloat(data?.drug_test?.Feb ?? 0) + parseFloat(data?.drug_test?.Mar ?? 0) +
                         parseFloat(data?.drug_test?.Apr ?? 0) + parseFloat(data?.drug_test?.May ?? 0) + parseFloat(data?.drug_test?.Jun ?? 0) + 
                         parseFloat(data?.drug_test?.Jul ?? 0) + parseFloat(data?.drug_test?.Aug ?? 0) + parseFloat(data?.drug_test?.Sep ?? 0) + 
                         parseFloat(data?.drug_test?.Oct ?? 0) + parseFloat(data?.drug_test?.Nov ?? 0) + parseFloat(data?.drug_test?.Dec ?? 0)).toFixed(2),
                }
                result.push(drug_test)
                let ecg = {
                  strategy: "Department of Statistics",
                  overall_census: "ECG",
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
                  q1: (parseFloat(data?.ecg?.Jan ?? 0) + parseFloat(data?.ecg?.Feb ?? 0) + parseFloat(data?.ecg?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.ecg?.Apr ?? 0) + parseFloat(data?.ecg?.May ?? 0) + parseFloat(data?.ecg?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.ecg?.Jul ?? 0) + parseFloat(data?.ecg?.Aug ?? 0) + parseFloat(data?.ecg?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.ecg?.Oct ?? 0) + parseFloat(data?.ecg?.Nov ?? 0) + parseFloat(data?.ecg?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.ecg?.Jan ?? 0) + parseFloat(data?.ecg?.Feb ?? 0) + parseFloat(data?.ecg?.Mar ?? 0) +
                         parseFloat(data?.ecg?.Apr ?? 0) + parseFloat(data?.ecg?.May ?? 0) + parseFloat(data?.ecg?.Jun ?? 0) + 
                         parseFloat(data?.ecg?.Jul ?? 0) + parseFloat(data?.ecg?.Aug ?? 0) + parseFloat(data?.ecg?.Sep ?? 0) + 
                         parseFloat(data?.ecg?.Oct ?? 0) + parseFloat(data?.ecg?.Nov ?? 0) + parseFloat(data?.ecg?.Dec ?? 0)).toFixed(2),
                }
                result.push(ecg)
                let lab = {
                  strategy: "Department of Statistics",
                  overall_census: "Laboratory",
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
                  q1: (parseFloat(data?.lab?.Jan ?? 0) + parseFloat(data?.lab?.Feb ?? 0) + parseFloat(data?.lab?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.lab?.Apr ?? 0) + parseFloat(data?.lab?.May ?? 0) + parseFloat(data?.lab?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.lab?.Jul ?? 0) + parseFloat(data?.lab?.Aug ?? 0) + parseFloat(data?.lab?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.lab?.Oct ?? 0) + parseFloat(data?.lab?.Nov ?? 0) + parseFloat(data?.lab?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.lab?.Jan ?? 0) + parseFloat(data?.lab?.Feb ?? 0) + parseFloat(data?.lab?.Mar ?? 0) +
                         parseFloat(data?.lab?.Apr ?? 0) + parseFloat(data?.lab?.May ?? 0) + parseFloat(data?.lab?.Jun ?? 0) + 
                         parseFloat(data?.lab?.Jul ?? 0) + parseFloat(data?.lab?.Aug ?? 0) + parseFloat(data?.lab?.Sep) ?? 0 + 
                         parseFloat(data?.lab?.Oct ?? 0) + parseFloat(data?.lab?.Nov ?? 0) + parseFloat(data?.lab?.Dec ?? 0)).toFixed(2),
                  
                }
                result.push(lab)
                let md_related = {
                  strategy: "Department of Statistics",
                  overall_census: "MD Related Services (PE, Med Cert)",
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
                  q1: (parseFloat(data?.md_related?.Jan ?? 0) + parseFloat(data?.md_related?.Feb ?? 0) + parseFloat(data?.md_related?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.md_related?.Apr ?? 0) + parseFloat(data?.md_related?.May ?? 0) + parseFloat(data?.md_related?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.md_related?.Jul ?? 0) + parseFloat(data?.md_related?.Aug ?? 0) + parseFloat(data?.md_related?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.md_related?.Oct ?? 0) + parseFloat(data?.md_related?.Nov ?? 0) + parseFloat(data?.md_related?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.md_related?.Jan ?? 0) + parseFloat(data?.md_related?.Feb ?? 0) + parseFloat(data?.md_related?.Mar ?? 0) +
                         parseFloat(data?.md_related?.Apr ?? 0) + parseFloat(data?.md_related?.May ?? 0) + parseFloat(data?.md_related?.Jun ?? 0) + 
                         parseFloat(data?.md_related?.Jul ?? 0) + parseFloat(data?.md_related?.Aug ?? 0) + parseFloat(data?.md_related?.Sep ?? 0) + 
                         parseFloat(data?.md_related?.Oct ?? 0) + parseFloat(data?.md_related?.Nov ?? 0) + parseFloat(data?.md_related?.Dec ?? 0)).toFixed(2),
                }
                result.push(md_related)
                let ultrasound = {
                  strategy: "Department of Statistics",
                  overall_census: "Ultrasound",
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
                  q1: (parseFloat(data?.ultrasound?.Jan ?? 0) + parseFloat(data?.ultrasound?.Feb ?? 0) + parseFloat(data?.ultrasound?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.ultrasound?.Apr ?? 0) + parseFloat(data?.ultrasound?.May ?? 0) + parseFloat(data?.ultrasound?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.ultrasound?.Jul ?? 0) + parseFloat(data?.ultrasound?.Aug ?? 0) + parseFloat(data?.ultrasound?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.ultrasound?.Oct ?? 0) + parseFloat(data?.ultrasound?.Nov ?? 0) + parseFloat(data?.ultrasound?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.ultrasound?.Jan ?? 0) + parseFloat(data?.ultrasound?.Feb ?? 0) + parseFloat(data?.ultrasound?.Mar ?? 0) +
                         parseFloat(data?.ultrasound?.Apr ?? 0) + parseFloat(data?.ultrasound?.May ?? 0) + parseFloat(data?.ultrasound?.Jun ?? 0) + 
                         parseFloat(data?.ultrasound?.Jul ?? 0) + parseFloat(data?.ultrasound?.Aug ?? 0) + parseFloat(data?.ultrasound?.Sep ?? 0) + 
                         parseFloat(data?.ultrasound?.Oct ?? 0) + parseFloat(data?.ultrasound?.Nov ?? 0) + parseFloat(data?.ultrasound?.Dec ?? 0)).toFixed(2),
                }
                result.push(ultrasound)
                let xray = {
                  strategy: "Department of Statistics",
                  overall_census: "X-ray",
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
                  q1: (parseFloat(data?.xray?.Jan ?? 0) + parseFloat(data?.xray?.Feb ?? 0) + parseFloat(data?.xray?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.xray?.Apr ?? 0) + parseFloat(data?.xray?.May ?? 0) + parseFloat(data?.xray?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.xray?.Jul ?? 0) + parseFloat(data?.xray?.Aug ?? 0) + parseFloat(data?.xray?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.xray?.Oct ?? 0) + parseFloat(data?.xray?.Nov ?? 0) + parseFloat(data?.xray?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.xray?.Jan ?? 0) + parseFloat(data?.xray?.Feb ?? 0) + parseFloat(data?.xray?.Mar ?? 0) +
                         parseFloat(data?.xray?.Apr ?? 0) + parseFloat(data?.xray?.May ?? 0) + parseFloat(data?.xray?.Jun ?? 0) + 
                         parseFloat(data?.xray?.Jul ?? 0) + parseFloat(data?.xray?.Aug ?? 0) + parseFloat(data?.xray?.Sep ?? 0) + 
                         parseFloat(data?.xray?.Oct ?? 0) + parseFloat(data?.xray?.Nov ?? 0) + parseFloat(data?.xray?.Dec ?? 0)).toFixed(2),
                }
                result.push(xray)
                let cash = {
                  strategy: "Mode of Payment",
                  overall_census: "Cash",
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
                  q1: (parseFloat(data?.cash?.Jan ?? 0) + parseFloat(data?.cash?.Feb ?? 0) + parseFloat(data?.cash?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.cash?.Apr ?? 0) + parseFloat(data?.cash?.May ?? 0) + parseFloat(data?.cash?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.cash?.Jul ?? 0) + parseFloat(data?.cash?.Aug ?? 0) + parseFloat(data?.cash?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.cash?.Oct ?? 0) + parseFloat(data?.cash?.Nov ?? 0) + parseFloat(data?.cash?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.cash?.Jan ?? 0) + parseFloat(data?.cash?.Feb ?? 0) + parseFloat(data?.cash?.Mar ?? 0) +
                         parseFloat(data?.cash?.Apr ?? 0) + parseFloat(data?.cash?.May ?? 0) + parseFloat(data?.cash?.Jun ?? 0) + 
                         parseFloat(data?.cash?.Jul ?? 0) + parseFloat(data?.cash?.Aug ?? 0) + parseFloat(data?.cash?.Sep ?? 0) + 
                         parseFloat(data?.cash?.Oct ?? 0) + parseFloat(data?.cash?.Nov ?? 0) + parseFloat(data?.cash?.Dec ?? 0)).toFixed(2),
                  
                }
                result.push(cash)
                let credit = {
                  strategy: "Mode of Payment",
                  overall_census: "Credit",
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
                  q1: (parseFloat(data?.credit?.Jan ?? 0) + parseFloat(data?.credit?.Feb ?? 0) + parseFloat(data?.credit?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.credit?.Apr ?? 0) + parseFloat(data?.credit?.May ?? 0) + parseFloat(data?.credit?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.credit?.Jul ?? 0) + parseFloat(data?.credit?.Aug ?? 0) + parseFloat(data?.credit?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.credit?.Oct ?? 0) + parseFloat(data?.credit?.Nov ?? 0) + parseFloat(data?.credit?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.credit?.Jan ?? 0) + parseFloat(data?.credit?.Feb ?? 0) + parseFloat(data?.credit?.Mar ?? 0) +
                         parseFloat(data?.credit?.Apr ?? 0) + parseFloat(data?.credit?.May ?? 0) + parseFloat(data?.credit?.Jun ?? 0) + 
                         parseFloat(data?.credit?.Jul ?? 0) + parseFloat(data?.credit?.Aug ?? 0) + parseFloat(data?.credit?.Sep ?? 0) + 
                         parseFloat(data?.credit?.Oct ?? 0) + parseFloat(data?.credit?.Nov ?? 0) + parseFloat(data?.credit?.Dec ?? 0)).toFixed(2),
                }
                result.push(credit)
                let company = {
                  strategy: "Strategy",
                  overall_census: "Company",
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
                  q1: (parseFloat(data?.company?.Jan ?? 0) + parseFloat(data?.company?.Feb ?? 0) + parseFloat(data?.company?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.company?.Apr ?? 0) + parseFloat(data?.company?.May ?? 0) + parseFloat(data?.company?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.company?.Jul ?? 0) + parseFloat(data?.company?.Aug ?? 0) + parseFloat(data?.company?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.company?.Oct ?? 0) + parseFloat(data?.company?.Nov ?? 0) + parseFloat(data?.company?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.company?.Jan ?? 0) + parseFloat(data?.company?.Feb ?? 0) + parseFloat(data?.company?.Mar ?? 0) +
                         parseFloat(data?.company?.Apr ?? 0) + parseFloat(data?.company?.May ?? 0) + parseFloat(data?.company?.Jun ?? 0) + 
                         parseFloat(data?.company?.Jul ?? 0) + parseFloat(data?.company?.Aug ?? 0) + parseFloat(data?.company?.Sep ?? 0) + 
                         parseFloat(data?.company?.Oct ?? 0) + parseFloat(data?.company?.Nov ?? 0) + parseFloat(data?.company?.Dec ?? 0)).toFixed(2),
                  
                }
                result.push(company)
                let md_referral = {
                  strategy: "Strategy",
                  overall_census: "MD Referral",
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
                  q1: (parseFloat(data?.md_referral?.Jan ?? 0) + parseFloat(data?.md_referral?.Feb ?? 0) + parseFloat(data?.md_referral?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.md_referral?.Apr ?? 0) + parseFloat(data?.md_referral?.May ?? 0) + parseFloat(data?.md_referral?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.md_referral?.Jul ?? 0) + parseFloat(data?.md_referral?.Aug ?? 0) + parseFloat(data?.md_referral?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.md_referral?.Oct ?? 0) + parseFloat(data?.md_referral?.Nov ?? 0) + parseFloat(data?.md_referral?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.md_referral?.Jan ?? 0) + parseFloat(data?.md_referral?.Feb ?? 0) + parseFloat(data?.md_referral?.Mar ?? 0) +
                         parseFloat(data?.md_referral?.Apr ?? 0) + parseFloat(data?.md_referral?.May ?? 0) + parseFloat(data?.md_referral?.Jun ?? 0) + 
                         parseFloat(data?.md_referral?.Jul ?? 0) + parseFloat(data?.md_referral?.Aug ?? 0) + parseFloat(data?.md_referral?.Sep ?? 0) + 
                         parseFloat(data?.md_referral?.Oct ?? 0) + parseFloat(data?.md_referral?.Nov ?? 0) + parseFloat(data?.md_referral?.Dec ?? 0)).toFixed(2),
                }
                result.push(md_referral)
                let walkin_in = {
                  strategy: "Strategy",
                  overall_census: "Walk-In",
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
                  q1: (parseFloat(data?.walkin_in?.Jan ?? 0) + parseFloat(data?.walkin_in?.Feb ?? 0) + parseFloat(data?.walkin_in?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.walkin_in?.Apr ?? 0) + parseFloat(data?.walkin_in?.May ?? 0) + parseFloat(data?.walkin_in?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.walkin_in?.Jul ?? 0) + parseFloat(data?.walkin_in?.Aug ?? 0) + parseFloat(data?.walkin_in?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.walkin_in?.Oct ?? 0) + parseFloat(data?.walkin_in?.Nov ?? 0) + parseFloat(data?.walkin_in?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.walkin_in?.Jan ?? 0) + parseFloat(data?.walkin_in?.Feb ?? 0) + parseFloat(data?.walkin_in?.Mar ?? 0) +
                         parseFloat(data?.walkin_in?.Apr ?? 0) + parseFloat(data?.walkin_in?.May ?? 0) + parseFloat(data?.walkin_in?.Jun ?? 0) + 
                         parseFloat(data?.walkin_in?.Jul ?? 0) + parseFloat(data?.walkin_in?.Aug ?? 0) + parseFloat(data?.walkin_in?.Sep ?? 0) + 
                         parseFloat(data?.walkin_in?.Oct ?? 0) + parseFloat(data?.walkin_in?.Nov ?? 0) + parseFloat(data?.walkin_in?.Dec ?? 0)).toFixed(2),
                }
                result.push(walkin_in)
                let clinical_micro = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Clinical Microscopy",
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
                  q1: (parseFloat(data?.clinical_micro?.Jan ?? 0) + parseFloat(data?.clinical_micro?.Feb ?? 0) + parseFloat(data?.clinical_micro?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.clinical_micro?.Apr ?? 0) + parseFloat(data?.clinical_micro?.May ?? 0) + parseFloat(data?.clinical_micro?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.clinical_micro?.Jul ?? 0) + parseFloat(data?.clinical_micro?.Aug ?? 0) + parseFloat(data?.clinical_micro?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.clinical_micro?.Oct ?? 0) + parseFloat(data?.clinical_micro?.Nov ?? 0) + parseFloat(data?.clinical_micro?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.clinical_micro?.Jan ?? 0) + parseFloat(data?.clinical_micro?.Feb ?? 0) + parseFloat(data?.clinical_micro?.Mar ?? 0) +
                         parseFloat(data?.clinical_micro?.Apr ?? 0) + parseFloat(data?.clinical_micro?.May ?? 0) + parseFloat(data?.clinical_micro?.Jun ?? 0) + 
                         parseFloat(data?.clinical_micro?.Jul ?? 0) + parseFloat(data?.clinical_micro?.Aug ?? 0) + parseFloat(data?.clinical_micro?.Sep ?? 0) + 
                         parseFloat(data?.clinical_micro?.Oct ?? 0) + parseFloat(data?.clinical_micro?.Nov ?? 0) + parseFloat(data?.clinical_micro?.Dec ?? 0)).toFixed(2),
                }
                result.push(clinical_micro)
                let hematology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Hematology",
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
                  q1: (parseFloat(data?.hematology?.Jan ?? 0) + parseFloat(data?.hematology?.Feb ?? 0) + parseFloat(data?.hematology?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.hematology?.Apr ?? 0) + parseFloat(data?.hematology?.May ?? 0) + parseFloat(data?.hematology?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.hematology?.Jul ?? 0) + parseFloat(data?.hematology?.Aug ?? 0) + parseFloat(data?.hematology?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.hematology?.Oct ?? 0) + parseFloat(data?.hematology?.Nov ?? 0) + parseFloat(data?.hematology?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.hematology?.Jan ?? 0) + parseFloat(data?.hematology?.Feb ?? 0) + parseFloat(data?.hematology?.Mar ?? 0) +
                         parseFloat(data?.hematology?.Apr ?? 0) + parseFloat(data?.hematology?.May ?? 0) + parseFloat(data?.hematology?.Jun ?? 0) + 
                         parseFloat(data?.hematology?.Jul ?? 0) + parseFloat(data?.hematology?.Aug ?? 0) + parseFloat(data?.hematology?.Sep ?? 0) + 
                         parseFloat(data?.hematology?.Oct ?? 0) + parseFloat(data?.hematology?.Nov ?? 0) + parseFloat(data?.hematology?.Dec ?? 0)).toFixed(2),
                }
                result.push(hematology)
                let chemistry = {
                  strategy: "Laboratory Statistics",
                  overall_census: "chemistry",
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
                  q1: (parseFloat(data?.chemistry?.Jan ?? 0) + parseFloat(data?.chemistry?.Feb ?? 0) + parseFloat(data?.chemistry?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.chemistry?.Apr ?? 0) + parseFloat(data?.chemistry?.May ?? 0) + parseFloat(data?.chemistry?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.chemistry?.Jul ?? 0) + parseFloat(data?.chemistry?.Aug ?? 0) + parseFloat(data?.chemistry?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.chemistry?.Oct ?? 0) + parseFloat(data?.chemistry?.Nov ?? 0) + parseFloat(data?.chemistry?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.chemistry?.Jan ?? 0) + parseFloat(data?.chemistry?.Feb ?? 0) + parseFloat(data?.chemistry?.Mar ?? 0) +
                         parseFloat(data?.chemistry?.Apr ?? 0) + parseFloat(data?.chemistry?.May ?? 0) + parseFloat(data?.chemistry?.Jun ?? 0) + 
                         parseFloat(data?.chemistry?.Jul ?? 0) + parseFloat(data?.chemistry?.Aug ?? 0) + parseFloat(data?.chemistry?.Sep ?? 0) + 
                         parseFloat(data?.chemistry?.Oct ?? 0) + parseFloat(data?.chemistry?.Nov ?? 0) + parseFloat(data?.chemistry?.Dec ?? 0)).toFixed(2),
                }
                result.push(chemistry)
                let serology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "serology",
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
                  q1: (parseFloat(data?.serology?.Jan ?? 0) + parseFloat(data?.serology?.Feb ?? 0) + parseFloat(data?.serology?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.serology?.Apr ?? 0) + parseFloat(data?.serology?.May ?? 0) + parseFloat(data?.serology?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.serology?.Jul ?? 0) + parseFloat(data?.serology?.Aug ?? 0) + parseFloat(data?.serology?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.serology?.Oct ?? 0) + parseFloat(data?.serology?.Nov ?? 0) + parseFloat(data?.serology?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.serology?.Jan ?? 0) + parseFloat(data?.serology?.Feb ?? 0) + parseFloat(data?.serology?.Mar ?? 0) +
                         parseFloat(data?.serology?.Apr ?? 0) + parseFloat(data?.serology?.May ?? 0) + parseFloat(data?.serology?.Jun ?? 0) + 
                         parseFloat(data?.serology?.Jul ?? 0) + parseFloat(data?.serology?.Aug ?? 0) + parseFloat(data?.serology?.Sep ?? 0) + 
                         parseFloat(data?.serology?.Oct ?? 0) + parseFloat(data?.serology?.Nov ?? 0) + parseFloat(data?.serology?.Dec ?? 0)).toFixed(2),
                }
                result.push(serology)
                let microbiology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Microbiology",
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
                  q1: (parseFloat(data?.microbiology?.Jan ?? 0) + parseFloat(data?.microbiology?.Feb ?? 0) + parseFloat(data?.microbiology?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.microbiology?.Apr ?? 0) + parseFloat(data?.microbiology?.May ?? 0) + parseFloat(data?.microbiology?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.microbiology?.Jul ?? 0) + parseFloat(data?.microbiology?.Aug ?? 0) + parseFloat(data?.microbiology?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.microbiology?.Oct ?? 0) + parseFloat(data?.microbiology?.Nov ?? 0) + parseFloat(data?.microbiology?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.microbiology?.Jan ?? 0) + parseFloat(data?.microbiology?.Feb ?? 0) + parseFloat(data?.microbiology?.Mar ?? 0) +
                         parseFloat(data?.microbiology?.Apr ?? 0) + parseFloat(data?.microbiology?.May ?? 0) + parseFloat(data?.microbiology?.Jun ?? 0) + 
                         parseFloat(data?.microbiology?.Jul ?? 0) + parseFloat(data?.microbiology?.Aug ?? 0) + parseFloat(data?.microbiology?.Sep ?? 0) + 
                         parseFloat(data?.microbiology?.Oct ?? 0) + parseFloat(data?.microbiology?.Nov ?? 0) + parseFloat(data?.microbiology?.Dec ?? 0)).toFixed(2),
                }
                result.push(microbiology)
                let histopathology = {
                  strategy: "Laboratory Statistics",
                  overall_census: "Histopathology",
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
                  q1: (parseFloat(data?.histopathology?.Jan ?? 0) + parseFloat(data?.histopathology?.Feb ?? 0) + parseFloat(data?.histopathology?.Mar ?? 0)).toFixed(2),//Jan Feb March
                  q2: (parseFloat(data?.histopathology?.Apr ?? 0) + parseFloat(data?.histopathology?.May ?? 0) + parseFloat(data?.histopathology?.Jun ?? 0)).toFixed(2),//Apr May Jun
                  q3: (parseFloat(data?.histopathology?.Jul ?? 0) + parseFloat(data?.histopathology?.Aug ?? 0) + parseFloat(data?.histopathology?.Sep ?? 0)).toFixed(2),//Jul Aug Sep
                  q4: (parseFloat(data?.histopathology?.Oct ?? 0) + parseFloat(data?.histopathology?.Nov ?? 0) + parseFloat(data?.histopathology?.Dec ?? 0)).toFixed(2),//Oct Nov Dec
                  total: (parseFloat(data?.histopathology?.Jan ?? 0) + parseFloat(data?.histopathology?.Feb ?? 0) + parseFloat(data?.histopathology?.Mar ?? 0) +
                         parseFloat(data?.histopathology?.Apr ?? 0) + parseFloat(data?.histopathology?.May ?? 0) + parseFloat(data?.histopathology?.Jun ?? 0) + 
                         parseFloat(data?.histopathology?.Jul ?? 0) + parseFloat(data?.histopathology?.Aug ?? 0) + parseFloat(data?.histopathology?.Sep ?? 0) + 
                         parseFloat(data?.histopathology?.Oct ?? 0) + parseFloat(data?.histopathology?.Nov ?? 0) + parseFloat(data?.histopathology?.Dec ?? 0)).toFixed(2),
                }
                result.push(histopathology)

                setReport(result.map((data) => {
                  return {
                    strategy: data.strategy,
                    overall_census: data.overall_census,
                    jan: data.jan == null ? 0 : parseInt(data.jan),
                    feb: data.feb == null ? 0 : parseInt(data.feb),
                    mar: data.mar == null ? 0 : parseInt(data.mar), 
                    apr: data.apr == null ? 0 : parseInt(data.apr),
                    may: data.may == null ? 0 : parseInt(data.may),
                    jun: data.jun == null ? 0 : parseInt(data.jun),
                    jul: data.jul == null ? 0 : parseInt(data.jul),
                    aug: data.aug == null ? 0 : parseInt(data.aug),
                    sep: data.sep == null ? 0 : parseInt(data.sep),
                    oct: data.oct == null ? 0 : parseInt(data.oct),
                    nov: data.nov == null ? 0 : parseInt(data.nov),
                    dec: data.dec == null ? 0 : parseInt(data.dec),
                    q1: data.q1 == NaN ? 0 : data.q1,
                    q2: data.q1 == NaN ? 0 : data.q2,
                    q3: data.q3 == NaN ? 0 : data.q3,
                    q4: data.q4 == NaN ? 0 : data.q4,
                    total: data.total
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

    function generateReport(){
      var annual = report
      const XLSX = require('sheetjs-style');
      const worksheet = XLSX.utils.json_to_sheet([{},...annual])
      
      XLSX.utils.sheet_add_aoa(worksheet, 
        [["QR DIAGNOSTICS","", "", 
        "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", ""]], { origin: "A1" });
      XLSX.utils.sheet_add_aoa(worksheet, 
        [["STRATEGY", "OVERALLCENSUS",  
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "Q1","Q2","Q3","Q4","TOTAL"]], { origin: "A2" });

      const cells = ['A1','A2','B2','C2','D2','E2','F2','G2','H2','I2','J2','K2','L2','M2','N2','O2', "P2", "Q2", "R2", "S2"]
     
      const workbook = XLSX.utils.book_new();
      for(var i = 0; i<cells.length;i++){
       if(cells[i] === 'A1'){
        worksheet[cells[i]].s = {
          font: {
            sz:30,
            shadow:true,
            bold: true,
            color: {
              rgb: "BFBC4B"
            }
          },
        };
       }
       else{
        worksheet[cells[i]].s = {
          font: {
            sz:12,
            bold: true,
            color: {
              rgb: "419EA3"
            },
          },
        };
      }
    }

      var wscols = [
        { width: 40 },  // first column
        { width: 35}
      ];

      const merge = [
        { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
        { s: { r: 4, c: 0 }, e: { r: 11, c: 0 } },
        { s: { r: 12, c: 0 }, e: { r: 13, c: 0 } },
        { s: { r: 14, c: 0 }, e: { r: 22, c: 0 } },
      ];
      worksheet["!merges"] = merge;
      worksheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workbook, worksheet, "Annual Report" + new Date().getFullYear());
      XLSX.writeFile(workbook, "QRDiagnosticsAnnualReport"+new Date().toLocaleDateString()+".xlsx");
  }

  

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
            isAnnual={true}
            handler={generateReport}
            tableHeadersKey = {[
              {label: 'STRATEGY', key: "strategy"},
              {label: 'OVERALL CENSUS', key: "overall_census"},
              {label: 'JAN', key: "jan"},
              {label: 'FEB', key: "feb"},
              {label: 'MAR', key: "mar"},
              {label: 'APR', key: "apr"},
              {label: 'MAY', key: "may"},
              {label: 'JUN', key: "jun"},
              {label: 'JUL', key: "jul"},
              {label: 'AUG', key: "aug"},
              {label: 'SEP', key: "sep"},
              {label: 'OCT', key: "oct"},
              {label: 'NOV', key: "nov"},
              {label: 'DEC', key: "dec"},
              {label: 'Q1', key: "q1"},
              {label: 'Q2', key: "q2"},
              {label: 'Q3', key: "q3"},
              {label: 'Q4', key: "q4"},
              {label: 'TOTAL', key: "total"},
            ]}
            tableHeaders={[
              'STRATEGY',
              'OVERALL CENSUS',
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
              'DEC',
              "Q1",
              "Q2",
              "Q3",
              "Q4",
              "TOTAL"
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
              'OVERALL CENSUS',
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
              'DEC',
              "Q1",
              "Q2",
              "Q3",
              "Q4",
              "TOTAL"
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
