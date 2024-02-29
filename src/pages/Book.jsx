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
import { genre } from '../util/genre';
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
    useEffect(() => {
        if (data?.reviewList && data.reviewList.length > 0) {
            const totalScore = data.reviewList.reduce((acc, curr) => acc + curr.score, 0);
            const avgScore = totalScore / data.reviewList.length;
            setAverageScore(avgScore.toFixed(1)); // 소수점 첫째 자리까지 반올림
        } else {
            setAverageScore(0); // 리뷰가 없을 경우 평균 점수를 0으로 설정
        }
    }, [data?.reviewList]); // data.reviewList가 변경될 때마다 useEffect 실행

    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
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
        if (data.rentData?.user_id === userInfo.id_idx) {
            return (
                <button type="button" onClick={() => returnBook(data.bookData.id, url)}>
                    반납하기
                </button>
            );
            //책이 예약중
        } else if (data.bookData.status === 1) {
            return (
                <button type="button" className="canNotRent">
                    대여불가
                </button>
            );
            //책 대여가능
        } else if (data.bookData.status === 0) {
            return (
                <button type="button" onClick={() => setViewCalendar(!viewCalendar)}>
                    대여하기
                </button>
            );
        }
    };

    const handleReserve = () => {
        if (data.rentData?.user_id === userInfo.id_idx) {
            alert('현재 대여하고 계신 책 입니다.');
            return;
        } else if (data.reservationData) {
            let userResponse = window.confirm(`예약중이신 책 입니다 예약 취소 하시겠습니까?`);
            if (userResponse) {
                reservationCancelBook(data.bookData.id, url);
            }
        } else if (data.rentData && data.reservationData === false && data.bookData.status === 1) {
            let userResponse = window.confirm(`책을 예약 하시겠습니까?`);
            if (userResponse) {
                reservationBook(data.bookData.id, url);
            }
        } else if (data.bookData.status === 0) {
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
                                    <b>장르</b> <span>{genre(data.bookData.genre)}</span>{' '}
                                </li>
                                <li>
                                    <b>배급사</b> <span>{data.bookData.publisher}</span>{' '}
                                </li>
                                <li>
                                    <b>작가</b> <span>{data.bookData.author}</span>
                                </li>
                                <li>
                                    <b>출판일</b> <span>{formatDate(data.bookData.publication_date)}</span>
                                </li>
                                <li>
                                    <b>메모</b> <span>{data.bookData.memo ? data.bookData.memo : '메모 없음'}</span>
                                </li>
                                <li className="infoBtn">
                                    <button type="button" onClick={handleLike}>
                                        {data.bookData.user_liked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                                        <span>{data.bookData.like_count}</span>
                                    </button>
                                    {data.reservationData ? (
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
                        {data.reviewList ? (
                            <>
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
                                <ul className="review">
                                    {data?.reviewList.map((v, i) => (
                                        <li key={i}>
                                            <div className="reviewContent">
                                                <div className="buyerName">
                                                    <div className="buyer">{v.id}</div>
                                                </div>
                                                <Score score={v.score} />
                                                <div className="reviewTxt">{v.title}</div>
                                            </div>
                                        </li>
                                    ))}
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
            {reviewBtn && <Review type='bookDetail' closeReviewPopup={closeReviewPopup} book_id={data.bookData.id} />}
        </>
    );
}
