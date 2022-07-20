import React, { useState } from 'react';
import { updateStatus } from '../../Helpers/apiCalls/commonApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApprovalModal.css';
import { refreshPage } from '../../Helpers/Utils/Common';
import { Navigate } from 'react-router-dom';
import Link from 'react-csv/lib/components/Link';

function Upload({screen, show, handleClose, item, type, table, id, link = '', details }) {
  const [redirect, setRedirect] = useState(false);

  async function updateOutletStatus(status) {
    const response = await updateStatus(table, status, id);
    console.log(response)
    if(response.data) {
      if(response.data.status === 200) {
        toast.success("Successful status update!" );
      }
    } else {
      if(response.error.status === 500) {
        toast.error("Unsuccessful status update" );
      }
    }   
    setTimeout(function () {
      refreshPage();
    }, 2000);
  }

  if(redirect) {
    return <Navigate to={link}/>
  }
  //console.log(details);

  if(type === 'manager') {
//     if(screen === 'outlets') {  
//       return (
//       <div className={show ? "modal display-block" : "modal display-none"}>
//         <section className="modal-main">
//             <p className='modal-content-admin'>Do you want this <b>{item}</b> to be approved?</p>
//             <p><b>DETAILS</b></p>
//             <p><b>Outlet: </b> {details.branch}</p>
//             <p><b>Outlet Type: </b> {details.outlet_type}</p>
//             <p><b>Status: </b> {details.status}</p>
//             {/* <p><b>Services: </b> {details.services}</p> */}
//             <p><b>Fusion Loc. Code: </b> {details.code}</p>
//             <p><b>Contact Number: </b> {details.contact_number}</p>
//             <p><b>Description: </b> {details.description}</p>
//             <p><b>Province: </b> {details.province}</p>
//             <p><b>Address: </b> {details.address}</p>
//             <p><b>Remarks 1: </b> {details.remarks_1}</p>
//             <p><b>Remarks 2: </b> {details.remarks_2}</p>
//             <p><b>Remarks 3: </b> {details.remarks_3}</p>
//           <button type="button" className='modal-cancel-btn-admin' onClick={handleClose}>
//             Close
//           </button>
//           <button type="button" className='modal-accept-btn-admin' onClick={() => updateOutletStatus("active")}>
//             Approve
//           </button>
//           <button type="button" className='modal-delete-btn-admin' onClick={() => updateOutletStatus("disapproved")}>
//             Disapprove
//           </button>
//         </section>
//       </div>
//       )
//     }
    if(screen === 'view-booking') {  
        return (
        <div className={show ? "modal display-block" : "modal display-none"}>
          <section className="modal-main">
              <p className='modal-content-admin'>Are you sure you want to upload this files/s?</p>
              <p><b>DETAILS</b></p>
              {/* <p><b>Outlet: </b> {details.branch}</p>
              <p><b>Outlet Type: </b> {details.outlet_type}</p>
              <p><b>Status: </b> {details.status}</p>
              {/* <p><b>Services: </b> {details.services}</p> */}
              {/* <p><b>Fusion Loc. Code: </b> {details.code}</p>
              <p><b>Contact Number: </b> {details.contact_number}</p>
              <p><b>Description: </b> {details.description}</p>
              <p><b>Province: </b> {details.province}</p>
              <p><b>Address: </b> {details.address}</p>
              <p><b>Remarks 1: </b> {details.remarks_1}</p>
              <p><b>Remarks 2: </b> {details.remarks_2}</p>
              <p><b>Remarks 3: </b> {details.remarks_3}</p>  */}
            <button type="button" className='modal-cancel-btn-admin' onClick={handleClose}>
              Close
            </button>
            <button type="button" className='modal-accept-btn-admin' onClick={() => updateOutletStatus("active")}>
              Approve
            </button>
            <button type="button" className='modal-delete-btn-admin' onClick={() => updateOutletStatus("disapproved")}>
              Disapprove
            </button>
          </section>
        </div>
        )
      }
  
  else {
    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
          <section className="modal-main">
              <p className='modal-content-admin'><b>{item}</b> is pending for approval</p>
            <button type="button" className='modal-cancel-btn-admin' onClick={handleClose}>
              Close
            </button>
            <button type="button" className='modal-edit-btn-admin' onClick={() => setRedirect(true)}>
              Edit
            </button>
          </section>
        </div>
    )
  }
}
}
export default Upload 