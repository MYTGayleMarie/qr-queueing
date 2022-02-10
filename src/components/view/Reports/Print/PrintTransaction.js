import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../../utilities/Common.js";
import { withRouter } from "react-router";
import axios from 'axios';

//logo image
import logo from '../../../../images/logo-black.png';

export class PrintTransaction extends React.PureComponent {
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
                <div className="print-area">
                    <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="po-logo"></img>
                    </div>
                    <div className="row">
                        <h1 className='table-header'>TRANSACTIONS</h1>
                    </div>
                </div>
            </div>

        );
    }
}

export default PrintTransaction;
