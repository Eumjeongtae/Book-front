import Product from './Product';

export default function Decision({ data }) {
    return (
        <>
            {data.length ? (
                <div className="category">
                    {data.map((book, i) => (
                        <Product data={book} class="myPageBook" key={i} type="myPageDecision" />
                    ))}
                </div>
            ) : (
                <p className="noList">예약한 책이 없습니다.</p>
            )}
        </>
    );
}
