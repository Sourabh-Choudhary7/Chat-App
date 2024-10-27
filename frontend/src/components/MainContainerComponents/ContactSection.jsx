import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import contactListImage from '../../assets/BillGates.png'
import { useNavigate } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material';

const ContactSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-[0.3] gap-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center p-2 rounded-[25px] bg-white w-80">
          <SearchIcon />
          <input type="text" placeholder="Search" className="w-full p-1 text-base outline-none" />
        </div>
        <IconButton onClick={() => navigate("add-Friend")}>
          <Tooltip title="Add Friend">
            <PersonAddOutlinedIcon className='text-black' />
          </Tooltip>
        </IconButton>
      </div>
      <div className="flex-auto overflow-y-auto rounded-[25px] bg-white text-black">
        {/* <div className="flex-auto overflow-y-auto rounded-[25px] bg-[#31206e6e] text-white"> */}
        <h2 className="m-2 font-medium text-xl">Friends</h2>
        <div onClick={() => navigate('chat/:id')}>
          <div className="flex justify-between p-2 cursor-pointer hover:bg-gray-300 hover:rounded-[20px]">
            <div className="flex gap-2">
              <img src={contactListImage} alt="Contact" className="w-10 h-10 rounded-full" />
              <div>
                <h3>Bill Gates</h3>
                <span className="text-sm opacity-80">Hi How are you Gates?</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm opacity-80">Today, 3:00 am</p>
              <p className="text-sm opacity-80">✓✓</p>
            </div>
          </div>
          <hr className="mx-auto w-[90%] border-gray-300" />
        </div>

      </div>
    </div>
  )
}

export default ContactSection
