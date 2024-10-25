import React from 'react'
import contactListImage from '../../assets/BillGates.png'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { IconButton } from '@mui/material'
import MessageOther from '../MessagesComponent/MessageOther'
import MessageSelf from '../MessagesComponent/MessageSelf'

const ChatSection = () => {
  let reciever = {
    name: 'Bill Gates',
    message: 'I am Bill Gates. I am doing good and same to you man keep it up...',
    timestamp: '3:00 am',
  }
  let sender = {
    name: 'You',
    message: 'Hello Bill, How are you? and what are you doing all fine happy new Year',
    timestamp: '3:00 am',
  }

  return (
    <div className="flex flex-col flex-[0.65] rounded-[25px] bg-white p-1">
      {/* chat navbar */}
      <div className="flex justify-between items-center p-2 flex-[0.1]">
        <div className="flex gap-2">
          <img src={contactListImage} alt="Reciever" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className='font-medium'>Bill Gates</h3>
            <span className="text-xs opacity-80">Last seen at 3:00 am</span>
          </div>
        </div>
        <div className="flex gap-2">
          <IconButton>
            <CallOutlinedIcon className='text-[#9747FF] h-10 w-10' />
          </IconButton>
          <IconButton>
            <VideocamOutlinedIcon className='text-[#9747FF] h-10 w-10' />
          </IconButton>
          <IconButton>
            <MoreVertIcon className='text-[#9747FF] h-10 w-10' />
          </IconButton>
        </div>
      </div>
      <hr className="mx-auto w-[96%] border-t border-gray-300 opacity-40" />
      {/* chat messages */}
      <div className="flex flex-col gap-2 p-5 flex-[0.8] overflow-y-auto bg-white">
        <MessageOther message={reciever} />
        <MessageSelf message={sender} />
        <MessageOther message={reciever} />
        <MessageOther message={reciever} />
        <MessageSelf message={sender} />
      </div>
      {/* chat input box */}
      <div className="flex gap-2 items-center flex-[0.1] mt-2">
        <div className="flex items-center w-full bg-white rounded-[25px]">
          <IconButton>
            <AttachFileIcon className="rotate-[30deg]" style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full p-2 text-base outline-none"
          />
          <IconButton>
            <EmojiEmotionsOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
          <IconButton>
            <CameraAltOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
        </div>
        <div className="bg-[#6E00FF] p-1 rounded-lg">
          <SendOutlinedIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </div>
      </div>
    </div>
  )
}

export default ChatSection
