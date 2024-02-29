import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import { useFetchData } from '../api/apiUtils';
import { getUser } from '../util/localStorage';

export default function Modify() {
    const userInfo = getUser() ? getUser().userInfo : '';

    const { book_id } = useParams();
    const url = `http://localhost:8000/manager/${userInfo.id_idx}/${book_id}`;
    const { data, isLoading, error } = useFetchData(url);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;

    return <Form type="bookModify" info={data.book[0]} rentalHistory = {data.rentalHistory}/>;
}
