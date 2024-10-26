import Cloudinary from 'cloudinary';
import AppError from '../utils/error.utils.js';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const allMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        console.log(chatId);
        const { id } = req.user;
        // 1. Check if the user have this chatId if not then don't able to see others message or chats
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return next(new AppError('Chat not found', 404));
        }
        if (!chat.members.includes(id)) {
            return next(new AppError('You are not a member of this chat', 403));
        }
        // 2. Fetch the messages for the given chat ID
        const messages = await Message.find({ chat: chatId }).populate('sender', 'userName phone email');
        if (!messages) {
            return next(new AppError('No messages found for this chat', 404));
        }
        return res.status(200).json({
            success: true,
            message: 'all messages fetched successfully',
            messages,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}
const sendMessage = async (req, res, next) => {
    try {
        const { chatId, content } = req.body;
        const { id } = req.user;
        // 1. Ensure the user is part of the chat
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return next(new AppError('Chat not found', 404));
        }
        if (!chat.members.includes(id)) {
            return next(new AppError('You are not a member of this chat', 403));
        }
        // 2. create a new meesage content and save it to the database
        const message = new Message({
            sender: id,
            chat: chatId,
            content
        })
        await message.save();
        // 3. set all messages in chat.messages collection
        chat.messages.push(message._id);

        // 4. Update the chat last message
        chat.lastMessage = message;

        await chat.save();
        // 5. populate the message with sender details
        // message.sender = await User.findById(message.sender).select('useName phone email');
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            newMessage: message
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export {
    allMessages,
    sendMessage,
};