import '../App.css';
import LeftNav from './LeftNav';
import React, { useState } from 'react';
import TableRow from './TableRow';
import '../styles/Bookings.css';
import BottomNav from './BottomNav';
import BookingMobile from './BookingMobile';

function Bookings() {

    var BookingDetails = [
        { Date: "June 11", BookingID: "123455", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut, Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 11", BookingID: "234344", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 12", BookingID: "343243", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 12", BookingID: "145452", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 12", BookingID: "145455", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 13", BookingID: "875165", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 13", BookingID: "741555", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Cancelled" },
        { Date: "June 13", BookingID: "586588", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 14", BookingID: "155385", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 14", BookingID: "258961", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 14", BookingID: "456258", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 14", BookingID: "159357", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 15", BookingID: "586324", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Cancelled" },
        { Date: "June 15", BookingID: "586214", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 15", BookingID: "587426", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 15", BookingID: "854925", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 16", BookingID: "478562", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 17", BookingID: "585151", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 17", BookingID: "475148", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Cancelled" },
        { Date: "June 18", BookingID: "475145", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 18", BookingID: "486524", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 18", BookingID: "852151", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Booked" },
        { Date: "June 18", BookingID: "258722", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 19", BookingID: "786248", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
        { Date: "June 20", BookingID: "892456", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "₹300", Status: "Completed" },
    ];
    const [elementVisible, setElementVisible] = useState(false);
    const [filterOption, setFilterOption] = useState("Booked");

    var Status = { "Booked": "yellow", "Completed": "green", "Cancelled": "red" }
    // prev = ""
    return (
        <div className="flex-container">
            <LeftNav />
            <div className='container'>
                <div className="flex2">
                    <div className='book'>
                        <div className="salonname">{filterOption !== "Booked" ? filterOption : ""} Bookings</div>
                        <div className="filtering" onClick={() => setElementVisible(true)}>
                            <div onMouseLeave={() => setElementVisible(false)} className='options' style={{ display: elementVisible ? 'flex' : 'none' }}>
                                <div className='row1' onClick={() => setFilterOption("Completed")}><div className='circle1 green'></div>Completed</div>
                                <div className='row1' onClick={() => setFilterOption("Booked")}><div className='circle1 yellow'></div>Booked</div>
                                <div className='row1' onClick={() => setFilterOption("Cancelled")}><div className='circle1 red'></div>Cancelled</div>
                            </div>
                            <div className="filter"><span className={elementVisible ? 'arrow arrow-right' : 'arrow arrow-left'}></span>
                                Filter<div className={'circle ' + Status[filterOption]}></div></div>
                        </div>
                    </div>
                    <div className='tableContainer'>
                        <table id="bookings">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Customer name</th>
                                    <th>Slot details</th>
                                    <th>Services</th>
                                    <th>Pricing</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    <TableRow BookingDetails={BookingDetails} Color={Status[filterOption]} filterOption={filterOption} />
                                }
                            </tbody>
                        </table>
                        <div className='MobileView'>
                            <BookingMobile BookingDetails={BookingDetails} Color={Status[filterOption]} filterOption={filterOption} />
                        </div>
                    </div>
                </div >
            </div>
            <BottomNav />
        </div>
    );
}

export default Bookings;