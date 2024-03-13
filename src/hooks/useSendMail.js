import { usePostData } from '../api/apiPost';

export default function useSendMail() {
    const { mutate: sendPostData } = usePostData();
    // Promise를 반환하는 sendMail 함수
    const sendMail = (mail,sendMailValue) => {
        return new Promise((resolve, reject) => {
            sendPostData(
                { url: `http://localhost:8000/signup/mailCheck/${sendMailValue}`, data: mail },
                {
                    onSuccess: (data) => {
                        resolve(data); // Promise를 resolve 하여 결과를 반환
                    },
                    onError: (error) => {
                        console.error('에러 발생:', error);
                        reject(error); // Promise를 reject 하여 에러를 반환
                    },
                }
            );
        });
    };

    return { sendMail };
}
