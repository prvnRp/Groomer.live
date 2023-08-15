// TopImageWithText.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import image from '../images/rectangle-3.svg'
import Header from './Header';
import TopNav from './TopNav';
import Logo from './Logo';
import mobileImage from '../images/rectangle-46.svg'

function TopImageWithText() {
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        // Initial check and event listener setup
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="top-image-container">
            {/* <div>
                <Header />
            </div> */}
            <img src={isMobileView ? mobileImage : image} alt="Top Image" />
            <div className="centered-text">Salons</div>
            <div className='top-logo'>
                <Logo />
            </div>
            <div className='top-nav'>
                <TopNav />
            </div>
        </div>
    );
}

export default TopImageWithText;
