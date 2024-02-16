import { Link, useParams } from "react-router-dom";
import Image from "./Image";
import '../style/header/header.css'
export default function Header(params) {
    const {category}  = useParams();
    console.log(category);

    return (
        <header className="inner">
            <h1>
                <Link to='/list/all'><Image  img='imgupload/mainLogo.png' class='logo' /></Link>
            </h1>
            <div>
                <p>ADMIN</p>
                <p><Link to='mypage/test'>MYPAGE</Link> </p>
            </div>
            <nav >
                    <p className={category ==='all' ? 'on' : ''}><Link to='list/all'>All</Link></p>
                    <p className={category ==='general' ? 'on' : ''}><Link to='list/general'>General</Link></p>
                    <p className={category ==='development' ? 'on' : ''}><Link to='list/development'>Development</Link></p>
                    <p className={category ==='marketing' ? 'on' : ''}><Link to='list/marketing'>Marketing</Link></p>
                    <p ><Link to='list/all'>Landing</Link></p>
            </nav>

        </header>
    );
}