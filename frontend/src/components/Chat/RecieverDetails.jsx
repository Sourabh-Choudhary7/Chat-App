import { IconButton, Tooltip } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecieverDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showFriendList, setShowFriendList] = useState(false);

    const friendData = state?.friendData || [];
    const friendsListData = useSelector((state) => state?.auth?.friendsListData);
    const chatData = state?.chatData || [];
    console.log("FriendListData", friendsListData);

    let formattedUserName = friendData?.userName?.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // Filter friends who are not in the group
    const nonGroupFriends = friendsListData.filter(friend =>
        !chatData?.members.some(member => member._id === friend._id)
    );

    return (
        <div className='flex flex-col items-center flex-[0.65] rounded-[25px] bg-white p-2 overflow-auto max-h-screen'>
            {/* Header */}
            <div className="relative flex items-center justify-center w-full mb-4">
                <IconButton
                    className="absolute right-72"
                    onClick={() => navigate(-1)}
                >
                    <Tooltip title="Back to View Profile">
                        <KeyboardReturnRoundedIcon />
                    </Tooltip>
                </IconButton>
                <h2 className="text-2xl font-semibold text-blue-600">Details</h2>
            </div>

            <hr className="w-11/12 border-t border-gray-300 opacity-50 mb-4" />

            {/* Main Content Container */}
            <div className="flex flex-col items-center justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow">
                {/* Avatar and Profile */}
                <div className="flex items-center justify-center">
                    <Tooltip title="View Profile">
                        <img
                            src={friendData?.isGroupChat ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dtZF4uEohaMdwIw4d8XVRIVbJAgUthdQmg&s" : friendData?.avatar?.secure_url}
                            alt="Profile"
                            className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                        />
                    </Tooltip>
                </div>

                {/* User Information */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                        <span>
                            {chatData?.isGroupChat ? chatData.chatName : formattedUserName}
                        </span>
                    </h3>

                    {chatData?.isGroupChat ? (
                        <>
                            <div>
                                <div className='flex items-center justify-center gap-4'>
                                    <h3 className="text-l font-medium text-blue-700 mb-2">Group Members:</h3>
                                    <IconButton title='Add new member' onClick={() => setShowFriendList(!showFriendList)}>
                                        <PersonAddOutlinedIcon className='text-black' />
                                    </IconButton>
                                </div>

                                {chatData?.members.map((member) => (
                                    <p key={member._id} className="mb-2 flex items-center gap-2">
                                        <Tooltip title="View Profile">
                                            <img
                                                src={member?.avatar?.secure_url}
                                                alt="Profile"
                                                className="border-4 border-blue-400 w-8 h-8 rounded-full cursor-pointer shadow-lg"
                                            />
                                        </Tooltip>
                                        <span className='text-gray-500'>
                                            {member?.userName?.split(' ')
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                .join(' ')}
                                        </span>
                                    </p>
                                ))}
                            </div>

                            {/* Add Friends Section */}
                            {showFriendList && (
                                <div className="w-full">
                                    <h3 className="text-l font-medium text-blue-700 mb-2">Select Friends to add Group:</h3>
                                    <div className="border border-blue-300 p-2 rounded-lg shadow-md max-h-40 overflow-y-auto">
                                        {nonGroupFriends.length > 0 ? (
                                            nonGroupFriends.map((friend) => (
                                                <p key={friend._id} className="text-gray-500 mb-1 flex items-center justify-between">
                                                    <div className='flex items-center gap-2'>
                                                        <Tooltip title="View Profile">
                                                            <img
                                                                src={friend?.avatar?.secure_url}
                                                                alt="Profile"
                                                                className="border-4 border-blue-400 w-8 h-8 rounded-full cursor-pointer shadow-lg"
                                                            />
                                                        </Tooltip>
                                                        <span>
                                                            {friend.userName?.split(' ')
                                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                                .join(' ')}
                                                        </span>
                                                    </div>
                                                    <IconButton onClick={() => {/* Add friend to group logic */ }}>
                                                        <PersonAddOutlinedIcon className="text-blue-500" />
                                                    </IconButton>
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No friends available to add.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="text-gray-500 mb-1">Email Id: <span>{friendData?.email}</span></p>
                            <p className="text-gray-500">Phone Number: <span>{friendData?.phone}</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecieverDetails;
