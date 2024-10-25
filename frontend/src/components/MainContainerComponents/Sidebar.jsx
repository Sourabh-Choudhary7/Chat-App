import React from 'react'
import profileImage from '../../assets/dummyProfile.png'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'

const Sidebar = () => {
  return (
    <div className="flex flex-col flex-[0.05] justify-between items-center bg-[#6E00FF] p-2 rounded-[25px] h-full">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full border-2 border-white">
          <img src={profileImage} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
        </div>
        <IconButton>
          <HomeIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <ChatIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <GroupAddIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <NotificationsNoneIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <SettingsIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
      </div>
      <IconButton>
        <LogoutIcon style={{ color: 'white', height: '30px', width: '30px' }} />
      </IconButton>
    </div>
  )
}

export default Sidebar
