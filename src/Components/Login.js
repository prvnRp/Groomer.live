import '../App.css';
import '../Styles/Login.css';
import { NavLink } from 'react-router-dom';
import TopNav from './TopNav';
import { useState } from 'react';
import Otp from './Otp';
import Logo from './Logo';

function Login() {
    const [islogined, setIslogined] = useState(false);
    const handleSubmit = () => {
        setIslogined(true);
    }

    return (
        <section className="container">
            <div className="bg-image"><div className='logo-display'><Logo /></div></div>
            <div className="contentt">
                <div className='topnav-display'><TopNav /></div>
                <div className='info'>

                    {!islogined && <div>
                        <div className='login'><b>Login</b></div>
                        <p>Don't have an account? <NavLink to="/register"><span className='register'>Register</span></NavLink></p>
                    </div>}
                    {!islogined && <form>
                        <div>
                            <input type="number" placeholder="Mobile Number" className='Mobile Number' id="mobileNumber" />
                        </div>
                        <div>
                            <button style={{ marginTop: "10vh" }} onClick={handleSubmit} className='LoginButton'>Login</button>
                        </div>
                    </form>}
                    {islogined && <Otp />}
                </div>
            </div>
        </section>

    );
}

export default Login;
