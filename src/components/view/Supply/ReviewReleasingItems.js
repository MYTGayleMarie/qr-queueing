import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getToken, getUser, refreshPage} from "../../../utilities/Common";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

//components
import Header from '../../Header.js';
import Navbar from '../../Navbar';

//variables
const userToken = getToken();
const userId = getUser();

function ReviewReleasingItems() {
    document.body.style = 'background: white;';

    //Release details
    const {id} = useParams();

    //States
    const [releaseId, setReleaseID] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [requisitioner, setRequisitioner] = useState("");
    const [remarks, setRemarks] = useState("");

     
    React.useEffect(() => {
        axios({
          method: 'post',
          url: window.$link + 'releases/show/' + id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
          },
        })
          .then(function (response) {
            console.log(response.data);
            var date = new Date(response.data.release_date);
            setReleaseID(response.data.id);
            setReleaseDate(date.toDateString());
            setRemarks(response.data.remarks);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);

      //Functions
      function deleteRelease(){

      }

  return (<div>
      <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='RELEASE ITEM' 
                    buttons= {['delete-release']}
                />
                <ToastContainer/>
                <h4 className="form-categories-header italic">RELEASE ITEM DETAILS</h4>

                <div className="po-details">
                    <div className="row">
                        <div className="col-sm-2">
                                <div className='label'>ID</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='detail'>{releaseId}</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='label'>Release Date</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='detail'>{releaseDate}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                                <div className='label'>Requisitioner</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='detail'>{requisitioner}</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='label'>Remarks</div>
                        </div>
                        <div className="col-sm-2">
                                <div className='detail'>{remarks}</div>
                        </div>
                    </div>
                </div>

                <h5 className="form-categories-subheader italic">LIST OF RELEASED ITEMS</h5>
            </div>
    
    </div>);
}

export default ReviewReleasingItems;
