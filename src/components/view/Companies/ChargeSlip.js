import React from "react"
import { getTime } from "../../../utilities/Common"
import './ChargeSlip.css'
//logo image
import logo from '../../../images/logo-black.png';


export class ChargeSlip extends React.PureComponent {
    render() {
      const marginTop="10px"
      const marginRight="10px"
      const marginBottom="10px"
      const marginLeft="20px"
      const getPageMargins = () => {
          return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
      };
    
    var presentDate = new Date();
    var formattedPresentData = presentDate.toISOString().split('T')[0];
    
    var date = new Date(formattedPresentData);
    var formattedDate = date.toDateString().split(" ");
    var dateTime = formattedDate[1]+" "+formattedDate[2]+" "+formattedDate[3]+" "+getTime(presentDate)

    const data = this.props.data

    var printSlips = []; 
    const chunkSize = 2;
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        printSlips.push(chunk);
    }

    function generateSlip(patient_name,transaction_no,date,doctors_referal,lab_tests,total, grand_total, discount, requested_by, prepared_by, request_time, received_time, packages){

      return (
       
        <div className="print-column m-0">
          <div class="d-flex justify-content-left">
                            <img src={logo} alt={'logo'} class="slip-logo"></img>
                            <span className="to-right p-2 slip-title">Quest and Reliance Diagnostics</span>
          </div>
          <div className="row slip-header mb-2 mt-2">
            <h3 className="m-0 p-0 slip-title">Company details</h3>
            <div className="row m-0 p-0">
              <table className="m-0">
                <tr>
                  <td><span className="slip-label">Company Name</span><span className="slip-detail">QR Diagnostics</span></td>
                </tr>
                <tr>
                  <td><span className="slip-label">Contact Number</span><span className="slip-detail">09998886694</span></td>
                  <td><span className="slip-label">Address</span><span className="slip-detail">Marasbaras Tacloban City</span></td>
                </tr>
              </table>          
            </div>
            <div className="row m-0 p-0">
              <h3 className="m-0 p-0 slip-title">Laboratory Details</h3>
              <table className="m-0">
                <tr>
                  <td><span className="slip-label">Patient Name:</span><span className="slip-detail">{patient_name}</span></td>
                </tr>
              </table>          
            </div>
            <div className="row m-0 p-0">
              <table>
                <tr>
                  <td><span className="slip-label">Transaction No.:</span><span className="slip-detail">{transaction_no}</span></td>
                  <td><span className="slip-label">Date:</span><span className="slip-detail">{date}</span></td>
                </tr>
              </table> 
            </div>
            <div className="row m-0 p-0">
              <table>
                <tr>
                  <td><span className="slip-label">Physician(s):</span><span className="slip-detail">{doctors_referal}</span></td>
                </tr>
              </table> 
            </div>
          </div>
          
          <div className="row">
            <table>
              <thead className="particulars">
                <tr>
                  <th className="slip-detail" width="60%">Particulars</th>
                  <th className="slip-detail">Qty</th>
                  <th className="slip-detail">Price</th>
                </tr>
              </thead>
              <tbody>
                {lab_tests.map((data, index)=>
                  <tr>
                    <td className="slip-label">{data.service}</td>
                    <td className="slip-label">{data.qty}</td>
                    <td className="slip-label">P {parseFloat(data.total).toFixed(2)}</td>
                  </tr>
                )}  
                {packages.map((data, index)=>
                  <tr>
                    <td className="slip-label">{data.name}<br/>{data.service}</td>
                    <td className="slip-label">{data.qty}</td>
                    <td className="slip-label">P {parseFloat(data.total).toFixed(2)}</td>
                  </tr>
                )}              
                <tr>
                  <td></td>
                  <td className="slip-detail">Total:</td>
                  <td className="slip-detail">P {total}</td>
                </tr>
              </tbody>
            </table> 
          </div>
          <div className="row mt-4 p-0 slip-footer">
            <table>
              <tr>
                <td className="slip-label" width="40%">Requested By:</td>
                {/* <td className="slip-label">{requested_by}</td> */}
                <td className="slip-label">Admin</td>
              </tr>
              <tr>
                <td className="slip-label" >Prepared By:</td>
                {/* <td className="slip-label">{prepared_by}</td> */}
                <td className="slip-label">Admin</td>
              </tr>
              <tr>
                <td className="slip-label" >Requested Time & Date:</td>
                {/* <td className="slip-label">{request_time}</td> */}
                <td className="slip-label">{dateTime}</td>
              </tr>
              <tr>
                <td className="slip-label" >Received Time & Date:</td>
                {/* <td className="slip-label">{received_time}</td> */}
                <td className="slip-label">{dateTime}</td>
              </tr>
            </table>
            <p  className="slip-label p-0 m-0">Outpatient Requisition Slip</p>
          </div>
        </div>
        
      )
    }
    
    return (
      <div>
        <style>{getPageMargins()}</style>
        <div className="print-area">
          {printSlips.map((data, index)=>{
            return (
              <div className="print-row">
                {/* {generateSlip()}
                {generateSlip()} */}
                {data.map((slip, index)=>{
                  return(
                    generateSlip(
                      slip.patient_name,
                      slip.transaction_no,
                      slip.date,
                      slip.doctors_referal,
                      slip.lab_tests,
                      slip.total, 
                      slip.grand_total, 
                      slip.discount, 
                      slip.requested_by, 
                      slip.prepared_by, 
                      slip.request_time, 
                      slip.received_time, 
                      slip.packages)
                  )
                })}
              </div>
            )
          })}
          
          
        </div>
      </div>
    )
    }
}