import '../App.css';
import LogoutR from '../images/LogoutRounded.svg';
import './Logout.css';
import { NavLink } from "react-router-dom";

function Logout() {
    return (
        <NavLink to="/" >
            <div className="logout">
                Logout
                <img src={LogoutR} alt="logout" />
            </div>
        </NavLink>
    );
}

export default Logout;