import React from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// Import Swiper core and required modules from individual paths
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

export default function MySwiper(props) {
  return (
    <>
      <Swiper
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={5}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        scrollbar={{ draggable: true }}
        mousewheel={true}
      >
        {props.children}
      </Swiper>
    </>
  );
}