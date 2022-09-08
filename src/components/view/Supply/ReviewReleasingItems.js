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
    const [grandTotal, setGrandTotal] = useState("");
    const [remarks, setRemarks] = useState("");
    const [items, setItems] = useState([]);
    const [redirect, setRedirect] = useState(false);

     
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
            setRequisitioner(response.data.requisitioner);
            setGrandTotal(response.data.grand_total);
            setRemarks(response.data.remarks);
          })
          .catch(function (error) {
            console.log(error);
          });

          axios({
                method: 'post',
                url: window.$link + 'releases/getReleasingItems/' + id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  requester: userId,
                },
              }).then(function (response) {
                 console.log(response.data);
                 response.data.map((data, index) => {
                      var info = {};

                      info.id = data.id;
                      info.qty = data.qty;
                      info.unit = data.unit;
                      info.item = data.item;
                      info.cost = data.cost;
                      info.total = data.amount;

                      setItems(oldarray => [...oldarray, info]);
                 })
              }).then(function (error) {
                  console.log(error);
              })
      }, []);

       //components
    const listItems = items.map((data,index) => {
        return (
        <div className="row">
            <div className="col-sm-1">
                {data.id}
            </div>
            <div className="col-sm-1">
                {parseFloat(data.qty).toFixed(2)}
            </div>
            <div className="col-sm-1">
                {data.unit}
            </div>
            <div className="col-sm-3 d-flex justify-content-center">
                {data.item}
            </div>
            <div className="col-sm-2">
                {parseFloat(data.cost).toFixed(2)}
            </div>
            <div className="col-sm-2">
                {parseFloat(data.total).toFixed(2)}
            </div>
        </div>
        )
    });

      //Functions
      function deleteRelease(){
        axios({
                method: 'post',
                url: window.$link + 'releases/delete/' + id,
                withCredentials: false,
                params: {
                  api_key: window.$api_key,
                  token: userToken.replace(/['"]+/g, ''),
                  updated_by: userId,
                },
              }).then(function (response) {
                 toast.success("Release item succussfully deleted!")
                 setTimeout(function () {
                   setRedirect(true);
                 }, 2000);
              }).catch(function (error) {
                  console.log(error);
              })
      }

    if (redirect == true) {
        return <Navigate to="/release-item" />;
    }
    

  return (<div>
      <Navbar/>
            <div className="active-cont">
                <Header 
                    type='thin'
                    title='RELEASE ITEM' 
                    buttons= {['delete-release']}
                    deleteRelease={deleteRelease}
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

                <div className="summary-services">
                    <div className="row">
                        <div className="col-sm-1 service">
                            ID
                        </div>
                        <div className="col-sm-1 service">
                            QTY
                        </div>
                        <div className="col-sm-1 service">
                            UNIT
                        </div>
                        <div className="col-sm-3 service d-flex justify-content-center">
                            ITEM
                        </div>
                        <div className="col-sm-2 service">
                            COST
                        </div> 
                        <div className="col-sm-2 service">
                            TOTAL
                        </div>
                    </div>
                    {listItems}

                    <div className="row d-flex justify-content-end mt-5">
                        <div className="col-sm-3">
                            <div className='label'>GRAND TOTAL</div>
                        </div>
                        <div className="col-sm-4">
                            <div className='detail'><b>{grandTotal}</b></div>
                        </div>
                    </div>
                </div>
            </div>
    
    </div>);
}

export default ReviewReleasingItems;
