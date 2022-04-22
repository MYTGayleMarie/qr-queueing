import React, { useState, useRef } from "react";
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
        const bookDate = new Date(this.props.bookingDate);
        const birthDate = new Date(this.props.birthdate);
        const encodedDate = new Date(this.props.encodedOn);

        var formattedBookDate = bookDate.toDateString().split(' ');
        var formattedBirthDate = birthDate.toDateString().split(' ');
        var formattedEncodedDate = encodedDate.toDateString().split(' ');


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
               category_name !== "KIDNEY FUNCTION TESTS") {
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
                category_name !== "COVID RAPID TESTS" ) {
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
                                <td><span className="header">Gender:</span><span className="detail-print detail-gender">{gender == "female" ? "F" : "M"}</span></td>
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
                                    <span className='data'>{(isCompany && discountCode) ? " CORPORATE ACCOUNT - "+ (discountCode) : " " + payment.toUpperCase()}</span>
                                </td>
                                <td>
                                    <span className='footer-header'><b>Result:</b></span>
                                    <span className='data'> {result.toUpperCase()}</span>
                                </td>
                            </tr>
                        </table>
                        <div className='row'>
                                <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
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

        </div>
    </div>
    
      );
    }
}



