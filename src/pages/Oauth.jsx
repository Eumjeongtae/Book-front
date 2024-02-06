import axios from "axios";
import Home from "./Home";
import { useEffect } from "react";
import Login from './Login';
import { useParams } from "react-router-dom";

export default function Oauth() {
    let { site } = useParams()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get("code");
                axios
                    .post(`http://localhost:8000/auth/${site}`, { code })
                    .then(result => {
                        console.log(result.data);
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.error("Error fetching auth token:", error);
            }
        };

        fetchData();
    }, []);
    return <Login />
}