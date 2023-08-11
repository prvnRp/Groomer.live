import React, { useState, useEffect } from 'react';
import Ratings from './Ratings';

const Card = ({ title, distance, ratings, services }) => {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    // const [slidingDirection, setSlidingDirection] = useState('slide-in');

    useEffect(() => {
        const interval = setInterval(() => {
            // setSlidingDirection('slide-out');
            setTimeout(() => {
                setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
                // setSlidingDirection('slide-in');
            }, 500); // Wait for 500ms before changing the index
        }, 3000);

        return () => clearInterval(interval);
    }, [services.length]);

    const goToPrevService = () => {
        // setSlidingDirection('slide-out');
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
            // setSlidingDirection('slide-in');
        }, 500); // Wait for 500ms before changing the index
    };

    const goToNextService = () => {
        // setSlidingDirection('slide-out');
        setTimeout(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
            // setSlidingDirection('slide-in');
        }, 500); // Wait for 500ms before changing the index
    };

    // const currentService = services[currentServiceIndex];

    return (
        <div style={styles.card1}>
            <div>
                <div
                    style={{
                        display: "flex",
                        width: "200%",
                        transform: `translateX(-${currentServiceIndex * 50}%)`,
                    }}
                >
                    {services.map((service, index) => (
                        <div key={index} style={{ flex: "0 0 50%" }}>
                            {index === currentServiceIndex && (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ height: "125px" }}>
                                        <img
                                            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                            src={service.imageUrl}
                                            alt="Salon"
                                        />
                                    </div>
                                    <span>{title}</span>
                                    <span>{distance} from you</span>
                                    {/* <div> */}
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: "12px" }}>{service.price} 150 25% off</div>
                                        <div className="rating">
                                            <Ratings rating={ratings} />
                                        </div>
                                    </div>
                                    <div>{service.name}</div>
                                    {/* </div> */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {services.length > 1 && (
                <>
                    <button onClick={goToPrevService} style={{ position: "absolute", left: "0", top: "50%", background: "transparent", border: "0", cursor: "pointer" }}>
                        &#10094;
                    </button>
                    <button onClick={goToNextService} style={{ position: "absolute", right: "0", top: "50%", background: "transparent", border: "0", cursor: "pointer" }}>
                        &#10095;
                    </button>
                </>
            )}
        </div>
    );
};

const styles = {
    card1: {
        borderRadius: 20,
        padding: 15,
        margin: 10,
        width: "250px",
        height: "250px",
        background: "rgba(74, 74, 74, 0.50)",
        position: "relative",
    },
};

export default Card;
