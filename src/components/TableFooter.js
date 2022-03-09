import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./TableFooter.css";

const TableFooter = ({ range, setPage, page, slice, footerClass, setRowsPerPage, rowsPerPage }) => {

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);

  function prev() {
    var end = endIndex;
    var start = startIndex;
    if(startIndex > 0) {
    setEndIndex(end - 7);
    setStartIndex(start - 7);
    }
  }

  function next() {
    var end = endIndex;
    var start = startIndex;
    if(endIndex <= range.length - 1) {
      setEndIndex(end + 7);
      setStartIndex(start + 7);
    }
  }

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage ]);

  return (
    <div className={"tableFooter " + footerClass}>
      <div className="col page-count-cont">
        <span>Rows per page: </span>
        <select className="rows-input" onChange={(e) => setRowsPerPage(e.target.value)}>
          <option value={5}>5</option>
          <option value={10} selected>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
        </select>
        <span>{page} of {range.length}</span>
     </div>
     <div className="col pages-cont d-flex justify-content-center">
      <button className="button navigateButton" onClick={() => prev()}>
        <FontAwesomeIcon icon={"angle-double-left"} alt={"previous"} aria-hidden="true" className="prev-icon"/>
      </button>
      {range.slice(startIndex, endIndex).map((el, index) => (
        <button
          key={index}
          className={`${"button"} ${
            page === el ? "activeButton" : "inactiveButton"
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
       <button className="button navigateButton" onClick={() => next()}>
        <FontAwesomeIcon icon={"angle-double-right"} alt={"next"} aria-hidden="true" className="next-icon"/>
       </button>
       </div>
       <div className="col"></div>
    </div>
  );
};

export default TableFooter;