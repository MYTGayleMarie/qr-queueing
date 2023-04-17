import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser, getRoleId } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
import { Navigate } from 'react-router-dom';

//css
import './QueueManager.css';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-new-patient', 'add-old-patient'];
const userToken = getToken();
const userId = getUser();
var id = "";
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
  from_date: formattedPresentData,
  to_date: formattedPresentData,
  done: false,
};

function QueueManager() {

  document.body.style = 'background: white;';
  const [filteredData, setFilter] = useForm(filterData);
  const [render, setRender] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [redirectPay, setRedirectPay] = useState(false);
  const [redirectPrint, setRedirectPrint] = useState(false);
  const [redirectDelete, setRedirectDelete] = useState(false);
  const [role, setRole] = useState('');
  const [isReady, setIsReady] = useState(false)

  function getTime(date) {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
  
  React.useEffect(() => {
    patientData.length = 0;
     axios({
      method: 'get',
      url: window.$link + 'customers/queue',
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ''),
        requester: userId,
      },
    })
      .then( function (response) {
        // setIsReady(false)
        response.data.queues.map( async (queues, index) => {
          var queueDetails = {};
          queueDetails.customerId = queues.customer_id;
          queueDetails.queueNumber = queues.queue_no;
          queueDetails.name = queues.first_name + ' ' + queues.middle_name + ' ' + queues.last_name;
          setPatientData(oldArray => [...oldArray, queueDetails]);
          setIsReady(true)
          // })
          // .then (function (error) {
            //   console.log(error);
            //   setIsReady(true)
            // });
          });
        })
      .catch(function (error) {
        setIsReady(false)
      });
  }, [render]);
  
  React.useEffect(() => {
    setRole(getRoleId().replace(/^"(.*)"$/, '$1'));
  }, []);



  function filter() {}

  function addBooking(customerId) {
    id = customerId;
    setRedirectPay(true);
  }

  function printBooking(bookingId) {
    id = bookingId;
    setRedirectPrint(true);
  }
  function deleteBooking(bookingId) {
    id = bookingId;
    setRedirectDelete(true);
  }

  if(redirectDelete == true) {
    var link =  "/delete-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

  if(redirectPay == true) {
    var link =  "/queuemanager/add-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

  if(redirectPrint == true) {
    var link =  "/print-booking/" + id;
    return (
        <Navigate to ={link}/>
    )
  }

   return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header type="thick" title="CUSTOMER QUEUE MANAGER" buttons={buttons} tableData={patientData} />
          <Table
            type={'queue'}
            tableData={patientData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
            clickable={true}
            rowsPerPage={20}
            headingColumns={['QUEUE', 'NAME', 'ACTION']}
            filteredData={filteredData}
            setFilter={setFilter}
            filter={filter}
            setRender={setRender}
            render={render}
            givenClass={"register-mobile"}
            link={addBooking}
            print={printBooking}
            role={role}
            userId={userId}
            deleteBooking={deleteBooking}
            useLoader={true}
            isReady={isReady}
          />
          <ToastContainer hideProgressBar={true} />
        </Fragment>
      </div>
    </div>
  );
}

export default QueueManager;
