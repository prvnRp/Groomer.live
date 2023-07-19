import '../App.css';
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className='Navbar'>
      <NavLink to="/admin" ><span>On board form</span></NavLink>
      <NavLink to="/search" ><span>Salon Search</span></NavLink>
    </div>
  );
}

export default App;
