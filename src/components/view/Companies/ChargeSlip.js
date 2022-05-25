import React from "react"
import './ChargeSlip.css'
export class ChargeSlip extends React.PureComponent {
    render() {
      const marginTop="10px"
      const marginRight="10px"
      const marginBottom="10px"
      const marginLeft="20px"
      const getPageMargins = () => {
          return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
      };
    
    const mockData = [
      {
        patient_name: "Juan",
        transaction_no: "1234",
        date: "May 20 2022",
        type: "Walk-in",
        doctor: "Dr. MMM",
        lab_tests: [
          {
            service:"Urinalysis",
            qty: 1,
            price: 100
          },
          {
            service:"Fecalysis",
            qty: 1,
            price: 200
          },
        ],
        total: 300,
        requested_by: "User",
        prepared_by: "fdsaf",
        request_time:"May 20 2022",
        received_time:"May 20 2022 11:50:27 pm"
      },
      {
        patient_name: "Jane",
        transaction_no: "6778",
        date: "May 21 2022",
        type: "Walk-in",
        doctor: "Dr. YTR",
        lab_tests: [
          {
            service:"Serum",
            qty: 1,
            price: 600
          },
          {
            service:"Drug Test",
            qty: 1,
            price: 300
          },
        ],
        total: 900,
        requested_by: "QWE",
        prepared_by: "QWE",
        request_time:"May 21 2022",
        received_time:"May 21 2022 11:50:27 pm"
      },
      {
        patient_name: "Peter",
        transaction_no: "6778",
        date: "May 22 2022",
        type: "Walk-in",
        doctor: "Dr. YUI",
        lab_tests: [
          {
            service:"BBB",
            qty: 1,
            price: 700
          },
          {
            service:"FETJ",
            qty: 1,
            price: 300
          },
          {
            service:"45645",
            qty: 2,
            price: 400
          },
        ],
        total: 1400,
        requested_by: "IYU",
        prepared_by: "IYU",
        request_time:"May 22 2022",
        received_time:"May 22 2022 11:50:27 pm"
      }
    ]
    //Split tickets into 2
    var printSlips = []; 
    const chunkSize = 2;
    for (let i = 0; i < mockData.length; i += chunkSize) {
        const chunk = mockData.slice(i, i + chunkSize);
        printSlips.push(chunk);
    }
    function generateSlip(patient_name,transaction_no,date,type,doctor,lab_tests,total, requested_by, prepared_by, request_time, received_time){
      return (
        <div className="print-column m-0">
          <div className="row slip-header mb-2">
            <h3 className="m-0 p-0 slip-title">Laboratory</h3>
            <div className="row m-0 p-0">
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
                  <td><span className="slip-label">Physician(s):</span><span className="slip-detail">{type}, Dr. {doctor}</span></td>
                </tr>
              </table> 
            </div>
          </div>
          
          <div className="row">
            <table>
              <thead className="particulars">
                <tr>
                  <th className="slip-detail">Particulars</th>
                  <th className="slip-detail">Qty</th>
                  <th className="slip-detail">Price</th>
                </tr>
              </thead>
              <tbody>
                {lab_tests.map((data, index)=>
                  <tr>
                    <td className="slip-label">{data.service}</td>
                    <td className="slip-label">{data.qty}</td>
                    <td className="slip-label">P {data.price}</td>
                  </tr>
                )}                
                <tr>
                  <td></td>
                  <td className="slip-detail">Total:</td>
                  <td className="slip-detail">P {parseFloat(total).toFixed(2)}</td>
                </tr>
              </tbody>
            </table> 
          </div>
          <div className="row mt-4 p-0 slip-footer">
            <table>
              <tr>
                <td className="slip-label" width="40%">Requested By:</td>
                <td className="slip-label">{requested_by}</td>
              </tr>
              <tr>
                <td className="slip-label" >Prepared By:</td>
                <td className="slip-label">{prepared_by}</td>
              </tr>
              <tr>
                <td className="slip-label" >Requested Time & Date:</td>
                <td className="slip-label">{request_time}</td>
              </tr>
              <tr>
                <td className="slip-label" >Received Time & Date:</td>
                <td className="slip-label">{received_time}</td>
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
                  console.log(slip)
                  return(
                    generateSlip(
                      slip.patient_name,
                      slip.transaction_no,
                      slip.date,slip.type,
                      slip.doctor,
                      slip.lab_tests,
                      slip.total, 
                      slip.requested_by, 
                      slip.prepared_by, 
                      slip.request_time, 
                      slip.received_time)
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