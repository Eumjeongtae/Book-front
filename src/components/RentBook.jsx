import Product from './Product';

export default function RentBook({ data }) {
    return (
        <div className="category">
            {data.map((book, i) =>
                <Product data={book} class='myPageBook' key={i} type='myPageRentBook' />
            )}
        </div>

    );
}