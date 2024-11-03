import React from 'react'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const { state } = useLocation();
  const userData = state?.userData || {};
  console.log("userData: ",userData);
  return (
    <div className='flex flex-col flex-[0.65] rounded-[25px] bg-white p-2'>
      Profile
    </div>
  )
}

export default Profile