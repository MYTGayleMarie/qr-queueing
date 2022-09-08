import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';
import { getTime } from '../../../utilities/Common';

//logo image
import logo from '../../../images/logo-black.png';

//components
import Table from '../../Table.js';

//css
import './InvoicePrint.css';


export class InvoiceToPrint extends React.PureComponent {
    render() {

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
        <img src={logo} alt={'logo'} class="invoice-logo"></img>

        <div className="invoice-cont">
            <table>
                <tr>
                    <td className="add-td-gap">
                        <span className='label'>COMPANY NAME </span>
                    </td>
                    <td>
                        <span className=''> {this.props.name}</span>
                    </td>
                </tr>
            </table>
            <table>
                <td className='label-fill'>
                    <span className='label'>CONTACT NUMBER</span>
                </td>
                <td className='label-fill'>
                    <span className='detail'>{this.props.contactNo}</span>
                </td>
            </table>
            <table>
                <td className='label-fill'>
                    <span className='label'>COMPANY EMAIL</span>
                </td>
                <td className='label-fill'>
                    <span className='detail'>{this.props.email}</span>
                </td>
            </table>
            <table>
                <td className='label-fill'>
                    <span className='label'>COMPANY ADDRESS</span>
                </td>
                <td className='label-fill'>
                    <span className='detail'>{this.props.address}</span>
                </td>
            </table>
            <table>
                <td className='label-fill'>
                    <span className='label'>CONTACT PERSON</span>
                </td>
                <td className='label-fill'>
                    <span className='detail'>{this.props.contactPerson}</span>
                </td>
            </table>
            <div className="invoice-line"/>
        </div>
            <div className="invoice-table-cont">
                <Table
                    type={'payment-invoices'}
                    tableData={this.props.invoices}
                    rowsPerPage={4}
                    headingColumns={['INVOICE DATE','DISCOUNT CODE', 'PRICE','QTY', 'TOTAL']}
                    givenClass={'company-mobile'}
                    // setChecked={setChecked}
                />
            </div>   
            <div className="invoice-footer">
                        <span className="received-from-label"> PREPARED BY <span className="not-bold">{this.props.user}</span></span><br/>
                        <span className="received-from-label"> RECEIVED BY ________________________</span><br/>
                        <br/>
            </div>   
        </div>        
        
      );
    }
}
