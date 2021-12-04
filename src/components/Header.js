import React from 'react'

//css
import './Header.css';

function Header({title}) {
    return (
        <div class={title, 'header'}>
            <h1 class="header-title">{title}</h1>
        </div>
    )
}

export default Header
