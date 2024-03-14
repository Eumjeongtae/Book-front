import { useFetchData } from '../api/apiUtils';
import '../style/manager/manager.css';
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../util/localStorage';
import {  getgenre } from '../util/getgenre';
import { formatDate } from '../util/formatDate';
import useSendMail from '../hooks/useSendMail';

export default function Manager() {
    const userInfo = getUser() ? getUser().userInfo : '';
    const navigate = useNavigate();
    const urlInfo = `http://localhost:8000/manager/${userInfo?.id_idx}`;
    const { data, isLoading, error } = useFetchData(urlInfo);
    const [bookList, setBookList] = useState([]);
    const [tab, setTab] = useState('check');
    const { sendMail } = useSendMail();

    useEffect(() => {
        if (data && data.allBooks) {
            const updatedBookList = data.allBooks.map((book) => {
                const rentalInfo = data.bookHistory.find((history) => history.book_id === book.id);
                // 조건이 맞을시 history 반환
                return rentalInfo
                    ? {
                          ...book,
                          expected_return_date: rentalInfo.expected_return_date,
                          email: rentalInfo.email,
                          name: rentalInfo.name,
                      }
                    : book;
            });
            setBookList(updatedBookList);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleClick = (tab) => setTab(tab);

    const handleMailSubnit = (mail, book_name) => {
        sendMail(mail, book_name)
            .then((data) => alert('메일을 전송했습니다!'))
            .catch(console.error);
    };

    const checkDay = (date, email, book_name) => {
        const currentDate = new Date();
        const expectedDate = new Date(date);
        return currentDate.getTime() > expectedDate.getTime() ? (
            <>
                연체{' '}
                <button type="button" onClick={() => handleMailSubnit(email, book_name)}>
                    메일 보내기
                </button>
            </>
        ) : (
            <>대여중</>
        );
    };

    console.log(bookList);
    return (
        <section className="inner">
            <ul className="adminPageTabBtn">
                <li className={tab === 'check' ? 'on' : ''} onClick={() => handleClick('check')}>
                    책 조회
                </li>
                <li className={tab === 'regiseter' ? 'on' : ''} onClick={() => handleClick('regiseter')}>
                    책 등록
                </li>
            </ul>
            {tab === 'check' ? (
                <table striped bordered className="customTable">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>장르</th>
                            <th>구입일자</th>
                            <th>상태</th>
                            <th>대여자</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map((item, i) => (
                            <tr key={i}>
                                <td>{item.book_name}</td>
                                <td>{getgenre(item.genre)}</td>
                                <td>{formatDate(item.income_date)}</td>
                                {item.status === 0 ? (
                                    <>
                                        <td>재고있음</td>
                                        <td>.</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{checkDay(item.expected_return_date, item.email, item.book_name)}</td>
                                        <td>{item.name}</td>
                                    </>
                                )}
                                <td>
                                    <button onClick={() => navigate(`/modify/${item.id}`)}>수정하기</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Form type="bookRegister" />
            )}
        </section>
    );
}
