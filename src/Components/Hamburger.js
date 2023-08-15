import '../App.css';
import Grid from "@mui/material/Grid";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Hamburger() {
    const navigate = useNavigate();

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
            <Grid
                className='hamburger-background'
                style={{ padding: "2px 4px", cursor: "pointer", borderRadius: "50%", float: "right" }}
                item xs={1}
                onClick={handleGridIconClick}
            >
                {changeIcon ? <div style={{ fontSize: "50px", position: "relative", top: "-28px" }}>&times;</div> : <MenuIcon className='menu-icon' />}
            </Grid>
        </div>
    );
}

export default Hamburger;
