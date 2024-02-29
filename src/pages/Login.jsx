import { useNavigate } from 'react-router-dom';
import '../style/login/login.css';

import { useRef, useState } from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { usePostData } from '../api/apiPost';
import { setAuthToken } from '../util/auth';

export default function Login() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ id: '', password: '' });
    const { mutate: sendPostData } = usePostData();

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=STATE_STRING`;
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

    const inputid = useRef(null);
    const inputPassword = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });

        if (name === 'keepLoginCheck') {
            localStorage.setItem('keepLogin', e.target.checked ? 'true' : 'false');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 밸류 체크
        if (loginForm.id === '') {
            alert('아이디를 입력해주세요.');
            return inputid.current.focus();
        }
        if (loginForm.password === '') {
            alert('비밀번호를 입력해주세요.');
            return inputPassword.current.focus();
        }
        sendPostData(
            { url: `http://localhost:8000/login`, data: loginForm },
            {
                onSuccess: (result) => {
                    if (result.data.login) {
                        setAuthToken(result);
                        navigate('/list/0');
                    }
                },
                onError: (error) => {
                    // 요청이 실패했을 때 실행될 로직
                    console.error('에러 발생:', error);
                },
            }
        );
    };
    const handleClickLogin = (url) => (window.location.href = url);

    return (
        <div className="inner">
            <div className="login">
                <h1 className="formLogo">
                    <img src="/img/txtLogo.png" alt="" />
                </h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <p>
                        <FiUser />
                        <input
                            type="text"
                            placeholder="아이디"
                            ref={inputid}
                            name="id"
                            value={loginForm.id}
                            onChange={handleChange}
                        ></input>
                    </p>
                    <p>
                        <HiLockClosed />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            ref={inputPassword}
                            name="password"
                            value={loginForm.password}
                            onChange={handleChange}
                        ></input>
                    </p>

                    <div className="saveid">
                        <input type="checkbox" id="chkKeepLogin" name="keepLoginCheck" onChange={handleChange} />
                        <label htmlFor="chkKeepLogin">로그인 상태 유지</label>
                    </div>

                    <div className="loginSignBtns">
                        <button>로그인</button>
                        <button type="button" onClick={() => navigate('/sign')}>
                            회원가입
                        </button>
                    </div>
                    <button type="button" className="connectBtn" onClick={() => handleClickLogin(kakaoURL)}>
                        <img src="/img/kakao.jpg" alt="" />
                    </button>
                    <button type="button" className="connectBtn" onClick={() => handleClickLogin(naverURL)}>
                        <img src="/img/naver.jpg" alt="" />
                    </button>
                    <button type="button" className="connectBtn" onClick={() => handleClickLogin(googleURL)}>
                        <img src="/img/google.jpg" alt="" />
                    </button>
                </form>
            </div>
        </div>
    );
}
