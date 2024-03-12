import { createSlice } from '@reduxjs/toolkit';

// `currentPage` 상태를 관리하는 슬라이스 생성
let items = createSlice({
    name: 'currentPage', // 슬라이스 이름
    initialState: {
        main: 1, // 초기 상태 설정
    },
    reducers: {
        // 페이지 변경 액션. `currentPage` 상태를 업데이트합니다.
        mainChange(state, action) {
            state.main = action.payload; // 현재 페이지 상태를 액션 페이로드로 설정
        },
    },
});

export const { mainChange } = items.actions; // 액션 생성자 내보내기

export default items.reducer; // 리듀서 내보내기
