import React, {Fragment} from 'react';
import { useForm } from "react-hooks-helper";



//css
import './Suppliers.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-supplier'];

const filterData = {
    from_date: "",
    to_date: "",
};

const supplierData = [
    {
        supplierID: '1',
        companyName: 'SAMPLE COMPANY',
        address: 'Cebu City, Cebu',
        phone: '221-1234',
        email: 'sample@gmail.com',
        tin: '0000',
        remarks: 'none',
        action: ' ',
    },
];


function Suppliers() {

    const [filteredData, setFilter] = useForm(filterData);

    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='SUPPLIER'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
                tableData={supplierData}
            />
            <Table
                type={'no-action'}
                tableData={supplierData}
                headingColumns={['SUPPLIER ID', 'COMPANY NAME', 'ADDRESS', 'PHONE', 'EMAIL', 'TIN', 'REMARKS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Suppliers
