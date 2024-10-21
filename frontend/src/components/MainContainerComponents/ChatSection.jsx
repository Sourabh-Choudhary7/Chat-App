import React from 'react'
import contactListImage from '../../assets/BillGates.png'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { IconButton } from '@mui/material';
import MessageOther from '../MessagesComponent/MessageOther';
import MessageSelf from '../MessagesComponent/MessageSelf';
const ChatSection = () => {
  let reciever = {
    name: 'Bill gates',
    message: 'I am Bill gates. I am doing good and same to you man keep it up...',
    timestamp: '3:00 am',
  }
  let sender = {
    name: 'You',
    message: 'Hello Bill, How are you? and what are you doing all fine happy new Year',
    timestamp: '3:00 am',
  }
  return (
    <div className='chat-section'>
      {/* chat navbar */}
      <div className="chat-nav">
        <div className="chat-nav-left">
          <div className="reciever-image">
            <img src={contactListImage} alt="Reciever image" height={40} width={40} />
          </div>
          <div className="reciever-information">
            <div className="reciever-name"><h3>Bill gates</h3></div>
            <div className="reciever-staus"><span>Last seen at 3:00 am</span></div>
          </div>
        </div>
        <div className="chat-nav-right">
          <IconButton>
            <CallOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
          <IconButton>
            <VideocamOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
        </div>
      </div>
      <hr />
      {/* chats */}
      <div className="chats-messages-container">
        <MessageOther message = {reciever} />
        <MessageSelf message = {sender} />
        <MessageOther message = {reciever} />
        <MessageOther message = {reciever} />
        <MessageSelf message = {sender} />
      </div>
      {/* chat input box */}
      <div className="chats-input-box">
        <div className="input-box">
          <IconButton>
            <AttachFileIcon style={{ color: '#9747FF', height: '30px', width: '30px', rotate:'30deg' }} />
          </IconButton>
          <input type="text" name="message_input" id="message_input" placeholder="Type your message here..." className='message-input-box' />
          <IconButton>
            <EmojiEmotionsOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
          <IconButton>
            <CameraAltOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
        </div>
        <div className="send-button">
          <SendOutlinedIcon style={{ color: 'white',backgroundColor: '#6E00FF', padding: '5px',height: '40px', width: '40px', borderRadius:'10px', cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  )
}

export default ChatSection