import React from 'react';

//Common Utility Functions


/***************************
 * Local Storage Utilities
 ***************************/


//return user data from session storage
export const getUser = () => {
    const userStr = localStorage.getItem('name');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

//return token from session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

//remove token from session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

//set the token and user from session storage
export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}