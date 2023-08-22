import '../App.css';
import TimePicker from './TimePicker';

function LunchTimings({ inputs, setInputs, isReadOnly }) {

    return (
        <div className="form-group">
            <label className="label">Lunch Timings:</label>
            <div className="input" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 5px 0px 10px", borderRadius: "20px" }}>
                        <TimePicker timeperiods={['PM']} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ marginLeft: "20px", marginRight: "20px" }}>To</label>
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 5px 0px 10px", borderRadius: "20px" }}>
                        <TimePicker timeperiods={['PM']} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LunchTimings;