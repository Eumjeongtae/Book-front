import React, { useEffect } from 'react'; // useEffect를 import합니다.
import '../style/main/main.css';
import ProductList from '../components/ProductList';
import { getUser } from "../util/localStorage";
import { useNavigate } from 'react-router-dom';
import BarChart from '../components/BarChart';
import { useFetchData } from '../api/apiUtils';

export default function Landing() {
    const userInfo = getUser() ? getUser().userInfo : null; // userInfo가 없을 경우 null을 반환하도록 수정

    const url = "http://localhost:8000/product";
    const { data, isLoading, error } = useFetchData(url);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;

    // userInfo가 있는 경우에만 ProductList를 렌더링
    return userInfo ? (
        <div className='inner'>
            <section className='landingSection'>
                <h2 className='subTitle'>This month's new book</h2>
                <ProductList data={data}/>
            </section>
            <section className='landingSection landingChart'>
                <div >
                    <h2 className='subTitle'>like statistics</h2>
                    <BarChart list={data} type='like'/>
                </div>
                <div>
                    <h2 className='subTitle'>rentals statistics</h2>
                    <BarChart list={data} type='rental'/>
                </div>
            </section>
        </div>
    ) : null; // userInfo가 없는 경우 null을 반환하거나 로딩 컴포넌트를 렌더링할 수 있습니다.
}
