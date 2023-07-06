import '../App.css';
import LeftNav from './LeftNav';
import '../styles/Revenue.css';
import BottomNav from './BottomNav';

function Revenue() {
    return (
        <div className="flexcontainer" style={{ paddingRight: "5%" }}>
            <LeftNav />
            <div className='Container'>
                <div className="flex-2">
                    <div className="datefilter">
                        <div>
                            <label style={{ color: "#FFF", fontWeight: "500" }} htmlFor="fromdate">From</label>
                            <input type="date" id="datepicker" />
                        </div>
                        <div>
                            <label style={{ color: "#FFF", fontWeight: "500" }} htmlFor="todate">To</label>
                            <input type="date" id="todate" />
                        </div>
                        <div className='go'>GO</div>
                    </div>
                    <div className='Today'>
                        <div className='Today1'>Today Revenue<div className='RevenueNum'>₹1700</div></div>
                        <div className='Today1'>Today Bookings<div className='BookingsNum'>20</div></div>
                    </div>
                    <div className='TandC'>Money will be credited to groomer.live financials. Your money will be distributed twice in a week directly to your bank account provided to groomer. <b>Terms and conditions</b></div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}

export default Revenue;