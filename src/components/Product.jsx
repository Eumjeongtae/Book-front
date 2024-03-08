import Image from './Image';
import { Link } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useState } from 'react';
import { formatDate } from '../util/formatDate';
import Review from './Review';

export default function Product(props) {
    const [viewCalendar, setViewCalendar] = useState(false);
    const [reviewBtn, setReviewBtn] = useState(false);

    const closeReviewPopup = (e) => setReviewBtn(e);

    return (
        <div>
            <Link to={`/detail/${props.data.book_id}`} className="imgList">
                <Image img={props.data.image} class={props.class} />
            </Link>

            <div className="info">
                {/* default */}
                <Link to={`/detail/${props.data.book_id}`}>
                    <p className="title">{props.data.book_name}</p>
                    <p className="author">{props.data.author}</p>
                </Link>

                {props.type === 'myPageHistory' && (
                    <>
                        <p className="rentDate">
                            대여일자 <span>{formatDate(props.data.rent_date)}</span>{' '}
                        </p>
                        <p className="returnDate">
                            반납일자 <span>{formatDate(props.data.return_date)}</span>{' '}
                        </p>
                    </>
                )}
                {props.type === 'myPageRentBook' && (
                    <>
                        <p className="rentDate">
                            반납 예정일 <span>{formatDate(props.data.expected_return_date)}</span>
                        </p>
                        <p>
                            <button onClick={() => setReviewBtn(true)}>반납하기</button>
                            {reviewBtn && (
                                <Review
                                    closeReviewPopup={closeReviewPopup}
                                    book_id={props.data.book_id}
                                    url={props.url}
                                />
                            )}
                        </p>
                    </>
                )}
                {props.type === 'myPageDecision' && (
                    <>
                        {props.data.book_status === 0 ? (
                            <>
                                <p className="rentDate">재고 있음 </p>
                                <p>
                                    <button onClick={() => setViewCalendar(!viewCalendar)}>대여하기</button>
                                    {viewCalendar && (
                                        <div className="calendar">
                                            <Calendar book_id={props.data.book_id} />
                                        </div>
                                    )}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="rentDate">
                                    반납 예정일 <span>{formatDate(props.data.expected_return_date)}</span>
                                </p>
                                <p>
                                    <button className="cantRent">대여불가</button>
                                </p>
                            </>
                        )}

                        {/* <p>
                            {props.data.book_status === 0 ? (
                                <>
                                    <button onClick={() => setViewCalendar(!viewCalendar)}>대여하기</button>
                                    {viewCalendar && (
                                        <div className="calendar">
                                            <Calendar book_id={props.data.book_id} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button className="cantRent">대여불가</button>
                            )}
                        </p> */}
                    </>
                )}
            </div>
        </div>
    );
}
