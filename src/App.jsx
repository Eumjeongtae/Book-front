import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRedirect from './hooks/useRedirect';
import { useDispatch } from 'react-redux';
import { mainChange } from './modules/pageReducer';

function App() {
    const [location, setLocation] = useState(true);
    const { pathname } = useLocation();

    const dispatch = useDispatch();
    const [prevPath, setPrevPath] = useState('');
    useRedirect();

    useEffect(() => {
        if (prevPath.startsWith('/list/') && pathname !== prevPath) {
            // `/list/:genre`에서 떠날 때만 mainChange 액션을 디스패치
            dispatch(mainChange(1));
        }
        pathname === '/sign' || pathname === '/' ? setLocation(false) : setLocation(true);

        setPrevPath(pathname);
    }, [pathname]);

    return (
        <>
            {location && <Header />}
            <Outlet />
        </>
    );
}

export default App;
