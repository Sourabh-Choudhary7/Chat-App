import React from 'react'
import profileImage from '../../assets/girl.png'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sb-upper">
        <div className="profile-img">
          <img src={profileImage} alt="Profile Picture" height={40} width={40} />
        </div>
        <IconButton>
          <HomeIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <ChatIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <NotificationsNoneIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
        <IconButton>
          <SettingsIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
      </div>
      <div className="sb-lower">
        <IconButton>
          <LogoutIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </IconButton>
      </div>
    </div>
  )
}
export default Sidebar