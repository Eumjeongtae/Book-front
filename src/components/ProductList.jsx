import Product from './Product';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';

export default function ProductList({ data }) {
    // data 배열의 길이에 따라 className 결정
    const { genre } = useParams();
    const renderBooks = () => {
        if (genre === 'preview') {
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
        } else {
            return (
                <div className="mainBookList">
                    {data.map((book, i) => (
                        <div key={i} className="imgContainer">
                            <Product data={book} className="mainSLide" /> {/* class를 className으로 변경 */}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return renderBooks();
}
