import '../App.css';
import LinkedInIcon from '../images/linked-in.svg'
import Twitter from '../images/twitter.svg'
import InstagramIcon from '../images/instagram.svg'
import PlaceMarker from '../images/place-marker.svg'
import GmailLogo from '../images/gmail-logo.svg'
import WhatsApp from '../images/whats-app.svg'

function Footer() {
    return (
        <div className="footer">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", margin: "7vh", justifyContent: "space-evenly" }}>
                    <div className='groomerLive'><b>Groomer.live</b></div>
                    <div className='groomerInfo'>
                        <div><img style={{ position: "relative", top: "5px", marginRight: "5px" }} src={GmailLogo} alt="gmail" /><span>Groomer.online@gmail.com</span></div>
                        <div><img style={{ position: "relative", top: "5px", marginRight: "5px" }} src={WhatsApp} alt="whatsapp" />+91 9876543210</div>
                        <div><img style={{ position: "relative", top: "5px", marginRight: "5px" }} src={PlaceMarker} alt="location" />Hi-tech city, Hyderabad. </div>
                        <div>
                            <img style={{ transform: "scale(0.7)" }} src={LinkedInIcon} alt="linkedIn" />
                            <img style={{ transform: "scale(0.7)" }} src={Twitter} alt="twitter" />
                            <img style={{ transform: "scale(0.7)" }} src={InstagramIcon} alt="instagram" />
                        </div>
                    </div>
                    <div className='termsConditions' style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }}>
                        <div>Terms and Conditions</div>
                        <div>Privacy and Policy</div>
                    </div>
                </div>
                <div style={{ textAlign: "center", fontSize: "10px" }}>Copy right ©2023 groomer.live pvt limited. All the rights are reserved ®grooomer.live.</div>
            </div>
        </div>
    );
}

export default Footer;
