import { formatDate } from "../util/formatDate";

export default function History({rent_date, return_date}) {
    
    return (
        <>
            <p className="rentDate">
                대여일자
                <span>{formatDate(rent_date)}</span>{' '}
            </p>
            <p className="returnDate">
                반납일자
                <span>{return_date ? formatDate(return_date) : '대여중'}</span>
            </p>
        </>
    );
}
