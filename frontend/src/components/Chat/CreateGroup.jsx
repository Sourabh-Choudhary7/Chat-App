import React, { useState } from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChat, fetchGroupsForLoggedInUser } from '../../redux/Slices/ChatSlice';

const CreateGroup = () => {
    const dispatch = useDispatch();
    const friendsList = useSelector((state) => state?.auth?.friendsListData)
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');

    const handleAddFriendToGroup = (friend) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.find(f => f?._id === friend?._id)) {
                return prevSelected.filter(f => f?._id !== friend?._id);
            } else {
                return [...prevSelected, friend];
            }
        });
    };
    const handleAddGroup = async () => {
        const memberIds = selectedFriends?.map((friend) => friend?._id)
        const res = await dispatch(createGroupChat({groupName, members: memberIds}))
        if (res?.payload?.success) {
            await dispatch(fetchGroupsForLoggedInUser());
        }
    }
    console.log("selectedFriends:", selectedFriends)
    return (
        <div className="flex flex-col flex-[0.65] rounded-[25px] bg-white p-2">
            <h2 className="text-lg text-center font-semibold text-blue-500 my-4">Create New Group</h2>

            {/* Group Name Input */}
            <div className="flex gap-2 mx-auto my-0">
                <div className="border-2 border-blue-500 rounded-[25px] bg-blue-500 w-80">
                    <input
                        type="text"
                        placeholder="Enter Group name"
                        className="w-full px-4 py-1  text-base outline-none rounded-[25px]"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />

                </div>

                {
                    groupName && selectedFriends.length > 1 && (
                        <button
                            className={`text-green-500 hover:text-green-700 transition py-1 px-2 font-bold`}
                            onClick={handleAddGroup}
                        >
                            <CheckCircleIcon />
                            Done
                        </button>
                    )
                }

            </div>
            {/* Selected Friends Display */}
            {selectedFriends.length > 0 && (
                <div className="mt-4 text-center">
                    <h3 className="text-md font-semibold text-gray-700">Selected Friends:</h3>
                    <div className="flex flex-wrap justify-center mt-2 gap-2">
                        {selectedFriends.map((friend) => (
                            <div key={friend?._id} className="">
                                <div className="flex items-center justify-center gap-2 bg-blue-100 rounded-lg text-blue-700 px-2 py-1">
                                    <img src={friend?.avatar?.secure_url} alt="friend Pic" className='w-10 h-10 rounded-full'/>
                                    <span className="font-semibold">
                                {friend?.userName?.split(' ')[0].charAt(0).toUpperCase() + friend?.userName?.split(' ')[0].slice(1).toLowerCase()}
                                </span>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Friend List */}
            <div className="overflow-x-auto mt-4">
                <ul className="space-y-2 w-[80%] mx-auto">
                    {friendsList.map((friend) => (
                        <li
                            key={friend?._id}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                                    <img src={friend?.avatar?.secure_url} alt="friend Pic" />
                                </div>
                                <span className="ml-3 text-gray-700">
                                    {friend?.userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </span>
                            </div>
                            <button
                                onClick={() => handleAddFriendToGroup(friend)}
                                className="text-green-500 hover:text-green-700 transition"
                                title={selectedFriends.find(f => f?._id === friend?._id) ? "Friend Added" : "Add Friend"}
                            >
                                {selectedFriends.find(f => f?._id === friend?._id) ? <CheckCircleIcon /> : <PersonAddOutlinedIcon className='text-blue-500 hover:text-blue-700 transition' />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CreateGroup;
