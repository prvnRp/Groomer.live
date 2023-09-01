// import './App.css';
import logo from './images/groomerpsd.svg';
import login from './images/login.svg';
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    // Define the handleSubmit function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract the username and password from the form elements
        const { username, password } = event.target.elements;

        // Define headers for the HTTP request
        let headersList = {
            "Accept": "*/*",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        // Create the request body in JSON format
        let bodyContent = JSON.stringify({
            "username": username.value,
            "password": password.value
        });

        // Send a POST request to the server for login
        let response = await fetch("http://127.0.0.1:8000/admin/login", {
            method: "POST",
            mode: "cors",
            body: bodyContent,
            headers: headersList
        });

        // Parse the response as JSON
        let data = await response.json();
        console.log(data);
        console.log(data['message']);

        // If login is successful, navigate to the '/admin' route
        if (data.message === 'Logged in successfully') {
            navigate('/admin');
        }
    }

    // Render the Home component
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
