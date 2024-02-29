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

    var package_list = groupByAndConvertToArrayOfArrays(
      this.props.services.filter((data) => data.package !== null),
      "package"
    )

    var groupedSpecial = groupByAndConvertToArrayOfArrays(
      specialServices,
      "key"
    )

    //new
    // var groupedServices = groupArrayOfObjects(remainingServices, "key")

    //reverted
    var groupedServices = groupArrayOfObjects(this.props.services, "key")

    var groupedServicesOthers = groupByAndConvertToArrayOfArrays(
      remainingServices,
      "key"
    )
    const services_XRAY = Object.keys(groupedServices).map(function (key) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      //reverted
                      //<div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "CARDIOLOGY" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "RADIOLOGY" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
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
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
        </tr>
      )
    })

    //tests for ob ultraosund
     const ob_ultrasound = Object.keys(groupedServices).map(function (
      key
    ) {
      var category_name = key.replace(/_/g, " ").toUpperCase()
      var category_services = ""

      groupedServices[key].map((info, index) => {
        if (groupedServices[key].length - 1 == index) {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
        }
      })

    

      if (category_name !== "OB GYNE ULTRASOUND") {
        return ""
      }


      return (
        <tr className="print-table-double">
          {category_name == "OB GYNE ULTRASOUND" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
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
    //             category_services += info.name + info.type === "package" ? " [P]":"";
    //         }
    //         else {
    //             category_services += info.name + info.type === "package" ? " [P]":"" + ", ";
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
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
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
          {category_name == "ELECTROLYTES" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "GLUCOSE TESTS" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "KIDNEY FUNCTION TESTS" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "LIPID PROFILE" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "PANCREATIC TEST" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "LIVER FUNCTION TESTS" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "CHEMISTRY" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}

          {category_name == "SEROLOGY" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "IMMUNOLOGY" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "HEPATITIS PROFILE SCREENING" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "THYROID PROFILE" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}

          {category_name == "COAGUATION STUDIES" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "TUMOR MARKERS" && (
            <>
              <td>
                {/* <span className="data">{category_services}</span> */}
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
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
            category_services +=
              info.name + (info.type === "package" ? " [P]" : "")
          } else {
            category_services +=
              info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                  <div className="row justify-content-start">
                    {category_services.split("|").map((data) => {
                      return (
                         <span className="data-chem">{data}</span>
                        // <div className="col-12">
                        //   <div class="form-check">
                        //     <input
                        //       class="form-check-input"
                        //       type="checkbox"
                        //       value=""
                        //       id="flexCheckDefault"
                        //     />
                        //     <span className="data-chem">{data}</span>
                        //   </div>
                        // </div>
                      )
                    })}
                  </div>
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
            category_services +=
              info.name + (info.type === "package" ? " [P]" : "")
          } else {
            category_services +=
              info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                  <div className="row justify-content-start">
                    {category_services.split("|").map((data) => {
                      return (
                         <span className="data-chem">{data}</span>
                        // <div className="col-12">
                        //   <div class="form-check">
                        //     <input
                        //       class="form-check-input"
                        //       type="checkbox"
                        //       value=""
                        //       id="flexCheckDefault"
                        //     />
                        //     <span className="data-chem">{data}</span>
                        //   </div>
                        // </div>
                      )
                    })}
                  </div>
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
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
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
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "")
        } else {
          category_services +=
            info.name + (info.type === "package" ? " [P]" : "") + "|"
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
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "MICROBIOLOGY" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "HISTOPATHOLOGY" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
          {category_name == "COVID RAPID TESTS" && (
            <>
              <td>
                <div className="row justify-content-start">
                  {category_services.split("|").map((data) => {
                    return (
                      <span className="data-chem">{data}</span>
                      // <div className="col-12">
                      //   <div class="form-check">
                      //     <input
                      //       class="form-check-input"
                      //       type="checkbox"
                      //       value=""
                      //       id="flexCheckDefault"
                      //     />
                      //     <span className="data-chem">{data}</span>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </td>
            </>
          )}
        </tr>
      )
    })

    // generate request ticket - hide for future purposes
    function generateTickets(
      queue,
      patientId,
      bookingId,
      name,
      age,
      gender,
      contact,
      email,
      address,
      referral,
      isCompany,
      payment,
      result,
      serviceName,
      services,
      discountCode,
      type = "normal",
      specialData = []
    ) {
      return (
        <div className="print-column">
          <div class="d-flex justify-content-left mx-0">
            <img src={logo} alt={"logo"} className="payment-logo"></img>
            <span className="to-right request-header">
              #{bookingId} Request Form - Patient ID:{patientId}
            </span>
            <span className="to-right-test request-header-test">
              {serviceName}
            </span>
          </div>
          <div className="row mx-0">
            <table className="print-table">
              <tr>
                <td className="print-data-header">
                  <span className="header">Booking Date: </span>
                  <span className="detail-print">
                    {formattedBookDate[1] +
                      " " +
                      formattedBookDate[2] +
                      " " +
                      formattedBookDate[3] +
                      " " +
                      getTime(bookDate)}
                  </span>
                </td>
                <td>
                  <span className="header">Name: </span>
                  <span className="detail-print">{name}</span>
                </td>
              </tr>
            </table>
            <table className="print-table">
              <tr>
                <td>
                  <span className="header">DOB: </span>
                  <span className="detail-print">
                    {parseInt(birthDate.getMonth() + 1) +
                      "-" +
                      birthDate.getDate() +
                      "-" +
                      birthDate.getFullYear() +
                      " "}
                  </span>{" "}
                </td>
                <td>
                  <span className="header">Age: </span>
                  <span className="detail-print">{age}</span>
                </td>
                <td>
                  <span className="header">Gender:</span>
                  <span className="detail-print detail-gender">
                    {gender.toLowerCase() == "female" ? "F" : "M"}
                  </span>
                </td>
                <td className="print-data-contact">
                  <span className="header">Contact: </span>
                  <span className="detail-print">{contact}</span>
                </td>
              </tr>
            </table>
            <table className="print-table">
              <tr>
                <td>
                  <span className="header">Email: </span>
                  <span className="detail-print">
                    {email == null ? "NONE" : email}{" "}
                  </span>
                </td>
                <td>
                  <span className="header">Address: </span>
                  <span className="detail-print">{address}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="header">Physician: </span>
                  <span className="detail-print">
                    {referral == null ? "NONE" : referral}{" "}
                  </span>
                </td>
                <td>
                  <span className="header">Discount Code: </span>
                  <span className="detail-print">
                    {discountCode ? discountCode : "None"}
                  </span>
                </td>
              </tr>
            </table>
            <table className="print-table">
              <tr>
                <td>
                  <span className="header">Diagnosis: </span>
                  <span className="detail-print">
                    ______________________________________________________________________________
                  </span>
                </td>
              </tr>
            </table>
          </div>

          {/* <div className="line"></div> */}
          {type === "normal" && (
            <div className="row mx-0">
              <table className="services-table print-table-double">
                <tr>
                  <th>
                    <span className="header">Services</span>
                  </th>
                </tr>
                {services}
              </table>
            </div>
          )}
          {type === "special" && (
            <div className="row mx-0 mt-1 mb-2">
              <table className="services-table print-table-double">
                <tr style={{ border: "1px solid black" }}>
                  {specialServices.map((val) => {
                    return (
                      <td
                        style={{
                          fontSize: "6px",
                          padding: 3,
                          border: "1px solid black",
                        }}
                        align="center"
                      >
                        {val.name}
                      </td>
                    )
                  })}
                </tr>
              </table>
            </div>
          )}

          <table className="print-table mx-0">
            <tr>
              <td className="print-table">
                <span className="footer-header mx-0 px-0">
                  <b>Payment:</b>
                </span>
                <span className="data">
                  {isCompany && discountCode
                    ? " CORPORATE ACCOUNT - " + discountCode
                    : payment
                    ? " " + payment.toUpperCase()
                    : " "}
                </span>
              </td>
            </tr>
            <tr>
              <td className="print-table">
                <span className="footer-header">
                  <b>Result:</b>
                </span>
                <span className="data"> {result.toUpperCase()}</span>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td className="print-table">
                <span className="data">
                  Encoded on:{" "}
                  {formattedEncodedDate[1] +
                    " " +
                    formattedEncodedDate[2] +
                    ", " +
                    getTime(encodedDate)}
                </span>
              </td>
            </tr>
            <tr>
              <td className="print-table">
                <span className="data">
                  Printed on:{" "}
                  {today[1] + " " + today[2] + ", " + today[3] + ", " + curTime}
                </span>
              </td>
            </tr>
          </table>
        </div>
      )
    }

    // NEWW
    // //Generate Request ticket stub
    // function generateTickets(
    //   patientId,
    //   bookingId,
    //   name,
    //   age,
    //   gender,
    //   contact,
    //   result,
    //   serviceName,
    //   services,
    //   discountCode,
    //   type,
    //   viewType
    // ) {
    //   return (
    //     // phlebo to be able to stretch to 100
    //     <div className={"print-column"}>
    //       <div class="d-flex row justify-content-left mx-0">
    //         <div className="col-2 mt-2">
    //           <img src={logo} alt={"logo"} className="payment-logo mt-1"></img>
    //         </div>
    //         <div className="col mt-1">
    //           <span className="to-right request-header">
    //             Request Form - Patient ID:{patientId}
    //           </span>
    //         </div>
    //         <div className="col text-right">
    //           <span className="request-header-test">
    //             BOOKING #<strong>{bookingId}</strong>
    //           </span>
    //         </div>
    //       </div>
    //       {/* <div className="row justify-content-end">
    //         <div className="col text-right">
    //           <span className="request-header-test">
    //             BOOKING #<strong>{bookingId}</strong>
    //           </span>
    //         </div>
    //       </div> */}

    //       <div className="row mx-0 mt-1 mb-2">
    //         <table className="services-table print-table-double">
    //           <tr style={{ border: "1px solid black" }}>
    //             <td align="center">
    //               <span
    //                 style={{
    //                   fontSize: "15px",
    //                   padding: 3,
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 {serviceName?.toUpperCase()}
    //               </span>
    //               <br />
    //               <span className="mt-1">
    //                 {type === "special" && (
    //                   <>
    //                     <td>
    //                       <span className="data">
    //                         {services
    //                           .map(
    //                             (val) =>
    //                               val.name +
    //                               (val.type === "package" ? " [P]" : "")
    //                           )
    //                           .join(", ")}
    //                       </span>
    //                     </td>
    //                   </>
    //                 )}
    //                 {type === "normal" && services}
    //               </span>
    //             </td>
    //           </tr>
    //         </table>
    //       </div>
    //       <div className="row mx-0">
    //         <table className="print-table-stub">
    //           {/* for 50% display */}
    //           <tr>
    //             <td>
    //               <span className="header">Name: </span>
    //               <span className="detail-print">{name}</span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">Age: </span>
    //               <span className="detail-print">{age}</span>
    //             </td>
    //             <td>
    //               <span className="header">Gender:</span>
    //               <span className="detail-print">
    //                 {gender.toLowerCase() == "female" ? "F" : "M"}
    //               </span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">DOB: </span>
    //               <span className="detail-print">
    //                 {formatDate(birthDate)}
    //               </span>{" "}
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">Contact: </span>
    //               <span className="detail-print">{contact}</span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">Discount Code: </span>
    //               <span className="detail-print">
    //                 {discountCode ? discountCode : "None"}
    //               </span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <span className="header">
    //                 <b>Result:</b>
    //               </span>
    //               <span className="detail-print"> {result.toUpperCase()}</span>
    //             </td>
    //           </tr>
    //           {/* for 100% display */}
    //           {/* <tr>
    //             <td width={50}>
    //               <span className="header">Name: </span>
    //               <span className="detail-print">{name}</span>
    //             </td>
    //             <td width={25}>
    //               <span className="header">Age: </span>
    //               <span className="detail-print">{age}</span>
    //             </td>
    //             <td width={25}>
    //               <span className="header">Gender:</span>
    //               <span className="detail-print detail-gender">
    //                 {gender.toLowerCase() == "female" ? "F" : "M"}
    //               </span>
    //             </td>
    //           </tr>

    //           <tr>
    //             <td width={50}>
    //               <span className="header">DOB: </span>
    //               <span className="detail-print">
    //                 {formatDate(birthDate)}
    //               </span>{" "}
    //             </td>

    //             <td width={50}>
    //               <span className="header">Contact: </span>
    //               <span className="detail-print">{contact}</span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td width={50}>
    //               <span className="header">Discount Code: </span>
    //               <span className="detail-print">
    //                 {discountCode ? discountCode : "None"}
    //               </span>
    //             </td>
    //             <td width={50}>
    //               <span className="header">
    //                 <b>Result:</b>
    //               </span>
    //               <span className="detail-print"> {result.toUpperCase()}</span>
    //             </td>
    //           </tr> */}
    //         </table>
    //       </div>
    //     </div>
    //   )
    // }

    // //Generate Request ticket stub POS view
    // function generateTicketsPOS(
    //   patientId,
    //   bookingId,
    //   name,
    //   age,
    //   gender,
    //   contact,
    //   result,
    //   serviceName,
    //   services,
    //   discountCode,
    //   type,
    //   viewType
    // ) {
    //   return (
    //     <div className="print-column-phlebo">
    //       <div class="d-flex row justify-content-left mx-0">
    //         <div className="col-6">
    //           <img
    //             src={logo}
    //             alt={"logo"}
    //             className="payment-logo-phlebo mt-1"
    //           ></img>
    //         </div>

    //         <div className="col-6 text-right">
    //           <span className="request-header-phlebo">
    //             BOOKING #<strong>{bookingId}</strong>
    //           </span>
    //         </div>
    //         <div className="col-12 text-left align-left">
    //           <span className="request-header-phlebo text-left">
    //             Request Form-Patient ID:{patientId}
    //           </span>
    //         </div>
    //       </div>
    //       {/* <div className="row justify-content-end">
    //         <div className="col text-right">
    //           <span className="request-header-test">
    //             BOOKING #<strong>{bookingId}</strong>
    //           </span>
    //         </div>
    //       </div> */}

    //       <div className="row mx-0 mt-1 mb-2">
    //         <table className="services-table print-table-double">
    //           <tr style={{ border: "1px solid black" }}>
    //             <td align="center" className="p-4">
    //               <span
    //                 style={{
    //                   fontSize: "15px",
    //                   padding: 5,
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 {serviceName?.toUpperCase()}
    //               </span>
    //               <br />
    //               <div className="row justify-content-center">
    //                 <div className="col-12 text-left">
    //                   {type === "special" && (
    //                     <>
    //                       <td>
    //                         <span className="data">
    //                           {/* {services.map((val) => val.name).join(", ")} */}
    //                           <div className="row justify-content-start">
    //                             {services.map((data) => {
    //                               return (
    //                                 <div className="col-12">
    //                                   <div class="form-check">
    //                                     <input
    //                                       class="form-check-input"
    //                                       type="checkbox"
    //                                       value=""
    //                                       id="flexCheckDefault"
    //                                     />
    //                                     <span className="data-chem">
    //                                       {data.name}
    //                                     </span>
    //                                   </div>
    //                                 </div>
    //                               )
    //                             })}
    //                           </div>
    //                         </span>
    //                       </td>
    //                     </>
    //                   )}
    //                   {type === "normal" && services}
    //                 </div>
    //               </div>
    //             </td>
    //           </tr>
    //         </table>
    //       </div>
    //       <div className="row mx-0 mt-3">
    //         <table className="print-table-stub-pos">
    //           <tr>
    //             <td width="100%">
    //               <span className="header-phlebo">Name: </span>
    //               <span className="detail-print-phlebo">{name}</span>
    //             </td>
    //           </tr>
    //         </table>
    //         <table className="print-table-stub-pos">
    //           <tr>
    //             <td width={25}>
    //               <span className="header-phlebo">Age: </span>
    //               <span className="detail-print-phlebo">{age}</span>
    //             </td>
    //             <td width={100}>
    //               <span className="header-phlebo">DOB: </span>
    //               <span className="detail-print-phlebo">
    //                 {formatDate(birthDate)}
    //               </span>
    //             </td>
    //           </tr>

    //           <tr>
    //             <td width={25}>
    //               <span className="header-phlebo">Gender:</span>
    //               <span className="detail-print-phlebo detail-gender">
    //                 {gender.toLowerCase() == "female" ? "F" : "M"}
    //               </span>
    //             </td>

    //             <td width={100}>
    //               <span className="header-phlebo">Contact: </span>
    //               <span className="detail-print-phlebo">{contact}</span>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td width={25}>
    //               <span className="header-phlebo">
    //                 <b>Result:</b>
    //               </span>
    //               <span className="detail-print-phlebo">
    //                 {result.toUpperCase()}
    //               </span>
    //             </td>
    //             <td width={100}>
    //               <span className="header-phlebo">Discount Code: </span>
    //               <span className="detail-print-phlebo">
    //                 {discountCode ? discountCode : "None"}
    //               </span>
    //             </td>
    //           </tr>
    //         </table>
    //       </div>
    //     </div>
    //   )
    // }
    const tickets = [
      {
        name: "CHEM-SERO",
        services: services_Serology,
      },
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
      {
        name: "OB-ULTRASOUND",
        services: ob_ultrasound,
      },
      //   {
      //     name: 'COAGUATION',
      //     services: services_Coaguation
      // },

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
    var ticketsBy2 = []
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

    // // split tickets into 4
    // const chunkLen = 4
    // for (let i = 0; i < finalTickets.length; i += chunkLen) {
    //   const chunk = finalTickets.slice(i, i + chunkLen)
    //   ticketsBy4.push(chunk)
    // }

    // // split tickets by 4 into 1
    // const tixLen = 1
    // for (let i = 0; i < ticketsBy4.length; i++) {
    //   let arr = []
    //   for (let j = 0; j < ticketsBy4[i].length; j += tixLen) {
    //     const chunk = ticketsBy4[i].slice(j, j + tixLen)
    //     arr.push(chunk)
    //   }
    //   ticketsBy1.push(arr)
    // }

    //for special services
    // split tickets into 4
    const chunkLenSpecial = 4
    for (let i = 0; i < groupedSpecial.length; i += chunkLenSpecial) {
      const chunk = groupedSpecial.slice(i, i + chunkLenSpecial)
      ticketsBy4Special.push(chunk)
    }

    // split tickets by 4 into 1
    const tixLenSpecial = 1
    for (let i = 0; i < ticketsBy4Special.length; i++) {
      let arr = []
      for (let j = 0; j < ticketsBy4Special[i].length; j += tixLenSpecial) {
        const chunk = ticketsBy4Special[i].slice(j, j + tixLenSpecial)
        arr.push(chunk)
      }
      ticketsBy2Special.push(arr)
    }

    // split tickets into 4
    const chunkLen = 4
    for (let i = 0; i < finalTickets.length; i += chunkLen) {
      const chunk = finalTickets.slice(i, i + chunkLen)
      ticketsBy4.push(chunk)
    }

    // split tickets by 4 into 2
    const tixLen = 2
    for (let i = 0; i < ticketsBy4.length; i++) {
      let arr = []
      for (let j = 0; j < ticketsBy4[i].length; j += tixLen) {
        const chunk = ticketsBy4[i].slice(j, j + tixLen)
        arr.push(chunk)
      }
      ticketsBy2.push(arr)
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
          {ticketsBy2.map((by4, index1) => {
            if (ticketsBy2.length - 1 === index1) {
              setTimeout(() => {
                this.props.setPrintReadyFinal(true)
              }, 3000)
            }
            return (
              <div className="print-break">
                {by4.map((by2, index2) => {
                  return (
                    <div className="print-row">
                      {by2.map((ticket) => {
                     
                        return generateTickets(
                          this.props.queue,
                          this.props.patientId,
                          this.props.bookingId,
                          this.props.name,
                          this.props.age,
                          this.props.gender,
                          this.props.contact,
                          this.props.email,
                          this.props.address,
                          this.props.referral,
                          this.props.isCompany,
                          this.props.payment,
                          this.props.result,
                          ticket.name,
                          ticket.services,
                          this.props.discountCode
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}

          <br />

          <div className={"row-column"}>
            {/* Charge slip */}
            <div className="m-0 charge-slip" id="charge-slip">
              <div class="d-flex justify-content-left mx-0">
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
                        <span className="slip-label slip-span">Birthdate:</span>
                        <span className="slip-detail slip-span">
                          {this.props.birthdate}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="row m-0 p-0">
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
                        <td className="slip-label bold-slip-span">
                          P {parseFloat(data.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {/* {this.props.labTests.map((data, index)=>
                      <tr className='print-table'>
                        <td className="slip-label slip-span">{data.name}</td>
                        <td className="slip-label slip-span">{data.qty}</td>
                        <td className="slip-label bold-slip-span">P {parseFloat(data.price).toFixed(2)}</td>
                      </tr>
                    )}   */}
                    {package_list.map((data, index) => (
                      <tr className="print-table">
                        <td className="slip-label slip-span">
                          {data[0].package} [P] <br />
                          {/* {data.map((val) => {
                                    return (
                                      <div style={{ textIndent: "20px" }}>
                                        {`• ${val.name} `} <br />
                                      </div>
                                    )
                                  })} */}
                        </td>
                        <td className="slip-label slip-span">1</td>
                        {/* <td className="slip-label slip-span">{data.qty}</td> */}
                        <td className="slip-label bold-slip-span">
                          P{" "}
                          {formatPrice(
                            parseFloat(
                              this.props.packageOptions.filter(
                                (val) => val.name === data[0].package
                              )[0]?.price
                            ).toFixed(2)
                          )}
                          {/* {formatPrice(parseFloat(data.price).toFixed(2))} */}
                        </td>
                      </tr>
                    ))}
                    {/* {this.props.packages.map((data, index) => (
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
                          P {parseFloat(data.price).toFixed(2)}
                        </td>
                      </tr>
                    ))} */}
                    <tr>
                      <td></td>
                      <td className="slip-label bold-slip-span">
                        Discount Fee:
                      </td>
                      <td className="slip-label bold-slip-span">
                        {" "}
                        {parseFloat(this.props.discount).toFixed(2) == null
                          ? "NONE"
                          : parseFloat(this.props.discount).toFixed(2)}
                      </td>
                    </tr>
                    {parseFloat(this.props.hmo) > 1 && (
                      <tr>
                        <td></td>
                        <td className="slip-label bold-slip-span">
                          HMO Discount:
                        </td>
                        <td className="slip-label bold-slip-span">
                          {" "}
                          {parseFloat(this.props.hmo).toFixed(2)}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td></td>
                      {this.props.grandTotal > 0 && (
                        <>
                          <td className="slip-label bold-slip-span">Total:</td>
                          <td className="slip-label bold-slip-span">
                            {this.props.grandTotal}
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

            {/* Claim Stub */}
            <div className={"claim-stub-container"}>
              <div className="claim-stub-inner">
                <div className="claim-stub-rotate">
                  <div class="d-flex justify-content-left mx-0">
                    <img src={logo} alt={"logo"} class="small-logo"></img>
                    <span className="to-right claim-span">
                      #
                      {this.props.queue == "0"
                        ? this.props.queue.bookingId
                        : this.props.queue}{" "}
                      CLAIM STUB - Patient ID:{this.props.patientId}
                    </span>
                  </div>
                  <table>
                    <tr>
                      <td>
                        <span className="header claim-span">
                          Booking Date:{" "}
                        </span>
                        <span className="detail-print claim-span">
                          {formattedBookDate[1] +
                            " " +
                            formattedBookDate[2] +
                            " " +
                            formattedBookDate[3] +
                            " " +
                            getTime(bookDate)}
                        </span>
                      </td>
                      <td>
                        <span className="header claim-span">Name: </span>
                        <span className="detail-print claim-span">
                          {this.props.name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="header claim-span">GRAND TOTAL: </span>
                        <span className="detail-print bold-claim-span">
                          P {this.props.grandTotal}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="header claim-span">Encoded on: </span>
                        <span className="detail-print bold-claim-span">
                          {formattedEncodedDate[1] +
                            " " +
                            formattedEncodedDate[2] +
                            ", " +
                            getTime(encodedDate)}
                        </span>
                      </td>
                      <td>
                        <span className="header claim-span">Printed on: </span>
                        <span className="detail-print bold-claim-span">
                          {today[1] +
                            " " +
                            today[2] +
                            ", " +
                            today[3] +
                            ", " +
                            curTime}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
