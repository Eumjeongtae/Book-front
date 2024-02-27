export const formatDate = (dateString) => {
  // 문자열을 Date 객체로 변환
  const date = new Date(dateString);
  
  if (!date.getTime()) { // 유효하지 않은 날짜인 경우 검사
    console.error("Provided argument is not a valid date string.");
    return null;
  }

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString(); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const year = date.getFullYear();

  // 일(day)과 월(month)이 한 자리수일 경우, 앞에 '0'을 추가합니다.
  day = day.padStart(2, '0');
  month = month.padStart(2, '0');

  return `${year}-${month}-${day}`;
};
