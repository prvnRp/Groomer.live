import '../App.css';
import manCircle from '../images/mans-face-in-a-circle.svg'
import MenuBar from './MenuBar';
import { useState, useEffect, useRef } from 'react';
import { useBlur } from '../context/blurContext';

function Avatar() {
    const { isBlur } = useBlur();
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
        <div style={{ filter: isBlur ? 'blur(10px)' : 'none' }}>
            <img style={{ transform: "scale(0.5)", position: "relative", top: "-16px" }} src={manCircle} alt="user" ref={dropdownRef} onClick={handleCircleClick} />
            {isDropdownVisible && (
                <div>
                    <MenuBar />
                </div>
            )}
        </div>
    );
}

export default Avatar;