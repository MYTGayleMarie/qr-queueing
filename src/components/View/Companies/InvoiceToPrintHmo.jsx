import React, { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import {
  getRole,
  getToken,
  getUser,
  getUserName,
  getUserRole,
  refreshPage,
} from "../../../utilities/Common"
import { withRouter } from "react-router"
import axios from "axios"
import { getTime } from "../../../utilities/Common"

//logo image
import logo from "../../../images/logo-black.png"

//components
import Table from "../../Table.js"

//css
import "./InvoicePrint.css"

export class InvoiceToPrintHmo extends React.PureComponent {
  render() {
    const marginTop = "10px"
    const marginRight = "10px"
    const marginBottom = "10px"
    const marginLeft = "10px"
    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
    }

    return (
      <div>
        <style>{getPageMargins()}</style>
        <img src={logo} alt={"logo"} class="invoice-logo"></img>
        <div className="p-2">
          <div className="invoice-cont-hmo">
            <div className="row">
              <div className="col-12">
                <span className="label" style={{ fontSize: "15px" }}>
                  BILL TO:{" "}
                </span>
              </div>
              <div className="col-12">
                <span className="" style={{ fontSize: "15px" }}>
                  {" "}
                  COMPANY NAME: {this.props.name}
                </span>
              </div>
              <div className="col-12">
                <span className="" style={{ fontSize: "15px" }}>
                  {" "}
                  COMPANY ADDRESS: {this.props.address}
                </span>
              </div>

              <div className="col-12">
                <span className="" style={{ fontSize: "15px" }}>
                  {" "}
                  {this.props.remarks}
                </span>
              </div>
            </div>

            <div className="invoice-line" />
          </div>
          <div className="">
            <div className="search-table-container d-flex justify-content-end"></div>
            <table className="table-container__table table-container__table--break-sm">
              <thead>
                <tr>
                  <th width={5}> NO</th>
                  <th width={20}> NAME</th>
                  <th width={10}> DATE OF SERVICE</th>
                  <th width={50}> LAB SERVICES</th>
                  <th width={15}> TOTAL DUE</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {this.props.invoices.map((row) => {
                  return (
                    <tr>
                      <td className="text-center" width={5}>
                        {row.key}
                      </td>
                      <td className="text-left" width={20}>
                        {row.name}
                      </td>
                      <td className="text-center" width={10}>
                        {row.date}
                      </td>
                      <td className="text-left" width={20}>
                        {row.lab_services}
                      </td>
                      <td className="text-right" width={15}>
                        {row.price}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="">
            <table>
              <thead>
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div className="invoice-footer p-1">
            <div
              className="row justify-content-center"
              style={{
                fontSize: "small",
                border: "1px solid black",
              }}
            >
              <div className="col-12">
                <span>NOTE:</span>
                <br />
                <span>FOR CHECK PAYMENT & BANK TRANSFER</span>
                <br />
                <span> PLEASE ISSUE TO:</span>
                <br />
                <span>
                  {" "}
                  BANK: <strong>BDO</strong>
                </span>
                <br />
                <span>
                  {" "}
                  ACCOUNT NAME: <strong>Quest & Reliance Diagnostics</strong>
                </span>
                <br />
                <span>
                  {" "}
                  ACCOUNT NUMBER: <strong>002808017390</strong>
                </span>
                <br />
                <br />
                <span>REMINDERS:</span>
                <br />
                <span>
                  FOR BANK TRANSFER PLEASE SCREENSHOT THE TRANSACTION AND EMAIL
                  TO THIS ACCOUNT
                </span>
                <br />
                <span>
                  <a style={{ textDecoration: "underline", color: "blue" }}>
                    questdiagnostics.mgt@gmail.com
                  </a>
                </span>
              </div>
            </div>
            <br />
            <br />

            <div className="row">
              <div className="col-6">
                <div className="received-from-label"> PREPARED BY</div>
                <br />
                <div className="not-bold text-center underline-div">
                  {getUserName()}
                </div>
                <div className="not-bold text-center">{getUserRole()}</div>
              </div>
              <div className="col-6">
                <div className="received-from-label"> APPROVED BY</div>
                <br />
                <div className="not-bold text-center underline-div">
                  <span style={{ opacity: "0" }}>s</span>
                </div>
                <div className="not-bold text-center"></div>
              </div>
              <div className="col-6 mt-3">
                <div className="received-from-label"> RECEIVED BY</div>
                <br />
                <br />
                <div className="not-bold text-center underline-div"></div>
                <div className="not-bold text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
