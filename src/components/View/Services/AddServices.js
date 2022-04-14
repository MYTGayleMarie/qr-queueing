import React from "react"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../../utilities/Common';

//css
import './AddServices.css'

//components
import Navbar from '../../Navbar';
import Header from '../../Header.js';
import Table from '../../Table.js';


//View page
export default function Services(){
 return (
  <div>
   Add Services Page
  </div>

 )
}