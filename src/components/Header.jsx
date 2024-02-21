import { Link, useLocation, useParams } from "react-router-dom";
import Image from "./Image";
import '../style/header/header.css'
import { getUser, removeUser } from "../util/localStorage";
import { useNavigate } from "react-router-dom";
export default function Header(params) {
    const navigate = useNavigate();
    const { category } = useParams();
    const { pathname } = useLocation();
    const userInfo = getUser() ? getUser().userInfo : '';

    const handleLogout = () => {
        removeUser()
        navigate('/');
    }

    return (
        <header className="inner">
            <h1>
                <Link to='/list/all'><Image img='imgupload/mainLogo.png' class='logo' /></Link>
            </h1>
            <div>
                <p className="userId">{userInfo ? userInfo.id : <></>}</p>
                <p><Link to='mypage/test'>Mypage</Link> </p>
                <p onClick={handleLogout} className="logout">Logout</p>
            </div>
            <nav >
                <p className={category === 'all' ? 'on' : ''}><Link to='list/all'>All</Link></p>
                <p className={category === 'general' ? 'on' : ''}><Link to='list/general'>General</Link></p>
                <p className={category === 'development' ? 'on' : ''}><Link to='list/development'>Development</Link></p>
                <p className={category === 'marketing' ? 'on' : ''}><Link to='list/marketing'>Marketing</Link></p>
                <p className={pathname === '/landing' ? 'on' : ''}><Link to='landing'>Landing</Link></p>
            </nav>

        </header>
    );
}