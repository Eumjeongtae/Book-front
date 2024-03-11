import React, { useEffect, useState } from 'react';
import '../style/main/main.css';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

export default function Home() {
    const { genre } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    const [url, setUrl] = useState('');

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize + 1;
        const endIndex = currentPage * pageSize;
        setUrl(`http://localhost:8000/product/${genre}/${startIndex}/${endIndex}`);
    }, [currentPage, pageSize, genre]);

    const getgenre = () => {
        if (genre === '0') {
            return 'Preview';
        } else if (genre === '1') {
            return 'Development';
        } else if (genre === '2') {
            return 'Marketing';
        } else {
            return 'General';
        }
    };

    const { data, isLoading, error } = useFetchData(url);

    // 여기서 totalCount를 업데이트하는 로직이 필요할 수 있습니다.
    // 예: 서버로부터 받은 데이터에 totalCount가 포함되어 있다고 가정합니다.

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="inner noBook">아직 관련 서적이 없습니다.</div>;

    return (
        <>
            {genre === '0' && <section className="banner"></section>}

            <div className="inner">
                <h2 className="subTitle">{getgenre()}</h2>
                <ProductList data={data.books} />

                {genre !== '0' ? (
                    <Pagination
                        current={currentPage}
                        total={data?.total}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                ) : null}
            </div>
        </>
    );
}
