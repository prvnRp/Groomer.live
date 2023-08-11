import React, { useState } from 'react';
import '../Styles/BookingMobile.css';
import '../Styles/TableRow.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WishlistMobile(props) {
    const { BookingDetails, removeFromWishlist } = props;

    const [expandedCard, setExpandedCard] = useState(null);
    var Status = { "Booked": "yellow", "Completed": "green", "Cancelled": "red" }
    const handleRemoveFromWishlist = (item) => {
        removeFromWishlist(item.ID);
    };
    const handleCardClick = (index) => {
        setExpandedCard(index === expandedCard ? null : index);
    };

    const bookings = BookingDetails.map((item, index) => {
        // const currentDate = item.Date;
        // let dateElement = null;

        // if (index === 0 || props.BookingDetails[index - 1].Date !== currentDate) {
        //     dateElement = <div className='date'>{currentDate}</div>;
        // }

        const isExpanded = index === expandedCard;

        return (
            <React.Fragment key={item.ID}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: "35px", background: "rgba(123, 123, 123, 0.25)", padding: "15px 10px", margin: "10px 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginLeft: "10px" }}>
                        <div>{item.SalonName}</div>
                        <div>{item.Location}</div>
                    </div>
                    <div>
                        <div><FavoriteIcon style={{ marginRight: "2vw" }} onClick={() => handleRemoveFromWishlist(item)} /></div>
                    </div>
                </div>
            </React.Fragment>
        );
    });

    return bookings;
}

export default WishlistMobile;
