import '../App.css';
import manCircle from '../images/mans-face-in-a-circle.svg'
import MenuBar from './MenuBar';
import { useState, useEffect, useRef } from 'react';

function Avatar() {
    const dropdownRef = useRef(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const handleCircleClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div>
            <img style={{ transform: "scale(0.5)", position: "relative", top: "-16px" }} src={manCircle} alt="user" ref={dropdownRef} onClick={handleCircleClick} />
            {isDropdownVisible && (
                <MenuBar />
            )}
        </div>
    );
}

export default Avatar;
