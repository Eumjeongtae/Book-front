import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="inner">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
