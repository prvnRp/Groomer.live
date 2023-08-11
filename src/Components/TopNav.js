import '../App.css';
import Search from './Search';
import Profile from './Profile';
import Hamburger from './Hamburger';

function TopNav() {
    return (
        <div className='topNav'>
            <Search />
            <Profile />
            <Hamburger />
        </div>
    );
}

export default TopNav;
