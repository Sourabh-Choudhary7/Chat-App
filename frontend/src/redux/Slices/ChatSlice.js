import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    AllChatsData: []
}

export const getOrCreateChat = createAsyncThunk("/user/chat", async (friendId) => {
    console.log(friendId)
    try {
        let res = axiosInstance.post("chats/one-to-one", { friendId });
        toast.promise(res, {
            loading: "Loading chat...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to get chat",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrCreateChat.fulfilled, (state, action) => {
            if (action?.payload) {
                if (Array.isArray(action.payload)) {
                    state.AllChatsData = [...action.payload];
                } else {
                    state.AllChatsData.push(action.payload); // Add the single chat object
                }
            }
        });
    }
    
    
})

export default chatSlice.reducer;