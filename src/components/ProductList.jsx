import Product from './Product';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import { useDispatch } from "react-redux";

export default function ProductList({ data }) {
    console.log(data.length);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    return (
        <>
            <div className={`mainSLide ${data.length < 5 ? 'mainBookList' : ''}`}>
                {data.length < 5 ? (
                    data.map((book, i) => (
                        <div>
                            <Product data={book} class="listSlide" />
                        </div>
                    ))
                ) : (
                    <MySwiper>
                        {data.map((book, i) => (
                            <SwiperSlide key={i}>
                                <Product data={book} class="listSlide" />
                            </SwiperSlide>
                        ))}
                    </MySwiper>
                )}
            </div>
        </>
    );
}
