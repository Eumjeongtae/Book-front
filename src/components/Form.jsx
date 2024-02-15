
import { useState } from 'react';
import '../style/form/form.css';
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import Image from './Image';
import { dateCheck } from '../util/dateCheck';
// import { usePostData } from '../api/apiPost';


export default function Form(props) {

    let [form, setForm] = useState({ 'img': '', 'title': '', 'Publisher': '', 'Author': '', 'PublishDate': '', 'PurchaseDate': '', 'BookInfo': '', 'Category': 'General' });
    const [donaition, setDonaition] = useState(false);
    // const { mutate: sendPostData} = usePostData();
    // sendPostData({ url: '', data: '' })


    console.log(form);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value }); //input 값 onChange시 value값 재 할당

        if (name === 'img') {
            const formData = new FormData();

            formData.append("file", e.target.files[0])
            // for (const key of formData) console.log(`key---->>> ${key}`);

            axios.post('http://localhost:8000/imgupload', formData)
                .then((result) => {
                    setForm({ ...form, img: result.data })
                });

        }

        if (name === 'PublishDate') {
            let date = e.target.value;
            if (dateCheck(date)) setForm({ ...form, PublishDate: date })
            else {
                setForm({ ...form, PublishDate: '' })
                alert('오늘 날짜 까지만 선택 가능합니다!')
            }
        }
        if (name === 'PurchaseDate') {
            let date = e.target.value;
            if (dateCheck(date)) setForm({ ...form, PurchaseDate: date })
            else {
                setForm({ ...form, PurchaseDate: '' })
                alert('오늘 날짜 까지만 선택 가능합니다!')
            }
        }

    }
    return (
        <>
            <form className='formDesign'>

                <div className="inputContainer">
                    <p className="inputTitle imgTitle">책 이미지</p>
                    <div className="imageInputBox">
                        <span className="imageInput">
                            <input type="file" name='img' accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleChange(e)} />
                            <i>
                                <FaCamera />
                                <span>이미지 등록</span></i>
                        </span>
                        {form.img === '' ? null :
                            <span className='thumnail'>
                                <Image img={form.img} />
                            </span>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">제목</p>
                    <div>
                        <input type="text" placeholder='책 제목을 입력해 주세요.' name='title' value={form.title} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">저자</p>
                    <div>
                        <input type="text" placeholder='저자를 입력해 주세요.' name='Author' value={form.Author} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판사</p>
                    <div>
                        <input type="text" placeholder='출판사를 입력해 주세요.' name='Publisher' value={form.Publisher} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판일</p>
                    <div>
                        <input type="date" name='PublishDate' value={form.PublishDate} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">구입일</p>
                    <div>
                        <input type="date" name='PurchaseDate' value={form.PurchaseDate} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">내용</p>
                    <div>
                        <textarea name='BookInfo' placeholder='책에 관한 정보를 입력해 주세요.' value={form.BookInfo} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">구매경로</p>
                    <div>
                        <ul className='radioBtn'>
                            <li><input type="radio" name="radioBtn" id='companyBuy' onChange={() => setDonaition(false)} /><label htmlFor='companyBuy'>회사구매</label></li>
                            <li><input type="radio" name="radioBtn" id='present' onChange={() => setDonaition(true)} /><label htmlFor='present'>기부</label></li>
                            {donaition && <li><input type="text" placeholder='이름' /></li>}
                        </ul>
                    </div>
                </div>
                <div className="inputContainer">
                    <p className="inputTitle">카테고리</p>
                    <div>
                        <select className="signemailselect" name="Category" onChange={(e) => handleChange(e)} value={form.Category}>
                            <option value='General'>일반</option>
                            <option value='Development'>개발</option>
                            <option value='Marketing'>마케팅</option>
                        </select>
                    </div>
                </div>

                <button className='submitBtn'>등록하기</button>
            </form >
        </>
    )
}