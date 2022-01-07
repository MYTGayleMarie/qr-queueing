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
                return <button className="download"><CSVLink data={tableData} filename={title} className="download-btn">DOWNLOAD</CSVLink></button>
            }
    
            if (button.includes("add-")) {
                const addBtn = button.split("-");
                const linkTo = "/" + button;

                if(button === "add-release") {
                    return <Link to={linkTo}><button className="add-items"> ADD ITEMS</button></Link>
                } 
                else if (button === "add-purchase") {
                    return <Link to={linkTo}><button className="add-items"> ADD ITEMS</button></Link>
                }
                else if (button === "add-supply-items") {
                    return <Link to={linkTo}><button className="add-items"> ADD ITEMS</button></Link>
                }
                else if (button === 'add-new-patient') {
                    return <Link to={linkTo}><button className="add-patient"> NEW PATIENT</button></Link>
                }
                else if (button === 'add-old-patient') {
                    return <Link to={linkTo}><button className="add-patient"> OLD PATIENT</button></Link>
                }

                return <Link to={linkTo}><button className={button}> ADD {addBtn[1].toUpperCase()}</button></Link>
            }
    
        });
    }

    return (
        <div className={title, 'header', type}>
            <div className="header-title">{title}{btn}</div>
        </div>
    )
}

export default Header
