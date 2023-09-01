import React, { useState } from 'react';
import '../styles/BookingMobile.css';
import '../styles/TableRow.css';

// Define the BookingMobile functional component
function BookingMobile(props) {
    const [expandedCard, setExpandedCard] = useState(null); // State to track which card is expanded

    // Function to handle card click and toggle expansion
    const handleCardClick = (index) => {
        setExpandedCard(index === expandedCard ? null : index);
    };

    // Filter and map BookingDetails to create card elements
    const bookings = props.BookingDetails.filter(item => item.Status === props.filterOption).map((item, index) => {
        // Check if the date should be displayed (only for the first item with a new date)
        const currentDate = item.Date;
        let dateElement = null;

        if (index === 0 || props.BookingDetails[index - 1].Date !== currentDate) {
            dateElement = <div className='date'>{currentDate}</div>;
        }

        const isExpanded = index === expandedCard; // Check if the card is expanded

        // Return JSX for each booking card
        return (
            <React.Fragment key={item.BookingID}>
                {dateElement}
                <div className='Card' onClick={() => handleCardClick(index)}>
                    <div style={{ flexDirection: isExpanded ? "column" : "row" }} className='Card-item'>
                        {isExpanded ? null : (
                            <div className={'circle3 ' + props.Color}></div>
                        )}
                        <div style={{ paddingTop: isExpanded ? "15px" : "6px", paddingLeft: isExpanded ? "8px" : "0px" }} className='Carditem'>
                            <div style={{ fontSize: "14px", fontWeight: "700" }}>Booking ID: {item.BookingID}{!isExpanded ? null : (<span style={{ float: "right" }}>Status: <span style={{ color: props.Color }}>{props.filterOption}</span></span>)}</div>
                            {isExpanded ? null : (
                                <React.Fragment>
                                    <div><span style={{ paddingRight: "15px" }}>{item.CustomerName}</span> <span>{item.SlotDetails}</span></div>
                                    <div style={{ position: "relative", top: "-3px" }}><span style={{ fontSize: "20px", fontWeight: "700" }}>{item.Pricing}</span> <span style={{ fontSize: "12px" }}>For {item.Services.split(",").length} Service{item.Services.split(",").length === 1 ? "" : "s"}</span></div>
                                </React.Fragment>
                            )}
                        </div>
                        {isExpanded ? (
                            <table style={{ position: "relative", top: "-12px" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "0 9px" }} width="90vm"><b>Slot details:</b></td>
                                        <td style={{ padding: "0 0" }}>{item.SlotDetails}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "0 9px" }}><b>Services:</b></td>
                                        <td style={{ padding: "0 0" }}>{item.Services}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "0 9px" }}><b>Price:</b></td>
                                        <td style={{ padding: "0 0" }}>{item.Pricing}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                </div>
            </React.Fragment>
        );
    });

    return bookings;     // Return the array of booking elements
}

// Export the BookingMobile component as the default export
export default BookingMobile;
