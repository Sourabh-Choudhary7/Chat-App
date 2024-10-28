import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null
}


export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        let res = axiosInstance.post("users/login", data);

        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
                console.log("login action: ", action);
                if (action?.payload?.success) {
                    const { user } = action?.payload;
                    if (user) {
                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('data', JSON.stringify(user));
                        state.isLoggedIn = true;
                        state.data = user;
                    }
                }
            })
    }
})

export default authSlice.reducer;