import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';

function App() {
  const [location,setLocation] = useState(true);

  const {pathname} = useLocation();

  useEffect(()=>{
    pathname === '/sign' || pathname === '/login' ? setLocation(false) : setLocation(true)
  },[pathname])

  return (
    <>
      {location && <Header/>}
      <Outlet />
    </>
  );
}

export default App;
