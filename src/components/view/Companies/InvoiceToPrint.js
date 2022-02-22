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
        <h4 className="form-categories-header italic">COMPANY DETAILS</h4>

        <div className="po-details">
            <div className="row">
                <div className="col-sm-2">
                    <div className='label'>COMPANY NAME</div>
                </div>
                <div className="col-sm-8">
                    <div className='detail'>{this.props.name}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <div className='label'>CONTACT NUMBER</div>
                </div>
                <div className="col-sm-4">
                    <div className='detail'>{this.props.contactNo}</div>
                </div>
                <div className="col-sm-2">
                    <div className='label'>COMPANY EMAIL</div>
                </div>
                <div className="col-sm-3">
                    <div className='detail'>{this.props.email}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <div className='label'>COMPANY ADDRESS</div>
                </div>
                <div className="col-sm-8">
                    <div className='detail'>{this.props.address}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <div className='label'>CONTACT PERSON</div>
                </div>
                <div className="col-sm-8">
                    <div className='detail'>{this.props.contactPerson}</div>
                </div>
            </div>
        </div>

        <h4 className="form-categories-header italic">INVOICES</h4>

        <Table
            type={'payment-invoices'}
            tableData={this.props.invoices}
            rowsPerPage={4}
            headingColumns={['INVOICE NO.', 'DISCOUNT CODE', 'PRICE', 'TOTAL']}
            givenClass={'company-mobile'}
            // setChecked={setChecked}
        />
        </div>
      );
    }
}
