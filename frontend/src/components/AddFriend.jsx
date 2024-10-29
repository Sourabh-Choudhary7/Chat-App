import React from 'react'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const AddFriend = () => {
    const people = [
        { id: 1, name: 'Suny Shaw' },
        { id: 2, name: 'Jatan Tiwari' },
        { id: 3, name: 'Ravi Sharma' },
        { id: 4, name: 'Aditya Sharma' },
        { id: 5, name: 'Shourya Sinha' },
        { id: 6, name: 'Suny Shaw' },
        { id: 7, name: 'Jatan Tiwari' },
        { id: 8, name: 'Ravi Sharma' },
        { id: 9, name: 'Aditya Sharma' },
        { id: 10, name: 'Shourya Sinha' },
        { id: 11, name: 'Suny Shaw' },
        { id: 12, name: 'Jatan Tiwari' },
        { id: 13, name: 'Ravi Sharma' },
        { id: 14, name: 'Aditya Sharma' },
        { id: 15, name: 'Shourya Sinha' }
    ];
    return (
        <div className='flex flex-col flex-[0.65] rounded-[25px] bg-white p-2'>
            <h2 className="text-lg text-center font-semibold text-blue-500 my-4">People</h2>
            <div className='overflow-x-auto mb-4'>
            <ul className="space-y-2 w-[80%] mx-auto my-0">
                {people.map((friend) => (
                    <li key={friend.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                                {friend.name[0]}
                            </div>
                            <span className="ml-3 text-gray-700">{friend.name}</span>
                        </div>
                        <button 
                            onClick={() => handleAddFriend(friend.id)}
                            className="text-blue-500 hover:text-blue-700 transition"
                            title="Add Friend"
                        >
                            <PersonAddOutlinedIcon />
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default AddFriend