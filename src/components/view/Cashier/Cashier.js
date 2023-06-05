import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession, getTime } from '../../../utilities/Common';
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
const presentDate = new Date();



const filterData = {
  from_date: presentDate,
  to_date: presentDate,
};

const cashCountData = {
  oneCentavos: 0,
  fiveCentavos: 0,
  tenCentavos: 0,
  twentyfiveCentavos: 0,
  onePesos: 0,
  fivePesos: 0,
  tenPesos: 0,
  twentyPesosCoin: 0,
  twentyPesosBill: 0,
  fiftyPesos: 0,
  onehundredPesos: 0,
  twohundredPesos: 0,
  fivehundredPesos: 0,
  onethousandPesos: 0,
};



var id = '';



function Cashier() {
  //Cash Count
  const [cashCount, setCashCount] = useForm(cashCountData);
  const [cashSales, setCashSales] = useState(0);

  //Cash Count Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //filteredData
  const [filteredData, setFilter] = useForm(filterData);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [finalPatientData, setFinalPatientData] = useState([]);
  const [render, setRender] = useState([]);
  
  //const [render, setRender] = useState([]);
 const [isReady, setIsReady] = useState(false);


  function addPayment(customerId) {
    id = customerId;
    setRedirect(true);

  
  }

  React.useEffect(() => {
    axios({
      method: 'post',
      url: window.$link + 'reports/cashSales',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      },
    }).then(function (response) {
      // console.log(response)
      var cash = parseFloat(response.data.data.total_cash_sales);
      setCashSales(cash);
    });
  }, []);

  React.useEffect(() => {
    patientData.length = 0;
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
      .then( function (response) {
        // setIsReady(false)
        response.data.bookings.map( async (booking, index) => {
          // console.log(booking)
          // await axios({
          //   method: 'post',
          //   url: window.$link + 'customers/show/' + booking.customer_id,
          //   withCredentials: false,
          //   params: {
          //     api_key: window.$api_key,
          //     token: userToken.replace(/['"]+/g, ''),
          //     requester: userId,
          //   },
          // }).then(function (customer) {
            // setIsReady(false)
              var bookingTime = new Date(booking.booking_time);
              var formatBookingTime = bookingTime.toDateString().split(" ");
              var addedOn = new Date(booking.added_on);
              var formatAddedOn = addedOn.toDateString().split(" ");
              var bookingDetails = {};

              var booking_service = booking.type.toUpperCase();

              // console.log(booking);

              // bookingDetails.withDiscount = booking.discount_detail;
              bookingDetails.id = booking.id;
              bookingDetails.name = booking.first_name + ' ' + booking.middle_name + ' ' + booking.last_name;
              bookingDetails.bookingTime =  formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
              bookingDetails.serviceType = booking_service.toUpperCase();
              bookingDetails.amount = booking.grand_total;
              
              if (booking.paid_amount >= booking.grand_total) {
                bookingDetails.payment = 'PAID';
              } else if (booking.paid_amount < booking.grand_total) {
                bookingDetails.payment = 'PENDING';
              }
              bookingDetails.addedOn = formatAddedOn[1] + " " + formatAddedOn[2] + ", " + getTime(addedOn);
              setPatientData(oldArray => [...oldArray, bookingDetails]);
              setIsReady(true)
            // })
            // .then (function (error) {
            //   console.log(error);
            //   setIsReady(true)
            // });
        });
      })
      .catch(function (error) {
        console.log(error);
        setIsReady(false)
      });
  }, [render]);
  

  // React.useEffect(() => {
  //   bookingDetails.map((booking, index) => {
  //     axios({
  //       method: 'post',
  //       url: window.$link + 'customers/show/' + booking.customer_id,
  //       withCredentials: false,
  //       params: {
  //         api_key: window.$api_key,
  //         token: userToken.replace(/['"]+/g, ''),
  //         requester: userId,
  //       },
  //     })
  //       .then(function (customer) {

  //         var bookingTime = new Date(booking.booking_time);
  //         var formatBookingTime = bookingTime.toDateString().split(" ");
  //         var addedOn = new Date(booking.added_on);
  //         var formatAddedOn = addedOn.toDateString().split(" ");
  //         var bookingDetails = {};
  //         var booking_service = booking.type;
          
  //         bookingDetails.id = booking.id;
  //         bookingDetails.name = .dacustomerta.first_name + ' ' + customer.data.middle_name + ' ' + customer.data.last_name;
  //         bookingDetails.bookingTime =  formatBookingTime[1] + " " + formatBookingTime[2] + ", " + getTime(bookingTime);
  //         bookingDetails.serviceType = booking_service.toUpperCase();
  //         bookingDetails.amount = booking.grand_total;

  //         //fully paid or not
  //         if (booking.paid_amount == booking.grand_total) {
  //           bookingDetails.payment = 'PAID';
  //         } else if (booking.paid_amount < booking.grand_total) {
  //           bookingDetails.payment = 'PENDING';
  //         }

  //         bookingDetails.addedOn = formatAddedOn[1] + " " + formatAddedOn[2] + ", " + getTime(addedOn);
  //         if (bookingDetails.payment == 'PENDING' && isCompany(booking.discount_code) != true) {
  //           setFinalPatientData(oldArray => [...oldArray, bookingDetails]);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         setIsReady(false)
  //       });
  //   });
  // },[bookingDetails]);

  // React.useEffect(() => {
  //   patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)));
  // },[[patientData]);

  function calculate() {
    var fiveCentavoTotal = parseFloat(0.05 * cashCount.fiveCentavos);
    var tenCentavoTotal = parseFloat(0.1 * cashCount.tenCentavos);
    var twentyfiveCentavoTotal = parseFloat(0.25 * cashCount.twentyfiveCentavos);
    var onePesoTotal = parseFloat(1.0 * cashCount.onePesos);
    var fivePesoTotal = parseFloat(5.0 * cashCount.fivePesos);
    var tenPesoTotal = parseFloat(10.0 * cashCount.tenPesos);
    var twentyPesoCoinTotal = parseFloat(20.0 * cashCount.twentyPesosCoin);
    var twentyPesoBillTotal = parseFloat(20.0 * cashCount.twentyPesosBill);
    var fiftyPesoTotal = parseFloat(50.0 * cashCount.fiftyPesos);
    var onehundredPesoTotal = parseFloat(100.0 * cashCount.onehundredPesos);
    var twohundredPesoTotal = parseFloat(200.0 * cashCount.twohundredPesos);
    var fivehundredPesoTotal = parseFloat(500.0 * cashCount.fivehundredPesos);
    var onethousandPesoTotal = parseFloat(1000.0 * cashCount.onethousandPesos);

    var totalAmount =
      fiveCentavoTotal +
      tenCentavoTotal +
      twentyfiveCentavoTotal +
      onePesoTotal +
      fivePesoTotal +
      tenPesoTotal +
      twentyPesoCoinTotal +
      twentyPesoBillTotal +
      fiftyPesoTotal +
      onehundredPesoTotal +
      twohundredPesoTotal +
      fivehundredPesoTotal +
      onethousandPesoTotal;

    return totalAmount.toFixed(2);
  }

  function isCompany(discountCode) {
    axios({
      method: 'post',
      url: window.$link + 'discounts/getAll',
      withCredentials: false, 
      params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          requester: userId,
      }
    }).then(function (response) {
        if(response.data.discount != null){
          response.data.discount.filter((info) => info.id != null).map((data, index) => {
            if(data.discount_code == discountCode) {
              return true;
            }
          });  
        }
            return false;
    }).then(function (error) {
        console.log(error);
        setIsReady(true)
    });
  }

  function logOut() {
    var cashCounts = calculate();

    if (cashCounts == cashSales) {
      axios({
        method: 'post',
        url: window.$link + 'cash_counts/create',
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ''),
          added_by: userId,
          physical_count: cashCounts,
          bill_1000: cashCount.onethousandPesos,
          bill_500: cashCount.fivehundredPesos,
          bill_200: cashCount.twohundredPesos,
          bill_100: cashCount.onehundredPesos,
          bill_50: cashCount.fiftyPesos,
          bill_20: cashCount.twentyPesosBill,
          coin_20: cashCount.twentyPesosCoin,
          coin_10: cashCount.tenPesos,
          coin_5: cashCount.fivePesos,
          coin_1: cashCount.onePesos,
          cent_25: cashCount.twentyfiveCentavos,
          cent_10: cashCount.tenCentavos,
          cent_5: cashCount.fiveCentavos,
          cent_1: cashCount.oneCentavos,
        },
      })
        .then(function (response) {
          removeUserSession();
        })
        .catch(function (error) {
          toast.error('Oops! Something wrong with the server');

        });
    } else {
      toast.warning('Cash count does not match with cash sales');
    }
  }
  var cashCounts = calculate();

  function filter() {}

  if (redirect == true) {
    var link = '/add-payment/' + id;
    console.log(link);
    return <Navigate to={link} />;
  }

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
                <button className="cash-count-btn" onClick={handleShow}>
                  CASH COUNT
                </button>
              </div>
            </div>
          </div>
          <Header type="thick" title="BOOKING MANAGER"/>
          <Table
            type={'cashier'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            rowsPerPage={4}
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
            setRender={setRender}
            link={addPayment}
            useLoader={true}
            isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton className="text-center">
            <Modal.Title className="w-100 cash-count-header">CASH COUNT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <div className="cash-count-sub-header text-center">COINS</div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 0.01</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="oneCentavos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 0.05</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="fiveCentavos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 0.10</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="tenCentavos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 0.25</div>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      name="twentyfiveCentavos"
                      className="cash-count-input"
                      onChange={setCashCount}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 1.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="onePesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 5.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="fivePesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 10.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="tenPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 20.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="twentyPesosCoin" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="cash-count-sub-header text-center">BILLS</div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 20.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="twentyPesosBill" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 50.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="fiftyPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 100.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="onehundredPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 200.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="twohundredPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 500.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="fivehundredPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="cash-count-amount text-center">P 1,000.00</div>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" name="onethousandPesos" className="cash-count-input" onChange={setCashCount} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="cash-count-sub-header text-start">TOTAL</div>
              </div>
              <div className="col-sm-6">
                <div className="amount text-center">
                  P {parseFloat(cashCounts).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="cash-count-sub-header text-start">TOTAL CASH SALES</div>
              </div>
              <div className="col-sm-6">
                <div className="amount text-center">P {cashSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="save-btn" onClick={logOut}>
              SAVE
            </button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
}

export default Cashier;
