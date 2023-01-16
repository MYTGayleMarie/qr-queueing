import React from 'react';

//css
import './CustomComponent.css';

//image
import cashierIcon from '../../images/icons/cashier-icon.png';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ButtonReport({totalData, todayData, services, packages, link, title, color, disable, excelReport=false, handler}) {
    return (
        <NavLink to={link} class="report-link" style={{display:"flex", justifyContent:"center"}}>
           <Button className='button-report'>{title}</Button>
        </NavLink>
    )
}

export default ButtonReport
