import '../App.css';
import React from 'react';
import TableRow from './TableRow';
import '../Styles/Bookings.css';
import Header from './Header';
import { BookingDetails } from './Data';
import BookingMobile from './BookingMobile';

function Bookings() {
    return (
        <>
            <Header />
            <div className="flex-container">
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
                            <TableRow BookingDetails={BookingDetails} />
                        </div>
                        <div className='MobileView'>
                            <BookingMobile BookingDetails={BookingDetails} />
                        </div>
                    </div >
                </div>
            </div>
        </>);
}

export default Bookings;