import '../App.css';
import OnBoardForm from './OnBoardForm';
import { useState } from 'react';
import Logo from './Logo';
import NavBar from './NavBar';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

function SalonSearch() {
  const navigate = useNavigate();
  const [searchon, setSearchOn] = useState(false);
  const [salonCode, setSalonCode] = useState("");

  const handleSubmit = async (event) => {
    setSearchOn(true);
    // console.log(event.target.text)
    console.log(salonCode);
    let headersList = {
      "Accept": "*/*",
      // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaGl0aHkiLCJlbWFpbCI6InR1bW1hc2FoaXRoeUBnbWFpbC5jb20iLCJpYXQiOjE2OTMzMTIwOTcsImV4cCI6MTY5MzkxNjg5N30.PCb_hmYJMu11qQIiWF25eidl0JWqEk_3zI7DK5p5NXw"
    }

    let response = await fetch(`http://127.0.0.1:8000/admin/salons?code=${salonCode}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    navigate('/admin', { state: { Salondata: data.data } });


  }
  return (
    <div className='container'>
      <div>
        <Logo />
        <Logout />
      </div>
      <NavBar />
      <div>
        {!searchon && <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='label'>Salon Code:</label>
            <div className='input'>
              <input style={{ marginRight: "4vw" }}
                type="text"
                name="SalonCode"
                value={salonCode}
                onChange={(event) => setSalonCode(event.target.value)}
              />
              <button className='submit' style={{ paddingRight: "40px", paddingLeft: "40px" }} type="submit">Go</button>
            </div>
          </div>
        </form>}
        {searchon && <OnBoardForm isReadOnly={true} search={true} />}
      </div>    </div>

  )
}

export default SalonSearch;
