import '../App.css';

function SalonTimings({ inputs, setInputs, isReadOnly }) {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="form-group">
            <label className="label">Salon Timings:</label>
            <div className="input" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ marginRight: "20px" }}>Opening Time</label>
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 10px 4px 10px", borderRadius: "20px" }}>
                        <select
                            value={inputs.openingTimeHour}
                            onChange={(event) =>
                                setInputs((values) => ({
                                    ...values,
                                    openingTimeHour: event.target.value,
                                }))
                            }
                            disabled={isReadOnly}
                            style={{ backgroundColor: "#323030", outline: "none", border: "none", color: "#fff" }}
                        >
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        :
                        <select
                            value={inputs.openingTimeMinute}
                            onChange={(event) =>
                                setInputs((values) => ({
                                    ...values,
                                    openingTimeMinute: event.target.value,
                                }))
                            }
                            disabled={isReadOnly}
                            style={{ backgroundColor: "#323030", outline: "none", border: "none", color: "#fff" }}
                        >
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <span style={{ marginLeft: "5px" }}>{inputs.openingTimePeriod || "AM"}</span>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ marginLeft: "40px", marginRight: "20px" }}>Closing Time</label>
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 10px 4px 10px", borderRadius: "20px" }}>
                        <select
                            value={inputs.closingTimeHour}
                            onChange={(event) =>
                                setInputs((values) => ({
                                    ...values,
                                    closingTimeHour: event.target.value,
                                }))
                            }
                            disabled={isReadOnly}
                            style={{ backgroundColor: "#323030", outline: "none", border: "none", color: "#fff" }}
                        >
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                        :
                        <select
                            value={inputs.closingTimeMinute}
                            onChange={(event) =>
                                setInputs((values) => ({
                                    ...values,
                                    closingTimeMinute: event.target.value,
                                }))
                            }
                            disabled={isReadOnly}
                            style={{ backgroundColor: "#323030", outline: "none", border: "none", color: "#fff" }}
                        >
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <span style={{ marginLeft: "5px" }}>{inputs.closingTimePeriod || "PM"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalonTimings;