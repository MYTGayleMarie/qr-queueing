import React, {Fragment} from 'react';
import { useForm } from "react-hooks-helper";

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-purchase'];

const filterData = {
    from_date: "",
    to_date: "",
};

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

    const [filteredData, setFilter] = useForm(filterData);
    
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
                headingColumns={['DATE', 'SUPPLIER', 'PO NO.', 'TOTAL', 'BRANCH', 'PO STATUS','ORDER STATUS', 'CHECK NO.', 'PREPARED BY', 'APPROVED BY']}
                filteredData={filteredData}
                setFilter={setFilter}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default PurchaseOrder
