
import { useRef, useState } from 'react';
import '../style/form/form.css';
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import Image from './Image';
import { dateCheck } from '../util/dateCheck';
// import { imageUpload } from '../util/imageUpload';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePostData } from '../api/apiPost';
import { getUser } from "../util/localStorage";


export default function Form(props) {
    const userInfo = getUser() ? getUser().userInfo : '';
    const initialState = {
        'email': userInfo.email, 'image': '', 'title': '', 'Publisher': '', 'Author': '', 'PublishDate': '', 'PurchaseDate': '', 'BookInfo': '', 'bookPath': 'companyBuy', 'donaition': '', 'Category': 'General', 'Status': 'Stock'
    };
    const [form, setForm] = useState(() => props.type === 'bookModify' ? props.info : initialState);
    const [vali, setVali] = useState({ 'image': true, 'title': true, 'Publisher': true, 'PurchaseDate':true, 'Author': true, 'PublishDate': true, 'BookInfo': true, 'donaition': true })

    const { imageUpload } = useImageUpload();
    const { mutate: sendPostData } = usePostData();

    const inputImage = useRef(null)
    const inputTitle = useRef(null)
    const inputPublisher = useRef(null)
    const inputAuthor = useRef(null)
    const inputPublishDate = useRef(null)
    const inputPurchaseDate = useRef(null)
    const inputBookInfo = useRef(null)
    const inputdonaition = useRef(null)



    const handleChange = async (e) => {

        const { name, value } = e.target;
        setForm({ ...form, [name]: value }); //input 값 onChange시 value값 재 할당
        setVali({...vali, [name]:true})

        // valiArrChange(num, true)
        if (name === 'image' && e.target.files.length) {
            let imgPath = await imageUpload(e.target.files[0]);
            setForm({ ...form, image: imgPath });

        }

        if (name === 'PublishDate') {
            let date = e.target.value;
            if (dateCheck(date)) setForm({ ...form, PublishDate: date })
            else {
                setForm({ ...form, PublishDate: '' })
                setVali({...vali, 'PublishDate':false})
                alert('오늘 날짜 까지만 선택 가능합니다!')
            }
        }
        if (name === 'PurchaseDate') {
            let date = e.target.value;
            if (dateCheck(date)) setForm({ ...form, PurchaseDate: date })
            else {
                setForm({ ...form, PurchaseDate: '' })
                setVali({...vali, 'PurchaseDate':false})
                alert('오늘 날짜 까지만 선택 가능합니다!')
            }
        }
        if (name === 'bookPath' && value === 'companyBuy') {
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.image === '') {
            setVali({...vali,'image':false})
            return inputImage.current.focus();
        }
        if (form.title === '') {
            setVali({...vali,'title':false})
            return inputTitle.current.focus();
        }
        if (form.Author === '') {
            setVali({...vali,'Author':false})
            return inputAuthor.current.focus();

        }
        if (form.Publisher === '') {
            setVali({...vali,'Publisher':false})

            return inputPublisher.current.focus();

        }
        if (form.PublishDate === '') {
            setVali({...vali,'PublishDate':false})

            return inputPublishDate.current.focus();
        }
        if (form.PurchaseDate === '') {
            setVali({...vali,'PurchaseDate':false})

            return inputPurchaseDate.current.focus();

        }
        if (form.BookInfo === '') {
            setVali({...vali,'BookInfo':false})
            return inputBookInfo.current.focus();

        }

        if (form.bookPath === 'present' && form.donaition === '') {
            setVali({...vali,'donaition':false})
            return inputdonaition.current.focus();

        }

        sendPostData(
            { url: `http://localhost:8000/newBook`, data: form },
            {
                onSuccess: (data) => console.log(data)
                ,
                onError: (error) => {
                    // 요청이 실패했을 때 실행될 로직
                    console.error("에러 발생:", error);
                },
            }
        );


    }
    return (
        <>
            <form className='formDesign' onSubmit={handleSubmit}>

                <div className="inputContainer">
                    <p className="inputTitle imgTitle">책 이미지</p>
                    <div className="imageInputBox">
                        <span className="imageInput">
                            <input type="file" name='image' ref={inputImage} accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleChange(e)} />
                            <i>
                                <FaCamera />
                                <span>이미지 등록</span></i>
                        </span>
                        {form.image === '' ? null :
                            <span className='thumnail'>
                                <Image img={form.image} />
                            </span>}
                        {!vali.image && <p className="noticeTxt">&#8251;이미지를 등록 해주세요.</p>}

                    </div>

                </div>

                <div className="inputContainer">
                    <p className="inputTitle">제목</p>
                    <div>
                        <input type="text" placeholder='책 제목을 입력해 주세요.' ref={inputTitle} name='title' value={form.title} onChange={(e) => handleChange(e)} />
                        {!vali.title && <p className="noticeTxt">&#8251;타이틀을 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">저자</p>
                    <div>
                        <input type="text" placeholder='저자를 입력해 주세요.' ref={inputAuthor} name='Author' value={form.Author} onChange={(e) => handleChange(e)} />
                        {!vali.Author && <p className="noticeTxt">&#8251;저자를 등록 해주세요.</p>}
                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판사</p>
                    <div>
                        <input type="text" placeholder='출판사를 입력해 주세요.' ref={inputPublisher} name='Publisher' value={form.Publisher} onChange={(e) => handleChange(e)} />
                        {!vali.Publisher && <p className="noticeTxt">&#8251;출판사를 등록 해주세요.</p>}

                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">출판일</p>
                    <div>
                        <input type="date" name='PublishDate' ref={inputPublishDate} value={form.PublishDate} onChange={(e) => handleChange(e)} />
                        {!vali.PublishDate && <p className="noticeTxt">&#8251;출판일 등록 해주세요.</p>}

                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">구입일</p>
                    <div>
                        <input type="date" name='PurchaseDate' ref={inputPurchaseDate} value={form.PurchaseDate} onChange={(e) => handleChange(e)} />
                        {!vali.PurchaseDate && <p className="noticeTxt">&#8251;구입일 등록 해주세요.</p>}

                    </div>
                </div>

                <div className="inputContainer">
                    <p className="inputTitle">내용</p>
                    <div>
                        <textarea name='BookInfo' placeholder='책에 관한 정보를 입력해 주세요.' ref={inputBookInfo} value={form.BookInfo} onChange={(e) => handleChange(e)} />
                        {!vali.BookInfo && <p className="noticeTxt">&#8251;책에 관한 정보를 등록 해주세요.</p>}

                    </div>
                </div>


                {props.type === 'bookRegister' &&
                    <div className="inputContainer">
                        <p className="inputTitle">구매경로</p>
                        <div>
                            <ul className='radioBtn'>
                                <li><input type="radio" checked={form.bookPath === 'companyBuy'} name="bookPath" value='companyBuy' id='companyBuy' onChange={(e) => { handleChange(e); }} /><label htmlFor='companyBuy'>회사구매</label></li>
                                <li><input type="radio" checked={form.bookPath === 'present'} name="bookPath" value='present' id='present' onChange={(e) => { handleChange(e); }} /><label htmlFor='present'>기부</label></li>

                                {form.bookPath === 'present' && <li><input type="text" ref={inputdonaition} placeholder='이름' name='donaition' value={form.donaition} onChange={(e) => handleChange(e)} /></li>}
                                {!vali.donaition && <p className="noticeTxt">&#8251;기부자를 등록 해주세요.</p>}

                            </ul>
                        </div>
                    </div>
                }
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
                {props.type === 'bookModify' &&
                    <div className="inputContainer">
                        <p className="inputTitle">상태(선택)</p>
                        <div>
                            <select className="signemailselect" name="Status" onChange={(e) => handleChange(e)} value={form.Category}>
                                <option value='Stock'>재고</option>
                                <option value='Rented'>대여</option>
                            </select>
                        </div>
                    </div>
                }

                {props.type === 'bookModify' ?
                    <button className='submitBtn'>수정하기</button>
                    :
                    <button className='submitBtn'>등록하기</button>
                }


            </form >
        </>
    )
}