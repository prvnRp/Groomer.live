import { NavLink } from 'react-router-dom';
import '../App.css';
import mySalon from '../images/Salon1.svg';
import Bookings from '../images/Calendar.svg';
import Revenue from '../images/Rupee.svg';
import '../styles/LeftNav.css';
import '../styles/BottomNav.css'

function BottomNav() {
    return (
        <nav class="mobile-nav">
            <NavLink to="/" class="bloc-icon iconi">
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