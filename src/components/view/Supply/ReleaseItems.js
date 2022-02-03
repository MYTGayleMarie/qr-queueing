import React, {Fragment} from 'react';
import { useForm } from "react-hooks-helper";

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-release'];

const filterData = {
    from_date: "",
    to_date: "",
  };

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

    const [filteredData, setFilter] = useForm(filterData);

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
                filteredData={filteredData}
                setFilter={setFilter}
            />
            </Fragment>
        </div>
        </div>
    )
}

export default ReleaseItems
