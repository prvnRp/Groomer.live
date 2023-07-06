import '../App.css';
import mySalon from '../images/salon.png';
import Bookings from '../images/calendar.png';
import Revenue from '../images/rupee.png';
import { NavLink } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import '../styles/LeftNav.css';

function LeftNav() {
    return (
        <div className="flex1">
            <div className="flex4">
                <NavLink to="/" ><img className="image sep" alt="mySalon" src={mySalon} /><span style={{ paddingLeft: "10px" }} className='flex31'>My Salon</span></NavLink>
            </div>
            <div className="flex4">
                <NavLink to="/bookings"><img className="image sepb" alt="Bookings" src={Bookings} /><span className='flex31'>Bookings</span></NavLink>
            </div>
            <div className="flex4">
                <NavLink to="/revenue"><img className="image" alt="Revenue" src={Revenue} /><span className='flex31'>Revenue</span></NavLink>
            </div>
        </div >
    );
}

export default LeftNav;