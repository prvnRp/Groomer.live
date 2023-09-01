import React from 'react';
import '../Styles/TableRow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableRow(props) {
    const navigate = useNavigate();

    // Define a mapping of booking statuses to their corresponding color codes
    var Status = { "Booked": "yellow", "Completed": "green", "Cancelled": "red" }
    const [expandedRow, setExpandedRow] = useState(null); // State to manage the expanded row

    // Function to handle row click and toggle the expanded row
    const handleRowClick = (bookingID) => {
        if (expandedRow === bookingID) {
            setExpandedRow(null);
        } else {
            setExpandedRow(bookingID);
        }
    };

    // Generate JSX elements for each booking in the list
    const bookings = props.BookingDetails.map(item => {
        const isExpanded = expandedRow === item.BookingID; // Check if the current booking is expanded

        return (
            <React.Fragment key={item.BookingID}>
                {/* Display booking details if expanded */}
                {isExpanded && <div style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }} className="grid-item item1"><u>Booking Details:</u><i onClick={() => handleRowClick(item.BookingID)} style={{ float: "right", position: "inherit" }} className={isExpanded ? 'arrow1 arrow-up' : 'arrow1 arrow-down'} /></div>}
                <div style={{ marginBottom: isExpanded ? "0px" : "10px", borderTopLeftRadius: isExpanded ? "0px" : "25px", borderBottomLeftRadius: isExpanded ? "0px" : "25px" }} className="grid-item"><span style={{ paddingLeft: "20px" }}>{item.BookingID}</span></div>
                <div style={{ marginBottom: isExpanded ? "0px" : "10px" }} className="grid-item">{item.SalonName}</div>
                <div style={{ marginBottom: isExpanded ? "0px" : "10px" }} className="grid-item">{item.SlotDetails}</div>
                <div style={{ marginBottom: isExpanded ? "0px" : "10px" }} className="grid-item">{item.Location}</div>
                <div style={{ marginBottom: isExpanded ? "0px" : "10px" }} className="grid-item">{item.Services}</div>
                <div style={{ marginBottom: isExpanded ? "0px" : "10px" }} className="grid-item">{item.Pricing}</div>
                <div style={{ color: Status[item.Status], marginBottom: isExpanded ? "0px" : "10px", borderTopRightRadius: isExpanded ? "0px" : "25px", borderBottomRightRadius: isExpanded ? "0px" : "25px" }} className="grid-item">{!isExpanded && <span>{item.Status}</span>}{!isExpanded && <i onClick={() => handleRowClick(item.BookingID)} style={{ float: "right", position: "inherit" }} className={isExpanded ? 'arrow1 arrow-up' : 'arrow1 arrow-down'} />}</div>
                {
                    isExpanded &&
                    <>
                        {/* Display additional details for expanded row */}
                        <span class="grid-item">
                            <span style={{ paddingLeft: "20px" }}>Name
                            </span>
                        </span>
                        <span className="grid-item">Mobile</span>
                        <span className="grid-item">email</span>
                        <span className="grid-item item2">payment id</span>
                        <span className="grid-item">method</span>
                        <span style={{ color: Status[item.Status], }} className="grid-item">{item.Status}</span>
                        <span style={{ borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px" }} className="grid-item item3">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                <button style={{ background: "#515151" }} onClick={() => {
                                    navigate(`/reschedule/${item.SalonId}`, { state: { BookingID: item.BookingID } });
                                }}>Reschedule
                                </button>
                                <button style={{ background: "#FF6548" }} onClick={() => {
                                    navigate(`/cancel/${item.SalonId}`, { state: { BookingID: item.BookingID } });
                                }}>Cancel
                                </button>
                            </div>
                        </span>
                    </>
                }
            </React.Fragment>
        );
    });

    return (
        bookings
    );
}

export default TableRow;