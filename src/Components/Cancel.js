import '../App.css';
import Logo from './Logo';
import Hamburger from './Hamburger';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import banking from '../images/mobile-banking-cashback.svg';

function Cancel() {
    const navigate = useNavigate();
    const location = useLocation();
    const [Cancelpage, setCancelPage] = useState('confirmation');
    var { id } = useParams();
    console.log(id);
    id = parseInt(id, 10);
    const BookingID = location.state?.BookingID;
    const handleCancel = () => {
        setCancelPage('cancelled');
        // Simulate the payment processing for 2 seconds
        setTimeout(() => {
            setCancelPage('moneyRefund');
            // Simulate booking confirmation for 1 second after payment completion
            // setTimeout(() => {
            //     setCheckoutStage('bookingConfirmed');
            // }, 1000);
        }, 2000);
    };
    return (
        <div className='cancel-image' style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: "25px", textAlign: "center" }}>
            {Cancelpage === 'confirmation' && <><div>
                <div style={{ position: "fixed", top: "0", left: "0" }}><Logo /></div>
                <div style={{ position: "fixed", top: "2vw", right: "6vh" }}><Hamburger /></div>
            </div>
                <div className='reschedule'>Are you sure to Cancel?</div>
                <div className='reschedule-buttons'>
                    <button onClick={() => { navigate(-1) }} className='button-cancel'>NO</button>
                    <button onClick={handleCancel} className='button-reschedule'>YES</button>
                </div>
                <div style={{ fontSize: "10px" }}>15% of cancellation charges will be applicable on your booking . <b>Terms and conditions</b> </div></>}
            {Cancelpage === 'cancelled' && <>
                <div>
                    <div style={{ position: "fixed", top: "0", left: "0" }}><Logo /></div>
                    <div style={{ position: "fixed", top: "2vw", right: "6vh" }}><Hamburger /></div>
                </div>
                <div className='money-refund' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div><img src={banking} /></div>
                    <div className='reschedule'>Your booking has been cancelled</div>
                </div>
                {/* < className='reschedule-buttons'> */}
                {/* <button onClick={() => { navigate(-1) }} className='button-cancel'>OK</button> */}
            </>}
            {Cancelpage === 'moneyRefund' && <>
                <div>
                    <div style={{ position: "fixed", top: "0", left: "0" }}><Logo /></div>
                    <div style={{ position: "fixed", top: "2vw", right: "6vh" }}><Hamburger /></div>
                    <div className='close-review' style={{ position: "fixed", cursor: "pointer" }} onClick={() => { navigate(-1) }}><u>Close</u></div>
                </div>
                <div className='money-refund' style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <div><img src={banking} /></div>
                    <div>
                        <div className='reschedule'>Your money will  be credited with in 24hours.</div>
                        <div className='reschedule'>Thank you.</div>
                        <div style={{ fontSize: "10px", marginTop: "20px" }}>The money will be credited to the same payment mode and same details . <b>Terms and conditions</b> </div>
                    </div>
                </div>
                {/* < className='reschedule-buttons'> */}
                {/* <button onClick={() => { navigate(-1) }} className='button-cancel'>OK</button> */}
            </>}
        </div>
    );
}

export default Cancel;
