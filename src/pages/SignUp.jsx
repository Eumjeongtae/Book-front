import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/sign/sign.css';
import { usePostData } from '../api/apiPost';
import { signValidation } from '../util/signValidation';
import useSendMail from '../hooks/useSendMail';

export default function SignUp() {
    const navigate = useNavigate();
    const [signInfo, setSignInfo] = useState({
        id: '',
        name: '',
        password: '',
        pwcheck: '',
        email: '',
        mailAddr: '@naver.com',
        mailAuthNum: '',
    });
    const [vali, setVali] = useState({ id: true, name: true, password: true, pwcheck: true, mailAuthNum: true });
    const [mailCheck, setMailCheck] = useState(false);
    const [authNum, setAuthNum] = useState();
    const { mutate: sendPostData } = usePostData();
    const { sendMail, mailButtonDisabled } = useSendMail();
    const [isButtonDisabled, setIsButtonDisabled] = useState({ idCheck: false, signId: false });

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInfo({ ...signInfo, [name]: value });

        if (name === 'id') {
            setVali({ ...vali, id: false });
        }
        if (name === 'name') {
            setVali({ ...vali, name: true });
        }

        if (name === 'mailAuthNum') {
            e.target.value === authNum
                ? setVali({ ...vali, mailAuthNum: true })
                : setVali({ ...vali, mailAuthNum: false });
        }
        if (name === 'password') {
            setVali({ ...vali, password: validatePassword(e.target.value) });
        }
        if (name === 'pwcheck') {
            setVali({ ...vali, pwcheck: e.target.value === signInfo.password });
        }
    };

    const handleMailCheck = async () => {
        if (signInfo.email) {
            setMailCheck(true);
            let mail = signInfo.email + signInfo.mailAddr;
            try {
                let mailAuthNum = await sendMail(mail, 'user');
                setAuthNum(mailAuthNum.authNum);
                alert('이메일 인증번호가 발송되었습니다.');
            } catch (error) {
                alert('메일확인중 에러' + error);
            }
        } else {
            alert('이메일을 입력해주세요.');
        }
    };

    const handleIdCheck = () => {
        setIsButtonDisabled({ ...isButtonDisabled, idCheck: true });
        if (signInfo.id) {
            try {
                sendPostData(
                    { url: `http://localhost:8000/signup/idCheck`, data: signInfo.id },
                    {
                        onSuccess: (data) => {
                            setVali({ ...vali, id: data });
                            !data ? alert('이미 있는 아이디 입니다.') : alert('아이디 인증이 완료되었습니다!');
                            setIsButtonDisabled({ ...isButtonDisabled, idCheck: false });
                        },
                        onError: (error) => {
                            // 요청이 실패했을 때 실행될 로직
                            console.error('에러 발생:', error);
                        },
                    }
                );
            } catch (error) {
                alert('아이디확인중 에러' + error);
                setIsButtonDisabled({ ...isButtonDisabled, idCheck: false });
            }
        } else {
            alert('아이디를 입력해주세요.');
            setIsButtonDisabled({ ...isButtonDisabled, idCheck: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let signKey = signValidation(signInfo, vali);

        if (signKey) {
            setVali({ ...vali, [signKey]: false });
        } else {
            const infoData = {
                id: signInfo.id,
                name: signInfo.name,
                password: signInfo.password,
                email: signInfo.email + signInfo.mailAddr,
            };
            try {
                setIsButtonDisabled({ ...isButtonDisabled, signId: true });

                sendPostData(
                    { url: `http://localhost:8000/signup`, data: infoData },
                    {
                        onSuccess: (data) => {
                            console.log(data);
                            navigate('/');
                        },
                        onError: (error) => {
                            console.error('에러 발생:', error);
                            alert('오류가 발생했습니다 다시 시도해 주세요!');
                            window.location.reload();
                        },
                    }
                );
            } catch (error) {
                console.log('회원가입중 에러' + error);
                alert('오류가 발생했습니다 다시 시도해 주세요!');
                window.location.reload();
            }
        }
    };

    return (
        <div className="signup">
            <h1 className="formLogo">
                <img src="/img/txtLogo.png" alt="" />
            </h1>
            <form className="signForm" onSubmit={handleSubmit}>
                <div className="signId">
                    <input
                        type="text"
                        name="id"
                        value={signInfo.id}
                        placeholder="아이디를 입력해주세요."
                        onChange={handleChange}
                        maxLength="20"
                    />
                    <button type="button" disabled={isButtonDisabled.idCheck} onClick={handleIdCheck}>
                        중복 확인
                    </button>
                    {!vali.id && <span className="noticeTxt">&#8251;아이디 중복확인을 해주세요.</span>}
                </div>
                <div>
                    <input
                        name="name"
                        type="text"
                        value={signInfo.name}
                        placeholder="이름을 입력해주세요."
                        onChange={handleChange}
                        maxLength="20"
                    />
                    {!vali.name && <span className="noticeTxt">&#8251;이름을 입력해주세요.</span>}
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        value={signInfo.password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={handleChange}
                        maxLength="30"
                    />
                    {!vali.password && (
                        <span className="noticeTxt">&#8251;비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.</span>
                    )}
                </div>
                <div>
                    <input
                        name="pwcheck"
                        type="password"
                        value={signInfo.pwcheck}
                        placeholder="비밀번호를 확인해주세요."
                        onChange={handleChange}
                        maxLength="30"
                    />
                    {!vali.pwcheck && <span className="noticeTxt">&#8251;비밀번호가 일치하지 않습니다.</span>}
                </div>

                <div className="signemail">
                    <input
                        type="text"
                        name="email"
                        value={signInfo.email}
                        placeholder="이메일을 입력해주세요."
                        onChange={handleChange}
                        maxLength="40"
                    />
                    <select
                        className="signemailselect"
                        name="mailAddr"
                        onChange={handleChange}
                        value={signInfo.mailAddr}
                    >
                        <option value="@naver.com">@naver.com</option>
                        <option value="@daum.net">@daum.net</option>
                        <option value="@gmail.com">@gmail.com</option>
                        <option value="">직접입력</option>
                    </select>

                    <button type="button" disabled={mailButtonDisabled} onClick={() => handleMailCheck()}>
                        인증
                    </button>
                    {mailCheck && (
                        <input
                            type="number"
                            name="mailAuthNum"
                            value={signInfo.mailAuthNum}
                            onChange={handleChange}
                            className="mailCheckNum"
                            placeholder="인증번호를 입력해주세요."
                        />
                    )}
                    {!vali.mailAuthNum && <span className="noticeTxt">&#8251;이메일 인증을 해주세요.</span>}
                </div>

                <div className="signcheckbar">
                    <div className="signcheckBtn">
                        <button type="button" onClick={() => navigate('/')} className="signcancel">
                            취소
                        </button>
                        <button className="signcheck" disabled={isButtonDisabled.signId}>
                            확인
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
