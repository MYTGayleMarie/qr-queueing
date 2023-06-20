import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RingLoader } from "react-spinners";

import "./TableFooter.css";
import "../components/View/Imaging/Imaging.css";

function TableLoader({ tableHeaders, data, className }) {
  const [showLoading, setShowLoading] = useState(true);

  React.useEffect(() => {
    let loadingTime = setTimeout(() => {
      setShowLoading(false);
    }, 15000);
    return () => {
      clearTimeout(loadingTime);
    };
  }, []);

  const noDataDisplay = () => {
    return (
      <td colSpan={tableHeaders.length}>
        <FontAwesomeIcon
          icon={"search"}
          alt={"user"}
          aria-hidden="true"
          className="search-table-icon"
        />
        No Data found.
      </td>
    );
  };

  const loadingDisplay = () => {
    return (
      <tr align="center">
        <td
          colSpan={tableHeaders.length}
          align="center"
          style={{ textAlign: "-webkit-center" }}
        >
          <RingLoader color={"#3a023a"} showLoading={showLoading} size={70} />
        </td>
      </tr>
    );
  };

  return (
    <>
      {data !== undefined && data.length > 0 ? (
        loadingDisplay()
      ) : (
        <>
          {showLoading && loadingDisplay()}
          {!showLoading && noDataDisplay()}
        </>
      )}
    </>
  );

  // if (data && data.length > 0) {
  //   return <>{loadingDisplay()};</>;
  // } else {
  //   return (
  //     <>
  //       {showLoading && loadingDisplay()}

  //       {!showLoading && noDataDisplay()}
  //     </>
  //   );
  // }
}

export default TableLoader;
