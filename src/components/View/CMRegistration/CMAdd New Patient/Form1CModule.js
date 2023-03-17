import React, { useState } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUser, refreshPage } from '../../../../utilities/Common';
import { Button, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

//css
import './Form1CModule.css';

//components
import Header from '../../../Header.js';
import Navbar from '../../../Navbar';


//VARIABLES
const userToken = getToken();
const userId = getUser();

function Form1CModule({ customer, setPersonal, setIsService, setIsPackage, discount, setDiscount, setIsCompany, lastMeal, setLastMeal, navigation, mdCharge, setMdCharge, serviceFee, setServiceFee, 
  location, setLocation, dateOfTesting, setDOT, discountDetails, setDiscountDetails  }) 
  {

  //Redirection
  //const [redirect, setRedirect] = useState(false);

  //Single Click
  const [isClicked, setClicked] = useState(false);
    
  //Modal
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const handleShow = (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately
  
    // Display the confirmation modal
    setShow(true);
  };
  
  document.body.style = 'background: white;';
  
  const {
    fname,
    lname,
    mname,
    sex,
    birthDate,
    email,
    contactNum,
    address,
  } = customer;
  const [activation, setActive] = useState(false);
  const [discountList, setDiscountList] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [companyRemarks, setCompanyRemarks] = useState('');
  
  const [people, setPeople] = useState(0);
  const [km, setKm] = useState(0);
  
  function turnActive() {
    setActive(true);
  }
  
  function showSubmitButton(){
    if (
      fname != '' &&
      lname != '' &&
      mname != '' &&
      sex != '' &&
      birthDate != '' &&
      contactNum != '' &&
      address != ''
    ) {
      return (
        <div className="d-flex justify-content-end">
          <button className="submit-btn" onClick={handleShow}>
            SUBMIT
          </button>
        </div>
      );
    } else {
      // console.log('Incomplete');
    }
  }
  
  function submit(e, customer, dateOfTesting, lastMeal) {
    if (isClicked ==  false) {
      setClicked(true);
      axios({
        method: 'post',
        url: window.$link + 'customers/create',
        withCredentials: false,
        params: {
          token: userToken,
          api_key: window.$api_key,
          first_name: customer.fname,
          last_name: customer.lname,
          middle_name: customer.mname,
          suffix: '',
          birthdate: customer.birthDate,
          contact_no: customer.contactNum,
          email: customer.email,
          gender: customer.sex,
          address: customer.address,
          emergency_contact: '',
          emergency_contact_no: '',
          relation_w_contact: '',
          last_meal: lastMeal,
          remarks: '',
          added_by: userId,
        },
        }).then(function (response) {
          toast.success(response.data.message.success);
          //Generate Queue Number
            axios({
              method: 'post',
              url: window.$link + 'customers/generateQueue',
              withCredentials: false,
              params: {
                api_key: window.$api_key,
                customer_id: response.data.data.customer_id,
              },
            }).then(function (queue) {
              toast.success("Queue " + queue.data.message);
              //setRedirect(true);
              //var queueNumber = queue.data.data.queue_no;
              });
          handleClose();
        })
    }  
  }

  


//   React.useEffect(() => {
//     axios({
//         method: 'post',
//         url: window.$link + 'discounts/getAll',
//         withCredentials: false, 
//         params: {
//             api_key: window.$api_key,
//             token: userToken.replace(/['"]+/g, ''),
//             requester: userId,
//         }
//     }).then(function (response) {
//         setDiscountList(response.data.discounts);
//     }).catch(function (error) {
//         // console.log(error);
//     });
// },[]);

// React.useEffect(() => {
//   axios({
//       method: 'post',
//       url: window.$link + 'discounts/show/' + discountId,
//       withCredentials: false, 
//       params: {
//           api_key: window.$api_key,
//           token: userToken.replace(/['"]+/g, ''),
//           requester: userId,
//       }
//   }).then(function (response) {
//       // console.log(response);
//       setCompanyId(response.data.data.discount.company_id);
//       setDiscount(response.data.data.discount.percentage);
//       setDiscountDetails(response.data.data.discount_details);
//       if(response.data.is_package == "1") {
//           setIsPackage("1");
//       }
//       if(response.data.is_service == "1") {
//           setIsService("1");
//       }
//   }).catch(function (error) {
//       console.log(error);
//   });
// },[discountId]);

React.useEffect(() => {
    setCompanyRemarks("");
    axios({
        method: 'post',
        url: window.$link + 'companies/show/' + companyId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
        }
    }).then(function (response) {
        setCompanyRemarks(response.data.remarks);
        setIsCompany(true);
    }).catch(function (error) {
        console.log(error);
    });

},[companyId]);

  // auto suggest address
  const [suggestions, setSuggestions] = useState([])
  const [allAddress, setAllAddress] = useState([])
  const [renderSuggest, setRenderSuggest] = useState(true)
  React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'customers/searchByAddress',
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
      }).then(function (response) {
          setAllAddress(response.data)
      }).catch(function (error) {
          setAllAddress([])
          console.log(error);
      });
  },[]);

  React.useEffect(()=>{
    if(address!==""&&allAddress.length>0){
      let searchWord = new RegExp(address.toLowerCase()) // create regex for input address
      let filteredAddress = allAddress.filter(info=>searchWord.test(info.toLowerCase())) // test if there is a match
      setSuggestions(filteredAddress) // set all matches to suggestions
    }
  },[address])

console.log(location)
 
 // auto suggest address
  const [MDSuggestions, setMDSuggestions] = useState([])
  const [allMD, setAllMD] = useState([])
  const [renderMDSuggest, setRenderMDSuggest] = useState(true)
  React.useEffect(() => {
      axios({
          method: 'post',
          url: window.$link + 'bookings/searchByDR',
          withCredentials: false, 
          params: {
              api_key: window.$api_key,
              token: userToken.replace(/['"]+/g, ''),
              requester: userId,
          }
      }).then(function (response) {
          setAllMD(response.data)
      }).catch(function (error) {
          setAllAddress([])
          console.log(error);
      });
  },[]);

  const listOfDiscount = discountList.map((row, index) => {
    return (
      <option key={index} value={row.id}>
        {row.description + ' (' + row.discount_code + ')'}
      </option>
    );
  });

  function sinceLastMeal() {
    var presentDate = new Date();
    let diffInMilliSeconds = Math.abs(presentDate - lastMeal) / 1000;

    //calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    // console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference += minutes === 0 || hours === 1 ? `${minutes} minutes ago` : `${minutes} minutes ago`;
    return difference;
  }

  // if(redirect){
  //   return <Navigate to={"/queuemanager/"} />;
  // }

  return (
    <div>
      <div className="active-cont center"style={{marginRight:"15%",}}>
        <Header type="thin" title="ADD PATIENT" />

        <h3 className="form-categories-header italic">PERSONAL DETAILS</h3>

        <div className="booking-form">
          <form className="needs-validation">
            <div className="row">
              <div className="col-sm-6">
                <label for="fname" className="form-label">
                  FIRST NAME <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
              <div className="col-sm-4">
                <label for="lname" className="form-label">
                  LAST NAME <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  value={lname}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label for="fname" className="form-label">
                  MIDDLE NAME
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="mname"
                  name="mname"
                  value={mname}
                  onChange={setPersonal}
                />
                <br />
              </div>
              <div className="col-sm-2">
                <label for="sex" className="form-label">
                  SEX<i>(required)</i>
                </label>
                <br />
                <select name="sex" className="gender-select" value={sex} onChange={setPersonal} required>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label for="birthDate" className="form-label">
                  DATE OF BIRTH<i>(required)</i>
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  name="birthDate"
                  className="schedule"
                  value={birthDate}
                  onChange={setPersonal}
                  required
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label for="email" className="form-label">
                  EMAIL 
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
              <div className="col-sm-6">
                <label for="contactNum" className="form-label">
                  CONTACT NUMBER <i>(required)</i>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="contactNum"
                  name="contactNum"
                  value={contactNum}
                  onChange={setPersonal}
                  required
                />
                <br />
              </div>
            </div>
            <div className="row">
              <label for="address" className="form-label">
                ADDRESS <i>(required)</i>
              </label>
              <br />
              <input
                type="text"
                className="form-control full"
                id="address"
                name="address"
                value={address}
                onChange={setPersonal}
                onFocus={()=>{setRenderSuggest(true)}}
                onBlur={()=>{setTimeout(()=>{setRenderSuggest(false)},200)}} 
                required
              />
              <br />
            </div>
            {suggestions.length!==0 && renderSuggest && <div className="suggestions-list">
              {suggestions.map((data, index)=>
                <><button key = {index} className="suggestions-item" name="address" value={data} onClick={(e)=>{setPersonal(e);setRenderSuggest(false)}}>{data}</button><br/></>
              )}
            </div>}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>SUBMIT</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to submit the form?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={(e) => submit(e, customer, dateOfTesting, lastMeal)}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            <div>{showSubmitButton()}</div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Form1CModule;