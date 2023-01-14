import React from 'react';

//css
import './CustomComponent.css';

//image
import cashierIcon from '../../images/icons/cashier-icon.png';
import { NavLink } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import vector from './../../images/arrow-vector.png'

function SmallOutlineButtonReport({totalData, todayData, services, packages, link, title, color, disable, excelReport=false, handler}) {
    return (
        <NavLink to={link} class="report-link" style={{display:"flex", justifyContent:"center"}}>
           <div className='outlined-button-report mb-3'>
            <Row>
            <Col style={{display:"flex", justifyContent:"end", paddingTop:"7px"}}>
                    <img src={vector} width={50} height={50}/>
                </Col>
                <Col lg={8}>
                    {title === "INVENTORY REQUEST" ? 
                    <h5 style={{marginBottom:"0rem", paddingTop:"9px"}}>{title}</h5>
                    :
                    <h5 style={{marginBottom:"0rem", paddingTop:"17px"}}>{title}</h5>
                    }
                    
                    {/* <div className="outlined-subtitle">{title}</div> */}
               </Col>
                
            </Row>
           </div>
        </NavLink>
    )
}

export default SmallOutlineButtonReport
