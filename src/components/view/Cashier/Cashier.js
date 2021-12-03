import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Navbar from '../../Navbar.js';
import Searchbar from '../../Searchbar.js';

//css
import '../Cashier/Cashier.css';

function Cashier() {

    return (
        <>
        <Navbar/>
        <div class="active-cont">
            <Searchbar title='Cashier'/>
            
        </div>
        
        </>
    )
}

export default Cashier
