import { Link, useParams } from 'react-router-dom';
import Image from './Image';
import '../style/header/header.css';
import { getUser, removeUser } from '../util/localStorage';
import { useNavigate } from 'react-router-dom';

export default function Header(params) {
    const navigate = useNavigate();
    const { genre } = useParams();
    const userInfo = getUser() ? getUser().userInfo : '';

    const handleLogout = () => {
        removeUser();
        navigate('/');
    };

    const handleNavigate = (add) => navigate(add);

    return (
        <header >
            <div className='inner'>
                <h1>
                    <Link to="/main">
                        <Image img="imgupload/logo2.png" class="logo" />
                    </Link>
                </h1>
                <div>
                    {userInfo?.authority === 1 && (
                        <p>
                            <Link to="manager">Manager</Link>
                        </p>
                    )}

                    <p className="userId">{userInfo?.id}</p>
                    <p>
                        <Link to="mypage">Mypage</Link>
                    </p>
                    <p onClick={handleLogout} className="logout">
                        Logout
                    </p>
                </div>
                <nav>
                    <p className={genre === '0' ? 'on' : ''} onClick={() => handleNavigate('/list/0')}>
                        All
                    </p>
                    <p className={genre === '1' ? 'on' : ''} onClick={() => handleNavigate('/list/1')}>
                        Development
                    </p>
                    <p className={genre === '2' ? 'on' : ''} onClick={() => handleNavigate('/list/2')}>
                        Marketing
                    </p>
                    <p className={genre === '3' ? 'on' : ''} onClick={() => handleNavigate('/list/3')}>
                        General
                    </p>
          
                </nav>
            </div>
        </header>
    );
}
