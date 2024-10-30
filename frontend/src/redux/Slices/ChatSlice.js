import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    allChatsData: []
};

export const getAllChats = createAsyncThunk("user/chat", async () => {
    try {
        let res = axiosInstance.get("chats");
        toast.promise(res, {
            loading: "Loading chat...",
            success: "Chats loaded",
            error: "Failed to get chat",
        });
        res = await res
        return res.data.chats;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        console.log(error.message);
        throw error;
    }
});

export const createChat = createAsyncThunk("user/chat/create", async (friendId) => {
    try {
        let res = axiosInstance.post("chats/create", { friendId });
        toast.promise(res, {
            loading: "Creating chat...",
            success: (data) => data?.data?.message || "Chat created",
            error: "Failed to create chat",
        });
        res = await res
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        throw error;
    }
});

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllChats.fulfilled, (state, action) => {
            console.log("action all chats:", action)
            if (action?.payload) {
                state.allChatsData = [...action?.payload] || [];
            } else {
                state.AllChatsData = [];
            }
        });
    }
});

export default chatSlice.reducer;
