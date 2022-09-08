// import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "Components/Button/Button";

//css
import "./UploadModal.css";

const ModalPopUp = ({ type, show, handleClose, title, item, content }) => {
  const showHideClassName = show ? "modal-pop display-block" : "modal-pop display-none";
  // if (type === "reset-password") {

  //   return (
  //     <div className={showHideClassName}>
  //       <section className="modal-main modal-reset">
  //         <div className="modal-cont-header d-flex justify-content-center">
  //           <div className="modal-header-label">Reset Password</div>
  //         </div>
  //         <hr className="modal-line" />
  //         <div className="modal-content-body">
  //           <div className="input-label mt-4">Email</div>
  //           <input type="text" className="input-2" />

  //           <div className="input-label mt-4">New Password</div>
  //           <input type="text" className="input-2" />

  //           <div className="input-label mt-4">Confirm Password</div>
  //           <input type="text" className="input-2" />
  //         </div>
  //         <div className="btn-cont">
  //           <button type="button" className="btn-cancel" onClick={handleClose}>
  //             Cancel
  //           </button>
  //           <button type="button" className="btn-done" onClick={handleClose}>
  //             Done
  //           </button>
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  if (type === "print-invoice") {

    return (
      <div className={showHideClassName}>
<section className="modal-main modal-reset">
          <div className="modal-cont-header d-flex justify-content-center">
            <div className="modal-header-label">MAKE A PLEDGE</div>
          </div>
          <div className="row">
          <div className="cont"></div>
          </div>
          <div className="modal-content-body">
            <p className="c-box btn-green mt-4">PHP 50,000.00</p>
            {/* <input type="text" className="input-2" /> */}
          </div>
          <div className=" row pt-4 ">
            <div className=" col-6 pt-4">
            <input type="checkbox" className="ms-5 me-2 name-t" />
            <div className="input-label name-t mt-4">IN-KIND</div>
            </div>
            </div>
            <div className=" row pt-4 ">
            <div className=" col-12 pt-0 ">
            <input type="checkbox" className="ms-5 me-2 name-t" />
            <div className="input-label name-t mt-4">MAKE ME ANONYMOUS</div>
            </div>
            </div>
          <div className="btn-cont">
            <button type="button" className="btn-mar me-4" onClick={handleClose}>
              Cancel
            </button>
            <button type="button" className="label-maroon" onClick={handleClose}>
              pledge
            </button>
          </div>
        </section>
      </div>
    );
  }


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
          Here
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );

 

};

ModalPopUp.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.string,
  content: PropTypes.string,
};

export default ModalPopUp;
