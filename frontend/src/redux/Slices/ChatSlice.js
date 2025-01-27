import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    allChatsData: [],
    groups: [],
    selectedGroupChat: null,
    loading: false,
    error: null,
};

// Async thunk to get all chats
export const getAllChats = createAsyncThunk("user/chat", async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.get("chats");
        toast.promise(res, {
            loading: "Loading chats...",
            success: "Chats loaded",
            error: "Failed to get chats",
        });
        const response = await res;
        return response.data.chats;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to create a one-to-one chat
export const createChat = createAsyncThunk("user/chat/create", async (friendId, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("chats/create", { friendId });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to create a group chat
export const createGroupChat = createAsyncThunk("user/chat/create-group", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("chats/create-group", data);
        toast.promise(res, {
            loading: "Creating new Group...",
            success: "Group Created Successfully",
            error: "Failed to Create Group",
        });
        const response = await res;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to get specific group chat details by groupId
export const getGroupChat = createAsyncThunk("user/chat/get-group-chats", async (groupId, { rejectWithValue }) => {
    try {
        const res = axiosInstance.get(`chats/group/${groupId}`);
        const response = await res;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to fetch all groups for the logged-in user
export const fetchGroupsForLoggedInUser = createAsyncThunk("user/chat/get-groups", async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.get("chats/get-groups");
        const response = await res;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to make as admin by admin of the group
export const makeGroupAdmin = createAsyncThunk("user/chat/make-admin", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("chats/make-group-admin", data);
        toast.promise(res, {
            loading: "Making group admin...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to make new admin",
        });
        const response = await res;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});

// Async thunk to make as admin by admin of the group
export const dismissAsGroupAdmin = createAsyncThunk("user/chat/dismiss-as-admin", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("chats/dismiss-as-admin", data);
        toast.promise(res, {
            loading: "Removing as admin...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to dismiss as admin",
        });
        const response = await res;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error.response?.data?.message);
    }
});


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getAllChats
            .addCase(getAllChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.loading = false;
                state.allChatsData = action.payload || [];
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Handle createGroupChat
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.groups.push(action.payload);
            })
            
            // Handle fetchGroupsForLoggedInUser
            .addCase(fetchGroupsForLoggedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroupsForLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload.allGroupsChat || [];
            })
            .addCase(fetchGroupsForLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Handle getGroupChat
            .addCase(getGroupChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGroupChat.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedGroupChat = action.payload;
            })
            .addCase(getGroupChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(makeGroupAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeGroupAdmin.fulfilled, (state, action) => {
                state.loading = false;
                if (state.selectedGroupChat?._id === action.payload.groupId) {
                    state.selectedGroupChat = { ...state.selectedGroupChat, ...action.payload };
                }
            })
            .addCase(makeGroupAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(dismissAsGroupAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dismissAsGroupAdmin.fulfilled, (state, action) => {
                state.loading = false;
                if (state.selectedGroupChat?._id === action.payload.groupId) {
                    state.selectedGroupChat = { ...state.selectedGroupChat, ...action.payload };
                }
            })
            .addCase(dismissAsGroupAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default chatSlice.reducer;
