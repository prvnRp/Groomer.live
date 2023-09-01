import React, { useState } from 'react';
import '../Styles/BookingMobile.css';
import '../Styles/TableRow.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

// The WishlistMobile component is responsible for rendering wishlist items in a mobile view.
function WishlistMobile(props) {
    const { BookingDetails, removeFromWishlist } = props;

    const handleRemoveFromWishlist = (item) => {
        removeFromWishlist(item.ID);
    };

    // Generate the list of wishlist items to be displayed
    const bookings = BookingDetails.map((item, index) => {

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
