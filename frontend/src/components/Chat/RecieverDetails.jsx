import React from 'react'
import { useLocation } from 'react-router-dom';

const RecieverDetails = () => {
    const { state } = useLocation();
    const friendData = state?.friendData || [];
    return (
        <div className='flex flex-col flex-[0.65] rounded-[25px] bg-white p-2'>
            RecieverDetails
        </div>
    )
}

export default RecieverDetails