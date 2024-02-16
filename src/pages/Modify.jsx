import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useFetchData } from "../api/apiUtils";


export default function Modify() {
    const { bid } = useParams();
    const url = `http://localhost:8000/product/${parseInt(bid)+1}`;
    const { data, isLoading, error } = useFetchData(url);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data found</div>;
    
    return <Form type='bookModify' info={data}/>
}