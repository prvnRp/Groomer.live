import React from 'react';
import '../styles/style.css'

const DatePickerButton = ({ label, onClick }) => {
  return (
    <button type="button" className="ui-datepicker-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default DatePickerButton;
