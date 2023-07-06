import '../App.css';
import LeftNav from './LeftNav';
import React, { useState } from 'react';
import TableRow from './TableRow';
import '../styles/Bookings.css';
import BottomNav from './BottomNav';
// import { useLocation } from 'react-router-dom'

function Bookings() {
    const [elementVisible, setElementVisible] = useState(false);
    const [filteroption, setFilteroption] = useState("Booked");

    var Status = { "Booked": "yellow", "Completed": "green", "Cancelled": "red" }
    // prev = ""
    return (
        <div className="flex-container">
            <LeftNav />
            <div className='container'>
                <div className="flex2">
                    <div className='book'>
                        <div className="salonname">{filteroption !== "Booked" ? filteroption : ""} Bookings</div>
                        <div className="filtering" onClick={() => setElementVisible(true)}>
                            <div onMouseLeave={() => setElementVisible(false)} className='options' style={{ display: elementVisible ? 'flex' : 'none' }}>
                                <div className='row1' onClick={() => setFilteroption("Completed")}><div className='circle1 green'></div>Completed</div>
                                <div className='row1' onClick={() => setFilteroption("Booked")}><div className='circle1 yellow'></div>Booked</div>
                                <div className='row1' onClick={() => setFilteroption("Cancelled")}><div className='circle1 red'></div>Cancelled</div>
                            </div>
                            <div className="filter"><span className={elementVisible ? 'arrow arrow-right' : 'arrow arrow-left'}></span>
                                Filter<div className={'circle ' + Status[filteroption]}></div></div>
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
                                    <TableRow Color={Status[filteroption]} filterOption={filteroption} />
                                }
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
            <BottomNav />
        </div>
    );
}

export default Bookings;