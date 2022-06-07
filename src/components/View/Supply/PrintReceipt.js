import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from 'axios';
// import { adminSign } from "./Signatures";
//css
import './PrintReceipt.css';

//logo image
import logo from '../../../images/logo-black.png';
import { adminSign, poSign } from "./Signatures";

export class PrintReceipt extends React.PureComponent {
    render() {
    //  let signaturePrintedBy;
    //   if(this.props.printedBy==="Leanne Julio"){
    //     signaturePrintedBy = <img src={adminSign} alt="adminSign" className="signature-printedby" />
    //   }
    //   else if(this.props.printedBy==="Purchase Order Officer"){
    //     signaturePrintedBy = <img src={poSign} alt="adminSign" className="signature-printedby" />
    //   }  
    //   let signatureApprovedBy;
    //   if(this.props.approvedBy==="Leanne Julio"){
    //     signatureApprovedBy = <img src={adminSign} alt="adminSign" className="signature-approvedby" />
    //   }  

      console.log(this.props.approvedBy);

    //components
    // const listItems = this.props.poItems.map((data,index) => {
    //     return (
    //     <tr>
    //         <td>
    //             {data.item}
    //         </td>
    //         <td>
    //             {parseFloat(data.qty).toFixed(2)}                
    //         </td>
    //         <td>
    //             {parseFloat(data.received).toFixed(2)}                
    //         </td>
    //         <td>
    //             {data.unit}
    //         </td>
    //         <td>
    //             {data.amount}
    //         </td>
    //         <td>
    //             {data.discount}
    //         </td>
    //     </tr>
    //     )
    // });

        const marginTop="10px"
        const marginRight="10px"
        const marginBottom="10px"
        const marginLeft="20px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
        };

        // const deliveryDateformat = new Date(this.props.deliveryDate);
        // const purchaseDateformat = new Date(this.props.purchaseDate);

        return (
            <div>
                <style>{getPageMargins()}</style>
                <div className="print-area-po">
                    {/* <div class="d-flex justify-content-left">
                        <img src={logo} alt={'logo'} class="po-logo"></img>
                    </div> */}
                    <div className='row'>
                        <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-8 col-left-po"><h1 className='table-header-po'>2GO Express</h1></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8 col-left-po"> <span className="header-po">9th Floor Double Dragon Tower</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8 col-left-po"><span className="header-po">Telephone : 7799222</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8 col-left-po"><span className="header-po">VAT-REG TIN : 1234567890</span></div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-8 col-left-po"><h1 className='table-header-po'></h1></div>
                                    </div>
                                    <div className="break-area-po"></div>
                                    <div class="row">
                                        <div class="col-8 col-left-po official-rcpt"> <span className="header-po">OR NO : TG12093012</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8 col-left-po"><span className="header-po"></span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8 col-left-po"><span className="header-po"></span></div>
                                    </div>
                                </div>
                        </div>
                        <hr className="hr-po"></hr>
                    </div>
                    <h1 className="table-header-po col-left-po">PAYMENT DETAILS</h1>
                    <div className='row print-po-row'>
                        <div class="row">
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-8 col-left-po">BASE RATE</div>
                                    <div class="col-4 col-left-po">PHP 100.00</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div class="row">
                                    <div class="col-8 col-left-po">EXPORT DECLARATION</div>
                                    <div class="col-4 col-left-po">PHP 100.00</div>
                                </div>
                                <div class="row">
                                    <div class="col-8 col-left-po">PEAK SUBCHARGE</div>
                                    <div class="col-4 col-left-po">PHP 100.00</div>
                                </div>
                                <div class="row">
                                    <div class="col-8 col-left-po">CUSTOM SERVICE CHARGES</div>
                                    <div class="col-4 col-left-po">PHP 200.00</div>
                                </div>
                                <div class="row">
                                    <div class="col-8 col-left-po">CUSTOM SUBCHARGES</div>
                                    <div class="col-4 col-left-po">PHP 0.00</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div class="row">
                                    <div class="col-8 col-left-po">DISCOUNT</div>
                                    <div class="col-4 col-left-po">PHP 500.00</div>
                                </div>
                                <div class="row">
                                    <div class="col-8 col-left-po">ADJUSTMENTS</div>
                                    <div class="col-4 col-left-po">PHP 0.00</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div class="row">
                                    <div class="col-8 col-left-po">SUBTOTAL</div>
                                    <div class="col-4 col-left-po">PHP 3400.00</div>
                                </div>
                                <div class="row">
                                    <div class="col-8 col-left-po">VAT</div>
                                    <div class="col-4 col-left-po">PHP 300.00</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div className="row">
                                    <div class="col-8 table-header-po"> GRAND TOTAL </div>
                                    <div class="col-4 table-header-po"> PHP 1000.00</div>
                                </div>
                            </div>
                    
                            <div class="col-6 col-right-po">
                                <div class="row">
                                    <div class="col-6 col-left-po">TENDER TYPE</div>
                                    <div class="col-6 col-left-po">CARD</div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-left-po">TENDER SUBTYPE</div>
                                    <div class="col-6 col-left-po">MASTERCARD</div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-left-po">TENDER REF. NO</div>
                                    <div class="col-6 col-left-po">10120</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div class="row">
                                    <div class="col-6 col-left-po">DISCOUNT TYPE</div>
                                    <div class="col-6 col-left-po">DISCOUNT TYPE 1</div>
                                </div>
                            <div className="break-area-po col-left-po"></div>
                                <div class="row">
                                    <div class="col-6 col-left-po">DISCOUNT SUBTYPE</div>
                                    <div class="col-6 col-left-po">DISCOUNT 1</div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-left-po">DISCOUNT REF NO.</div>
                                    <div class="col-6 col-left-po">120310</div>
                                </div>
                            <div className="break-area-po"></div>
                                <div class="row">
                                    <div class="col-6 col-left-po">LOYALTY TYPE</div>
                                    <div class="col-6 col-left-po">LOYALTY 1</div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-left-po">LOYALTY SUB TYPE</div>
                                    <div class="col-6 col-left-po">LOYALTY 1</div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-left-po">LOYALTY REF NO. </div>
                                    <div class="col-6 col-left-po">232342</div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <hr className="hr-po"></hr>
                    <div className='po-print-breakdown-cont'>
                        <div className='text-right col-left-po'> DATE ISSUED:</div><div className="text-right col-left-po">05/28/2022 at 1:00PM</div>
                    </div><br />
                    <div className='po-print-breakdown-cont'>
                        <div className='text-right col-left-po'> BRANCH:</div><div className="text-right col-left-po">CEBU Lahug Branch</div>
                    </div>

                    <div className="po-print-approval-cont">
                      __________________ _______________________<br/>
                        <div className='po-print-approval'>
                            <span className='col-left-po signature-agent'>SIGNATURE OF AGENT</span>
                        </div>
                        
                        <div className='po-print-approval'>
                                <span className='col-left-po signature-customer'>SIGNATURE OF CUSTOMER</span>
                        </div>
                        <div className='po-print-approval'>
                                <span className='col-left-po official-rcpt'>**THIS SERVES AS AN OFFICIAL RECEIPT**</span>
                        </div>
                    </div>
                  
                </div>
            </div>

        );
    }
}

export default PrintReceipt;
