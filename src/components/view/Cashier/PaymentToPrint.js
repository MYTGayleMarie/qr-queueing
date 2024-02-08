import React, { Component, useEffect } from "react"
import { render } from "react-dom"
import { useParams } from "react-router-dom"
import {
  formatDate,
  formatPrice,
  getToken,
  getUser,
  refreshPage,
} from "../../../utilities/Common"
import { withRouter } from "react-router"
import axios from "axios"
import { getTime } from "../../../utilities/Common"

import "./PaymentToPrint.css"

//logo image
import logo from "../../../images/logo-black.png"

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

function groupByAndConvertToArrayOfArrays(arr, key) {
  const grouped = arr.reduce((acc, obj) => {
    const property = obj[key]

    if (!acc[property]) {
      acc[property] = []
    }

    acc[property].push(obj)
    return acc
  }, {})

  const result = Object.values(grouped)
  return result
}
export class PaymentToPrint extends React.PureComponent {
  render() {
    const presentDate = new Date()
    const curTime = presentDate.getHours() + ":" + presentDate.getMinutes()
    const today = presentDate.toDateString().split(" ")

    const bookDate = new Date(this.props.bookingDate)
    const birthDate = new Date(this.props.birthdate)
    const encodedDate = new Date(this.props.encodedOn)

    var formattedBookDate = bookDate.toDateString().split(" ")
    var formattedBirthDate = birthDate.toDateString().split(" ")
    var formattedEncodedDate = encodedDate.toDateString().split(" ")

    var date = new Date()
    var formattedDate = date.toDateString().split(" ")
    var dateTime =
      formattedDate[1] +
      " " +
      formattedDate[2] +
      " " +
      formattedDate[3] +
      " " +
      getTime(presentDate)

    var specialServices = this.props.services.filter(
      (data) =>
        data.key === "clinical_microscopy_fecalysis" ||
        data.key === "clinical_microscopy_urinalysis" ||
        data.name === "Drug Test" ||
        data.name === "Paps Smear"
    )

    var remainingServices = this.props.services.filter(
      (data) =>
        data.key !== "clinical_microscopy_fecalysis" &&
        data.key !== "clinical_microscopy_urinalysis" &&
        data.name !== "Drug Test" &&
        data.name !== "Paps Smear"
    )

    var groupedSpecial = groupByAndConvertToArrayOfArrays(
      specialServices,
      "key"
    )

    //old
    var groupedServices = groupArrayOfObjects(remainingServices, "key")

    var groupedServicesOthers = groupByAndConvertToArrayOfArrays(
      remainingServices,
      "key"
    )
    const services_XRAY = Object.keys(groupedServices).map(function (key) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services += info.name
        } else {
          category_services += info.name + ", "
        }
      })

      if (
        category_name !== "XRAY" &&
        category_name !== "CARDIOLOGY" &&
        category_name !== "RADIOLOGY"
      ) {
        return ""
      }

      return (
        <tr className="print-table-double">
          {category_name == "XRAY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "CARDIOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "RADIOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
        </tr>
      )
    })

    const services_Hematology = Object.keys(groupedServices).map(function (
      key
    ) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services += info.name
        } else {
          category_services += info.name + ", "
        }
      })

      if (category_name !== "HEMATOLOGY") {
        return ""
      }

      return (
        <tr className="print-table-double">
          {category_name == "HEMATOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
        </tr>
      )
    })

    //   const services_Coaguation = Object.keys(groupedServices).map(function(key) {
    //     var category_name = key.replace(/_/g, " ").toUpperCase();
    //     var category_services = "";

    //     groupedServices[key].map((info, index) => {
    //         if(groupedServices[key].length - 1 == index) {
    //             category_services += info.name;
    //         }
    //         else {
    //             category_services += info.name + ", ";
    //         }
    //     });

    //     if(category_name !== "Coaguation Studies") {
    //         return ""
    //     }

    //     return  <tr className='print-table-double'>
    //                 {category_name == "Coaguation" &&
    //                   <>
    //                      <td><span className="data">{category_services}</span></td>
    //                   </>
    //                 }
    //             </tr>
    // });

    const services_Serology = Object.keys(groupedServices).map(function (key) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services += info.name
        } else {
          category_services += info.name + ", "
        }
      })

      if (
        category_name !== "SEROLOGY" &&
        category_name !== "COAGUATION STUDIES" &&
        category_name !== "IMMUNOLOGY" &&
        category_name !== "THYROID PROFILE" &&
        category_name !== "TUMOR MARKERS" &&
        category_name !== "HEPATITIS PROFILE SCREENING" &&
        category_name !== "CHEMISTRY" &&
        category_name !== "ELECTROLYTES" &&
        category_name !== "LIPID PROFILE" &&
        category_name !== "GLUCOSE TESTS" &&
        category_name !== "LIVER FUNCTION TESTS" &&
        category_name !== "KIDNEY FUNCTION TESTS" &&
        category_name !== "PANCREATIC TEST"
      ) {
        return ""
      }

      return (
        <tr className="print-table-double">
          {category_name == "SEROLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "IMMUNOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "THYROID PROFILE" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "TUMOR MARKERS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "HEPATITIS PROFILE SCREENING" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "CHEMISTRY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "ELECTROLYTES" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}

          {category_name == "LIPID PROFILE" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "GLUCOSE TESTS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "LIVER FUNCTION TESTS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "KIDNEY FUNCTION TESTS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "COAGUATION STUDIES" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "PANCREATIC TEST" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
        </tr>
      )
    })

    const services_Clinical_Urinalysis = Object.keys(groupedServices).map(
      function (key) {
        var category_name = key.replace(/_/g, " ").toUpperCase()
        var category_services = ""

        groupedServices[key].map((info, index) => {
          if (groupedServices[key].length - 1 == index) {
            category_services += info.name
          } else {
            category_services += info.name + ", "
          }
        })

        if (category_name !== "CLINICAL MICROSCOPY URINALYSIS") {
          return ""
        }

        return (
          <tr className="print-table-double">
            {category_name == "CLINICAL MICROSCOPY URINALYSIS" && (
              <>
                <td>
                  <span className="data">{category_services}</span>
                </td>
              </>
            )}
          </tr>
        )
      }
    )

    const services_Clinical_Fecalysis = Object.keys(groupedServices).map(
      function (key) {
        var category_name = key.replace(/_/g, " ").toUpperCase()
        var category_services = ""

        groupedServices[key].map((info, index) => {
          if (groupedServices[key].length - 1 == index) {
            category_services += info.name
          } else {
            category_services += info.name + ", "
          }
        })

        if (category_name !== "CLINICAL MICROSCOPY FECALYSIS") {
          return ""
        }

        return (
          <tr className="print-table-double">
            {category_name == "CLINICAL MICROSCOPY FECALYSIS" && (
              <>
                <td>
                  <span className="data">{category_services}</span>
                </td>
              </>
            )}
          </tr>
        )
      }
    )

    const services_Ultrasound = Object.keys(groupedServices).map(function (
      key
    ) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services += info.name
        } else {
          category_services += info.name + ", "
        }
      })

      if (category_name !== "ULTRASOUND") {
        return ""
      }

      return (
        <tr className="print-table-double">
          {category_name == "ULTRASOUND" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
        </tr>
      )
    })

    const services_Others = Object.keys(groupedServices).map(function (key) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services += info.name
        } else {
          category_services += info.name + ", "
        }
      })

      if (
        category_name !== "OTHER TESTS" &&
        category_name !== "MICROBIOLOGY" &&
        category_name !== "HISTOPATHOLOGY" &&
        category_name !== "COVID RAPID TESTS"
      ) {
        return ""
      }

      return (
        <tr className="print-table-double">
          {category_name == "OTHER TESTS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "MICROBIOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "HISTOPATHOLOGY" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
          {category_name == "COVID RAPID TESTS" && (
            <>
              <td>
                <span className="data">{category_services}</span>
              </td>
            </>
          )}
        </tr>
      )
    })

    //generate request ticket - hide for future purposes
    // function generateTickets(
    //   queue,
    //   patientId,
    //   bookingId,
    //   name,
    //   age,
    //   gender,
    //   contact,
    //   email,
    //   address,
    //   referral,
    //   isCompany,
    //   payment,
    //   result,
    //   serviceName,
    //   services,
    //   discountCode,
    //   type = "normal",
    //   specialData = []
    // ) {
    //   return (
    //     <div className="print-column">
    //       <div class="d-flex justify-content-left mx-0">
    //         <img src={logo} alt={"logo"} className="payment-logo"></img>
    //         <span className="to-right request-header">
    //           #{bookingId} Request Form - Patient ID:{patientId}
    //         </span>
    //         <span className="to-right-test request-header-test">
    //           {serviceName}
    //         </span>
    //       </div>
    //       <div className="row mx-0">
    //         <table className="print-table">
    //           <tr>
    //             <td className="print-data-header">
    //               <span className="header">Booking Date: </span>
    //               <span className="detail-print">
    //                 {formattedBookDate[1] +
    //                   " " +
    //                   formattedBookDate[2] +
    //                   " " +
    //                   formattedBookDate[3] +
    //                   " " +
    //                   getTime(bookDate)}
    //               </span>
    //             </td>
    //             <td>
    //               <span className="header">Name: </span>
    //               <span className="detail-print">{name}</span>
    //             </td>
    //           </tr>
    //         </table>
    //         <table className="print-table">
    //           <tr>
    //             <td>
    //               <span className="header">DOB: </span>
    //               <span className="detail-print">
    //                 {parseInt(birthDate.getMonth() + 1) +
    //                   "-" +
    //                   birthDate.getDate() +
    //                   "-" +
    //                   birthDate.getFullYear() +
    //                   " "}
    //               </span>{" "}
    //             </td>
    //             <td>
    //               <span className="header">Age: </span>
    //               <span className="detail-print">{age}</span>
    //             </td>
    //             <td>
    //               <span className="header">Gender:</span>
    //               <span className="detail-print detail-gender">
    //                 {gender.toLowerCase() == "female" ? "F" : "M"}
    //               </span>
    //             </td>
    //             <td className="print-data-contact">
    //               <span className="header">Contact: </span>
    //               <span className="detail-print">{contact}</span>
    //             </td>
    //           </tr>
    //         </table>
    //         <table className="print-table">
    //           <tr>
    //             <td>
    //               <span className="header">Email: </span>
    //               <span className="detail-print">
    //                 {email == null ? "NONE" : email}{" "}
    //               </span>
    //             </td>
    //             <td>
    //               <span className="header">Address: </span>
    //               <span className="detail-print">{address}</span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">Physician: </span>
    //               <span className="detail-print">
    //                 {referral == null ? "NONE" : referral}{" "}
    //               </span>
    //             </td>
    //             <td>
    //               <span className="header">Discount Code: </span>
    //               <span className="detail-print">
    //                 {discountCode ? discountCode : "None"}
    //               </span>
    //             </td>
    //           </tr>
    //         </table>
    //         <table className="print-table">
    //           <tr>
    //             <td>
    //               <span className="header">Diagnosis: </span>
    //               <span className="detail-print">
    //                 ______________________________________________________________________________
    //               </span>
    //             </td>
    //           </tr>
    //         </table>
    //       </div>

    //       {/* <div className="line"></div> */}
    //       {type === "normal" && (
    //         <div className="row mx-0">
    //           <table className="services-table print-table-double">
    //             <tr>
    //               <th>
    //                 <span className="header">Services</span>
    //               </th>
    //             </tr>
    //             {services}
    //           </table>
    //         </div>
    //       )}
    //       {type === "special" && (
    //         <div className="row mx-0 mt-1 mb-2">
    //           <table className="services-table print-table-double">
    //             <tr style={{ border: "1px solid black" }}>
    //               {specialServices.map((val) => {
    //                 return (
    //                   <td
    //                     style={{
    //                       fontSize: "6px",
    //                       padding: 3,
    //                       border: "1px solid black",
    //                     }}
    //                     align="center"
    //                   >
    //                     {val.name}
    //                   </td>
    //                 )
    //               })}
    //             </tr>
    //           </table>
    //         </div>
    //       )}

    //       <table className="print-table mx-0">
    //         <tr>
    //           <td className="print-table">
    //             <span className="footer-header mx-0 px-0">
    //               <b>Payment:</b>
    //             </span>
    //             <span className="data">
    //               {isCompany && discountCode
    //                 ? " CORPORATE ACCOUNT - " + discountCode
    //                 : payment
    //                 ? " " + payment.toUpperCase()
    //                 : " "}
    //             </span>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td className="print-table">
    //             <span className="footer-header">
    //               <b>Result:</b>
    //             </span>
    //             <span className="data"> {result.toUpperCase()}</span>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td className="print-table">
    //             <span className="data">
    //               Encoded on:{" "}
    //               {formattedEncodedDate[1] +
    //                 " " +
    //                 formattedEncodedDate[2] +
    //                 ", " +
    //                 getTime(encodedDate)}
    //             </span>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td className="print-table">
    //             <span className="data">
    //               Printed on:{" "}
    //               {today[1] + " " + today[2] + ", " + today[3] + ", " + curTime}
    //             </span>
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    //   )
    // }

    //Generate Request ticket stub
    function generateTickets(
      patientId,
      bookingId,
      name,
      age,
      gender,
      contact,
      result,
      serviceName,
      services,
      discountCode,
      type,
      viewType
    ) {
      return (
        <div
          className={
            viewType === "phlebo" ? "print-column-phlebo" : "print-column"
          }
        >
          <div class="d-flex row justify-content-left mx-0">
            <div className="col-2">
              <img src={logo} alt={"logo"} className="payment-logo mt-1"></img>
            </div>
            <div className="col mt-1">
              <span className="to-right request-header">
                Request Form - Patient ID:{patientId}
              </span>
            </div>
            <div className="col text-right">
              <span className="request-header-test">
                BOOKING #<strong>{bookingId}</strong>
              </span>
            </div>
          </div>
          {/* <div className="row justify-content-end">
            <div className="col text-right">
              <span className="request-header-test">
                BOOKING #<strong>{bookingId}</strong>
              </span>
            </div>
          </div> */}

          <div className="row mx-0 mt-1 mb-2">
            <table className="services-table print-table-double">
              <tr style={{ border: "1px solid black" }}>
                <td align="center">
                  <span
                    style={{
                      fontSize: "15px",
                      padding: 3,
                      fontWeight: "bold",
                    }}
                  >
                    {serviceName?.toUpperCase()}
                  </span>
                  <br />
                  <span className="mt-1">
                    {type === "special" && (
                      <>
                        <td>
                          <span className="data">
                            {services.map((val) => val.name).join(", ")}
                          </span>
                        </td>
                      </>
                    )}
                    {type === "normal" && services}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div className="row mx-0">
            <table className="print-table-stub">
              <tr>
                <td width={50}>
                  <span className="header">Name: </span>
                  <span className="detail-print">{name}</span>
                </td>
                <td width={25}>
                  <span className="header">Age: </span>
                  <span className="detail-print">{age}</span>
                </td>
                <td width={25}>
                  <span className="header">Gender:</span>
                  <span className="detail-print detail-gender">
                    {gender.toLowerCase() == "female" ? "F" : "M"}
                  </span>
                </td>
              </tr>

              <tr>
                <td width={50}>
                  <span className="header">DOB: </span>
                  <span className="detail-print">
                    {formatDate(birthDate)}
                  </span>{" "}
                </td>

                <td width={50}>
                  <span className="header">Contact: </span>
                  <span className="detail-print">{contact}</span>
                </td>
              </tr>
              <tr>
                <td width={50}>
                  <span className="header">Discount Code: </span>
                  <span className="detail-print">
                    {discountCode ? discountCode : "None"}
                  </span>
                </td>
                <td width={50}>
                  <span className="footer-header">
                    <b>Result:</b>
                  </span>
                  <span className="detail-print"> {result.toUpperCase()}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )
    }

    //Generate Request ticket stub POS view
    function generateTicketsPOS(
      patientId,
      bookingId,
      name,
      age,
      gender,
      contact,
      result,
      serviceName,
      services,
      discountCode,
      type,
      viewType
    ) {
      return (
        <div className="print-column-phlebo">
          <div class="d-flex row justify-content-left mx-0">
            <div className="col-6">
              <img
                src={logo}
                alt={"logo"}
                className="payment-logo-phlebo mt-1"
              ></img>
            </div>

            <div className="col-6 text-right">
              <span className="request-header-phlebo">
                BOOKING #<strong>{bookingId}</strong>
              </span>
            </div>
            <div className="col-12 text-left align-left">
              <span className="request-header-phlebo text-left">
                Request Form-Patient ID:{patientId}
              </span>
            </div>
          </div>
          {/* <div className="row justify-content-end">
            <div className="col text-right">
              <span className="request-header-test">
                BOOKING #<strong>{bookingId}</strong>
              </span>
            </div>
          </div> */}

          <div className="row mx-0 mt-1 mb-2">
            <table className="services-table print-table-double">
              <tr style={{ border: "1px solid black" }}>
                <td align="center" className="p-4">
                  <span
                    style={{
                      fontSize: "15px",
                      padding: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {serviceName?.toUpperCase()}
                  </span>
                  <br />
                  <span className="mt-1">
                    {type === "special" && (
                      <>
                        <td>
                          <span className="data">
                            {services.map((val) => val.name).join(", ")}
                          </span>
                        </td>
                      </>
                    )}
                    {type === "normal" && services}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div className="row mx-0 mt-3">
            <table className="print-table-stub">
              <tr>
                <td width="100%">
                  <span className="header-phlebo">Name: </span>
                  <span className="detail-print-phlebo">{name}</span>
                </td>
              </tr>
            </table>
            <table className="print-table-stub">
              <tr>
                <td width={25}>
                  <span className="header-phlebo">Age: </span>
                  <span className="detail-print-phlebo">{age}</span>
                </td>
                <td width={100}>
                  <span className="header-phlebo">DOB: </span>
                  <span className="detail-print-phlebo">
                    {formatDate(birthDate)}
                  </span>
                </td>
              </tr>

              <tr>
                <td width={25}>
                  <span className="header-phlebo">Gender:</span>
                  <span className="detail-print-phlebo detail-gender">
                    {gender.toLowerCase() == "female" ? "F" : "M"}
                  </span>
                </td>

                <td width={100}>
                  <span className="header-phlebo">Contact: </span>
                  <span className="detail-print-phlebo">{contact}</span>
                </td>
              </tr>
              <tr>
                <td width={25}>
                  <span className="header-phlebo">
                    <b>Result:</b>
                  </span>
                  <span className="detail-print-phlebo">
                    {result.toUpperCase()}
                  </span>
                </td>
                <td width={100}>
                  <span className="header-phlebo">Discount Code: </span>
                  <span className="detail-print-phlebo">
                    {discountCode ? discountCode : "None"}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )
    }
    const tickets = [
      {
        name: "XRAY-ECG",
        services: services_XRAY,
      },
      {
        name: "OTHER TESTS",
        services: services_Others,
      },
      {
        name: "HEMO-BTY",
        services: services_Hematology,
      },
      //   {
      //     name: 'COAGUATION',
      //     services: services_Coaguation
      // },
      {
        name: "CHEM-SERO",
        services: services_Serology,
      },
      {
        name: "CLINIC - URINALYSIS",
        services: services_Clinical_Urinalysis,
      },
      {
        name: "CLINIC - FECALYSIS",
        services: services_Clinical_Fecalysis,
      },
      {
        name: "ULTRASOUND",
        services: services_Ultrasound,
      },
    ]

    var finalTickets = []
    var printTickets = []
    var ticketsBy4 = []
    var ticketsBy1 = []
    var ticketsBy4Special = []
    var ticketsBy2Special = []

    //Filter array to non-empty services
    tickets.map((data) => {
      if (data.services !== "" && data.services.join("").length !== 0) {
        finalTickets.push(data)
      }
    })

    //Split tickets into 2
    const chunkSize = 2
    for (let i = 0; i < finalTickets.length; i += chunkSize) {
      const chunk = finalTickets.slice(i, i + chunkSize)
      printTickets.push(chunk)
    }

    // split tickets into 4
    const chunkLen = 4
    for (let i = 0; i < finalTickets.length; i += chunkLen) {
      const chunk = finalTickets.slice(i, i + chunkLen)
      ticketsBy4.push(chunk)
    }

    // split tickets by 4 into 1
    const tixLen = 1
    for (let i = 0; i < ticketsBy4.length; i++) {
      let arr = []
      for (let j = 0; j < ticketsBy4[i].length; j += tixLen) {
        const chunk = ticketsBy4[i].slice(j, j + tixLen)
        arr.push(chunk)
      }
      ticketsBy1.push(arr)
    }

    //for special services
    // split tickets into 4
    const chunkLenSpecial = 4
    for (let i = 0; i < groupedSpecial.length; i += chunkLenSpecial) {
      const chunk = groupedSpecial.slice(i, i + chunkLenSpecial)
      ticketsBy4Special.push(chunk)
    }

    // split tickets by 4 into 2
    const tixLenSpecial = 2
    for (let i = 0; i < ticketsBy4Special.length; i++) {
      let arr = []
      for (let j = 0; j < ticketsBy4Special[i].length; j += tixLenSpecial) {
        const chunk = ticketsBy4Special[i].slice(j, j + tixLenSpecial)
        arr.push(chunk)
      }
      ticketsBy2Special.push(arr)
    }

    const marginTop = "0px"
    const marginRight = "10px"
    const marginBottom = "0px"
    const marginLeft = "20px"
    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`
    }

    return (
      <div>
        <style>{getPageMargins()}</style>
        <div className="print-area">
          {this.props.view === "cashier" && (
            <>
              {ticketsBy2Special.map((by4, index1) => {
                return (
                  <div className="print-break">
                    {by4.map((by2, index2) => {
                      return (
                        <div className="print-row">
                          {by2.map((data, index) => {
                            return generateTickets(
                              this.props.patientId,
                              this.props.bookingId,
                              this.props.name,
                              this.props.age,
                              this.props.gender,
                              this.props.contact,
                              this.props.result,
                              data[0]?.category,
                              by2[index],
                              this.props.discountCode,
                              "special",
                              "cashier"
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              <br />
              <div className="row justify-content-center">
                {/* Charge slip */}
                <div className="col-12 charge-slip" id="charge-slip">
                  <div class="d-flex justify-content-left">
                    <img src={logo} alt={"logo"} class="small-logo"></img>
                    <span className="to-right slip-span">
                      Quest and Reliance Diagnostics
                    </span>
                    <span className="to-right slip-span">09998886694</span>
                    <span className="to-right slip-span">
                      Marasbaras Tacloban City
                    </span>
                  </div>
                  <div className="row slip-header">
                    <div className="row m-0 p-0">
                      {/* <h3 className="m-0 p-0 slip-title">Laboratory Details</h3> */}
                      <table className="slip-table print-table">
                        <tr className="print-table">
                          <td>
                            <span className="slip-label slip-span">
                              Patient Name:
                            </span>
                            <span className="slip-detail slip-span">
                              {this.props.name}
                            </span>
                          </td>
                          <td>
                            <span className="slip-label slip-span">
                              Birthdate:
                            </span>
                            <span className="slip-detail slip-span">
                              {this.props.birthdate}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="row">
                      <table className="slip-table print-table">
                        <tr className="print-table">
                          <td>
                            <span className="slip-label slip-span">
                              Transaction No.:
                            </span>
                            <span className="slip-detail slip-span">
                              {this.props.bookingID}
                            </span>
                          </td>
                          <td>
                            <span className="slip-label slip-span">Date:</span>
                            <span className="slip-detail slip-span">
                              {this.props.bookingDate}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div className="row charge-slip-table mb-0 mr-0">
                    <table className="print-table">
                      <thead className="particulars">
                        <tr>
                          <th className="slip-detail slip-span">Particulars</th>
                          <th className="slip-detail slip-span">Qty</th>
                          <th className="slip-detail bold-slip-span">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.paymentDataServices.map((data, index) => (
                          <tr className="print-table">
                            <td className="slip-label slip-span">
                              {data.lab_test}
                            </td>
                            <td className="slip-label slip-span">1</td>
                            <td
                              className="slip-label bold-slip-span text-right"
                              align="right"
                            >
                              {formatPrice(parseFloat(data.price).toFixed(2))}
                            </td>
                          </tr>
                        ))}

                        {this.props.packages.map((data, index) => (
                          <tr className="print-table">
                            <td className="slip-label slip-span">
                              {data.name}
                              <br />
                              <span className="slip-span-details">
                                {data.details} [P]
                              </span>
                            </td>
                            <td className="slip-label slip-span">{data.qty}</td>
                            <td className="slip-label bold-slip-span">
                              {formatPrice(parseFloat(data.price).toFixed(2))}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td className="slip-label bold-slip-span">
                            Discount Fee:
                          </td>
                          <td
                            className="slip-label bold-slip-span text-right"
                            align="right"
                          >
                            {" "}
                            {parseFloat(this.props.discount).toFixed(2) == null
                              ? "NONE"
                              : formatPrice(
                                  parseFloat(this.props.discount).toFixed(2)
                                )}
                          </td>
                        </tr>
                        {parseFloat(this.props.hmo) > 1 && (
                          <tr>
                            <td></td>
                            <td className="slip-label bold-slip-span">
                              HMO Discount:
                            </td>
                            <td
                              className="slip-label bold-slip-span text-right"
                              align="right"
                            >
                              {" "}
                              {formatPrice(
                                parseFloat(this.props.hmo).toFixed(2)
                              )}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td></td>
                          {this.props.grandTotal > 0 && (
                            <>
                              <td className="slip-label bold-slip-span">
                                Total:
                              </td>
                              <td
                                className="slip-label bold-slip-span text-right"
                                align="right"
                              >
                                {formatPrice(this.props.grandTotal)}
                              </td>
                            </>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row charge-slip-table mb-0 mr-0">
                    <table className="print-table">
                      <tr className="print-table">
                        <td className="slip-label slip-span" width="40%">
                          Requested By:
                        </td>
                        {/* <td className="slip-label">{requested_by}</td> */}
                        <td className="slip-label slip-span">Admin</td>
                      </tr>
                      <tr className="print-table">
                        <td className="slip-label slip-span">Prepared By:</td>
                        {/* <td className="slip-label">{prepared_by}</td> */}
                        <td className="slip-label slip-span">Admin</td>
                      </tr>
                      <tr className="print-table">
                        <td className="slip-label slip-span">
                          Requested Time & Date:
                        </td>
                        {/* <td className="slip-label">{request_time}</td> */}
                        <td className="slip-label slip-span">{dateTime}</td>
                      </tr>
                      <tr className="print-table">
                        <td className="slip-label slip-span">
                          Received Time & Date:
                        </td>
                        {/* <td className="slip-label">{received_time}</td> */}
                        <td className="slip-label slip-span">{dateTime}</td>
                      </tr>
                    </table>
                    <p className="slip-label slip-span p-0 m-0">
                      Outpatient Requisition Slip
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          {this.props.view === "phlebo" && (
            <>
              {ticketsBy1.map((by4, index1) => {
                return (
                  <div className="page-break">
                    {/* <div> */}
                    {by4.map((by1, index2) => {
                      return (
                        <div className="print-row">
                          {by1.map((data, index) => {
                            return generateTicketsPOS(
                              this.props.patientId,
                              this.props.bookingId,
                              this.props.name,
                              this.props.age,
                              this.props.gender,
                              this.props.contact,
                              this.props.result,
                              data.name,
                              data.services,
                              this.props.discountCode,
                              "normal",
                              "phlebo"
                            )
                          })}
                        </div>
                      )
                    })}
                    {groupedSpecial.map((data, index) => {
                      return (
                        <div className="print-row">
                          {" "}
                          {generateTicketsPOS(
                            this.props.patientId,
                            this.props.bookingId,
                            this.props.name,
                            this.props.age,
                            this.props.gender,
                            this.props.contact,
                            this.props.result,
                            data[0]?.category,
                            groupedSpecial[index],
                            this.props.discountCode,
                            "special",
                            "phlebo"
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    )
  }
}
