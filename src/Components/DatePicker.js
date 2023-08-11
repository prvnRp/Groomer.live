import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import '../Styles/style.css';
import calendar from '../images/tear-off-calendar1.svg';

const DatePicker = ({ color, date }) => {
    const datePickerRef = useRef(null);
    const inputId = `datepicker-input-${Math.random().toString(36).substr(2, 9)}`;
    const [showCustomDropdown, setShowCustomDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date || '');

    const initializeDatePicker = () => {
        $(datePickerRef.current).datepicker({
            showButtonPanel: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: 'c:c+10',
            hidePrevNext: true,
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            showOtherMonths: true,
            stepMonths: 0,
            buttonImageOnly: true,
            buttonImage: calendar,
            buttonText: 'Pick Date',
            showOn: 'button',
            onSelect: (date) => {
                setSelectedDate(date);
            },
        });

        // Disable next and previous buttons
        $('.ui-datepicker-next, .ui-datepicker-prev').addClass('ui-state-disabled');
    };

    useEffect(() => {
        initializeDatePicker(); // Call the initialization function when the component mounts
    }, []);


    const handleIconClick = () => {
        setShowCustomDropdown(false);
        $(`#${inputId}`).datepicker('show');
    };

    const handleShortcutSelection = (days, shortcut) => {
        // Update the selectedDate state with the formatted date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        setSelectedDate(formatDate(currentDate));
        setSelectedDate(shortcut);
        setShowCustomDropdown(false);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const dropdownOptions = ['Today', 'Tomorrow', '16 June']

    return (
        <div className="datepicker-container">
            <div style={{ position: 'relative' }} className="outline-element-container">
                <input
                    ref={datePickerRef}
                    type="text"
                    className="openemr-datepicker input-textbox outline-element incorrect"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate}
                    color='#fff'
                    objtype="7"
                    name="action_element"
                    onClick={() => setShowCustomDropdown(!showCustomDropdown)}
                    objindex=""
                    aria-label="Select Date"
                    maxlength="11"
                    size="6"
                    style={{ backgroundColor: color, padding: '5px', border: "0", outline: "none", caretColor: "transparent", color: "#fff", fontSize: "15px" }}
                    readOnly
                />
                <span className="correct-incorrect-icon"></span>
                {showCustomDropdown && (
                    <div className="custom-date-dropdown">
                        {dropdownOptions.map((option, index) => (
                            <div className={selectedDate === option ? 'custom-date-option selected' : 'custom-date-option'} onClick={() => handleShortcutSelection(index, option)}>
                                {option}
                            </div>
                        ))}
                        {/* <div className={selectedDate === 'Today' ? 'custom-date-option selected' : 'custom-date-option'} onClick={() => handleShortcutSelection(0, 'Today')}>
                            Today
                        </div>
                        <div className="custom-date-option" onClick={() => handleShortcutSelection(1, 'Tomorrow')}>
                            Tomorrow
                        </div>
                        <div className="custom-date-option" onClick={() => handleShortcutSelection(2, '16 June')}>
                            16 June
                        </div> */}
                    </div>
                )}
                {/* <span style={{ marginLeft: "5px" }} onClick={() => setShowCustomDropdown(!showCustomDropdown)}><i className={showCustomDropdown ? 'arrow down' : 'arrow up'}></i></span> */}
            </div>
        </div>
    );
};

export default DatePicker;
