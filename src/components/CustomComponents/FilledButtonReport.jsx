import React from 'react';

//css
import './CustomComponent.css';

//image
import cashierIcon from '../../images/icons/cashier-icon.png';
import { NavLink } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import vectordot from './../../images/dot-vector.png'

function FilledButtonReport({totalData, todayData=[], services, packages, link=[], title=[], color, disable, excelReport=false, handler}) {
    console.log(todayData)
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
           <div className="filled-button-report">
            <NavLink to={link[0]} className="color-white">
            <Row className="above-div">
          
                <Col lg={12} style={{display:"flex", justifyContent:"end"}}>
                    <img src={vectordot} width={30} height={15} />
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}}>
                    <div className='filled-title'>{title[0]}</div><br/>
                    
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}}>
                    <Col lg={6} className='filled-data'>{totalData[0]}</Col>
                    <Col lg={6} className='filled-data'>{totalData[1]}</Col>
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}}>
                    {title[0] !== "Total Sales" &&
                    <>
                        <Col lg={6} className='filled-subtitle'>Today</Col>
                        <Col lg={6} className='filled-subtitle'>Total</Col>
                    </>
                    }
                </Col>
              
            </Row>
            </NavLink>
            <NavLink to={link[1]} className="color-white">
            <Row className="below-div">
                <Col lg={12} style={{display:"flex", justifyContent:"end"}}>
                    <img src={vectordot} width={30} height={15} />
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}}>
                    <div className='filled-title'>{title[1]}</div><br/>
                    
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}} className="mb-0">
                    <Col lg={6} className='filled-data'>{totalData[2]}</Col>
                    <Col lg={6} className='filled-data'>{totalData[3]}</Col>
                </Col>
                <Col lg={12} style={{display:"flex", justifyContent:"start"}}>
                    {title[1] !== "Total Sales" &&
                    <>
                        <Col lg={6} className='filled-subtitle'>Today</Col>
                        <Col lg={6} className='filled-subtitle'>Total</Col>
                    </>
                    }
                </Col>
                
            </Row>
            </NavLink>
           </div>
        </div>
    )
}

export default FilledButtonReport
