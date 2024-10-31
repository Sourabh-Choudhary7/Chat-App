import { Message } from '@mui/icons-material';
import React from 'react'

const MessageOther = ({ message, formatTimestamp }) => {
    return (
        <div className="self-start max-w-[60%] break-words">
            <div className="bg-gray-300 p-2 rounded-[15px] rounded-tl-none">
                <p>{message.content}</p>
            </div>
            <span className="block text-xs opacity-80">{formatTimestamp(message.createdAt)}</span>
        </div>
    )
}

export default MessageOther
