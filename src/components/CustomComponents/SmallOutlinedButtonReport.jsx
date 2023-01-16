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
            <Col lg={4} md={4} sm={2} xs={4} className="img-placement">
                    <img src={vector} width={50} height={50} className="img-fluid"/>
                </Col>
                <Col lg={8} md={8} sm={10} xs={8}>
                    {title === "INVENTORY REQUEST" ? 
                    <h5 className="small-title-1">{title}</h5>
                    :
                    <h5 className="small-title">{title}</h5>
                    }
                    
                    {/* <div className="outlined-subtitle">{title}</div> */}
               </Col>
                
            </Row>
           </div>
        </NavLink>
    )
}

export default SmallOutlineButtonReport
