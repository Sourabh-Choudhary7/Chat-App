import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
    friendsListData: localStorage.getItem('friendsList') ? JSON.parse(localStorage.getItem('friendsList')) : null,
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
    }
});

export const register = createAsyncThunk("/auth/register", async (data) => {
    try {
        let res = axiosInstance.post("users/register", data);

        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        let res = axiosInstance.get("users/logout");
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getProfile = createAsyncThunk("/user/profile", async () => {
    try {
        let res = axiosInstance.get("users/me");
        toast.promise(res, {
            loading: "Getting profile...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to get profile",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getAllRegisteredUsers = createAsyncThunk("/user/all-people", async () => {
    try {
        let res = axiosInstance.get("users/all-users");
        toast.promise(res, {
            loading: "Getting all users...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to get all users",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addFriend = createAsyncThunk("/users/add-friend", async (friendId) => {
    try {
        let res = axiosInstance.post("users/add-friend", { friendId });

        toast.promise(res, {
            loading: "Adding friend to your friend list...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to add friend",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getFriendsList = createAsyncThunk("/user/friends", async () => {
    try {
        let res = axiosInstance.get("users/friends-list");
        // toast.promise(res, {
        //     loading: "Getting friends list...",
        //     success: (data) => {
        //         return data?.data?.message;
        //     },
        //     error: "Failed to get friends list",
        // });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    const { user } = action?.payload;
                    if (user) {
                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('userData', JSON.stringify(user));
                        state.isLoggedIn = true;
                        state.userData = user;
                    }
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userData');
                    state.isLoggedIn = false;
                    state.userData = null;
                }
            })
            .addCase(getFriendsList.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    const { friends } = action?.payload;
                    if (friends) {
                        localStorage.setItem('friendsList', JSON.stringify(friends));
                        state.friendsListData = friends;
                    }
                }
            })
    }
})

export default authSlice.reducer;