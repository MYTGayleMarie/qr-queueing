import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

//css
import './ChiefMedTech.css';

//components
import Searchbar from '../../Searchbar.js';
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const buttons = ['download'];

const purchaseData = [
  {
    printingOrderID: '0129301',
    itemID: '2',
    itemName: 'Test Tubes',
    requestedAmt: '450',
    actualAmt: '500',
    action: 'EDIT',
  },
  {
    printingOrderID: '0129301',
    itemID: '2',
    itemName: 'Test Tubes',
    requestedAmt: '450',
    actualAmt: '500',
    action: 'EDIT',
  },
];

function PurchaseOrder() {
  return (
    <>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="PURCHASE ORDER" />
          <Header type="thick" title="SUPPLIES RELEASING MANAGER" buttons={buttons} tableData={patientData} />
          <Table
            type={'no-action'}
            tableData={purchaseData}
            headingColumns={['PRINTING ORDER ID', 'ITEM ID', 'ITEM NAMES', 'REQUESTED', 'ACTUAL', 'ACTION']}
          />
        </Fragment>
      </div>
    </>
  );
}

export default PurchaseOrder;
