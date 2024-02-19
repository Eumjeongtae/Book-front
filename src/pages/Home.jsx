import React, { useEffect } from 'react'; // useEffect를 import합니다.
import '../style/main/main.css';
import ProductList from '../components/ProductList';
import { getUser } from "../util/localStorage";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const userInfo = getUser() ? getUser().userInfo : null; // userInfo가 없을 경우 null을 반환하도록 수정




    // userInfo가 있는 경우에만 ProductList를 렌더링
    return userInfo ? (
        <div className='inner'>
            <ProductList />
        </div>
    ) : null; // userInfo가 없는 경우 null을 반환하거나 로딩 컴포넌트를 렌더링할 수 있습니다.
}
