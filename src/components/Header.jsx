import { Link } from "react-router-dom";
import Image from "./Image";
import '../style/header/header.css'
export default function Header(params) {


    return (
        <header className="inner">
            <h1>
                <Link to='/'><Image  img='mainLogo.png' class='logo' /></Link>
            </h1>
            <div>
                <p>ADMIN</p>
                <p><Link to='mypage/test'>MYPAGE</Link> </p>
            </div>
            <nav >
                    <p><Link to='list/All'>All</Link></p>
                    <p><Link to='list/General'>General</Link></p>
                    <p><Link to='list/Development'>Development</Link></p>
                    <p><Link to='list/Marketing'>Marketing</Link></p>
            </nav>

        </header>
    );
}