import { useMutation } from 'react-query';
import axios from 'axios';

// 데이터를 서버에 POST하는 함수
const postData = async ({ url, data }) => {
  // axios를 사용하여 서버에 데이터 POST
  const response = await axios.post(url, {data});
  return response.data;
};

// 데이터를 불러오는 커스텀 훅
export const usePostData = () => {
  
  return useMutation(postData);
};