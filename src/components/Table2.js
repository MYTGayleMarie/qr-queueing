import React, { useState } from "react";
import PropTypes from 'prop-types';

//css 
import './Table2.scss'

function Table2({ type, tableData, headingColumns, breakOn = 'medium'}) {
    let tableClass = 'table-container__table';

    if(breakOn === 'small') {
        tableClass += ' table-container__table--break-sm';
    } else if(breakOn === 'medium') {
        tableClass += ' table-container_table--break-md';
    } else if(breakOn === 'large') {
        tableClass += ' table-container_table--break-lg';
    }

    if(type === 'no-action') {
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

}

Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    breakOn: PropTypes.oneOf(['small','medium','large'])
}

export default Table2
