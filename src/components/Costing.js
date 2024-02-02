import React, { useState } from "react";
import { formatDate, getToken, getUser } from "../utilities/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

//css
import "./Costing.css";

//icons
import cancelIcon from "../images/cancel.png";

const userToken = getToken();
const userId = getUser();

function Costing({
  data,
  deleteService,
  withDiscount,
  total,
  setTotal,
  grandTotal,
  serviceFee,
  mdCharge,
  setGrandTotal,
  setDiscount,
  discount,
  toPay,
  paymentStatus,
  paidAmount,
  paymentBreakdown = {},
  hmo=""
}) {
  var totalCost = 0;
  var labTotal = 0;

  const summary = data.map((row, index) => {
    if (row.price == null) {
      totalCost += parseFloat(0);
    } else {
      totalCost += parseFloat(row.price);
    }

    if (row.type == "lab") {
      labTotal += parseFloat(row.price);
    }

    setTotal(total);


    return (
      <div class="row">
        {toPay != false ? (
          <div className="col-sm-1 ">
            <button
              className="delete-btn"
              onClick={() => deleteService(row.id)}
            >
              <FontAwesomeIcon
                icon={"minus-square"}
                alt={"minus"}
                aria-hidden="true"
                className="delete-icon"
              />
            </button>
          </div>
        ) : (
          <div className="col-sm-1"></div>
        )}
        <div className="col-sm-5 service">
          {row.lab_test ? row.lab_test : row.package}
        </div>
        <div
          className="col-sm-3 total-price align-right text-right"
          style={{ fontWeight: "bold" }}
        >
          P{" "}
          {row.price
            ? parseFloat(row.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  });

  function hmoPrice() {
    

       hmo = parseFloat(hmo).toFixed(2);
    

    // console.log(discount)

    return (
      <div>
    <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">HMO DISCOUNT</span>
          </div>
          <div className="col-sm-5 align-right text-right">
            <span className="amount">P {parseFloat(hmo).toFixed(2)}</span>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
  function discountedPrice() {
    if (withDiscount != "") {
      const discount = labTotal.toFixed(2) * 0.2;
    }
    const grandTotal = parseFloat(total).toFixed(2) - discount;

    // console.log(discount)

    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">DISCOUNT</span>
          </div>
          <div className="col-sm-5 align-right text-right">
            <span className="amount">P {parseFloat(discount).toFixed(2)}</span>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="summary-label">
        TOTAL SUMMARY OF CLINICAL SERVICES AND COSTING
      </h1>
      <div className="summary-services">{summary}</div>
      <div className="summary-total">
        <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">TOTAL</span>
          </div>

          <div className="col-sm-5 align-right text-right">
            <span className="amount">
              P{" "}
              {parseFloat(total).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="col-sm-3"></div>
        </div>

        {mdCharge != null && (
          <div className="row">
            <div className="col-sm-4">
              <span class="summary-total-label">MEDICAL CHARGE</span>
            </div>

            <div className="col-sm-5 align-right text-right">
              <span className="amount">
                P{" "}
                {parseFloat(mdCharge).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="col-sm-3"></div>
          </div>
        )}

        {serviceFee != null && (
          <div className="row">
            <div className="col-sm-4">
              <span class="summary-total-label">SERVICE FEE</span>
            </div>
            <div className="col-sm-5 align-right text-right">
              <span className="amount">
                P{" "}
                {parseFloat(serviceFee).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="col-sm-3"></div>
          </div>
        )}

        <div>{discount !== "" && discountedPrice()}</div>
        <div>{parseFloat(hmo) > 0 && hmoPrice()}</div>
       

        <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">GRAND TOTAL</span>
          </div>
          <div className="col-sm-5 align-right text-right">
            <span className="amount">
              P{" "}
              {parseFloat(grandTotal).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">PAID AMOUNT</span>
          </div>
          <div className="col-sm-5 align-right text-right">
            <span className="amount">
              P{" "}
              {parseFloat(paidAmount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <span class="summary-total-label">BALANCE</span>
          </div>
          <div className="col-sm-5 align-right text-right">
            <span className="amount">
              P{" "}
              {(parseFloat(grandTotal) - parseFloat(paidAmount)).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}
            </span>
          </div>
          <div className="col-sm-3"></div>
        </div>

        {paymentBreakdown.payment_status === "paid" && (
          <div className="row">
            <div className="col-12 mb-4">
              <h1 className="summary-label">PAYMENT DETAILS</h1>
            </div>
            <div className="col-6">
              <span class="summary-total-label">
                {" "}
                PAYMENT TYPE: <strong>{paymentBreakdown.payment_type}</strong>
              </span>
            </div>
            <div className="col-6">
              <span class="summary-total-label">
                {" "}
                PAID AMOUNT:{" "}
                <strong>
                  {" "}
                  P{" "}
                  {parseFloat(paymentBreakdown.paid_amount).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>
              </span>
            </div>
            <div className="col-6">
              <span class="summary-total-label">
                {" "}
                CHECK NO. / REFERENCE NO.:{" "}
                <strong>
                  {paymentBreakdown.payment_type === "cash"
                    ? "N/A"
                    : paymentBreakdown.reference_no}
                </strong>
              </span>
            </div>
            <div className="col-6">
              <span class="summary-total-label">
                {" "}
                PAYMENT DATE: {formatDate(paymentBreakdown.payment_date)}
              </span>
            </div>
            <div className="col-6">
              <span class="summary-total-label">
                {" "}
                REMARKS: {paymentBreakdown.remarks}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Costing;
