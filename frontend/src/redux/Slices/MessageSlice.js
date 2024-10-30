import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    messages: []
}

export const getMessagesByChatId = createAsyncThunk("user/chat/messages", async (chatId) => {
    try {
        let res = axiosInstance.get(`messages/${chatId}`);
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessagesByChatId.fulfilled, (state, action) => {
            state.messages = action.payload;
        })
    }   
})

export default messageSlice.reducer;