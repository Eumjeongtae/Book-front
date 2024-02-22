// 날짜를 'YYYY-MM-DD HH:MM:SS' 형태로 변환하는 함수
export const formatDateToMySQL = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
    const day = dateTime.getDate();

    // 숫자가 10보다 작을 경우 앞에 '0'을 붙여 두 자리로 만듦
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // MySQL datetime 형식에 맞춰 반환
    return `${year}-${formattedMonth}-${formattedDay} 00:00:00`;
};
