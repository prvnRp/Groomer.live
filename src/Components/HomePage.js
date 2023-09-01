import '../App.css';
import Header from './Header';
import React, { useState, useRef, useEffect } from 'react';
import rectangle1 from '../images/rectangle-5.svg'
import rectangle2 from '../images/rectangle-6.svg'
import rectangle3 from '../images/rectangle-7.svg'
// import rectangle4 from '../images/rectangle-18.svg'
// import rectangle5 from '../images/rectangle-19.svg'
import rectangle6 from '../images/rectangle-21.svg'
import rectangle7 from '../images/rectangle-22.svg'
import rectangle8 from '../images/rectangle-37.svg'
// import imageee from '../images/Salons/OIP.jpg'
import imageee1 from '../images/Salons/image1.jpg'
import vector from '../images/vector-1.svg'
import home from '../images/home.svg'
import clockSearch from '../images/clock-search.svg'
import socialMedia from '../images/social-media.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from './Footer';
import Brain from '../images/line-brain-idea.svg'
import FlickityCarousel from './FlickityCarousel';
import FlickityFull from './FlickityFull';
import { useBlur } from '../context/blurContext';
import EastIcon from '@mui/icons-material/East';

// Description content
const Description = (<div>
    Groomer is a human centric beauty company. <br /><br />
    <b>Origin : </b>
    We are in search of how we can reinvent human beauty to bring out his or her unique style. So
    we met, hair defines human beauty just as leaves define the beauty of a tree. The result we get
    is that human beauty lies in the hair.
    That's why we started working on the hair.. After our in-depth research, we concluded that
    people spend most of their time in salons to redesign their style.  <br /><br />
    <b>Problem: </b>
    We face our challenges, Of course. The biggest one being that 70% of people still book their
    hair and Beauty offline. Like Phoning the salon or walking straight in. That means, not only do
    we need a great product and the right kind of marketing. We need to actually change the
    mindset of the majority. <br /><br />
    <b>Vision : </b>
    So, we have taken it as a mission to solve the problems of the salon market in India. And we
    recognize this as the first phase of our business.
    We spend our days working toward our mission to transform the unorganized hair and beauty
    community (Whole Indian salon market) into a completely digitized one.
    We young people aspire to change the salon industry from 0 to 1 and began the journey Of
    Groomer to make the world a better place to Live.
    We began to believe deeply that the future of hair is digital and we took this as our vision
</div>);

const HomePage = () => {
    const contentRef = useRef(null); // Ref for content section
    const [showScroll, setShowScroll] = useState(true); // State for showing/hiding scroll symbol
    const [isFavourite, setIsFavourite] = useState(false); // State for favorite/wishlist icon
    const prevScrollY = useRef(0); // Ref for previous scroll position
    const [wishlistMessage, setWishlistMessage] = useState(''); // State for wishlist message
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for expanding/collapsing description
    const scrollPositionRef = useRef(0); // Store scroll position

    // Toggle description expansion
    const handleToggleDescription = () => {
        if (!isDescriptionExpanded) {
            scrollPositionRef.current = window.scrollY;
        }

        setIsDescriptionExpanded(prevState => !prevState);

        if (isDescriptionExpanded) {
            window.scrollTo({ top: scrollPositionRef.current, behavior: 'smooth' });
        }
    };

    // Length to truncate description
    const truncatedDescriptionLength = 5;

    // Full description with show/hide button
    const fullDescription = (
        <div>
            {Description.props.children} {/* Assuming your content is direct children of Description */}
            <span className="show-more" onClick={handleToggleDescription}>
                {isDescriptionExpanded ? ' ...Less' : ' ...More'}
            </span>
        </div>
    );

    // Truncated description with show/hide button
    const truncatedDescription = (
        <div>
            {Description.props.children.slice(0, truncatedDescriptionLength)}
            {isDescriptionExpanded ? (
                <span className="show-more" onClick={handleToggleDescription}> ...Less</span>
            ) : (
                <span className="show-more" onClick={handleToggleDescription}> ...More</span>
            )}
        </div>
    );

    // Handle scroll event to show/hide scroll symbol
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowScroll(currentScrollY > prevScrollY.current ? false : showScroll);
        if (currentScrollY === 0) {
            setShowScroll(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle wishlist icon and display message
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

    const isSmallScreen = window.innerWidth < 700;
    const { isBlur } = useBlur();

    return (
        <>
            <Header />
            <div style={{ filter: isBlur ? 'blur(10px)' : 'none' }}>
                {/* Render FlickityCarousel and FlickityFull components */}
                <FlickityCarousel /> {/* For mobile view */}
                <FlickityFull /> {/* For desktop view */}

                {showScroll && (
                    <div className='scroll-symbol'>
                        <img src={vector} />
                    </div>
                )}

                {/* Description */}
                <div className='header-info'>
                    <div>
                        <div className='f35'>This is</div>
                        <div className='f70'>Groomer</div>
                    </div>
                    <div className='f35'>
                        {isDescriptionExpanded ? fullDescription : truncatedDescription}
                    </div>
                </div>

                {/* Cards */}
                <div className="content12" ref={contentRef}>
                    <div className='one-card'>
                        <img src={rectangle1} />
                        <div className='image-content' style={{ fontSize: "60px" }}>
                            <div style={{ fontSize: "30px" }}>We provide</div>
                            <div><b>Best</b> salons</div>
                            <div><b>service</b> in city</div>
                        </div>
                        <div className='down-content'>
                            Best salon in city <span id="arrowww"><EastIcon /></span>
                        </div>
                    </div>
                    <div className='one-card'>
                        <div className='image-content' style={{ fontSize: "60px" }}>
                            <div style={{ fontSize: "30px" }}>We give</div>
                            <div><b>Best</b> service</div>
                            <div>in the city</div>
                        </div>
                        <img src={rectangle2} />
                        <div className='down-content'>
                            Best service in city <span id="arrowww"><EastIcon /></span>
                        </div>
                    </div>
                    <div className='one-card'>
                        <img src={rectangle3} />
                        <div className='image-content' style={{ fontSize: "60px" }}>
                            <div style={{ fontSize: "30px" }}>We need</div>
                            <div>A <b>happy Smile</b> </div>
                            <div>and</div>
                            <div>appreciations</div>
                        </div>
                        <div className='down-content'>
                            Best service with love <span id="arrowww"><EastIcon /></span>
                        </div>
                    </div>
                </div>


                {/* Best Salons */}
                <div className='best-salons'>
                    <div style={{ paddingBottom: "0px", fontSize: "20px" }} className='text-salon'>The</div>
                    <div style={{ paddingTop: "0px" }} className='text-salon'>Best groomer in <b>city</b></div>
                    <div className='best-salon'>
                        <div className='best-salon-card'>
                            <div style={{ flex: 1, marginRight: "20px", position: "relative", height: "100%" }}>
                                <img
                                    src={imageee1}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "35px"
                                    }}
                                    alt="Salon"
                                />
                                <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                    {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className='f40'>#1</div>
                                <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                                <div className='f20'>the salon with two best in class groomers in the same salon gives you the best style and look with master level talent.</div>
                            </div>
                        </div>
                        <div className='best-salon-card'>
                            <div style={{ flex: 1, marginRight: "20px", position: "relative", height: "100%" }}>
                                <img
                                    src={imageee1}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "35px"
                                    }}
                                    alt="Salon"
                                />
                                <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                    {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className='f40'>#1</div>
                                <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                                <div className='f20'>the salon with two best in class groomers in the same salon gives you the best style and look with master level talent.</div>
                            </div>
                        </div>
                        <div className='best-salon-card'>
                            <div style={{ flex: 1, marginRight: "20px", position: "relative", height: "100%" }}>
                                <img
                                    src={imageee1}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "35px"
                                    }}
                                    alt="Salon"
                                />
                                <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                    {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className='f40'>#1</div>
                                <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                                <div className='f20'>the salon with two best in class groomers in the same salon gives you the best style and look with master level talent.</div>
                            </div>
                        </div>
                        <div className='best-salon-card'>
                            <div style={{ flex: 1, marginRight: "20px", position: "relative", height: "100%" }}>
                                <img
                                    src={imageee1}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "35px"
                                    }}
                                    alt="Salon"
                                />
                                <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                    {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className='f40'>#1</div>
                                <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                                <div className='f20'>the salon with two best in class groomers in the same salon gives you the best style and look with master level talent.</div>
                            </div>
                        </div>
                    </div>
                    <div className='explore-button' style={{ textAlign: "center" }}><button>Explore more</button></div>
                </div>

                {/* Home services */}
                <div className='home-services'>
                    <div className='home-service-img' style={{ flex: '1' }}>
                        <img src={isSmallScreen ? rectangle8 : rectangle6} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {!isSmallScreen && <div className='homeee' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '10px' }}>
                            <img src={home} />
                            <div>
                                <div className='f40'>
                                    Home salon services <b>start very soon</b>.....
                                </div>
                                <div className='f18' style={{ fontWeight: '700' }}>
                                    Follow us on Instagram and Twitter to get notified.
                                </div>
                            </div>
                        </div>}
                        {isSmallScreen && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '10px' }}>
                            <div>
                                <div style={{ fontSize: "25px", fontWeight: "bold" }}>Salon at your home</div>
                            </div>
                        </div>}
                        <div className='f30'>
                            The salon with two best in class groomers in the same salon gives you the best style and look with master level talent at your house. Prices are identical to the salon. No worries about timing and traffic. We will take all your pressure to give you the best service at your doorstep.
                        </div>
                        <div className='button-salon-book'><button>Book now</button></div>
                    </div>
                </div>
                <div>

                </div>
                <Footer />
                {wishlistMessage && (
                    <div className="popup-wishlist">
                        <div className="popup-content-wishlist">
                            <span className='wishlistmessage'>{wishlistMessage}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;
