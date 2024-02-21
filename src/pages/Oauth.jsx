import axios from "axios";
import Home from "./Home";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as Cookie from '../util/cookie.js';
import { setAuthToken } from "../util/auth.js";

export default function Oauth() {
    let { site } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get("code");
                const result = await axios.post(`http://localhost:8000/auth/${site}`, { code });
                if (result.data.login) {
                    await setAuthToken(result);
                    navigate('/list/all');
                }
            } catch (error) {
                console.error("Error fetching auth token:", error);
            }
        };

        fetchData();
    }, []);

    return <Home />

}