import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function Search() {
    const [opensearch, setOpensearch] = useState(false);

    return (
        <div className='search-icon' style={{ textAlign: "center", display: "flex", flexDirection: "row-reverse" }}> {/* Add this container to center the search bar */}

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
