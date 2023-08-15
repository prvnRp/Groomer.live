import '../App.css';
import Header from './Header';
import React, { useState, useRef, useEffect } from 'react';
import rectangle1 from '../images/rectangle-5.svg'
import rectangle2 from '../images/rectangle-6.svg'
import rectangle3 from '../images/rectangle-7.svg'
import rectangle4 from '../images/rectangle-18.svg'
import rectangle5 from '../images/rectangle-19.svg'
import rectangle6 from '../images/rectangle-21.svg'
import rectangle7 from '../images/rectangle-22.svg'
import rectangle8 from '../images/rectangle-37.svg'
import vector from '../images/vector-1.svg'
import home from '../images/home.svg'
import clockSearch from '../images/clock-search.svg'
import socialMedia from '../images/social-media.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from './Footer';


const HomePage = () => {
    const contentRef = useRef(null);
    const [showScroll, setShowScroll] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);
    const prevScrollY = useRef(0);
    const [wishlistMessage, setWishlistMessage] = useState('');

    // const handleScrollClick = () => {
    //     if (contentRef.current) {
    //         contentRef.current.classList.toggle('content-slide-up');
    //         document.getElementById('scroll-symbol').style.display = 'none';
    //     }
    // };
    const banners = [
        {
            content: <div className='f55'>
                <div>
                    <b>Great salon</b> <span className='f30'>services</span>
                </div>
                <div className='f30'>that won't</div>
                <div>
                    <b>empty your pockets</b>
                </div>
            </div>,
            image: rectangle7,
            color: '#FF6548'
        },
        {
            content: <div className='f55'>
                <div>
                    <b>Time</b> <span className='f30'>is journey</span>
                </div>
                <div className='f30'>Let's not</div>
                <div>
                    <b>waste either!</b>
                </div>
            </div>,
            image: clockSearch,
            color: '#B4A9F7'
        },
        {
            content: <div className='f55'>
                <div>
                    The future of
                </div>
                <div className='f30'>hair is</div>
                <div>
                    <b>DIGITAL!</b>
                </div>
            </div>,
            image: socialMedia,
            color: '#DF7AF2'
        },
    ];

    const images = [
        rectangle7,
        clockSearch,
        socialMedia
    ]

    const colors = [
        '#FF6548',
        '#B4A9F7',
        '#DF7AF2'
    ]

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowScroll(currentScrollY > prevScrollY.current ? false : showScroll);
        if (currentScrollY == 0) {
            setShowScroll(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
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
    return (
        <div>
            <Header />
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    {/* <div class="carousel-item active" data-bs-interval="3000">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div class="banner" style={{ background: colors[0] }}>
                                <img src={images[0]} style={{ height: "100%" }} />
                                <div className='content-banner'>{banners[0]}</div>
                                <div><button className='book-now'>Book Now</button></div>
                            </div>
                        </div>
                    </div> */}
                    {banners.map((banner, index) => (
                        <div class={index === 0 ? "carousel-item active" : "carousel-item"} data-bs-interval="3000">
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div class="banner" style={{ background: banner.color }}>
                                    <img src={banner.image} style={{ height: "100%" }} />
                                    <div className='content-banner'>{banner.content}</div>
                                    <div><button className='book-now'>Book Now</button></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div class="carousel-item" data-bs-interval="3000">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div class="banner" style={{ background: colors[1] }}>
                                <img src={images[1]} style={{ height: "100%" }} />
                                <div className='content-banner'>{banners[1]}</div>
                                <div><button className='book-now'>Book Now</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div class="banner" style={{ background: colors[2] }}>
                                <img src={images[2]} style={{ height: "100%" }} />
                                <div className='content-banner'>{banners[2]}</div>
                                <div><button className='book-now'>Book Now</button></div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            {showScroll && (
                <div className='scroll-symbol'>
                    <img src={vector} />
                </div>
            )}
            <div className='header-info'>
                <div>
                    <div className='f35'>We are</div>
                    <div className='f70'>groomer</div>
                </div>
                <div className='f35'>
                    Online salon apps make it easy to book salon appointments from home. Browse salons, read reviews, and book appointments in just a few taps. Many apps also offer discounts and promotions.
                </div>
            </div>
            <div className="content12" ref={contentRef}>
                <div className='one-card'>
                    <img src={rectangle1} />
                    <div className='image-content' style={{ fontSize: "60px" }}>
                        <div style={{ fontSize: "30px" }}>We provide</div>
                        <div><b>Best</b> salons</div>
                        <div><b>service</b> in city</div>
                    </div>
                    <div className='down-content'>
                        Best salon in city &rarr;
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
                        Best service in city &rarr;
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
                        Best service with love &rarr;
                    </div>
                </div>
            </div>
            <div className='best-salons'>
                <div style={{ paddingBottom: "0px", fontSize: "20px" }} className='text-salon'>The</div>
                <div style={{ paddingTop: "0px" }} className='text-salon'>Best groomer in <b>city</b></div>
                <div className='best-salon'>
                    <div className='best-salon-card'>
                        <div style={{ flex: 1, marginRight: "20px", position: "relative" }}>
                            <img src={rectangle4} style={{ width: "100%" }} />
                            <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className='f40'>#1</div>
                            <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                            <div className='f20'>the saloon with two best in class groomers in the same salon gives you b est style and look with master level talent.</div>
                        </div>
                    </div>
                    {/* <div className='best-salon-card'>
                        <div style={{ flex: 1, marginRight: "20px", position: "relative" }}>
                            <img src={rectangle4} style={{ width: "100%" }} />
                            <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", padding: "0px 3px", borderRadius: "100%" }}>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "2px" }} /> : <FavoriteBorderIcon onClick={handleToggleWishlist} style={{ fontSize: "35px", position: "relative", top: "2px" }} />}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className='f40'>#1</div>
                            <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                            <div className='f20'>the saloon with two best in class groomers in the same salon gives you b est style and look with master level talent.</div>
                        </div>
                    </div> */}
                    <div className='best-salon-card'>
                        <div style={{ flex: 1, marginRight: "20px", position: "relative" }}>
                            <img src={rectangle4} style={{ width: "100%" }} />
                            <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className='f40'>#1</div>
                            <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                            <div className='f20'>the saloon with two best in class groomers in the same salon gives you b est style and look with master level talent.</div>
                        </div>
                    </div>
                    <div className='best-salon-card'>
                        <div style={{ flex: 1, marginRight: "20px", position: "relative" }}>
                            <img src={rectangle4} style={{ width: "100%" }} />
                            <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className='f40'>#1</div>
                            <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                            <div className='f20'>the saloon with two best in class groomers in the same salon gives you b est style and look with master level talent.</div>
                        </div>
                    </div>
                    <div className='best-salon-card'>
                        <div style={{ flex: 1, marginRight: "20px", position: "relative" }}>
                            <img src={rectangle4} style={{ width: "100%" }} />
                            <div style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", color: "#000", background: "#FFF", borderRadius: "50%" }}>
                                {isFavourite ? <FavoriteIcon onClick={handleToggleWishlist} className='heart-wishlist' /> : <FavoriteBorderIcon onClick={handleToggleWishlist} className='heart-wishlist' />}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className='f40'>#1</div>
                            <div className='f40 salon-groomer' style={{ marginBottom: "20px" }}>Groomer salon</div>
                            <div className='f20'>the saloon with two best in class groomers in the same salon gives you b est style and look with master level talent.</div>
                        </div>
                    </div>
                </div>
                <div className='explore-button' style={{ textAlign: "center" }}><button>Explore more</button></div>
            </div>
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
    );
};

export default HomePage;
