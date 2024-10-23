import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    chatName: {
        type: String,
        default: 'chat'
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        timestamps: true
    }
);

const Chat = model('Chat', chatSchema);

export default Chat;