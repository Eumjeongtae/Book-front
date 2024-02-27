import { useState } from 'react';
import Decision from '../components/Decision';
import History from '../components/History';
import RentBook from '../components/RentBook';
import '../style/mypage/mypage.css';
import { useFetchData } from '../api/apiUtils';
import { getUser } from '../util/localStorage';

export default function Mypage() {
    const [tab, setTab] = useState('history');
    const userInfo = getUser() ? getUser().userInfo : '';

    const url = `http://localhost:8000/product/myPage/${userInfo.id_idx}/${tab}`;
    const { data, isLoading, error } = useFetchData(url);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    // if (!data || data.length === 0) return <div>No data found</div>;

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
                {tab === 'history' && <History data={data} />}
                {tab === 'rent' && <RentBook data={data} url={url} />}
                {tab === 'decision' && <Decision data={data} />}
            </section>
        </main>
    );
}
