import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/all.css';
import './DatePicker.css';
import './DatepickerComponent.css'; // Import custom CSS for styling

const DatepickerComponent = () => {
    const datepickerRef = useRef(null);
    const selectedDates = useRef([]);

    useEffect(() => {
        const datepickerElement = datepickerRef.current;

        $(datepickerElement).datepicker({
            showButtonPanel: true,
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: "c:c+10",
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            // buttonText: 'Pick Date',
            monthNamesShort: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            showOtherMonths: true,
            firstDay: 1,
            beforeShowDay: function (date) {
                const dateString = $.datepicker.formatDate("dd/mm/yy", date);
                const isSelected = selectedDates.current.includes(dateString);
                return [true, isSelected ? "selected-date" : ""];
            },
            onSelect: function (dateText, inst) {
                const index = selectedDates.current.indexOf(dateText);
                if (index === -1) {
                    selectedDates.current.push(dateText);
                } else {
                    selectedDates.current.splice(index, 1);
                }
                $(this).datepicker("setDate", new Date()); // Reset selected date to trigger immediate visual feedback
                console.log(selectedDates.current);
            },
        });

        $(datepickerElement).datepicker("show");

        return () => {
            $(datepickerElement).datepicker("destroy");
        };
    }, []);

    return (
        <div id="datepicker-container" className="datepicker-container">
            {/* <div ref={datepickerRef} className="datepicker-input"></div> */}
            <div ref={datepickerRef} id="datepicker"></div>
        </div>
    );
};

export default DatepickerComponent;
