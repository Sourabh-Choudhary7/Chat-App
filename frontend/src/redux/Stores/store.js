import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../Slices/AuthSlice';
import chatSliceReducer from '../Slices/ChatSlice';
import messageSliceReducer from '../Slices/MessageSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        chat: chatSliceReducer,
        message: messageSliceReducer,
    },
    devtools: true
})

export default store;