import React, { useState } from "react";
import PropTypes from 'prop-types';
import useTable from "../utilities/Pagination";
import TableFooter from "./TableFooter";
import { Link, NavLink } from 'react-router-dom';

//css 
import './Table.scss';
import { useNavigate } from "react-router-dom";


function Table({clickable, type, tableData, rowsPerPage, headingColumns, breakOn = 'medium', filteredData, setFilter, filter, link, givenClass}) {
    console.log(tableData)
      //PAGINATION 
    const [page, setPage] = useState(1);
    const {slice, range} = useTable(tableData, page, rowsPerPage);

    let tableClass = 'table-container__table';

    if(breakOn === 'small') {
        tableClass += ' table-container__table--break-sm';
    } else if(breakOn === 'medium') {
        tableClass += ' table-container_table--break-md';
    } else if(breakOn === 'large') {
        tableClass += ' table-container_table--break-lg';
    }

    const data = slice.map((row, index) => {

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
        else if (type == 'purchase-order' && clickable == true || type == 'release' && clickable == true || type === 'company-invoices' && clickable == true || type === 'med-tech' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val.replace(/\s/g, '')}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.id)}>REVIEW</button></td>
            </tr>
        }
        else if (type === 'items' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.id)}>UPDATE</button></td>
            </tr>
        }
        else if (type === 'suppliers' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.id)}>VIEW</button></td>
          
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
            <td key={index} data-heading={data.key} className={data.val}>{isNaN(data.val) != true && index != 0 ? parseFloat(data.val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) : data.val}</td>)}
            </tr>
        }
    });

    const [render, setRender] = useState(false);

    if(type === 'no-action' || type === 'purchase-order' || type === 'release' || type === 'med-tech') {

        const {from_date, to_date, done} = filteredData;

        console.log(filteredData)
    
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
                <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={() => setRender(!render)}>FILTER</button>
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} />
             </div>
        );
    }
    else if(type === 'cashier' || type === 'companies' || type === 'users' || type === 'items' || type === 'suppliers' || type === 'company-invoices') {
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} />
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
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} />
         </div>
        );
    }
    else if (type === "search-patient") {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">  </div>
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
             <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass}/>
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
