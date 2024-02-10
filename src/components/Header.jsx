import { Link } from "react-router-dom";

export default function Header(params) {


    return (
        <header>
            <h1>
                <Link to='/'><img className="logo" src="./img/mainLogo.png" alt="" /></Link>

            </h1>
            <div>
                <p>ADMIN</p>
                <p>MYPAGE</p>
            </div>
            <nav >
                    <p>All</p>
                    <p>General</p>
                    <p>Development</p>
                    <p>Marketing</p>
            </nav>

        </header>
    );
}