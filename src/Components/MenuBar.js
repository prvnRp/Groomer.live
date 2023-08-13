import '../App.css';
import { NavLink } from 'react-router-dom';

function MenuBar() {
    return (
        <div className="dropdownMenu">
            <ul>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default MenuBar;