
import Product from './Product';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

export default function ProductList({data}) {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    return (
        <>
            <div className='mainSLide'>
                <MySwiper >
                    {data.map((book, i) =>
                        <SwiperSlide key={i}>
                            <Link to={`/detail/${i + 1}`}>
                                <Product data={book} class='listSlide' />
                            </Link>
                        </SwiperSlide>)}

                </MySwiper>
            </div>

        </>
    );
}