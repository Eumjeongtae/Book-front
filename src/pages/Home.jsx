import React, { useEffect, useState } from 'react';
import '../style/main/main.css';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { mainChange } from '../modules/pageReducer';

export default function Home() {
    const { genre } = useParams();
    const pageSize = 6;
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.data.main);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        setUrl(`http://localhost:8000/product/${genre}/${startIndex}/${pageSize}`);
    }, [currentPage, genre]);

    const getgenre = () => {
        if (genre === '0') {
            return 'All';
        } else if (genre === '1') {
            return 'Development';
        } else if (genre === '2') {
            return 'Marketing';
        } else if (genre === '3') {
            return 'General';
        } else {
            return 'Preview';
        }
    };

    const { data, isLoading, error } = useFetchData(url);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="inner noBook">관련 서적이 없습니다.</div>;

    return (
        <>
            {genre === 'preview' && <section className="banner"></section>}

            <div className="inner">
                <h2 className="subTitle">{getgenre()}</h2>
                <ProductList data={data.books} />

                {genre !== 'preview' && (
                    <Pagination
                        current={currentPage}
                        total={data.total}
                        pageSize={pageSize}
                        onChange={(page) => dispatch(mainChange(page))}
                    />
                )}
            </div>
        </>
    );
}
