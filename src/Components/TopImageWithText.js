// TopImageWithText.js
import React from 'react';
import '../App.css';
import image from '../images/rectangle-3.svg'
import Header from './Header';
import TopNav from './TopNav';
import Logo from './Logo';

function TopImageWithText() {
    return (
        <div className="top-image-container">
            {/* <div>
                <Header />
            </div> */}
            <img src={image} alt="Top Image" />
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
