import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MySalon from './Components/MySalon';
import Bookings from './Components/Bookings';
import Revenue from './Components/Revenue';
import Home from './Home'

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='mySalon' element={<MySalon />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="revenue" element={<Revenue />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
