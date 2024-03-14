import { useState } from 'react';

import '../style/mypage/mypage.css';
import { useFetchData } from '../api/apiUtils';
import { getUser } from '../util/localStorage';
import Product from '../components/Product';

export default function Mypage() {
    const [tab, setTab] = useState('history');
    const userInfo = getUser() ? getUser().userInfo : '';

    const url = `http://localhost:8000/product/myPage/${userInfo.id_idx}/${tab}`;
    const { data, isLoading, error } = useFetchData(url);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);
    return (
        <main className="inner">
            <ul className="mypageTabBtn">
                <li className={tab === 'history' ? 'on' : ''} onClick={() => setTab('history')}>
                    히스토리
                </li>
                <li className={tab === 'rent' ? 'on' : ''} onClick={() => setTab('rent')}>
                    현재 대여한 책
                </li>
                <li className={tab === 'decision' ? 'on' : ''} onClick={() => setTab('decision')}>
                    찜한 책 리스트
                </li>
            </ul>
            <section>
                {data.length ? (
                    <div className="category">
                        {data.map((book, i) => (
                            <Product data={book} class="myPageBook" url={url} key={i} type={tab} />
                        ))}
                    </div>
                ) : (
                    <p className="noList">관련 이력이 없습니다.</p>
                )}
            </section>
        </main>
    );
}
