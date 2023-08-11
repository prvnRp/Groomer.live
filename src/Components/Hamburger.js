import '../App.css';
import Grid from "@mui/material/Grid";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Hamburger() {
    const navigate = useNavigate();

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
                style={{ padding: "1px 2px 0px 4px", background: "#FFF", cursor: "pointer", borderRadius: "50%", float: "right" }}
                item xs={1}
                onClick={handleGridIconClick}
            >
                <MenuIcon style={{ color: "#000", position: "relative", top: "1px", left: "-1px" }} />
            </Grid>
        </div>
    );
}

export default Hamburger;
