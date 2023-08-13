import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import placeMarker from '../images/place-marker.svg';
import { useNavigate } from 'react-router-dom';

function SquareCard({ id, content, imageSrc, distance, ratings, NoR, services, salonData }) {
    const navigate = useNavigate();

    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    // const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [nextServiceIndex, setNextServiceIndex] = useState(1);
    const [slidingDirection, setSlidingDirection] = useState('');

    useEffect(() => {
        setSlidingDirection('slide-in');
        const interval = setInterval(() => {
            setSlidingDirection('slide-out');
            setTimeout(() => {
                setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
                setNextServiceIndex((prevIndex) => (prevIndex + 2) % services.length);
                setSlidingDirection('slide-in');
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [services.length]);

    const goToPrevService = () => {
        setSlidingDirection('slide-out');
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
            setNextServiceIndex((prevIndex) => (prevIndex) % services.length);
            setSlidingDirection('slide-in');
        }, 500); // Wait for 500ms before changing the index
    };

    const goToNextService = () => {
        setSlidingDirection('slide-out');
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
            setNextServiceIndex((prevIndex) => (prevIndex + 2) % services.length);
            setSlidingDirection('slide-in');
        }, 500); // Wait for 500ms before changing the index
    };

    // const slideServices = (increment) => {
    //     setCurrentServiceIndex((prevIndex) => (prevIndex + increment + services.length) % services.length);
    // };

    // useEffect(() => {
    //     const interval = setInterval(() => slideServices(1), 3000); // Adjust the sliding interval as desired (milliseconds)
    //     return () => clearInterval(interval);
    // }, [services, currentServiceIndex]);

    const currentService = services[currentServiceIndex];
    // const currentImageSrc = imageSrc[currentServiceIndex];
    // const currentService = services[currentServiceIndex];
    const nextService = services[nextServiceIndex];
    return (
        <div className="square-card sliding-content-container" style={{ position: "relative" }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", width: "200%", transform: `translateX(-${slidingDirection === 'slide-in' ? 0 * 50 : 1 * 50}%)`, transition: "transform 0.5s ease" }}>
                    {currentService && (
                        <div className="image-container">
                            {imageSrc[currentServiceIndex] && <img src={imageSrc[currentServiceIndex]} alt="Card Image" className="card-image" />}
                        </div>
                    )}
                    {nextService && (
                        <div className="image-container">
                            {imageSrc[nextServiceIndex] && <img src={imageSrc[nextServiceIndex]} alt="Card Image" className="card-image" />}
                        </div>
                    )}
                </div>
            </div>
            <div className="card-details" style={{ height: '42%' }}>
                <div onClick={() => {
                    navigate(`/salon/${id}`);
                }} style={{ width: "100%", overflow: "hidden", cursor: "pointer" }}>
                    <p style={{ fontSize: '20px', fontWeight: '400', whiteSpace: "nowrap" }}>{content}</p>
                </div>
                {distance && (
                    <span style={{ fontSize: '15px', position: "relative", top: "-4px" }}>
                        <img style={{ transform: "scale(0.7)", position: "absolute", left: "-15px" }} src={placeMarker} />
                        <span style={{ position: "relative", left: "10px" }}>{distance}</span>&nbsp;<span style={{ fontSize: "12px", position: "relative", left: "10px" }}>from you</span>
                    </span>
                )}
                <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '8px' }}>
                    {/* <div style={{ position: "relative", overflow: "hidden" }}>
                    <div style={{ display: "flex", width: "200%", transform: `translateX(-${slidingDirection === 'slide-in' ? currentServiceIndex * 50 : nextServiceIndex * 50}%)`, transition: "transform 0.5s ease" }}>
                        {currentService && (
                            <div>
                                <span style={{ fontSize: '20px', fontWeight: '700' }}>₹{currentService.DiscountedPrice}&nbsp;</span>
                                <s style={{ fontSize: "15px" }}>₹{currentService.OriginalPrice}</s>&nbsp;
                                <span style={{ fontSize: '7px' }}>
                                    {(((currentService.OriginalPrice - currentService.DiscountedPrice) / currentService.OriginalPrice) * 100).toFixed(0)}% off</span>
                            </div>
                        )}
                        {nextService && (
                            <div>
                                <span style={{ fontSize: '20px', fontWeight: '700' }}>₹{nextService.DiscountedPrice}&nbsp;</span>
                                <s style={{ fontSize: "15px" }}>₹{nextService.OriginalPrice}</s>&nbsp;
                                <span style={{ fontSize: '7px' }}>
                                    {(((nextService.OriginalPrice - nextService.DiscountedPrice) / nextService.OriginalPrice) * 100).toFixed(0)}% off</span>
                            </div>
                        )}
                    </div>
                    </div> */}
                    {currentService.DiscountedPrice && (
                        <div>
                            <span style={{ fontSize: '20px', fontWeight: '700' }}>₹{currentService.DiscountedPrice}&nbsp;</span>
                            <s style={{ fontSize: "15px" }}>₹{currentService.OriginalPrice}</s>&nbsp;
                            <span style={{ fontSize: '7px' }}>
                                {(((currentService.OriginalPrice - currentService.DiscountedPrice) / currentService.OriginalPrice) * 100).toFixed(0)}% off</span>
                        </div>
                    )}
                    <span style={{ fontSize: '15px' }}>
                        <b>{ratings}</b>
                        <span style={{ position: 'relative', top: '2.5px', margin: '2px' }}>
                            <Rating
                                style={{ fontSize: '15px' }}
                                size="small"
                                value={ratings}
                                precision={0.25}
                                readOnly
                                sx={{ '& .MuiRating-iconFilled': { color: '#fff' } }}
                                emptyIcon={<StarBorderIcon style={{ color: 'white', fontSize: '15px' }} />}
                            />
                        </span>
                        <sub style={{ fontSize: "10px" }}>({NoR})</sub>
                    </span>
                </span>
                <span style={{ fontSize: "12px" }}>{currentService.ServiceName}</span>
            </div>
            <i className='arrow left' style={{ position: "absolute", top: "50%", left: "3px", padding: "3px" }} onClick={goToPrevService}></i>
            <i className='arrow right' style={{ position: "absolute", top: "50%", right: "3px", padding: "3px" }} onClick={goToNextService}></i>
        </div >
    );
}

export default SquareCard;
