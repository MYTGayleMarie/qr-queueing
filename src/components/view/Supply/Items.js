import React, {Fragment} from 'react';

//css
import './Items.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-supply-items'];

const itemsData = [
    {
        itemID: '1',
        itemName: 'Hotplate Stirrer',
        itemDescription: 'none',
        beginningBalance: '1000',
        remarks: ' ',
        action: ' ',
    },
];


function Items() {
    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='PURCHASE ORDER'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
                tableData={itemsData}
            />
            <Table
                type={'no-action'}
                tableData={itemsData}
                headingColumns={['ITEM ID', 'ITEM NAME', 'ITEM DESCRIPTION', 'BEGINNING BALANCE', 'REMARKS', 'ACTION']}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Items
