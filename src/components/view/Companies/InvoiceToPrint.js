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
        <h4 className="invoice-header">COMPANY DETAILS</h4>
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
                <td>
                    <span className='label'>CONTACT NUMBER</span>
                </td>
                <td>
                    <span className='detail'>{this.props.contactNo}</span>
                </td>
            </table>
            <table>
                <td>
                    <span className='label'>COMPANY EMAIL</span>
                </td>
                <td>
                    <span className='detail'>{this.props.email}</span>
                </td>
            </table>
            <table>
                <td>
                    <span className='label'>COMPANY ADDRESS</span>
                </td>
                <td>
                    <span className='detail'>{this.props.address}</span>
                </td>
            </table>
            <table>
                <td>
                    <span className='label'>CONTACT PERSON</span>
                </td>
                <td>
                    <span className='detail'>{this.props.contactPerson}</span>
                </td>
            </table>
        </div>

        <div className="invoice-line"/>

        <h4 className="invoice-header invoice-sub-header">INVOICE DETAILS</h4>

            <div className="invoice-table-cont">
                <Table
                    type={'payment-invoices'}
                    tableData={this.props.invoices}
                    rowsPerPage={4}
                    headingColumns={['INVOICE NO.', 'DISCOUNT CODE', 'PRICE', 'TOTAL']}
                    givenClass={'company-mobile'}
                    // setChecked={setChecked}
                />
            </div>

            <div className="grand-total-invoice to-left">
                <table>
                    <td>
                        <span className="bold">GRAND TOTAL P </span>
                    </td>
                    <td>
                        {this.props.grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </table>
            </div>
        </div>
      );
    }
}
