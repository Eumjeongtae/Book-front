import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/sign/sign.css';
import { usePostData } from '../api/apiPost';


export default function SignUp() {
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({ uid: "", pw: "", pwcheck: "",email: "", mailAddr: '@naver.com', mailAuthNum: '' })
  const [vali, setVali] = useState([true, true, true, true])
  const [mailCheck, setMailCheck] = useState(false);
  const [authNum, setAuthNum] = useState();
  const { mutate: sendPostData } = usePostData();
  // sendPostData({ url: '', data: '' })

  console.log(authNum);
  const valiArrChange = (num, value) => {
    let copy = [...vali]
    copy[num] = value
    setVali(copy)
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo({ ...signInfo, [name]: value });

    if (name === 'uid') {
      valiArrChange(0, false)
    }

    if (name === 'mailAuthNum') {
      e.target.value === authNum ? valiArrChange(3, true) : valiArrChange(3, false);
    }
    if (name === 'pw') {
      valiArrChange(1, validatePassword(e.target.value))
    }
    if (name === 'pwcheck') {
      valiArrChange(2, e.target.value === signInfo.pw)
    }
  }


  const handleMailCheck = () => {
    if (signInfo.email) {
      setMailCheck(true)
      let mail = signInfo.email + signInfo.mailAddr;
      sendPostData(
        { url: `http://localhost:8000/signup/mailCheck`, data: mail },
        {
          onSuccess: (data) => setAuthNum(data.authNum)
          ,
          onError: (error) => {
            // 요청이 실패했을 때 실행될 로직
            console.error("에러 발생:", error);
          },
        }
      );
    } else {
      alert('이메일을 입력해주세요.')
    }

  }
  const handleIdCheck = () => {
    if (signInfo.uid) {
      sendPostData(
        { url: `http://localhost:8000/signup/idCheck`, data: signInfo.uid },
        {
          onSuccess: (data) => valiArrChange(0, data)
          ,
          onError: (error) => {
            // 요청이 실패했을 때 실행될 로직
            console.error("에러 발생:", error);
          },
        }
      );
    } else {
      alert('아이디를 입력해주세요.')
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    // console.log(signInfo);
    if (signInfo.uid === '') {
      valiArrChange(0, false)
      return
    }

    if (signInfo.pw === '') {
      valiArrChange(1, false)
      return
    }
    if (signInfo.pwcheck !== signInfo.pw) {
      valiArrChange(2, false)
      return
    }

    if (signInfo.mailAuthNum === '') {
      valiArrChange(3, false)
      return
    }

    for (let i = 0; i < vali.length; i++) {
      if (!vali[i]) return
    }



    // axios
    //   .post(`http://localhost:8000/signup`, signInfo)
    //   .then(result => {
    //     // console.log(result.data);
    //   })
    //   .catch(err => console.log(err))


    sendPostData(
      { url: `http://localhost:8000/signup`, data: signInfo },
      {
        onSuccess: (data) => {
          console.log(data);
        }
        ,
        onError: (error) => {
          // 요청이 실패했을 때 실행될 로직
          console.error("에러 발생:", error);
        },
      }
    );



  }


  return (
    <div className="signup">
      <h1 className="formLogo"><img src="/img/txtLogo.png" alt="" /></h1>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <input type="text" name="uid" value={signInfo.uid} placeholder="아이디를 입력해주세요." onChange={handleChange} />
          <button type="button" onClick={handleIdCheck}> 중복 확인</button>
          {!vali[0] && <span className="noticeTxt">&#8251;아이디 중복확인을 해주세요.</span>}
        </div>

        <div >
          <input name="pw" type="password" value={signInfo.pw} placeholder="비밀번호를 입력해주세요." onChange={handleChange} />
          {!vali[1] && <span className="noticeTxt">&#8251;비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.</span>}
        </div>

        <div>
          <input name="pwcheck" type="password" value={signInfo.pwcheck} placeholder="비밀번호를 확인해주세요." onChange={handleChange} />
          {!vali[2] && <span className="noticeTxt">&#8251;비밀번호가 일치하지 않습니다.</span>}

        </div>


        <div className="signemail">
          <input type="text" name="email" value={signInfo.email} placeholder="이메일을 입력해주세요." onChange={handleChange} />
          <select className="signemailselect" name="mailAddr" onChange={handleChange} value={signInfo.mailAddr}>
            <option value='@naver.com'>@naver.com</option>
            <option value='@daum.net'>@daum.net</option>
            <option value='@gmail.com'>@gmail.com</option>
            <option value=''>직접입력</option>
          </select>

          <button type="button" onClick={() => handleMailCheck()}> 인증</button>
          {mailCheck && <input type="number" name="mailAuthNum" value={signInfo.mailAuthNum} onChange={handleChange} className="mailCheckNum" placeholder="인증번호를 입력해주세요." />}
          {!vali[3] && <span className="noticeTxt">&#8251;인증번호가 잘못되었습니다.</span>}

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