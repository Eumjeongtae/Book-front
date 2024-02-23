// hooks/useRedirectIfUnauthenticated.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from "../util/localStorage";

function useRedirect() {
    const navigate = useNavigate();
    const userInfo = getUser() ? getUser().userInfo : null;
    const { pathname } = useLocation();
    useEffect(() => {
        if (!userInfo && pathname !== '/sign') {
            navigate('/');
        } else if (userInfo && pathname === '/') {
            navigate('/list/0');
        }
    }, [userInfo, navigate]);
}

export default useRedirect;
