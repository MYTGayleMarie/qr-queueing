import React, { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { getToken, getUser, refreshPage } from "../../../utilities/Common"
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
    const marginLeft = "20px"
    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
    }

    return (
      <div>
        <style>{getPageMargins()}</style>
        <img src={logo} alt={"logo"} class="invoice-logo"></img>

        <div className="invoice-cont">
          <div className="row">
            <div className="col-12">
              <span className="label" style={{ fontSize: "15px" }}>
                BILL TO:{" "}
              </span>
            </div>
            <div className="col-12">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.name}
              </span>
            </div>
            <div className="col-12">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.address}
              </span>
            </div>
          </div>

          <div className="invoice-line" />
        </div>
        <div className="invoice-table-cont">
          <Table
            type={"payment-invoices-print-hmo"}
            tableData={this.props.invoices}
            rowsPerPage={4}
            headingColumns={[
              "NO",
              "NAME",
              "DATE OF SERVICE",
              "LAB SERVICES",
              "TOTAL DUE",
            ]}
            givenClass={"company-mobile"}
            // setChecked={setChecked}
          />
        </div>

        <div className="invoice-footer">
          <div className="row justify-content-end">
            {/* <div className="col-1"></div>
            <div className="col-2"></div>
            <div className="col-2"></div> */}
            <div className="col-7 text-right">
              TOTAL BILL:<strong>{this.props.grandTotal}</strong>
            </div>

            <div className="col-1"></div>
          </div>

          <br />
          <div
            className="row"
            style={{
              fontSize: "small",
              border: "1px solid black",
              padding: "1px",
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
                ACCOUNT NAME: <strong>Quest & reliance Diagnostics</strong>
              </span>
              <br />
              <span>
                {" "}
                ACCOUINT NUMBER: <strong>002803017190</strong>
              </span>
              <br />
              <br />
              <span>REMINDERS:</span>
              <br />
              <span>
                FOR BANK TRANSFER PLEASE SCREENSHOT THE TRANSACTION AND EMAIL TO
                THIS ACCOUNT
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
              <span className="received-from-label">
                {" "}
                PREPARED BY <br />
                <span className="not-bold">{this.props.user}</span>
              </span>
              <br />
              <br />
              <span className="received-from-label">
                {" "}
                RECEIVED BY <br /> ________________________
              </span>
            </div>
            <div className="col-6">
              <span className="received-from-label">
                {" "}
                APPROVED BY <br />
                ________________________
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
