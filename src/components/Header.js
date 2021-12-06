import React from 'react';
import { Link } from 'react-router-dom';

//css
import './Header.css';
import {CSVLink} from 'react-csv';


function Header({type, title, buttons, tableData}) {

    var btn = [];

    if(buttons) {
        btn = buttons.map((button) => {

            if(button === 'download') {
                return <button class="download"><CSVLink data={tableData} filename={title}>DOWNLOAD</CSVLink></button>
            }
    
            if (button.includes("add-")) {
                const addBtn = button.split("-");
                return <Link to="/addPayment"><button class={button}> ADD {addBtn[1].toUpperCase()}</button></Link>
            }
    
        });
    }

    return (
        <div class={title, 'header', type}>
            <div class="header-title">{title}{btn}</div>
        </div>
    )
}

export default Header
