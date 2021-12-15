import React from 'react';

//css
import './Card.css';

//image
import cashierIcon from '../images/icons/cashier-icon.png';

function Card({data, title, color}) {
    return (
        <div>
            <div className='card-container'>
                <div className={`card-head ${color}`}></div>
                <div className='row'>
                    <div className='col-sm-3 d-flex justify-content-end'>
                        <img src={cashierIcon} alt={"report"} class="report-card icon"></img>
                    </div>
                    <div className='col-sm-9'>
                        <div className='row'>
                            <div className='col d-flex justify-content-end'>
                                <span className='card-data'>{data}</span>
                            </div>
                        </div>
                        <div className='row'>
                        <div className='col d-flex justify-content-end'>
                                <span className='card-title'>{title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
