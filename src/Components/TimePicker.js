import React, { useState, useEffect, useRef } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimePicker = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState('01:00 AM');
    const [selectedHour, setSelectedHour] = useState('01');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('AM');
    const [showCompleteDropdown, setShowCompleteDropdown] = useState(false);

    // Arrays for hours, minutes, and time periods
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const timePeriods = ['AM', 'PM'];

    // Function to toggle the time picker visibility
    const togglePicker = () => {
        setShowPicker(!showPicker);
        setShowCompleteDropdown(false);
    };

    // Function to handle time selection
    const handleTimeSelect = () => {
        const time = `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`;
        setSelectedTime(time);
        setShowPicker(false);
        setShowCompleteDropdown(false);
    };

    // Function to handle complete time change
    const handleCompleteTimeChange = (timeOption) => {
        setSelectedHour(timeOption.hour.toString().padStart(2, '0'));
        setSelectedMinute(timeOption.minute.toString().padStart(2, '0'));
        setSelectedTimePeriod(timeOption.period);
        setSelectedTime(timeOption.label);
        setShowCompleteDropdown(false);
        setShowPicker(false);
    };


    const handleCompleteDropdownClick = () => {
        setShowCompleteDropdown(!showCompleteDropdown);
        setShowPicker(false);
    };

    // Generate an array of time options
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
    const completeTimeOptions = timeOptions.slice(0, 5).map(({ hour, minute, period }) => ({
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`,
        hour,
        minute,
        period,
    }));

    // Ref for the dropdown container
    const dropdownRef = useRef(null);

    // Effect to close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCompleteDropdown(false);
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <div className="time-picker-container" ref={dropdownRef}>
            <div className="time-picker-input">
                <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    // onClick={togglePicker}
                    placeholder="Select Time"
                    onClick={handleCompleteDropdownClick}
                />
                <span className="time-picker-icon" onClick={togglePicker}>
                    <AccessTimeIcon style={{ fontSize: "20px" }} />
                </span>
            </div>
            {/* Time picker dropdown */}
            {showPicker && (
                <div className="time-picker-dropdown">
                    <div className='time-picker-partitions'>
                        <div className="picker-column">
                            {hours.map(hour => (
                                <div
                                    key={hour}
                                    className={selectedHour === hour ? 'selected' : ''}
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {minutes.map(minute => (
                                <div
                                    key={minute}
                                    className={selectedMinute === minute ? 'selected' : ''}
                                    onClick={() => setSelectedMinute(minute)}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {timePeriods.map(period => (
                                <div
                                    key={period}
                                    className={selectedTimePeriod === period ? 'selected' : ''}
                                    onClick={() => setSelectedTimePeriod(period)}
                                >
                                    {period}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* OK button to confirm the selected time */}
                    <button className="time-picker-ok-btn" onClick={handleTimeSelect}>
                        OK
                    </button>
                </div>
            )}
            {/* Complete time dropdown */}
            {showCompleteDropdown && (
                <div
                    className='complete-time-dropdown'
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: '#525252',
                        borderRadius: '15px',
                        color: '#fff',
                        zIndex: 9999,
                        padding: '5px 6px',
                    }}
                >
                    {completeTimeOptions.map((timeOption, index) => (
                        <div
                            key={index}
                            onClick={() => handleCompleteTimeChange(timeOption)}
                            style={{ cursor: 'pointer' }}
                            className={selectedTime === timeOption.label ? 'selected time-picker-complete-option' : 'time-picker-complete-option'}
                        >
                            {timeOption.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimePicker;
