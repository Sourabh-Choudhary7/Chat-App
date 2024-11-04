import { IconButton, Tooltip } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const RecieverDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const friendData = state?.friendData || [];

    let formatedUserName = friendData?.userName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return (
        <div className='flex flex-col items-center flex-[0.65] rounded-[25px] bg-white p-2'>
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
            <div className="flex flex-col items-center justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow-y-auto">

                <div className="flex items-center justify-center">
                    <Tooltip title="View Profile">
                        <img
                            src={friendData?.avatar?.secure_url}
                            alt="Profile"
                            className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                        />
                    </Tooltip>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-700 mb-2 ">
                        <span>
                            {formatedUserName}
                        </span>
                    </h3>
                    <p className="text-gray-500 mb-1">Email Id: <span>{friendData?.email}</span></p>
                    <p className="text-gray-500">Phone Number: <span>{friendData?.phone}</span></p>
                </div>
            </div>
        </div>
    )
}

export default RecieverDetails