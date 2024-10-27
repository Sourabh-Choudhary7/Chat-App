import React, { useState } from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CreateGroup = () => {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');

    const friends = [
        { id: 1, name: 'Suny' },
        { id: 2, name: 'Jatan' },
        { id: 3, name: 'Ravi' },
        { id: 4, name: 'Aditya' },
        { id: 5, name: 'Shourya' },
        { id: 6, name: 'Riya' },
        { id: 7, name: 'Sujata' },
        { id: 8, name: 'Abhinandan' },
        { id: 9, name: 'Shradha' },
    ]
    const handleAddFriendToGroup = (friend) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.find(f => f.id === friend.id)) {
                return prevSelected.filter(f => f.id !== friend.id);
            } else {
                return [...prevSelected, friend];
            }
        });
    };
    const handleAddGroup = () => {

    }
    return (
        <div className="flex flex-col flex-[0.65] rounded-[25px] bg-white p-4 ">
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
                            <div key={friend.id} className="px-3 py-1 bg-blue-100 rounded-full text-blue-700 font-semibold">
                                {friend.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Friend List */}
            <div className="overflow-x-auto mt-4">
                <ul className="space-y-2 w-[80%] mx-auto">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                                    {friend.name[0]}
                                </div>
                                <span className="ml-3 text-gray-700">{friend.name}</span>
                            </div>
                            <button
                                onClick={() => handleAddFriendToGroup(friend)}
                                className="text-green-500 hover:text-green-700 transition"
                                title={selectedFriends.find(f => f.id === friend.id) ? "Friend Added" : "Add Friend"}
                            >
                                {selectedFriends.find(f => f.id === friend.id) ? <CheckCircleIcon /> : <PersonAddOutlinedIcon className='text-blue-500 hover:text-blue-700 transition' />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CreateGroup;
