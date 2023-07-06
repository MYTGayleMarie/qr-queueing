import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TableFooter.css";

const TableFooter = ({
  range,
  setPage,
  page,
  slice,
  footerClass,
  setRowsPerPage,
  rowsPerPage,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  function prev() {
    var end = endIndex;
    var start = startIndex;
    if (startIndex > 0) {
      setEndIndex(end - 5);
      setStartIndex(start - 5);
    }
  }

  function next() {
    var end = endIndex;
    var start = startIndex;
    if (endIndex <= range.length - 1) {
      setEndIndex(end + 5);
      setStartIndex(start + 5);
    }
  }

  function start() {
    if (range.length != 0) {
      setPage(range[0]);
      setEndIndex(5);
      setStartIndex(0);
    }
  }

  function end() {
    if (range.length != 0) {
      setPage(range.length);
      setEndIndex(range.length);
      setStartIndex(range.length - 5);
    }
  }

  function setPageNav(el) {
    var division = Math.floor(el / 5);
    if (Math.floor(el % 5) != 0) {
      division += 1;
    }
    setEndIndex(division * 5);
    setStartIndex(division * 5 - 5);
    setPage(parseFloat(el));
  }

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div
      className={"tableFooter d-flex row justify-content-center" + footerClass}
    >
      <div className="col-3 page-count-cont">
        <span>Rows per page: </span>
        <select
          className="rows-input"
          onChange={(e) => setRowsPerPage(e.target.value)}
        >
          <option value={10} selected>
            10
          </option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={500}>500</option>
        </select>
        <span>
          | {page} of {range.length}
        </span>
      </div>
      <div className="col-8 pages-cont text-center align-center">
        <button className="button navigateButton" onClick={() => start()}>
          <FontAwesomeIcon
            icon={"angle-double-left"}
            title={"Start"}
            alt={"Start"}
            aria-hidden="true"
            className="prev-icon"
          />
        </button>
        <button
          className={
            range.length <= 5
              ? "disable button navigateButton"
              : "button navigateButton"
          }
          onClick={() => prev()}
        >
          <FontAwesomeIcon
            icon={"angle-left"}
            title={"Previous"}
            alt={"previous"}
            aria-hidden="true"
            className="prev-icon"
          />
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
        <button
          className={
            range.length <= 5
              ? "disable button navigateButton"
              : "button navigateButton"
          }
          onClick={() => next()}
        >
          <FontAwesomeIcon
            icon={"angle-right"}
            alt={"next"}
            title={"Next"}
            aria-hidden="true"
            className="next-icon"
          />
        </button>
        <button className="button navigateButton" onClick={() => end()}>
          <FontAwesomeIcon
            icon={"angle-double-right"}
            alt={"previous"}
            title={"End"}
            aria-hidden="true"
            className="prev-icon"
          />
        </button>
      </div>
      <div className="col-1 text-right align-right">
        <select
          className="page-number-input"
          value={page}
          onChange={(e) => setPageNav(e.target.value)}
        >
          {range.map((el, index) => {
            return <option value={el}>{index + 1}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default TableFooter;
