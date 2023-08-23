import '../App.css';
import logo from '../images/groomerpsd.svg';
import '../Styles/logo.css'
import { useBlur } from '../context/blurContext';

function Logo() {
    const { isBlur } = useBlur();


    return (
        <img src={logo} alt="Logo" className="logo" style={{ filter: isBlur ? 'blur(10px)' : 'none' }} />
    );
}

export default Logo;