import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, refreshPage } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

//css
import './Cashier.css';

//components
import Searchbar from '../../Searchbar.js';
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const userToken = getToken();
const userId = getUser();

const filterData = {
  from_date: '',
  to_date: '',
};

const cashCountData = {
  fiveCentavos: '',
  tenCentavos: '',
  twentyfiveCentavos: '',
  onePesos: '', 
  fivePesos: '', 
  tenPesos: '',
  twentyPesosCoin: '',
  twentyPesosBill: '',
  fiftyPesos: '',
  onehundredPesos: '',
  fivehundredPesos: '',
  onethousandPesos: '',
};

var id = '';
var patientData = [];

function Cashier() {
  //Cash Count
  const [cashCount, setCashCount] = useForm(cashCountData);

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //filteredData
  const [filteredData, setFilter] = useForm(filterData);
  const [redirect, setRedirect] = useState(false);

  function addPayment(customerId) {
    id = customerId;
    setRedirect(true);
  }

  if (redirect == true) {
    var link = '/add-payment/' + id;
    console.log(link);
    return <Navigate to={link} />;
  }

  function calculate() {

    var fiveCentavoTotal = parseFloat(0.05 * cashCount.fiveCentavos);
    var tenCentavoTotal = parseFloat(0.10 * cashCount.tenCentavos);
    var twentyfiveCentavoTotal = parseFloat(0.25 * cashCount.twentyfiveCentavos);
    var onePesoTotal = parseFloat(1.00 * cashCount.onePesos);
    var fivePesoTotal = parseFloat(5.00 * cashCount.fivePesos);
    var tenPesoTotal = parseFloat(10.00 * cashCount.tenPesos);
    var twentyPesoCoinTotal = parseFloat(20.00 * cashCount.twentyPesosCoin);
    var twentyPesoBillTotal = parseFloat(20.00 * cashCount.twentyPesosBill);
    var fiftyPesoTotal = parseFloat(50.00 * cashCount.fiftyPesos);
    var onehundredPesoTotal = parseFloat(100.00 * cashCount.onehundredPesos);
    var fivehundredPesoTotal = parseFloat(500.00 * cashCount.fivehundredPesos);
    var onethousandPesoTotal = parseFloat(1000.00 * cashCount.onethousandPesos);

    var totalAmount = fiveCentavoTotal 
                      + tenCentavoTotal
                      + twentyfiveCentavoTotal
                      + onePesoTotal
                      + fivePesoTotal
                      + tenPesoTotal
                      + twentyPesoCoinTotal
                      + twentyPesoBillTotal
                      + fiftyPesoTotal
                      + onehundredPesoTotal
                      + fivehundredPesoTotal
                      + onethousandPesoTotal;

    return totalAmount.toFixed(2);
  }

  console.log(calculate())

  function filter() {
    console.log('here');
    patientData = [];
    axios({
      method: 'post',
      url: window.$link + 'bookings/getAll',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      },
    })
      .then(function (response) {
        console.log(response);
        response.data.bookings.map((booking, index) => {
          axios({
            method: 'post',
            url: window.$link + 'customers/show/' + booking.customer_id,
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          })
            .then(function (customer) {
              var formatBookingTime = new Date(booking.booking_time);
              var formatAddedOn = new Date(booking.added_on);
              var bookingDetails = {};
              bookingDetails.id = booking.id;
              bookingDetails.name =
                customer.data.first_name + ' ' + customer.data.middle_name + ' ' + customer.data.last_name;
              bookingDetails.bookingTime = formatBookingTime.toDateString();
              bookingDetails.serviceType = booking.type;
              bookingDetails.amount = booking.grand_total;

              //fully paid or not
              if (booking.paid_amount == booking.grand_total) {
                bookingDetails.payment = 'PAID';
              } else if (booking.paid_amount < booking.grand_total) {
                bookingDetails.payment = 'PENDING';
              }

              bookingDetails.addedOn = formatAddedOn.toDateString();

              patientData.push(bookingDetails);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
        toast.success('Settings Saved!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(cashCount)

  return (
    <>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <div className="searchbar-container">
              <div className="row">
                  <div className="col">
                      <h1 className="searchbar-header">CASHIER</h1>
                  </div>
                  <div className="col d-flex justify-content-end">
                  <button className="cash-count-btn" onClick={handleShow}>CASH COUNT</button>
                  </div>
              </div>
          </div>
          <Header type="thick" title="BOOKING MANAGER" tableData={patientData} />
          <Table
            type={'no-filter'}
            tableData={patientData}
            headingColumns={[
              'BOOKING ID',
              'PATIENT NAME',
              'BOOKING DATE',
              'SERVICE TYPE',
              'PAYMENT',
              'TOTAL PAYMENT',
              'ADDED ON',
            ]}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            link={addPayment}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className='text-center'>
               <Modal.Title className='w-100 cash-count-header'>CASH COUNT</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='cash-count-sub-header text-center'>COINS</div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 0.05</div>
                        </div>
                        <div className='col-sm-6'>
                          <input type="number" name="fiveCentavos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 0.10</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="tenCentavos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 0.25</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="twentyfiveCentavos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 1.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="onePesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 5.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="fivePesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 10.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="tenPesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 20.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="twentyPesosCoin" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>


                    </div>
                    <div className='col-sm-6'>
                      <div className='cash-count-sub-header text-center'>BILLS</div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 20.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="twentyPesosBill" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 50.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="fiftyPesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 100.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="onehundredPesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 500.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="fivehundredPesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='cash-count-amount text-center'>P 1000.00</div>
                        </div>
                        <div className='col-sm-6'>
                          <input name="onethousandPesos" className='cash-count-input' onChange={setCashCount}/>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='cash-count-sub-header text-start'>TOTAL</div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='amount text-center'>P {calculate()}</div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='cash-count-sub-header text-start'>TOTAL CASH SALES</div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='amount text-center'>P 0.00</div>
                    </div>
                  </div>


                  </Modal.Body>
                    <Modal.Footer>
                    <button className='close-btn' onClick={handleClose}>
                        Close
                    </button>
                    <button type="submit" className='save-btn'>
                       SAVE
                    </button>
                   </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Cashier;
