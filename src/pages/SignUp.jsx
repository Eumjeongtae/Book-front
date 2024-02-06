import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";
import '../style/main/main.css';


export default function SignUp(){
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({uid : "", pw : "", pwcheck : "", name : "", email : ""})

  const handleSubmit = async(e) => {
    e.preventDefault();

   

  }


  return(
    <div className="signup">
      <h1 className="formLogo">Book-Booking</h1>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <input type="text" name="uid" placeholder="아이디를 입력해주세요." />
          <button type="button"  > 중복 확인</button>
        </div>

        <div >
          <input name="pw" placeholder="비밀번호를 입력해주세요."/>
        </div>

        <div>
          <input name="pwcheck" placeholder="비밀번호를 확인해주세요."/>
        </div>

        <div >
          <input type="text" name="name" placeholder="닉네임을 입력해주세요."/>
        </div>

        <div className="signemail">
          <input type="text" name="email" placeholder="이메일을 입력해주세요."/>
          <select className="signemailselect">
            <option>naver.com</option>
            <option>daum.net</option>
            <option>gmail.com</option>
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