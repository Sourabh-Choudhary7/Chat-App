import React from 'react'

const MessageSelf = ({ message }) => {
    console.log(message)
    return (
        <div className="self-end max-w-[60%] break-words">
            <div className="bg-[#6E00FF] p-2 rounded-[15px] rounded-tr-none text-white">
                <p>{message.message}</p>
            </div>
            <span className="block text-xs opacity-80 text-right">{message.timestamp}</span>
        </div>
    )
}

export default MessageSelf
