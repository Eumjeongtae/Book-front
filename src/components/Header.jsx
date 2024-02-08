import { Link } from "react-router-dom";

export default function Header(params) {


    return (
        <header>

            <Link to='/'><img className="logo" src="./img/mainLogo.png" alt="" /></Link>

        </header>
    );
}