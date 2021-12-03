import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import './Searchbar.css'

function Searchbar({title}) {
    return (
        <div class="searchbar-container">
            <div class="row">
                <div class="col">
                    <h1 class="searchbar-header">{title}</h1>
                </div>
                <div class="col d-flex justify-content-end">
                <div class="searchContainer">
                <i class="fa fa-search searchIcon fa-flip-horizontal"></i>
                <input class="searchBox" type="search" name="search"/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar
