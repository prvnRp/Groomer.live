// jquery datepicker
// Reference : https://codepen.io/shiovan/pen/BZKXod

// React component for a custom date picker using jQuery UI datepicker
// It allows selecting a date from a calendar and provides shortcut options


import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import '../Styles/style.css';
import calendar from '../images/tear-off-calendar1.svg';

const DatePicker = ({ color, date }) => {
    // Ref to track clicks outside the custom dropdown
    const dropdownRef = useRef(null);

    // Effect to handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCustomDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const datePickerRef = useRef(null);
    // const inputId = `datepicker-input-${Math.random().toString(36).substr(2, 9)}`;
    const [showCustomDropdown, setShowCustomDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date || '');

    // Function to initialize the jQuery UI datepicker
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
        $('.ui-datepicker-next, .ui-datepicker-prev').addClass('ui-state-disabled');
    };

    useEffect(() => {
        initializeDatePicker();
    }, []);

    // Hide datepicker when custom dropdown is shown
    useEffect(() => {
        if (showCustomDropdown) {
            $(datePickerRef.current).datepicker('hide');
        }
    }, [showCustomDropdown]);

    // Handle selection of shortcut options
    const handleShortcutSelection = (days, shortcut) => {
        // Update the selectedDate state with the formatted date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        setSelectedDate(formatDate(currentDate));
        setSelectedDate(shortcut);
        setShowCustomDropdown(false);
    };

    // Format date to DD/MM/YYYY
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // List of shortcut options
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
                    style={{ backgroundColor: color, padding: '5px', border: "0", outline: "none", caretColor: "transparent", color: "#fff", fontSize: "15px", position: "relative", top: "-3px" }}
                    readOnly
                />
                <span className="correct-incorrect-icon"></span>
                {showCustomDropdown && (
                    <div className="custom-date-dropdown" ref={dropdownRef}>
                        {dropdownOptions.map((option, index) => (
                            <div className={selectedDate === option ? 'custom-date-option selected' : 'custom-date-option'} onClick={() => handleShortcutSelection(index, option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatePicker;
