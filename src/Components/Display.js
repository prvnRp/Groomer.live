import '../App.css';
import '../styles/Popup.css';
import { useEffect, useState } from 'react';

// Define the Popup functional component
function Popup({ displayOpen }) {
    // State to control the display of the popup
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Set a timeout to automatically hide the popup after 3 seconds
        const timeId = setTimeout(() => {
            setShow(false)
        }, 3000)

        // Cleanup function to clear the timeout when the component unmounts
        return () => {
            clearTimeout(timeId)
        }
    }, []);

    // Render the popup if 'show' state is true
    return (
        show &&
        <div div className='popup' >
            Your Salon is {displayOpen ? "open" : "closed"} for bookings
        </div >
    )
}

export default Popup;