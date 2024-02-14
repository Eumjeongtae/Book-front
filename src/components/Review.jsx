import { useState } from 'react';
import '../style/review/review.css'
import Score from './Score';


export default function Review(props) {

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');

    const submitReview = (e) => {
        e.preventDefault();
        // 여기에 리뷰 제출 로직을 추가하세요.
        console.log({ title, reviewText, rating });
    };

    return (
        <>
            <div className="review-popup">
                <div className="review-popup-inner">
                    <h2>재미있게 읽으셨나요?</h2>
                    <Score score={0} type='writeReview'/>
                    <form onSubmit={submitReview}>
                        <div>
                            <label htmlFor="reviewText">제목</label>
                            <textarea
                                id="reviewText"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        

                        <button type="submit">작성 완료</button>
                    </form>
                </div>
            </div>
        </>
    );
}