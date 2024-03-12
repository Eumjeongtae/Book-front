import { useState } from 'react';
import { formatDate } from '../util/formatDate';
import Calendar from './Calendar';

export default function Decision({ bookStatus, book_id, return_date }) {
    const [viewCalendar, setViewCalendar] = useState(false);

    const decisionView = () => {
        return (
            <>
                {bookStatus === 0 ? (
                    <>
                        <p className="rentDate">재고 있음 </p>
                        <p>
                            <button onClick={() => setViewCalendar(!viewCalendar)}>대여하기</button>
                            {viewCalendar && (
                                <div className="calendar">
                                    <Calendar book_id={book_id} />
                                </div>
                            )}
                        </p>
                    </>
                ) : (
                    <>
                        <p className="rentDate">
                            반납 예정일 <span>{formatDate(return_date)}</span>
                        </p>
                        <p>
                            <button className="cantRent">대여불가</button>
                        </p>
                    </>
                )}
            </>
        );
    };

    return decisionView();
}
