import React, {Component} from 'react'
import {render} from 'react-dom'
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';
import { getTime } from '../../../utilities/Common';

import './PaymentToPrint.css';

//logo image
import logo from '../../../images/logo-black.png';

function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


export class PaymentToPrint extends React.PureComponent {
    render() {
        const presentDate = new Date();
        const curTime = presentDate.getHours() + ':' + presentDate.getMinutes();
        const today = presentDate.toDateString().split(' ')

        const bookDate = new Date(this.props.bookingDate);
        const birthDate = new Date(this.props.birthdate);
        const encodedDate = new Date(this.props.encodedOn);

        var formattedBookDate = bookDate.toDateString().split(' ');
        var formattedBirthDate = birthDate.toDateString().split(' ');
        var formattedEncodedDate = encodedDate.toDateString().split(' ');

        var date = new Date();
        var formattedDate = date.toDateString().split(" ");
        var dateTime = formattedDate[1]+" "+formattedDate[2]+" "+formattedDate[3]+" "+getTime(presentDate)

       
        var groupedServices = groupArrayOfObjects(this.props.services,"key");


        const services_XRAY = Object.keys(groupedServices).map(function(key) {
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";
            
            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "XRAY" &&
               category_name !== "CARDIOLOGY" &&
               category_name !== "RADIOLOGY" ) {
                return ""
            }
        
            return  <tr>
                        {category_name == "XRAY" && 
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "CARDIOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "RADIOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        const services_Hematology = Object.keys(groupedServices).map(function(key) {
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";

            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "HEMATOLOGY") {
                return ""
            }
        
            return  <tr>
                        {category_name == "HEMATOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        const services_Serology = Object.keys(groupedServices).map(function(key) {
            
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";

            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "SEROLOGY" &&
               category_name !== "IMMUNOLOGY" &&
               category_name !== "THYROID PROFILE" &&
               category_name !== "TUMOR MARKERS" &&
               category_name !== "HEPATITIS PROFILE SCREENING" && 
               category_name !== "CHEMISTRY" && 
               category_name !== "ELECTROLYTES" &&
               category_name !== "LIPID PROFILE" && 
               category_name !== "GLUCOSE TESTS" &&
               category_name !== "LIVER FUNCTION TESTS" &&
               category_name !== "KIDNEY FUNCTION TESTS" &&
               category_name !== "PANCREATIC TEST") {
                return ""
            }
            
        
            return  <tr>
                        {category_name == "SEROLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "IMMUNOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "THYROID PROFILE" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "TUMOR MARKERS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "HEPATITIS PROFILE SCREENING" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "CHEMISTRY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "ELECTROLYTES" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        
                        {category_name == "LIPID PROFILE" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "GLUCOSE TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "LIVER FUNCTION TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "KIDNEY FUNCTION TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "PANCREATIC TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        const services_Clinical_Urinalysis = Object.keys(groupedServices).map(function(key) {
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";

            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "CLINICAL MICROSCOPY URINALYSIS") {
                return ""
            }
        
            return  <tr>
                        {category_name == "CLINICAL MICROSCOPY URINALYSIS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        const services_Clinical_Fecalysis = Object.keys(groupedServices).map(function(key) {
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";

            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "CLINICAL MICROSCOPY FECALYSIS") {
                return ""
            }
        
            return  <tr>
                {category_name == "CLINICAL MICROSCOPY FECALYSIS" &&
                    <>
                        <td><span className="data">{category_services}</span></td>
                    </>
                }
            </tr>
        });



        const services_Others = Object.keys(groupedServices).map(function(key) {
            var category_name = key.replace(/_/g, " ").toUpperCase();
            var category_services = "";

            groupedServices[key].map((info, index) => {
                if(groupedServices[key].length - 1 == index) {
                    category_services += info.name; 
                }
                else {
                    category_services += info.name + ", ";
                }
            });

            if(category_name !== "OTHER TESTS" && 
                category_name !== "MICROBIOLOGY" &&
                category_name !== "HISTOPATHOLOGY" &&
                category_name !== "COVID RAPID TESTS" &&
                category_name !== "ULTRASOUND") {
                return ""
            }
        
            return  <tr>
                        {category_name == "OTHER TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "MICROBIOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "HISTOPATHOLOGY" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "COVID RAPID TESTS" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "ULTRASOUND" &&
                          <>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        function generateTickets(
            queue,
            patientId,
            name,
            age,
            gender,
            contact,
            email,
            address,
            referral,
            isCompany,
            payment,
            result,
            serviceName, 
            services,
            discountCode) {

            return (
                <div className="print-column"> 
                        <div class="d-flex justify-content-left">
                            <img src={logo} alt={'logo'} class="payment-logo"></img>
                            <span className="to-right request-header">#{queue} Request Form - Patient ID:{patientId}</span>
                            <span className="to-right-test request-header-test">{serviceName}</span>
                        </div>
                        <div className='row'>
                        <table>
                            <tr>
                                <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                                <td><span className="header">Name: </span><span className="detail-print">{name}</span></td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                                <td><span className="header">Age: </span><span className="detail-print">{age}</span></td>
                                <td><span className="header">Gender:</span><span className="detail-print detail-gender">{gender.toLowerCase() == "female" ? "F" : "M"}</span></td>
                                <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{contact}</span></td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td><span className="header">Email: </span><span className="detail-print">{email == null ? "NONE" : email} </span></td>
                                <td><span className="header">Address: </span><span className="detail-print">{address}</span></td>
                            </tr >
                            <tr>
                                <td><span className="header">Physician: </span><span className="detail-print">{referral == null ? "NONE" : referral} </span></td>
                                <td><span className="header">Discount Code: </span><span className="detail-print">{discountCode ? discountCode : "None"}</span></td>
                            </tr>
                        </table>
                        <table> 
                            <tr>
                                <td><span className="header">Diagnosis: </span><span className="detail-print">______________________________________________________________________________</span></td>
                            </tr>
                        </table>
                        </div>
    
                        <div className="line"></div>  
    
                        <div className='row'>
                            <table className="services-table">
                                <tr>
                                    <th><span className="header">Services</span></th>
                                </tr>
                                {services}
                            </table>
                        </div>
    
                        <table className='footer'>
                            <tr className='row'>
                                <td>
                                    <span className='footer-header'><b>Payment:</b></span>
                                    <span className='data'>{(isCompany && discountCode) ? " CORPORATE ACCOUNT - "+ (discountCode) : (payment ? " " + payment.toUpperCase():" ")}</span>
                                </td>
                                <td>
                                    <span className='footer-header'><b>Result:</b></span>
                                    <span className='data'> {result.toUpperCase()}</span>
                                </td>
                            </tr>
                        </table>
                        <div className='row'>
                                <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                                <span className="encoded-on">Printed on: {today[1] + ' ' + today[2] + ', ' + today[3] + ', ' + curTime}</span>
                        </div>
                </div>
            )
        }

        const tickets = [
            {
                name: 'XRAY-ECG',
                services: services_XRAY
            },
            {
                name: 'OTHER TESTS',
                services: services_Others
            },
            {
                name: 'HEMO-BTY',
                services: services_Hematology
            },
            {
                name: 'CHEM-SERO',
                services: services_Serology
            },
            {
                name: 'CLINIC - URINALYSIS',
                services: services_Clinical_Urinalysis
            },
            {
                name: 'CLINIC - FECALYSIS',
                services: services_Clinical_Fecalysis
            }
        ];

        var finalTickets = [];
        var printTickets = [];
        
        //Filter array to non-empty services
        tickets.map((data) => {
            if(data.services !== "" && data.services.join("").length !== 0) {
                finalTickets.push(data);
            }
        });

        //Split tickets into 2 
        const chunkSize = 2;
        for (let i = 0; i < finalTickets.length; i += chunkSize) {
            const chunk = finalTickets.slice(i, i + chunkSize);
            printTickets.push(chunk);
        }

        const marginTop="10px"
        const marginRight="10px"
        const marginBottom="10px"
        const marginLeft="20px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
        };




      return (
        <div>
        <style>{getPageMargins()}</style>
        <div className="print-area">

            {
                printTickets.map((data) => {
                  return (
                      <div className="print-row">
                          {data.map((ticket) => {
                            //    console.log(this.props.discountCode);
                               return (
                                generateTickets(
                                this.props.queue,
                                this.props.patientId,
                                this.props.name,
                                this.props.age,
                                this.props.gender,
                                this.props.contact,
                                this.props.email,
                                this.props.address,
                                this.props.referral,
                                this.props.isCompany,
                                this.props.payment,
                                this.props.result,
                                ticket.name, 
                                ticket.services,
                                this.props.discountCode))
                          })}
                      </div>
                  )
                
                })
            }

            <br />
            
            <div className="row-column ">
              {/* Charge slip */}
            {this.props.discountCode&&<div className="m-0 charge-slip" id="charge-slip">
              <div class="d-flex justify-content-left">
                  <img src={logo} alt={'logo'} class="small-logo"></img>
                  <span className="to-right slip-span">Quest and Reliance Diagnostics</span>
                  <span className="to-right slip-span">09998886694</span>
                  <span className="to-right slip-span">Marasbaras Tacloban City</span>
              </div>
              <div className="row slip-header mb-2">
                <div className="row m-0 p-0">
                  {/* <h3 className="m-0 p-0 slip-title">Laboratory Details</h3> */}
                  <table className="slip-table">
                    <tr>
                      <td><span className="slip-label slip-span">Patient Name:</span><span className="slip-detail slip-span">{this.props.name}</span></td>
                      <td><span className="slip-label slip-span">Email:</span><span className="slip-detail slip-span">{this.props.email === "" ? "NONE" : this.props.email} </span></td>
                    </tr>
                  </table>          
                </div>
                <div className="row m-0 p-0">
                  <table className="slip-table">
                    <tr>
                      <td><span className="slip-label slip-span">Address:</span><span className="slip-detail slip-span">{this.props.address}</span></td>
                      <td><span className="slip-label slip-span">Contact No.:</span><span className="slip-detail slip-span">{this.props.contact}</span></td>
                    </tr>
                  </table> 
                </div>
                <div className="row m-0 p-0">
                  <table className="slip-table">
                    <tr>
                      <td><span className="slip-label slip-span">Transaction No.:</span><span className="slip-detail slip-span">{this.props.bookingID}</span></td>
                      <td><span className="slip-label slip-span">Date:</span><span className="slip-detail slip-span">{this.props.bookingDate}</span></td>
                    </tr>
                  </table> 
                </div>
                <div className="row m-0 p-0">
                  <table className="slip-table">
                    <tr>
                      <td><span className="slip-label slip-span">Physician(s):</span><span className="slip-detail slip-span">{this.props.referral||""}</span></td>
                      <td><span className="slip-label slip-span">Discount Code:</span><span className="slip-detail slip-span">{this.props.discountCode}</span></td>
                    </tr>
                  </table> 
                </div>
              </div>
          
              <div className="row charge-slip-table">
                <table>
                  <thead className="particulars">
                    <tr>
                      <th className="slip-detail slip-span">Particulars</th>
                      <th className="slip-detail slip-span">Qty</th>
                      <th className="slip-detail slip-span">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.labTests.map((data, index)=>
                      <tr>
                        <td className="slip-label slip-span">{data.name}</td>
                        <td className="slip-label slip-span">{data.qty}</td>
                        <td className="slip-label slip-span">P {parseFloat(data.price).toFixed(2)}</td>
                      </tr>
                    )}  
                    {this.props.packages.map((data, index)=>
                      <tr>
                        <td className="slip-label slip-span">{data.name}<br/><span className="slip-span">{data.details}</span></td>
                        <td className="slip-label slip-span">{data.qty}</td>
                        <td className="slip-label slip-span">P {parseFloat(data.price).toFixed(2)}</td>
                      </tr>
                    )}              
                    <tr>
                      <td></td>
                      <td className="slip-detail slip-span">Total:</td>
                      <td className="slip-detail slip-span">P {this.props.grandTotal}</td>
                    </tr>
                  </tbody>
                </table> 
              </div>
              <div className="row charge-slip-footer  mb-2">
                <table>
                  <tr>
                    <td className="slip-label slip-span" width="40%">Requested By:</td>
                    {/* <td className="slip-label">{requested_by}</td> */}
                    <td className="slip-label slip-span">Admin</td>
                  </tr>
                  <tr>
                    <td className="slip-label slip-span" >Prepared By:</td>
                    {/* <td className="slip-label">{prepared_by}</td> */}
                    <td className="slip-label slip-span">Admin</td>
                  </tr>
                  <tr>
                    <td className="slip-label slip-span" >Requested Time & Date:</td>
                    {/* <td className="slip-label">{request_time}</td> */}
                    <td className="slip-label slip-span">{dateTime}</td>
                  </tr>
                  <tr>
                    <td className="slip-label slip-span" >Received Time & Date:</td>
                    {/* <td className="slip-label">{received_time}</td> */}
                    <td className="slip-label slip-span">{dateTime}</td>
                  </tr>
                </table>
                <p  className="slip-label slip-span p-0 m-0">Outpatient Requisition Slip</p>
              </div>
            </div>}

            {/* Claim Stub */}
            <div className="claim-stub-container">
              <div className="claim-stub-outer">
                <div className="claim-stub-inner">
                  <div className="claim-stub-rotate"> 
                              <div class="d-flex justify-content-left">
                                  <img src={logo} alt={'logo'} class="small-logo"></img>
                                  <span className="to-right request-header slip-span">#{this.props.queue} CLAIM STUB - Patient ID:{this.props.patientId}</span>
                              </div>
                              <table>
                                  <tr>
                                      <td className="print-data-header"><span className="header slip-span">Booking Date: </span><span className="detail-print slip-span">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                                      <td><span className="header slip-span">Name: </span><span className="detail-print slip-span">{this.props.name}</span></td>
                                  </tr>
                              </table>
                              <table>
                                  <tr>
                                      <td><span className="header slip-span">DOB: </span><span className="detail-print slip-span">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                                      <td><span className="header slip-span">Age: </span><span className="detail-print slip-span">{this.props.age}</span></td>
                                      <td><span className="header slip-span">Gender:</span><span className="detail-print slip-span">{this.props.gender.toLowerCase() == "female" ? "F" : "M"}</span></td>
                                      <td className="print-data-contact"><span className="header slip-span">Contact: </span><span className="detail-print slip-span">{this.props.contact}</span></td>
                                  </tr>
                              </table>
                              <table>
                                  <tr>
                                      <td><span className="header slip-span">Email: </span><span className="detail-print slip-span">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                                      <td><span className="header slip-span">Address: </span><span className="detail-print slip-span">{this.props.address}</span></td>
                                  </tr >
                                  <tr>
                                      <td><span className="header slip-span">Physician: </span><span className="detail-print slip-span">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                                      <td><span className="header slip-span">Discount Code: </span><span className="detail-print slip-span">{this.props.discountCode ? this.props.discountCode : "None"}</span></td>
                                  </tr>
                                  <tr>
                                      <td><span className="header slip-span">GRAND TOTAL: </span><span className="detail-print slip-span">P {this.props.grandTotal}</span></td>
                                  </tr>
                              </table>
                              <div className='row'>
                                      <span className="encoded-on slip-span">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                                      <span className="encoded-on slip-span">Printed on: {today[1] + ' ' + today[2] + ', ' + today[3] + ', ' + curTime}</span>
                              </div>
                  
                  
                  
                  </div>
                </div>
              </div>          
            </div>
            </div>
        </div>
    </div>
    
      );
    }
}



