import '../App.css';
import Grid from "@mui/material/Grid";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Hamburger() {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 700);
        };

        // Initial check and event listener setup
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const changeIcon = window.location.pathname === "/menu";

    const handleGridIconClick = () => {
        if (window.location.pathname === "/menu") {
            navigate(-1);
        }
        else {
            navigate("/menu");
        }
    };


    return (
        <div>
            {isMobileView && <Grid
                className='hamburger-background'
                style={{ padding: "2px 4px", cursor: "pointer", borderRadius: "50%", float: "right" }}
                item xs={1}
                onClick={handleGridIconClick}
            >
                {/* {changeIcon ? <div style={{ fontSize: "17px", padding: "0 5px", color: "#000" }}>&times;</div> : <MenuIcon className='menu-icon' />} */}
                {changeIcon ? <div style={{ fontSize: "50px", position: "relative", top: "-25px" }}>&times;</div> : <MenuIcon className='menu-icon' />}
            </Grid>}
            {!isMobileView && <Grid
                className='hamburger-background'
                style={{ padding: "2px 4px", cursor: "pointer", borderRadius: "50%", float: "right" }}
                item xs={1}
                onClick={handleGridIconClick}
            >
                {changeIcon ? <CloseIcon className='menu-icon' /> : <MenuIcon className='menu-icon' />}
            </Grid>}
        </div>
    );
}

export default Hamburger;
