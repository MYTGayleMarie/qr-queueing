import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';

//css
import './Reports.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table';
import Card from '../../Card';

//variables
var amount = 100; 
const userToken = getToken();
const userId = getUser();
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filteredData = {
  from_date: "2022-01-06",
  to_date: formattedPresentData,
  done: false,
  status: "all",
};

function Reports() {

    document.body.style = 'background: white;';

    //STATES
    const [bookings, setBookings] = useState([]);
    const [todayBookings, setTodayBookings] = useState([]);

    const [servicesPackages, setServicesPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);
    const [poCount, setPoCount] = useState("");

    const [homeServices, setHomeServices] = useState([]);
    const [todayHomeServices, setTodayHomeServices] = useState([]);

    const [clinicServices, setClinicServices] = useState([]);
    const [resultsData, setResultsData] = useState([]);

    const [counts_results_releasing, setResultsCount] = useState(0);

    const [totalSales, setTotalSales] = useState(0);
    const [pendingPOs, setPendingPOs] = useState([]);
    const [unpaidInvoices, setUnpaidInvoices] = useState([]);
    const [credit, setCredit] = useState(0);
    const [incompletePo, setIncompletePo] = useState([])

    const [discounts, setDiscounts] = useState([]);

    //Role 
    const [role, setRole] = useState('');
    React.useEffect(() => {
      setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
    }, []);

    //ALL BOOKINGS
    React.useEffect(() => {
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
          }).then(function (response) {
              setBookings(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //TODAY BOOKINGS
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'bookings/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.to_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            setTodayBookings(response.data.bookings);
        }).then(function (error) {
          console.log(error);
        });
  },[]);

    //ALL PACKAGES AND SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookingdetails/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
              date_from: filteredData.to_date,
              date_to: filteredData.to_date,
              type: filteredData.status
            },
          }).then(function (response) {
              setServicesPackages(response.data.booking_details);
              response.data.booking_details.map((data) => {
                if(data.type == "lab") {
                  setServices(oldArray => [...oldArray, data]);
                } else {
                  setPackages(oldArray => [...oldArray, data]);
                }
              });
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL HOME SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookings/getAllByType/home service',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
            },
          }).then(function (response) {
              setHomeServices(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //TODAY HOME SERVICES
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'bookings/getAllByType/home service',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.to_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
            setTodayHomeServices(response.data.bookings);
        }).then(function (error) {
          console.log(error);
        });
  },[]);

    //ALL CLINICAL SERVICES
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'bookings/getAllByType/clinic',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              setClinicServices(response.data.bookings);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

    //ALL PENDING POS
    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'pos/getAll',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: filteredData.from_date,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              var pending = response.data.pos.filter((info) => info.status == "pending");
              setPendingPOs(pending);
          }).then(function (error) {
            console.log(error);
          },[]);
    },[]);

    // Results Releasing
    React.useEffect(() => {
       axios({
        method: 'get',
        url: window.$link + 'bookings/medtech',
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
          setResultsCount(response.data.complete_releasing_count)
          });
    }, []);

     //SALES REPORT
     React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'reports/salesSummary',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              date_from: formattedPresentData,
              date_to: filteredData.to_date,
              requester: userId,
            },
          }).then(function (response) {
              // console.log(response)
              // console.log(response.data.data.sales)
              var total = 0;
              response.data.data.sales.map((data,index) => {
                if(data[0].type != "credit"){
                  total += data[0].grand_total == null ? 0 : parseFloat(data[0].grand_total);
                }
              })
              setTotalSales(total);
          }).then(function (error) {
            console.log(error);
          });
    },[]);

        //ALL UNPAID INVOICES
        React.useEffect(() => {
          axios({
              method: 'post',
              url: window.$link + 'Company_invoices/getAll',
              withCredentials: false,
              params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                date_from: filteredData.from_date,
                date_to: filteredData.to_date,
                requester: userId,
              },
            }).then(function (response) {
                // console.log(response);

                var pending = response.data.company_invoices.filter((info) => info.is_paid == "0");
                setUnpaidInvoices(pending);
            }).then(function (error) {
              console.log(error);
            });
      },[]);

      React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'pos/getPoCountWithReceiveItems',
            withCredentials: false,
            params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
            },
          }).then(function (response) {
              setPoCount(response.data.data.po_count)
          }).then(function (error) {
            console.log(error);
          });
    },[]);
    //ALL CREDITS
    React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'reports/credit',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        }).then(function (response) {
          console.log(response)
            var count = 0;
            response.data.data.data.map((data) => {
              setCredit(count += parseFloat(data.total_count));
            });

        }).then(function (error) {
          console.log(error);
        });
  },[]);

  // ALL INCOMPLETE POS
  React.useEffect(()=>{
    incompletePo.length=0;
    // Getting all incomplete POs
    axios({
      method: 'post',
      url: window.$link + 'reports/incompletePOs',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
        date_from: filteredData.from_date,
        date_to: filteredData.to_date,
      }
    })
    .then((pos)=>{
      const incomplete = pos.data.pos;  
      // Getting poItems in each pos
      incomplete.map(async(pos, index)=>{
        await axios({
          method: 'post',
          url: window.$link + 'pos/getPoItems/' + pos.id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          }
          })
          .then((poItems)=>{
            // console.log(poItems)
            poItems.data.map((itemDetails, index1)=>{
            const bal = itemDetails.qty-itemDetails.received
               //  if there is balance, we include it in table
               if(bal>0){
                 setIncompletePo(oldArray=>[...oldArray, pos.id])
               }
             })
          })
          .catch((error)=>{
            console.log(error)
          })
      })   


    })
    .catch((error)=>{console.log(error)})
  },[])

    return (
        <div>
        <div>
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='REPORTS'/>
            <Header 
                type='thick'
                title='QR DIAGNOSTICS REPORTS' 
            />

            <div className="row">
                <div className="col-sm-4">
                    <Card 
                        totalData={bookings.length}
                        todayData={todayBookings.length}
                        link={"/reports-transaction"}
                        title='Transactions'
                        color='maroon'
                    />
                </div>
                
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        services={services.length}
                        packages={packages.length}
                        link={"/reports-services-packages"}
                        title='Services Today'
                        color='maroon'
                    />}
                </div>
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={homeServices.length}
                        todayData={todayHomeServices.length}
                        link={"/reports-home-services"}
                        title='Home Services'
                        color='maroon'
                    />}
                </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={"P " + totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        todayData={""}
                        link={"/reports-sales"}
                        title="Today's Total Sales"
                        color='blue'
                        disable={"today"}
                    />}
                </div>
                {/* <div className="col-sm-4">
                    <Card 
                        totalData={clinicServices.length}
                        link={"/reports-clinical-services"}
                        title='Clinical Tests'
                        color='blue'
                    />
                </div> */}
                <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={credit}
                        todayData={""}
                        link={"/reports-credit"}
                        title='Credit Report'
                        color='blue'
                        disable={"today"}
                    /> }
                </div>
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={unpaidInvoices.length}
                        todayData={""}
                        link={"/unpaid-invoices"}
                        title='Receivables'
                        color='blue'
                        disable={"today"}
                    />}
                </div>
            </div>
            <div className="row">    
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={"MD REPORTS"}
                        todayData={""}
                        link={"/reports-md"}
                        title=''
                        color='maroon'
                        disable={"today"}
                    />}
                </div>
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={pendingPOs.length}
                        todayData={""}
                        link={"/reports-pending-po"}
                        title='POs pending for approval'
                        color='maroon'
                        disable={"today"}
                    />}
                </div>
                <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={incompletePo.length}
                        todayData={""}
                        link={"/reports-incomplete-po"}
                        title='Incomplete PO'
                        color='maroon'
                        disable={"today"}
                    /> }
                </div>
            </div>
            <div className="row">
               <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={poCount}
                        todayData={""}
                        link={"/receives"}
                        title='Payables'
                        color='blue'
                        disable={"today"}
                    /> }
                </div>
                <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={counts_results_releasing}
                        todayData={""}
                        link={"/reports-results-releasing"}
                        title="Results Releasing"
                        color='blue'
                        disable={"today"}
                    /> }
                </div>
                <div className="col-sm-4">
                    {role != 3 && <Card 
                        totalData={"REFERRALS"}
                        todayData={""}
                        link={"/reports-referrals"}
                        title=''
                        color='blue'
                        disable={"today"}
                    />}
                </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={"INVENTORY"}
                        todayData={""}
                        link={"/reports-inventory"}
                        title=''
                        color='maroon'
                        disable={"today"}
                    /> }
              </div>
               <div className="col-sm-4">
                  {role != 3 && <Card 
                        totalData={"ITEM"}
                        todayData={""}
                        link={"/reports-item-history"}
                        title=''
                        color='maroon'
                        disable={"today"}
                    /> }
              </div>
            </div>
            </Fragment>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Reports
