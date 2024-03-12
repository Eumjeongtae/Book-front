import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './modules/pageReducer';

// 스토어 설정. `data` 키에 대응하는 상태는 `reducer`로 관리됩니다.
export default configureStore({
    reducer: {
        data : pageReducer, // `data` 상태를 관리하는 리듀서를 지정합니다.
        // data : reducer,
        // data : reducer,
    },
});