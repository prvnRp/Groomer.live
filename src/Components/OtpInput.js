import React, { useState, useRef, useEffect } from 'react';
// import { MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ isincorrect, setIsIncorrect }) => {
    const navigate = useNavigate();
    // State for managing the OTP input as an array of individual digits
    const [otp, setOTP] = useState(['', '', '', '']);
    const otpBoxesRef = useRef([]); // Ref for OTP input boxes
    const OTP = 1234; // Expected OTP for validation
    const [iscorrect, setIsCorrect] = useState(false); // State to track whether the OTP is correct

    // Handler for OTP input changes
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

    // Effect to check OTP validity when all digits are entered
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

    // Effect to navigate when OTP is correct
    useEffect(() => {
        if (iscorrect) {
            navigate(-1); // Navigate back
        }
    }, [iscorrect])

    // Handler for pasting OTP from clipboard
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim().slice(0, 4);
        const newOTP = Array(4).fill('');

        for (let i = 0; i < pasteData.length; i++) {
            newOTP[i] = pasteData[i];
        }

        setOTP(newOTP);
    };

    // Function to focus on the next input box
    const focusNextBox = (index) => {
        if (index < otpBoxesRef.current.length - 1) {
            otpBoxesRef.current[index + 1].focus();
        }
    };

    // Function to focus on the previous input box
    const focusPrevBox = (index) => {
        if (index > 0) {
            otpBoxesRef.current[index - 1].focus();
        }
    };

    // Effect to focus on the first input box when the component mounts
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
