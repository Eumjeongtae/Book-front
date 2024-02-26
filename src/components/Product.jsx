import useBookActions from '../hooks/useBookActions';
import Image from './Image';
import { Link } from 'react-router-dom';

export default function Product(props) {
    console.log(props);
    const { returnBook } = useBookActions();

    return (
        <div>
            <Link to={`/detail/${props.data.book_id}`}>
                <Image img={props.data.image} class={props.class} />
            </Link>
            <div className="info">
                <Link to={`/detail/${props.data.book_id}`}>
                    <p className="title">{props.data.book_name}</p>
                    <p className="author">{props.data.author}</p>
                </Link>

                {props.type === 'myPageHistory' && (
                    <>
                        <p className="rentDate">
                            대여일자 <span>{props.data.rent_date}</span>{' '}
                        </p>
                        <p className="returnDate">
                            반납일자 <span>{props.data.return_date}</span>{' '}
                        </p>
                    </>
                )}
                {props.type === 'myPageRentBook' && (
                    <>
                        <p className="rentDate">
                            반납 예정일 <span>{props.data.expected_return_date}</span>
                        </p>
                        <p>
                            <button onClick={() => returnBook(props.data.book_id, props.url)}>반납하기</button>
                        </p>
                    </>
                )}
                {props.type === 'myPageDecision' && (
                    <>
                        <p className="rentDate">재고 있음 </p>
                        {/* <p className='rentDate'>반납 예정일  <span>2020-02-01</span> </p> */}
                        <p>
                            <button>대여하기</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
