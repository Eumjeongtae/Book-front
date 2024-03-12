import { useState } from 'react';
import { formatDate } from '../util/formatDate';
import Review from './Review';

export default function Rent({ return_date, book_id, url }) {
    const [reviewBtn, setReviewBtn] = useState(false);
    const closeReviewPopup = (e) => setReviewBtn(e);
    
    return (
        <>
            <p className="rentDate">
                반납 예정일 <span>{formatDate(return_date)}</span>
            </p>
            <p>
                <button onClick={() => setReviewBtn(true)}>반납하기</button>
                {reviewBtn && <Review closeReviewPopup={closeReviewPopup} book_id={book_id} url={url} />}
            </p>
        </>
    );
}
