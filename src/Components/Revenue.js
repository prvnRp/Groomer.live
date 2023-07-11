import '../App.css';
import LeftNav from './LeftNav';
import '../styles/Revenue.css';
import BottomNav from './BottomNav';
import DatePicker from './DatePicker';
import  { useState } from 'react';

function Revenue() {

    const [search,setSearch]=useState(false);

    const handleClick=() => {
        setSearch(true);
    }

    return (
        <div className="flexcontainer">
            <LeftNav />
            <div className='Container'>
                <div className="flex-2">
                    <div className="datefilter">
                        <div style={{display:"flex",flexDirection:"row", gap:"15px"}}>
                            <span style={{ color: "#FFF", fontWeight: "500" }}>From</span>
                            <DatePicker />
                        </div>
                        <div style={{display:"flex",flexDirection:"row", gap:"15px"}}>
                            <span style={{ color: "#FFF", fontWeight: "500" }}>To</span>
                            <DatePicker />
                        </div>
                        <div onClick={handleClick} className='go'>GO</div>
                    </div>
                    <div className='Today'>
                        <div className='Today1'>{search ? "":"Today"} Revenue<div className='RevenueNum'>₹1700</div></div>
                        <div className='Today1'>{search ? "":"Today"} Bookings<div className='BookingsNum'>20</div></div>
                    </div>
                    <div className='TandC'>Money will be credited to groomer.live financials. Your money will be distributed twice in a week directly to your bank account provided to groomer. <b>Terms and conditions</b></div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}

export default Revenue;