import React from 'react'

const MessageSelf = ({ message, formatTimestamp }) => {
    return (
        <div className="self-end max-w-[60%] break-words">
            <div className="bg-[#6E00FF] p-2 rounded-[15px] rounded-tr-none text-white">
                <p>{message.content}</p>
            </div>
            <span className="block text-xs opacity-80 text-right">{formatTimestamp(message.createdAt)}</span>
        </div>
    )
}

export default MessageSelf
