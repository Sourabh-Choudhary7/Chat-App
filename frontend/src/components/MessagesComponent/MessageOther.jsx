import React from 'react'

const MessageOther = ({ message }) => {
    return (
        <div className="self-start max-w-[60%] break-words">
            <div className="bg-gray-300 p-2 rounded-[15px] rounded-tl-none">
                <p>{message.message}</p>
            </div>
            <span className="block text-xs opacity-80">{message.timestamp}</span>
        </div>
    )
}

export default MessageOther
