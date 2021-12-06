import React from 'react'

//css
import './Header.css';
import {CSVLink, CSVDownload} from 'react-csv';


function Header({title, buttons, tableData}) {

    const btn = buttons.map((button) => {

        if(button === 'download') {
            return <button class="download"><CSVLink data={tableData} filename={title}>DOWNLOAD</CSVLink></button>
        }

        if (button.includes("add-")) {
            const addBtn = button.split("-");
            return <button class={button}> ADD {addBtn[1].toUpperCase()}</button>
        }

    });

    return (
        <div class={title, 'header'}>
            <div class="header-title">{title}{btn}</div>
        </div>
    )
}

export default Header
