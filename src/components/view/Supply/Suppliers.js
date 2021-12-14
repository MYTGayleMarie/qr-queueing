import React, {Fragment} from 'react';

//css
import './Suppliers.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download','add-supplier'];

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
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Suppliers
