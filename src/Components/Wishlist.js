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
import { useBlur } from '../context/blurContext';

// The Wishlist component displays a user's wishlist of salons.
function Wishlist() {
    const { isBlur } = useBlur();
    const [wishlist, setWishlist] = useState(wishlistItems);

    // Function to remove an item from the wishlist based on its ID
    const removeFromWishlist = (itemId) => {
        // Filter out the item with the given ID from the wishlist
        const updatedWishlist = wishlist.filter(item => item.ID !== itemId);
        setWishlist(updatedWishlist);
    };

    return (
        <>
            <Header />
            {/* Render the main content of the Wishlist */}
            <div style={{ filter: isBlur ? 'blur(10px)' : 'none' }} className="flex-container">

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
                            {/* Display the wishlist items using the WishlistTable component */}
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
                            {/* Display the mobile version of the wishlist using the WishlistMobile component */}
                            <WishlistMobile BookingDetails={wishlist} removeFromWishlist={removeFromWishlist} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;