import Product from './Product';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';

export default function ProductList({ data }) {
    // data 배열의 길이에 따라 className 결정
    const className = `mainBookList${data.length}`;

    const renderBooks = () => {
        // if (data.length === false) {
        if (data.length >= 1 && data.length <= 4) {
            return (
                <div className={className}>
                    {data.map((book, i) => (
                        <div key={i} className="imgContainer">
                            <Product data={book} className="mainSLide" /> {/* class를 className으로 변경 */}
                        </div>
                    ))}
                </div>
            );
        } else {
            // data.length가 4보다 클 때
            return (
                <div className="mainSLide">
                    <MySwiper>
                        {data.map((book, i) => (
                            <SwiperSlide key={i}>
                                <Product data={book} className="listSlide" />
                            </SwiperSlide>
                        ))}
                    </MySwiper>
                </div>
            );
        }
    };

    return renderBooks();
}
