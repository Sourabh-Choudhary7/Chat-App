import React, { useEffect, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, getMessagesByChatId, sendMessage } from '../../redux/Slices/MessageSlice'

const ChatSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const friendData = state?.friendData || [];
  const chatData = state?.chatData || [];
  const messageData = useSelector((state) => state?.message?.messages || []);
  const userData = useSelector((state) => state?.auth?.userData)
  const [messageContent, setMessageContent] = useState({
    chatId: chatData._id,
    content: '',
  })

  const handleMessageInput = (e) => {
    const { name, value } = e.target;
    setMessageContent({
      ...messageContent,
      [name]: value
    });
    if (e.key === 'Enter') {
      handleSendMessage(e); // Call send message function
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageContent.content || !messageContent.chatId) {
      toast('Please enter a message');
      return;
    }

    const newMessage = {
      _id: Date.now(),
      sender: { _id: userData?._id },
      content: messageContent.content,
      chatId: messageContent.chatId,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));

    const response = await dispatch(sendMessage(messageContent));
    if (response?.payload?.success) {
      setMessageContent({
        chatId: chatData._id,
        content: ''
      });
    } else {
      toast('Failed to send message');
    }
  }


  useEffect(() => {
    const fetchMessages = async () => {
      if (chatData?._id) {
        await dispatch(getMessagesByChatId(chatData._id))
      }
    }

    fetchMessages()
  }, [dispatch, chatData?._id])

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Options for formatting
    const options = {
      // year: 'numeric',
      // month: 'short',
      // day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedTime = date.toLocaleString('en-US', options);

    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="flex flex-col flex-[0.65] rounded-[25px] bg-white p-2">
      {/* Chat header */}
      <div className="flex justify-between items-center p-2 flex-[0.1]">
        <div className="flex gap-2" onClick={() => navigate('reciever-details', { state: { friendData } })}>
          <img src={friendData?.avatar?.secure_url} alt="Receiver_photo" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-medium">
              {friendData?.userName?.split(' ')[0].charAt(0).toUpperCase() + friendData?.userName?.split(' ')[0].slice(1).toLowerCase()}
            </h3>
            <span className="text-xs opacity-80">Last seen at 3:00 am</span>
          </div>
        </div>
        <div className="flex gap-2">
          <IconButton><CallOutlinedIcon className="text-[#9747FF] h-10 w-10" /></IconButton>
          <IconButton><VideocamOutlinedIcon className="text-[#9747FF] h-10 w-10" /></IconButton>
          <IconButton><MoreVertIcon className="text-[#9747FF] h-10 w-10" /></IconButton>
        </div>
      </div>
      <hr className="mx-auto w-[96%] border-t border-gray-300 opacity-40" />

      {/* Chat messages */}
      <div className="flex flex-col gap-2 p-5 flex-[0.8] overflow-y-auto bg-white">
        {messageData?.map((msg) => (
          msg?.sender?._id === friendData._id ? (
            <MessageOther key={msg._id} message={msg} formatTimestamp={formatTimestamp} />
          ) : (
            <MessageSelf key={msg._id} message={msg} formatTimestamp={formatTimestamp} />
          )
        ))}
      </div>

      {/* Chat input box */}
      <div className="flex gap-2 items-center flex-[0.1] mt-2">
        <div className="flex items-center w-full bg-white rounded-[25px]">
          <IconButton><AttachFileIcon className="rotate-[30deg]" style={{ color: '#9747FF', height: '30px', width: '30px' }} /></IconButton>
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full p-2 text-base outline-none"
            id="content"
            name='content'
            onChange={handleMessageInput}
            onKeyDown={handleMessageInput}
            value={messageContent?.content}
            required
          />
          <IconButton><EmojiEmotionsOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} /></IconButton>
          <IconButton><CameraAltOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} /></IconButton>
        </div>
        <div className="bg-[#6E00FF] hover:bg-[#7145aa] p-1 rounded-lg cursor-pointer" onClick={handleSendMessage}>
          <SendOutlinedIcon style={{ color: 'white', height: '30px', width: '30px' }} />
        </div>
      </div>
    </div>
  )
}

export default ChatSection
