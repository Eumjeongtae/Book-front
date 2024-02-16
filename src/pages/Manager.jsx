// import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useFetchData } from '../api/apiUtils';
import '../style/manager/manager.css';
import { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

export default function Manager() {
    const navigate = useNavigate();
    const url = `http://localhost:8000/product`;
    const { data, isLoading, error } = useFetchData(url);
    const [tab, setTab] = useState('check');


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;

    const handleClick = (tab) => setTab(tab);

    return (
        <section className='inner'>
            <ul className="adminPageTabBtn">
                <li className={tab === 'check' ? 'on' : ''} onClick={() => handleClick('check')}>책 조회</li>
                <li className={tab === 'regiseter' ? 'on' : ''} onClick={() => handleClick('regiseter')}>책 등록</li>
            </ul>
            {tab === 'check' ? <table striped bordered className='customTable'>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>카테고리</th>
                        <th>구입일자</th>
                        <th>상태</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.title}</td>
                            <td>{item.Category}</td>
                            <td>{item.PurchaseDate}</td>
                            <td>{item.Status} {item.Status === 'overdue' && <button>메일 보내기</button>} {item.Status === 'Stock' && <button>상태보기</button>}</td>
                            <td><button onClick={() =>navigate(`/modify/${i}`)}>수정하기</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
                :
                <Form type='bookRegister' />
            }

        </section>

    );
}