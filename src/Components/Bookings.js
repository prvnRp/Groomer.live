import '../App.css';
import React from 'react';
import TableRow from './TableRow';
import '../Styles/Bookings.css';
import Header from './Header';
import { BookingDetails } from './Data';
import BookingMobile from './BookingMobile';
import { useBlur } from '../context/blurContext';

function Bookings() {
    // Access blur state from context using custom hook
    const { isBlur } = useBlur();

    return (
        <>
            <Header />
            <div style={{ filter: isBlur ? 'blur(10px)' : 'none' }} className="flex-container">
                <div className='container1'>
                    <div className="flex2">
                        <div className='heading'>Bookings History</div>
                        <div className="grid-container">
                            <div className="grid-item-h">Booking ID</div>
                            <div className="grid-item-h">Salon Name</div>
                            <div className="grid-item-h">Slot details</div>
                            <div className="grid-item-h">Location</div>
                            <div className="grid-item-h">Services</div>
                            <div className="grid-item-h">Pricing</div>
                            <div className="grid-item-h">Status</div>
                            {/* Render individual rows using TableRow component */}
                            <TableRow BookingDetails={BookingDetails} />
                        </div>
                        {/* Display mobile view of bookings */}
                        <div className='MobileView'>
                            <BookingMobile BookingDetails={BookingDetails} />
                        </div>
                    </div >
                </div>
            </div>
        </>);
}

export default Bookings;