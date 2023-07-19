import '../App.css';
import OnBoardForm from './OnBoardForm';
import { useState } from 'react';
import Logo from './Logo';
import NavBar from './NavBar';
import Logout from './Logout';

function SalonSearch() {
  const [searchon, setSearchOn] = useState(false);
  const handleSubmit = (event) => {
    setSearchOn(true);
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
