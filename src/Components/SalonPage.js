import React, { useState, useEffect } from 'react';
import '../App.css';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Ac from '../images/air-conditioner.svg';
import wifi from '../images/wi-fi.svg';
import parking from '../images/parking.svg';
import language from '../images/language.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import CardPayment from '../images/card-payment.svg';
import laptopCredit from '../images/laptop-and-credit-card.svg';
import PaymentProcessed from '../images/payment-processed.svg';
import CustomDropdown from './CustomDropdown';
import search from '../images/search.svg';
import { userDetails } from './Data';
import { useParams } from 'react-router-dom';
import { cardData } from './Data';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceMarker from '../images/place-marker.svg';
// import { Avatar } from '@mui/material';
import Hamburger from './Hamburger';
import Profile from './Profile';
import Logo from './Logo';
import { useLocation } from 'react-router-dom';
import { BookingDetails } from './Data';
import { useNavigate } from 'react-router-dom';
import DatePicker from './DatePicker';
// import CustomTimeDropdown from './CustomTimeDropdown';
import hourglass from '../images/hourglass-with-glasmorphism-effect.svg';
import TimePicker from './TimePicker';

function SalonPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const Reschedule = location.state?.Reschedule;
    const BookingID = location.state?.BookingID;
    console.log(BookingID);
    var { id } = useParams();
    console.log(id);
    id = parseInt(id, 10);
    const salonData = cardData.find((Salon) => Salon.id === id);
    console.log(salonData);

    const [selectedImage, setSelectedImage] = useState(salonData.imageSrc[0]);
    const [selectedNavOption, setSelectedNavOption] = useState('info');
    const [reviewsToShow, setReviewsToShow] = useState(4);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [filteredServices, setFilteredServices] = useState(salonData.services);
    const [filteredCombos, setFilteredCombos] = useState(salonData.Combos);
    // const [expandedCombo, setExpandedCombo] = useState(null);
    const [opensearch, setOpensearch] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [wishlistMessage, setWishlistMessage] = useState('');
    const [SalonBlockMessage, setSalonBlockMessage] = useState('');
    const [userdetails, setUserDetails] = useState(userDetails);

    useEffect(() => {
        // If Reschedule is true, find the selected booking data based on BookingID
        if (Reschedule) {
            // const bookingIDToFind = parseInt(BookingID, 10);
            const booking = BookingDetails.find((booking) => booking.BookingID === BookingID);

            if (booking) {
                // Split the services and combos from the string using comma as a separator
                // const serviceNames = booking.Services?.split(',').map((serviceName) => serviceName.trim()) || [];
                const serviceNames = booking.Services?.split(',').map((serviceName) => serviceName.trim());;
                console.log("serviceNames:", serviceNames);
                const ListSalon = salonData.services.filter((service) => serviceNames.includes(service.ServiceName));
                // const Salon = cardData.find((Salon) => Salon.id === id);
                // Set the initial cart items based on the services of the selected booking
                const initialCartItems = [
                    ...ListSalon.map((service) => ({
                        ...service,
                        added: true,
                        type: 'service',
                        DiscountedPrice: service.DiscountedPrice, // Set the price for each item in cart
                    })),
                ];
                console.log("initialCartItems:", initialCartItems);
                setCartItems(initialCartItems);
            } else {
                // Handle the case where the booking with the specified BookingID is not found
                console.error(`Booking with BookingID ${BookingID} not found.`);
            }
        }
    }, [BookingID, Reschedule]);


    // const blockedDates = ['03/08/2023', '04/08/2023'];
    // useEffect(() => {
    //     const currentDate = new Date().toLocaleDateString('en-GB');
    //     const nextDate = blockedDates.find((date) => new Date(date) > new Date(currentDate));

    //     if (nextDate) {
    //         setSalonBlockMessage(`Salon is open for bookings from 4th August 2023`);
    //     } else if (blockedDates.includes(currentDate)) {
    //         setSalonBlockMessage('The salon is closed today, Available from tomorrow');
    //     }
    // }, []);



    const [isPopupOpen, setIsPopupOpen] = useState(Reschedule);
    const [checkoutStage, setCheckoutStage] = useState(Reschedule ? 'userDetails' : 'services');

    const handleToggleWishlist = () => {
        setIsFavourite((prevState) => !prevState);
        setWishlistMessage(isFavourite ? "Removed from wishlist" : "Added to wishlist");
        setTimeout(() => {
            setWishlistMessage('');
        }, 5000);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setWishlistMessage('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [wishlistMessage]);

    const handleSearchChange = (event) => {
        const { value } = event.target;

        const filteredServices = salonData.services.filter((service) =>
            service.ServiceName.toLowerCase().includes(value.toLowerCase())
        );

        const filteredCombos = salonData.Combos.filter((combo) =>
            combo.ComboName.toLowerCase().includes(value.toLowerCase()) ||
            combo.ComboServices.some((serviceName) => serviceName.toLowerCase().includes(value.toLowerCase()))
        );

        setFilteredServices(filteredServices);
        setFilteredCombos(filteredCombos);
    };

    const handleToggleCombo = (combo) => {
        if (isComboAdded(combo.ComboName)) {
            handleRemoveFromCart(combo);
        } else {
            handleAddToCart(combo);
        }
    };

    const isServiceAdded = (serviceName) => {
        return cartItems.some((cartItem) => cartItem.type === 'service' && cartItem.ServiceName === serviceName && cartItem.added);
    };

    const isComboAdded = (comboName) => {
        return cartItems.some((cartItem) => cartItem.type === 'combo' && cartItem.ComboName === comboName && cartItem.added);
    };


    const handleAddToCart = (item) => {
        if (selectedNavOption === 'info') {
            setCartItems((prevCartItems) => [...prevCartItems, { ...item, added: true, type: 'service' }]);
        } else if (selectedNavOption === 'combo') {
            setCartItems((prevCartItems) => [...prevCartItems, { ...item, added: true, type: 'combo' }]);
        }
    };

    const handleRemoveFromCart = (item) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((cartItem) =>
                selectedNavOption === 'info'
                    ? !(cartItem.type === 'service' && cartItem.ServiceName === item.ServiceName)
                    : !(cartItem.type === 'combo' && cartItem.ComboName === item.ComboName)
            )
        );
    };

    const calculateTotalAmount = () => {
        let totalAmount = cartItems.reduce((total, item) => {
            if (item.type === 'service') {
                return total + item.DiscountedPrice;
            } else if (item.type === 'combo') {
                return total + item.ComboPrice;
            }
            return total;
        }, 0);
        return totalAmount;
    };
    const countServicesInCart = () => {
        return cartItems.filter((item) => item.type === 'service').length;
    };

    // Function to count the number of combos in the cart
    const countCombosInCart = () => {
        return cartItems.filter((item) => item.type === 'combo').length;
    };

    const displayCartItems = () => {
        const numServices = countServicesInCart();
        const numCombos = countCombosInCart();
        var text = '';
        if (numServices > 0 || numCombos > 0) {
            text = 'For ';
        }
        if (numServices > 0) {
            text += `${numServices} service${numServices > 1 ? 's' : ''}`;
        }

        if (numCombos > 0) {
            if (numServices > 0) {
                text += ' and ';
            }
            text += `${numCombos} combo${numCombos > 1 ? 's' : ''}`;
        }
        return text;

    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Calculate the length of the truncated description (e.g., 200 characters)
    const truncatedDescriptionLength = 200;
    const isDescriptionTooBig = salonData.description && salonData.description.length > truncatedDescriptionLength;
    const handleToggleDescription = () => {
        setIsDescriptionExpanded((prevState) => !prevState);
    };
    const truncatedDescription = isDescriptionTooBig && !isDescriptionExpanded
        ? salonData.description.slice(0, truncatedDescriptionLength)
        : salonData.description;
    const handleShowMoreReviews = () => {
        setReviewsToShow((prevReviews) => setReviewsToShow(salonData.reviewData.length)
        );
    };
    if (!salonData) {
        return <div>Salon data not available</div>;
    }
    const handleCheckout = () => {
        setCheckoutStage('userDetails');
    };
    const handlePayNow = () => {
        setCheckoutStage('processing');
        // Simulate the payment processing for 2 seconds
        setTimeout(() => {
            setCheckoutStage('completed');
            // Simulate booking confirmation for 1 second after payment completion
            setTimeout(() => {
                setCheckoutStage('bookingConfirmed');
            }, 1000);
            setTimeout(() => {
                navigate(`/review/${salonData.id}`)
            }, 2000);
        }, 2000);
    };
    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Logo />
                <div style={{ float: "right", display: "flex", flexDirection: "row", marginTop: "40px", marginRight: "40px", gap: "10px" }}>
                    <Profile />
                    <Hamburger />
                </div>
            </div>
            <div className="salon-page">
                <div className='MobileView'>
                    <div className="salon-big-image">
                        <img src={selectedImage} alt="Big Salon" />
                    </div>
                </div>
                <div className="small-images">
                    {salonData.imageSrc.map((image, index) => (
                        <div key={index} onMouseOver={() => setSelectedImage(image)} className="small-image-wrapper">
                            <img src={image} alt={`Small Image ${index}`} className="small-image" />
                        </div>
                    ))}
                </div>
                <div className="big-image-and-details">
                    <div className='desktopView'>
                        <div className="salon-big-image">
                            <img src={selectedImage} alt="Big Salon" />
                        </div>
                    </div>
                    <div className="salon-details">
                        <div className="salon-address">
                            <div><img alt="place" src={PlaceMarker} style={{ transform: "scale(0.7)", position: "relative", top: "-16px" }} /></div>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="salon-name-wrapper">
                                    <div style={{ fontSize: "25px" }} className="salon-name"><b>{salonData.content}</b></div>
                                    <span className='MobileView'>
                                        {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "10px", cursor: "pointer", marginRight: "2vw" }} /> : <FavoriteBorderIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "10px", cursor: "pointer", marginRight: "2vw" }} />}
                                    </span>
                                </div>
                                <div className='address1'>{salonData.address}</div>
                            </div>
                        </div>
                        {/* <div className='salon-wrapper1'> */}
                        {/* <span>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "10px", cursor: "pointer", marginRight: "2vw" }} /> : <FavoriteBorderIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "10px", cursor: "pointer", marginRight: "2vw" }} />}
                            </span> */}
                        <div style={{ margin: "0 15vw", marginTop: "20px" }} className='MobileView'>
                            <button className='book-button' onClick={handleOpenPopup}>Book slot</button>
                        </div>
                        {/* </div> */}
                        <div className='info-nav'>Info Guide<hr style={{ margin: "0 85% 0 2%", border: "2px solid #FF6548" }} /></div>
                        <div>
                            <div className="info-guide">
                                <div className='info-item'><img src={Ac} />Ac available</div>
                                <div className='info-item'><img src={wifi} />Free wi-fi</div>
                                <div className='info-item'><img src={parking} />Bike and car parking</div>
                                <div className='info-item custom-tooltip'><img src={language} /><span className="tooltip-text">Languages spoken in the salon</span>Hindi, Telugu</div>
                            </div>
                            {salonData.description && <div className="salon-description">
                                <u style={{ fontWeight: "700" }}>Description</u>
                                <div className="description-text">
                                    {truncatedDescription}
                                    {isDescriptionTooBig && !isDescriptionExpanded && (
                                        <span className="show-more" onClick={handleToggleDescription}> ...More</span>
                                    )}
                                    {isDescriptionExpanded && (
                                        <span className="show-more" onClick={handleToggleDescription}> ...Less</span>
                                    )}
                                </div>
                            </div>}
                        </div>
                        {/* )} */}

                        {salonData.reviewData && <div>
                            <div className='ratings-review'>
                                <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "30px" }}>Ratings and Reviews<hr style={{ margin: "0 50% 0 2%", border: "2px solid #FF6548" }} /></div>
                                <div className="ratings desktopView">
                                    <div className="star-rating">
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <div className='SalonRatings'>{salonData.ratings}</div>
                                            <Rating
                                                size="large"
                                                value={salonData.ratings}
                                                precision={0.25}
                                                readOnly
                                                emptyIcon={<StarBorderIcon style={{ color: 'white', fontSize: '30px' }} />}
                                            />
                                        </div>
                                        <div style={{ fontSize: "12px", position: "relative", top: "-5px" }}>of {salonData.reviewData.length} reviews</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }} className="ratings MobileView">
                                    <div className="star-rating MobileView">
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Rating
                                                size="large"
                                                value={salonData.ratings}
                                                precision={0.25}
                                                readOnly
                                                emptyIcon={<StarBorderIcon style={{ color: 'white', fontSize: '30px' }} />}
                                            />
                                        </div>
                                        <div style={{ fontSize: "12px", position: "relative", top: "-5px" }}>of {salonData.reviewData.length} reviews</div>
                                    </div>
                                    <div className='SalonRatings MobileView'>{salonData.ratings}</div>
                                </div>
                            </div>
                            <div className="reviews">
                                <div className='ratings-reviews'>
                                    {salonData.reviewData.slice(0, reviewsToShow).map((review) => (
                                        <div key={review.id} className="review-card">
                                            <div className='rating-container'>
                                                <div className='imageInratings'>
                                                    <span className='imageee'>{review.user.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div className="user-rating">
                                                    <div className="star-rating">
                                                        <Rating
                                                            size="small"
                                                            value={review.rating}
                                                            precision={0.25}
                                                            readOnly
                                                            emptyIcon={<StarBorderIcon style={{ color: 'white', fontSize: '18px' }} />}
                                                        />
                                                    </div>
                                                    <div>{review.review}</div>
                                                    <div><b>{review.user}</b></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {salonData.reviewData.length > reviewsToShow && (
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            width: "100%"
                                        }}>
                                            <button className='showmore' onClick={handleShowMoreReviews}>Show All Reviews</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>}
                        <div className='salon-wrapper1 desktopView'>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: "20px" }}>
                                <span>
                                    {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", cursor: "pointer", marginRight: "2vw" }} /> : <FavoriteBorderIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", cursor: "pointer", marginRight: "2vw" }} />}
                                </span>
                                <button className='book-button' onClick={handleOpenPopup}>Book slot</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <div className="popup popup-open" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        {checkoutStage === 'services' && (
                            <div className='popupContent'>
                                <div>
                                    <div className='popup-header' style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "0 40px" }}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <label>Date:</label>
                                            {/* <CustomDropdown label="Date" Label={true} options={["Today", "Tomorrow", "16 June", "17 June"]} searchFilter={false} width={"70px"} fontSize={"12px"} /> */}
                                            <DatePicker color={"#232323"} date={'Today'} />
                                        </div>
                                        {cartItems.length > 0 && <div style={{ display: "flex", flexDirection: "row" }}>
                                            <label style={{ marginRight: "10px" }}>Time:</label>
                                            {/* <CustomDropdown label="Date" Label={true} options={["Today", "Tomorrow", "16 June", "17 June"]} searchFilter={false} width={"70px"} fontSize={"12px"} /> */}
                                            <TimePicker />
                                        </div>}
                                        {/* {cartItems.length > 0 && <CustomTimeDropdown Label={true} />} */}
                                        <div>
                                            <CustomDropdown label="Location" Label={true} value={salonData.Location} options={["Nijampet", "Madhapur", "Kukatpally", "Zubile hills"]} searchFilter={false} width={"80px"} fontSize={"12px"} />
                                        </div>
                                    </div>
                                    <div className='pcontent' style={{ position: "absolute", right: "1vw", top: "4vh" }}>
                                        <img style={{ transform: "scale(1)" }} onClick={() => setOpensearch(!opensearch)} src={search} />
                                        <input style={{ display: opensearch ? "block" : "none", position: "absolute", right: "30px", top: "5px" }}
                                            disabled={!opensearch}
                                            type="text"
                                            onChange={handleSearchChange}
                                            placeholder="Search for service"
                                        />
                                    </div>
                                </div>

                                <div className="nav-options">
                                    <button
                                        className={selectedNavOption === 'info' ? 'selected-nav' : 'nav'}
                                        onClick={() => setSelectedNavOption('info')}
                                    >
                                        Services
                                    </button>
                                    <button
                                        className={selectedNavOption === 'combo' ? 'selected-nav' : 'nav'}
                                        onClick={() => setSelectedNavOption('combo')}
                                    >
                                        Combo
                                    </button>
                                </div>
                                {selectedNavOption === 'info' && (
                                    <div className='info-services' style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                                        {filteredServices.map((service) => (
                                            <div key={service.ServiceName}
                                                onClick={() => (isServiceAdded(service.ServiceName) ? handleRemoveFromCart(service) : handleAddToCart(service))}
                                                style={{
                                                    background: isServiceAdded(service.ServiceName)
                                                        ? "#FF6548"
                                                        : "rgba(109, 109, 109, 0.50)",
                                                    cursor: "pointer",
                                                    borderRadius: "25px",
                                                    padding: "5px 10px",
                                                    display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                                }}>
                                                <div style={{ marginLeft: "20px", fontSize: "20px" }}>{service.ServiceName}</div>
                                                <div><b style={{ marginRight: "30px", fontSize: "25px" }}>:₹{service.DiscountedPrice}</b></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {selectedNavOption === "combo" && (
                                    <div className='info-services' style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
                                        {filteredCombos.map((combo) => (
                                            <div key={combo.ComboName} style={{
                                                background: isComboAdded(combo.ComboName)
                                                    ? "#FF6548"
                                                    : "rgba(109, 109, 109, 0.50)",
                                                cursor: "pointer",
                                                borderRadius: "25px",
                                                padding: "5px 10px"
                                            }}>
                                                <div
                                                    onClick={() => handleToggleCombo(combo)}
                                                    style={{
                                                        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                                                    }}
                                                >
                                                    <div style={{ marginLeft: "20px", fontSize: "20px" }}>
                                                        {combo.ComboName}
                                                    </div>
                                                    <div>
                                                        <b style={{ marginRight: "30px", fontSize: "25px" }}>
                                                            :₹{combo.ComboPrice}
                                                        </b>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div colSpan="2" style={{ fontSize: "14px", marginLeft: "20px" }}>
                                                        <u>{combo.ComboServices.join(', ')}</u>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <hr style={{ width: "60%" }} />
                                <div className='info-services' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px" }}>
                                    <b style={{ marginLeft: "5vw" }}>Total amount:</b>
                                    <b>{calculateTotalAmount()}</b>
                                    <span id="displayCart" style={{ fontSize: "15px" }}>{displayCartItems()}</span>
                                </div>
                                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                                </div>
                                <span className="close-button" onClick={handleClosePopup}>
                                    <WestIcon fontSize="medium" /><span style={{ marginLeft: "4px" }}>Back</span>
                                </span>
                            </div>
                        )}
                        {checkoutStage === 'userDetails' && (
                            <div className='popupContent'>
                                <div className="user-details">
                                    <h3><u>User Details</u></h3>
                                    <table id="slotDetails" style={{ width: "90%", marginLeft: "40px" }}>
                                        <tbody className='detailsuser'>
                                            <tr>
                                                <td>Name:</td>
                                                <td><input value={userdetails.name} onChange={(e) => setUserDetails((prevDetails) => ({ ...prevDetails, name: e.target.value }))} /></td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td><input value={userdetails.email} /></td>
                                            </tr>
                                            <tr>
                                                <td>Mobile:</td>
                                                <td><input value={userdetails.phone} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr style={{ margin: "0 15%", marginBottom: "20px", color: "#FFF" }} />
                                    <h3><u>Selected Services</u></h3>
                                    <table id="servicesSelected" style={{ marginLeft: "40px" }}>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item.ServiceName || item.ComboName}>
                                                    <td>{item.ServiceName || item.ComboName}</td>
                                                    <td>{item.DiscountedPrice || item.ComboPrice}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td style={{ textAlign: "right", paddingRight: "15px" }}><b>Total&nbsp;amount:</b></td>
                                                <td>{calculateTotalAmount()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h3><u>Slot Details:</u></h3>
                                    <table id="slotDetails" style={{ width: Reschedule ? '100%' : '60%', marginLeft: "40px" }}>
                                        <tbody>
                                            <tr>
                                                <td>Date:</td>
                                                <td>{Reschedule ? <DatePicker color={"#232323"} /> : "12 June"}</td>
                                            </tr>

                                            <tr>
                                                <td>Time:</td>
                                                <td>{Reschedule ? <TimePicker /> : "01:00 PM"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                    <button className="checkout-button" onClick={handlePayNow}>
                                        Pay Now
                                    </button>
                                    <div style={{ fontSize: "12px" }}>Please be at the salon 5 minutes before your selected time.</div>
                                    {Reschedule && <div style={{ fontSize: "10px", marginTop: "5px" }}>10% of Rescheduling charges are applicable</div>}
                                </div>
                                <span className="close-button" onClick={() => Reschedule ? navigate(-1) : setCheckoutStage('services')}>
                                    <WestIcon fontSize="medium" /><span style={{ marginLeft: "4px" }}>{Reschedule ? 'Close' : 'Back'}</span>
                                </span>
                            </div>
                        )}
                        {checkoutStage === 'processing' && (
                            <div className='popupContent' style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "40px" }}><span className='payment'>Payment is Processing...</span></div>
                                <div><img src={CardPayment} style={{ width: "90%" }} /></div>
                            </div>
                        )}

                        {checkoutStage === 'completed' && (
                            <div className='popupContent' style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "40px" }}><span className='payment'>Payment is Completed.</span></div>
                                <div><img src={laptopCredit} style={{ width: "100%" }} /></div>
                            </div>
                        )}
                        {!Reschedule && checkoutStage === 'bookingConfirmed' && (
                            <div className='popupContent' style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "40px" }}><span className='payment'>Booking Confirmed.</span></div>
                                <div><img src={PaymentProcessed} /></div>
                            </div>
                        )}
                        {Reschedule && checkoutStage === 'bookingConfirmed' && (
                            <div className='popupContent' style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "40px" }}><span className='payment'>Reschedule has been done</span></div>
                                <div><img src={hourglass} /></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {wishlistMessage && (
                <div className="popup-wishlist">
                    <div className="popup-content-wishlist">
                        <span className='wishlistmessage'>{wishlistMessage}</span>
                    </div>
                </div>
            )}
            {SalonBlockMessage && (
                <div className="popup-wishlist">
                    <div className="popup-content-wishlist">
                        <span className='wishlistmessage'>{SalonBlockMessage}</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default SalonPage;
