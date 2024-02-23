import { useRef, useState } from 'react';
import '../style/form/form.css';
import { FaCamera } from 'react-icons/fa';
import Image from './Image';
import { dateCheck } from '../util/dateCheck';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePostData } from '../api/apiPost';
import { getUser } from '../util/localStorage';
import { formValidation } from '../util/formValidation';

export default function Form(props) {
    const userInfo = getUser() ? getUser().userInfo : '';
    const initialState = {
        email: userInfo.email,
        image: '',
        book_name: '',
        publisher: '',
        author: '',
        publication_date: '',
        income_date: '',
        memo: '',
        income_type: 'companyBuy',
        income_method: '',
        genre: 'General',
        status: 'Stock',
    };
    const [form, setForm] = useState(() => (props.type === 'bookModify' ? props.info : initialState));
    const [vali, setVali] = useState({
        image: true,
        book_name: true,
        publisher: true,
        income_date: true,
        author: true,
        publication_date: true,
        memo: true,
        income_method: true,
    });

    const { imageUpload } = useImageUpload();
    const { mutate: sendPostData } = usePostData();

    const inputRefs = {
        image: useRef(null),
        book_name: useRef(null),
        author: useRef(null),
        publisher: useRef(null),
        publication_date: useRef(null),
        income_date: useRef(null),
        memo: useRef(null),
        income_method: useRef(null),
    };

    const dateVali = (date, name) => {
        if (dateCheck(date)) {
            setForm({ ...form, [name]: date });
        } else {
            setForm({ ...form, [name]: '' });
            setVali({ ...vali, [name]: false });
            alert('오늘 날짜 까지만 선택 가능합니다!');
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value }); //input 값 onChange시 value값 재 할당
        setVali({ ...vali, [name]: true });

        if (name === 'image' && e.target.files.length) {
            let imgPath = await imageUpload(e.target.files[0]);
            setForm({ ...form, image: imgPath });
        }

        if (name === 'publication_date' || name === 'income_date') {
            let date = e.target.value;
            dateVali(date, name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formKey = formValidation(form);
        if (formKey) {
            setVali({ ...vali, [formKey]: false });
            inputRefs[formKey].current.focus();
        } else {
            sendPostData(
                { url: `http://localhost:8000/newBook`, data: form },
                {
                    onSuccess: (data) => console.log(data),
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                    },
                }
            );
        }
    };
    return (
        <>
            <form className="formDesign" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <p className="inputTitle imgTitle">책 이미지</p>
                    <div className="imageInputBox">
                        <span className="imageInput">
                            <input
                                type="file"
                                name="image"
                                ref={inputRefs.image}
                                accept="image/jpg, image/jpeg, image/png"
                                onChange={(e) => handleChange(e)}
                            />
                            <i>
                                <FaCamera />
                                <span>이미지 등록</span>
                            </i>
                        </span>
                        {form.image === '' ? null : (
                            <span className="thumnail">
                                <Image img={form.image} />
                            </span>
                        )}
                        {!vali.image && <p className="noticeTxt">&#8251;이미지를 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">제목</p>
                    <div>
                        <input
                            type="text"
                            placeholder="책 제목을 입력해 주세요."
                            ref={inputRefs.book_name}
                            name="book_name"
                            value={form.book_name}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.book_name && <p className="noticeTxt">&#8251;타이틀을 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">저자</p>
                    <div>
                        <input
                            type="text"
                            placeholder="저자를 입력해 주세요."
                            ref={inputRefs.author}
                            name="author"
                            value={form.author}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.author && <p className="noticeTxt">&#8251;저자를 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판사</p>
                    <div>
                        <input
                            type="text"
                            placeholder="출판사를 입력해 주세요."
                            ref={inputRefs.publisher}
                            name="publisher"
                            value={form.publisher}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.publisher && <p className="noticeTxt">&#8251;출판사를 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판일</p>
                    <div>
                        <input
                            type="date"
                            name="publication_date"
                            ref={inputRefs.publication_date}
                            value={form.publication_date}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.publication_date && <p className="noticeTxt">&#8251;출판일 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">구입일</p>
                    <div>
                        <input
                            type="date"
                            name="income_date"
                            ref={inputRefs.income_date}
                            value={form.income_date}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.income_date && <p className="noticeTxt">&#8251;구입일 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">내용</p>
                    <div>
                        <textarea
                            name="memo"
                            placeholder="책에 관한 정보를 입력해 주세요."
                            ref={inputRefs.memo}
                            value={form.memo}
                            onChange={(e) => handleChange(e)}
                        />
                        {!vali.memo && <p className="noticeTxt">&#8251;책에 관한 정보를 등록 해주세요.</p>}
                    </div>
                </div>

                {props.type === 'bookRegister' && (
                    <div className="inputContainer">
                        <p className="inputTitle">구매경로</p>
                        <div>
                            <ul className="radioBtn">
                                <li>
                                    <input
                                        type="radio"
                                        checked={form.income_type === 'companyBuy'}
                                        name="income_type"
                                        value="companyBuy"
                                        id="companyBuy"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label htmlFor="companyBuy">회사구매</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        checked={form.income_type === 'present'}
                                        name="income_type"
                                        value="present"
                                        id="present"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label htmlFor="present">기부</label>
                                </li>

                                {form.income_type === 'present' && (
                                    <li>
                                        <input
                                            type="text"
                                            ref={inputRefs.income_method}
                                            placeholder="이름"
                                            name="income_method"
                                            value={form.income_method}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </li>
                                )}
                                {!vali.income_method && <p className="noticeTxt">&#8251;기부자를 등록 해주세요.</p>}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="inputContainer">
                    <p className="inputTitle">장르</p>
                    <div>
                        <select
                            className="signemailselect"
                            name="genre"
                            onChange={(e) => handleChange(e)}
                            value={form.genre}
                        >
                            <option value="General">일반</option>
                            <option value="Development">개발</option>
                            <option value="Marketing">마케팅</option>
                        </select>
                    </div>
                </div>
                {props.type === 'bookModify' && (
                    <div className="inputContainer">
                        <p className="inputTitle">상태(선택)</p>
                        <div>
                            <select
                                className="signemailselect"
                                name="status"
                                onChange={(e) => handleChange(e)}
                                value={form.genre}
                            >
                                <option value="Stock">재고</option>
                                <option value="Rented">대여</option>
                            </select>
                        </div>
                    </div>
                )}

                {props.type === 'bookModify' ? (
                    <button className="submitBtn">수정하기</button>
                ) : (
                    <button className="submitBtn">등록하기</button>
                )}
            </form>
        </>
    );
}
