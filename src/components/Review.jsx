import { useState } from 'react';
import '../style/review/review.css'
import Score from './Score';


export default function Review(props) {

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');

    const submitReview = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="review-popup">
                <div className="review-popup-inner">
                    <h2>재미있게 읽으셨나요?</h2>
                    <Score score={0} type='writeReview' />
                    <div>
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className='reviewBtn' >
                        <button type="button" >작성 완료</button>
                        <button type='button' onClick={()=>props.closeReviewPopup(false)}>닫기</button>
                    </div>

                </div>
            </div>
        </>
    );
}