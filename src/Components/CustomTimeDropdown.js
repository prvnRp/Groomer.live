import React, { useState } from 'react';

const CustomTimeDropdown = ({ Label }) => {
    const [showCompleteDropdown, setShowCompleteDropdown] = useState(false);
    const [selectedHour, setSelectedHour] = useState(11);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('AM');

    const handleCompleteDropdownClick = () => {
        setShowCompleteDropdown(!showCompleteDropdown);
    };

    const handleHourChange = (event) => {
        setSelectedHour(parseInt(event.target.value));
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(parseInt(event.target.value));
    };

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const handleCompleteTimeChange = (timeOption) => {
        setSelectedHour(timeOption.hour);
        setSelectedMinute(timeOption.minute);
        setSelectedPeriod(timeOption.period);
        setShowCompleteDropdown(false);
    };

    // Function to generate time options with 30 minutes interval
    const generateTimeOptions = () => {
        const times = [];
        const startTime = 11; // Starting hour
        const endTime = 23;   // Ending hour

        for (let hour = startTime; hour <= endTime; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const period = hour >= 12 ? 'PM' : 'AM';
                times.push({ hour, minute, period });
            }
        }

        return times;
    };

    const timeOptions = generateTimeOptions();

    // List of complete time options
    const completeTimeOptions = timeOptions.slice(0, 3).map(({ hour, minute, period }) => ({
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${period}`,
        hour,
        minute,
        period,
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {Label && <label>Time:</label>}
            <div className='select-wrapper'>
                <div style={{ position: 'relative' }}>
                    {/* Individual Hour Dropdown */}
                    <select
                        value={selectedHour}
                        onChange={handleHourChange}
                        style={{ backgroundColor: '#232323', outline: 'none', border: 'none', color: '#fff' }}
                    >
                        {timeOptions.map(({ hour, period }, index) => (
                            <option key={index} value={hour}>
                                {hour.toString().padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                    <span>:</span>
                    {/* Individual Minute Dropdown */}
                    <select
                        value={selectedMinute}
                        onChange={handleMinuteChange}
                        style={{ backgroundColor: '#232323', outline: 'none', border: 'none', color: '#fff' }}
                    >
                        {timeOptions
                            .filter(({ hour }) => hour === selectedHour)
                            .map(({ minute }, index) => (
                                <option key={index} value={minute}>
                                    {minute.toString().padStart(2, '0')}
                                </option>
                            ))}
                    </select>
                    {/* Period Dropdown */}
                    <select
                        value={selectedPeriod}
                        onChange={handlePeriodChange}
                        style={{ backgroundColor: '#232323', outline: 'none', border: 'none', color: '#fff', marginLeft: '5px' }}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                    {/* Right Arrow for Complete Time Dropdown */}
                    <span style={{ marginLeft: "5px", position: "relative", top: "-1px" }} onClick={handleCompleteDropdownClick}><i className={showCompleteDropdown ? 'arrow down' : 'arrow up'}></i></span>
                    {/* Complete Time Dropdown */}
                    {showCompleteDropdown && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: '#232323',
                                color: '#fff',
                                zIndex: 1,
                                padding: '5px',
                            }}
                        >
                            {completeTimeOptions.map((timeOption, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCompleteTimeChange(timeOption)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {timeOption.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomTimeDropdown;
