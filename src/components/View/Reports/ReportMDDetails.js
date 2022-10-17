import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import { Navigate, useParams } from 'react-router-dom';

const userToken = getToken();
const userId = getUser();

var pastDate = new Date('2022-06-30');
var formattedPastData = pastDate.toISOString().split('T')[0];
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: formattedPastData,
    to_date: formattedPresentData,
    done: false,
  };

function ReportMDDetails() {
  
  document.body.style = 'background: white;';
  const [total,setTotal] = useState(0);
  const {name, lab, dateFrom, dateTo} = useParams();
  const [redirectBack, setRedirectBack] = useState(false);
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [particulars, setParticulars] = useState([]);

  console.log(useParams())

  React.useEffect(() => {
    axios({
      method: 'get',
      url: window.$link + 'reports/md_details',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          date_from: format(new Date(filteredData.from_date), 'MM/dd/yyyy'),
          date_to: format(new Date(filteredData.to_date), 'MM/dd/yyyy'),
          category_id: lab,
          md:name,
          requester: userId,

      }
    }).then(function (response) {
      var output = [];
      var array = response.data.data.data;
         array.forEach(function(item, index) {
             var existing = output.filter(function(v, i) {
                 var vDate = v.booking_date.split(" ");
                 var iDate = item.booking_date.split(" ");
          
                 return vDate[0] == iDate[0];
             });
  
             if (existing.length) {
                 var existingIndex = output.indexOf(existing[0]);
                 output[existingIndex].lab_test = output[existingIndex].lab_test.concat(item.lab_test);
                 output[existingIndex].amount = output[existingIndex].amount.concat(item.amount);
             } else {
             if (typeof item.lab_test == 'string'){
                item.lab_test= [item.lab_test];
                item.amount = [item.amount]
             }
             output.push(item);
             }
            }) 
  
         setParticulars(output)
    }).then(function(error) {
      console.log(error);
    });
  },[]);
  
  function filter() {}

  if(redirectBack === true) {
      if(dateFrom !== undefined && dateTo !== undefined) {
          var link =  "/reports-md/" + dateFrom + "/" + dateTo;
          return (
              <Navigate to ={link}/>
          )
      } else {
        var link =  "/reports-md";
          return (
              <Navigate to ={link}/>
          )
      }
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header 
            type="thick" 
            title="MD REPORT DETAILS" 
            tableName={'MD Details Report'}
             />

          <div className='particulars-cont'>
          {particulars.length != 0 && (
                        <div className='label'>PARTICULARS</div>
                    )}
                    {particulars.map((data,index) => {

                      var date = new Date(data.booking_date);
                      var formattedDate = date.toDateString().split(" ");
                      
                      var temp_total = 0

                      {data.amount.map((amount, index) => {
                        temp_total += parseFloat(amount);
                      })}

                      console.log(temp_total)

                      return (
                      <div className="row">
                          <div className="col-sm-2">
                              <div className='particulars'>{formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}</div>
                          </div>
                          <div className="col-sm-2">
                              <div className='detail'>
                              {data.lab_test.map((lab, index) => {
                                if(data.lab_test.length - 1 != index) {
                                  return <>
                                  {lab} <br/>
                                 </>
                                } else {
                                  return lab 
                                }
                                <br/>
                              })}
                              </div>
                          </div>
                          <div className="col-sm-2">
                              <div className='detail'>
                              {data.amount.map((amount, index) => {
                                if(data.amount.length - 1 != index) {
                                  return <>
                                  P {amount} <br/>
                                  </>
                                } 
                                else {
                                  return "P " + amount 
                                }
                              })}
                              </div>
                          </div>
                          <div className="col-sm-4">
                              <div className='detail'>
                                  P {parseFloat(temp_total).toFixed(2)}
                              </div>
                          </div>
                      </div>
                      )
                    })}
          </div>

          <ToastContainer hideProgressBar={true} />
        </Fragment>
        <div className='d-flex justify-content-end back-btn-container'>
            <button className='back-btn' onClick={() => setRedirectBack(true)}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default ReportMDDetails;
