import React from 'react';
import '../styles/TableRow.css';

function TableRow(props) {
    let prev = null;

    // Filter and map the BookingDetails based on the selected filterOption
    const bookings = props.BookingDetails.filter(item => item.Status === props.filterOption).map(item => {
        const currentDate = item.Date;
        let dateElement = null;

        // Check if the current date is different from the previous date
        if (prev !== currentDate) {
            dateElement = <div className='date'>{currentDate}</div>;
            prev = currentDate;
        }

        // Return a fragment containing table rows for each booking
        return (
            <React.Fragment key={item.BookingID}>
                {dateElement}
                <tr>
                    <td><b>{item.BookingID}</b></td>
                    <td>{item.CustomerName}</td>
                    <td style={{ fontSize: "14px" }}>{item.SlotDetails}</td>
                    <td>{item.Services}</td>
                    <td style={{ fontWeight: "700", fontSize: "20px" }}>{item.Pricing}</td>
                    <td style={{ color: props.Color }}><b>{item.Status}</b></td>
                </tr>
            </React.Fragment>
        );
    });

    return (
        bookings // Return the mapped bookings as table rows
    );
}

export default TableRow;