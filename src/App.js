import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./components/FontAwesomeIcons";

/** View */
import Login from './components/view/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
