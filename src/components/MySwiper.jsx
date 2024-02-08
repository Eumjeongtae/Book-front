import React from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
export default function MySwiper(props) {

  const pagination = {
    clickable: true
  };
  return (
    <>
      <Swiper
        className={`mySwiper ${props.class}`}
        spaceBetween={50} // 슬라이드 간의 간격 설정
        slidesPerView={5} // 한 번에 보여줄 슬라이드 수 설정
        pagination={pagination} 
        modules={[Pagination]}
      >
        {props.children}
      </Swiper>
    </>
  );
}
