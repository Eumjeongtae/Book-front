import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../api/apiUtils';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { mainChange } from '../modules/pageReducer';
import React, { useEffect, useState } from 'react';
import { getgenre } from '../util/getgenre';

export default function ProductList() {
    const { genre } = useParams();
    const pageSize = 6;
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.data.main);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        setUrl(`http://localhost:8000/product/${genre}/${startIndex}/${pageSize}`);
    }, [currentPage, genre]);

    const { data, isLoading, error } = useFetchData(url);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="inner noBook">관련 서적이 없습니다.</div>;

    return (
        <>
            {/* <section className="banner"></section> */}

            <div className="inner">
                <h2 className="subTitle">{getgenre(parseInt(genre))}</h2>

                <div className="mainBookList">
                    {data.books.map((book, i) => (
                        <div key={i} className="imgContainer">
                            <Product data={book} className="mainSLide" /> {/* class를 className으로 변경 */}
                        </div>
                    ))}
                </div>
                <Pagination
                    current={currentPage}
                    total={data.total}
                    pageSize={pageSize}
                    onChange={(page) => dispatch(mainChange(page))}
                />
            </div>
        </>
    );
}
