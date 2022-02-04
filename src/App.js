import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/home';
import Login from './Components/Login';
import Register from './Components/Register';
import { Navigate } from "react-router-dom";


function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
