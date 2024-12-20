import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/Slices/AuthSlice'

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.userData)
  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res?.payload?.success)
      navigate('/');
  };
  return (
    <div className="flex flex-col flex-[0.05] justify-between items-center bg-[#6E00FF] p-2 rounded-[25px] h-full">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full border-2 border-white" onClick={() => navigate('profile', { state: { userData: userData} })}>
          <Tooltip title="View Profile">
            <img src={userData?.avatar?.secure_url} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
          </Tooltip>
        </div>
        <IconButton onClick={() => navigate('home')}>
          <Tooltip title="Home">
            <HomeIcon style={{ color: 'white', height: '30px', width: '30px' }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={() => navigate('welcome')}>
          <Tooltip title="Chats">
            <ChatIcon style={{ color: 'white', height: '30px', width: '30px' }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={() => navigate('create-group')}>
          <Tooltip title="Create Group">
            <GroupAddIcon style={{ color: 'white', height: '30px', width: '30px' }} />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title="Notification">
            <NotificationsNoneIcon style={{ color: 'white', height: '30px', width: '30px' }} />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title="Settings">
            <SettingsIcon style={{ color: 'white', height: '30px', width: '30px' }} />
          </Tooltip>
        </IconButton>
      </div>
      <IconButton onClick={handleLogout}>
        <Tooltip title="Logout">
          <LogoutIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </Tooltip>
      </IconButton>
    </div>
  )
}

export default Sidebar
