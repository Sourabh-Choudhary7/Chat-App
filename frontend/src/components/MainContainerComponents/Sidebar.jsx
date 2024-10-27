import React from 'react'
import profileImage from '../../assets/dummyProfile.png'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-[0.05] justify-between items-center bg-[#6E00FF] p-2 rounded-[25px] h-full">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full border-2 border-white">
        <Tooltip title="View Profile">
          <img src={profileImage} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
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
      <IconButton>
        <Tooltip title="Logout">
          <LogoutIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </Tooltip>
      </IconButton>
    </div>
  )
}

export default Sidebar
