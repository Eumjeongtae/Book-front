import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBookActions from '../hooks/useBookActions';

export default function Calendar({ book_id }) {
    console.log(book_id);
    const { rentBook } = useBookActions();
    const [startDate, setStartDate] = useState(new Date()); // 오늘 날짜를 시작 날짜로 설정
    // 최소 날짜를 내일로 설정
    const aDayLater = new Date(new Date().setDate(new Date().getDate() + 1));
    // 최대 날짜를 오늘로부터 2주 후로 설정
    const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));
    const handleDateOnchange = (date) => {
        setStartDate(date);
        rentBook(date, book_id);
    };
    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => handleDateOnchange(date)}
                minDate={aDayLater} // 최소 날짜를 내일로 설정
                maxDate={twoWeeksLater} // 최대 날짜를 2주 후로 설정
                inline
            />
        </div>
    );
}
