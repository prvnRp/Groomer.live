import './App.css';
import Login from './Components/Login';
import { BlurProvider } from './context/blurContext';

function App() {
  return (
    <BlurProvider>
      <Login />
    </BlurProvider>
  );
}

export default App;
