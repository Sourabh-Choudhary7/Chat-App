import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../Slices/AuthSlice';
import chatSliceReducer from '../Slices/ChatSlice';
import messageSliceReducer from '../Slices/MessageSlice';
import socketSliceReducer from '../Slices/SocketSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        chat: chatSliceReducer,
        message: messageSliceReducer,
        socketio: socketSliceReducer,
    },
    devtools: true
})

export default store;