import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAsGroupAdmin, getGroupChat, makeGroupAdmin, setSelectedFriendChat } from '../../redux/Slices/ChatSlice';
import toast from 'react-hot-toast';

const RecieverDetails = () => {
    const { state } = useLocation();
    const { groupId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showFriendList, setShowFriendList] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    const LoggedInUserData = useSelector((state) => state?.auth?.userData)
    const friendData = state?.friendData || [];
    const friendsListData = useSelector((state) => state?.auth?.friendsListData);
    // const chatData = state?.chatData || [];
    const chatData = useSelector((state) => state?.chat?.selectedGroupChat?.groupChat);
    let formattedUserName = friendData?.userName?.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');


    useEffect(() => {
        if (!chatData) {
            if (groupId) {
                dispatch(getGroupChat(groupId));
            } else if (state?.friendData) {
                dispatch(setSelectedFriendChat(state.friendData));
            }
        }
    }, [chatData, groupId, state, dispatch]);



    // handle menu items of individual member
    const open = Boolean(anchorEl);


    const handleMenuOpen = (event, member, isAdmin) => {
        setAnchorEl(event.currentTarget);
        setSelectedMember({
            member: member,
            isAdmin: isAdmin
        });
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMember(null);
    };

    // Filter friends who are not in the group
    const nonGroupFriends = friendsListData.filter(friend =>
        !chatData?.members.some(member => member._id === friend._id)
    );

    // make as admin functionality
    const handleMakeGroupAdmin = async (newAdminId) => {
        if (newAdminId === LoggedInUserData._id) {
            toast("You can't make yourself an admin");
            return;
        }
        if (chatData?.members.some(member => member._id === newAdminId && member.isAdmin)) {
            toast("This member is already an admin");
            return;
        }

        const data = {
            groupId: chatData?._id,
            newAdminId,
        };

        const res = await dispatch(makeGroupAdmin(data));
        if (res?.payload?.success)
            // dispatch(fetchGroupsForLoggedInUser());
            dispatch(getGroupChat(data.groupId));
    };

    const handleDismisssAsAdmin = async (adminId) => {
        if (adminId === LoggedInUserData._id) {
            toast.error("You can't make yourself an admin");
            return;
        }

        const data = {
            groupId: chatData?._id,
            adminId,
        };
        const res = await dispatch(dismissAsGroupAdmin(data));
        if (res?.payload?.success)
            // dispatch(fetchGroupsForLoggedInUser());
            dispatch(getGroupChat(data.groupId));

    }

    return (
        <div className='flex flex-col items-center flex-[0.65] rounded-[25px] bg-white p-2 overflow-auto max-h-screen'>
            {/* Header */}
            <div className="relative flex items-center justify-center w-full mb-4">
                <IconButton
                    className="absolute right-72"
                    onClick={() => navigate(-1)}
                >
                    <Tooltip title="Back to View Profile">
                        <KeyboardReturnRoundedIcon />
                    </Tooltip>
                </IconButton>
                <h2 className="text-2xl font-semibold text-blue-600">Details</h2>
            </div>

            <hr className="w-11/12 border-t border-gray-300 opacity-50 mb-4" />

            {/* Main Content Container */}
            {chatData?.isGroupChat ? (
                //Group Chat UI
                <div className="flex flex-col justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow">
                    {/* Avatar and Profile */}
                    <div className="flex items-center justify-center">
                        <Tooltip title="View Profile">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dtZF4uEohaMdwIw4d8XVRIVbJAgUthdQmg&s"
                                alt="Group"
                                className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                            />
                        </Tooltip>
                    </div>

                    {/* Group Name */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">
                            {chatData.chatName}
                        </h3>
                    </div>

                    {/* Group Members Section */}
                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className="text-l font-medium text-blue-700 mb-2">Group Members:</h3>
                            {chatData?.groupAdmin?.some(admin => admin._id === LoggedInUserData?._id) && (
                                <IconButton title='Add new member' onClick={() => setShowFriendList(!showFriendList)}>
                                    <PersonAddOutlinedIcon className='text-black' />
                                </IconButton>
                            )}
                        </div>

                        {chatData?.members.map((member) => {
                            const isAdmin = chatData?.groupAdmin.some((admin) => admin._id === member._id);
                            return (
                                <div key={member._id} className="mb-2 flex items-center justify-between w-full">
                                    <div className="flex gap-4">
                                        <Tooltip title="View Profile">
                                            <img
                                                src={member?.avatar?.secure_url}
                                                alt="Profile"
                                                className="border-4 border-blue-400 w-8 h-8 rounded-full cursor-pointer shadow-lg"
                                            />
                                        </Tooltip>
                                        <span className="text-gray-500">
                                            {member?.userName?.split(' ').map((word) =>
                                                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                            {isAdmin && (
                                                <span className="ml-2 border-2 border-green-600 border-solid px-1 rounded-md text-green-500 text-sm">
                                                    Group Admin
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    <IconButton onClick={(event) => handleMenuOpen(event, member, isAdmin)}>
                                        <MoreVertIcon className="text-[#9747FF] h-10 w-10" />
                                    </IconButton>
                                </div>
                            );
                        })}

                        {/* Member Options Menu */}
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            {selectedMember?.member?._id === LoggedInUserData?._id ? (
                                <MenuItem>Leave this Group</MenuItem>
                            ) : (
                                <>
                                    <MenuItem>View Profile</MenuItem>
                                    <MenuItem>Message</MenuItem>
                                    {chatData?.groupAdmin.some((admin) => admin._id === LoggedInUserData?._id) && (
                                        <>
                                            {!selectedMember?.isAdmin ? (
                                                <MenuItem onClick={() => handleMakeGroupAdmin(selectedMember?.member?._id)}>
                                                    Make as Admin
                                                </MenuItem>
                                            ) : (
                                                <MenuItem onClick={() => handleDismisssAsAdmin(selectedMember?.member?._id)}>
                                                    Dismiss as Admin
                                                </MenuItem>
                                            )}
                                            <MenuItem>Remove Member</MenuItem>
                                        </>
                                    )}
                                </>
                            )}
                        </Menu>
                    </div>

                    {/* Add Friends to Group */}
                    {showFriendList && (
                        <div className="w-full">
                            <h3 className="text-l font-medium text-blue-700 mb-2">Select Friends to add Group:</h3>
                            <div className="border border-blue-300 p-2 rounded-lg shadow-md max-h-40 overflow-y-auto">
                                {nonGroupFriends.length > 0 ? (
                                    nonGroupFriends.map((friend) => (
                                        <div key={friend._id} className="text-gray-500 mb-1 flex items-center justify-between">
                                            <div className='flex items-center gap-2'>
                                                <Tooltip title="View Profile">
                                                    <img
                                                        src={friend?.avatar?.secure_url}
                                                        alt="Profile"
                                                        className="border-4 border-blue-400 w-8 h-8 rounded-full cursor-pointer shadow-lg"
                                                    />
                                                </Tooltip>
                                                <span>
                                                    {friend.userName?.split(' ').map(word =>
                                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                </span>
                                            </div>
                                            <IconButton onClick={() => {/* Add friend to group logic */ }}>
                                                <PersonAddOutlinedIcon className="text-blue-500" />
                                            </IconButton>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No friends available to add.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : friendData ? (
                // ✅ One-to-One Chat UI
                <div className="flex flex-col justify-center border border-blue-200 p-6 rounded-[25px] w-full gap-4 shadow-md max-w-md overflow">
                    {/* Avatar and Profile */}
                    <div className="flex items-center justify-center">
                        <Tooltip title="View Profile">
                            <img
                                src={friendData?.avatar?.secure_url}
                                alt="Profile"
                                className="border-4 border-blue-400 w-24 h-24 rounded-full cursor-pointer shadow-lg"
                            />
                        </Tooltip>
                    </div>

                    {/* User Information */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">
                            <span>
                                {formattedUserName}
                            </span>
                        </h3>
                    </div>

                    <p className="text-gray-500 mb-1">Email Id: <span>{friendData?.email}</span></p>
                    <p className="text-gray-500">Phone Number: <span>{friendData?.phone}</span></p>
                </div>
            ) : (
                // ✅ Loading State
                <div>Loading Chat Info...</div>
            )}

        </div>
    );
};

export default RecieverDetails;
