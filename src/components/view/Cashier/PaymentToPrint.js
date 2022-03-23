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

        console.log(this.props.queue);
        console.log(this.props);
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
        
            return  <tr>
                        {category_name == "XRAY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "CARDIOLOGY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "RADIOLOGY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
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
        
            return  <tr>
                        {category_name == "HEMATOLOGY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "CHEMISTRY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "ELECTROLYTES (NAKCL, ICA)" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        
                        {category_name == "LIPID PROFILE" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "GLUCOSE TEST" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "KIDNEY FUNCTION TESTS" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
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
        
            return  <tr>
                        {category_name == "SEROLOGY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "IMMUNOLOGY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                        {category_name == "THYROID FLOW" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                         {category_name == "TUMOR MARKERS" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

        const services_Clinical = Object.keys(groupedServices).map(function(key) {
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
        
            return  <tr>
                        {category_name == "CLINICAL MICROSCOPY" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
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
        
            return  <tr>
                        {category_name == "OTHER TESTS" &&
                          <>
                             <td><span className="data">{category_name}</span></td>
                             <td><span className="data">{category_services}</span></td>
                          </>
                        }
                    </tr>
        });

      

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
            <div className="print-row">
            <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className="to-right-test request-header-test">XRAY-ECG</span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_XRAY}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div>
                </div>
                <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className = "to-right-test request-header-test"> HEMA-CHEM </span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_Hematology}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div>
                </div>
            </div>

            <div className="print-row">
            <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className="to-right-test request-header-test">SEROLOGY</span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_Serology}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div>
                </div>
                <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className="to-right-test request-header-test">OTHERS</span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_Others}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div>
                </div>
            </div>
            <div className="print-row">
                <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className="to-right-test request-header-test">CLINIC</span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_Clinical}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div>
                </div>
                <div className="print-column-blank">
                    {/* <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right request-header">#{this.props.queue} Request Form - Paitient ID:{this.props.patientId}</span>
                        <span className="to-right-test request-header-test">OTHERS</span>
                    </div>
                    <div className='row'>
                    <table>
                        <tr>
                            <td className="print-data-header"><span className="header">Booking Date: </span><span className="detail-print">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span></td>
                            <td><span className="header">Name: </span><span className="detail-print">{this.props.name}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">DOB: </span><span className="detail-print">{parseInt(birthDate.getMonth()+1) + "-" + birthDate.getDate() + "-" + birthDate.getFullYear() + " "}</span> </td>
                            <td><span className="header">Age: </span><span className="detail-print">{this.props.age}</span></td>
                            <td><span className="header">Gender:</span><span className="detail-print detail-gender">{this.props.gender == "female" ? "F" : "M"}</span></td>
                            <td className="print-data-contact"><span className="header">Contact: </span><span className="detail-print">{this.props.contact}</span></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><span className="header">Email: </span><span className="detail-print">{this.props.email == null ? "NONE" : this.props.email} </span></td>
                            <td><span className="header">Address: </span><span className="detail-print">{this.props.address}</span></td>
                        </tr >
                        <tr>
                            <td><span className="header">Physician: </span><span className="detail-print">{this.props.referral == null ? "NONE" : this.props.referral} </span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <table className="services-table">
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services_Others}
                        </table>
                    </div>

                    <table className='footer'>
                        <tr className='row'>
                            <td>
                                <span className='footer-header'><b>Payment:</b></span>
                                <span className='data'>{this.props.isCompany == true ? " CORPORATE ACCOUNT" : this.props.payment}</span>
                            </td>
                            <td>
                                <span className='footer-header'><b>Result:</b></span>
                                <span className='data'> {this.props.result.toUpperCase()}</span>
                            </td>
                        </tr>
                    </table>
                    <div className='row'>
                            <span className="encoded-on">Encoded on: {formattedEncodedDate[1] + ' ' + formattedEncodedDate[2] + ', ' + getTime(encodedDate)}</span>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    
      );
    }
}



