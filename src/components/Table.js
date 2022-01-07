import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

//css 
import './Table.scss';
import { useNavigate } from "react-router-dom";

function Table({clickable, type, tableData, headingColumns, breakOn = 'medium', filteredData, setFilter, filter, link}) {

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


        if(clickable == false) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            </tr>
        } 
        else if (type === 'search-patient' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            <td><button class="button-10" role="button" onClick={() => link(row.id)}>ADD BOOKING</button></td>
            </tr>
        }
        else {
            return <tr key={row.id} onClick={() => link(row.id)}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            </tr>
        }
    });

    if(type === 'no-action') {

        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
                <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />

                    <button className="filter-btn" onClick={filter}>SAVE SETTINGS</button>
                    <button className="filter-btn" name="done" onClick={setFilter}>FILTER</button>
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
    else if(type === 'no-filter') {

        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
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
    else if (type === "search-patient") {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
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
