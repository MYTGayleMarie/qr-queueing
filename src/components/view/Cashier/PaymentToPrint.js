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
        const bookDate = new Date(this.props.bookingDate);
        const birthDate = new Date(this.props.birthdate);

        var formattedBookDate = bookDate.toDateString().split(' ');
        var formattedBirthDate = birthDate.toDateString().split(' ');


        var groupedServices = groupArrayOfObjects(this.props.services,"key");

        const services = Object.keys(groupedServices).map(function(key) {

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

            return <tr>
                        <td><span className="data">{category_name}</span></td>
                        <td><span className="data">{category_services}</span></td>
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
                        <span className="to-right">#{this.props.queue} Request Form</span>
                    </div>
                    <div className='row'>
                    <h1 className='table-header'>Customer Details</h1>
                    <table>
                        <tr>
                            <td><span className="header">Patient ID</span><span className="detail">{this.props.patientId}</span></td>
                            <td><span className="header">Name</span><span className="detail">{this.props.name}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Date of Birth</span><span className="detail">{formattedBirthDate[1] + ' ' + formattedBirthDate[2] + ' ' + formattedBirthDate[3]}</span> </td>
                            <td><span className="header">Booking Date</span><span className="detail">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Age</span><span className="detail">{this.props.age}</span></td>
                            <td><span className="header">Gender</span><span className="detail">{this.props.gender}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Contact</span><span className="detail">{this.props.contact}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Address</span><span className="detail">{this.props.address}</span></td>
                            <td><span className="header">Attending Physician</span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <h1 className='table-header'>Laboratory</h1>
                        <table>
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services}
                        </table>
                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <span className='header'><b>Payment:</b></span>
                                <span className='data'> {this.props.payment}</span>
                            </div>
                            <div className='col-sm-4'>
                                <span className='header'><b>Result:</b></span>
                                <span className='data'> {this.props.result}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right">#{this.props.queue} Request Form</span>
                    </div>
                    <div className='row'>
                    <h1 className='table-header'>Customer Details</h1>
                    <table>
                        <tr>
                            <td><span className="header">Patient ID</span><span className="detail">{this.props.patientId}</span></td>
                            <td><span className="header">Name</span><span className="detail">{this.props.name}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Date of Birth</span><span className="detail">{formattedBirthDate[1] + ' ' + formattedBirthDate[2] + ' ' + formattedBirthDate[3]}</span> </td>
                            <td><span className="header">Booking Date</span><span className="detail">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Age</span><span className="detail">{this.props.age}</span></td>
                            <td><span className="header">Gender</span><span className="detail">{this.props.gender}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Contact</span><span className="detail">{this.props.contact}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Address</span><span className="detail">{this.props.address}</span></td>
                            <td><span className="header">Attending Physician</span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <h1 className='table-header'>Laboratory</h1>
                        <table>
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services}
                        </table>
                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <span className='header'><b>Payment:</b></span>
                                <span className='data'> {this.props.payment}</span>
                            </div>
                            <div className='col-sm-4'>
                                <span className='header'><b>Result:</b></span>
                                <span className='data'> {this.props.result}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="print-row">
            <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right">#{this.props.queue} Request Form</span>
                    </div>
                    <div className='row'>
                    <h1 className='table-header'>Customer Details</h1>
                    <table>
                        <tr>
                            <td><span className="header">Patient ID</span><span className="detail">{this.props.patientId}</span></td>
                            <td><span className="header">Name</span><span className="detail">{this.props.name}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Date of Birth</span><span className="detail">{formattedBirthDate[1] + ' ' + formattedBirthDate[2] + ' ' + formattedBirthDate[3]}</span> </td>
                            <td><span className="header">Booking Date</span><span className="detail">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Age</span><span className="detail">{this.props.age}</span></td>
                            <td><span className="header">Gender</span><span className="detail">{this.props.gender}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Contact</span><span className="detail">{this.props.contact}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Address</span><span className="detail">{this.props.address}</span></td>
                            <td><span className="header">Attending Physician</span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <h1 className='table-header'>Laboratory</h1>
                        <table>
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services}
                        </table>
                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <span className='header'><b>Payment:</b></span>
                                <span className='data'> {this.props.payment}</span>
                            </div>
                            <div className='col-sm-4'>
                                <span className='header'><b>Result:</b></span>
                                <span className='data'> {this.props.result}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="print-column">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="payment-logo"></img>
                        <span className="to-right">#{this.props.queue} Request Form</span>
                    </div>
                    <div className='row'>
                    <h1 className='table-header'>Customer Details</h1>
                    <table>
                        <tr>
                            <td><span className="header">Patient ID</span><span className="detail">{this.props.patientId}</span></td>
                            <td><span className="header">Name</span><span className="detail">{this.props.name}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Date of Birth</span><span className="detail">{formattedBirthDate[1] + ' ' + formattedBirthDate[2] + ' ' + formattedBirthDate[3]}</span> </td>
                            <td><span className="header">Booking Date</span><span className="detail">{formattedBookDate[1] + ' ' + formattedBookDate[2] + ' ' + formattedBookDate[3] + ' ' + getTime(bookDate)}</span> </td>
                        </tr>
                        <tr>
                            <td><span className="header">Age</span><span className="detail">{this.props.age}</span></td>
                            <td><span className="header">Gender</span><span className="detail">{this.props.gender}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Contact</span><span className="detail">{this.props.contact}</span></td>
                        </tr>
                        <tr>
                            <td><span className="header">Address</span><span className="detail">{this.props.address}</span></td>
                            <td><span className="header">Attending Physician</span></td>
                        </tr>
                    </table>
                    </div>

                    <div className="line"></div>  

                    <div className='row'>
                        <h1 className='table-header'>Laboratory</h1>
                        <table>
                            <tr>
                                <th><span className="header">Section Head</span></th>
                                <th><span className="header">Services</span></th>
                            </tr>
                            {services}
                        </table>
                    </div>

                    <div className='row'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <span className='header'><b>Payment:</b></span>
                                <span className='data'> {this.props.payment}</span>
                            </div>
                            <div className='col-sm-4'>
                                <span className='header'><b>Result:</b></span>
                                <span className='data'> {this.props.result}</span>
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



