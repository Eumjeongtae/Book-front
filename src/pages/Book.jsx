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
import { useEffect, useState } from 'react';
import { getUser } from '../util/localStorage';
import { usePostData } from '../api/apiPost';
import { useQueryClient } from 'react-query';
import useBookActions from '../hooks/useBookActions';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일링
import Calendar from '../components/Calendar';
import { getgenre } from '../util/getgenre';
import { formatDate } from '../util/formatDate';

export default function Book() {
    const queryClient = useQueryClient(); // QueryClient 인스턴스를 얻음
    const userInfo = getUser() ? getUser().userInfo : '';
    const { id } = useParams();
    const url = `http://localhost:8000/product/detail/${id}/${userInfo.id_idx}`;
    const { data, isLoading, error } = useFetchData(url);
    const { mutate: sendPostData } = usePostData();
    const [reviewBtn, setReviewBtn] = useState(false);
    const [viewCalendar, setViewCalendar] = useState(false);
    const { returnBook, reservationBook, reservationCancelBook } = useBookActions();
    const [averageScore, setAverageScore] = useState(0); // 평균 점수 상태
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (data?.bookReviews && data.bookReviews.length > 0) {
            const totalScore = data.bookReviews.reduce((acc, curr) => acc + curr.score, 0);
            const avgScore = totalScore / data.bookReviews.length;
            setAverageScore(avgScore.toFixed(1)); // 소수점 첫째 자리까지 반올림
        } else {
            setAverageScore(0); // 리뷰가 없을 경우 평균 점수를 0으로 설정
        }
    }, [data?.bookReviews]); // data.bookReviews 변경될 때마다 useEffect 실행

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data.bookDetails || data.bookDetails.length === 0) return <div>No data found</div>;


    const closeReviewPopup = (e) => setReviewBtn(e);

    const handleLike = () => {
        setIsButtonDisabled(true);
        try {
            sendPostData(
                {
                    url: `http://localhost:8000/product/like`,
                    data: {
                        user_id: userInfo.id_idx,
                        book_id: data.bookDetails.id,
                        user_liked: data.likesDetails.user_likes,
                    },
                },
                {
                    onSuccess: (result) => {
                        queryClient.invalidateQueries([url]);
                        setTimeout(() => {
                            setIsButtonDisabled(false);
                        }, 800);
                    },
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                        alert('좋아요 오류')
                        setTimeout(() => {
                            setIsButtonDisabled(false);
                        }, 800);
                    },
                }
            );
        } catch (error) {
            console.log('좋아요버튼 에러' + error);
        }
    };

    const rentBtn = () => {
        //책이 예약중인데 대여자와 로그인 아이디가 같음
        if (data.rentalHistory?.user_id === userInfo.id_idx && data.rentalHistory?.return_status === 0) {
            return (
                <button type="button" onClick={() => returnBook(data.bookDetails.id, url)}>
                    반납하기
                </button>
            );
            //책이 예약중
        } else if (data.bookDetails.status === 1) {
            return (
                <button type="button" className="canNotRent">
                    대여불가
                </button>
            );
            //책 대여가능
        } else if (data.bookDetails.status === 0) {
            return (
                <button type="button" onClick={() => setViewCalendar(!viewCalendar)}>
                    대여하기
                </button>
            );
        }
    };

    const handleReserve = () => {
        if (data.rentalHistory?.user_id === userInfo.id_idx && data.rentalHistory?.return_status === 0) {
            alert('현재 대여하고 계신 책 입니다.');
            return;
        } else if (data.bookReservation && data.bookReservation.reservation_status === 0) {
            let userResponse = window.confirm(`예약중이신 책 입니다 예약 취소 하시겠습니까?`);
            if (userResponse) {
                reservationCancelBook(data.bookDetails.id, url);
            }
        } else if (data.bookDetails.status === 1) {
            let userResponse = window.confirm(`책을 예약 하시겠습니까?`);
            if (userResponse) {
                reservationBook(data.bookDetails.id, url);
            }
        } else if (data.bookDetails.status === 0) {
            alert('현재 책 대여가 가능합니다.');
            return;
        }
    };

    return (
        <section className="bookDetailsection">
            <div className="inner">
                <main>
                    <section className="detailItem">
                        <div className="detailItemImage">
                            <Image img={data.bookDetails.image} className="detailImage" />
                        </div>
                        <div className="detailItemInfo">
                            <ul>
                                <li className="bookTitle">{data.bookDetails.book_name}</li>
                                <li>
                                    <b>장르</b> <span>{getgenre(data.bookDetails.genre)}</span>{' '}
                                </li>
                                <li>
                                    <b>배급사</b> <span>{data.bookDetails.publisher}</span>{' '}
                                </li>
                                <li>
                                    <b>작가</b> <span>{data.bookDetails.author}</span>
                                </li>
                                <li>
                                    <b>출판일</b> <span>{formatDate(data.bookDetails.publication_date)}</span>
                                </li>
                                <li>
                                    <b>메모</b>{' '}
                                    <span>{data.bookDetails.memo ? data.bookDetails.memo : '메모 없음'}</span>
                                </li>
                                <li className="infoBtn">
                                    <button type="button" disabled={isButtonDisabled} onClick={handleLike}>
                                        {data.likesDetails.user_likes ? <IoIosHeart /> : <IoIosHeartEmpty />}
                                        <span>{data.likesDetails.total_likes}</span>
                                    </button>
                                    {data.bookReservation && data.bookReservation.reservation_status === 0 ? (
                                        <button type="button" onClick={() => handleReserve()}>
                                            <PiShoppingBagFill />
                                            <span>예약 취소하기</span>
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => handleReserve()}>
                                            <PiShoppingBag />
                                            <span>예약 하기</span>
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="wishList reviewList">
                        <div className="container1">
                            <div>
                                <div className="starBox">
                                    <p className="starNum">{averageScore}</p>
                                    <Score score={averageScore} />
                                </div>
                                <div className="middle"></div>
                                <div className="percentBox">
                                    <p>{((averageScore / 5) * 100).toFixed()}%</p>
                                    <span>만족후기</span>
                                </div>
                            </div>
                        </div>
                        {data.bookReviews.length ? (
                            <>
                                <ul className="review">
                                    {data?.bookReviews.map((v, i) => (
                                        <li key={i}>
                                            <div className="reviewContent">
                                                <div className="buyerName">
                                                    <div className="buyer">{v.email}</div>
                                                </div>
                                                <Score score={v.score} />
                                                <div className="reviewTxt">{v.title}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="noList">리뷰가 없습니다.</p>
                        )}
                    </section>
                </main>
            </div>
            <div className="detailItemBtn">
                <div className="inner">
                    {viewCalendar && (
                        <p className="reserveCalendar">
                            <Calendar book_id={data.bookDetails.id} />
                        </p>
                    )}

                    <p>
                        <button type="button" onClick={() => setReviewBtn(true)}>
                            리뷰쓰기
                        </button>
                    </p>
                    <p>{rentBtn()}</p>
                </div>
            </div>
            {reviewBtn && (
                <Review type="bookDetail" closeReviewPopup={closeReviewPopup} book_id={data.bookDetails.id} />
            )}
        </section>
    );
}
