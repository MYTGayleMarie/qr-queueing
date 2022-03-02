import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from "react-hooks-helper";

//css
import './Suppliers.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const userToken = getToken();
const userId = getUser();
var id = '';

const buttons = ['add-supplier'];

function Suppliers() {
    document.body.style = 'background: white;';
    const [render, setRender] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [supplierData, setSupplierData] = useState([]);


    function SupplierDetails(supplierId) {
        id = supplierId;
        setRedirect(true);
    }

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'suppliers/getAll',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            console.log(response.data.suppliers);

            response.data.suppliers.map((data, index) => {
                var supplierInfo = {};

                supplierInfo.id = data.id;
                supplierInfo.name = data.name;
                supplierInfo.address = data.address;
                supplierInfo.phone = data.contact_no;
                supplierInfo.email = data.email;
                supplierInfo.tin = data.tin;
                supplierInfo.remarks = data.remarks;

                setSupplierData(oldArray => [...oldArray, supplierInfo]);
            });
         
            
        }).catch(function(error) {
            console.log(error);
        });
    }, []);

    
    if (redirect == true) {
        var link = '/view-supplier/' + id;
        return <Navigate to={link} />;
    }


    return (
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='SUPPLIER'/>
            <Header 
                type='thick'
                title='SUPPLIER MANAGER' 
                buttons={buttons} 
            />
            <Table
                clickable={true}
                type={'suppliers'}
                rowsPerPage={4}
                tableData={supplierData}
                headingColumns={['SUPPLIER ID', 'COMPANY NAME', 'ADDRESS', 'PHONE', 'EMAIL', 'TIN', 'REMARKS', 'ACTION']}
                link={SupplierDetails}
            />
            </Fragment>
        </div>
        </div>
        </div>
    )
}

export default Suppliers
