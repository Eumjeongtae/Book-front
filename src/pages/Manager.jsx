import { useFetchData } from '../api/apiUtils';
import '../style/manager/manager.css';
import { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../util/localStorage';
import { genre } from '../util/genre';
import { formatDate } from '../util/formatDate';

export default function Manager() {
    const userInfo = getUser() ? getUser().userInfo : '';

    const navigate = useNavigate();
    const urlInfo = `http://localhost:8000/manager/${userInfo?.id_idx}`;
    const { data, isLoading, error } = useFetchData(urlInfo);
    const [tab, setTab] = useState('check');

    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    const handleClick = (tab) => setTab(tab);

    const checkDay = (date) => {
        const currentDate = new Date();
        const expectedDate = new Date(date);
        return currentDate.toDateString() > expectedDate.toDateString() ? (
            <>
                연체<button>메일 보내기</button>
            </>
        ) : (
            '대여중'
        );
    };

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
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.book_name}</td>
                                <td>{genre(item.genre)}</td>
                                <td>{formatDate(item.income_date)}</td>
                                <td>
                                    {item.status === 0 ? (
                                        <>
                                            재고있음
                                            <button onClick={() => navigate(`/detail/${item.book_id}`)}>
                                                상태보기
                                            </button>
                                        </>
                                    ) : (
                                        checkDay(item.expected_return_date)
                                    )}
                                    {/* {item.status === 1 && <button>메일 보내기</button>}{' '} */}
                                </td>
                                <td>
                                    <button onClick={() => navigate(`/modify/${i}`)}>수정하기</button>
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
