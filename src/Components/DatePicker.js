import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import '../styles/style.css'; // Import the CSS file
// import tearOffCalendar from '../images/tear-off-calendar.png';

const DatePicker = () => {
  const datePickerRef = useRef(null);
  const inputId = `datepicker-input-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
      const datePickerInput = $(datePickerRef.current);
      datePickerInput.attr('id', inputId); // Set the unique id attribute for the input
      datePickerInput.datepicker({
      showButtonPanel: true,
      dateFormat: 'dd/mm/yy',
      changeMonth: true,
      changeYear: true,
      yearRange: 'c-100:c+10',
      hidePrevNext: true,
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  // buttonText: 'Pick Date',
      showOtherMonths: true,
      stepMonths: 0,
      onSelect: function (dateText, inst) {
        $(this).data('selectedDate', dateText); // Store the selected date in the input element's data
      },
      
      beforeShow: function (input, inst) {
        setTimeout(function () {
          const buttonPane = $(inst.dpDiv).find('.ui-datepicker-buttonpane');
          let buttonContainer = buttonPane.find('.custom-datepicker-buttons');

          if (buttonContainer.length === 0) {
            buttonContainer = $('<div className="custom-datepicker-buttons"></div>');
            buttonContainer.append('<button type="button" className="ui-datepicker-cancel">Cancel</button>');
            buttonContainer.append('<button type="button" className="ui-datepicker-setdate">Set Date</button>');
            buttonPane.append(buttonContainer);
          }

          // Handle Cancel button click event
          buttonContainer.on('click', '.ui-datepicker-cancel', function () {
            $(input).datepicker('hide'); // Hide the datepicker
            $(input).val(''); // Clear the input value
          });

          // Handle Set Date button click event
          buttonContainer.on('click', '.ui-datepicker-setdate', function () {
            const selectedDate = $(input).data('selectedDate'); // Get the selected date from the input element's data
            if (selectedDate) {
              // Do something with the selected date
              console.log('Selected Date:', selectedDate);
              $(input).val(selectedDate); // Set the selected date in the input element
            }
            $(input).datepicker('hide'); // Hide the datepicker
          });
        }, 0);
      },
      
      onChangeMonthYear: function (year, month, inst) {
        setTimeout(function () {
          const buttonPane = $(inst.dpDiv).find('.ui-datepicker-buttonpane');
          let buttonContainer = buttonPane.find('.custom-datepicker-buttons');

          if (buttonContainer.length === 0) {
            buttonContainer = $('<div className="custom-datepicker-buttons"></div>');
            buttonContainer.append('<button type="button" className="ui-datepicker-cancel">Cancel</button>');
            buttonContainer.append('<button type="button" className="ui-datepicker-setdate">Set Date</button>');
            buttonPane.append(buttonContainer);

            // Handle Cancel button click event
            buttonContainer.on('click', '.ui-datepicker-cancel', function () {
              $(inst.input).datepicker('hide'); // Hide the datepicker
              $(inst.input).val(''); // Clear the input value
            });

            // Handle Set Date button click event
            buttonContainer.on('click', '.ui-datepicker-setdate', function () {
              const selectedDate = $(inst.input).data('selectedDate'); // Get the selected date from the input element's data
              if (selectedDate) {
                // Do something with the selected date
                console.log('Selected Date:', selectedDate);
                $(inst.input).val(selectedDate); // Set the selected date in the input element
              }
              $(inst.input).datepicker('hide'); // Hide the datepicker
            });
          }
        }, 0);
      },
      // beforeShowDay: function (date) {
      //   return [true, '', ''];
      // },
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
          style={{ backgroundColor: '#373535', padding: '5px', border:"0", outline: "none", caretColor: "transparent", color: "#fff"}}
          onClick={() => $(datePickerRef.current).datepicker('show')}
        />
        <span className="correct-incorrect-icon"></span>
      </span>
      <div id="datepicker"></div>
    </div>
  );
};

export default DatePicker;
