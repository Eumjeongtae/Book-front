import axios from "axios";
import Home from "./Home";
import { useEffect } from "react";
import Login from './Login';
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as Cookie from '../util/cookie.js';

export default function Oauth() {
    let { site } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get("code");
                axios
                    .post(`http://localhost:8000/auth/${site}`, { code })
                    .then(result => {
                        if (result.data.login) {

                            const expires = new Date();
                            expires.setFullYear(expires.getFullYear() + 1);

                            localStorage.getItem('keepLogin') === 'true' ?
                                Cookie.setCookie('x-auth_token', result.data.token, { path: '/', expires })
                                :
                                Cookie.setCookie('x-auth_token', result.data.token, { path: '/' });


                            const userInfo = jwtDecode(result.data.token)
                            localStorage.setItem('userInfo', JSON.stringify({ userInfo, name: result.data.name }));
                            navigate('/list/all')
                        }
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.error("Error fetching auth token:", error);
            }
        };

        fetchData();
    }, []);

    return <Home />

}