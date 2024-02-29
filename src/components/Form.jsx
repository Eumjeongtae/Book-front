import { useRef, useState } from 'react';
import '../style/form/form.css';
import { FaCamera } from 'react-icons/fa';
import Image from './Image';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePostData } from '../api/apiPost';
import { formValidation } from '../util/formValidation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDateToMySQL } from '../util/formatDateToMySQL';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../util/formatDate';

export default function Form(props) {
    const navigate = useNavigate();
    const initialState = {
        image: null,
        book_name: '',
        publisher: '',
        author: '',
        publication_date: formatDateToMySQL(new Date()),
        income_date: formatDateToMySQL(new Date()),
        memo: null,
        income_type: 0,
        income_method: null,
        genre: 3,
        status: 0,
    };
    const [form, setForm] = useState(() => (props.type === 'bookModify' ? props.info : initialState));
    const [vali, setVali] = useState({
        book_name: true,
        publisher: true,
        author: true,
        income_method: true,
    });

    const { imageUpload } = useImageUpload();
    const { mutate: sendPostData } = usePostData();

    const inputRefs = {
        book_name: useRef(null),
        author: useRef(null),
        publisher: useRef(null),
        income_method: useRef(null),
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setVali({ ...vali, [name]: true });

        if (name === 'image' && e.target.files.length) {
            let imgPath = await imageUpload(e.target.files[0]);
            setForm({ ...form, image: imgPath });
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
                {
                    url: `${
                        props.type === 'bookModify'
                            ? 'http://localhost:8000/manager/edit'
                            : 'http://localhost:8000/manager'
                    }`,
                    data: form,
                },
                {
                    onSuccess: (data) => navigate('/list/0'),
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
                                accept="image/jpg, image/jpeg, image/png"
                                onChange={(e) => handleChange(e)}
                            />
                            <i>
                                <FaCamera />
                                <span>이미지 등록</span>
                            </i>
                        </span>
                        {!form.image ? null : (
                            <span className="thumnail">
                                <Image img={form.image} />
                            </span>
                        )}
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
                        <DatePicker
                            selected={form.publication_date}
                            onChange={(date) => setForm({ ...form, publication_date: formatDateToMySQL(date) })}
                            maxDate={new Date()}
                        />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">구입일</p>
                    <div>
                        <DatePicker
                            selected={form.income_date}
                            onChange={(date) => setForm({ ...form, income_date: formatDateToMySQL(date) })}
                            maxDate={new Date()}
                        />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">메모</p>
                    <div>
                        <textarea
                            name="memo"
                            placeholder="책에 관한 정보를 입력해 주세요."
                            value={form.memo}
                            onChange={(e) => handleChange(e)}
                        />
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
                                        checked={form.income_type === 0}
                                        name="income_type"
                                        value={0}
                                        id="companyBuy"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label htmlFor="companyBuy">회사구매 온러안</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        checked={form.income_type === 1}
                                        name="income_type"
                                        value={0}
                                        id="companyBuy"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label htmlFor="companyBuy">회사구매 오프라인</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        checked={form.income_type === 2}
                                        name="income_type"
                                        value={2}
                                        id="present"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label htmlFor="present">기부</label>
                                </li>

                                {form.income_type === 2 && (
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
                            <option value="3">일반</option>
                            <option value="1">개발</option>
                            <option value="2">마케팅</option>
                        </select>
                    </div>
                </div>
                {props.type === 'bookModify' && (
                    <>
                        <div className="inputContainer">
                            <p className="inputTitle">상태(선택)</p>
                            <div>
                                <select
                                    className="signemailselect"
                                    name="status"
                                    onChange={(e) => handleChange(e)}
                                    value={form.genre}
                                >
                                    <option value="0">재고</option>
                                    <option value="1">대여</option>
                                </select>
                            </div>
                        </div>

                        <table striped bordered className="customTable">
                            <thead>
                                <tr>
                                    <th>대여자 이름</th>
                                    <th>대여일자</th>
                                    <th>반납일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.rentalHistory.length &&
                                    props.rentalHistory.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.borrower_name}</td>
                                            <td>{formatDate(data.rent_date)}</td>
                                            <td>{data.return_date ? formatDate(data.return_date) : '대여중'}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
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
