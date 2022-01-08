import React from 'react';
import { Navigate } from 'react-router-dom';

//Common Utility Functions

export const refreshPage = () => {
    window.location.reload();
}


/***************************
 * Local Storage Utilities
 ***************************/


//return user data from session storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

//return role id from session storage
export const getRoleId = () => {
    return localStorage.getItem('role_id') || null;
}

//return token from session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

//remove token from session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    refreshPage();
}

//set the token and user from session storage
export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}