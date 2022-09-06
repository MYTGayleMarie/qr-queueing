import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

//Common Utility Functions

export const refreshPage = () => {
    window.location.reload();
}

export const getTime = (date) => {
    return  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export const formatDate = (date) => {
  //if date is null or empty string return nothin
  if (!date || date == "") {
    return "";
  }

  var formatDate = new Date(date);
  var stringDate = formatDate.toDateString().split(" ");

  return (
    stringDate[1] +
    " " +
    stringDate[2] +
    ", " +
    stringDate[3] 
  );
};


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

//return role  from local storage
export const getRole = () => {
    console.log(localStorage)
    return localStorage.getItem('role').replace(/['"]+/g, '') || null;
}


//return token from local storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

//return token expiry from local storage
export const getTokenExpiry = () => {
    return localStorage.getItem('token_expiry') || null;
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
    logOut();
    refreshPage();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role_id')
    localStorage.removeItem('token_expiry');
}

//set the token and user from local storage
export const setUserSession = (token, user,token_expiry) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}