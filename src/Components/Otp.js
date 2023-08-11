import React, { useState } from 'react';
import OtpInput from './OtpInput';
import '../Styles/Login.css';

const Otp = () => {

    return (
        <div className="info">
            <div>
                <div className='login'><b>OTP</b></div>
                <p>OTP not received? <span className='register'>Send again</span></p>
            </div>
            <OtpInput />
            <div>
                <button className='LoginButton'>Login</button>
            </div>
        </div>
    );
};

export default Otp;
