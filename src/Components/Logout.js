import '../App.css';
import LogoutR from '../images/logout-rounded.png';
import '../styles/logout.css';

function Logout() {
    return (
        <div className="logout">
            Logout
            <img src={LogoutR} alt="logout" />
        </div>
    );
}

export default Logout;