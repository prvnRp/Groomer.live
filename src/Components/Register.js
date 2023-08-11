import '../App.css';
import '../Styles/Login.css';
import { NavLink } from 'react-router-dom';
import TopNav from './TopNav';
import Logo from './Logo';

function Register() {

    return (
        <section className="container">
            <div className="bg-image"><Logo /></div>
            <div className="contentt">
                <TopNav />
                <div className='inforegister'>
                    <div>
                        <div className='login'><b>Register</b></div>
                        <p>Already have an account? <NavLink to='/'><span className='register'>Login</span></NavLink></p>
                    </div>
                    <div>
                        <input type="text" placeholder="Username" className='Mobile Number' id="mobileNumber" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" className='Mobile Number' id="mobileNumber" />
                    </div>
                    <div>
                        <input type="number" placeholder="Mobile Number" className='Mobile Number' id="mobileNumber" />
                    </div>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                            />
                            <span className="checkbox-custom"></span>
                            I accept the terms and conditions, including the Privacy
                        </label>
                    </div>
                    {/* <div><input type="radio" /></div> */}
                    <div>
                        <button className='LoginButton'>Register</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
