import { useState } from 'react';
import { usePostData } from '../api/apiPost';

export default function useSendMail() {
    const { mutate: sendPostData } = usePostData();
    const [mailButtonDisabled, setMailButtonDisabled] = useState(false); // 버튼 활성/비활성 상태

    const sendMail = (mail, book_name) => {
        setMailButtonDisabled(true); // 버튼 비활성화

        // Promise 로직 시작
        return new Promise((resolve, reject) => {
            sendPostData(
                { url: `http://localhost:8000/signup/mailCheck/${book_name}`, data: mail },
                {
                    onSuccess: (data) => {
                        setMailButtonDisabled(false); // 버튼 활성화
                        resolve(data);
                    },
                    onError: (error) => {
                        setMailButtonDisabled(false); // 버튼 활성화
                        reject(error);
                    },
                }
            );
        });
        // Promise 로직 종료
    };

    // 상태와 함수 반환
    return { sendMail, mailButtonDisabled };
}
