import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import Bookings from './Components/Bookings';
import Wishlist from './Components/Wishlist';
import MenuItems from './Components/MenuItems';
import AboutUs from './Components/AboutUs';
import Salons from './Components/Salons';
import SalonPage from './Components/SalonPage';
import Reschedule from './Components/Reschedule';
import Cancel from './Components/Cancel';
import Review from './Components/Review';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import { BlurProvider } from './context/blurContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlurProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="menu" element={<MenuItems />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="salons" element={<Salons />} />
          <Route path="/salon/:id" element={<SalonPage />} />
          <Route path="/reschedule/:id" element={<Reschedule />} />
          <Route path="/cancel/:id" element={<Cancel />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </BlurProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
