import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

//Common Utility Functions

export const refreshPage = () => {
    window.location.reload();
}


/***************************
 * Local Storage Utilities
 ***************************/


//return user data from local storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

//return role id from local storage
export const getRoleId = () => {
    return localStorage.getItem('role_id') || null;
}

//return token from local storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

//log logout session
export const logOut = () => {
    axios({
        method: 'post',
        url: window.$link + 'logout/index/' + window.$userId,
        withCredentials: false, 
        params: {
            api_key: window.$api_key,
        }
    }).then(function (message) {
    });
}

//remove token from local storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logOut();
    refreshPage();
}

//set the token and user from local storage
export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}