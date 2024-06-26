import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import { Navigate, useParams } from 'react-router-dom';

const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };

function ReportCreditDetails() {
  
  document.body.style = 'background: white;';
  const {discount_code, dateFrom, dateTo} = useParams();
  const [redirectBack, setRedirectBack] = useState(false);
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [particulars, setParticulars] = useState([]);

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'bookings/getByDiscountCode',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          discount_code: discount_code,
          requester: userId,

      }
    }).then(function (response) {
      var output = [];
      var array = response.data.data.particulars;
         array.forEach(function(item, index) {
             var existing = output.filter(function(v, i) {
                 var vDate = v.booking_time.split(" ");
                 var iDate = item.booking_time.split(" ");
          
                 return vDate[0] == iDate[0];
             });
  
             if (existing.length) {
                 var existingIndex = output.indexOf(existing[0]);
                 output[existingIndex].customer = output[existingIndex].customer.concat(item.customer);
                 output[existingIndex].doctors_referral = output[existingIndex].doctors_referral.concat(item.doctors_referal);
             } else {
             if (typeof item.customer == 'string'){
                item.customer = [item.customer];
                item.doctors_referral = [item.doctors_referral]
             }
             output.push(item);
             }
         });
  
         setParticulars(output)
    }).then(function(error) {
      console.log(error);
    });
  },[]);

  

  function filter() {}

  if(redirectBack === true) {
      if(dateFrom !== undefined && dateTo !== undefined) {
          var link =  "/reports-credit/" + dateFrom + "/" + dateTo;
          return (
              <Navigate to ={link}/>
          )
      } else {
        var link =  "/reports-credit";
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
            title="CREDIT REPORT DETAILS" 
            tableName={'Pending Purchase Order Report'}
            withBack={true}
            setBack={setRedirectBack}
             />

          <div className='particulars-cont'>
          {particulars.length != 0 && (
                        <div className='label'>PARTICULARS</div>
                    )}
                    {particulars.map((data,index) => {

                      var date = new Date(data.booking_time);
                      var formattedDate = date.toDateString().split(" ");

                      return (
                      <div className="row">
                          <div className="col-sm-2">
                              <div className='particulars'>{formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}</div>
                          </div>
                          <div className="col-sm-4">
                              <div className='detail'>
                              {data.customer.map((customer, index) => {
                                if(data.customer.length - 1 != index) {
                                  return <>
                                  {customer} <br/>
                                 </>
                                } else {
                                  return customer 
                                }
                                <br/>
                              })}
                              </div>
                          </div>
                          <div className="col-sm-4">
                              <div className='detail'>
                              {data.doctors_referral.map((doctors, index) => {
                                if(data.doctors_referral.length - 1 != index) {
                                  return <>
                                   {doctors} <br/>
                                  </>
                                } 
                                else {
                                  return doctors 
                                }
                              })}
                              </div>
                          </div>
                      </div>
                      )
                    })}
          </div>

          <ToastContainer hideProgressBar={true} />
        </Fragment>
       
      </div>
    </div>
  );
}

export default ReportCreditDetails;
