import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/home';
import Login from './Components/login';
import Register from './Components/register';
import { Navigate } from "react-router-dom";
import Profile from './Components/profile';
import Favourites from './Components/favourites';


function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
