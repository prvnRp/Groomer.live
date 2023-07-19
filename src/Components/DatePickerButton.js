import React from 'react';
import './DatePicker.css'

const DatePickerButton = ({ label, onClick }) => {
    return (
        <button type="button" className="ui-datepicker-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default DatePickerButton;
