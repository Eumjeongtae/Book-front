import { useParams } from "react-router-dom";
import { useFetchData } from "../api/apiUtils";
import Product from "../components/Product";
import '../style/bookDetail/bookDetail.css'
import Image from '../components/Image';
import { IoIosHeartEmpty } from "react-icons/io"; // 좋아요전
import { IoIosHeart } from "react-icons/io"; // 좋아요 후
import { PiShoppingBag } from "react-icons/pi";
import { PiShoppingBagFill } from "react-icons/pi";
import Score from "../components/Score";
import Review from '../components/Review';

export default function Book() {
    const { bid } = useParams();
    const url = `http://localhost:8000/product/${bid}`;
    const { data, isLoading, error } = useFetchData(url);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    return (

        <>
            <div className="inner">
                <main>
                    <section className="detailItem">
                        <div className="detailItemImage">
                            <Image img={data.image} className='detailImage' />
                        </div>
                        <div className="detailItemInfo">
                            <ul>
                                <li className="bookTitle">{data.title}</li>
                                <li><b>카테고리</b> <span>{data.Category}</span> </li>
                                <li><b>배급사</b> <span>{data.Publisher}</span> </li>
                                <li><b>작가</b>  <span>{data.Author}</span></li>
                                <li><b>출판일</b>  <span>{data.PurchaseDate}</span></li>
                                <li><b>정보</b>  <span>{data.BookInfo}</span></li>
                                <li className="infoBtn">
                                    <button type="button"><IoIosHeartEmpty /><span>16</span></button>
                                    <button type="button"><PiShoppingBag /><span>찜하기</span></button>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="wishList reviewList">
                        {
                            true ?
                                <>
                                    <div className="container1">
                                        <div>
                                            <div className="starBox">
                                                <p className="starNum">4</p>
                                                <Score score={4} />
                                            </div>
                                            <div className="middle"></div>
                                            <div className="percentBox">
                                                <p>100%</p>
                                                <span>만족후기</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="review">

                                        {/* { */}
                                        {/* reviewList.map(v => */}
                                        <li>
                                            <div className="reviewContent">
                                                <div className="buyerName">
                                                    <div className="buyer">
                                                        user123
                                                    </div>
                                                    <p className="buyerDate">10분전</p>
                                                </div>
                                                <Score score={4} />
                                                <div className="reviewTxt">하느님이 보우하사 우리 나라만세 무궁화 삼천리...</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="reviewContent">
                                                <div className="buyerName">
                                                    <div className="buyer">
                                                        test123
                                                    </div>
                                                    <p className="buyerDate">10분전</p>
                                                </div>
                                                <Score score={3} />
                                                <div className="reviewTxt">동해물과 백두산이 마르고 닳도록...</div>
                                            </div>
                                        </li>
                                        {/* ) */}
                                        {/* } */}
                                    </ul>
                                </>
                                :
                                <p className="noList">상점후기가 없습니다.</p>
                        }


                    </section>
                </main>

            </div>
            <ul className="detailItemBtn">
                <li><button type="button">리뷰쓰기</button></li>
                <li><button type="button">대여하기</button></li>
            </ul>
            <Review />
        </>


    );
}