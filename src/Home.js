// import './App.css';
import logo from './images/groomerpsd.svg';
import login from './images/login.svg';
import './styles/Home.css'
import { NavLink } from "react-router-dom";

function Home() {

    return (
        <div id="containerhome">

            <div class="box" id="bluebox">
                <img src={logo} alt="Logo" className="logobig" />
            </div>

            <div class="box" id="redbox">
                <div style={{ display: "flex", flexDirection: "row", gap: "5vw" }}>
                    <div>
                        <input
                            type="text"
                            name="Username"
                            placeholder='UserName'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="Password"
                            placeholder='Password'
                        />
                    </div>
                    <NavLink to="/mySalon" ><img src={login} alt="Logout" /></NavLink>
                </div>
            </div>

        </div>
    )
}

export default Home;
