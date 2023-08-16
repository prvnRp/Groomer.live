import React, { useState, useRef, useEffect } from 'react';
// import { MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ isincorrect, setIsIncorrect }) => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState(['', '', '', '']);
    const otpBoxesRef = useRef([]);
    const OTP = 1234;
    const [iscorrect, setIsCorrect] = useState(false);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        setOTP((prevOTP) => {
            const newOTP = [...prevOTP];
            newOTP[index] = value;
            return newOTP;
        });

        if (value !== '') {
            focusNextBox(index);
        }
    };

    useEffect(() => {
        const otpString = otp.join('');
        if (otpString.length === 4) {
            if (parseInt(otpString) === OTP) {
                setIsIncorrect(false);
                setIsCorrect(true);
            } else {
                setIsIncorrect(true);
            }
        }
    }, [otp])
    useEffect(() => {
        if (iscorrect) {
            navigate(-1);
        }
    }, [iscorrect])
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim().slice(0, 4);
        const newOTP = Array(4).fill('');

        for (let i = 0; i < pasteData.length; i++) {
            newOTP[i] = pasteData[i];
        }

        setOTP(newOTP);
    };

    const focusNextBox = (index) => {
        if (index < otpBoxesRef.current.length - 1) {
            otpBoxesRef.current[index + 1].focus();
        }
    };

    const focusPrevBox = (index) => {
        if (index > 0) {
            otpBoxesRef.current[index - 1].focus();
        }
    };

    useEffect(() => {
        otpBoxesRef.current[0].focus();
    }, []);

    return (
        <div className="otp-input-container">
            <div className="otp-boxes">
                {otp.map((value, index) => (
                    <input className="otp-box"
                        size="1"
                        key={index}
                        ref={(ref) => (otpBoxesRef.current[index] = ref)}
                        type="number"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onPaste={handlePaste}
                        onFocus={(e) => e.target.select()}
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace' && value === '') {
                                focusPrevBox(index);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default OTPInput;
