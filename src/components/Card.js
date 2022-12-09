import React from 'react';

//css
import './Card.css';

//image
import cashierIcon from '../images/icons/cashier-icon.png';
import { NavLink } from 'react-router-dom';

function Card({totalData, todayData, services, packages, link, title, color, disable, excelReport=false, handler}) {
    return (
        <NavLink to={link} class="report-link">
            {excelReport ?
            <div className='card-container' onClick={handler}>
                <div className={`card-head ${color}`}>
                    <span className='card-head-title'>{title}</span>
                </div>
                <div className='row'>
                    <div className='col-sm-3 d-flex justify-content-end'>
                        {totalData != "MD REPORTS" && totalData!= "REFERRALS" && totalData != "INVENTORY" && totalData != "ITEM INVENTORY" && totalData != "ITEM" && totalData != "EXPENSE" &&(
                            <img src={cashierIcon} alt={"report"} class="report-card icon"></img>
                        )}
                    </div>
                    <div className='col-sm-9 report-data'>
                        <div className='row'>
                            {disable != "today" && (
                            <div className='col d-flex justify-content-end'>
                                <span className='card-data'>{todayData == null ? services : todayData}</span>
                            </div>
                            )}
                            <div className='col d-flex justify-content-end'>
                                <span className='card-data'>{todayData == null ? packages : totalData}</span>
                            </div>
                        </div>
                        <div className='row'>
                            {disable != "today" && (
                            <div className='col d-flex justify-content-end'>
                                <span className='card-title'>{todayData == null ? "SERVICES" : "TODAY"}</span>
                            </div>
                            )}
                            {totalData != "EXPENSE" && totalData != "MD REPORTS" && totalData!= "REFERRALS" && totalData != "INVENTORY" && totalData != "ITEM INVENTORY"&& totalData != "ITEM" && (
                            <div className='col d-flex justify-content-end'>
                                <span className='card-title'>{todayData == null ? "PACKAGES" : "TOTAL"}</span>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='card-container'>
            <div className={`card-head ${color}`}>
                <span className='card-head-title'>{title}</span>
            </div>
            <div className='row'>
                <div className='col-sm-3 d-flex justify-content-end'>
                    {totalData != "MD REPORTS" && totalData!= "REFERRALS" && totalData != "INVENTORY" && totalData != "ITEM" &&(
                        <img src={cashierIcon} alt={"report"} class="report-card icon"></img>
                    )}
                </div>
                <div className='col-sm-9 report-data'>
                    <div className='row'>
                        {disable != "today" && (
                        <div className='col d-flex justify-content-end'>
                            <span className='card-data'>{todayData == null ? services : todayData}</span>
                        </div>
                        )}
                        <div className='col d-flex justify-content-end'>
                            <span className='card-data'>{todayData == null ? packages : totalData}</span>
                        </div>
                    </div>
                    <div className='row'>
                        {disable != "today" && (
                        <div className='col d-flex justify-content-end'>
                            <span className='card-title'>{todayData == null ? "SERVICES" : "TODAY"}</span>
                        </div>
                        )}
                        {totalData != "MD REPORTS" && totalData!= "REFERRALS" && totalData != "INVENTORY" && totalData != "ITEM" && totalData != "EXPENSE" && (
                        <div className='col d-flex justify-content-end'>
                            <span className='card-title'>{todayData == null ? "PACKAGES" : "TOTAL"}</span>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>      
            }
        </NavLink>
    )
}

export default Card
