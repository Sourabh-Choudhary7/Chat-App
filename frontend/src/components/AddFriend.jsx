import React from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, getAllRegisteredUsers, getFriendsList } from '../redux/Slices/AuthSlice';

const AddFriend = () => {
    const { state } = useLocation();
    const loggedInUserData = useSelector((state) => state?.auth?.userData);
    const AllUsers = state?.users || [];
    const friendsList = useSelector((state) => state?.auth?.friendsListData);
    const dispatch = useDispatch();

    const isFriend = (userId) => friendsList.some(friend => friend._id === userId);

    const handleAddFriend = async (id) => {
        if (!isFriend(id)) {
            const res = await dispatch(addFriend(id));
            if (res?.payload?.success) {
                await dispatch(getFriendsList());
                await dispatch(getAllRegisteredUsers());
            }
        }
    }

    return (
        <div className='flex flex-col flex-[0.65] rounded-[25px] bg-white p-2'>
            <h2 className="text-lg text-center font-semibold text-blue-500 my-4">People</h2>
            <div className='overflow-x-auto mb-4'>
                <ul className="space-y-2 w-[80%] mx-auto my-0">
                    {AllUsers.map((user) => (
                        <li key={user?._id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <div className="flex items-center">
                                <img src={user?.avatar?.secure_url} alt="dp" className="w-10 h-10 rounded-full" />
                                <span className="ml-3 text-gray-700">
                                    {user?.userName?.split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                        .join(' ')}
                                    {loggedInUserData?._id === user?._id && " (you)"}
                                </span>
                            </div>
                            {/* Check if the user is not the logged-in user */}
                            {loggedInUserData?._id !== user?._id && (
                                isFriend(user?._id) ? (
                                    <div className='flex gap-2'>
                                        <span className="text-green-600" title="Already a Friend"><HowToRegOutlinedIcon /></span>
                                        <button
                                            // onClick={() => handleRemoveFriend(user?._id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                            title="Remove Friend"
                                        >
                                            <PersonRemoveOutlinedIcon />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAddFriend(user?._id)}
                                        className="text-blue-500 hover:text-blue-700 transition"
                                        title="Add Friend"
                                    >
                                        <PersonAddOutlinedIcon />
                                    </button>
                                )
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddFriend;
