import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import '../styles/style.css';

const DatePicker = () => {
  const datePickerRef = useRef(null);
  const inputId = `datepicker-input-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const datePickerInput = $(datePickerRef.current);
    datePickerInput.attr('id', inputId); // Set the unique id attribute for the input
    datePickerInput.datepicker({
      // Configuration options for the datepicker
      dateFormat: 'dd/mm/yy',
      changeMonth: true,
      changeYear: true,
      yearRange: 'c:c+10',
      hidePrevNext: true,
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      showOtherMonths: true,
      stepMonths: 0,
      onSelect: function (dateText, inst) {
        $(this).data('selectedDate', dateText); // Store the selected date in the input element's data
      },
    });
    datePickerInput.on('click', function () {
      const $datepicker = $(this).datepicker('widget');
      $datepicker.off('mousedown');
    });
    // Disable next and previous buttons
    $('.ui-datepicker-next, .ui-datepicker-prev').addClass('ui-state-disabled');
  }, [inputId]);

  return (
    <div className="datepicker-container">
      {/* Input field for the datepicker */}
      <span className="outline-element-container">
        <input
          ref={datePickerRef}
          type="text"
          className="openemr-datepicker input-textbox outline-element incorrect"
          placeholder="DD/MM/YYYY"
          color='#fff'
          objtype="7"
          name="action_element"
          objindex=""
          aria-label="Select Date"
          maxlength="15"
          size="15"
          style={{ backgroundColor: '#373535', padding: '5px', border: "0", outline: "none", caretColor: "transparent", color: "#fff" }}
          onClick={() => $(datePickerRef.current).datepicker('show')}
        />
        <span className="correct-incorrect-icon"></span>
      </span>
      <div id="datepicker"></div>
    </div>
  );
};

export default DatePicker;
