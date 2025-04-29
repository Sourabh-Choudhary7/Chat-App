import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MessageOther from '../MessagesComponent/MessageOther';
import MessageSelf from '../MessagesComponent/MessageSelf';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getMessagesByChatId, sendMessage } from '../../redux/Slices/MessageSlice';
import { io } from 'socket.io-client';
import { clearActiveChatId, setActiveChatId } from '../../redux/Slices/ChatSlice';


const ChatSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const { state } = useLocation();
  const friendData = state?.data || {};
  const chatData = state?.chatData || {};
  const messageData = useSelector((state) => state.message.messages || []);
  const userData = useSelector((state) => state.auth.userData);
  const activeChatId = useSelector((state) => state.chat.activeChatId); // <-- From Redux
  const [socket, setSocket] = useState(null);
  const prevChatIdRef = useRef(null); // <-- Track previous chat
  let { id } = useParams();

  const [messageContent, setMessageContent] = useState({
    chatId: id,
    content: '',
  });
  const SOCKET_URL = 'http://localhost:5000';
  // Initialize socket
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      query: { userId: userData?._id },
    });
    setSocket(newSocket);

    newSocket.on('messageReceived', (message) => {
      if (message.chatId === activeChatId) {
        dispatch(addMessage(message));
      }
    });

    return () => newSocket.disconnect();
  }, [userData?._id, dispatch, activeChatId]);

  // Set active chat in Redux
  useEffect(() => {
    dispatch(setActiveChatId(id));
    return () => {
      dispatch(clearActiveChatId());
    };
  }, [dispatch, id]);

  // Join/Leave chat room
  useEffect(() => {
    if (socket && activeChatId) {
      if (prevChatIdRef.current && prevChatIdRef.current !== activeChatId) {
        socket.emit('leaveChat', prevChatIdRef.current);
      }
      socket.emit('joinChat', activeChatId);
      prevChatIdRef.current = activeChatId;
    }
  }, [socket, activeChatId]);

  const handleMessageInput = (e) => {
    const { name, value } = e.target;
    setMessageContent((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.content || !messageContent.chatId) return;

    const newMessage = {
      _id: Date.now(),
      chat: { users: chatData?.members },
      sender: { _id: userData?._id },
      receiver: { _id: friendData._id },
      content: messageContent.content,
      chatId: messageContent.chatId,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    await dispatch(sendMessage(messageContent));
    socket.emit('newMessage', newMessage);

    setMessageContent({ chatId: id, content: '' });
  };

  // Fetch messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (messageContent.chatId) {
        await dispatch(getMessagesByChatId(messageContent.chatId));
      }
    };
    fetchMessages();
  }, [dispatch, messageContent.chatId]);

  // Auto scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messageData]);


  let formattedUserName = friendData?.userName?.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
        
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col flex-[0.65] rounded-[25px] bg-white p-2">
      {/* Header */}
      <div className="flex justify-between items-center p-2 flex-[0.1]">
        <div className="flex gap-2 cursor-pointer" onClick={() => navigate('chat-info', { state: { friendData, chatData } })}>
          <img src={chatData?.isGroupChat ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dtZF4uEohaMdwIw4d8XVRIVbJAgUthdQmg&s" : friendData?.avatar?.secure_url} alt="Receiver_photo" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-medium">
              {chatData?.isGroupChat ? chatData?.chatName : formattedUserName}
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

      {/* Chat Messages */}
      <div className="flex flex-col gap-2 p-5 flex-[0.8] overflow-y-auto bg-white" ref={messagesEndRef}>
        {messageData?.map((msg, index) =>
          msg?.sender?._id === userData._id
            ? <MessageSelf key={msg._id || index} message={msg} formatTimestamp={formatTimestamp} />
            : <MessageOther key={msg._id || index} message={msg} formatTimestamp={formatTimestamp} />
        )}
        <div ref={messagesEndRef} className='BOTTOM' />
      </div>

      {/* Input */}
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
          <IconButton onClick={handleSendMessage}>
            <SendOutlinedIcon style={{ color: '#9747FF', height: '30px', width: '30px' }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
