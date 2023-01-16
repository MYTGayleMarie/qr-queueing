import React from 'react';

//css
import './CustomComponent.css';

//image
import cashierIcon from '../../images/icons/cashier-icon.png';
import { NavLink } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import vector from './../../images/report-vector.png'

function OutlineButtonReport({totalData, todayData, services, packages, link, title, color, disable, excelReport=false, handler}) {
    return (
        <NavLink to={link} class="report-link" style={{display:"flex", justifyContent:"center"}}>
           <div className='outlined-button-report mb-3'>
            <Row>
                <Col lg={7} md={7} sm={7} xs={7} style={{paddingLeft:"7px"}}>
                    <h5 style={{marginBottom:"0rem", paddingLeft:"9px", paddingTop:"7px"}}>{todayData}</h5>
                    <div className="outlined-subtitle">{title}</div>
               </Col>
                <Col lg={5} md={5} sm={5} xs={5} style={{display:"flex", justifyContent:"end", paddingTop:"7px", paddingRight:"21px"}}>
                    <img src={vector} width={80} height={40} className="img-fluid"/>
                </Col>
            </Row>
           </div>
        </NavLink>
    )
}

export default OutlineButtonReport
