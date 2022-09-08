import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import './Searchbar.css'

function Searchbar({title}) {
    return (
        <div className="searchbar-container">
            <div className="row">
                <div className="col">
                    <h1 className="searchbar-header">{title}</h1>
                </div>
                <div className="col d-flex justify-content-end">
                {/* <div className="searchContainer">
                <i className="fa fa-search searchIcon fa-flip-horizontal"></i>
                <input className="searchBox" type="search" name="search"/>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default Searchbar
