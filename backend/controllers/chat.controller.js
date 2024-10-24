import Chat from '../models/chat.model.js';
import Cloudinary from 'cloudinary';
import AppError from '../utils/error.utils.js';
import User from '../models/user.model.js';

const getOrCreateChat = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;

        const user = await User.findById(id);
        if(!(user.friends.includes(friendId))) {
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

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const fetchGroups = async (req, res, next) => {
    try {

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const makeGroupAdmin = async (req, res, next) => {
    try {

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
    fetchGroups,
    makeGroupAdmin,
    exitGroup,
}