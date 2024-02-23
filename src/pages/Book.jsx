import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import '../style/bookDetail/bookDetail.css';
import Image from '../components/Image';
import { IoIosHeartEmpty } from 'react-icons/io'; // 좋아요전
import { IoIosHeart } from 'react-icons/io'; // 좋아요 후
import { PiShoppingBag } from 'react-icons/pi';
import { PiShoppingBagFill } from 'react-icons/pi';
import Score from '../components/Score';
import Review from '../components/Review';
import { useState } from 'react';
import { getUser } from '../util/localStorage';
import { usePostData } from '../api/apiPost';
import { useQueryClient } from 'react-query';
import useBookActions from '../hooks/useBookActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일링
import Calendar from '../components/Calendar';
import { genre } from '../util/genre';

export default function Book() {
    const queryClient = useQueryClient(); // QueryClient 인스턴스를 얻음
    const userInfo = getUser() ? getUser().userInfo : '';
    const { id } = useParams();
    const url = `http://localhost:8000/product/detail/${id}/${userInfo.id_idx}`;
    const { data, isLoading, error } = useFetchData(url);
    const { mutate: sendPostData } = usePostData();
    const [reviewBtn, setReviewBtn] = useState(false);
    const [viewCalendar, setViewCalendar] = useState(false);
    const { returnBook } = useBookActions();

    // console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    console.log(data);

    const closeReviewPopup = (e) => setReviewBtn(e);

    const handleLike = () => {
        sendPostData(
            {
                url: `http://localhost:8000/product/like`,
                data: { user_id: userInfo.id_idx, book_id: data.bookData.id, user_liked: data.bookData.user_liked },
            },
            {
                onSuccess: (result) => queryClient.invalidateQueries([url]),
                onError: (error) => {
                    // 요청이 실패했을 때 실행될 로직
                    console.error('에러 발생:', error);
                },
            }
        );
    };

    const rentBtn = () => {
        //책이 예약중인데 대여자와 로그인 아이디가 같음
        if (data.rentData && data.rentData.user_id === userInfo.id_idx) {
            return (
                <button type="button" onClick={() => returnBook(data.bookData.id, url)}>
                    반납하기
                </button>
            );
            //책이 예약중인데 대여자와 로그인 아이디가 다름
        } else if (data.rentData && data.rentData.user_id !== userInfo.id_idx) {
            return (
                <button type="button" className="canNotRent">
                    대여불가
                </button>
            );
            //책 대여가능
        } else {
            return (
                <button type="button" onClick={() => setViewCalendar(!viewCalendar)}>
                    대여하기
                </button>
            );
        }
    };

    const handleReserve = () => {
        if (data.rentData && data.rentData.user_id === userInfo.id_idx) {
            alert('현재 대여하고 계신 책 입니다.');
            return;
        } else if (data.rentData && data.rentData.user_id !== userInfo.id_idx) {
            let userResponse = window.confirm(`책을 예약 하시겠습니까?`);
            if (userResponse) {
                console.log(1111);
            }
        } else {
            alert('현재 책 대여가 가능합니다.');
            return;
        }
    };

    return (
        <>
            <div className="inner">
                <main>
                    <section className="detailItem">
                        <div className="detailItemImage">
                            <Image img={data.bookData.image} className="detailImage" />
                        </div>
                        <div className="detailItemInfo">
                            <ul>
                                <li className="bookTitle">{data.bookData.book_name}</li>
                                <li>
                                    <b>장르</b> <span>{genre(data?.bookData.genre)}</span>{' '}
                                </li>
                                <li>
                                    <b>배급사</b> <span>{data.bookData.publisher}</span>{' '}
                                </li>
                                <li>
                                    <b>작가</b> <span>{data.bookData.author}</span>
                                </li>
                                <li>
                                    <b>출판일</b> <span>{data.bookData.publication_date}</span>
                                </li>
                                <li>
                                    <b>메모</b> <span>{data.bookData.memo ? data.bookData.memo : '메모 없음'}</span>
                                </li>
                                <li className="infoBtn">
                                    <button type="button" onClick={handleLike}>
                                        {data.bookData.user_liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                                        <span>{data.bookData.like_count}</span>
                                    </button>
                                    <button type="button" onClick={() => handleReserve()}>
                                        <PiShoppingBag />
                                        <span>예약하기</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="wishList reviewList">
                        {true ? (
                            <>
                                <div className="container1">
                                    <div>
                                        <div className="starBox">
                                            <p className="starNum">4</p>
                                            <Score score={4} />
                                        </div>
                                        <div className="middle"></div>
                                        <div className="percentBox">
                                            <p>100%</p>
                                            <span>만족후기</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="review">
                                    <li>
                                        <div className="reviewContent">
                                            <div className="buyerName">
                                                <div className="buyer">user123</div>
                                                <p className="buyerDate">10분전</p>
                                            </div>
                                            <Score score={4} />
                                            <div className="reviewTxt">
                                                하느님이 보우하사 우리 나라만세 무궁화 삼천리...
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="reviewContent">
                                            <div className="buyerName">
                                                <div className="buyer">test123</div>
                                                <p className="buyerDate">10분전</p>
                                            </div>
                                            <Score score={3} />
                                            <div className="reviewTxt">동해물과 백두산이 마르고 닳도록...</div>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <p className="noList">상점후기가 없습니다.</p>
                        )}
                    </section>
                </main>
            </div>
            <ul className="detailItemBtn">
                {viewCalendar && (
                    <li className="reserveCalendar">
                        <Calendar book_id={data.bookData.id} />
                    </li>
                )}

                <li>
                    <button type="button" onClick={() => setReviewBtn(true)}>
                        리뷰쓰기
                    </button>
                </li>
                <li>{rentBtn()}</li>
            </ul>
            {reviewBtn && <Review closeReviewPopup={closeReviewPopup} />}
        </>
    );
}
