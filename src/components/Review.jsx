import { useState } from 'react';
import '../style/review/review.css';
import Score from './Score';
import { getUser } from '../util/localStorage';
import { usePostData } from '../api/apiPost';
import useBookActions from '../hooks/useBookActions';

export default function Review(props) {
    const { returnBook } = useBookActions();

    const [reviewText, setReviewText] = useState('');
    const [score, setScore] = useState(0);
    const userInfo = getUser() ? getUser().userInfo : '';
    const { mutate: sendPostData } = usePostData();

    const handleSubmut = () => {
        if (score === 0) {
            alert('별점을 주세요!');
            return;
        }
        if (reviewText === '') {
            alert('리뷰를 작성해주세요!');
            return;
        }
        try {
            sendPostData(
                {
                    url: `http://localhost:8000/review`,
                    data: { title: reviewText, score, user_id: userInfo.id_idx, book_id: props.book_id },
                },
                {
                    onSuccess: (data) => {
                        props.type !== 'bookDetail' && returnBook(props.book_id, props.url);
                        window.location.reload();
                    },
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                    },
                }
            );
        } catch (error) {
            console.log('리뷰 등록중 오류' + error);
        }
    };

    const getScore = (e) => setScore(e);

    return (
        <>
            <div className="review-popup">
                <div className="review-popup-inner">
                    <h2>재미있게 읽으셨나요?</h2>
                    <Score score={0} type="writeReview" getScore={getScore} />
                    <div>
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="reviewBtn">
                        <button onClick={handleSubmut}>작성 완료</button>
                        <button type="button" onClick={() => props.closeReviewPopup(false)}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
