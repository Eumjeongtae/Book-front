
import { useNavigate } from 'react-router-dom';
import '../style/login/login.css';

import { useRef, useState } from 'react';
import { HiLockClosed } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ uid: "", pw: "" });


  console.log();
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=STATE_STRING`
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const inputUid = useRef(null);
  const inputPw = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // 밸류 체크
    if (loginForm.uid === '') {
      alert('아이디를 입력해주세요.')
      return inputUid.current.focus();
    }
    if (loginForm.pw === '') {
      alert('비밀번호를 입력해주세요.')
      return inputPw.current.focus();
    }

    // 서버 연동
    /*axios
    .post('', loginForm)
    .then(data => {
      if(data.data.login){
        alert('로그인 성공')

        Cookie.setCookie('x-auth_token', data.data.token)
        const userInfo = jwtDecode(data.data.token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 상품구매쿠키 보유 시 해당페이지로 이동
        const sellProductCookie = Cookie.getCookie('sellproductcookie')
        if(sellProductCookie === undefined){
          prop.handleLoginToggle()
          navigate('/')
        } else {
          prop.handleLoginToggle()
          navigate(sellProductCookie)
        }

      } else if(data.data.cnt === 1){
        alert('비밀번호가 다릅니다. 다시 확인해주세요.')
        setLoginForm({...loginForm, pw : ''})
        return inputPw.current.focus()
      } else {
        alert('존재하지 않은 아이디 입니다. 다시 확인해주세요.')
        setLoginForm({...loginForm, uid : '', pw : ''})
        return inputUid.current.focus()
      }
    })
    .catch(err => console.log(err))*/

  }
  const handleClickLogin = (url) => window.location.href = url;

  return (
    <div className='inner'>
      <div className='login'>
        <h1 className="formLogo"><img src="/img/txtLogo.png" alt="" /></h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <p>
            <FiUser />
            <input type="text" placeholder="아이디" ref={inputUid} name="uid" value={loginForm.uid} onChange={handleChange}></input>
          </p>
          <p>
            <HiLockClosed />
            <input type="password" placeholder="비밀번호" ref={inputPw} name="pw" value={loginForm.pw} onChange={handleChange}></input>
          </p>



          <div className="loginSignBtns">
            <button >로그인</button>
            <button type="button" onClick={() => navigate('/sign')}>회원가입</button>
          </div>
          <button type="button" className='connectBtn' onClick={() => handleClickLogin(kakaoURL)}>
            <img src="/img/kakao.jpg" alt="" />
          </button>
          <button type="button" className='connectBtn' onClick={() => handleClickLogin(naverURL)}>
            <img src="/img/naver.jpg" alt="" />
          </button>
          <button type="button" className='connectBtn' onClick={() => handleClickLogin(googleURL)} >
            <img src="/img/google.jpg" alt="" />
          </button>
        </form>
      </div>
    </div>



  )
}