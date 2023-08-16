import '../App.css';
import '../Styles/Login.css';
import { NavLink } from 'react-router-dom';
import TopNav from './TopNav';
import { useState, useEffect } from 'react';
import Otp from './Otp';
import Logo from './Logo';
import Hamburger from './Hamburger';
import Register from './Register';

function Login() {
    const [islogined, setIslogined] = useState(false);
    const [status, setStatus] = useState('login');
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        // Initial check and event listener setup
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckNumber();
    }
    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileNumberRegistered, setIsMobileNumberRegistered] = useState(false);

    const handleCheckNumber = () => {
        // Simulating the check by comparing with a stored mobile number
        const storedMobileNumber = '1234567890'; // Replace with your stored mobile number

        if (mobileNumber === storedMobileNumber) {
            setIsMobileNumberRegistered(true);
        } else {
            setIsMobileNumberRegistered(false);
            setIslogined(true);
        }
    };

    return (
        <div class="container11">
            <div class="image-section">
                <Logo />
                {isMobileView && <div style={{ marginRight: "20px", marginTop: "25px" }} className='topnav-display'><Hamburger /></div>}
            </div>
            <div class="login-section">
                {!isMobileView && <div style={{ marginRight: "40px", marginTop: "40px" }} className='topnav-display'><Hamburger /></div>}
                <div class="login-card">
                    {status === 'login' ? (
                        <div className='info'>
                            {!islogined && <div>
                                <div className='login'><b>Login</b></div>
                                <p>{isMobileNumberRegistered ? 'This account does not exist. Please ' : "Don't have an account? "}<span className='register' onClick={() => (setStatus('register'))}>Register</span></p>
                                {/* <p>Don't have an account? <NavLink to="/register"><span className='register'>Register</span></NavLink></p> */}
                            </div>}
                            {!islogined && <form>
                                <div>
                                    <input type="number" placeholder="Mobile Number" className='Mobile Number' id="mobileNumber" onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                                <div>
                                    <button style={{ marginTop: "10vh" }} onClick={handleSubmit} className='LoginButton'>Login</button>
                                </div>
                            </form>}
                            {islogined && <Otp />}
                        </div>
                    ) : <Register setStatus={setStatus} />}
                </div>
            </div>
        </div>
    );
}

export default Login;
