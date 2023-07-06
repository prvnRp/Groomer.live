import { NavLink } from 'react-router-dom';
import '../App.css';
import mySalon from '../images/salon.png';
import Bookings from '../images/calendar.png';
import Revenue from '../images/rupee.png';
// import { NavLink } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import '../styles/LeftNav.css';
import '../styles/BottomNav.css'

function BottomNav() {
    return (
        <nav class="mobile-nav">
            <NavLink to="/" class="bloc-icon">
                <img src={mySalon} alt="" />
            </NavLink>
            <NavLink to="/bookings" class="bloc-icon">
                <img src={Bookings} alt="" />
            </NavLink>
            <NavLink to="/revenue" class="bloc-icon">
                <img src={Revenue} alt="" />
            </NavLink>
        </nav>
    );
}

export default BottomNav;