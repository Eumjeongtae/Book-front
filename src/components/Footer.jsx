import { Link } from 'react-router-dom';
import Image from './Image';
import '../style/Footer/footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="inner">
                <p className="footerLogo">
                    <Link to="/main">
                        <Image img="imgupload/logo1.png" class="logo" />
                    </Link>
                </p>

                <ul class="ft_menu">
                    <li>
                        <Link to="/list/0">All</Link>
                    </li>
                    <li>
                        <Link to="/list/1">Development</Link>
                    </li>
                    <li>
                        <Link to="/list/2">Marketing</Link>
                    </li>
                    <li>
                        <Link to="/list/3">General</Link>
                    </li>
                    <li>
                        <Link to="/mypage">Mypage</Link>
                    </li>
                </ul>

                <div class="ft_info">
                    <ul class="ft_info_menu">
                        <li>
                            <b>상호명 : </b>&nbsp;키온비트<em>ㅣ</em>
                        </li>
                        <li>
                            <b>주소 : </b>&nbsp;서울특별시 강남구 봉은사로 429, 105호(삼성동, 위즈빌딩)<em>ㅣ</em>
                        </li>
                        <li>
                            <b>사업자 등록번호 : </b>&nbsp;000-00-0000<em>ㅣ</em>
                        </li>
                        <li>
                            <b>대표 :&nbsp;</b>&nbsp;이미영<em>ㅣ</em>
                        </li>
                        <li>
                            <b>TEL :&nbsp;</b>&nbsp;02-6953-0217
                        </li>
                    </ul>
                </div>

                <em class="copyright">홈페이지 제작 ㅣ Keyonbit</em>
            </div>
        </footer>
    );
}
