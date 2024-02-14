import { useState } from 'react';
import Decision from '../components/Decision';
import History from '../components/History';
import RentBook from '../components/RentBook';
import '../style/mypage/mypage.css';
import { useFetchData } from '../api/apiUtils';

export default function Mypage() {
    const [tab, setTab] = useState('history');
    const handleClick = (tab) => setTab(tab)

    const url = "http://localhost:8000/product";
    const { data, isLoading, error } = useFetchData(url);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    


    return (
        <main className="inner">
            <ul className="mypageTabBtn">
                <li className={tab === 'history' ? 'on' : ''} onClick={() => handleClick('history')}>히스토리</li>
                <li className={tab === 'rent' ? 'on' : ''} onClick={() => handleClick('rent')}>현재 대여한 책</li>
                <li className={tab === 'decision' ? 'on' : ''} onClick={() => handleClick('decision')}> 찜한 책 리스트</li>
            </ul>
            <section>
                {tab === 'history' && <History data={data}/>}
                {tab === 'rent' && <RentBook data={data} />}
                {tab === 'decision' && <Decision data={data} />}
            </section>
        </main>
    );
}