import { useQuery } from 'react-query';
import axios from 'axios';


const fetchData = async ({ queryKey }) => {
    const [url] = queryKey; // 쿼리 키 배열에서 첫 번째 요소(즉, URL)를 추출
    const { data } = await axios.get(url); // 추출한 URL로 Axios 요청을 수행
    return data; // 요청 결과를 반환
  };

// 데이터를 불러오는 커스텀 훅
export const useFetchData = (url) => {
    return useQuery([url], fetchData); // 쿼리 키로 [url]을 사용하고, fetchData 함수를 쿼리 함수로 사용
};