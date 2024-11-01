import { Server } from "socket.io";
import http from "http";
import app from '../app.js';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {}; // Maps userId to socketId

// Helper function to get a receiver's socket ID
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];
console.log("getReceiverSocketId",getReceiverSocketId)

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    socket.on("setup", (user) => {
        socket.join(user.data._id);
        userSocketMap[user.data._id] = socket.id;
        console.log("Server: User joined room:", user.data._id);
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log("User joined Room:", chatId);
    });

    socket.on("newMessage", (message) => {
        console.log("Receiver id from rec123:", message.receiver);
        const receiverSocketId = getReceiverSocketId(message.receiver._id);
        if (receiverSocketId) {
            socket.to(receiverSocketId).emit("messageReceived", message);
        }
    });

    socket.on('disconnect', () => {
        if (userId) {
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, server, io };
