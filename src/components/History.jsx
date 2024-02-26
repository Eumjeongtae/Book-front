import { Link } from 'react-router-dom';
import Product from './Product';

export default function History({ data }) {
    console.log(data[0]?.book_id);
    return (
        <>
            {data.length ? (
                <div className="category">
                    {data.map((book, i) => (
                            <Product data={book} class="myPageBook" key={i} type="myPageHistory" />
                    ))}
                </div>
            ) : (
                <p className="noList">책 반납 이력이 없습니다.</p>
            )}
        </>
    );
}
