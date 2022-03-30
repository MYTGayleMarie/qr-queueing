import React, { useState } from "react";
import PropTypes from 'prop-types';
import useTable from "../utilities/Pagination";
import TableFooter from "./TableFooter";
import { Link, NavLink } from 'react-router-dom';

//css 
import './Table.scss';
import { useNavigate } from "react-router-dom";


function Table({clickable, type, tableData, headingColumns, breakOn = 'medium', filteredData, setFilter, filter, link, givenClass, setChecked, render, setRender, registerPay, registerPrint, totalCount, setStatus, endPromo, print, dropdownData, selectSupplier, deleteBooking, userId}) {
    //PAGINATION 
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        if (type === 'companies-review' && clickable == false) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val.replace(/\s/g, '')}>{data.val}</td>)}
            </tr>
        }
        else if(type === 'transaction') {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} style={{fontSize:'0.8rem'}}>{data.val}</td>)}
            </tr>
        }
        else if(type === "discount-detail") {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index != 0 ? "text-left" : ""}>{data.val}</td>)}
            </tr>
        }
        else if(type === 'transaction') {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td className="smaller" key={index} data-heading={data.key}>{data.val}</td>)}
            </tr>
        }
        else if(clickable == false) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key}>{data.val}</td>)}
            </tr>
        }
        
        else if (type === 'registration') {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val.replace(/\s/g, '')}>{totalCount == null && index == 0 ? "" : data.val}</td>)}
            {(rowData[5].val == "unpaid" && rowData[0].val == "no_company_discount") && (
                <td>
                    <button class="action-btn" role="button" onClick={() => link(row.id)}>ADD PAYMENT</button>
                    { (userId==10||userId==18) && <><br/>
                    <button class="action-btn" role="button" onClick={() => deleteBooking(row.id)}>DELETE BOOKING</button></>}
                </td>
            )}
            {(rowData[5].val == "paid" || rowData[0].val != "no_company_discount") && (
                <td>
                    <button class="action-btn" role="button" onClick={() => print(row.id)}>PRINT BOOKING</button> 
                    { (userId==10||userId==18) && <><br/>
                    <button class="action-btn" role="button" onClick={() => deleteBooking(row.id)}>DELETE BOOKING</button></>}
                </td>
            )}
            
            </tr>
        }
        else if (type == 'purchase-order' && clickable == true || type == 'release' && clickable == true || type == 'purchase-order-invoice' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val == "for approval" ? "for-approval" : data.val.replace(/\s/g, '')}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.id)}>REVIEW</button></td>
            </tr>
            
        }
        else if (type == 'receives' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index == 3 ? "text-right" : data.val}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.id, row.po_no)}>REVIEW</button></td>
            </tr>
        }
        else if (type === 'companies-discount' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index == 2 ? "company_name" : data.val.replace(/\s/g, '')}>{index == 0 || index == 1 ? "" : data.val}</td>
            )}
            <td><button class="action-btn" role="button" onClick={() => link(row.company_id, row.id)}>VIEW DETAILS</button></td>
            </tr>
        }
        else if (type === 'credits' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val.replace(/\s/g, '')}>{data.val}</td>
            )}
            <td><button class="action-btn" role="button" onClick={() => link(row.company_discount)}>VIEW DETAILS</button></td>
            </tr>
        }
        else if (type === 'med-tech' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={ data.val != null ? data.val.replace(/\s/g, '') : ""}>{data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => link(row.booking_id, row.id, row.type)}>REVIEW</button></td>
            </tr>
        }
        else if (type === 'items' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index != 0 ? "text-left" : ""}>{index == 0 ? "" : data.val}</td>)}
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
        else if (type === 'receive-items-manager' && clickable==true) {
            return  <tr key = {row.id}>
                {rowData.map((data, index) =>
                    <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>
                )}
                <td><button class="action-btn" role="button" onClick={() => link(row.id)}>Receive Items</button></td>                
            </tr>
        }
        else if (type === 'search-patient' && clickable == true) {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{data.val}</td>)}
            <td><button class="button-10" role="button" onClick={() => link(row.id)}>ADD BOOKING</button></td>
            </tr>
        }
        else if(type === "payment-invoices") {
            return <tr key={row.id}>
            {/* <td><input type="checkbox" name={index} className="table-checkbox" value={index} onClick={setChecked}/></td> */}
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{isNaN(data.val) != true && index != 0 && index != 3 ? "P " + parseFloat(data.val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) : data.val}</td>)}
            </tr>
        }
        else if(type === "add-invoice") {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{isNaN(data.val) != true && index != 0 && index != 2 ? "P " + parseFloat(data.val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) : data.val}</td>)}
            </tr>
        }
        else if(type === 'companies') {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index == 1 ? "company_name" : data.val}>{index == 0 ? "" : data.val}</td>
            )}
            <td><button class="action-btn" role="button" onClick={() => link(row.id)}>ADD DISCOUNT</button></td>
            </tr>
        }
        else if(type === 'company-invoices') {
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={index == 3 ? "company_name" : data.val}>{index == 0 || index == 1 ? "" : data.val}</td>)}
             <td><button class="action-btn" role="button" onClick={() => link(row.id, row.company_id)}>{row.payment_status == "PAID" ? "VIEW DETAILS" : "ADD PAYMENT"}</button></td>
            </tr>
        }
        else if(type === 'discount'){
            return <tr key={row.id}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val} onClick={() => link(row.id)}>{index == 0 ? "": data.val}</td>)}
            <td><button class="action-btn" role="button" onClick={() => endPromo(row.id)}>END PROMO</button></td>
            </tr>
        }
        else {
            return <tr key={row.id} onClick={() => link(row.id)}>
            {rowData.map((data, index) => 
            <td key={index} data-heading={data.key} className={data.val}>{isNaN(data.val) != true && index != 0 ? parseFloat(data.val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}) : data.val}</td>)}
            </tr>
        }
    });

    if(type === 'no-action' || type === 'release' || type === 'reports-sales' || type === 'credits' || type === 'receives'||type === 'transaction') {

        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container row">

                <div className="col-sm-2">
                    {totalCount != null && (
                        <div className="total-count-container">
                            <span className="total-count-header-table">TOTAL: </span><span className="total-count-data">{totalCount}</span>
                        </div>
                    )}
                </div>
                <div className="col-sm-10 d-flex justify-content-end">
                    <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    else if(type === 'receive-items-manager') {
          
        return(
            <div>
                <div className="table-container">
                <div className="search-table-container row">
                <div className="col-sm-12 d-flex justify-content-start">
                    <select name="supplier" onChange={selectSupplier} className="dropdown">
                        <option>Select Supplier</option>
                        {dropdownData.map((data, key)=>
                            <option value={data.id}>{data.name}</option>
                        )}
                    </select>
                </div>
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
                </div>
            </div>
        );
    }
    else if(type === 'purchase-order') {
        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container row">

                <div className="col-sm-12 d-flex justify-content-end">
                    <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <select name="status" onChange={setFilter}>
                        <option value="for approval" selected>FOR APPROVAL</option>
                        <option value="approved">APPROVED</option>
                        <option value="completed">COMPLETED</option>
                        <option value="disapproved">DISAPPROVED</option>
                        <option value="printed">PRINTED</option>
                        <option value="">ALL</option>
                    </select>
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }


    

    else if (type === "search-patient" || type == 'purchase-order-invoice') {
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
             <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
            </div>
        );
    } else if (type === "discount-detail") {

        const {from_date, to_date, done} = filteredData;

        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end"> 
                    {/* <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button> */}
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
             <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
            </div>
        );
    }
    else if(type === 'registration') {

        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container row">

                <div className="col-sm-2">
                    {totalCount != null && (
                        <div className="total-count-container">
                            <span className="total-count-header-table">TOTAL: </span><span className="total-count-data">{totalCount}</span>
                        </div>
                    )}
                </div>
                <div className="col-sm-10 d-flex justify-content-end">
                    <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <input type="date" className="to-date search" name="to_date"  value={to_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index}>{totalCount == null && index == 0 ? "" : col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    if(type === 'sales') {

        const {from_date, to_date, done} = filteredData;
    
        return(
            <div className="table-container">
                <div className="search-table-container row">

                <div className="col-sm-2">
                    {totalCount != null && (
                        <div className="total-count-container">
                            <span className="total-count-header-table">TOTAL: </span><span className="total-count-data">{totalCount}</span>
                        </div>
                    )}
                </div>
                <div className="col-sm-10 d-flex justify-content-end">
                    <input type="date" className="from-date search" name="from_date" value={from_date} onChange={setFilter} />
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    else if(type === 'cashier' || type === 'companies-review' || type === 'users' || type === 'suppliers' || type === 'med-tech' || type === 'services-packages' || type === 'add-invoice') {
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
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    else if( type === 'items') {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">

                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index}>{index == 0 ? "" : col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    else if(type === 'discount') {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">ACTIVE</option>
                        <option value="inactive">INACTIVE</option>
                    </select>
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index}>{index == 0 ? "" : col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );

    }
    else if(type === 'companies') {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">

                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index} className={index == 1 ? "company_name" : ""}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );

    }
    else if(type === 'company-invoices') {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="UNPAID">UNPAID</option>
                        <option value="PAID">PAID</option>
                        <option value="ALL">ALL</option>
                    </select>
                    <button className="filter-btn" name="done" onClick={setRender != null ? (e) => setRender(!render) : ""}>FILTER</button>
                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index} className={index == 3 ? "company_name" : ""}>{index == 0 || index == 1 ? "" : col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );

    }
    else if(type === 'companies-discount') {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">

                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col,index) => (
                                <th key={index} className={index == 2 ? "company_name" : ""}>{index == 0 || index == 1 ? "" : col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
             </div>
        );
    }
    else if(type === "payment-invoices") {
        return(
            <div className="table-container">
                <div className="search-table-container d-flex justify-content-end">

                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {/* <th></th> */}
                            {headingColumns.map((col,index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} /> */}
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
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
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
             <TableFooter range={range} slice={slice} setPage={setPage} page={page} footerClass={givenClass} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage}/>
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
