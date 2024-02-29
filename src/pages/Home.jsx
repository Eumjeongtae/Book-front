import React, { useEffect, useState } from 'react';
import '../style/main/main.css';
import ProductList from '../components/ProductList';
import { getUser } from '../util/localStorage';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

export default function Home() {
    const userInfo = getUser() ? getUser().userInfo : null;
    const { genre } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(4); // 예시로 4를 설정했지만, 서버로부터 받아와야 합니다.
    const [pageSize, setPageSize] = useState(2);

    const [url, setUrl] = useState("");

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize + 1;
        const endIndex = currentPage * pageSize;
        setUrl(`http://localhost:8000/product/${genre}/${startIndex}/${endIndex}`);
    }, [currentPage, pageSize, genre]);

    const { data, isLoading, error } = useFetchData(url);

    // 여기서 totalCount를 업데이트하는 로직이 필요할 수 있습니다.
    // 예: 서버로부터 받은 데이터에 totalCount가 포함되어 있다고 가정합니다.

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="inner noBook">아직 관련 서적이 없습니다.</div>;

    return userInfo ? (
        <div className="inner">
            <ProductList data={data} />

            <Pagination
                current={currentPage}
                total={totalCount}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    ) : null;
}
