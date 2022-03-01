import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getTime, getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { useForm } from 'react-hooks-helper';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

//vairables
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: formattedPresentData,
    to_date: formattedPresentData,
    done: false,
  };

function DiscountDetail() {

    const {id} = useParams();
    const [discountDetails, setDiscountDetails] = useState([]);
    const [particulars, setParticulars] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [filteredData, setFilter] = useForm(filterData);
    const [render, setRender] = useState([]);

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'discounts/show/' + id,
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            setDiscountDetails(response.data.data.discount);
        });
    },[]);

    React.useEffect(() => {
        particulars.length = 0;
        if(discountDetails.discount_code) {
           
            axios({
                method: 'post',
                url: window.$link + 'bookings/getByDiscountCode',
                withCredentials: false, 
                params: {
                    api_key: window.$api_key,
                    token: userToken.replace(/['"]+/g, ''),
                    requester: userId,
                    discount_code: discountDetails.discount_code,
                }
              }).then(function (response) {
                var output = [];
                var array = response.data.data.particulars;
                   array.forEach(function(item, index) {
                       var existing = output.filter(function(v, i) {
                           var vDate = v.booking_time.split(" ");
                           var iDate = item.booking_time.split(" ");
                    
                           return vDate[0] == iDate[0];
                       });
            
                       if (existing.length) {
                           var existingIndex = output.indexOf(existing[0]);
                           output[existingIndex].customer = output[existingIndex].customer.concat(", " + item.customer + " (Ref:" + item.discount_reference_no + ")");
                           output[existingIndex].discount_reference_no = output[existingIndex].discount_reference_no.concat(item.discount_reference_no); 
                       } else {
                       if (typeof item.customer == 'string')
                        item.customer = item.customer + " (Ref:" + item.discount_reference_no + ")";
                        output.push(item);
                       }
                   });
                   setParticulars(output)
              });

        }
    },[discountDetails]);

    React.useEffect(() => {
        finalData.length = 0;
        particulars.map((data) => {
            var info = {};
            var date = new Date(data.booking_time);
            var formattedDate = date.toDateString().split(" ");
            info.date = formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3];
            info.particulars = data.customer;
            setFinalData(oldArray => [...oldArray, info]);
        })
    },[particulars]);

    console.log(finalData)

  return (
    <div>
        <Navbar/>
        <div className="active-cont">
            <Header type="thick" title="DISCOUNT DETAILS"/>

            <div className="po-details">
                {/* <div className="row">
                    <div className="col-sm-2">
                        <div className='label'>DISCOUNT CODE</div>
                    </div>
                    <div className="col-sm-8">
                        <div className='detail'>{discountDetails.discount_code}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className='label'>DESCRIPTION</div>
                    </div>
                    <div className="col-sm-4">
                        <div className='detail'>{discountDetails.description}</div>
                    </div>
                    <div className="col-sm-2">
                        <div className='label'>PERCENTAGE</div>
                    </div>
                    <div className="col-sm-3">
                        <div className='detail'>{discountDetails.percentage + "%"}</div>
                    </div>
                </div>  */}

                <Table
                    clickable={false}
                    type={'discount-detail'}
                    tableData={finalData}
                    rowsPerPage={100}
                    headingColumns={['BOOKING DATE', 'PARTICULARS']}
                    givenClass={'company-mobile'}
                    filteredData={filteredData}
                    setFilter={setFilter}
                    setRender={setRender}
                    render={render}
                />
    
            </div>
        </div>
    </div>
  )
}

export default DiscountDetail