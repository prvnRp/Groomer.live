import '../App.css';
import '../styles/Popup.css';
import { useEffect, useState } from 'react';

function Popup({ displayOpen }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);
    return (
        show &&
        <div div className='popup' >
            Your Salon is {displayOpen ? "open" : "closed"} for bookings
        </div >
    )
}

export default Popup;