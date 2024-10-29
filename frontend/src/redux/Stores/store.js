import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../Slices/AuthSlice';
import chatSliceReducer from '../Slices/ChatSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        chat: chatSliceReducer
    },
    devtools: true
})

export default store;