import React from 'react';
import PdfTransaction from './Pdf/PdfTransaction';
import { PDFViewer } from '@react-pdf/renderer';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

function ViewerTest() {
  return (
    <div>
        <PDFDownloadLink document={<PdfTransaction />} fileName="FORM">
            {({loading}) => (loading ? <button>Loading Document...</button> : <button>download</button>)}
        </PDFDownloadLink>
    </div>
  )
}
export default ViewerTest