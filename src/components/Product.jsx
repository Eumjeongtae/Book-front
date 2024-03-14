import Image from './Image';
import { Link } from 'react-router-dom';
import History from './History';
import Rent from './Rent';
import Decision from './Decision';

export default function Product(props) {
    const myPageData = () => {
        if (props.type === 'history') {
            return <History rent_date={props.data.rent_date} return_date={props.data.return_date} />;
        } else if (props.type === 'rent') {
            return <Rent return_date={props.data.expected_return_date} book_id={props.data.id} url={props.url} />;
        } else if (props.type === 'decision') {
            return (
                <Decision bookStatus={props.data.status} book_id={props.data.id} return_date={props.data.expected_return_date} />
            );
        }
    };

    return (
        <div>
            <Link to={`/detail/${props.data.id}`} className="imgList">
                <Image img={props.data.image} class={props.class} />
            </Link>

            <div className="info">
                {/* default */}
                <Link to={`/detail/${props.data.id}`}>
                    <p className="title">{props.data.book_name}</p>
                    <p className="author">{props.data.author}</p>
                </Link>
                {myPageData()}
            </div>
        </div>
    );
}
