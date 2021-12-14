import React, {Fragment} from 'react';

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-purchase'];

const purchaseData = [
    {
        printingOrderID: '0199201',
        itemID: '1',
        itemName: 'LABORATORY',
        requested: ' ',
        actual: ' ',
        action: ' ',
    },
    {
        printingOrderID: '0199201',
        itemID: '1',
        itemName: 'LABORATORY',
        requested: ' ',
        actual: ' ',
        action: ' ',
    },
    {
        printingOrderID: '0199201',
        itemID: '1',
        itemName: 'LABORATORY',
        requested: ' ',
        actual: ' ',
        action: ' ',
    },
];


function PurchaseOrder() {
    
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
                tableData={purchaseData}
            />
            <Table
                type={'no-action'}
                tableData={purchaseData}
                headingColumns={['PRINTING ORDER ID', 'ITEM ID', 'ITEM NAME', 'REQUESTED', 'ACTUAL', 'ACTION']}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default PurchaseOrder
