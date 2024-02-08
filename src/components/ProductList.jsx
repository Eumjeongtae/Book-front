
import Product from './Product';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchData } from "../api/apiUtils";

export default function ProductList() {
    const url = "http://localhost:8000/product";
    const { data, isLoading, error } = useFetchData(url);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;

    return (
        <>
            <MySwiper class='mainSLide'>
                {data.map((book, i) =>
                    <SwiperSlide>
                        <Product data={book} />
                    </SwiperSlide>)}

            </MySwiper>
        </>
    );
}