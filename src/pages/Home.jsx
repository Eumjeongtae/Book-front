import React, { useEffect, useState } from 'react';
import '../style/main/main.css';
import { useFetchData } from '../api/apiUtils';
import { SwiperSlide } from 'swiper/react';
import MySwiper from '../components/MySwiper';
import Product from '../components/Product';
import BarChart from '../components/BarChart';

export default function Home() {
    const { data, isLoading, error } = useFetchData(`http://localhost:8000/main`);



    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="inner noBook">관련 서적이 없습니다.</div>;

    return (
        <>
            <section className="banner"></section>

            <div className="inner">
                <h2 className="subTitle">New Books</h2>

                <div className=" mainSLide">
                    <MySwiper>
                        {data.newBooks.map((book, i) => (
                            <SwiperSlide key={i}>
                                <Product data={book} className="listSlide" />
                            </SwiperSlide>
                        ))}
                    </MySwiper>
                </div>
                <section className='landingSection landingChart'>

                <div >
                    <h2 className='subTitle'>like counts</h2>
                    <BarChart list={data.likeCounts} type='like'/>
                </div>
                
                <div>
                    <h2 className='subTitle'>rentals counts</h2>
                    <BarChart list={data.rentCounts} type='rental'/>
                </div>
            </section>

            </div>
        </>
    );
}
