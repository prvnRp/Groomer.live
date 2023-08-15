import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect, useRef } from 'react';

function Search() {
    const [opensearch, setOpensearch] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpensearch(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <div className='search-icon' style={{ textAlign: "center", display: "flex", flexDirection: "row-reverse" }} ref={dropdownRef}> {/* Add this container to center the search bar */}

            <div style={{ textAlign: "right" }}>
                <SearchIcon
                    style={{ fontSize: "35px", color: "#FFF", cursor: "pointer" }}
                    onClick={() => { setOpensearch(!opensearch) }}
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
