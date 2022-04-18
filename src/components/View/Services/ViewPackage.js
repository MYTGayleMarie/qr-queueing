import React, { Fragment, useState } from "react"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';

//css
// import './Services.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';

//constants
const buttons = ['edit-package', 'delete-package'];
const userToken = getToken();
const userId = getUser();

export default function ViewPackage(){
  return(
    <div>
      view package page
    </div>
  )
}