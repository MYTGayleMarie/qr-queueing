import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage } from "../../../utilities/Common";
import { withRouter } from "react-router";
import axios from "axios";
import { getTime } from "../../../utilities/Common";

//logo image
import logo from "../../../images/logo-black.png";

//components
import Table from "../../Table.js";

//css
import "./InvoicePrint.css";

export class InvoiceToPrint extends React.PureComponent {
  render() {
    const marginTop = "10px";
    const marginRight = "10px";
    const marginBottom = "10px";
    const marginLeft = "20px";
    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    };

    return (
      <div>
        <style>{getPageMargins()}</style>
        <img src={logo} alt={"logo"} class="invoice-logo"></img>

        <div className="invoice-cont">
          <div className="row">
            <div className="col-3">
              <span className="label" style={{ fontSize: "15px" }}>
                COMPANY NAME{" "}
              </span>
            </div>
            <div className="col-3">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.name}
              </span>
            </div>
            <div className="col-3">
              <span className="label" style={{ fontSize: "15px" }}>
                CONTACT NUMBER
              </span>
            </div>
            <div className="col-3">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.contactNo}
              </span>
            </div>
            <div className="col-3">
              <span className="label" style={{ fontSize: "15px" }}>
                CONTACT PERSON
              </span>
            </div>
            <div className="col-3">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.contactPerson}
              </span>
            </div>
            <div className="col-3">
              <span className="label" style={{ fontSize: "15px" }}>
                COMPANY EMAIL
              </span>
            </div>
            <div className="col-3">
              <span className="" style={{ fontSize: "15px" }}>
                {" "}
                {this.props.email}
              </span>
            </div>
            <div className="col-3">
              <span className="label" style={{ fontSize: "15px" }}>
                COMPANY ADDRESS
              </span>
            </div>
            <div className="col-6">
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
            type={"payment-invoices-print"}
            tableData={this.props.invoices}
            rowsPerPage={4}
            headingColumns={[
              "INVOICE DATE",
              "DISCOUNT CODE",
              "PRICE",
              "QTY",
              "TOTAL",
            ]}
            givenClass={"company-mobile"}
            // setChecked={setChecked}
          />
        </div>
        <div className="invoice-footer">
          <span className="received-from-label">
            {" "}
            PREPARED BY <span className="not-bold">{this.props.user}</span>
          </span>
          <br />
          <span className="received-from-label">
            {" "}
            RECEIVED BY ________________________
          </span>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
