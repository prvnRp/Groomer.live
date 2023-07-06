import '../App.css';
import LeftNav from './LeftNav';
import '../styles/Revenue.css';

function Revenue() {
    return (
        <div className="flexcontainer" style={{ paddingRight: "5%" }}>
            <LeftNav />
            <div className='Container'>
                <div style={{ minHeight: "500px", justifyContent: "space-evenly", height: "72vh" }} className="flex-2">
                    <div className="datefilter">
                        <label style={{ color: "#FFF", fontWeight: "500" }} htmlFor="fromdate">From</label>
                        <input type="date" id="datepicker" />
                        <label style={{ color: "#FFF", fontWeight: "500" }} htmlFor="todate">To</label>
                        <input type="date" id="todate" />
                        <div className='go'>GO</div>
                    </div>
                    <div className='Today'>
                        <div className='Today1'>Today Revenue<div className='RevenueNum'>₹1700</div></div>
                        <div className='Today1'>Today Bookings<div className='BookingsNum'>20</div></div>
                    </div>
                    <div className='TandC'>Money will be credited to groomer.live financials. Your money will be distributed twice in a week directly to your bank account provided to groomer. <b>Terms and conditions</b></div>
                </div>
            </div>
        </div>
    );
}

export default Revenue;