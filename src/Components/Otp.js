import React, { useEffect, useState } from 'react';
import OtpInput from './OtpInput';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    // State variable to track whether the entered OTP is incorrect
    const [isincorrect, setIsIncorrect] = useState(false);
    return (
        <div className="info">
            <div>
                <div className='login'><b>OTP</b></div>
                <p>OTP not received? <span className='register'>Send again</span></p> {/* Prompt to resend OTP */}
            </div>
            <div>
                {/* OTP input component */}
                <OtpInput isincorrect={isincorrect} setIsIncorrect={setIsIncorrect} />
                {/* Error message for incorrect OTP */}
                <div style={{ fontSize: "15px", color: "red", marginTop: "5px", opacity: isincorrect ? '1' : '0' }}>The entered OTP is incorrect. Please try again</div>
            </div>
        </div>
    );
};

export default Otp;
