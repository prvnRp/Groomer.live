import '../App.css';
import '../Styles/Login.css';
import { NavLink } from 'react-router-dom';
import TopNav from './TopNav';
import Logo from './Logo';
import { useState } from 'react';
import Otp from './Otp';

function Register({ setStatus }) {

    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileNumberRegistered, setIsMobileNumberRegistered] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const handleCheckNumber = () => {
        // Simulating the check by comparing with a stored mobile number
        const storedMobileNumber = '1234567890'; // Replace with your stored mobile number

        if (mobileNumber === storedMobileNumber) {
            setIsMobileNumberRegistered(true);
        } else {
            setIsMobileNumberRegistered(false);
            setIsRegistered(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckNumber(); // Call the function to check the mobile number
        // Continue with your registration logic here
    };

    return (
        <>
            {!isRegistered && <form className='inforegister' onSubmit={handleSubmit}>
                <div>
                    <div className='login'><b>Register</b></div>
                    <p>{isMobileNumberRegistered ? 'This account already exists. Please ' : 'Already have an account?'} <span className='register' onClick={() => setStatus('login')}>Login</span></p>
                </div>
                <div>
                    <input type="text" placeholder="Username" className='Mobile Number' id="mobileNumber" />
                </div>
                <div>
                    <input type="email" placeholder="Email" className='Mobile Number' id="mobileNumber" />
                </div>
                <div>
                    <input type="number" placeholder="Mobile Number" className='Mobile Number' id="mobileNumber" onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                        />
                        <span className="checkbox-custom"></span>
                        I accept the terms and conditions, including the Privacy
                    </label>
                </div>
                <div>
                    <button type="submit" className='LoginButton'>Register</button>
                </div>
            </form>}
            {isRegistered && <Otp />}
        </>
    );
}

export default Register;
