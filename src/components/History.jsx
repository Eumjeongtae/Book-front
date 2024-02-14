
import Product from './Product';

export default function History({ data }) {
    return (
        <div className="category">
            {data.map((book, i) =>
                <Product data={book} class='myPageBook' key={i} type='myPageHistory' />
            )}
        </div>

    );
}