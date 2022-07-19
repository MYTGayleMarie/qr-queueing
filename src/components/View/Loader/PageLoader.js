import Loader from "./components/view/Loader/PageLoader.css";
import React from 'react';
import { RingLoader } from "react-spinners";

function TableLoader({tableHeaders}) {


  return (
        <>
            <tr>
                {labTests.map((data,index) => {
                    return  <td class="td-3"><span></span></td>
                })}
            </tr>
            <tr>
            {labTests.map((data,index) => {
                return  <td class="td-3"><span></span></td>
            })}
            </tr>
            <tr>
            {labTests.map((data,index) => {
                return  <td class="td-3"><span></span></td>
            })}
            </tr>
            <tr>
            {labTests.map((data,index) => {
                return  <td class="td-3"><span></span></td>
            })}
            </tr>
            <tr>
            {labTests.map((data,index) => {
                return  <td class="td-3"><span></span></td>
            })}
            </tr>
            <tr>
            {labTests.map((data,index) => {
                return  <td class="td-3"><span></span></td>
            })}
            </tr>
        </>
  )
}

export default TableLoader

// import "triangle.css";
// import "./styles.css";
// import { data } from "./model";
// import ReactTooltip from "react-tooltip";

// function PageLoader({labTests}) {

//   return (
//     <div class="container mt-5 text-center">
//       <h3>React Spinners</h3>
//       <div className="row">
//         {labTests.map((loader, index) => (
//           <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 p-5">
//             <div
//               data-tip={loader.name}
//               data-for="medtech"
//               key={loader.name + index}
//               className="loaderBox"
//             >
//               <loader.Component {...loader.props} />
//             </div>
//           </div>
//         ))}
//       </div>
//       <ReactTooltip
//         id="happyFace"
//         place="top"
//         type="dark"
//         effect="float"
//         getContent={(dataTip) => `${dataTip}`}
//       />
//     </div>
//   );
// }
// export default PageLoader
