import '../App.css';
import '../Styles/Login.css';
import { NavLink } from 'react-router-dom';
import TopNav from './TopNav';
import { useState } from 'react';
import Otp from './Otp';
import Logo from './Logo';
import Register from './Register';

function Login() {
    const [islogined, setIslogined] = useState(false);
    const [status, setStatus] = useState('login');
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
        <section className="container11">
            <div className="bg-image"><div className='logo-display'><Logo /></div></div>
            <div className="contentt">
                <div className='topnav-display'><TopNav /></div>
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
        </section >

    );
}

export default Login;
