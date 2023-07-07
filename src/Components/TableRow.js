import React from 'react';
import '../styles/TableRow.css';

function TableRow(props) {
    let prev = null;

    const bookings = props.BookingDetails.filter(item => item.Status === props.filterOption).map(item => {
        const currentDate = item.Date;
        let dateElement = null;

        if (prev !== currentDate) {
            dateElement = <div className='date'>{currentDate}</div>;
            prev = currentDate;
        }

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
        bookings
    );
}

export default TableRow;