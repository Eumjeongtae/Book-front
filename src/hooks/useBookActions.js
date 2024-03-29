// useBookActions.js
import { useQueryClient } from 'react-query';
import { usePostData } from '../api/apiPost';
import { formatDateToMySQL } from '../util/formatDateToMySQL';
import { getUser } from '../util/localStorage';

//책 대여 반납 커스텀훅
function useBookActions() {
    const queryClient = useQueryClient();
    const { mutate: sendPostData } = usePostData();
    const userInfo = getUser() ? getUser().userInfo : '';
    let now = new Date();
    const now_date = formatDateToMySQL(now); //db형식

    const rentBook = (date, book_id) => {
        let returnDate = new Date(date);
        returnDate.setHours(0, 0, 0, 0); // 시, 분, 초, 밀리초를 0으로 설정
        const expected_return_date = formatDateToMySQL(returnDate); //db형식
        const dateOnly = expected_return_date.split(' ')[0]; // 년 월 일만 나옴
        let userResponse = window.confirm(`${dateOnly}까지 반납 하시겠습니까?`);
        if (userResponse) {
            try {
                sendPostData(
                    {
                        url: `http://localhost:8000/product/rent`,
                        data: {
                            user_id: userInfo.id_idx,
                            book_id,
                            rent_date: now_date,
                            expected_return_date,
                        },
                    },
                    {
                        onSuccess: (result) => {
                            alert('책 대여가 완료되었습니다.');
                            window.location.reload();
                        },
                        onError: (error) => {
                            // 요청이 실패했을 때 실행될 로직
                            console.error('에러 발생:', error);
                        },
                    }
                );
            } catch (error) {
                // API 호출 실패 시 예외 처리
                console.error('대여 과정 중 에러 발생:', error);
                alert('책 대여 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const returnBook = (book_id, url) => {
        let userResponse = window.confirm(`반납 하시겠습니까?`);
        if (userResponse) {
            try {
                sendPostData(
                    {
                        url: `http://localhost:8000/product/return`,
                        data: {
                            user_id: userInfo.id_idx,
                            book_id,
                        },
                    },
                    {
                        onSuccess: (result) => {
                            queryClient.invalidateQueries([url]);
                            alert('반납이 완료되었습니다.');
                        },
                        onError: (error) => {
                            // 요청이 실패했을 때 실행될 로직
                            console.error('에러 발생:', error);
                        },
                    }
                );
            } catch (error) {
                // API 호출 실패 시 예외 처리
                console.error('반납 과정 중 에러 발생:', error);
                alert('책 반납 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const reservationBook = (book_id, url) => {
        try {
            sendPostData(
                {
                    url: `http://localhost:8000/product/reservation`,
                    data: {
                        user_id: userInfo.id_idx,
                        book_id,
                        created_at: now_date,
                    },
                },
                {
                    onSuccess: (result) => {
                        queryClient.invalidateQueries([url]);
                        alert('책 예약이 완료되었습니다');
                    },
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                    },
                }
            );
        } catch (error) {
            // API 호출 실패 시 예외 처리
            console.error('예약 과정 중 에러 발생:', error);
            alert('책 예약 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };
    const reservationCancelBook = (book_id, url) => {
        try {
            sendPostData(
                {
                    url: `http://localhost:8000/product/reservationCancel`,
                    data: {
                        user_id: userInfo.id_idx,
                        book_id,
                        cancel_at: now_date,
                    },
                },
                {
                    onSuccess: (result) => {
                        queryClient.invalidateQueries([url]);
                        alert('책 예약이 취소되었습니다');
                    },
                    onError: (error) => {
                        // 요청이 실패했을 때 실행될 로직
                        console.error('에러 발생:', error);
                    },
                }
            );
        } catch (error) {
            // API 호출 실패 시 예외 처리
            console.error('예약취소 과정 중 에러 발생:', error);
            alert('책 예약취소 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return { rentBook, returnBook, reservationBook, reservationCancelBook };
}

export default useBookActions;
