import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import OnBoardForm from './Components/OnBoardForm';
import SalonSearch from './Components/SalonSearch';
import Home from './Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<App />}> */}
        <Route path="admin" element={<OnBoardForm />} />
        <Route path="search" element={<SalonSearch />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
