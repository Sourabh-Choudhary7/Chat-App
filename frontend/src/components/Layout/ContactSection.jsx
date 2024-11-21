import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegisteredUsers } from '../../redux/Slices/AuthSlice';
import { createChat, getGroupChat } from '../../redux/Slices/ChatSlice';
import { getMessagesByChatId } from '../../redux/Slices/MessageSlice';

const ContactSection = () => {
  const friendsList = useSelector((state) => state?.auth?.friendsListData);
  const groups = useSelector((state) => state?.chat?.groups);
  const chatList = useSelector((state) => state?.chat?.allChatsData);
  console.log("length of groups: " + groups.length)
  console.log("length of freinds: " + friendsList.length)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    const res = await dispatch(getAllRegisteredUsers());
    if (res?.payload?.success) {
      navigate("add-friend", { state: { users: res?.payload?.data } });
    }
  };

  let { id } = useParams();
  console.log("chatId using params", id);

  const getSelectedChat = async (id, data, isGroup = false) => {
    console.log("getSelectedChat: ", data)
    let res;
    let chatData;

    if (isGroup) {
      // Fetch the group chat details
      res = await dispatch(getGroupChat(id));
      chatData = res?.payload?.groupChat;
    } else {
      // Create or get individual chat with a friend
      res = await dispatch(createChat(id));
      chatData = res?.payload?.chat;
    }

    // Fetch messages for the selected chat
    dispatch(getMessagesByChatId(chatData?._id));

    if (res?.payload?.success) {
      navigate(`chat/${chatData._id}`, { state: { chatData: chatData, data: data } });
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="flex flex-col flex-[0.3] gap-5 w-auto">
      <div className="flex items-center gap-2">
        <div className="flex items-center p-2 rounded-[25px] bg-white w-full">
          <SearchIcon />
          <input type="text" placeholder="Search" className="w-auto p-1 text-base outline-none" />
        </div>
        <IconButton onClick={getAllUsers}>
          <Tooltip title="Add Friend">
            <PersonAddOutlinedIcon className='text-black' />
          </Tooltip>
        </IconButton>
      </div>
      <div className="flex-auto overflow-y-auto rounded-[25px] bg-white text-black">
        {
          groups.length > 0 ? (
            <h2 className="m-2 font-medium text-xl">Groups</h2>
          ) : ""
        }
        {
          groups?.map((group, index) => (
            <ul onClick={() => getSelectedChat(group?._id, group, true)} key={group?._id || index}>
              <li className="flex justify-between p-2 cursor-pointer hover:bg-gray-300 hover:rounded-[20px]">
                <div className="flex gap-2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dtZF4uEohaMdwIw4d8XVRIVbJAgUthdQmg&s" alt="Group icon" className="w-10 h-10 rounded-full bg-blue-950" />
                  <div>
                    <h3>{group?.chatName}</h3>
                    <span className="text-sm opacity-80">{group?.lastMessage?.content}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm opacity-80">{formatTimestamp(group?.lastMessage?.createdAt)}</p>
                  <p className="text-sm opacity-80">✓✓</p>
                </div>
              </li>
              <hr className="mx-auto w-[90%] border-gray-300" />
            </ul>
          ))
        }
        {
          friendsList.length > 0 ? (
            <h2 className="m-2 font-medium text-xl">Friends</h2>
          ) :
            (
              <div>
                <button className='m-4 bg-gray-200 rounded-md p-2 hover:bg-gray-300 text-gray-700' onClick={getAllUsers}>
                  <PersonAddOutlinedIcon /> <span> Add Friend to your contact </span>
                </button>
              </div>
            )
        }
        {
          friendsList?.map((friend, index) => {
            const chat = chatList?.find((chat) =>
              chat?.members?.some((member) => member?._id === friend?._id)
            );
            return (
              <ul onClick={() => getSelectedChat(friend?._id, friend)} key={friend?._id || index}>
                <li className="flex justify-between p-2 cursor-pointer hover:bg-gray-300 hover:rounded-[20px]">
                  <div className="flex gap-2">
                    <img src={friend?.avatar?.secure_url} alt="Contact" className="w-10 h-10 rounded-full" />
                    <div>
                      <h3>
                        {friend?.userName?.split(' ')[0].charAt(0).toUpperCase() +
                          friend?.userName?.split(' ')[0].slice(1).toLowerCase()}
                      </h3>
                      <span className="text-sm opacity-80">
                        {chat?.lastMessage?.content || "No messages yet"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm opacity-80">{formatTimestamp(chat?.lastMessage?.createdAt)}</p>
                    <p className="text-sm opacity-80">✓✓</p>
                  </div>
                </li>
                <hr className="mx-auto w-[90%] border-gray-300" />
              </ul>
            );
          })
        }
      </div>
    </div>
  );
};

export default ContactSection;
