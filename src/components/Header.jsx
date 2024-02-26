import { Link, useLocation, useParams } from 'react-router-dom';
import Image from './Image';
import '../style/header/header.css';
import { getUser, removeUser } from '../util/localStorage';
import { useNavigate } from 'react-router-dom';
export default function Header(params) {
    const navigate = useNavigate();
    const { genre } = useParams();
    const { pathname } = useLocation();
    const userInfo = getUser() ? getUser().userInfo : '';

    const handleLogout = () => {
        removeUser();
        navigate('/');
    };

    return (
        <header className="inner">
            <h1>
                <Link to="/list/0">
                    <Image img="mainLogo.png" class="logo" />
                </Link>
            </h1>
            <div>
                <p className="userId">{userInfo ? userInfo.id : <></>}</p>
                <p>
                    <Link to="mypage">Mypage</Link>{' '}
                </p>
                <p onClick={handleLogout} className="logout">
                    Logout
                </p>
            </div>
            <nav>
                <p className={genre === '0' ? 'on' : ''}>
                    <Link to="list/0">All</Link>
                </p>
                <p className={genre === '1' ? 'on' : ''}>
                    <Link to="list/1">Development</Link>
                </p>
                <p className={genre === '2' ? 'on' : ''}>
                    <Link to="list/2">Marketing</Link>
                </p>
                <p className={genre === '3' ? 'on' : ''}>
                    <Link to="list/3">General</Link>
                </p>
                <p className={pathname === '/landing' ? 'on' : ''}>
                    <Link to="landing">Landing</Link>
                </p>
            </nav>
        </header>
    );
}
