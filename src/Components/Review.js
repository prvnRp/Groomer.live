import '../App.css';
import Logo from './Logo';
import Hamburger from './Hamburger';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import envolope from '../images/envelope-with-checkmark-icon.svg';
import Box from '@mui/material/Box';

function Review() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [message, setMessage] = useState('');
    const maxCharacterCount = 500;

    // Handle message change while respecting character limit
    const handleMessageChange = (event) => {
        const inputMessage = event.target.value;
        if (inputMessage.length <= maxCharacterCount) {
            setMessage(inputMessage);
        }
    };

    // Auto-expand the textarea as the message grows
    useEffect(() => {
        // Resize the textarea when the component mounts and whenever the message changes
        const textarea = document.getElementById('messageTextarea');
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [message]);

    // Handle cancel and simulate payment processing
    const [Cancelpage, setCancelPage] = useState('confirmation');
    var { id } = useParams();
    console.log(id);
    id = parseInt(id, 10);
    const BookingID = location.state?.BookingID;
    const handleCancel = () => {
        setCancelPage('cancelled');
    };

    // Labels for the star rating
    const labels = {
        0: '',
        1: 'Terrible',
        2: 'Bad',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    // Get label text for the rating
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "25px" }}>
            {Cancelpage === 'confirmation' && <>
                <div>
                    <div style={{ position: "fixed", top: "0", left: "0" }}><Logo /></div>
                    <div style={{ position: "fixed", top: "2vw", right: "6vh" }}><Hamburger /></div>
                </div>
                <div className='reschedule'>Rate and Write a review</div>
                <div className='rating-card'>
                    <div>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                size="large"
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarBorderIcon style={{ color: 'white', fontSize: '30px' }} />}
                            />
                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}
                        </Box>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            style={{
                                width: "100%",
                                resize: "none", // Prevent manual resizing by the user
                                minHeight: "20px", // Set a minimum height to prevent it from collapsing completely
                                overflow: "hidden", // Hide the scrollbar
                                boxSizing: "border-box", // Include padding and border in height calculation
                                backgroundColor: "#1E1E1E",
                            }}
                            rows="1"
                            id="messageTextarea"
                            placeholder="Review"
                            value={message}
                            onChange={handleMessageChange}
                            className='Mobile Number'
                        />
                        <div style={{ position: 'absolute', right: 10, bottom: -25, color: message.length > maxCharacterCount ? 'red' : 'rgba(255, 255, 255, 0.45)' }}>
                            {message.length}/{maxCharacterCount}
                        </div>
                    </div>
                </div>
                <div className='reschedule-buttons'>
                    <button onClick={handleCancel} className='button-cancel'>Sent</button>
                </div>
            </>}
            {Cancelpage === 'cancelled' && <>
                <div>
                    <div style={{ position: "fixed", top: "0", left: "0" }}><Logo /></div>
                    <div style={{ position: "fixed", top: "2vw", right: "6vh" }}><Hamburger /></div>
                    <div className='close-review' style={{ position: "fixed", cursor: "pointer" }} onClick={() => { navigate('/bookings') }}><u>Close</u></div>
                </div>
                <div className='rating-card'>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "25px" }}>
                        <img src={envolope} alt='banking' />
                        <div style={{ fontSize: "16px", textAlign: "center" }}>Thank you for your feedback</div>
                    </div>
                </div>
            </>}
        </div>
    );
}

export default Review;
