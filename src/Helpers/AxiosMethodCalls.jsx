import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// will change this once login api is done na
export var API_KEY = "0fcTliqGYJYaqbonSWgcYjnbj2Hp0mN5t22ZKhu71p0sJ1giD2";
export var TOKEN = "uEhp1rwt4Dehn0v0duluYzEGu9IhPFdB0BoYLNbnuPYeNWx5uA";

let config = {
  headers: {
    "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
    "Content-Type": "application/json",
  },
};

let fileconfig = {
  headers: {
    "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
    "Content-Type": "multipart/form-data",
  },
};

// API Axios Get Call.
export const getAPICall = (url, data) => {
  return axios.get(url, data, config);
};

// API Axios Post Call.
export const postAPICall = (url, data) => {
  return axios.post(url, data, config);
};
export const postAPICall2 = (url, data) => {
  return axios.post(url, data, fileconfig);
};
// API Axios Put Call.
export const putAPICall = (url, data) => {
  return axios.put(url, data, config);
};
// API Axios Delete Call.
export const deleteAPICall = (url) => {
  return axios.delete(url, config);
};
