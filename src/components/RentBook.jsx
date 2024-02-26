import { Link } from 'react-router-dom';
import Product from './Product';

export default function RentBook({ data , url}) {
    return (
        <>
            {data.length ? (
                <div className="category">
                    {data.map((book, i) => (
                            <Product data={book} class="myPageBook" key={i} type="myPageRentBook" url={url} />
                    ))}
                </div>
            ) : (
                <p className="noList">책 대여 이력이 없습니다.</p>
            )}
        </>
    );
}
