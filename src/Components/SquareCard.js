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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimeout(() => {
    //             setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    //             setNextServiceIndex((prevIndex) => (prevIndex + 2) % services.length);
    //         }, 500);
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, [services.length]);

    const goToPrevService = () => {
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
            setNextServiceIndex((prevIndex) => (prevIndex) % services.length);
        }, 500);
    };

    const goToNextService = () => {
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
            setNextServiceIndex((prevIndex) => (prevIndex + 2) % services.length);
        }, 500);
    };

    const currentService = services[currentServiceIndex];
    return (
        <div className="square-card" style={{ position: "relative" }}>
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    {services.map((service, index) => (
                        <div class={index === 0 ? "carousel-item active" : "carousel-item"} data-bs-interval="3000">
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="image-container">
                                    {imageSrc[index] && <img src={imageSrc[index]} alt="Card Image" className="card-image" />}
                                </div>
                            </div>
                        </div>
                    ))}
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
                    {/* {currentService.DiscountedPrice && ( */}
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: '700' }}>₹{currentService.DiscountedPrice}&nbsp;</span>
                        <s style={{ fontSize: "15px" }}>₹{currentService.OriginalPrice}</s>&nbsp;
                        <span style={{ fontSize: '7px' }}>
                            {(((currentService.OriginalPrice - currentService.DiscountedPrice) / currentService.OriginalPrice) * 100).toFixed(0)}% off</span>
                    </div>
                    {/* )} */}
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
            <div class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev">
                <span onClick={goToPrevService} className='arrow left'></span>
            </div>
            <div class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next">
                <span onClick={goToNextService} className='arrow right'></span>
            </div>
            {/* <i className='arrow left' style={{ position: "absolute", top: "50%", left: "3px", padding: "3px" }} onClick={goToPrevService}></i> */}
            {/* <i className='arrow right' style={{ position: "absolute", top: "50%", right: "3px", padding: "3px" }} onClick={goToNextService}></i> */}
        </div >
    );
}

export default SquareCard;
