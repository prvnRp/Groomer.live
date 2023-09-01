import '../App.css';
import manCircle from '../images/mans-face-in-a-circle.svg'
import MenuBar from './MenuBar';
import { useState, useEffect, useRef } from 'react';
import { useBlur } from '../context/blurContext';

function Avatar() {
    const { isBlur } = useBlur(); // Access the isBlur state from the blurContext
    const dropdownRef = useRef(null); // Create a ref for the dropdown menu

    // State to track the visibility of the dropdown menu
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Handler for clicking the user avatar circle
    const handleCircleClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // Effect to close the dropdown menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        // Add a click event listener to the entire document
        document.addEventListener('click', handleClickOutside);

        // Remove the event listener when the component unmounts to prevent memory leaks
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ filter: isBlur ? 'blur(10px)' : 'none' }}>
            {/* Render the user avatar circle */}
            <img style={{ transform: "scale(0.5)", position: "relative", top: "-16px" }} src={manCircle} alt="user" ref={dropdownRef} onClick={handleCircleClick} />

            {/* Render the dropdown menu when isDropdownVisible is true */}
            {isDropdownVisible && (
                <div>
                    <MenuBar />
                </div>
            )}
        </div>
    );
}

export default Avatar;