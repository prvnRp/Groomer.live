import React from 'react';
import '../styles/TableRow.css';

function TableRow(props) {
    var BookingDetails = [
        { Date: "June 11", BookingID: "123455", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 11", BookingID: "234344", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 12", BookingID: "343243", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 12", BookingID: "145452", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 13", BookingID: "875165", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 13", BookingID: "741555", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Cancelled" },
        { Date: "June 13", BookingID: "586588", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 14", BookingID: "155385", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 14", BookingID: "258961", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 14", BookingID: "456258", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 14", BookingID: "159357", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 15", BookingID: "586324", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Cancelled" },
        { Date: "June 15", BookingID: "586214", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 15", BookingID: "587426", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 15", BookingID: "854925", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 16", BookingID: "478562", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 17", BookingID: "585151", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 17", BookingID: "475148", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Cancelled" },
        { Date: "June 18", BookingID: "475145", CustomerName: "1110100", SlotDetails: "4 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 18", BookingID: "486524", CustomerName: "1110100", SlotDetails: "5 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 18", BookingID: "852151", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Booked" },
        { Date: "June 18", BookingID: "258722", CustomerName: "1110100", SlotDetails: "1 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 19", BookingID: "786248", CustomerName: "1110100", SlotDetails: "2 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
        { Date: "June 20", BookingID: "892456", CustomerName: "1110100", SlotDetails: "6 july", Services: "Haircut", Pricing: "300", Status: "Completed" },
    ];
    let prev = null;

    const bookings = BookingDetails.filter(item => item.Status === props.filterOption).map(item => {
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