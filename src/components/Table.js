import React, { useState } from "react";
import PropTypes from 'prop-types';

//css 
import './Table.scss'

function Table({ type, tableData, headingColumns, breakOn = 'medium'}) {
    let tableClass = 'table-container__table';

    if(breakOn === 'small') {
        tableClass += ' table-container__table--break-sm';
    } else if(breakOn === 'medium') {
        tableClass += ' table-container_table--break-md';
    } else if(breakOn === 'large') {
        tableClass += ' table-container_table--break-lg';
    }

    const data = tableData.map((row, index) => {

        let rowData = [];
        let i = 0;
        
        for(const key in row) {
            rowData.push({
                key: headingColumns[i],
                val: row[key]
            });
            i++;
        }

        return <tr key={index}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
        </tr>
    });


    if(type === 'no-action') {
    
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
                    <input type="date" className="from-date search" name="from_date"/>
                    <input type="date" className="to-date search" name="to_date"/>
                    <select name="service_type">
                        <option value="" selected disabled hidden>CHOOSE SERVICE</option>
                        <option value="HOME SERVICE">HOME SERVICE</option>
                        <option value="CLINIC SERVICE">CLINIC SERVICE</option>
                    </select>
                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
             </div>
        );
    }
    else if (type === "report") {
        return(
            <div className="report-table-container">
            <table className={tableClass}>
                <thead>
                    <tr>
                        {headingColumns.map((col,index) => (
                            <th key={index} className="report-table-th-top">{col}</th>
                        ))}
                    </tr>
                </thead>
                <thead>
                    <tr>
                        {headingColumns.map((col,index) => (
                            <th key={index} className="report-table-th">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
         </div>
        );
    }
   

}

Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    breakOn: PropTypes.oneOf(['small','medium','large'])
}

export default Table
