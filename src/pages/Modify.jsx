import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import { useFetchData } from '../api/apiUtils';
import { getUser } from '../util/localStorage';
import { useEffect, useState } from 'react';
import { formatDateToMySQL } from '../util/formatDateToMySQL';

export default function Modify() {
    const userInfo = getUser() ? getUser().userInfo : '';
    const [bookInfo, setBookInfo] = useState();

    const { book_id } = useParams();
    const url = `http://localhost:8000/manager/${userInfo.id_idx}/${book_id}`;
    const { data, isLoading, error } = useFetchData(url);

    useEffect(() => {
        if (data?.book.length) {
            let bookInfoData = {
                ...data.book[0],
                publication_date: formatDateToMySQL(new Date(data.book[0].publication_date)),
                income_date: formatDateToMySQL(new Date(data.book[0].income_date)),
            };
            setBookInfo(bookInfoData);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!bookInfo || bookInfo.length === 0) return <div>No data found</div>;
    
    return <Form type="bookModify" info={bookInfo} rentalHistory={data.rentalHistory} />;
}
