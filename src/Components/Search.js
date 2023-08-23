import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect, useRef } from 'react';
import { useBlur } from '../context/blurContext';

function Search() {
    const [opensearch, setOpensearch] = useState(false);
    const dropdownRef = useRef(null);
    const { isBlur, toggleBlur, setIsBlur } = useBlur();
    // console.log(isBlur);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpensearch(false);
                setIsBlur(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleScroll = () => {
        setOpensearch(false);
        setIsBlur(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOnClick = () => {
        setOpensearch(!opensearch);
        toggleBlur();
    };

    console.log(isBlur);
    return (
        <div className='search-icon' style={{ textAlign: "center", display: "flex", flexDirection: "row-reverse" }} ref={dropdownRef}> {/* Add this container to center the search bar */}

            <div style={{ textAlign: "right" }}>
                <SearchIcon
                    style={{ fontSize: "35px", color: "#FFF", cursor: "pointer" }}
                    onClick={() => { handleOnClick(); }}
                />
            </div>
            {opensearch && (
                <div className='searchBar'>
                    <input className='search' placeholder='Search' />
                </div>
            )}
        </div>
    );
}

export default Search;
