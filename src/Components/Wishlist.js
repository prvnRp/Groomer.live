import '../App.css';
// import TopNav from './TopNav';
// import React, { useState } from 'react';
import WishlistTable from './WishlistTable';
import '../Styles/Bookings.css';
// import BottomNav from './BottomNav';
import WishlistMobile from './WishlistMobile';
// import Logo from './Logo';
import Header from './Header';
// import Logout from './Logout';
import { useState } from 'react';
import { wishlistItems } from './Data';

function Wishlist() {

    const [wishlist, setWishlist] = useState(wishlistItems);
    const removeFromWishlist = (itemId) => {
        // Filter out the item with the given ID from the wishlist
        const updatedWishlist = wishlist.filter(item => item.ID !== itemId);
        setWishlist(updatedWishlist);
    };

    return (
        <>
            <Header />
            <div className="flex-container">

                <div className='container1'>
                    <div className="flex2 desktop-flex2">
                        <div className="salonname"><b>Wishlist</b></div>

                        <table id="wishlist">
                            <thead>
                                <tr>
                                    <th><span style={{ paddingLeft: "3vw" }}>Salon Name</span></th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    <WishlistTable BookingDetails={wishlist} removeFromWishlist={removeFromWishlist} />
                                }
                            </tbody>
                        </table>
                    </div >
                    <div className='flex2'>
                        <div className='MobileView'>
                            <div className="salonname"><b>Wishlist</b></div>
                            <WishlistMobile BookingDetails={wishlist} removeFromWishlist={removeFromWishlist} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;