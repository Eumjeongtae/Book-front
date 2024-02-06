import { configureStore, createSlice } from '@reduxjs/toolkit'
import reducer from './modules/reducer';

export default configureStore({
    reducer: {
        data : reducer,
    },
});