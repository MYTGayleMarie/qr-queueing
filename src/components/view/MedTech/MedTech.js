import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

//css
import '../Imaging/Imaging.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['download'];

const pendingData = [
  {
    bookId: '0199201',
    barcodeNo: '90042091',
    test: 'Test 1',
    Status: 'FOR EXAMINATION',
  },
  {
    bookId: '0199201',
    barcodeNo: '90042091',
    test: 'Test 1',
    Status: 'FOR EXAMINATION',
  },
  {
    bookId: '0199201',
    barcodeNo: '90042091',
    test: 'Test 1',
    Status: 'FOR EXAMINATION',
  },
];

function MedTech() {
  if (window.$userToken == null) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Searchbar title="MEDICAL TECHNOLOGY" />
          <Header type="thick" title="BOOKING MANAGER" buttons={buttons} tableData={pendingData} />
          <Table
            type={'no-action'}
            tableData={pendingData}
            headingColumns={['BOOKING ID', 'BARCODE NO.', 'TEST', 'STATUS']}
          />
        </Fragment>
      </div>
    </div>
  );
}

export default MedTech;
