import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import Product from '../components/Product';
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
import { formatDateToMySQL } from '../util/formatDateToMySQL';

export default function Book() {
    const queryClient = useQueryClient(); // QueryClient 인스턴스를 얻음
    const userInfo = getUser() ? getUser().userInfo : '';
    const { id } = useParams();
    const url = `http://localhost:8000/product/detail/${id}/${userInfo.id_idx}`;
    const { data, isLoading, error } = useFetchData(url);
    const { mutate: sendPostData } = usePostData();
    const [reviewBtn, setReviewBtn] = useState(false);

    // console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    console.log(data);

    const rentBtn = () => {
        if (data.rentData && data.rentData.return_status === 0 && data.rentData.user_id === userInfo.id_idx) {
            return (
                <button type="button" onClick={() => handleReturn()}>
                    반납하기
                </button>
            );
        } else if (data.rentData && data.rentData.return_status === 0 && data.rentData.user_id !== userInfo.id_idx) {
            return (
                <button type="button" className="canNotRent">
                    대여불가
                </button>
            );
        } else {
            return (
                <button type="button" onClick={() => handleRent()}>
                    대여하기
                </button>
            );
        }
    };

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

    const handleRent = () => {
        let now = new Date();
        const twoWeeksLater = new Date(now.getTime() + 12096e5); // 2주는 대략 12096e5 밀리초
        twoWeeksLater.setHours(0, 0, 0, 0); // 시, 분, 초, 밀리초를 0으로 설정
        const rent_date = formatDateToMySQL(now);
        const expected_return_date = formatDateToMySQL(twoWeeksLater);

        const dateOnly = expected_return_date.split(' ')[0]; // 공백을 기준으로 분리하고 첫 번째 부분(날짜)만 선택

        let userResponse = window.confirm(`${dateOnly}까지 반납해야 합니다 대여 하시겠습니까?`);
        if (userResponse) {
            sendPostData(
                {
                    url: `http://localhost:8000/product/rent`,
                    data: {
                        user_id: userInfo.id_idx,
                        book_id: data.bookData.id,
                        rent_date,
                        expected_return_date,
                    },
                },
                {
                    onSuccess: (result) => queryClient.invalidateQueries([url]),
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                    },
                }
            );
        }
    };
    const handleReturn = () => {
        let userResponse = window.confirm(`반납 하시겠습니까?`);
        if (userResponse) {
            sendPostData(
                {
                    url: `http://localhost:8000/product/return`,
                    data: {
                        user_id: userInfo.id_idx,
                        book_id: data.bookData.id,
                    },
                },
                {
                    onSuccess: (result) => queryClient.invalidateQueries([url]),
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
                                    <b>카테고리</b> <span>{data.bookData.genre}</span>{' '}
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
                                    <button type="button">
                                        <PiShoppingBag />
                                        <span>찜하기</span>
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
                                    {/* { */}
                                    {/* reviewList.map(v => */}
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
                                    {/* ) */}
                                    {/* } */}
                                </ul>
                            </>
                        ) : (
                            <p className="noList">상점후기가 없습니다.</p>
                        )}
                    </section>
                </main>
            </div>
            <ul className="detailItemBtn">
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
