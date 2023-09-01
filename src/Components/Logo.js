import '../App.css';
import logo from '../images/groomerpsd.svg';
import '../styles/logo.css'

function Logo() {

    return (
        // Render the logo image
        <img src={logo} alt="Logo" className="logo" />
    );
}

export default Logo;