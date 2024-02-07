import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import '../style/main/main.css';


export default function SignUp() {
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({ uid: "", pw: "", pwcheck: "", name: "", email: "", mail2: '@naver.com' })
  const [idCheck, setIdcheck] = useState(false);
  const [mailCheck, setMailcheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo({ ...signInfo, [name]: value })

    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(signInfo);

    // if(signInfo.uid === ''){
    //   alert('아이디를 입력해주세요.')
    //   return
    // }else if(signInfo.uid && !idCheck){
    //   alert('아이디 중복확인을 해주세요.')
    //   return
    // }

    if(signInfo.pw === '' || signInfo.pwcheck === ''){
      alert('비밀번호를 입력해주세요.')
      return
    }else if(signInfo.pw !== signInfo.pwcheck){
      alert('비밀번호가 일치하지 않습니다.')
      return
    }


    

    // axios
    //   .post(`http://localhost:8000/signup`, signInfo)
    //   .then(result => {
    //     // console.log(result.data);
    //   })
    //   .catch(err => console.log(err))






  }


  return (
    <div className="signup">
      <h1 className="formLogo"><img src="/img/txtLogo.png" alt="" /></h1>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <input type="text" name="uid" value={signInfo.uid} placeholder="아이디를 입력해주세요." onChange={handleChange} />
          <button type="button"  > 중복 확인</button>
        </div>

        <div >
          <input name="pw" type="password" value={signInfo.pw} placeholder="비밀번호를 입력해주세요." onChange={handleChange} />
        </div>

        <div>
          <input name="pwcheck" type="password" value={signInfo.pwcheck} placeholder="비밀번호를 확인해주세요." onChange={handleChange} />
        </div>

        <div >
          <input type="text" name="name" value={signInfo.name} placeholder="이름을 입력해주세요." onChange={handleChange} />
        </div>

        <div className="signemail">
          <input type="text" name="email" value={signInfo.email} placeholder="이메일을 입력해주세요." onChange={handleChange} />
          <select className="signemailselect" name="mail2" onChange={handleChange} value={signInfo.mail2}>
            <option value='@naver.com'>@naver.com</option>
            <option value='@daum.net'>@daum.net</option>
            <option value='@gmail.com'>@gmail.com</option>
          </select>
        </div>

        {/* <div className="signphone">
          <input type="tel" name="tel" placeholder="폰번호를 입력해주세요."/> 
        </div> */}



        <div className="signcheckbar">
          <div className="signcheckBtn">
            <button type="button" className="signcancel">취소</button>
            <button className="signcheck">확인</button>
          </div>
        </div>
      </form>
    </div>
  );
}