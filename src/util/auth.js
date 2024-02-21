// auth.js
import {jwtDecode} from 'jwt-decode';
import * as Cookie from '../util/cookie.js';

export const setAuthToken = (result) => {
    const expires = new Date();
    
    expires.setFullYear(expires.getFullYear() + 1);

    localStorage.getItem('keepLogin') === 'true' ?
      Cookie.setCookie('x-auth_token', result.data.token, { path: '/', expires })
      :
      Cookie.setCookie('x-auth_token', result.data.token, { path: '/' });


    const userInfo = jwtDecode(result.data.token)
    localStorage.setItem('userInfo', JSON.stringify({ userInfo }));
    
};
