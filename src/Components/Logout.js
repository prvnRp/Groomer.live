import '../App.css';
import LogoutR from '../images/LogoutRounded.svg';
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