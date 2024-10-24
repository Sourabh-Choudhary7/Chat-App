import Cloudinary from 'cloudinary';
import AppError from '../utils/error.utils.js';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const getOrCreateChat = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;

        const user = await User.findById(id);
        if (!(user.friends.includes(friendId))) {
            return next(new AppError('This user is not in your friends list', 409));
        }
        // 1. Check if a one-to-one chat already exists between the two users
        let chat = await Chat.findOne({
            isGroupChat: false,
            members: { $all: [id, friendId] }
        })
            .populate('members', 'userName avatar phone email')
            .populate('lastMessage');

        // 2. If the chat already exists, return it
        if (chat) {
            return res.status(200).json({
                success: true,
                chat
            });
        }

        // 3. If the chat doesn't exist, create a new one
        const newChat = await Chat.create({
            chatName: 'one-to-one chat',
            isGroupChat: false,
            members: [id, friendId]
        })

        const populatedChat = await Chat.findById(newChat._id)
            .populate('members', 'userName avatar phone email')
            .populate('lastMessage');

        return res.status(201).json({
            success: true,
            message: "Chat has been created successfully",
            populatedChat
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const createGroupChat = async (req, res, next) => {
    try {
        const { groupName, members } = req.body;
        const { id } = req.user;
        // 1. Ensure members list contains more than 2 users for a group
        if (members.length < 2) {
            return next(new AppError('A group must have at least 2 members', 400));
        }

        // 2. Add the logged-in user as the group admin and a member of the group
        const groupMembers = [...members, id];

        // 3. Create a new group chat
        const groupChat = await Chat.create({
            chatName: groupName || 'New Group Chat',
            isGroupChat: true,
            members: groupMembers,
            groupAdmin: id
        });

        // 4. Populate the created group chat with member details
        const populatedGroupChat = await Chat.findById(groupChat._id)
            .populate('members', 'UserName avatar phone email')
            .populate('groupAdmin', 'UserName avatar phone email')
            .populate('lastMessage');

        // 5. Return the created group chat
        return res.status(201).json({
            success: true,
            message: 'Group chat has been created successfully',
            populatedGroupChat
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const getGroupChat = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        if (!groupId) {
            return next(new AppError('Group ID is required', 400));
        }
        const groupChat = await Chat.findById(groupId)
            .populate('members', 'userName avatar phone email')
            .populate({
                path: 'messages',
                model: 'Message',
                populate: {
                    path: 'sender',
                    model: 'User',
                    select: 'userName avatar phone email'
                }
            })
            .populate('groupAdmin', 'userName avatar phone email')
            .populate('lastMessage');

        if (!groupChat) {
            return next(new AppError('Group chat not found', 404));
        }

        return res.status(200).json({
            success: true,
            groupChat
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const fetchGroups = async (req, res, next) => {
    try {
        const allGroupsChat = await Chat.find({ isGroupChat: true });
        if (!allGroupsChat) {
            return next(new AppError('No group chats found', 404));
        }
        return res.status(200).json({
            success: true,
            message: 'All Group Chats fetched successfully',
            allGroupsChat
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const makeGroupAdmin = async (req, res, next) => {
    try {
        const { groupId, newAdminId } = req.body;
        const { id } = req.user;
        // 1. Find the group by ID
        const groupChat = await Chat.findById(groupId);

        if (!groupChat) {
            return next(new AppError('Group chat not found', 404));
        }

        // 2. Check if the requesting user is an admin
        if (!groupChat.groupAdmin.includes(id)) {
            return next(new AppError('Only group admins can assign a new admin', 403));
        }

        // 3. Check if the new admin is already a member of the group
        if (!groupChat.members.includes(newAdminId)) {
            return next(new AppError('The user to be promoted is not a member of this group', 400));
        }

        // 4. Check if the user is already an admin
        if (groupChat.groupAdmin.includes(newAdminId)) {
            return next(new AppError('This user is already an admin', 400));
        }

        // 5. Add the new admin to the groupAdmin field
        groupChat.groupAdmin.push(newAdminId);
        await groupChat.save();

        // 6. Return the updated group chat with populated members and admin info
        const updatedGroupChat = await Chat.findById(groupId)
            .populate('members', 'userName avatar phone email')
            .populate('groupAdmin', 'userName avatar phone email');

        return res.status(200).json({
            success: true,
            message: 'New admin assigned successfully',
            groupChat: updatedGroupChat
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const exitGroup = async (req, res, next) => {
    try {

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export {
    getOrCreateChat,
    createGroupChat,
    getGroupChat,
    fetchGroups,
    makeGroupAdmin,
    exitGroup,
}