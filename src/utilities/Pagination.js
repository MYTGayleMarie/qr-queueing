import { useState, useEffect } from "react";

const calculateRange = (data, rowsPerPage, type) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  if (type === "med-tech") {
    return [1];
  } else {
    return range;
  }
};

const sliceData = (data, page, rowsPerPage, type) => {
  if (type === "med-tech") {
    return data;
  } else {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }
};

const useTable = (data, page, rowsPerPage, type) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage, type);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage, type);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
