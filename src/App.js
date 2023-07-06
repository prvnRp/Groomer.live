import './App.css';
import Logo from './Components/Logo';
import Logout from './Components/Logout';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Logo />
      <Logout />
      <Outlet />
    </div>
  );
}

export default App;
