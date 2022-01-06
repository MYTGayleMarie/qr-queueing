import React, {Fragment} from 'react';
import { useForm } from "react-hooks-helper";

//css
import './Items.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-supply-items'];

const filterData = {
    from_date: "",
    to_date: "",
};

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

    const [filteredData, setFilter] = useForm(filterData);

    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='ITEMS'/>
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
                filteredData={filteredData}
                setFilter={setFilter}
                
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Items
