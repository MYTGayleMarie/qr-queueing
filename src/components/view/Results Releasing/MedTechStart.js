import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import PersonalDetails from '../../PersonalDetails';
import TestDetails2 from "../../TestDetails2.js";
import TestUpdates from "../../TestUpdates.js";

//images
import uploadIcon from '../../../images/icons/upload-icon.png';


//variables
const userToken = getToken();
const userId = getUser();
const patientData = 
    {
        bookingId: '0199201',
        barcodeNo: '000000000000',
        testName: 'Test 1',
        status: 'ON GOING',
        extractionCompleted: 'NOVEMBER 25 9:00 PM',
        examinationStarted: 'NOVEMBER 26, 7:30 PM',
        examinationCompleted: 'NOVEMBER 28, 8:00 AM',
        
    };

function testInput() {
    return (
        <input type="text" className="test-input" name="imaging_test_1"/>
    )
}
    
function MedTechStart() {

    document.body.style = 'background: white;';
    
    //Test Details
    const [barcode, setBarcode] = useState("");
    const [test, setTest] = useState("");
    const [status, setStatus] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [bookingDetailId, setBookingDetailId] = useState("");

    //Updates
    const [extractionOn, setExtractionOn] = useState("");
    const [examinationStarted, setExaminationStarted] = useState("");
    const [examinationCompleted, setExaminationCommpleted] = useState("");

    const {serviceId, bookId, type} = useParams();
    const [inputBox, setImaging] = useState(false);
    const [file, setFile] = useState("");
    const [md, setMd] = useState("");

    const toggleImaging= () => {
        var updateLink = "";
        var extractionLink = "";

        if(type === "package") {
            updateLink = "Bookingpackage_details/update/";
            extractionLink = "Bookingpackage_details/updateExtraction/";
        }
        else if(type === "lab") {
            updateLink = "Bookingdetails/update/";
            extractionLink = "Bookingdetails/updateExtraction/";
        }

        axios({
            method: 'post',
            url: window.$link + updateLink + serviceId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                test_start: new Date(),
                updated_by: userId,
            }
        }).then(function (booking) {
            console.log(booking);
            setExaminationStarted(new Date());
        }).then(function (error) {
            console.log(error);
        });

        axios({
            method: 'post',
            url: window.$link + extractionLink + serviceId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                booking: bookId,
                booking_detail_id: bookingDetailId,
                status: 'ongoing',
                extracted_on: "",
                updated_by: userId,
            }
        }).then(function (booking) {
            console.log(booking);
        }).then(function (error) {
            console.log(error);
        })
        refreshPage();
        setImaging(!inputBox);
    };

    function FinishExtraction() {
        var updateLink = "";
        var extractionLink = "";

        if(type === "package") {
            updateLink = "Bookingpackage_details/update/";
            extractionLink = "Bookingpackage_details/updateExtraction/";
        }
        else if(type === "lab") {
            updateLink = "Bookingdetails/update/";
            extractionLink = "Bookingdetails/updateExtraction/";
        }

        if(file != "" && md != "") {
            axios({
                method: 'post',
                url: window.$link + updateLink + serviceId,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    test_start: "",
                    test_finish: new Date(),
                    file_result: file,
                    //md: md,
                    updated_by: userId,
                }
            }).then(function (booking) {
                console.log(booking);
                setExaminationCommpleted(new Date());
                toast.success("Examination finished!");
            }).then(function (error) {
                console.log(error);
            });
    
            axios({
                method: 'post',
                url: window.$link + extractionLink + serviceId,
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    booking: bookId,
                    status: 'completed',
                    extracted_on: "",
                    updated_by: userId,
                }
            }).then(function (booking) {
                console.log(booking);
            }).then(function (error) {
                console.log(error);
            })
        }
    }
  
    React.useEffect(() => {
        var urlLink = "";

        if(type === "package") {
            urlLink = "Bookingpackage_details/getDetails/";
        }
        else if(type === "lab") {
            urlLink = "Bookingdetails/getDetails/";
        }

        axios({
            method: 'post',
            url: window.$link + urlLink + serviceId,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (booking) {
            var info;
            console.log(booking)
            if(type === "package") {
                info =  booking.data.data.booking_package_details[0];
                setBookingDetailId(info.booking_detail_id);
            }
            else if(type === "lab") {
                info =  booking.data.data.booking_detail[0];
            }
            console.log(info);
            setBarcode(info.barcode);
            setTest(info.lab_test);
            setStatus(info.status);
            setCategoryId(info.category_id);
            setExtractionOn(info.extracted_on);
            setExaminationStarted(info.test_start);
            setExaminationCommpleted(info.test_finish);

        }).then(function (error) {
            console.log(error);
        })
    },[]);

    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Header 
                type='thin'
                title='RESULTS RELEASING' 
            />
            <ToastContainer/>
            <div className="row">
                <div className="col-sm-6">
                    <TestDetails2 
                        bookID={bookId}
                        barcode={barcode}
                        test={test}
                        status={status}
                        />
                </div>
                <div className="col-sm-6">
                    {inputBox == true || examinationStarted != null && examinationCompleted == null && (
                    <div className="upload-area d-flex justify-content-center">
                        {file.length == 0 && (
                            <div class="upload-btn-wrapper">
                                <div className="upload">
                                    <img src={uploadIcon} alt={'upload-here'} className="upload-icon"></img><br/>
                                    <span className="upload-inst"><b>Upload Results</b> or drop it here</span>
                                </div>
                                <input type="file" name="file" onChange={(e) => setFile(e.target.files)}/>
                            </div>
                        )}
                        {file.length != 0 && (
                            <span className="uploaded-file">File: {file[0].name}</span>
                        )}
                    </div>
                    )}
                    {inputBox == true && file.length == 0 && (
                        <span className="upload-info">File size limit: 500 MB</span>
                    )}
                    {(file.length != 0 ) && examinationCompleted == null && (
                        <span className="upload-info">Current size: {(file[0].size / (1024*1024)).toFixed(2)} MB</span>
                    )}
                    {(inputBox == true || file.length != 0) && examinationCompleted == null &&  (
                        <div className='cancel-area'>
                            <button className='cancel-btn' onClick={(e) => setFile("")}>REMOVE</button>
                        </div>
                    )}
                </div>
            </div>

            <div className='row more-gap'>
                {examinationStarted != null  && examinationCompleted == null && (
                <div className='col-sm-12 d-flex justify-content-end'>
                    <span className='md-label'>MD :</span>
                    <input name="md" className='md-input' onChange={(e) => setMd(e.target.value)}/>
                </div>
                )}
            </div>
            
            <TestUpdates 
                categoryId={categoryId}
                testStart={examinationStarted}
                testFinish={examinationCompleted}
            />

            {examinationCompleted == null && (
                <div className="row d-flex justify-content-center">        
                    {examinationStarted == null &&  <button className="start-btn" onClick={toggleImaging}>UPLOAD RESULTS</button>}  
                    {examinationStarted != null && <button className="save-details-btn" onClick={() => FinishExtraction()}>SAVE DETAILS</button>}     
                </div>
            )}

            {examinationCompleted != null && (
                <div className='d-flex justify-content-center mb-5'>
                    <button className="save-btn">
                    <FontAwesomeIcon icon={"print"} alt={"print"} aria-hidden="true" className="print-icon"/>
                        PRINT
                    </button>
                    <button className="save-btn">
                    <FontAwesomeIcon icon={"envelope"} alt={"email"} aria-hidden="true" className="print-icon"/>
                        EMAIL
                    </button>
                </div>
            )}

        </div>
            
        </div>
    )
}

export default MedTechStart
