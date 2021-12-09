import React, {useState, Fragment} from 'react';

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-items'];

const patientData = [
    {
        items: '0199201',
        requistioner: 'JUAN DELA CRUZ',
        purpose: 'LABORATORY',
        remarks: '',
        action: ' ',
    },
    {
        items: '0199201',
        requistioner: 'JUAN DELA CRUZ',
        purpose: 'LABORATORY',
        remarks: '',
        action: ' ',
    },
    {
        items: '0199201',
        requistioner: 'JUAN DELA CRUZ',
        purpose: 'LABORATORY',
        remarks: '',
        action: ' ',
    },
];

function ReleaseItems() {
    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='RELEASE ITEMS'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
                tableData={patientData}
            />
            <Table
                type={'no-action'}
                tableData={patientData}
                headingColumns={['ITEMS', 'REQUISTIONER', 'PURPOSE', 'REMARKS', 'ACTION']}
            />
            </Fragment>
        </div>
        </div>
    )
}

export default ReleaseItems
