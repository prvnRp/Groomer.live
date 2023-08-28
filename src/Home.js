// import './App.css';
import logo from './images/groomerpsd.svg';
import login from './images/login.svg';
import './Home.css'
import { NavLink } from "react-router-dom";

function Home() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        let headersList = {
            "Accept": "*/*",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "username": "sahithy",
            "password": "password"
        });

        let response = await fetch("http://127.0.0.1:8000/admin/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        // const data = Array.from(event.target.elements)
        //     .filter((input) => input.name).reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})
        // const data = { "username": username.value, "password": password.value };
        // console.log(data);

        // console.log(Password.value);
        // await fetch('http://127.0.0.1:8000/admin/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // console.log("clicked")
    }

    return (
        <div id="containerhome">

            <div className="box" id="bluebox">
                <img src={logo} alt="Logo" className="logobig" />
            </div>

            <div className="box" id="redbox">
                <form style={{ display: "flex", flexDirection: "row", gap: "5vw" }} onSubmit={handleSubmit} >
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder='UserName'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="password"
                            placeholder='Password'
                        />
                    </div>
                    <input type="submit" value="Login" style={{ backgroundImage: "url(/images/login.svg)" }} />
                    <img src={login} alt="Logout" />
                </form>
            </div>

        </div>
    )
}

export default Home;
