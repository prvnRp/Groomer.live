import '../App.css';
import LogoutR from '../images/LogoutRounded.svg';
import '../styles/logout.css';
import { NavLink } from "react-router-dom";

function Logout() {
    return (
        // Navigation link to the home page ("/")
        <NavLink to="/" >
            {/* Logout button with an image */}
            <div className="logout">
                Logout
                <img src={LogoutR} alt="logout" />
            </div>
        </NavLink>
    );
}

export default Logout;