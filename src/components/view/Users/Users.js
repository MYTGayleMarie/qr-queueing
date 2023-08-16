import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

//css
import './Users.css';

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

const userToken = getToken();
const userId = getUser();
var id = '';


function Users() {
    const [render, setRender] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [finalUserData, setFinalUserData] = useState([]);
    const [isReady, setIsReady] = useState(false)

    function UserDetails(userId) {
        id = userId;
        setRedirect(true);
    }

    React.useEffect(() => {
        axios({
            method: 'post',
            url: window.$link + 'users/getAll',
            withCredentials: false, 
            params: {
                api_key: window.$api_key,
                token: userToken.replace(/['"]+/g, ''),
                requester: userId,
            }
        }).then(function (response) {
            response.data.users.map((row, index) => {
                var userDetails = {};

                userDetails.id = row.id;
                userDetails.name = row.name;
                userDetails.email = row.email;

                if(row.role_id == 1) {
                    userDetails.role = "User";
                }
                else if(row.role_id == 2) {
                    userDetails.role = "Registration Officer";
                }
                else if(row.role_id == 3) {
                    userDetails.role = "Cashier";
                }
                else if(row.role_id == 4){
                    userDetails.role = "Admin";
                }
                else if(row.role_id == 5){
                    userDetails.role = "Results Releasing Officer";
                }
                else if(row.role_id == 6){
                    userDetails.role = "Purchasing Officer";
                }
                else if(row.role_id == 7){
                    userDetails.role = "Supply Officer";
                }
                else if(row.role_id == 8){
                    userDetails.role = "Accounting Officer";
                }
                else if(row.role_id == 9){
                    userDetails.role = "Customer Queue";
                }
                else if(row.role_id == 10){
                    userDetails.role = "Lab Officer";
                }
                else if(row.role_id == 11){
                    userDetails.role = "Receiving";
                }
                else if(row.role_id == 12){
                    userDetails.role = "Supervisor";
                }
                else{
                    userDetails.role = "User";
                }
                setFinalUserData(oldArray => [...oldArray, userDetails]);
            });
            setIsReady(true)


        }).catch(function(error) {
            console.log(error);
        });
    }, []);

    if (redirect == true) {
        var link = '/user/' + id;
        return <Navigate to={link} />;
    }
    
    return (
        <div>
            <div>
            <Navbar />
            <div className="active-cont">
                <Fragment>
                <Header type="thick" title="USERS MANAGER"/>
                <Table
                    type={'users'}
                    tableData={finalUserData}
                    rowsPerPage={4}
                    headingColumns={['ID', 'NAME', 'EMAIL', 'ROLE']}
                    link={UserDetails}
                    givenClass={'user-mobile'}
                    useLoader={true}
                    isReady={isReady}
                />
                <ToastContainer hideProgressBar={true} />
                </Fragment>
            </div>
            </div>
        </div>
    )
}

export default Users
